// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { 
  Check, Zap, TrendingUp, Crown, ShieldCheck, Info, 
  ArrowRight, Loader2, CreditCard, Star, Building2 
} from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [currentPlan, setCurrentPlan] = useState<string>('gratuit')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)

  // 1. Récupérer le statut de l'utilisateur au chargement
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsLoggedIn(true)
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', session.user.id)
          .single()
        
        if (profile) {
          setCurrentPlan(profile.plan?.toLowerCase() || 'gratuit')
        }
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  // 2. Données des plans (Prix annuels = Prix mensuel * 12 * 0.90)
  const plans = [
    {
      name: 'Gratuit',
      monthlyPrice: 0,
      annualPrice: 0,
      description: "L'essentiel pour démarrer sans barrière financière.",
      features: [
        'Profil professionnel complet',
        'Publication de services illimitée',
        'Présence sur la marketplace',
        'Recherches et classement standards',
        'Réception de demandes et avis clients'
      ],
      highlight: false,
      color: 'border-slate-200 dark:border-slate-700',
      btnColor: 'bg-slate-600 hover:bg-slate-700'
    },
    {
      name: 'Starter',
      monthlyPrice: 2000,
      annualPrice: 21600, // 24 000 - 10%
      description: "L'accélérateur pour obtenir une première augmentation de visibilité.",
      features: [
        'Tous les avantages du plan Gratuit',
        'Visibilité nettement supérieure',
        'Mise en avant ciblée dans votre catégorie',
        'Exposition renforcée sur pages stratégiques',
        'Positionnement prioritaire dans les recherches'
      ],
      highlight: false,
      color: 'border-emerald-200 dark:border-emerald-800',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      name: 'Business',
      monthlyPrice: 3500,
      annualPrice: 37800, // 42 000 - 10%
      description: "Le plan recommandé pour les professionnels actifs qui veulent consolider leur activité.",
      features: [
        'Tous les avantages du plan Starter',
        'Mise en avant supérieure et emplacements privilégiés',
        'Positionnement dans le haut du classement (Top)',
        'Visibilité renforcée sur les pages les plus consultées',
        'Présence prioritaire dans la marketplace'
      ],
      highlight: true, // ✅ Plan recommandé
      color: 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10',
      btnColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Premium',
      monthlyPrice: 7500,
      annualPrice: 81000, // 90 000 - 10%
      description: "La visibilité maximale pour dominer votre marché local.",
      features: [
        'Tous les avantages du plan Business',
        'Visibilité maximale et mise en avant prioritaire absolue',
        'Présence exclusive en page d\'accueil',
        'Notifications prioritaires pour les nouvelles demandes',
        '🎁 Accès au Programme Partenaire Ideenwerk (-20%)'
      ],
      highlight: false,
      color: 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10',
      btnColor: 'bg-amber-600 hover:bg-amber-700'
    }
  ]

  // 3. Fonction de formatage des prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  // 4. Gestion du clic sur un plan (SÉCURISÉE)
  const handleSubscribe = async (planName: string) => {
    const planKey = planName.toLowerCase()
    
    if (!isLoggedIn) {
      // Redirection vers l'inscription avec le plan pré-sélectionné
      router.push(`/register?role=pro&plan=${planKey}`)
      return
    }

    if (currentPlan === planKey) {
      alert("Vous êtes déjà abonné à ce plan !")
      return
    }

    // Si l'utilisateur veut passer au plan gratuit, on le redirige vers son dashboard
    if (planKey === 'gratuit') {
      router.push('/dashboard/pro')
      return
    }

    setProcessingPlan(planKey)
    try {
      // 🚨 SÉCURITÉ : On n'envoie PAS le montant. On envoie le billingCycle.
      // Le backend (/api/checkout) recalculera le montant de manière sécurisée.
      const session = await supabase.auth.getSession()
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.data.session?.user.id,
          planName: planName,
          billingCycle: billingCycle, // ← C'EST LA CLÉ : le backend utilisera ceci pour appliquer les -10%
          userEmail: session.data.session?.user.email
        })
      })
      
      const data = await res.json()
      
      if (data.success) {
        window.location.href = data.checkoutUrl
      } else {
        alert('Erreur: ' + (data.message || 'Impossible de créer le paiement'))
      }
    } catch (error) {
      console.error("Erreur de paiement:", error)
      alert("Une erreur est survenue lors de l'initialisation du paiement.")
    } finally {
      setProcessingPlan(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Investissez dans votre <span className="text-amber-300">visibilité</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Chez JobConnect, vous ne payez pas pour des fonctionnalités limitées. 
            Tous les plans incluent des services illimités et <strong className="text-white">0% de commission</strong> sur vos prestations.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        
        {/* Toggle Mensuel / Annuel */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-lg border border-slate-200 dark:border-slate-800 inline-flex gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                billingCycle === 'monthly' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Facturation mensuelle
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 relative ${
                billingCycle === 'annual' 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Facturation annuelle
              <span className="absolute -top-2.5 -right-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* Grille des Tarifs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, idx) => {
            const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
            const period = billingCycle === 'monthly' ? '/mois' : '/an'
            const monthlyEquiv = billingCycle === 'annual' && plan.monthlyPrice > 0 ? Math.round(currentPrice / 12) : plan.monthlyPrice
            const savings = plan.monthlyPrice > 0 ? (plan.monthlyPrice * 12) - plan.annualPrice : 0
            
            const isCurrent = currentPlan === plan.name.toLowerCase()

            return (
              <div 
                key={idx} 
                className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 ${
                  plan.highlight 
                    ? 'border-blue-500 dark:border-blue-400 shadow-2xl shadow-blue-500/20 scale-105 z-10' 
                    : `${plan.color} hover:shadow-xl`
                } bg-white dark:bg-slate-900`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white shadow-lg flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-white" />
                    Recommandé
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-2xl font-black mb-2 ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 min-h-[40px]">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                      {formatPrice(currentPrice)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">FCFA{period}</span>
                  </div>
                  
                  {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      Soit ~{formatPrice(monthlyEquiv)} FCFA/mois
                    </p>
                  )}

                  {billingCycle === 'annual' && savings > 0 && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-bold">
                      <TrendingUp className="w-3 h-3" />
                      Économisez {formatPrice(savings)} FCFA/an
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500'}`} />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isCurrent || processingPlan === plan.name.toLowerCase()}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    isCurrent 
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-default' 
                      : `${plan.btnColor} text-white shadow-md hover:shadow-lg`
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Plan Actuel
                    </>
                  ) : processingPlan === plan.name.toLowerCase() ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {plan.name === 'Gratuit' ? 'S\'inscrire' : 'Mettre à jour'} <CreditCard className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Section Partenaire Ideenwerk */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 rounded-3xl p-8 md:p-12 mb-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Building2 className="w-10 h-10 text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <Star className="w-3 h-3 fill-amber-300" />
                Exclusivité Premium
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">
                Programme Partenaire Ideenwerk Technologies
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-3xl">
                En souscrivant au plan <strong className="text-white">Premium</strong>, vous devenez automatiquement 
                membre du programme partenaire. Bénéficiez d'une <strong className="text-amber-300">réduction de 20%</strong> sur l'ensemble des prestations numériques éligibles d'Ideenwerk Technologies (création de site web, application mobile, logiciel personnalisé, etc.).
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 inline-block">
                <p className="text-sm text-slate-300">
                  <span className="text-white font-bold">Exemple :</span> Un projet à 500 000 FCFA vous revient à 
                  <span className="text-amber-300 font-black text-lg ml-2">400 000 FCFA</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Transparence & FAQ Rapide */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 md:p-8 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 text-lg">Notre engagement de transparence</h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-disc list-inside">
                <li><strong className="text-blue-950 dark:text-blue-50">0% de commission :</strong> Vous gardez 100% de vos gains. Le client vous paie directement.</li>
                <li><strong className="text-blue-950 dark:text-blue-50">Services illimités :</strong> Publiez autant de services que vous le souhaitez, sur tous les plans.</li>
                <li><strong className="text-blue-950 dark:text-blue-50">Visibilité uniquement :</strong> Votre abonnement influence uniquement votre position dans les résultats de recherche.</li>
                <li><strong className="text-blue-950 dark:text-blue-50">Vérification indépendante :</strong> Le badge "Pro Vérifié" est un processus de contrôle d'identité séparé (5 000 FCFA/an), accessible à tous les professionnels, quel que soit leur forfait.</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}