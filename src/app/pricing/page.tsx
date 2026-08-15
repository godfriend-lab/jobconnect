import Link from 'next/link'
import { 
  ArrowLeft, CheckCircle2, Star, TrendingUp, Zap, 
  Award, Building2, Info, ShieldCheck
} from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuit",
      price: "0 FCFA",
      period: "/mois",
      description: "Idéal pour tester la plateforme et créer votre présence en ligne.",
      features: [
        "Profil professionnel de base",
        "Publication de services illimitée",
        "Visibilité standard (fin des résultats de recherche)",
        "Messagerie illimitée avec les clients",
        "Accès aux statistiques de base"
      ],
      cta: "Commencer gratuitement",
      href: "/register?role=pro",
      highlighted: false,
      badge: null
    },
    {
      name: "Starter",
      price: "5 000 FCFA",
      period: "/mois",
      description: "Pour les indépendants qui veulent commencer à être remarqués.",
      features: [
        "Tout du plan Gratuit, plus :",
        "Visibilité accrue (milieu des résultats de recherche)",
        "Mise en avant dans les recherches locales (votre ville)",
        "Profil mis en valeur avec couleur personnalisée",
        "Support par email prioritaire"
      ],
      cta: "Choisir Starter",
      href: "/register?role=pro&plan=starter",
      highlighted: false,
      badge: "Populaire"
    },
    {
      name: "Business",
      price: "15 000 FCFA",
      period: "/mois",
      description: "Pour les professionnels établis qui veulent augmenter leur chiffre d'affaires.",
      features: [
        "Tout du plan Starter, plus :",
        "Haute visibilité (apparaître dans le Top 5 des recherches)",
        "Mise en avant dans les pages de catégories",
        "Badge 'Professionnel Actif' sur votre profil",
        "Statistiques avancées (vues, clics, conversions)"
      ],
      cta: "Choisir Business",
      href: "/register?role=pro&plan=business",
      highlighted: false,
      badge: null
    },
    {
      name: "Premium",
      price: "30 000 FCFA",
      period: "/mois",
      description: "La visibilité maximale pour dominer votre marché local.",
      features: [
        "Tout du plan Business, plus :",
        "Visibilité MAXIMALE (Garanti Top 1 dans votre zone)",
        "Présence en page d'accueil (section 'À la une')",
        "Notification prioritaire pour les nouvelles demandes",
        "🎁 EXCLUSIF : -20% sur tous les traitements chez Ideenwerk"
      ],
      cta: "Devenir Premium",
      href: "/register?role=pro&plan=premium",
      highlighted: true,
      badge: "Meilleure offre"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group mx-auto">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Investissez dans votre visibilité
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Chez JobConnect, vous ne payez pas pour des fonctionnalités limitées. 
            Tous les plans incluent des services illimités et 0% de commission. 
            Vous payez uniquement pour être vu par plus de clients.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        
        {/* Info Box: Clarification importante */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12 flex items-start gap-4 max-w-4xl mx-auto">
          <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-blue-900 mb-1">Transparence totale</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li><strong>Services illimités :</strong> Quel que soit votre plan, vous pouvez publier autant de services que vous le souhaitez.</li>
              <li><strong>0% de commission :</strong> Vous gardez 100% de vos gains. Le client vous paie directement.</li>
              <li><strong>Badges de vérification :</strong> Le badge "Vérifié" est obtenu via notre processus de contrôle d'identité indépendant et n'est pas lié à votre abonnement payant.</li>
            </ul>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-linear-to-br from-indigo-600 to-purple-700 border-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105 z-10' 
                  : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-200 hover:shadow-xl'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  plan.highlighted ? 'bg-amber-400 text-amber-900' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-indigo-200' : 'text-emerald-500'}`} />
                    <span className={plan.highlighted ? 'text-indigo-50' : 'text-slate-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  plan.highlighted 
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Partnership Spotlight: Ideenwerk */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Building2 className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3 h-3 fill-amber-300" />
                Avantage Exclusif Premium
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">
                Partenariat Ideenwerk : -20% sur tous vos traitements
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-2xl">
                En souscrivant au plan <strong className="text-white">Premium</strong>, vous devenez automatiquement membre du programme partenaire Ideenwerk. 
                Bénéficiez d'une réduction immédiate de 20% sur l'ensemble de leurs prestations et traitements, 
                un avantage unique pour récompenser votre engagement sur JobConnect.
              </p>
            </div>
            <Link 
              href="/register?role=pro&plan=premium" 
              className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-indigo-900/50"
            >
              Obtenir cet avantage
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Comparaison détaillée de la visibilité</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Fonctionnalité</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Gratuit</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Business</th>
                  <th className="text-center py-4 px-4 font-bold text-indigo-600 bg-indigo-50/50">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-4 text-slate-700">Services illimités</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-indigo-50/30"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-slate-700">0% de commission</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-indigo-50/30"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-slate-700">Position dans les recherches</td>
                  <td className="text-center py-4 px-4 text-slate-500">Fin</td>
                  <td className="text-center py-4 px-4 text-slate-500">Milieu</td>
                  <td className="text-center py-4 px-4 text-slate-500">Top 5</td>
                  <td className="text-center py-4 px-4 font-bold text-indigo-600 bg-indigo-50/30">Top 1 Garanti</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-slate-700">Mise en avant page d'accueil</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 bg-indigo-50/30"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-slate-700">Réduction partenaire Ideenwerk</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 text-slate-300">—</td>
                  <td className="text-center py-4 px-4 font-bold text-amber-600 bg-indigo-50/30">-20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "La vérification (badge 'Vérifié') est-elle incluse dans l'abonnement ?",
                a: "Non, le processus de vérification d'identité et de qualifications est indépendant. Il est gratuit et ouvert à tous les professionnels, quel que soit leur plan d'abonnement. Le badge est attribué après validation manuelle de nos équipes."
              },
              {
                q: "Puis-je changer de plan à tout moment ?",
                a: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment depuis votre tableau de bord. La facturation sera ajustée au prorata."
              },
              {
                q: "Comment fonctionne la réduction de 20% chez Ideenwerk ?",
                a: "Une fois abonné au plan Premium, vous recevez un code partenaire unique par email. Il vous suffit de le présenter lors de votre rendez-vous chez Ideenwerk pour bénéficier immédiatement de la réduction."
              },
              {
                q: "Y a-t-il un engagement de durée ?",
                a: "Non, tous nos abonnements sont mensuels et sans engagement. Vous pouvez annuler à tout moment sans frais."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}