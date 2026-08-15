import Link from 'next/link'
import { ArrowLeft, Target, Eye, Heart, Award, Users, Globe, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Notre Mission", desc: "Connecter les talents locaux aux besoins des particuliers et entreprises au Togo, en toute sécurité et transparence." },
    { icon: Eye, title: "Notre Vision", desc: "Devenir la marketplace N°1 des services en Afrique de l'Ouest d'ici 2030." },
    { icon: Heart, title: "Nos Valeurs", desc: "Confiance, transparence, excellence et engagement envers nos utilisateurs." },
    { icon: Award, title: "Notre Engagement", desc: "Vérifier chaque professionnel et garantir une expérience utilisateur de qualité." },
  ]

  const stats = [
    { icon: Users, value: "500+", label: "Professionnels vérifiés" },
    { icon: Globe, value: "10+", label: "Villes couvertes" },
    { icon: TrendingUp, value: "2000+", label: "Mises en relation" },
    { icon: Award, value: "98%", label: "Clients satisfaits" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">À propos de JobConnect</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            La plateforme qui révolutionne le marché des services au Togo en connectant directement les clients avec des professionnels qualifiés.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Notre Histoire</h2>
            <p className="text-slate-600 leading-relaxed">
              JobConnect est né d'un constat simple : au Togo, il est souvent difficile de trouver un professionnel de confiance pour des travaux ou services du quotidien. Les recommandations bouche-à-oreille ne suffisent plus, et les plateformes existantes ne répondent pas aux réalités locales.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              C'est pourquoi nous avons créé JobConnect : une marketplace 100% togolaise, pensée pour les réalités locales, avec une vérification rigoureuse des professionnels et un système de notation transparent. Notre objectif est de redonner confiance aux clients tout en offrant aux professionnels une vitrine digitale pour développer leur activité.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ce qui nous guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((item, idx) => {
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

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">JobConnect en chiffres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Prêt à nous rejoindre ?</h3>
            <p className="text-indigo-100 mb-6">Que vous soyez client ou professionnel, JobConnect est fait pour vous.</p>
            <Link href="/register" className="inline-block bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              Créer mon compte
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}