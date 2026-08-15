import Link from 'next/link'
import { ArrowLeft, Shield, CheckCircle2, Clock, Award, FileText, IdCard, Briefcase, Star, TrendingUp } from 'lucide-react'

export default function VerificationPage() {
  const steps = [
    {
      icon: IdCard,
      title: "1. Pièce d'identité",
      desc: "Carte d'identité nationale ou passeport valide en cours de validité.",
      required: true
    },
    {
      icon: Briefcase,
      title: "2. Justificatifs professionnels",
      desc: "Diplômes, certifications, ou attestations d'expérience selon votre métier.",
      required: true
    },
    {
      icon: FileText,
      title: "3. Casier judiciaire",
      desc: "Extrait de casier judiciaire vierge (datant de moins de 3 mois).",
      required: true
    },
    {
      icon: Star,
      title: "4. Entretiens et tests",
      desc: "Pour certains métiers techniques, un entretien ou test pratique peut être requis.",
      required: false
    },
  ]

  const benefits = [
    { icon: Award, title: "Badge Vérifié", desc: "Affichez le badge bleu sur votre profil pour inspirer confiance." },
    { icon: TrendingUp, title: "Plus de visibilité", desc: "Les professionnels vérifiés apparaissent en priorité dans les résultats." },
    { icon: CheckCircle2, title: "Confiance accrue", desc: "Les clients sont 3x plus susceptibles de choisir un pro vérifié." },
    { icon: Shield, title: "Protection renforcée", desc: "Accès à notre programme de protection des professionnels." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Vérification des professionnels</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Notre processus rigoureux de vérification garantit que seuls les professionnels qualifiés et dignes de confiance rejoignent JobConnect.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-10">
          
          {/* Process Steps */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Processus de vérification</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-900">{step.title}</h3>
                        {step.required && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                            Obligatoire
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Délais de vérification</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <Clock className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-emerald-900">24-48 heures</h3>
                  <p className="text-sm text-emerald-800">Délai moyen de traitement des dossiers complets</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-200">
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900">Validation manuelle</h3>
                  <p className="text-sm text-blue-800">Chaque document est vérifié par notre équipe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Avantages de la vérification</h2>
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

          {/* CTA */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-center text-white">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-3">Vous êtes professionnel ?</h3>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Rejoignez JobConnect et obtenez votre badge de vérification pour booster votre activité.
            </p>
            <Link href="/register?role=pro" className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              Devenir professionnel vérifié
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}