// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import {
  MapPin, Star, Phone, MessageSquare,
  Award, Clock, Heart, ArrowLeft, 
  Loader2, Calendar, Briefcase, BadgeCheck
} from 'lucide-react'

export default function ProfessionalProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [pro, setPro] = useState<any>(null)
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadProfile()
      loadPortfolio()
      loadReviews()
      checkFavorite()
    }
  }, [params.id])

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('❌ Erreur chargement profil:', error)
        return
      }

      if (data) {
        const { data: { user } } = await supabase.auth.getUser()
        const isOwner = user?.id === params.id
        
        // Incrémenter les vues SEULEMENT si ce n'est pas le pro lui-même
        if (!isOwner) {
          // 1. Incrémenter le compteur de vues
          await supabase
            .from('profiles')
            .update({ profile_views: (data.profile_views || 0) + 1 })
            .eq('id', params.id)
          
          // 2. Enregistrer dans l'historique des vues
          let viewerName = 'Visiteur anonyme'
          let viewerAvatar = null
          
          if (user) {
            const { data: viewerData } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', user.id)
              .single()
            
            if (viewerData) {
              viewerName = viewerData.full_name || 'Visiteur'
              viewerAvatar = viewerData.avatar_url
            }
          }

          await supabase
            .from('profile_views_history')
            .insert({
              pro_id: params.id,
              viewer_id: user?.id || null,
              viewer_name: viewerName,
              viewer_avatar: viewerAvatar
            })
            .then(({ error }) => {
              if (error) console.error('❌ Erreur historique vues:', error)
            })
        }

        setPro(data)
      }
    } catch (error) {
      console.error('❌ Erreur critique chargement profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('professional_portfolio')
        .select('*')
        .eq('professional_id', params.id)
        .order('created_at', { ascending: false })
      
      if (!error && data) setPortfolio(data)
    } catch (error) { 
      console.error('Erreur portfolio:', error) 
    }
  }

  const loadReviews = async () => {
    try {
      // ✅ JOINTURE avec la table profiles pour récupérer le NOM et l'AVATAR du client
      const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles:client_id(full_name, avatar_url)')
        .eq('reviewee_id', params.id)
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (error) {
        console.error('Erreur reviews:', error)
        return
      }
      
      if (data) {
        const formattedReviews = data.map(review => ({
          ...review,
          reviewer_name: review.profiles?.full_name || 'Client anonyme',
          reviewer_avatar: review.profiles?.avatar_url || null
        }))
        setReviews(formattedReviews)
      }
    } catch (error) { 
      console.error('Erreur critique reviews:', error) 
    }
  }

  const checkFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('client_id', session.user.id)
        .eq('pro_id', params.id)
        .single()

      if (!error && data) {
        setIsFavorite(true)
      }
    } catch (error) { 
      console.error('Erreur check favori:', error) 
    }
  }

  const toggleFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login?redirect=/pro/' + params.id)
        return
      }

      if (isFavorite) {
        await supabase.from('favorites').delete()
          .eq('client_id', session.user.id)
          .eq('pro_id', params.id)
        setIsFavorite(false)
      } else {
        await supabase.from('favorites').insert({
          client_id: session.user.id,
          pro_id: params.id
        })
        setIsFavorite(true)
      }
    } catch (error) { 
      console.error('Erreur toggle favori:', error) 
    }
  }

  const handleContactWhatsApp = () => {
    if (!pro.phone) {
      alert("Ce professionnel n'a pas renseigné de numéro de téléphone.")
      return
    }
    
    let phone = pro.phone.replace(/\s+/g, '')
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) {
        phone = '+' + phone
      } else if (phone.startsWith('9') || phone.startsWith('7')) {
        phone = '+228' + phone
      }
    }

    const message = encodeURIComponent(
      `Bonjour ${pro.full_name}, je suis intéressé(e) par vos services sur JobConnect. Pouvez-vous me donner plus d'informations ?`
    )

    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!pro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Profil non trouvé</h1>
          <Link href="/dashboard/client" className="text-indigo-600 hover:underline font-medium">Retour au marketplace</Link>
        </div>
      </div>
    )
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    : 0

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/client" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-black text-xl tracking-tight">
                <span className="text-indigo-600">JOB</span>
                <span className="text-slate-900">CONNECT</span>
              </span>
            </div>
          </Link>
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* HERO PROFILE */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 -mt-20 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-end gap-6">
                {/* Avatar */}
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white relative z-10">
                  {pro.avatar_url ? (
                    <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl text-white font-bold">
                      {pro.full_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="pb-2">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl font-black text-slate-900">{pro.full_name}</h1>
                    
                    {/* ✅ NOUVEAU BADGE DE VÉRIFICATION UNIQUE, BLEU ET TRÈS VISIBLE */}
                    {pro.is_verified && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full shadow-md shadow-blue-500/30 border border-blue-400/50" title="Professionnel Vérifié par JobConnect">
                        <BadgeCheck className="w-4 h-4" />
                        <span>Vérifié</span>
                      </div>
                    )}
                    
                    {/* ✅ BADGE INDISPONIBLE SI NÉCESSAIRE */}
                    {pro.is_available === false && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-500 text-white text-xs font-bold rounded-full shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Indisponible</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-lg text-indigo-600 font-semibold mb-2">{pro.specialty || 'Professionnel'}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {pro.city || 'Non renseigné'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> {pro.experience_years || 0} ans d'expérience
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pb-2">
                <button
                  onClick={toggleFavorite}
                  className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    isFavorite
                      ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                  {isFavorite ? 'En favoris' : 'Ajouter aux favoris'}
                </button>
                
                {/* ✅ BOUTON CONDITIONNEL SELON LA DISPONIBILITÉ */}
                {pro.is_available !== false ? (
                  <button
                    onClick={handleContactWhatsApp}
                    className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 flex items-center gap-2 shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Contacter sur WhatsApp
                  </button>
                ) : (
                  <div className="px-6 py-2.5 bg-slate-200 text-slate-500 rounded-xl font-semibold flex items-center gap-2 cursor-not-allowed">
                    <Clock className="w-4 h-4" />
                    Indisponible
                  </div>
                )}
              </div>
            </div>

            {/* Stats - Version simplifiée */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="text-center p-4 rounded-2xl bg-slate-50">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-slate-900">{avgRating.toFixed(1)}</span>
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{reviews.length} avis clients</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-50">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold text-slate-900">&lt;1h</span>
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Temps de réponse</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide">
            {[
              { id: 'about', label: 'À propos', icon: Briefcase },
              { id: 'portfolio', label: 'Réalisations', icon: Award },
              { id: 'reviews', label: 'Avis clients', icon: Star },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'portfolio' && portfolio.length > 0 && (
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">{portfolio.length}</span>
                )}
                {tab.id === 'reviews' && reviews.length > 0 && (
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">{reviews.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Description du professionnel</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                    {pro.bio || 'Aucune description disponible pour le moment.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-700">Téléphone</span>
                    </div>
                    <p className="text-slate-600 font-medium">{pro.phone || 'Non renseigné'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-700">Localisation</span>
                    </div>
                    <p className="text-slate-600 font-medium">{pro.city || 'Non renseigné'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-700">Membre depuis</span>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-bold text-slate-700">Expérience</span>
                    </div>
                    <p className="text-slate-600 font-medium">{pro.experience_years || 0} ans dans le métier</p>
                  </div>
                </div>

                {/* ✅ CARTE DE VÉRIFICATION AMÉLIORÉE */}
                {pro.is_verified && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-600/20">
                      <BadgeCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
                        Professionnel Vérifié par JobConnect
                      </h3>
                      <p className="text-sm text-blue-700 mt-1.5 leading-relaxed">
                        Ce professionnel a soumis ses documents d'identité et certifications. Ils ont été vérifiés avec succès par notre équipe pour garantir votre sécurité et la qualité des prestations.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Réalisations et projets ({portfolio.length})</h2>
                {portfolio.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Aucune réalisation publiée pour le moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map(item => (
                      <div key={item.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="relative overflow-hidden aspect-[4/3]">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="text-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-5xl font-black text-slate-900">{avgRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-slate-500 mt-2">Sur la base de {reviews.length} avis</p>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Aucun avis pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {/* ✅ AFFICHAGE DE L'AVATAR DU CLIENT S'IL EXISTE */}
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                              {review.reviewer_avatar ? (
                                <img src={review.reviewer_avatar} alt={review.reviewer_name} className="w-full h-full object-cover" />
                              ) : (
                                (review.reviewer_name || 'C').charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              {/* ✅ AFFICHAGE DU VRAI NOM DU CLIENT */}
                              <h3 className="font-bold text-slate-900 text-lg">{review.reviewer_name || 'Client anonyme'}</h3>
                              <p className="text-xs text-slate-500 font-medium">
                                {new Date(review.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-base">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✅ CTA ADAPTÉ SELON LA DISPONIBILITÉ */}
        {pro.is_available !== false ? (
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-indigo-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Intéressé par les services de {pro.full_name} ?</h2>
            <p className="text-indigo-100 mb-8 text-lg max-w-2xl mx-auto">Contactez-le directement sur WhatsApp pour discuter de votre projet, demander un devis ou poser vos questions.</p>
            <button
              onClick={handleContactWhatsApp}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all shadow-xl flex items-center gap-3 mx-auto text-lg hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-6 h-6" />
              Contacter sur WhatsApp
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-400 to-slate-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl">
            <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{pro.full_name} est temporairement indisponible</h2>
            <p className="text-slate-100 mb-6 text-lg max-w-2xl mx-auto">Ce professionnel n'accepte pas de nouvelles missions pour le moment. Vous pouvez toujours l'ajouter à vos favoris pour le contacter plus tard.</p>
            <button
              onClick={toggleFavorite}
              className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-xl flex items-center gap-3 mx-auto text-lg"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-600' : ''}`} />
              {isFavorite ? 'Déjà en favoris' : 'Ajouter aux favoris'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}