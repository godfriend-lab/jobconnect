// @ts-nocheck
'use client'

import Link from 'next/link'
import { Search, MapPin, Star, Heart, Eye, MessageCircle, User, Check } from 'lucide-react'

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
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedCity: string
  setSelectedCity: (city: string) => void
  citySearchQuery: string
  setCitySearchQuery: (query: string) => void
  showCityDropdown: boolean
  setShowCityDropdown: (show: boolean) => void
  marqueeCategories: any[] // Accepte maintenant des objets ou des strings
  onToggleFavorite: (serviceId: string) => void
  onContact: (service: Service) => void
}

export default function MarketplaceView({
  filteredServices,
  favorites,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  citySearchQuery,
  setCitySearchQuery,
  showCityDropdown,
  setShowCityDropdown,
  marqueeCategories,
  onToggleFavorite,
  onContact
}: MarketplaceViewProps) {

  const allCities = [
    'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Bè', 'Tokoin', 'Akodesséwa', 
    'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué', 'Tsévié', 'Kpalimé', 
    'Sokodé', 'Kara', 'Dapaong'
  ]

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  )

  if (!filteredServices || filteredServices.length === 0) {
    return (
      <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-16 text-center">
        <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-white font-bold text-lg">Aucun service trouvé</p>
        <p className="text-slate-400 mt-2">Essayez de modifier vos critères de recherche</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un service ou professionnel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
          />
        </div>
        
        <div className="relative md:w-64">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Localité..."
            value={citySearchQuery}
            onChange={(e) => {
              setCitySearchQuery(e.target.value)
              setShowCityDropdown(true)
              setSelectedCity('all')
            }}
            onFocus={() => setShowCityDropdown(true)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500"
          />
          {showCityDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
              <div className="absolute top-full left-0 mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                <button 
                  onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} 
                  className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-emerald-400 font-semibold"
                >
                  <MapPin className="w-4 h-4 inline mr-2" /> Toutes les localités
                </button>
                {filteredCities.map((city) => (
                  <button 
                    key={city} 
                    onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} 
                    className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-slate-300"
                  >
                    <MapPin className="w-4 h-4 inline mr-2 text-slate-500" /> {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Catégories (CORRIGÉ POUR GÉRER LES OBJETS) */}
      <div className="border-t border-b border-slate-800 bg-slate-900/50 overflow-hidden py-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm border transition-all whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-indigo-400'
            }`}
          >
            Tous les métiers
          </button>
          
          {marqueeCategories.map((cat: any, idx) => {
            // ✅ Extraction sécurisée : si c'est un objet, on prend .id et .name, sinon on prend la valeur directe
            const categoryId = typeof cat === 'object' ? cat.id : cat
            const categoryName = typeof cat === 'object' ? cat.name : cat
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(categoryId)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm border transition-all whitespace-nowrap ${
                  selectedCategory === categoryId 
                    ? 'bg-indigo-600 border-indigo-500 text-white' 
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-indigo-400'
                }`}
              >
                {categoryName} {/* ✅ On affiche le nom (string), pas l'objet entier */}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grille de services */}
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
                {service.city && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{service.city}</span>
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