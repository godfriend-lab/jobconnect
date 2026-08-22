import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2, AlertTriangle, Smartphone, FileCheck } from 'lucide-react'

export default function SecurityCenterPage() {
  const features = [
    {
      icon: Shield,
      title: "Vérification des identités",
      desc: "Chaque professionnel doit fournir une pièce d'identité valide et des justificatifs de qualifications avant d'être accepté sur la plateforme."
    },
    {
      icon: Lock,
      title: "Données cryptées",
      desc: "Toutes vos informations personnelles et communications sont protégées par un chiffrement SSL de niveau bancaire."
    },
    {
      icon: Eye,
      title: "Transparence totale",
      desc: "Consultez les avis vérifiés, les notes et l'historique des professionnels avant de faire votre choix."
    },
    {
      icon: CheckCircle2,
      title: "Professionnels vérifiés",
      desc: "Badge de vérification attribué uniquement après validation manuelle de nos équipes."
    },
    {
      icon: Smartphone,
      title: "Authentification à deux facteurs",
      desc: "Sécurisez votre compte avec la 2FA pour une protection maximale."
    },
    {
      icon: FileCheck,
      title: "Contrôles réguliers",
      desc: "Audits de sécurité trimestriels et mises à jour continues de nos protocoles."
    },
  ]

  const tips = [
    "Vérifiez toujours que le professionnel possède le badge 'Vérifié'",
    "Lisez les avis des précédents clients avant de réserver",
    "Communiquez uniquement via la messagerie sécurisée de ProKorb",
    "Ne partagez jamais vos informations de paiement en dehors de la plateforme",
    "Signalez immédiatement tout comportement suspect",
    "Conservez toujours les preuves de vos échanges (messages, devis, photos)",
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Centre de sécurité</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons vos données et garantissons des échanges sécurisés.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-10">
          
          {/* Features Grid */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Nos engagements sécurité</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Conseils de sécurité</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Une question sur la sécurité ?</h3>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos préoccupations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/report" className="inline-block bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
                Signaler un problème
              </Link>
              <Link href="/contact" className="inline-block bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}