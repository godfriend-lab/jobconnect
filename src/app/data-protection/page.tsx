import Link from 'next/link'
import { ArrowLeft, Lock, Shield, Database, Eye, CheckCircle2, Key, Server } from 'lucide-react'

export default function DataProtectionPage() {
  const principles = [
    {
      icon: Lock,
      title: "Chiffrement SSL",
      desc: "Toutes les données transitent via une connexion HTTPS sécurisée avec chiffrement 256-bit."
    },
    {
      icon: Database,
      title: "Stockage sécurisé",
      desc: "Vos données sont hébergées sur des serveurs sécurisés avec sauvegardes automatiques."
    },
    {
      icon: Eye,
      title: "Accès restreint",
      desc: "Seul le personnel autorisé a accès aux données, avec authentification à deux facteurs."
    },
    {
      icon: Key,
      title: "Contrôle total",
      desc: "Vous pouvez accéder, modifier ou supprimer vos données à tout moment depuis votre compte."
    },
  ]

  const rights = [
    "Droit d'accès à vos données personnelles",
    "Droit de rectification des informations incorrectes",
    "Droit à l'effacement (droit à l'oubli)",
    "Droit à la limitation du traitement",
    "Droit à la portabilité des données",
    "Droit d'opposition au traitement",
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Protection des données</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Nous mettons tout en œuvre pour protéger vos données personnelles conformément à la législation togolaise et aux standards internationaux.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-10">
          
          {/* Principles */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Nos mesures de protection</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rights */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Vos droits (Loi n° 2019-024)</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Conformément à la <strong>Loi n° 2019-024 du 24 octobre 2019</strong> portant protection des données à caractère personnel en République Togolaise, vous disposez des droits suivants :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Server className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Durée de conservation</h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Données de compte</h3>
                <p className="text-sm text-slate-600">Conservées pendant la durée de vie du compte + 3 ans après la dernière connexion.</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Historique des transactions</h3>
                <p className="text-sm text-slate-600">Conservé pendant 5 ans pour obligations légales et fiscales.</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Cookies</h3>
                <p className="text-sm text-slate-600">Durée maximale de 13 mois, renouvelable avec votre consentement.</p>
              </div>
            </div>
          </div>

          {/* Contact DPO */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">Délégué à la protection des données (DPO)</h3>
            <p className="text-indigo-100 mb-6">
              Pour exercer vos droits ou toute question relative à la protection de vos données :
            </p>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Email :</span> dpo@ProKorb.tg
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Téléphone :</span> +228 70 88 86 99
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Adresse :</span> Lomé, Togo
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}