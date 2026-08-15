import Link from 'next/link'
import { ArrowLeft, Handshake, CheckCircle2, TrendingUp, Users, Shield } from 'lucide-react'

export default function PartnersPage() {
  const benefits = [
    { icon: TrendingUp, title: "Visibilité accrue", desc: "Apparaissez en tête des résultats de recherche dans votre catégorie." },
    { icon: Users, title: "Accès à une large clientèle", desc: "Touchez des milliers de clients potentiels dans tout le Togo." },
    { icon: Shield, title: "Badge Partenaire Vérifié", desc: "Renforcez la confiance avec un badge exclusif sur votre profil." },
    { icon: Handshake, title: "Accompagnement dédié", desc: "Un interlocuteur unique pour vous accompagner dans votre croissance." },
  ]

  const steps = [
    { num: "01", title: "Remplissez le formulaire", desc: "Décrivez votre entreprise et vos objectifs de partenariat." },
    { num: "02", title: "Étude de votre dossier", desc: "Notre équipe analyse votre demande sous 48h." },
    { num: "03", title: "Signature du contrat", desc: "Nous définissons ensemble les modalités de collaboration." },
    { num: "04", title: "Lancement du partenariat", desc: "Votre entreprise est mise en avant sur la plateforme." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Devenir Partenaire</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Rejoignez le réseau de partenaires JobConnect et développez votre activité avec nous.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pourquoi devenir partenaire ?</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              En devenant partenaire officiel de JobConnect, votre entreprise bénéficie d'une visibilité privilégiée et d'outils exclusifs pour développer votre activité sur le marché togolais des services.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Comment ça marche ?</h2>
            <div className="space-y-4">
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

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Prêt à collaborer avec nous ?</h3>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Remplissez le formulaire de partenariat et notre équipe vous contactera sous 48h.
            </p>
            <a href="mailto:partenaires@jobconnect.tg?subject=Demande de partenariat" className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              Demander un partenariat
            </a>
          </div>

          <div className="text-center">
            <p className="text-slate-600">
              Une question ? Écrivez-nous à{" "}
              <a href="mailto:partenaires@jobconnect.tg" className="text-indigo-600 font-semibold hover:underline">
                partenaires@jobconnect.tg
              </a>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}