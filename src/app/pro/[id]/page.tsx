'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import {
  MapPin, Star, Shield, Phone, MessageSquare,
  Award, Crown, Sparkles, Clock, CheckCircle,
  Heart, ArrowLeft, Loader2, Calendar,
  Briefcase, ThumbsUp, Zap
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
      console.log('🔍 Chargement du profil:', params.id)
      
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
        // Récupérer l'utilisateur connecté pour savoir qui consulte
        const { data: { user } } = await supabase.auth.getUser()
        const isOwner = user?.id === params.id
        
        // Incrémenter les vues SEULEMENT si ce n'est pas le pro lui-même
        if (!isOwner) {
          console.log('👁️ Incrémentation des vues pour le pro:', params.id)
          
          // 1. Incrémenter le compteur total dans la table profiles
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              profile_views: (data.profile_views || 0) + 1 
            })
            .eq('id', params.id)
            
          if (updateError) {
            console.error('❌ Erreur mise à jour profile_views:', updateError)
          } else {
            console.log('✅ profile_views mis à jour avec succès')
          }
          
          // 2. Enregistrer dans l'historique des vues pour le dashboard du pro
          let viewerName = 'Visiteur anonyme'
          let viewerAvatar = null
          
          if (user) {
            const { data: viewerData, error: viewerError } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', user.id)
              .single()
            
            if (viewerError) {
              console.error('❌ Erreur récupération viewer:', viewerError)
            } else if (viewerData) {
              viewerName = viewerData.full_name || 'Visiteur'
              viewerAvatar = viewerData.avatar_url
            }
          }

          const { error: historyError } = await supabase
            .from('profile_views_history')
            .insert({
              pro_id: params.id,
              viewer_id: user?.id || null,
              viewer_name: viewerName,
              viewer_avatar: viewerAvatar
            })
            
          if (historyError) {
            console.error('❌ Erreur insertion history:', historyError)
          } else {
            console.log('✅ Historique des vues enregistré avec succès')
          }
        } else {
          console.log('ℹ️ Le propriétaire consulte son propre profil, pas d\'incrémentation.')
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
      
      if (error) {
        console.error('Erreur portfolio:', error)
      } else if (data) {
        setPortfolio(data)
      }
    } catch (error) { 
      console.error('Erreur portfolio:', error) 
    }
  }

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('reviewee_id', params.id)
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (error) {
        console.error('Erreur reviews:', error)
      } else if (data) {
        setReviews(data)
      }
    } catch (error) { 
      console.error('Erreur reviews:', error) 
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

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Erreur favori:', error)
      } else if (data) {
        setIsFavorite(true)
      }
    } catch (error) { 
      console.error('Erreur toggle favori:', error) 
    }
  }

  const toggleFavorite = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      if (isFavorite) {
        const { error } = await supabase.from('favorites').delete()
          .eq('client_id', session.user.id)
          .eq('pro_id', params.id)
        if (error) throw error
        setIsFavorite(false)
      } else {
        const { error } = await supabase.from('favorites').insert({
          client_id: session.user.id,
          pro_id: params.id
        })
        if (error) throw error
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

    const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const LevelBadge = ({ plan }: { plan: string }) => {
    if (!plan || plan === 'Gratuit') return null
    const config: Record<string, { colors: string[]; icon: any; label: string }> = {
      'Starter': { colors: ['#3B82F6', '#1D4ED8'], icon: Zap, label: 'Starter' },
      'Business': { colors: ['#10B981', '#047857'], icon: Sparkles, label: 'Business' },
      'Premium': { colors: ['#FBBF24', '#D97706'], icon: Crown, label: 'Premium' }
    }
    const { colors, icon: Icon, label } = config[plan] || config['Starter']
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white"
           style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
        <Icon className="w-3 h-3" />
        {label}
      </div>
    )
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
          <Link href="/dashboard/client" className="text-indigo-600 hover:underline">Retour au marketplace</Link>
        </div>
      </div>
    )
  }

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    : 0

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER - SANS CONNEXION/INSCRIPTION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/client" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div>
              <span className="font-black text-xl">
                <span className="text-indigo-600">JOB</span>
                <span className="text-slate-900">CONNECT</span>
              </span>
            </div>
          </Link>
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
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
                {/* Avatar - Z-INDEX AJOUTÉ POUR ÊTRE BIEN VISIBLE */}
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
                    {pro.is_verified && (
                      <div className="bg-blue-500 text-white p-1 rounded-full" title="Pro Vérifié">
                        <Shield className="w-4 h-4" />
                      </div>
                    )}
                    <LevelBadge plan={pro.plan} />
                  </div>
                  <p className="text-lg text-indigo-600 font-semibold mb-2">{pro.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {pro.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> {pro.experience_years || 0} ans d'expérience
                    </span>
                    {/* ✅ NOMBRE DE VUES SUPPRIMÉ D'ICI (Le client ne le voit pas) */}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pb-2">
                <button
                  onClick={toggleFavorite}
                  className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition ${
                    isFavorite
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                  {isFavorite ? 'Favori' : 'Ajouter'}
                </button>
                <button
                  onClick={handleContactWhatsApp}
                  className="px-6 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 flex items-center gap-2 shadow-lg shadow-green-200 transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contacter sur WhatsApp
                </button>
              </div>
            </div>

            {/* Stats (Sans les vues) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-slate-900">{avgRating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-slate-500">{reviews.length} avis</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold text-slate-900">{pro.completed_missions || 0}</span>
                </div>
                <p className="text-xs text-slate-500">Missions</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold text-slate-900">&lt;1h</span>
                </div>
                <p className="text-xs text-slate-500">Temps de réponse</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {[
              { id: 'about', label: 'À propos', icon: Briefcase },
              { id: 'portfolio', label: 'Réalisations', icon: Award },
              { id: 'reviews', label: 'Avis', icon: Star },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'portfolio' && <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{portfolio.length}</span>}
                {tab.id === 'reviews' && <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{reviews.length}</span>}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Description</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {pro.bio || 'Aucune description disponible.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">Téléphone</span>
                    </div>
                    <p className="text-slate-600">{pro.phone || 'Non renseigné'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">Localisation</span>
                    </div>
                    <p className="text-slate-600">{pro.city || 'Non renseigné'}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">Membre depuis</span>
                    </div>
                    <p className="text-slate-600">
                      {pro.created_at ? new Date(pro.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }) : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">Expérience</span>
                    </div>
                    <p className="text-slate-600">{pro.experience_years || 0} ans</p>
                  </div>
                </div>

                {pro.is_verified && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-blue-900">Professionnel vérifié</h3>
                      <p className="text-sm text-blue-700">Ce professionnel a soumis ses documents d'identité et certifications. Ils ont été vérifiés par notre équipe.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6">Réalisations ({portfolio.length})</h2>
                {portfolio.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Aucune réalisation publiée pour le moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map(item => (
                      <div key={item.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="relative overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-600">{item.description}</p>
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
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="text-center">
                    <div className="text-5xl font-black text-slate-900">{avgRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{reviews.length} avis</p>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Aucun avis pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="bg-slate-50 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {(review.reviewer_name || 'C').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900">{review.reviewer_name || 'Client'}</h3>
                              <p className="text-xs text-slate-500">
                                {new Date(review.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Intéressé par les services de {pro.full_name} ?</h2>
          <p className="text-indigo-100 mb-6">Contactez-le directement sur WhatsApp pour discuter de votre projet</p>
          <button
            onClick={handleContactWhatsApp}
            className="px-8 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition shadow-xl flex items-center gap-2 mx-auto"
          >
            <MessageSquare className="w-5 h-5" />
            Contacter sur WhatsApp
          </button>
        </div>
      </main>
    </div>
  )
}