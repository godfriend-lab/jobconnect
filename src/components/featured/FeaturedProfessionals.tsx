// @ts-nocheck
'use client'

import Link from 'next/link'
import { Star, ArrowRight, Loader2 } from 'lucide-react'
import { useFeaturedProfessionals } from '@/hooks/useFeaturedProfessionals'
import FeaturedCard from './FeaturedCard'
import { FEATURED_SECTION_CONFIG } from './config'

export default function FeaturedProfessionals() {
  const { professionals, loading } = useFeaturedProfessionals(FEATURED_SECTION_CONFIG.count)
  const config = FEATURED_SECTION_CONFIG

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-10 h-10 animate-spin text-amber-500 mx-auto mb-4" />
          <p className="text-slate-400">Chargement des professionnels...</p>
        </div>
      </section>
    )
  }

  if (professionals.length === 0) {
    return null // Ne rien afficher si pas de pros vedettes
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-amber-400" />
            {config.badge.text}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {config.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {config.subtitle}
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((pro, index) => (
            <FeaturedCard
              key={pro.id}
              professional={pro}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href={config.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {config.cta.text}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}