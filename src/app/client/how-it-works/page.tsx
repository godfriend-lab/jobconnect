import Link from 'next/link'
import { 
  ArrowLeft, Search, MessageSquare, CheckCircle2, 
  Star, Shield, TrendingUp, Users, Award, Zap
} from 'lucide-react'

export default function ClientHowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Recherchez un professionnel",
      desc: "Utilisez la barre de recherche ou parcourez les catégories pour trouver le professionnel dont vous avez besoin. Filtrez par localité, prix ou note.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      num: "02",
      icon: Users,
      title: "Comparez les profils",
      desc: "Consultez les avis clients, les notes, les portfolios et les tarifs. Privilégiez les professionnels avec le badge 'Vérifié' pour plus de sécurité.",
      color: "from-purple-500 to-pink-600"
    },
    {
      num: "03",
      icon: MessageSquare,
      title: "Contactez et discutez",
      desc: "Envoyez un message via WhatsApp ou notre messagerie sécurisée. Décrivez votre besoin et demandez un devis détaillé.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Validez le devis",
      desc: "Une fois le devis accepté, convenez d'une date d'intervention. Ne payez jamais d'avance sans contrat écrit.",
      color: "from-amber-500 to-orange-600"
    },
    {
      num: "05",
      icon: Award,
      title: "Suivez les travaux",
      desc: "Restez en contact avec le professionnel pendant l'exécution. N'hésitez pas à poser des questions et à faire le point régulièrement.",
      color: "from-rose-500 to-red-600"
    },
    {
      num: "06",
      icon: Star,
      title: "Payez et laissez un avis",
      desc: "Après validation du travail, réglez directement le professionnel (T-Money, Flooz, espèces). Partagez votre expérience pour aider la communauté.",
      color: "from-indigo-600 to-purple-700"
    },
  ]

  const benefits = [
    { icon: Shield, title: "0% de commission", desc: "ProKorb est gratuit pour les clients. Vous payez uniquement le professionnel." },
    { icon: TrendingUp, title: "Professionnels vérifiés", desc: "Tous nos pros sont contrôlés : identité, casier judiciaire et qualifications vérifiées." },
    { icon: Zap, title: "Mise en relation rapide", desc: "Trouvez un professionnel disponible en moins de 24h dans votre localité." },
    { icon: Award, title: "Satisfaction garantie", desc: "Si le travail n'est pas conforme, nous intervenons pour médiation sous 7 jours." },
  ]

  const faqs = [
    {
      q: "L'inscription est-elle gratuite ?",
      a: "Oui, créer un compte client sur ProKorb est 100% gratuit. Vous ne payez que le professionnel pour le service rendu."
    },
    {
      q: "Comment sont sélectionnés les professionnels ?",
      a: "Chaque professionnel doit fournir une pièce d'identité, un casier judiciaire vierge et des justificatifs de qualifications. Notre équipe vérifie manuellement chaque dossier."
    },
    {
      q: "Puis-je annuler une réservation ?",
      a: "Oui, vous pouvez annuler avant le début des travaux. Nous vous conseillons de prévenir le professionnel le plus tôt possible par courtoisie."
    },
    {
      q: "Que faire en cas de problème ?",
      a: "Contactez-nous immédiatement à litiges@ProKorb.tg ou au +228 70 88 86 99. Nous intervenons sous 24h pour trouver une solution."
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Comment ça marche ?</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Le guide complet pour trouver et engager le professionnel idéal en toute sécurité sur ProKorb.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-12">
          
          {/* Steps */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Le processus en 6 étapes simples</h2>
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
            <h2 className="text-3xl font-black text-slate-900 mb-8">Pourquoi choisir ProKorb ?</h2>
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

          {/* FAQ */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-indigo-600 font-black">Q:</span> {faq.q}
                  </h3>
                  <p className="text-slate-600 pl-6">
                    <span className="text-indigo-600 font-bold">R:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white">
            <h3 className="text-3xl font-black mb-4">Prêt à trouver votre professionnel ?</h3>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Rejoignez des milliers de clients satisfaits qui ont déjà trouvé leur professionnel de confiance sur ProKorb.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/marketplace" className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
                Explorer la marketplace
              </Link>
              <Link href="/register?role=client" className="inline-block bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                Créer un compte gratuit
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}