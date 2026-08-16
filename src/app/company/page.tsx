// @ts-nocheck
'use client'

import Link from 'next/link'
import { Building2, MapPin, Award, Shield, Globe, Heart, Users, Lightbulb } from 'lucide-react'

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            <Building2 className="w-4 h-4" />
            Une entreprise Ideenwerk Technologies
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Notre Entreprise</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            JobConnect est un produit phare d'Ideenwerk Technologies, entreprise technologique innovante basée au Togo
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Présentation Ideenwerk Technologies */}
        <section>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Ideenwerk Technologies
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Fondée au Togo, <strong>Ideenwerk Technologies</strong> est une entreprise technologique dédiée au 
                  développement de solutions numériques innovantes répondant aux défis locaux et régionaux. Notre 
                  mission est de transformer les idées en produits technologiques concrets qui améliorent la vie 
                  quotidienne et stimulent le développement économique.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  JobConnect représente notre engagement à créer des plateformes qui connectent les talents aux 
                  opportunités, tout en respectant les plus hauts standards de qualité, de sécurité et de conformité 
                  légale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fondateur */}
        <section>
          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-12 h-12 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Notre Fondateur</h2>
                <h3 className="text-2xl font-bold text-amber-400 mb-4">Godfriend Agbevivi</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Visionnaire technologique et entrepreneur passionné, Godfriend Agbevivi a fondé Ideenwerk 
                  Technologies avec la conviction que l'innovation technologique peut transformer positivement 
                  les sociétés africaines. Son leadership et sa vision stratégique guident le développement 
                  de JobConnect et de tous nos produits.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Sous sa direction, notre entreprise s'engage à respecter les normes internationales tout en 
                  restant profondément ancrée dans les réalités et les besoins du marché togolais et ouest-africain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Engagements */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Nos Engagements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Conformité Légale",
                desc: "Respect total des lois et réglementations en vigueur au Togo et conformité aux standards internationaux de protection des données."
              },
              {
                icon: Globe,
                title: "Scalabilité Internationale",
                desc: "Architecture conçue pour s'adapter aux marchés internationaux tout en respectant les spécificités culturelles et légales de chaque région."
              },
              {
                icon: Heart,
                title: "Impact Social Positif",
                desc: "Contribution au développement économique du Togo par la création d'opportunités d'emploi et la valorisation des compétences locales."
              },
              {
                icon: Users,
                title: "Inclusion Numérique",
                desc: "Accessibilité de nos services à tous, indépendamment du niveau de compétence technologique."
              },
              {
                icon: Lightbulb,
                title: "Innovation Continue",
                desc: "Amélioration constante de nos produits basée sur les retours utilisateurs et les évolutions technologiques."
              },
              {
                icon: MapPin,
                title: "Ancrage Local",
                desc: "Siège social au Togo avec une équipe locale qui comprend les réalités et les besoins du marché."
              }
            ].map((commitment, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                  <commitment.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{commitment.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{commitment.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Informations Légales */}
        <section>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informations Légales</h2>
            <div className="grid md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Raison Sociale</h3>
                <p>Ideenwerk Technologies</p>
                <p className="mt-2">Produit: JobConnect</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Siège Social</h3>
                <p>Lomé, Togo</p>
                <p className="mt-2">Afrique de l'Ouest</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Fondateur & CEO</h3>
                <p>Godfriend Agbevivi</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Contact</h3>
                <p>Email: contact@jobconnect.tg</p>
                <p>Tél: +228 70 88 86 99 / 79 94 07 93</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certification & Standards */}
        <section>
          <div className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 md:p-12 border-2 border-emerald-200 dark:border-emerald-800">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Certification & Standards
            </h2>
            <div className="space-y-4 text-emerald-800 dark:text-emerald-200">
              <p className="leading-relaxed">
                JobConnect s'engage à maintenir les plus hauts standards de qualité et de sécurité. Notre plateforme 
                est développée dans le respect des réglementations suivantes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Protection des données:</strong> Conformité aux lois togolaises sur la protection des données personnelles</li>
                <li><strong>Sécurité:</strong> Chiffrement SSL/TLS pour toutes les transactions et communications</li>
                <li><strong>Transparence:</strong> Conditions générales d'utilisation claires et accessibles</li>
                <li><strong>Éthique:</strong> Politique de non-discrimination et d'inclusion stricte</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Découvrez nos autres initiatives
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Ideenwerk Technologies développe d'autres solutions innovantes pour répondre aux besoins du marché africain.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg">
            En savoir plus sur nos produits
            <Globe className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  )
}