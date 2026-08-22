// @ts-nocheck
'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Code, Users, Zap, Lock, Briefcase } from 'lucide-react'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Rejoignez l'avenir du travail au Togo</h1>
          <p className="text-xl text-indigo-100">
            Chez Ideenwerk Technologies, nous construisons ProKorb avec une obsession : l'excellence technologique et la sécurité absolue.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Culture & Sécurité */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Notre Culture d'Innovation</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Nous ne sommes pas seulement une startup, nous sommes une entreprise technologique de référence. 
              Nous recherchons des esprits curieux, rigoureux et passionnés par la résolution de problèmes complexes 
              dans un environnement en croissance rapide.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sous la direction de notre fondateur, Godfriend Agbevivi, nous promouvons une culture de transparence, 
              d'apprentissage continu et d'impact social positif.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-emerald-500" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sécurité par Conception</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              La sécurité n'est pas une option, c'est notre fondation. Chaque membre de notre équipe, 
              technique ou non, est formé aux meilleures pratiques de cybersécurité, de protection des données 
              (conformité loi togolaise et standards internationaux) et de confidentialité.
            </p>
          </div>
        </section>

        {/* Offres d'emploi (Exemples) */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Postes Ouverts</h2>
          <div className="space-y-4">
            {[
              { title: "Ingénieur Full Stack (Next.js / Node.js)", type: "CDI", dept: "Technologie", security: "Niveau d'accès élevé" },
              { title: "Responsable Conformité & Protection des Données (DPO)", type: "CDI", dept: "Légal & Sécurité", security: "Confidentialité stricte" },
              { title: "Product Designer (UX/UI)", type: "CDI", dept: "Produit", security: "Niveau d'accès standard" }
            ].map((job, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.dept}</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><Shield className="w-4 h-4" /> {job.security}</span>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap">
                  Postuler de manière sécurisée
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Processus de recrutement sécurisé */}
        <section className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-6">Un Processus de Recrutement Transparent et Sécurisé</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold">Candidature Chiffrée</h4>
              <p className="text-sm text-slate-300">Vos données sont transmises via des canaux sécurisés (TLS 1.3) et ne sont accessibles qu'aux recruteurs autorisés.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold">Entretiens Techniques & Culturels</h4>
              <p className="text-sm text-slate-300">Évaluation de vos compétences et de votre alignement avec nos valeurs d'éthique et de sécurité.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold">Vérification & Intégration</h4>
              <p className="text-sm text-slate-300">Vérification d'antécédents professionnelle et formation obligatoire à nos protocoles de sécurité internes.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}