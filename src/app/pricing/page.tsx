// @ts-nocheck
"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { Check, X, Star, Zap, Crown, Rocket, ArrowRight, HelpCircle, LogOut, User, ShieldCheck } from "lucide-react"

export default function PricingPage() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setCurrentUser(null)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      setCurrentUser({ session, profile })
    } catch (error) {
      console.error('Erreur:', error)
      setCurrentUser(null)
    } finally {
      setLoading(false)
    }
  }

  const currentPlan = currentUser?.profile?.plan || 'Gratuit'
  const userName = currentUser?.profile?.full_name || 'Utilisateur'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setCurrentUser(null)
    router.push('/login')
  }

  const handlePlanSelect = async (planName: string) => {
    if (!currentUser) {
      router.push('/login?redirect=pricing')
      return
    }

    if (planName === currentPlan) {
      alert('Vous êtes déjà sur ce plan.')
      return
    }

    // ⚠️ TODO: INTÉGRATION PAYDUNYA ICI
    // Rediriger vers la page de paiement PayDunya avec le montant du plan choisi.
    // Exemple: router.push(`/payment?plan=${planName}&amount=...`)
    
    // Pour l'instant, on simule la mise à jour (à remplacer par le webhook PayDunya plus tard)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          plan: planName,
          plan_updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.profile.id)

      if (error) throw error

      alert(`✅ Redirection vers le paiement sécurisé (PayDunya) pour le plan ${planName}...`)
      // router.push('/dashboard/pro')
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de la préparation du paiement')
    }
  }

  const allPlans = [
    {
      name: "Gratuit",
      monthlyPrice: "0",
      annualPrice: "0",
      description: "Parfait pour démarrer et découvrir la plateforme",
      icon: Star,
      color: "from-gray-500 to-gray-600",
      popular: false,
      features: [
        { text: "Profil professionnel de base", included: true },
        { text: "1 service publié", included: true },
        { text: "Messagerie avec les clients", included: true },
        { text: "Avis clients", included: true },
        { text: "Mise en avant dans les résultats", included: false },
        { text: "Statistiques avancées", included: false },
      ],
      cta: "Commencer gratuitement",
    },
    {
      name: "Starter",
      monthlyPrice: "5 000",
      annualPrice: "50 000", // ~17% de réduction
      description: "Pour les indépendants qui veulent se démarquer",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        { text: "Profil professionnel complet", included: true },
        { text: "Jusqu'à 5 services publiés", included: true },
        { text: "Mise en avant standard dans les résultats", included: true },
        { text: "Messagerie et avis clients", included: true },
        { text: "Statistiques de base", included: true },
        { text: "Support par email", included: true },
      ],
      cta: "Choisir Starter",
    },
    {
      name: "Business",
      monthlyPrice: "8 500",
      annualPrice: "85 000", 
      description: "Le meilleur rapport qualité-prix pour les pros actifs",
      icon: Rocket,
      color: "from-indigo-500 to-purple-500",
      popular: true,
      features: [
        { text: "Profil professionnel premium", included: true },
        { text: "Jusqu'à 20 services publiés", included: true },
        { text: "Mise en avant prioritaire (+50% visibilité)", included: true },
        { text: "Badge 'Populaire' sur le profil", included: true },
        { text: "Statistiques détaillées", included: true },
        { text: "Support prioritaire WhatsApp", included: true },
      ],
      cta: "Choisir Business",
    },
    {
      name: "Premium",
      monthlyPrice: "12 500",
      annualPrice: "125 000",
      description: "Visibilité maximale pour les professionnels établis",
      icon: Crown,
      color: "from-amber-500 to-orange-500",
      popular: false,
      features: [
        { text: "Profil entreprise premium", included: true },
        { text: "Services illimités", included: true },
        { text: "Positionnement #1 dans votre catégorie", included: true },
        { text: "Badge 'Premium' exclusif", included: true },
        { text: "Statistiques avancées + rapports", included: true },
        { text: "Support dédié 24/7", included: true },
        { text: "Mise en avant sur la page d'accueil", included: true },
      ],
      cta: "Choisir Premium",
    },
  ]

  const displayPlans = isAnnual ? allPlans.filter(plan => plan.name !== "Gratuit") : allPlans

  const faqs = [
    {
      question: "Le Badge 'Pro Vérifié' est-il inclus dans les forfaits ?",
      answer: "Non, le Badge 'Pro Vérifié' est un service de confiance séparé. Vous pouvez l'acheter pour 5 000 FCFA/an directement dans votre Tableau de Bord > Onglet 'Vérification' après avoir soumis vos documents."
    },
    {
      question: "Puis-je changer de plan de visibilité à tout moment ?",
      answer: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. La facturation sera ajustée au prorata."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Tous les paiements sont sécurisés via PayDunya. Vous pouvez payer par Mobile Money (T-Money, Flooz) ou par Carte Bancaire (Visa, Mastercard)."
    },
    {
      question: "Comment fonctionne la réduction annuelle ?",
      answer: "En choisissant la facturation annuelle, vous bénéficiez d'une réduction d'environ 17% (soit 2 mois offerts) par rapport à la facturation mensuelle."
    },
    {
      question: "Puis-je annuler mon abonnement ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Vous continuerez à bénéficier des avantages jusqu'à la fin de la période facturée."
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des tarifs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
          ══════════════════════════════════════════════════════════════ */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href={currentUser ? '/dashboard/pro' : '/'} 
              className="flex items-center gap-3"
            >
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  JOBCONNECT
                </span>
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              {currentUser && (
                <>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                    <Crown className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-700">
                      Plan : <strong>{currentPlan}</strong>
                    </span>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition"
                    >
                      {userName.charAt(0).toUpperCase()}
                    </button>
                    
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                          <div className="p-4 border-b border-gray-100">
                            <p className="font-bold text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500">Espace Professionnel</p>
                          </div>
                          <div className="p-2">
                            <Link 
                              href="/dashboard/pro" 
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                            >
                              <User className="w-4 h-4" />
                              <span>Mon tableau de bord</span>
                            </Link>
                            <button 
                              onClick={() => { handleLogout(); setMenuOpen(false) }}
                              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Déconnexion</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {!currentUser && (
                <>
                  <Link href="/" className="hidden md:block text-gray-700 hover:text-indigo-600 font-medium transition">
                    Accueil
                  </Link>
                  <Link href="/login" className="hidden md:block text-gray-700 hover:text-indigo-600 font-medium transition">
                    Connexion
                  </Link>
                  <Link 
                    href="/register?role=pro" 
                    className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    S'inscrire
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-indigo-200">
            <span className="text-sm font-semibold text-gray-700">Boostez votre visibilité sur la marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="text-gray-900">Choisissez votre plan</span><br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              de visibilité
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Des tarifs adaptés à tous les professionnels. 
            <span className="block mt-2 text-indigo-600 font-semibold">
              🛡️ Le Badge "Pro Vérifié" s'obtient séparément pour 5 000 FCFA/an dans votre tableau de bord.
            </span>
          </p>

          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-indigo-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                !isAnnual 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              MENSUEL
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                isAnnual 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ANNUEL
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isAnnual ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
              }`}>
                -17%
              </span>
            </button>
          </div>

          {currentUser && (
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 rounded-full border border-green-200">
              <Check className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Connecté en tant que Pro • Plan actuel : <strong>{currentPlan}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRICING CARDS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-8 max-w-6xl mx-auto ${
            displayPlans.length === 4 
              ? 'md:grid-cols-2 lg:grid-cols-4' 
              : displayPlans.length === 3 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'md:grid-cols-1 lg:grid-cols-2'
          }`}>
            {displayPlans.map((plan, index) => {
              const Icon = plan.icon
              const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice
              const currentPeriod = isAnnual ? "FCFA/an" : "FCFA/mois"
              const isCurrentPlan = currentUser && plan.name === currentPlan
              
              return (
                <div 
                  key={index} 
                  className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl scale-105 border-4 border-amber-400' 
                      : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                        ⭐ RECOMMANDÉ
                      </div>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Check className="w-3 h-3" />
                        ACTUEL
                      </div>
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    plan.popular 
                      ? 'bg-white/20' 
                      : `bg-gradient-to-br ${plan.color}`
                  }`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`text-xs mb-4 min-h-[40px] ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        {currentPrice}
                      </span>
                      <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                        {currentPeriod}
                      </span>
                    </div>
                    {isAnnual && plan.name !== "Gratuit" && (
                      <p className={`text-xs mt-1 ${plan.popular ? 'text-indigo-200' : 'text-indigo-600'}`}>
                        Économisez {Math.round(parseInt(plan.monthlyPrice.replace(/\s/g, '')) * 12 * 0.17).toLocaleString()} FCFA/an
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-green-300' : 'text-green-500'}`} />
                        ) : (
                          <X className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white/40' : 'text-gray-400'}`} />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? (plan.popular ? 'text-white' : 'text-gray-700')
                            : (plan.popular ? 'text-white/40' : 'text-gray-400')
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <div className={`block w-full text-center py-3 rounded-xl font-semibold text-sm ${
                      plan.popular
                        ? 'bg-white/20 text-white border-2 border-white/40'
                        : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                    }`}>
                      ✓ Plan actuel
                    </div>
                  ) : currentUser ? (
                    <button
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition-all text-sm ${
                        plan.popular
                          ? 'bg-white text-indigo-600 hover:bg-gray-100 shadow-lg'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link 
                      href="/register?role=pro"
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition-all text-sm ${
                        plan.popular
                          ? 'bg-white text-indigo-600 hover:bg-gray-100 shadow-lg'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {/* ═══════ BANNIÈRE BADGE VÉRIFIÉ ═══════ */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Obtenez le Badge "Pro Vérifié"
                </h3>
                <p className="text-gray-600 mb-4">
                  Rassurez vos clients en affichant le badge de confiance. Soumettez vos documents (CNI/Diplôme) et réglez les frais de vérification.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <span className="text-3xl font-extrabold text-emerald-700">5 000 FCFA <span className="text-lg font-medium text-emerald-600">/ an</span></span>
                  {currentUser ? (
                    <Link 
                      href="/dashboard/pro" 
                      className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
                    >
                      Aller à la vérification
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link 
                      href="/register?role=pro" 
                      className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
                    >
                      Créer un compte Pro d'abord
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">
              Questions <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">fréquentes</span>
            </h2>
            <p className="text-gray-600 text-lg">Tout ce que vous devez savoir sur nos tarifs et paiements</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont déjà choisi JOBCONNECT pour trouver de nouveaux clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link 
                href="/dashboard/pro" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Mon espace Pro
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                href="/register?role=pro" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Devenir professionnel
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 opacity-80">
            <span className="text-sm font-semibold">Paiements sécurisés par :</span>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">T-Money</span>
              <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">Flooz</span>
              <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold">Visa / Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 JOBCONNECT. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}