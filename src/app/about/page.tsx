// @ts-nocheck
'use client'

import Link from 'next/link'
import { Globe, Shield, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">À Propos de ProKorb</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            La plateforme leader au Togo connectant des professionnels qualifiés avec des clients exigeants
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Notre Mission</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              ProKorb a pour mission de transformer le marché des services au Togo en créant un écosystème 
              numérique de confiance où les professionnels talentueux peuvent développer leur activité et les 
              clients trouver facilement des prestataires qualifiés et vérifiés.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Notre Vision</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Devenir la référence en Afrique de l'Ouest pour la mise en relation entre professionnels et clients, 
              en promouvant l'excellence, la transparence et l'innovation technologique au service du développement 
              économique local.
            </p>
          </div>
        </section>

        {/* Valeurs */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Nos Valeurs Fondamentales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Confiance & Transparence",
                desc: "Nous mettons en place des processus de vérification rigoureux et garantissons une transparence totale sur les tarifs et les compétences de nos professionnels."
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Nous sélectionnons et accompagnons les meilleurs professionnels pour offrir à nos clients des services de qualité exceptionnelle."
              },
              {
                icon: Users,
                title: "Impact Social",
                desc: "Nous contribuons au développement économique du Togo en facilitant l'accès à l'emploi et en valorisant le savoir-faire local."
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Qualité */}
        <section>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Notre Engagement Qualité</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                Chez ProKorb, nous nous engageons à maintenir les plus hauts standards de qualité et de 
                professionnalisme. Chaque professionnel inscrit sur notre plateforme passe par un processus 
                de vérification rigoureux incluant la validation de son identité, de ses qualifications 
                professionnelles et de son casier judiciaire.
              </p>
              <p className="leading-relaxed">
                Nous mettons à disposition de nos utilisateurs un système d'avis et de notation transparent, 
                permettant à chacun de faire des choix éclairés. Notre équipe de support est disponible pour 
                accompagner nos utilisateurs et garantir une expérience optimale.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Rejoignez la révolution ProKorb
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Que vous soyez professionnel ou client, ProKorb vous offre les outils pour réussir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=pro" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg">
              Devenir Professionnel
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold transition-all shadow-lg border border-slate-200 dark:border-slate-700">
              Trouver un Professionnel
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}