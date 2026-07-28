'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function JobsPage() {
  // Exemple de données de chantiers (simulées en attendant le fetch Supabase complet)
  const initialJobs = [
    {
      id: '1',
      title: 'Installation électrique complète villa neuve',
      category: '⚡ Électricien',
      location: 'Lomé (Agoè-Assiyéye)',
      budget: '150 000 - 250 000 F CFA',
      date: 'Publié aujourd\'hui',
      description: 'Nous recherchons un électricien qualifié pour réaliser toute l\'installation électrique d\'une villa en finition. Plans disponibles. Matériel déjà acheté.',
    },
    {
      id: '2',
      title: 'Rénovation tuyauterie et pose de sanitaires',
      category: '🚰 Plombier',
      location: 'Lomé (Adidogomé)',
      budget: '75 000 F CFA',
      date: 'Publié hier',
      description: 'Fuite importante dans la salle de bain principale et remplacement d\'un WC cassé. Intervention urgente souhaitée.',
    },
    {
      id: '3',
      title: 'Construction de mur de clôture (20m)',
      category: '🧱 Maçon',
      location: 'Tsevié',
      budget: '300 000 F CFA',
      date: 'Il ya 2 jours',
      description: 'Besoin d\'une équipe de maçons sérieux pour élever un mur de clôture en agglos de 15. Le chantier est accessible en bord de route.',
    },
  ]

  const [categoryFilter, setCategoryFilter] = useState('Tous')

  const categories = ['Tous', '⚡ Électricien', '🚰 Plombier', '🧱 Maçon']

  const filteredJobs = categoryFilter === 'Tous' 
    ? initialJobs 
    : initialJobs.filter(job => job.category === categoryFilter)

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-blue-600">
            JOB<span className="text-slate-800">CONNECT</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
              Mon Espace
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Chantiers et Missions disponibles au <span className="text-blue-600">Togo</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Trouvez des opportunités à Lomé et ses environs. Postulez en direct et développez votre activité.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Filtres à gauche */}
        <aside className="md:col-span-1 space-y-4">
          <h2 className="font-extrabold text-sm text-slate-950 uppercase tracking-wider">Métiers</h2>
          <div className="flex flex-wrap md:flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold text-left transition w-full ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Liste des chantiers à droite */}
        <section className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {filteredJobs.length} chantier(s) trouvé(s)
            </p>
          </div>

          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {job.category}
                </span>
                <span className="text-xs font-medium text-slate-400">{job.date}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-950 tracking-tight hover:text-blue-600 transition cursor-pointer">
                {job.title}
              </h3>
              
              <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                {job.description}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">📍 {job.location}</span>
                  <span className="flex items-center gap-1 text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md">💰 {job.budget}</span>
                </div>
                
                <Link 
                  href={`/jobs/${job.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-sm"
                >
                  Voir les détails / Postuler
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}