// @ts-nocheck
"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { Check, X, Star, Zap, Crown, Rocket, ArrowRight, HelpCircle, Sparkles, LogOut, User } from "lucide-react"

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

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          plan: planName,
          plan_updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.profile.id)

      if (error) throw error

      alert(`✅ Vous avez choisi le plan ${planName} !`)
      router.push('/dashboard/pro')
    } catch (error) {
      console.error('Erreur:', error)
      alert('❌ Erreur lors de la sélection du plan')
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
        { text: "5 candidatures par mois", included: true },
        { text: "Messagerie avec les clients", included: true },
        { text: "Avis clients", included: true },
        { text: "Mise en avant dans les résultats", included: false },
        { text: "Badge vérifié", included: false },
        { text: "Support prioritaire", included: false },
        { text: "Statistiques avancées", included: false },
      ],
      cta: "Commencer gratuitement",
    },
    {
      name: "Starter",
      monthlyPrice: "5 000",
      annualPrice: "49 800",
      description: "Pour les indépendants qui veulent se démarquer",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      popular: false,
      features: [
        { text: "Profil professionnel complet", included: true },
        { text: "20 candidatures par mois", included: true },
        { text: "Messagerie avec les clients", included: true },
        { text: "Avis clients", included: true },
        { text: "Mise en avant dans les résultats", included: true },
        { text: "Badge vérifié", included: true },
        { text: "Support prioritaire", included: false },
        { text: "Statistiques avancées", included: false },
      ],
      cta: "Choisir Starter",
    },
    {
      name: "Business",
      monthlyPrice: "12 000",
      annualPrice: "119 520",
      description: "Pour les professionnels établis qui veulent grandir",
      icon: Rocket,
      color: "from-blue-600 to-blue-700",
      popular: true,
      features: [
        { text: "Profil professionnel premium", included: true },
        { text: "Candidatures illimitées", included: true },
        { text: "Messagerie avec les clients", included: true },
        { text: "Avis clients", included: true },
        { text: "Mise en avant prioritaire", included: true },
        { text: "Badge vérifié", included: true },
        { text: "Support prioritaire", included: true },
        { text: "Statistiques avancées", included: true },
        { text: "Multi-utilisateurs (3 max)", included: true },
      ],
      cta: "Choisir Business",
    },
    {
      name: "Premium",
      monthlyPrice: "20 000",
      annualPrice: "199 200",
      description: "Pour les entreprises et équipes de professionnels",
      icon: Crown,
      color: "from-blue-700 to-blue-800",
      popular: false,
      features: [
        { text: "Profil entreprise premium", included: true },
        { text: "Candidatures illimitées", included: true },
        { text: "Messagerie avec les clients", included: true },
        { text: "Avis clients", included: true },
        { text: "Mise en avant #1", included: true },
        { text: "Badge vérifié premium", included: true },
        { text: "Support dédié 24/7", included: true },
        { text: "Statistiques avancées", included: true },
        { text: "Multi-utilisateurs illimités", included: true },
      ],
      cta: "Choisir Premium",
    },
  ]

  const displayPlans = isAnnual ? allPlans.filter(plan => plan.name !== "Gratuit") : allPlans

  const faqs = [
    {
      question: "Puis-je changer de plan à tout moment ?",
      answer: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. La facturation sera ajustée au prorata."
    },
    {
      question: "Y a-t-il une période d'essai ?",
      answer: "Oui, tous les plans payants bénéficient d'une période d'essai gratuite de 7 jours. Vous pouvez annuler à tout moment."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons Mobile Money (T-Money, Flooz), les cartes bancaires (Visa, Mastercard) et les virements bancaires."
    },
    {
      question: "Comment fonctionne la réduction annuelle ?",
      answer: "En choisissant la facturation annuelle, vous bénéficiez d'une réduction de 17% par rapport à la facturation mensuelle."
    },
    {
      question: "Puis-je annuler mon abonnement ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment. Vous continuerez à bénéficier des avantages jusqu'à la fin de la période facturée."
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION - 100% PRO
          ══════════════════════════════════════════════════════════════ */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo → toujours vers dashboard pro */}
            <Link 
              href={currentUser ? '/dashboard/pro' : '/'} 
              className="flex items-center gap-3"
            >
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  JOBCONNECT
                </span>
              </span>
            </Link>
            
            {/* Navigation droite */}
            <div className="flex items-center gap-4">
              
              {/* ═══════ UTILISATEUR CONNECTÉ ═══════ */}
              {currentUser && (
                <>
                  {/* Badge plan actuel */}
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                    <Crown className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">
                      Plan : <strong>{currentPlan}</strong>
                    </span>
                  </div>
                  
                  {/* Menu utilisateur */}
                  <div className="relative">
                    <button 
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition"
                    >
                      {userName.charAt(0).toUpperCase()}
                    </button>
                    
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                          <div className="p-4 border-b border-gray-100">
                            <p className="font-bold text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500">Professionnel</p>
                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                              <Crown className="w-3 h-3" />
                              Plan {currentPlan}
                            </div>
                          </div>
                          <div className="p-2">
                            <Link 
                              href="/dashboard/pro" 
                              onClick={() => setMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                            >
                              <User className="w-4 h-4" />
                              <span>Mon espace</span>
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

              {/* ═══════ NON CONNECTÉ ═══════ */}
              {!currentUser && (
                <>
                  <Link href="/" className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition">
                    Accueil
                  </Link>
                  <Link href="/#categories" className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition">
                    Services
                  </Link>
                  <Link href="/pricing" className="hidden md:block text-blue-600 font-semibold">
                    Tarifs
                  </Link>
                  <Link href="/login" className="hidden md:block text-gray-700 hover:text-blue-600 font-medium transition">
                    Connexion
                  </Link>
                  <Link 
                    href="/register?role=pro" 
                    className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
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
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Tarifs simples et transparents</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="text-gray-900">Choisissez le plan</span><br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              qui vous correspond
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Des tarifs adaptés à tous les professionnels, du débutant à l'entreprise établie.
          </p>

          {/* Toggle Mensuel / Annuel */}
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-blue-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                !isAnnual 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              MENSUEL
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                isAnnual 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ANNUEL
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isAnnual ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-700'
              }`}>
                -17%
              </span>
            </button>
          </div>

          {/* Message pour les pros connectés */}
          {currentUser && (
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 rounded-full border border-green-200">
              <Check className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Vous êtes connecté • Plan actuel : <strong>{currentPlan}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PRICING CARDS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-6 max-w-6xl mx-auto ${
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
                  className={`relative rounded-3xl p-6 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl scale-105 border-4 border-amber-400' 
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

                  {isAnnual && plan.name !== "Gratuit" && !isCurrentPlan && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        -17%
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
                  
                  <p className={`text-xs mb-4 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
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
                      <p className={`text-xs mt-1 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`}>
                        Économisez {Math.round(parseInt(plan.monthlyPrice.replace(/\s/g, '')) * 12 * 0.17).toLocaleString()} FCFA/an
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-blue-500'}`} />
                        ) : (
                          <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white/40' : 'text-gray-400'}`} />
                        )}
                        <span className={`text-xs ${
                          feature.included 
                            ? (plan.popular ? 'text-white' : 'text-gray-700')
                            : (plan.popular ? 'text-white/40' : 'text-gray-400')
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* ═══════ BOUTON ADAPTATIF ═══════ */}
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
                          ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link 
                      href="/register?role=pro"
                      className={`block w-full text-center py-3 rounded-xl font-semibold transition-all text-sm ${
                        plan.popular
                          ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              )
            })}
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
              Questions <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">fréquentes</span>
            </h2>
            <p className="text-gray-600 text-lg">Tout ce que vous devez savoir sur nos tarifs</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
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
          CTA SECTION - 100% PRO
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui ont déjà choisi JOBCONNECT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link 
                href="/dashboard/pro" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Mon espace Pro
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                href="/register?role=pro" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Devenir professionnel
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 JOBCONNECT. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}