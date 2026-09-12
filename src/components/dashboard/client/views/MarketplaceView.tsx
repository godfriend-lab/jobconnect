// @ts-nocheck
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react' // ✅ AJOUTÉ
import {
  MapPin,
  Star,
  Heart,
  Eye,
  MessageCircle,
  User,
  Pause,
  ShieldCheck,
  ChevronDown, // ✅ AJOUTÉ
} from 'lucide-react'
import VerifiedBadge from '@/components/VerifiedBadge'

/* =========================================================
   TYPES
========================================================= */

interface ServiceProfile {
  id: string
  full_name: string
  phone: string
  avatar_url: string | null
  specialty: string
  rating: number
  total_reviews: number
  plan: string
  is_verified: boolean
  verified_at: string | null
  is_available: boolean
  city?: string | null
}

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  city: string | null
  pro_id: string
  created_at?: string
  profiles: ServiceProfile | null
}

interface MarketplaceViewProps {
  filteredServices: Service[]
  favorites: string[]
  onToggleFavorite: (serviceId: string) => void
  onContact: (service: Service) => void
  searchQuery?: string // ✅ AJOUTÉ POUR DÉTECTER LA RECHERCHE
}

/* =========================================================
   FALLBACK VERIFIED BADGE
   Utilisé si verified_at est absent.
========================================================= */

const SimpleVerifiedBadge = ({
  size = 18,
}: {
  size?: number
}) => {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      title="Profil vérifié"
      aria-label="Profil vérifié"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 1.5L14.05 2.35L16.25 2.15L17.65 3.85L19.65 4.65L19.95 6.85L21.35 8.55L20.65 10.65L21.35 12.75L19.95 14.45L19.65 16.65L17.65 17.45L16.25 19.15L14.05 18.95L12 19.8L9.95 18.95L7.75 19.15L6.35 17.45L4.35 16.65L4.05 14.45L2.65 12.75L3.35 10.65L2.65 8.55L4.05 6.85L4.35 4.65L6.35 3.85L7.75 2.15L9.95 2.35Z"
          fill="#1877F2"
        />

        <path
          d="M7.2 11.9L10.15 14.75L16.85 8.35"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

/* =========================================================
   HELPERS
========================================================= */

const getProfile = (service: Service): ServiceProfile | null => {
  return service?.profiles ?? null
}

const getDisplayName = (service: Service) => {
  return getProfile(service)?.full_name?.trim() || 'Professionnel'
}

const getSpecialty = (service: Service) => {
  return getProfile(service)?.specialty?.trim() || service?.category?.trim() || 'Professionnel'
}

const getCity = (service: Service) => {
  return service?.city?.trim() || getProfile(service)?.city?.trim() || ''
}

const getRating = (service: Service) => {
  const rating = Number(getProfile(service)?.rating ?? 0)
  if (!Number.isFinite(rating)) return 0
  return Math.max(0, Math.min(5, rating))
}

const getReviewCount = (service: Service) => {
  const reviews = Number(getProfile(service)?.total_reviews ?? 0)
  if (!Number.isFinite(reviews)) return 0
  return Math.max(0, reviews)
}

const getPlan = (service: Service) => {
  return getProfile(service)?.plan?.trim().toLowerCase() || 'gratuit'
}

const isServiceAvailable = (service: Service) => {
  return getProfile(service)?.is_available !== false
}

const isPremiumPlan = (service: Service) => {
  const plan = getPlan(service)
  return plan === 'premium' || plan === 'business'
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MarketplaceView({
  filteredServices,
  favorites,
  onToggleFavorite,
  onContact,
  searchQuery = '', // ✅ VALEUR PAR DÉFAUT
}: MarketplaceViewProps) {
  
  // ✅ NOUVEAU : État pour la pagination (28 par défaut)
  const [visibleCount, setVisibleCount] = useState(28)

  // ✅ NOUVEAU : Réinitialiser le compteur à 28 à chaque changement de recherche
  useEffect(() => {
    setVisibleCount(28)
  }, [searchQuery])

  // ✅ NOUVEAU : Déterminer si un filtre de recherche est actif
  const hasActiveFilter = searchQuery !== ''

  // ✅ NOUVEAU : Services à afficher (Tous si filtre actif, sinon limité à visibleCount)
  const servicesToDisplay = hasActiveFilter
    ? filteredServices
    : filteredServices.slice(0, visibleCount)

  /* -------------------------------------------------------
     EMPTY STATE
  ------------------------------------------------------- */

  if (!Array.isArray(filteredServices) || filteredServices.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-lg sm:p-16">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
          <Star className="h-8 w-8 text-slate-600" />
        </div>

        <p className="text-lg font-bold text-white">Aucun service trouvé</p>

        <p className="mt-2 text-sm text-slate-400">
          Essayez de modifier vos critères de recherche.
        </p>
      </div>
    )
  }

  /* -------------------------------------------------------
     MARKETPLACE - GRID
  ------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* =====================================================
          GRID
      ===================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* ✅ UTILISATION DE servicesToDisplay AU LIEU DE filteredServices */}
        {servicesToDisplay.map((service, index) => {
          const profile = getProfile(service)
          const isAvailable = isServiceAvailable(service)
          const isPremium = isPremiumPlan(service)
          const isFavorite = favorites?.includes(service.id) ?? false
          const displayName = getDisplayName(service)
          const specialty = getSpecialty(service)
          const displayCity = getCity(service)
          const rating = getRating(service)
          const reviewCount = getReviewCount(service)

          return (
            <article
              key={service.id}
              className={[
                'group relative overflow-hidden rounded-2xl',
                'border-2 bg-slate-900',
                'transition-all duration-300',
                'hover:-translate-y-1 hover:shadow-2xl',
                'focus-within:ring-2 focus-within:ring-indigo-500/50',
                isPremium
                  ? 'border-amber-500/30 hover:border-amber-500/60'
                  : 'border-slate-800 hover:border-indigo-500/50',
              ].join(' ')}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-square overflow-hidden bg-slate-800">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`Photo de ${displayName}`}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900">
                    <User className="h-20 w-20 text-white/40" />
                  </div>
                )}

                {/* IMAGE OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10 opacity-70" />

                {/* =================================================
                    AVAILABILITY
                ================================================= */}
                <div className="absolute left-3 top-3">
                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      Disponible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-amber-900/30">
                      <Pause className="h-3.5 w-3.5" />
                      En mission
                    </span>
                  )}
                </div>

                {/* =================================================
                    PLAN BADGE
                ================================================= */}
                {isPremium && (
                  <div className="absolute right-14 top-3">
                    <span className="rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300 backdrop-blur-md">
                      {getPlan(service)}
                    </span>
                  </div>
                )}

                {/* =================================================
                    FAVORITE
                ================================================= */}
                <button
                  type="button"
                  onClick={() => onToggleFavorite(service.id)}
                  aria-label={
                    isFavorite
                      ? `Retirer ${displayName} des favoris`
                      : `Ajouter ${displayName} aux favoris`
                  }
                  aria-pressed={isFavorite}
                  className={[
                    'absolute right-3 top-3',
                    'flex h-9 w-9 items-center justify-center',
                    'rounded-full border border-white/10',
                    'bg-slate-950/60 backdrop-blur-md',
                    'transition-all duration-200',
                    'hover:scale-105 hover:bg-slate-950/90',
                    'focus:outline-none focus:ring-2 focus:ring-white/60',
                  ].join(' ')}
                >
                  <Heart
                    className={[
                      'h-4.5 w-4.5 transition-colors',
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-white',
                    ].join(' ')}
                  />
                </button>

                {/* =================================================
                    RATING
                ================================================= */}
                {rating > 0 && (
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-black text-slate-900">
                        {rating.toFixed(1)}
                      </span>
                      {reviewCount > 0 && (
                        <span className="text-xs font-medium text-slate-600">
                          ({reviewCount})
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================
                  CARD CONTENT
              ================================================= */}
              <div className="space-y-4 p-5">
                {/* =================================================
                    NAME + VERIFIED
                ================================================= */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="min-w-0 truncate text-lg font-bold text-white transition-colors group-hover:text-indigo-400"
                      title={displayName}
                    >
                      {displayName}
                    </h3>

                    {profile?.is_verified && (
                      <span className="shrink-0">
                        {profile.verified_at ? (
                          <VerifiedBadge
                            isVerified={true}
                            verifiedAt={profile.verified_at}
                            size={18}
                            showLabel={false}
                            showExpiration={false}
                          />
                        ) : (
                          <SimpleVerifiedBadge size={18} />
                        )}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate text-sm text-slate-400" title={specialty}>
                    {specialty}
                  </p>
                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}
                {displayCity && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                      <MapPin className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="truncate">{displayCity}</span>
                  </div>
                )}

                {/* =================================================
                    SERVICE TITLE
                ================================================= */}
                {service.title && (
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Service proposé
                    </p>
                    <p className="line-clamp-2 text-sm font-semibold text-slate-200" title={service.title}>
                      {service.title}
                    </p>
                  </div>
                )}

                {/* =================================================
                    PRICE
                ================================================= */}
                <div className="flex items-end justify-between border-t border-slate-800 pt-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Tarif
                    </p>
                    <p
                      className={[
                        'mt-1 text-lg font-black',
                        isAvailable ? 'text-emerald-400' : 'text-slate-500',
                      ].join(' ')}
                    >
                      {service.price || 'Sur devis'}
                    </p>
                  </div>

                  {profile?.is_verified && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Vérifié
                    </div>
                  )}
                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}
                <div className="flex gap-3 pt-1">
                  {/* PROFILE */}
                  <Link
                    href={`/pro/${service.pro_id}`}
                    aria-label={`Voir le profil de ${displayName}`}
                    className={[
                      'flex flex-1 items-center justify-center gap-2',
                      'rounded-xl border border-slate-700',
                      'bg-slate-800 px-3 py-3',
                      'text-sm font-semibold text-white',
                      'transition-all duration-200',
                      'hover:border-slate-600 hover:bg-slate-700',
                      'focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
                    ].join(' ')}
                  >
                    <Eye className="h-4 w-4 shrink-0" />
                    <span>Profil</span>
                  </Link>

                  {/* CONTACT */}
                  {isAvailable ? (
                    <button
                      type="button"
                      onClick={() => onContact(service)}
                      aria-label={`Contacter ${displayName}`}
                      className={[
                        'flex flex-1 items-center justify-center gap-2',
                        'rounded-xl',
                        'bg-indigo-600 px-3 py-3',
                        'text-sm font-semibold text-white',
                        'shadow-lg shadow-indigo-500/20',
                        'transition-all duration-200',
                        'hover:bg-indigo-500 hover:shadow-indigo-500/30',
                        'active:scale-[0.98]',
                        'focus:outline-none focus:ring-2 focus:ring-indigo-400/60',
                      ].join(' ')}
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>Contacter</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Ce professionnel est actuellement en mission"
                      className={[
                        'flex flex-1 items-center justify-center gap-2',
                        'cursor-not-allowed rounded-xl',
                        'border border-slate-700',
                        'bg-slate-800 px-3 py-3',
                        'text-sm font-semibold text-slate-500',
                      ].join(' ')}
                    >
                      <Pause className="h-4 w-4 shrink-0" />
                      <span>Indisponible</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* ✅ NOUVEAU : BOUTON "VOIR PLUS" (Visible seulement si pas de filtre actif et qu'il reste des éléments) */}
      {!hasActiveFilter && visibleCount < filteredServices.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 28)}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
          >
            Voir plus de professionnels
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}