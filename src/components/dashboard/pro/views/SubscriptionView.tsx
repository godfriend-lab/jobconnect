// @ts-nocheck
'use client'

import { useState } from 'react'
import { Home, Crown, Award, Zap, CheckCircle, CheckCircle2, Loader2, CreditCard, Info, TrendingUp } from 'lucide-react'

export default function SubscriptionView({ profile, initiatePayment }: any) {
  const [billingCycle, setBillingCycle] = useState<'semester' | 'annual'>('semester')
  const [uploading, setUploading] = useState(false)
  
  const currentPlan = profile?.plan?.toLowerCase() || 'gratuit'
  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"

  const handlePayment = async (planName: string, amount: number) => {
    setUploading(true)
    await new Promise(r => setTimeout(r, 1000)) // Simulation
    // En production : const res = await initiatePayment(planName, amount)
    alert(`🚧 MODE DÉMO : Paiement de ${amount} FCFA pour ${planName} simulé !`)
    setUploading(false)
  }

  const plans = [
    { 
      name: 'Starter', 
      semesterPrice: 30000, 
      annualPrice: 50000, 
      features: ['Visibilité accrue', 'Mise en avant locale', 'Support prioritaire'], 
      color: 'border-emerald-200 dark:border-emerald-800', 
      btnColor: 'bg-emerald-600 hover:bg-emerald-700', 
      disabled: currentPlan === 'starter' 
    },
    { 
      name: 'Business', 
      semesterPrice: 75000, 
      annualPrice: 125000, 
      features: ['Tout Starter +', 'Top 5 recherches', 'Statistiques avancées'], 
      color: 'border-blue-200 dark:border-blue-800', 
      btnColor: 'bg-blue-600 hover:bg-blue-700', 
      disabled: currentPlan === 'business' 
    },
    { 
      name: 'Premium', 
      semesterPrice: 150000, 
      annualPrice: 250000, 
      features: ['Tout Business +', 'Top 1 garanti', '-20% Ideenwerk'], 
      color: 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10', 
      btnColor: 'bg-amber-600 hover:bg-amber-700', 
      disabled: currentPlan === 'premium', 
      highlight: true 
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Abonnement</h1>
          <p className={`text-sm ${textSecondary}`}>Gérez votre visibilité et votre forfait actuel.</p>
        </div>
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md"
        >
          <Home className="w-4 h-4" /> Mon Espace
        </button>
      </div>

      {/* Current Plan Card */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className={`text-sm font-medium ${textSecondary} mb-1`}>Votre forfait actuel</p>
            <div className="flex items-center gap-3">
              <h2 className={`text-3xl font-black ${textPrimary} capitalize`}>
                {currentPlan === 'gratuit' ? 'Gratuit' : currentPlan}
              </h2>
              {currentPlan === 'premium' && <Crown className="w-8 h-8 text-amber-500 fill-amber-500" />}
              {currentPlan === 'business' && <Award className="w-8 h-8 text-blue-500" />}
              {currentPlan === 'starter' && <Zap className="w-8 h-8 text-emerald-500" />}
              {currentPlan === 'gratuit' && <CheckCircle className="w-8 h-8 text-slate-500" />}
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm ${textSecondary}`}>Prochaine échéance</p>
            <p className={`text-lg font-bold ${textPrimary}`}>
              {currentPlan === 'premium' ? '250 000 FCFA/an' : currentPlan === 'business' ? '125 000 FCFA/an' : currentPlan === 'starter' ? '50 000 FCFA/an' : 'Gratuit'}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-md border border-slate-200 dark:border-slate-700 inline-flex gap-1">
          <button 
            onClick={() => setBillingCycle('semester')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              billingCycle === 'semester' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Semestriel
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
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">-17%</span>
          </button>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan: any, idx: number) => {
          const price = billingCycle === 'semester' ? plan.semesterPrice : plan.annualPrice
          return (
            <div key={idx} className={`${cardBg} border-2 ${plan.color} rounded-2xl p-6 shadow-sm flex flex-col relative`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-white" /> Recommandé
                </div>
              )}
              <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-3xl font-black ${textPrimary}`}>{new Intl.NumberFormat('fr-FR').format(price)}</span>
                <span className={`text-sm ${textSecondary}`}>FCFA{billingCycle === 'semester' ? '/6 mois' : '/an'}</span>
              </div>
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
                disabled={plan.disabled || uploading} 
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.disabled ? 'bg-slate-400 cursor-not-allowed' : plan.btnColor
                }`}
              >
                {plan.disabled ? 'Forfait actuel' : (uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />)}
                {plan.disabled ? 'Actif' : 'Mettre à jour'}
              </button>
            </div>
          )
        })}
      </div>
      
      {/* ✅ CARTE TRANSPARENCE CORRIGÉE (Meilleur contraste et lisibilité) */}
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
    </div>
  )
}