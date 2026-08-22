// @ts-nocheck
'use client'

import Link from 'next/link'
import { MapPin, Star, Heart, Eye, MessageCircle, User, Check, Loader2 } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  city: string | null
  pro_id: string
  profiles: {
    id: string
    full_name: string
    phone: string
    avatar_url: string | null
    specialty: string
    rating: number
    total_reviews: number
    plan: string
    is_verified: boolean
    is_available: boolean
  }
}

interface MarketplaceViewProps {
  filteredServices: Service[]
  favorites: string[]
  onToggleFavorite: (serviceId: string) => void
  onContact: (service: Service) => void
}

export default function MarketplaceView({
  filteredServices,
  favorites,
  onToggleFavorite,
  onContact
}: MarketplaceViewProps) {

  if (!filteredServices || filteredServices.length === 0) {
    return (
      <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-16 text-center">
        <Loader2 className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-spin" />
        <p className="text-white font-bold text-lg">Chargement ou aucun service trouvé</p>
        <p className="text-slate-400 mt-2">Essayez de modifier vos critères de recherche en haut de page</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ✅ GRILLE DE SERVICES UNIQUEMENT 
          (La barre de recherche et le marquee sont gérés par ClientLayout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => {
          const isAvailable = service.profiles?.is_available !== false
          const isPremium = service.profiles?.plan === 'Premium' || service.profiles?.plan === 'Business'

          return (
            <div 
              key={service.id} 
              className={`bg-slate-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
                isPremium ? 'border-amber-500/30 hover:border-amber-500/60' : 'border-slate-800 hover:border-indigo-500/50'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* IMAGE + OVERLAYS */}
              <div className="relative aspect-square overflow-hidden bg-slate-800">
                {service.profiles?.avatar_url ? (
                  <img 
                    src={service.profiles.avatar_url} 
                    alt={service.profiles.full_name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                    <User className="w-20 h-20 text-white/50" />
                  </div>
                )}

                {/* Badge Disponibilité */}
                <div className="absolute top-3 left-3">
                  {isAvailable ? (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                      Disponible
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      En mission
                    </span>
                  )}
                </div>

                {/* Badge Favori */}
                <button 
                  onClick={() => onToggleFavorite(service.id)} 
                  className="absolute top-3 right-3 w-8 h-8 bg-slate-900/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-900/80 transition-all"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(service.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>

                {/* Rating + Vérifié */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  {service.profiles?.rating > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-slate-900">{service.profiles.rating.toFixed(1)}</span>
                      {service.profiles.total_reviews > 0 && (
                        <span className="text-xs text-slate-600">({service.profiles.total_reviews})</span>
                      )}
                    </div>
                  )}
                  
                  {service.profiles?.is_verified && (
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENU CARTE */}
              <div className="p-5 space-y-4">
                {/* Nom + Badge Vérifié */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {service.profiles?.full_name}
                    </h3>
                    {service.profiles?.is_verified && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{service.profiles?.specialty || service.category}</p>
                </div>

                {/* Localisation */}
                {(service.city || service.profiles?.city) && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{service.city || service.profiles?.city}</span>
                  </div>
                )}

                {/* Prix */}
                <div className="pt-2 border-t border-slate-800">
                  <p className={`font-bold text-lg ${isAvailable ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {service.price}
                  </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3 pt-2">
                  <Link 
                    href={`/pro/${service.pro_id}`} 
                    className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-slate-700"
                  >
                    <Eye className="w-4 h-4" />
                    Voir le profil
                  </Link>
                  
                  {isAvailable ? (
                    <button 
                      onClick={() => onContact(service)}
                      className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contacter
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="flex-1 px-4 py-3 bg-slate-700 text-slate-400 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-600"
                      title="Professionnel actuellement en mission"
                    >
                      Indisponible
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}