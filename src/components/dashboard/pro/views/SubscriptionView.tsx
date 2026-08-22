// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, Crown, Award, Zap, CheckCircle, CheckCircle2, 
  Loader2, CreditCard, Info, TrendingUp, Star, ExternalLink, ShieldCheck, X
} from 'lucide-react'

import PaymentRedirect from '@/components/PaymentRedirect'

export default function SubscriptionView({ profile }: any) {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  
  const currentPlan = profile?.plan?.toLowerCase() || 'gratuit'
  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"

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
      color: 'border-slate-200 dark:border-slate-700', 
      btnColor: 'bg-slate-600 hover:bg-slate-700', 
      disabled: currentPlan === 'gratuit' 
    },
    { 
      name: 'Starter', 
      monthlyPrice: 2000, 
      annualPrice: 21600,
      description: "L'accélérateur pour obtenir une première augmentation de visibilité.",
      features: [
        'Tous les avantages du plan Gratuit',
        'Visibilité nettement supérieure',
        'Mise en avant ciblée dans votre catégorie',
        'Exposition renforcée sur pages stratégiques',
        'Positionnement prioritaire dans les recherches'
      ],
      color: 'border-emerald-200 dark:border-emerald-800', 
      btnColor: 'bg-emerald-600 hover:bg-emerald-700', 
      disabled: currentPlan === 'starter' 
    },
    { 
      name: 'Business', 
      monthlyPrice: 3500, 
      annualPrice: 37800,
      description: "Le plan recommandé pour les professionnels actifs.",
      features: [
        'Tous les avantages du plan Starter',
        'Mise en avant supérieure et emplacements privilégiés',
        'Positionnement dans le haut du classement (Top)',
        'Visibilité renforcée sur les pages les plus consultées',
        'Présence prioritaire dans la marketplace'
      ],
      color: 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10', 
      btnColor: 'bg-blue-600 hover:bg-blue-700', 
      disabled: currentPlan === 'business',
      recommended: true
    },
    { 
      name: 'Premium', 
      monthlyPrice: 7500, 
      annualPrice: 81000,
      description: "La visibilité maximale pour dominer votre marché local.",
      features: [
        'Tous les avantages du plan Business',
        'Visibilité maximale et mise en avant prioritaire absolue',
        'Présence exclusive en page d\'accueil',
        'Notifications prioritaires pour les nouvelles demandes',
        '🎁 Accès au Programme Partenaire Ideenwerk (-20%)'
      ],
      color: 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10', 
      btnColor: 'bg-amber-600 hover:bg-amber-700', 
      disabled: currentPlan === 'premium' 
    }
  ]

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price)

  const handlePayment = (planName: string, displayedAmount: number) => {
    const planKey = planName.toLowerCase()
    
    if (currentPlan === planKey) {
      alert("Vous êtes déjà abonné à ce plan !")
      return
    }

    if (!profile?.phone) {
      alert("⚠️ Veuillez d'abord ajouter un numéro de téléphone dans votre profil avant de souscrire.")
      router.push('/dashboard/pro?view=profile')
      return
    }

    setSelectedPayment({
      amount: displayedAmount,
      phone: profile.phone,
      reason: `ProKorb - Abonnement ${planName} (${billingCycle === 'monthly' ? 'Mensuel' : 'Annuel'})`,
      planName: planName
    })
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = (response: any) => {
    console.log("✅ Paiement KKiaPay réussi :", response)
    setShowPaymentModal(false)
    alert("🎉 Paiement réussi ! Votre abonnement est en cours d'activation.")
    window.location.reload()
  }

  const currentPlanData = plans.find(p => p.name.toLowerCase() === currentPlan) || plans[0]
  const IconPlan = currentPlan === 'premium' ? Crown : currentPlan === 'business' ? Award : currentPlan === 'starter' ? Zap : CheckCircle
  const colorPlan = currentPlan === 'premium' ? 'text-amber-500' : currentPlan === 'business' ? 'text-blue-500' : currentPlan === 'starter' ? 'text-emerald-500' : 'text-slate-500'

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Abonnement</h1>
          <p className={`text-sm ${textSecondary}`}>Gérez votre visibilité et votre forfait actuel.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/pricing" 
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all text-sm"
          >
            <ExternalLink className="w-4 h-4" /> Voir tous les tarifs
          </Link>
          <button 
            onClick={() => router.push('/dashboard/pro')} 
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md text-sm"
          >
            <Home className="w-4 h-4" /> Mon Espace
          </button>
        </div>
      </div>

      <div className={`${cardBg} rounded-2xl p-6 shadow-sm border-l-4 ${
        currentPlan === 'premium' ? 'border-l-amber-500' : 
        currentPlan === 'business' ? 'border-l-blue-500' : 
        currentPlan === 'starter' ? 'border-l-emerald-500' : 'border-l-slate-400'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className={`text-sm font-medium ${textSecondary} mb-1`}>Votre forfait actuel</p>
            <div className="flex items-center gap-3">
              <h2 className={`text-3xl font-black ${textPrimary} capitalize`}>
                {currentPlan === 'gratuit' ? 'Gratuit' : currentPlan}
              </h2>
              <IconPlan className={`w-8 h-8 ${colorPlan} ${currentPlan === 'premium' ? 'fill-amber-500' : ''}`} />
              {profile?.is_verified && (
                <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-3 h-3" /> Vérifié
                </span>
              )}
            </div>
            <p className={`text-sm ${textSecondary} mt-2`}>{currentPlanData.description}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm ${textSecondary}`}>Prochaine échéance estimée</p>
            <p className={`text-lg font-bold ${textPrimary}`}>
              {currentPlan === 'premium' ? '81 000 FCFA/an' : 
               currentPlan === 'business' ? '37 800 FCFA/an' : 
               currentPlan === 'starter' ? '21 600 FCFA/an' : 'Gratuit'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-md border border-slate-200 dark:border-slate-700 inline-flex gap-1">
          <button 
            onClick={() => setBillingCycle('monthly')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              billingCycle === 'monthly' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Mensuel
          </button>
          <button 
            onClick={() => setBillingCycle('annual')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 relative ${
              billingCycle === 'annual' 
                ? 'bg-amber-500 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Annuel 
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">-10%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan: any, idx: number) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
          const period = billingCycle === 'monthly' ? '/mois' : '/an'
          const monthlyEquiv = billingCycle === 'annual' && plan.monthlyPrice > 0 ? Math.round(price / 12) : plan.monthlyPrice
          const savings = plan.monthlyPrice > 0 ? (plan.monthlyPrice * 12) - plan.annualPrice : 0
          
          return (
            <div key={idx} className={`${cardBg} border-2 ${plan.color} rounded-2xl p-6 shadow-sm flex flex-col relative`}>
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> Recommandé
                </div>
              )}
              <h3 className={`text-xl font-bold ${textPrimary} mb-1`}>{plan.name}</h3>
              <p className={`text-xs ${textSecondary} mb-3 min-h-[32px]`}>{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-3xl font-black ${textPrimary}`}>{formatPrice(price)}</span>
                <span className={`text-sm ${textSecondary}`}>FCFA{period}</span>
              </div>
              
              {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Soit ~{formatPrice(monthlyEquiv)} FCFA/mois
                </p>
              )}
              
              {billingCycle === 'annual' && savings > 0 && (
                <div className="mb-4 inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-bold w-fit">
                  <TrendingUp className="w-3 h-3" />
                  Économisez {formatPrice(savings)} FCFA/an
                </div>
              )}

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f: string, i: number) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${textSecondary}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => !plan.disabled && handlePayment(plan.name, price)} 
                disabled={plan.disabled} 
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${
                  plan.disabled ? 'bg-slate-400 cursor-not-allowed' : plan.btnColor
                }`}
              >
                {plan.disabled ? (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Plan Actif
                  </>
                ) : (
                  <>
                    {plan.name === 'Gratuit' ? 'Passer au gratuit' : 'Mettre à jour'} <CreditCard className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {currentPlan !== 'premium' && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 border border-white/20">
              <Crown className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <Star className="w-3 h-3 fill-amber-300" />
                Exclusivité Premium
              </div>
              <h3 className="text-xl font-bold mb-2">Programme Partenaire Ideenwerk Technologies</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Passez au plan Premium et bénéficiez automatiquement d'une <strong className="text-amber-300">réduction de 20%</strong> sur toutes les prestations numériques d'Ideenwerk Technologies (sites web, applications, logiciels personnalisés).
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 flex items-start gap-4">
        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3 text-lg">Transparence totale</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-blue-950 dark:text-blue-50">0% de commission :</strong> Vous gardez 100% de vos gains. Le client vous paie directement.
            </li>
            <li>
              <strong className="text-blue-950 dark:text-blue-50">Services illimités :</strong> Publiez autant de services que vous le souhaitez, sur tous les plans.
            </li>
            <li>
              <strong className="text-blue-950 dark:text-blue-50">Visibilité uniquement :</strong> Votre abonnement influence uniquement votre position dans les résultats.
            </li>
            <li>
              <strong className="text-blue-950 dark:text-blue-50">Vérification séparée :</strong> Le badge "Vérifié" (5 000 FCFA/an) est indépendant de votre forfait.
            </li>
            <li>
              <strong className="text-blue-950 dark:text-blue-50">Sans engagement :</strong> Vous pouvez changer ou annuler votre forfait à tout moment.
            </li>
          </ul>
        </div>
      </div>

      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPaymentModal(false)}
          />

          <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-md overflow-hidden animate-fade-in-up">
            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">Paiement Sécurisé</h3>
                <p className="text-indigo-100 text-sm">Via KKiaPay - Mobile Money</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Forfait</span>
                  <span className="text-white font-semibold">{selectedPayment.planName}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 text-sm">Période</span>
                  <span className="text-white font-semibold">
                    {billingCycle === 'annual' ? 'Annuel' : 'Mensuel'}
                  </span>
                </div>
                <div className="border-t border-slate-700 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-semibold">Total à payer</span>
                  <span className="text-2xl font-black text-emerald-400">
                    {formatPrice(selectedPayment.amount)} FCFA
                  </span>
                </div>
              </div>

              <PaymentRedirect 
                amount={selectedPayment.amount}
                phone={selectedPayment.phone}
                reason={selectedPayment.reason}
                userId={profile?.id}
                planName={selectedPayment.planName}
                billingCycle={billingCycle}
                onSuccess={handlePaymentSuccess}
              />

              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Transaction chiffrée et sécurisée par KKiaPay
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}