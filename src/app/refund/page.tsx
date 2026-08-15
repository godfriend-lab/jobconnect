import Link from 'next/link'
import { ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Clock, Mail } from 'lucide-react'

export default function RefundPolicyPage() {
  const conditions = [
    { icon: CheckCircle2, title: "Service non rendu", desc: "Si le professionnel ne s'est pas présenté ou n'a pas réalisé le service convenu." },
    { icon: AlertCircle, title: "Service non conforme", desc: "Si le service rendu ne correspond pas à la description publiée sur la plateforme." },
    { icon: Clock, title: "Annulation dans les 24h", desc: "Annulation par le client dans les 24h suivant la réservation (si aucun travail n'a commencé)." },
  ]

  const steps = [
    { num: "01", title: "Contactez le support", desc: "Envoyez un email à contact@jobconnect.tg avec les détails de votre demande." },
    { num: "02", title: "Fournissez les preuves", desc: "Joignez captures d'écran, devis, photos ou tout document justificatif." },
    { num: "03", title: "Étude du dossier", desc: "Notre équipe analyse votre demande sous 5 jours ouvrés." },
    { num: "04", title: "Décision et remboursement", desc: "Si accepté, le remboursement est effectué sous 15 jours via T-Money, Flooz ou virement." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Politique de remboursement</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Nos engagements pour garantir votre satisfaction et votre tranquillité.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <RefreshCw className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Principe général</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 leading-relaxed space-y-3">
              <p>
                JobConnect est une plateforme de <strong className="text-slate-900">mise en relation</strong> entre clients et professionnels. Les paiements se font directement entre les deux parties (T-Money, Flooz, espèces).
              </p>
              <p>
                JobConnect ne perçoit pas de commission sur les prestations. En cas de litige, nous intervenons en tant que <strong className="text-slate-900">médiateur</strong> pour trouver une solution équitable.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Cas ouvrant droit à remboursement</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4">
              {conditions.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <Icon className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <AlertCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Cas non remboursables</h2>
            </div>
            <div className="pl-0 md:pl-14">
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Insatisfaction subjective sans preuve de non-conformité</li>
                <li>Annulation après début des travaux</li>
                <li>Non-respect des conditions convenues par le client</li>
                <li>Litige entre le client et le professionnel non signalé dans les 7 jours</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Procédure de demande</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Délais de traitement</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <ul className="space-y-2">
                <li className="flex gap-2"><span className="text-indigo-600 font-bold">•</span> <strong>Acknowledgement :</strong> Sous 48h après réception de la demande</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-bold">•</span> <strong>Instruction :</strong> 5 jours ouvrés</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-bold">•</span> <strong>Décision :</strong> 10 jours ouvrés maximum</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-bold">•</span> <strong>Remboursement :</strong> 15 jours après acceptation</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Contact pour litiges</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>Pour toute demande de remboursement ou litige :</p>
              <ul className="space-y-1 ml-4">
                <li> <a href="mailto:litiges@jobconnect.tg" className="text-indigo-600 hover:underline">litiges@jobconnect.tg</a></li>
                <li>📞 +228 70 88 86 99</li>
                <li>📍 Lomé, Togo</li>
              </ul>
            </div>
          </div>

          <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-bold text-slate-900 mb-2">💡 Conseil</h3>
            <p className="text-sm text-slate-600">
              Conservez toujours les preuves de vos échanges avec les professionnels (messages, devis, photos avant/après) pour faciliter le traitement de votre demande en cas de litige.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Dernière mise à jour :</strong> 14 août 2026
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}