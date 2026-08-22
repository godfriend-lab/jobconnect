// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  Search, MapPin, Star, ShieldCheck, Pause,
  Heart, Home, Loader2, AlertCircle, Eye, MessageCircle,
  User, Check
} from 'lucide-react'

// ✅ SYSTÈME DE PRIORITÉ INVISIBLE
const PLAN_PRIORITY: Record<string, number> = {
  'premium': 4,
  'business': 3,
  'starter': 2,
  'gratuit': 1,
}

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  city: string | null
  pro_id: string
  created_at: string
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
    city: string | null
  }
}

export default function MarketplacePage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  const allCities = [
    'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Bè', 'Tokoin', 'Akodesséwa', 'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué', 
    'Tsévié', 'Kpalimé', 'Sokodé', 'Kara', 'Dapaong'
  ]

  const categoriesMetiers = [
    "Maçon", "Plombier", "Électricien", "Peintre en bâtiment", "Couture", "Développeur web", "Mécanicien", "Médecin"
  ]

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  )

  useEffect(() => {
    checkUserSession()
    loadServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, searchQuery, selectedCity, selectedCategory])

  const checkUserSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setCurrentUser(profileData)
      }
    } catch (error) {
      console.error('Erreur vérification session:', error)
    }
  }

  const loadServices = async () => {
    try {
      setDbError(null)
      const { data: servicesData, error } = await supabase
        .from('services')
        .select(`
          id, title, description, category, price, city, pro_id, created_at, is_active,
          profiles:pro_id (
            id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, is_available, city
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Erreur Supabase:', error.message)
        setDbError(error.message)
        throw error
      }

      if (servicesData) {
        const formatted = servicesData.map(s => ({
          ...s,
          profiles: s.profiles || { 
            id: s.pro_id,
            full_name: 'Professionnel', 
            phone: '', 
            avatar_url: null, 
            specialty: '', 
            rating: 0, 
            total_reviews: 0, 
            plan: 'Gratuit', 
            is_verified: false, 
            is_available: true, 
            city: s.city || ''
          }
        }))
        setServices(formatted)
      }
    } catch (error: any) {
      console.error('❌ Erreur chargement services:', error.message || error)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = [...services]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category?.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.title?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.profiles?.full_name?.toLowerCase().includes(query)
      )
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(service => 
        (service.city || service.profiles?.city)?.toLowerCase() === selectedCity.toLowerCase()
      )
    }

    // ✅ TRI PRIORITAIRE INVISIBLE
    filtered.sort((a, b) => {
      const priorityA = PLAN_PRIORITY[a.profiles?.plan?.toLowerCase() || 'gratuit'] || 1
      const priorityB = PLAN_PRIORITY[b.profiles?.plan?.toLowerCase() || 'gratuit'] || 1
      
      if (priorityB !== priorityA) return priorityB - priorityA
      
      const ratingA = a.profiles?.rating || 0
      const ratingB = b.profiles?.rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredServices(filtered)
  }

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId])
  }

  const contactWhatsApp = async (service: Service) => {
    // 🔒 Vérification de disponibilité
    if (!service.profiles?.is_available) {
      alert('Ce professionnel est actuellement en mission. Veuillez réessayer plus tard.')
      return
    }

    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) phone = '+' + phone
      else if (phone.startsWith('9') || phone.startsWith('7')) phone = '+228' + phone
    }
    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur ProKorb.`)
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank')
  }

  const handleMonEspace = () => {
    if (currentUser) {
      if (currentUser.role === 'pro') {
        router.push('/dashboard/pro')
      } else {
        router.push('/dashboard/client')
      }
    } else {
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mx-auto mb-4" />
        <p className="text-slate-300 font-medium">Chargement de la marketplace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: scroll 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* HEADER */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <img src="/logo.png" alt="Logo ProKorb" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
            <span className="font-black text-xl tracking-tight hidden sm:block">
              <span className="text-indigo-400">PRO</span>
              <span className="text-white">KORB</span>
            </span>
          </Link>
          
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher un service ou professionnel..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500" 
              />
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Localité..." 
                value={citySearchQuery}
                onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all') }}
                onFocus={() => setShowCityDropdown(true)}
                className="w-40 pl-10 pr-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500" 
              />
            </div>
            {showCityDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-emerald-400 font-semibold">
                    <MapPin className="w-4 h-4 inline mr-2" /> Toutes les localités
                  </button>
                  {filteredCities.map((city) => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-slate-300">
                      <MapPin className="w-4 h-4 inline mr-2 text-slate-500" /> {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={handleMonEspace} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <User className="w-4 h-4" /> Mon Espace
          </button>
        </div>

        {/* MARQUEE CATÉGORIES */}
        <div className="border-t border-slate-800/60 bg-slate-900/50 overflow-hidden">
          <div className="flex animate-marquee py-3 whitespace-nowrap">
            {[{ id: 'all', name: 'Tous les métiers' }, ...categoriesMetiers.map(cat => ({ id: cat, name: cat }))].flatMap((cat, index) => 
              Array(2).fill(cat).map((c, i) => (
                <button key={`${c.id}-${index}-${i}`} onClick={() => setSelectedCategory(c.id)} className="mx-2 px-4 py-2 rounded-full text-xs sm:text-sm border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500 hover:text-indigo-400 transition-all">
                  {c.name}
                </button>
              ))
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ERREUR BDD */}
        {dbError && (
          <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-red-400 mb-2">Erreur de connexion</h3>
            <p className="text-slate-400">{dbError}</p>
          </div>
        )}

        {/* GRILLE DE SERVICES */}
        {!dbError && filteredServices.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-16 text-center">
            <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-white font-bold text-lg">Aucun service trouvé</p>
            <p className="text-slate-400 mt-2">Essayez de modifier vos critères</p>
          </div>
        ) : !dbError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => {
              const isAvailable = service.profiles?.is_available !== false
              const isPremium = service.profiles?.plan === 'Premium' || service.profiles?.plan === 'Business'
              
              // ✅ CORRECTION: Utiliser la ville du service OU du profil
              const displayCity = service.city || service.profiles?.city

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
                          <Pause className="w-3 h-3" />
                          En mission
                        </span>
                      )}
                    </div>

                    {/* Badge Favori */}
                    <button 
                      onClick={() => toggleFavorite(service.id)} 
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

                    {/* Localisation - ✅ CORRECTION APPLIQUÉE ICI */}
                    {displayCity && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>{displayCity}</span>
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
                          onClick={() => contactWhatsApp(service)}
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
                          <Pause className="w-4 h-4" />
                          Indisponible
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo ProKorb" className="h-8 w-auto object-contain" />
              <span className="font-black text-lg text-white">PRO<span className="text-indigo-400">KORB</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="/terms" className="hover:text-indigo-400 transition-colors">Conditions</a>
              <a href="/privacy" className="hover:text-indigo-400 transition-colors">Confidentialité</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors">Support</a>
            </div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} ProKorb Togo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}