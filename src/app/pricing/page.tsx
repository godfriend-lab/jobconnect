// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  CheckCircle2, Star, Crown, Zap, ShieldCheck, 
  ArrowRight, TrendingUp, Info
} from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

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
        'Réception de demandes et avis clients',
        'Messagerie avec les clients'
      ],
      color: 'border-slate-700',
      btnColor: 'bg-slate-700 hover:bg-slate-600',
      icon: CheckCircle2,
      iconColor: 'text-slate-400'
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
        'Positionnement prioritaire dans les recherches',
        'Support email prioritaire'
      ],
      color: 'border-emerald-700',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700',
      icon: Zap,
      iconColor: 'text-emerald-400'
    },
    {
      name: 'Business',
      monthlyPrice: 3500,
      annualPrice: 37800,
      description: "Le plan recommandé pour les professionnels actifs.",
      features: [
        'Tous les avantages du plan Starter',
        'Mise en avant supérieure et emplacements privilégiés',
        'Positionnement dans le haut du classement (Top 5)',
        'Visibilité renforcée sur les pages les plus consultées',
        'Présence prioritaire dans la marketplace',
        'Badge "Pro Actif" visible',
        'Statistiques avancées (vues, clics)'
      ],
      color: 'border-blue-700 bg-blue-950/20',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
      icon: Star,
      iconColor: 'text-blue-400',
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
        'Badge Premium exclusif',
        'Support dédié avec temps de réponse < 2h',
        '🎁 -20% sur toutes les prestations Ideenwerk Technologies'
      ],
      color: 'border-amber-700 bg-amber-950/20',
      btnColor: 'bg-amber-600 hover:bg-amber-700',
      icon: Crown,
      iconColor: 'text-amber-400'
    }
  ]

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo ProKorb" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-black text-xl tracking-tight hidden sm:block">
              <span className="text-indigo-400">PRO</span>
              <span className="text-white">KORB</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Inscription
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-700/50 text-indigo-300 text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-indigo-400 text-indigo-400" />
            <span>Tarifs transparents et sans surprise</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Choisissez le plan qui <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              correspond à vos ambitions
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Des forfaits adaptés à chaque étape de votre croissance. 
            <span className="text-white font-bold"> 0% de commission</span> sur vos prestations, quoi qu'il arrive.
          </p>

          {/* Toggle Mensuel/Annuel */}
          <div className="inline-flex bg-slate-900 rounded-2xl p-1.5 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 relative ${
                billingCycle === 'annual'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annuel
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                -10%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Grille des Tarifs */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => {
            const Icon = plan.icon
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice
            const period = billingCycle === 'monthly' ? '/mois' : '/an'
            const monthlyEquiv = billingCycle === 'annual' && plan.monthlyPrice > 0 
              ? Math.round(plan.annualPrice / 12) 
              : plan.monthlyPrice
            const savings = plan.monthlyPrice > 0 
              ? (plan.monthlyPrice * 12) - plan.annualPrice 
              : 0

            return (
              <div
                key={idx}
                className={`relative bg-slate-900 rounded-2xl border-2 ${plan.color} p-6 shadow-lg flex flex-col transition-all hover:shadow-2xl hover:-translate-y-1`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Recommandé
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${plan.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px]">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {formatPrice(price)}
                    </span>
                    <span className="text-slate-400">FCFA{period}</span>
                  </div>
                  {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      Soit ~{formatPrice(monthlyEquiv)} FCFA/mois
                    </p>
                  )}
                  {billingCycle === 'annual' && savings > 0 && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-md text-xs font-bold">
                      <TrendingUp className="w-3 h-3" />
                      Économisez {formatPrice(savings)} FCFA/an
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Gratuit' ? '/register?role=pro' : '/login'}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${plan.btnColor}`}
                >
                  {plan.name === 'Gratuit' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section Badge Vérifié */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-700/50 p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-10 h-10 text-blue-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Badge Vérifié — 5 000 FCFA/an
              </h3>
              <p className="text-slate-300 mb-4">
                Indépendant de votre forfait, le Badge Vérifié augmente votre taux de contact de <strong className="text-blue-400">+300%</strong>.
                Il prouve aux clients que votre identité, vos qualifications et votre casier judiciaire ont été validés par notre équipe.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Vérification d'identité (CNI/Passeport)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Casier judiciaire de moins de 3 mois
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Justificatif de qualification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  Badge bleu visible sur votre profil
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Transparence */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
          <div className="flex items-start gap-4">
            <Info className="w-8 h-8 text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Notre engagement de transparence</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">0% de commission</strong> sur toutes vos prestations, quel que soit votre plan. Vous gardez 100% de vos revenus.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Sans engagement</strong> : changez ou annulez votre forfait à tout moment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Services illimités</strong> : publiez autant de services que vous le souhaitez sur tous les plans.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Paiement direct</strong> : le client vous paie directement via T-Money, Flooz ou espèces.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Prêt à développer votre activité ?
        </h2>
        <p className="text-lg text-slate-400 mb-8">
          Rejoignez des centaines de professionnels qui font confiance à ProKorb.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register?role=pro"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            Créer mon compte gratuitement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/marketplace"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 inline-flex items-center justify-center gap-2"
          >
            Explorer la marketplace
          </Link>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ProKorb Togo. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}