// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, CheckCircle2, Star, Crown, Award, Zap, 
  Building2, Info, Shield, ShieldCheck, Clock, TrendingUp,
  Eye, Search, Home as HomeIcon, MessageSquare
} from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'semester' | 'annual'>('semester')

  // ✅ PRIX CALCULÉS : Semestriel = base, Annuel = -17%
  const plans = [
    {
      name: "Starter",
      semesterPrice: 30000,
      annualPrice: 50000, // 30000 × 2 × 0.83 = 49 800 → arrondi
      icon: Zap,
      color: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
      description: "Pour les indépendants qui veulent être remarqués localement.",
      features: [
        { text: "Visibilité accrue dans les résultats de recherche", icon: Eye },
        { text: "Positionnement au milieu des résultats", icon: TrendingUp },
        { text: "Mise en avant dans votre ville", icon: Search },
        { text: "Support par email prioritaire", icon: MessageSquare },
      ]
    },
    {
      name: "Business",
      semesterPrice: 75000,
      annualPrice: 125000, // 75000 × 2 × 0.83 = 124 500 → arrondi
      icon: Award,
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-200 dark:border-blue-800",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      description: "Pour les professionnels établis qui veulent développer leur chiffre d'affaires.",
      features: [
        { text: "Tout le plan Starter, plus :", icon: CheckCircle2 },
        { text: "Haute visibilité (Top 5 des recherches)", icon: Eye },
        { text: "Mise en avant dans les pages de catégories", icon: Search },
        { text: "Statistiques avancées (vues, clics, conversions)", icon: TrendingUp },
        { text: "Badge 'Pro Actif' sur votre profil", icon: Award },
      ]
    },
    {
      name: "Premium",
      semesterPrice: 150000,
      annualPrice: 250000, // 150000 × 2 × 0.83 = 249 000 → arrondi
      icon: Crown,
      color: "from-amber-500 to-orange-600",
      borderColor: "border-amber-200 dark:border-amber-800",
      btnColor: "bg-amber-600 hover:bg-amber-700",
      highlight: true,
      description: "La visibilité maximale pour dominer votre marché local.",
      features: [
        { text: "Tout le plan Business, plus :", icon: CheckCircle2 },
        { text: "Visibilité MAXIMALE (Top 1 garanti dans votre zone)", icon: Eye },
        { text: "Présence en page d'accueil (section 'À la une')", icon: HomeIcon },
        { text: "Notification prioritaire pour les nouvelles demandes", icon: MessageSquare },
        { text: "🎁 Participation automatique au programme partenaire Ideenwerk Technologies (-20% sur tous leurs traitements)", icon: Star },
      ]
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Investissez dans votre <span className="text-amber-300">visibilité</span>
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Chez JobConnect, vous payez uniquement pour être vu par plus de clients. 
            0% de commission sur vos prestations, services illimités sur tous les plans.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        
        {/* Toggle Semestriel / Annuel */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-lg border border-slate-200 dark:border-slate-700 inline-flex gap-1">
            <button
              onClick={() => setBillingCycle('semester')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                billingCycle === 'semester' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              Semestriel (6 mois)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 relative ${
                billingCycle === 'annual' 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Star className="w-4 h-4" />
              Annuel
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, idx) => {
            const Icon = plan.icon
            const currentPrice = billingCycle === 'semester' ? plan.semesterPrice : plan.annualPrice
            const period = billingCycle === 'semester' ? '/6 mois' : '/an'
            const monthlyEquiv = Math.round(currentPrice / (billingCycle === 'semester' ? 6 : 12))
            
            return (
              <div 
                key={idx} 
                className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 ${
                  plan.highlight 
                    ? 'bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-400 dark:border-amber-600 shadow-2xl shadow-amber-200/50 dark:shadow-amber-900/30 scale-105 z-10' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3 h-3 fill-white" />
                    Meilleure offre
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-2xl font-black mb-2 ${plan.highlight ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                      {formatPrice(currentPrice)}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">FCFA{period}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ≈ {formatPrice(monthlyEquiv)} FCFA/mois
                  </p>
                  
                  {billingCycle === 'annual' && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-bold">
                      <TrendingUp className="w-3 h-3" />
                      Économisez {formatPrice((plan.semesterPrice * 2) - plan.annualPrice)} FCFA/an
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fIdx) => {
                    const FeatureIcon = feature.icon
                    return (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm">
                        <FeatureIcon className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-500'}`} />
                        <span className={`${plan.highlight ? 'text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                          {feature.text}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <Link 
                  href="/register?role=pro"
                  className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                    plan.highlight 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800 dark:hover:bg-slate-100'
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Section Vérification */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-200 dark:border-blue-800 p-8 md:p-12 mb-16 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Vérification de profil
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">5 000</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">FCFA/an</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Frais uniques annuels</p>
            </div>
            
            <div className="flex-1 space-y-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Disponible pour tous les professionnels</strong>, 
                qu'ils soient sur le plan Gratuit ou un forfait payant. La vérification est indépendante de votre abonnement de visibilité.
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { icon: Shield, text: "Badge bleu 'Vérifié' sur votre profil" },
                  { icon: TrendingUp, text: "Priorité dans les résultats de recherche" },
                  { icon: CheckCircle2, text: "Confiance accrue des clients (3x plus de contacts)" },
                  { icon: Clock, text: "Validité du badge : 1 an renouvelable" },
                ].map((item, i) => {
                  const ItemIcon = item.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                      <ItemIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{item.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Processus de vérification
                </h4>
                <ol className="text-sm text-amber-800 dark:text-amber-200 space-y-1.5 list-decimal list-inside">
                  <li>Paiement des frais de vérification (5 000 FCFA)</li>
                  <li>Soumission des documents requis (CNI, casier judiciaire, justificatif de qualification)</li>
                  <li>Examen par notre équipe sous 24-48h ouvrées</li>
                  <li>Attribution automatique du badge "Vérifié" si documents valides</li>
                </ol>
              </div>

              <Link 
                href="/verification"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md"
              >
                <ShieldCheck className="w-5 h-5" />
                Lancer ma vérification
              </Link>
            </div>
          </div>
        </div>

        {/* Partenariat Ideenwerk */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Building2 className="w-10 h-10 text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3 h-3 fill-amber-300" />
                Avantage exclusif Premium
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">
                Programme Partenaire Ideenwerk Technologies
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-2xl">
                En souscrivant au plan <strong className="text-white">Premium</strong>, vous devenez automatiquement 
                membre du programme partenaire <strong className="text-amber-300">Ideenwerk Technologies</strong>. 
                Bénéficiez d'une <strong className="text-white">réduction de 20%</strong> sur l'ensemble de leurs 
                prestations et traitements technologiques.
              </p>
            </div>
          </div>
        </div>

        {/* Transparence */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Notre engagement de transparence</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1.5 list-disc list-inside">
              <li><strong>0% de commission :</strong> Vous gardez 100% de vos gains. Le client vous paie directement.</li>
              <li><strong>Services illimités :</strong> Publiez autant de services que vous le souhaitez, sur tous les plans.</li>
              <li><strong>Visibilité uniquement :</strong> Votre abonnement influence uniquement votre position dans les résultats de recherche.</li>
              <li><strong>Vérification indépendante :</strong> Le badge "Vérifié" est un processus séparé, accessible à tous les professionnels.</li>
              <li><strong>Sans engagement :</strong> Vous pouvez changer ou annuler votre forfait à tout moment.</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Que se passe-t-il à la fin de ma période semestrielle ou annuelle ?",
                a: "Votre abonnement se renouvelle automatiquement sauf si vous l'annulez avant la date d'échéance. Vous recevrez un rappel 7 jours avant."
              },
              {
                q: "Puis-je passer d'un plan à un autre en cours de période ?",
                a: "Oui, vous pouvez upgrader à tout moment. La différence sera calculée au prorata. Pour un downgrade, il prendra effet à la prochaine échéance."
              },
              {
                q: "Le badge 'Vérifié' est-il inclus dans les forfaits payants ?",
                a: "Non. La vérification est un processus indépendant (5 000 FCFA/an) accessible à tous les professionnels, qu'ils soient sur le plan Gratuit ou un forfait payant."
              },
              {
                q: "Comment fonctionne la réduction de 20% chez Ideenwerk Technologies ?",
                a: "Une fois abonné au plan Premium, vous recevez un code partenaire unique par email. Présentez-le lors de votre rendez-vous chez Ideenwerk pour bénéficier immédiatement de la réduction."
              },
              {
                q: "Quels documents sont nécessaires pour la vérification ?",
                a: "Pièce d'identité valide (CNI ou passeport), casier judiciaire vierge (moins de 3 mois), et justificatif de qualification (diplôme, attestation d'expérience, etc.)."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">Q:</span> 
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">R:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}