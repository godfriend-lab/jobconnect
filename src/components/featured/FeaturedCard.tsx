// @ts-nocheck
'use client'

import Link from 'next/link'
import { Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react'
import { FEATURED_SECTION_CONFIG } from './config'

interface FeaturedCardProps {
  professional: any
  index: number
}

export default function FeaturedCard({ professional, index }: FeaturedCardProps) {
  const config = FEATURED_SECTION_CONFIG
  const { display } = config

  return (
    <Link
      href={`/pro/${professional.id}`}
      className="group relative bg-slate-900 rounded-2xl p-6 border-2 border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10"
      style={{
        animationDelay: config.animation.enabled ? `${index * config.animation.staggerDelay}ms` : '0ms'
      }}
    >
      {/* Badge "En vedette" */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold rounded-full">
          <Star className="w-3 h-3 fill-amber-400" />
          {config.badge.text}
        </span>
      </div>

      {/* Avatar + Infos */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-amber-500/30 flex-shrink-0">
          {professional.avatar_url ? (
            <img
              src={professional.avatar_url}
              alt={professional.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
              {professional.full_name?.charAt(0) || 'P'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-amber-400 transition-colors">
            {professional.full_name}
          </h3>
          <p className="text-sm text-slate-400 truncate">{professional.specialty}</p>
          {display.showCity && professional.city && (
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3" />
              {professional.city}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-800">
        {display.showRating && professional.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-white">{professional.rating.toFixed(1)}</span>
            {display.showReviews && professional.total_reviews > 0 && (
              <span className="text-xs text-slate-500">({professional.total_reviews})</span>
            )}
          </div>
        )}
        {display.showVerified && professional.is_verified && (
          <div className="flex items-center gap-1 text-xs text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Vérifié
          </div>
        )}
      </div>

      {/* Services */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          Services proposés
        </p>
        {professional.services.slice(0, display.maxServices).map((service: any) => (
          <div key={service.id} className="flex items-center justify-between text-sm">
            <span className="text-slate-300 truncate">{service.title}</span>
            <span className="text-amber-400 font-semibold ml-2 text-xs">
              {service.price}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Voir le profil</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Effet glow subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </Link>
  )
}