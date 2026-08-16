// @ts-nocheck
'use client'

import Link from 'next/link'
import { ArrowLeft, Download, FileText, Mic, Shield, Building2, Mail } from 'lucide-react'

export default function PressPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Presse & Médias</h1>
          <p className="text-xl text-indigo-100">
            Ressources officielles, communiqués et contacts pour les journalistes et professionnels des médias.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Kit Média */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Kit Média Officiel</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Logos & Charte Graphique", desc: "Fichiers SVG/PNG haute résolution de JobConnect et Ideenwerk Technologies.", icon: FileText },
              { title: "Fiches Techniques", desc: "Données chiffrées sur l'impact, l'architecture sécurisée et la croissance de la plateforme.", icon: Shield },
              { title: "Photos HD", desc: "Portraits officiels et photos des bureaux de Lomé (libres de droits pour usage éditorial).", icon: Download }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                <item.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{item.desc}</p>
                <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Télécharger le pack <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Direction */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Direction & Porte-parole</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl font-bold text-slate-400">
              GA
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Godfriend Agbevivi</h3>
              <p className="text-indigo-600 font-semibold mb-3">Fondateur & CEO, Ideenwerk Technologies</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Visionnaire technologique basé au Togo, Godfriend Agbevivi dirige le développement de JobConnect 
                avec un engagement ferme envers l'innovation éthique, la sécurité des données et l'inclusion 
                économique en Afrique de l'Ouest.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pour les demandes d'interview, veuillez contacter exclusivement notre service presse ci-dessous.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Presse */}
        <section className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <Mic className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Contactez le Service Presse</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Nous répondons aux demandes des journalistes accrédités sous 24 heures ouvrées. 
            Pour des raisons de sécurité et de vérification, merci d'utiliser une adresse email professionnelle.
          </p>
          <a href="mailto:press@ideenwerk.tg" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all">
            <Mail className="w-5 h-5" />
            press@ideenwerk.tg
          </a>
        </section>
      </div>
    </div>
  )
}