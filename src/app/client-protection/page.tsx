import Link from 'next/link'
import { 
  ArrowLeft, Shield, CheckCircle2, AlertCircle, 
  Lock, FileText, MessageSquare, Star,
  Phone, Mail, Clock, Award
} from 'lucide-react'

export default function ClientProtectionPage() {
  const guarantees = [
    {
      icon: Shield,
      title: "Professionnels vérifiés",
      desc: "Tous les professionnels sont contrôlés : pièce d'identité, casier judiciaire et qualifications vérifiées par notre équipe."
    },
    {
      icon: CheckCircle2,
      title: "Avis authentiques",
      desc: "Seuls les clients ayant réellement utilisé les services peuvent laisser un avis. Système anti-fraude activé."
    },
    {
      icon: Lock,
      title: "Paiement sécurisé",
      desc: "Vos données sont protégées. Paiement direct au professionnel uniquement après validation du travail."
    },
    {
      icon: FileText,
      title: "Devis détaillés",
      desc: "Exigez toujours un devis écrit avant le début des travaux pour éviter les mauvaises surprises."
    },
    {
      icon: MessageSquare,
      title: "Messagerie sécurisée",
      desc: "Communiquez via notre plateforme pour garder une trace de tous vos échanges avec les professionnels."
    },
    {
      icon: Award,
      title: "Satisfaction garantie",
      desc: "Si le travail n'est pas conforme, signalez-le nous sous 7 jours. Nous intervenons pour médiation."
    },
  ]

  const tips = [
    {
      icon: Star,
      title: "Vérifiez les avis",
      content: "Lisez attentivement les commentaires des précédents clients. Méfiez-vous des profils sans avis."
    },
    {
      icon: FileText,
      title: "Demandez un devis écrit",
      content: "Toujours obtenir un devis détaillé avant validation. Précisez les matériaux, délais et garanties."
    },
    {
      icon: MessageSquare,
      title: "Communiquez sur la plateforme",
      content: "Évitez les échanges hors plateforme avant la première prestation. Gardez une trace écrite."
    },
    {
      icon: Clock,
      title: "Respectez les délais",
      content: "Signalez tout retard ou problème immédiatement. Notre équipe support est là pour vous aider."
    },
  ]

  const steps = [
    {
      num: "01",
      title: "Choisissez un pro vérifié",
      desc: "Privilégiez les professionnels avec le badge bleu 'Vérifié' et de bons avis clients."
    },
    {
      num: "02",
      title: "Discutez du projet",
      desc: "Utilisez la messagerie pour détailler votre besoin et obtenir un devis précis."
    },
    {
      num: "03",
      title: "Validez le devis",
      desc: "Assurez-vous que tout est clair : prix, délais, matériaux, garanties. Ne payez pas d'avance."
    },
    {
      num: "04",
      title: "Suivez les travaux",
      desc: "Restez en contact régulier avec le professionnel pendant l'exécution du travail."
    },
    {
      num: "05",
      title: "Validez et payez",
      desc: "Inspectez le travail terminé. Ne réglez que si vous êtes satisfait. Payez directement au pro."
    },
    {
      num: "06",
      title: "Laissez un avis",
      desc: "Partagez votre expérience pour aider la communauté. Les avis sont essentiels pour tous."
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
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Protection des clients</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Votre sécurité et votre satisfaction sont notre priorité. Découvrez comment ProKorb vous protège à chaque étape.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-12">
          
          {/* Guarantees */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">Nos engagements</h2>
                <p className="text-slate-600 mt-1">6 garanties pour votre tranquillité d'esprit</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guarantees.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Le processus sécurisé en 6 étapes</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-6 p-6 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="w-14 h-14 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-white font-black text-xl">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-50 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">Conseils de sécurité</h2>
                <p className="text-slate-600 mt-1">4 règles d'or pour une expérience sans risque</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, idx) => {
                const Icon = tip.icon
                return (
                  <div key={idx} className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="flex items-start gap-4">
                      <Icon className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-3">️ Signalez tout problème immédiatement</h3>
                <p className="text-red-800 mb-4">
                  Si vous rencontrez un problème avec un professionnel (travail non conforme, comportement inapproprié, demande de paiement suspect), contactez-nous immédiatement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:litiges@proKorb.tg" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                    <Mail className="w-5 h-5" />
                    litiges@ProKorb.tg
                  </a>
                  <a href="tel:+22870888699" className="inline-flex items-center gap-2 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold px-6 py-3 rounded-xl transition-colors">
                    <Phone className="w-5 h-5" />
                    +228 70 88 86 99
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Que faire si le professionnel ne vient pas ?",
                  a: "Contactez-nous immédiatement. Nous contacterons le professionnel et vous proposerons une solution (remplacement ou remboursement si paiement anticipé)."
                },
                {
                  q: "Le travail n'est pas conforme, que faire ?",
                  a: "Signalez-le nous sous 7 jours maximum avec photos à l'appui. Nous interviendrons pour médiation et trouverons une solution (réparation, remboursement partiel ou total)."
                },
                {
                  q: "Puis-je payer avant le début des travaux ?",
                  a: "Nous le déconseillons fortement. Le paiement doit se faire après validation du travail terminé. En cas de demande d'acompte, exigez un contrat écrit."
                },
                {
                  q: "Comment sont vérifiés les professionnels ?",
                  a: "Chaque pro doit fournir : pièce d'identité valide, casier judiciaire vierge, justificatifs de qualifications. Notre équipe vérifie manuellement chaque document."
                },
                {
                  q: "Mes données sont-elles protégées ?",
                  a: "Oui, conformément à la Loi n° 2019-024 du Togo. Vos données sont chiffrées et ne sont jamais partagées sans votre consentement."
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-indigo-600">Q:</span> {faq.q}
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
            <h3 className="text-3xl font-black mb-4">Vous avez une question sur votre protection ?</h3>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Notre équipe support est disponible du lundi au samedi de 8h à 18h pour répondre à toutes vos préoccupations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
                <MessageSquare className="w-5 h-5" />
                Nous contacter
              </Link>
              <Link href="/faq" className="inline-flex items-center justify-center gap-2 bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                <Clock className="w-5 h-5" />
                Voir la FAQ complète
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}