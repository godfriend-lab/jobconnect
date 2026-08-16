// @ts-nocheck
'use client'

import Link from 'next/link'
import { ArrowLeft, Handshake, ShieldCheck, TrendingUp, Lock, Building2 } from 'lucide-react'

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Devenir Partenaire</h1>
          <p className="text-xl text-indigo-100">
            Construisons ensemble un écosystème de services numériques sécurisé, scalable et à fort impact.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Types de partenariats */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Nos Axes de Partenariat</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Partenaires Technologiques",
                desc: "Intégrations API sécurisées (paiement, vérification d'identité, cloud) respectant nos protocoles de chiffrement de bout en bout."
              },
              {
                icon: Handshake,
                title: "Institutions & Formation",
                desc: "Collaboration avec des centres de formation, chambres de métiers et ONG pour certifier et accompagner les professionnels sur la plateforme."
              },
              {
                icon: TrendingUp,
                title: "Programme de Avantages (B2B)",
                desc: "Offrir des réductions exclusives à nos professionnels Premium (ex: Ideenwerk Technologies, assurances, fournisseurs de matériel)."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Sécurité & Conformité */}
        <section className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 md:p-12 border-2 border-emerald-200 dark:border-emerald-800">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Notre Engagement : Sécurité & Conformité</h2>
              <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed mb-4">
                Chez Ideenwerk Technologies, la réputation de nos partenaires est aussi importante que la nôtre. 
                Tout partenariat est soumis à une procédure de <strong>"Due Diligence"</strong> rigoureuse.
              </p>
              <ul className="space-y-2 text-emerald-800 dark:text-emerald-200">
                <li className="flex items-center gap-2"><Lock className="w-4 h-4" /> Signature d'accords de confidentialité (NDA) et de traitement des données (DPA).</li>
                <li className="flex items-center gap-2"><Lock className="w-4 h-4" /> Audit de sécurité des interconnexions techniques avant tout déploiement.</li>
                <li className="flex items-center gap-2"><Lock className="w-4 h-4" /> Respect strict de la réglementation togolaise et des standards internationaux (RGPD, ISO 27001).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formulaire de demande */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Soumettre une proposition de partenariat</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom de l'entreprise / Organisation</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Site web officiel</label>
                  <input type="url" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="https://" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Votre nom complet</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email professionnel</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type de partenariat envisagé</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option>Intégration Technologique / API</option>
                  <option>Programme de Avantages (Réductions pour nos Pros)</option>
                  <option>Partenariat Institutionnel / Formation</option>
                  <option>Autre (préciser ci-dessous)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description de la proposition</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Décrivez brièvement la valeur ajoutée mutuelle..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                <Handshake className="w-5 h-5" />
                Envoyer la proposition de manière sécurisée
              </button>
              
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
                En soumettant ce formulaire, vous acceptez notre <Link href="/privacy" className="text-indigo-600 hover:underline">Politique de Confidentialité</Link>. 
                Les données sont traitées conformément aux lois en vigueur au Togo.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}