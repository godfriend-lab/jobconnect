import Link from 'next/link'
import { 
  ArrowLeft, UserPlus, FileText, Search, MessageSquare, 
  CheckCircle2, Award, TrendingUp, Users, Shield, Zap
} from 'lucide-react'

export default function ProHowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: UserPlus,
      title: "Créez votre compte Pro",
      desc: "Inscrivez-vous gratuitement en quelques minutes. Choisissez votre catégorie de métier et complétez votre profil avec vos compétences et expériences.",
      color: "from-indigo-500 to-blue-600"
    },
    {
      num: "02",
      icon: FileText,
      title: "Soumettez vos documents",
      desc: "Téléchargez votre pièce d'identité, vos diplômes et certifications. Notre équipe vérifie chaque dossier sous 24-48h pour vous attribuer le badge 'Vérifié'.",
      color: "from-purple-500 to-pink-600"
    },
    {
      num: "03",
      icon: Search,
      title: "Soyez visible sur la marketplace",
      desc: "Votre profil apparaît dans les résultats de recherche. Les clients peuvent vous découvrir, consulter vos avis et votre portfolio.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      num: "04",
      icon: MessageSquare,
      title: "Recevez des demandes",
      desc: "Les clients vous contactent directement via la messagerie sécurisée ou WhatsApp. Discutez, négociez et convenez des modalités.",
      color: "from-amber-500 to-orange-600"
    },
    {
      num: "05",
      icon: CheckCircle2,
      title: "Réalisez la prestation",
      desc: "Effectuez le travail convenu avec professionnalisme. Le client vous règle directement (T-Money, Flooz, espèces) selon le devis accepté.",
      color: "from-rose-500 to-red-600"
    },
    {
      num: "06",
      icon: Award,
      title: "Recevez des avis positifs",
      desc: "Après chaque mission, le client peut laisser un avis. Accumulez les bonnes notes pour grimper dans le classement et attirer plus de clients.",
      color: "from-indigo-600 to-purple-700"
    },
  ]

  const benefits = [
    { icon: Users, title: "Accès à des milliers de clients", desc: "Touchez une clientèle large et qualifiée dans tout le Togo." },
    { icon: Shield, title: "Badge de vérification", desc: "Inspirez confiance avec notre badge officiel vérifié." },
    { icon: TrendingUp, title: "Visibilité accrue", desc: "Apparaissez en tête des résultats avec un forfait Premium." },
    { icon: Zap, title: "0% de commission", desc: "Gardez 100% de vos gains. Nous ne prenons aucune part." },
  ]

  const plans = [
    {
      name: "Gratuit",
      price: "0 FCFA",
      features: ["Profil basique", "Visibilité standard", "Messagerie illimitée", "Badge non vérifié"],
      cta: "Commencer gratuitement",
      highlighted: false
    },
    {
      name: "Starter",
      price: "5 000 FCFA/mois",
      features: ["Profil enrichi", "Badge vérifié", "Priorité dans les recherches", "Statistiques de profil"],
      cta: "Essayer Starter",
      highlighted: false
    },
    {
      name: "Business",
      price: "15 000 FCFA/mois",
      features: ["Tout Starter +", "Mise en avant premium", "Support prioritaire", "Rapports mensuels"],
      cta: "Choisir Business",
      highlighted: true
    },
    {
      name: "Premium",
      price: "30 000 FCFA/mois",
      features: ["Tout Business +", "Position N°1 garantie", "Badge Premium exclusif", "Account manager dédié"],
      cta: "Devenir Premium",
      highlighted: false
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Comment ça marche ?</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Le guide complet pour lancer votre activité professionnelle sur JobConnect et attirer vos premiers clients.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-12">
          
          {/* Steps */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Les 6 étapes pour réussir</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors">
                    <div className={`w-14 h-14 bg-linear-to-br ${step.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          ÉTAPE {step.num}
                        </span>
                        <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Pourquoi choisir JobConnect ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="p-6 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Plans */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Nos formules Pro</h2>
              <p className="text-slate-600">Choisissez le forfait adapté à votre activité</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-2xl border-2 ${
                    plan.highlighted 
                      ? 'bg-linear-to-br from-indigo-600 to-purple-700 border-indigo-600 text-white' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h3 className={`font-bold text-lg mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-2xl font-black mb-4 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-indigo-200' : 'text-emerald-600'}`} />
                        <span className={plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/register?role=pro"
                    className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      plan.highlighted 
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Pro */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { q: "Combien de temps prend la vérification ?", a: "En moyenne 24 à 48 heures ouvrées après réception de tous les documents requis." },
                { q: "Puis-je changer de forfait à tout moment ?", a: "Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment depuis votre tableau de bord." },
                { q: "Comment sont gérés les paiements clients ?", a: "Les paiements se font directement entre vous et le client (T-Money, Flooz, espèces). JobConnect ne prend aucune commission." },
                { q: "Que se passe-t-il si un client ne paie pas ?", a: "Notre équipe de médiation intervient pour résoudre le litige. Nous vous accompagnons dans la résolution." },
              ].map((faq, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white">
            <h3 className="text-3xl font-black mb-4">Prêt à développer votre activité ?</h3>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Rejoignez des centaines de professionnels qui ont déjà choisi JobConnect pour booster leur chiffre d'affaires.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register?role=pro" className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
                Créer mon compte Pro
              </Link>
              <Link href="/pricing" className="inline-block bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                Voir les tarifs détaillés
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}