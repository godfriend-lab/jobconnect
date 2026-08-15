// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  Search, MapPin, Star, Shield, ShieldCheck, Pause,
  Heart, Home, Loader2,
  Wrench, Zap, Hammer, Paintbrush, Home as HomeIcon, 
  Scissors, Laptop, Briefcase, ExternalLink, MessageCircle, Stethoscope,
  User
} from 'lucide-react'

// ✅ COMPOSANT BADGE SÉCURITÉ INTERNE
const PlanBadge = ({ plan }: { plan: string }) => {
  if (!plan || plan === 'Gratuit') return null

  const config: Record<string, { iconColor: string; bgColor: string; tooltip: string }> = {
    'Starter': { iconColor: 'text-emerald-600', bgColor: 'bg-emerald-100', tooltip: 'Forfait Starter' },
    'Business': { iconColor: 'text-blue-600', bgColor: 'bg-blue-100', tooltip: 'Forfait Business' },
    'Premium': { iconColor: 'text-amber-600', bgColor: 'bg-amber-100', tooltip: 'Forfait Premium' }
  }

  const { iconColor, bgColor, tooltip } = config[plan] || config['Starter']

  return (
    <div 
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColor} ${iconColor} shrink-0 transition-all duration-300 hover:scale-110 cursor-help relative`}
      title={tooltip}
    >
      <span className={`absolute inline-flex h-full w-full rounded-full ${iconColor.replace('text-', 'bg-')} opacity-20 animate-ping`}></span>
      <ShieldCheck className="w-3.5 h-3.5 relative z-10" />
    </div>
  )
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
  }
}

export default function MarketplacePage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
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

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('plomber') || n.includes('mécanic')) return Wrench
    if (n.includes('électric')) return Zap
    if (n.includes('maçon') || n.includes('bâtiment')) return Hammer
    if (n.includes('peintre')) return Paintbrush
    if (n.includes('couture')) return Scissors
    if (n.includes('développ') || n.includes('web')) return Laptop
    if (n.includes('médecin') || n.includes('santé')) return Stethoscope
    return Briefcase
  }

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
      const { data: servicesData, error } = await supabase
        .from('services')
        .select('*, profiles:pro_id(full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, is_available, city)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (servicesData) {
        const formatted = servicesData.map(s => ({
          ...s,
          profiles: s.profiles || { 
            id: s.pro_id, // ✅ Ajout de l'ID ici pour sécurité
            full_name: 'Professionnel', phone: '', avatar_url: null, specialty: '', 
            rating: 0, total_reviews: 0, plan: 'Gratuit', is_verified: false, is_available: true, city: ''
          }
        }))
        setServices(formatted)
      }
    } catch (error) {
      console.error('Erreur chargement services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = [...services]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.profiles.full_name.toLowerCase().includes(query)
      )
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(service => service.city?.toLowerCase() === selectedCity.toLowerCase())
    }

    filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0
      scoreA += (a.profiles.rating || 0) * 100 + (a.profiles.is_verified ? 50 : 0)
      scoreB += (b.profiles.rating || 0) * 100 + (b.profiles.is_verified ? 50 : 0)
      return scoreB - scoreA
    })

    setFilteredServices(filtered)
  }

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId])
  }

  const contactWhatsApp = async (service: Service) => {
    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) phone = '+' + phone
      else if (phone.startsWith('9') || phone.startsWith('7')) phone = '+228' + phone
    }
    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur JobConnect.`)
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Chargement de la marketplace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: scroll 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-black text-xl tracking-tight">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </span>
          </Link>
          
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition duration-300"></div>
              <div className="relative flex items-center bg-white rounded-xl border border-slate-200 group-focus-within:border-indigo-300 transition-colors">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher un service ou professionnel..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-slate-700 placeholder-slate-400" 
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative group">
              <div className="relative flex items-center bg-white rounded-xl border border-slate-200 focus-within:border-emerald-300 transition-colors">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Localité..." 
                  value={citySearchQuery}
                  onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all') }}
                  onFocus={() => setShowCityDropdown(true)}
                  className="w-40 pl-10 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-slate-700 placeholder-slate-400" 
                />
              </div>
            </div>
            {showCityDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} className="w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 text-slate-700 font-semibold">
                    <MapPin className="w-4 h-4 inline mr-2" /> Toutes les localités
                  </button>
                  {filteredCities.map((city) => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} className="w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 text-slate-700">
                      {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={handleMonEspace}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Mon Espace
          </button>
        </div>

        {/* MARQUEE CATÉGORIES */}
        <div className="border-t border-slate-200/60 bg-slate-50/50 overflow-hidden relative">
          <div className="flex animate-marquee py-3 whitespace-nowrap">
            {[{ id: 'all', name: 'Tous les métiers', icon: Home }, ...categoriesMetiers.map(cat => ({ id: cat, name: cat, icon: getIconForCategory(cat) }))].flatMap((cat, index, arr) => 
              Array(2).fill(cat).map((c, i) => (
                <button key={`${c.id}-${index}-${i}`} onClick={() => setSelectedCategory(c.id)} className="mx-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 border border-slate-200 bg-white text-slate-700 shrink-0 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-all">
                  <c.icon className="w-4 h-4" /> {c.name}
                </button>
              ))
            )}
          </div>
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-indigo-100 animate-fade-in-up mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Trouvez le <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">professionnel</span> qu'il vous faut
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                JOBCONNECT vous connecte avec des professionnels qualifiés et vérifiés près de chez vous.
              </p>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-200 shadow-sm w-fit">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Professionnels vérifiés</span>
              </div>
            </div>

            <div className="relative hidden lg:block">
              {!imageError ? (
                <img 
                  src="/image/professionals-illustration.png" 
                  alt="Professionnels JOBCONNECT" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ maxHeight: '400px', transform: 'translateY(-10px)' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[300px] bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl">
                  <div className="text-center">
                    <div className="flex justify-center gap-4 mb-4 text-5xl">
                      <span>👷</span><span>👩‍🔧</span><span>🛠️</span>
                    </div>
                    <p className="text-slate-700 font-bold text-lg">Professionnels JOBCONNECT</p>
                  </div>
                </div>
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* GRILLE DE SERVICES */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center animate-fade-in-up">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-900 font-bold text-lg">Aucun service trouvé</p>
            <p className="text-slate-500 mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300 group flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  {service.profiles.avatar_url ? (
                    <img src={service.profiles.avatar_url} alt={service.profiles.full_name} className="w-full h-full object-cover object-center relative z-10 transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                      <div className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500">👤</div>
                    </div>
                  )}
                  
                  {service.profiles.is_verified && (
                    <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-30 border border-white/20">
                      <Shield className="w-3.5 h-3.5" /> Vérifié
                    </div>
                  )}

                  {!service.profiles.is_available && (
                    <div className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-30 border border-white/20">
                      <Pause className="w-3.5 h-3.5" /> Indisponible
                    </div>
                  )}
                  
                  <button onClick={() => toggleFavorite(service.id)} className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-30 group/btn">
                    <Heart className={`w-5 h-5 transition-all duration-300 ${favorites.includes(service.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400 group-hover/btn:text-red-400'}`} />
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      {(() => { const Icon = getIconForCategory(service.category); return <Icon className="w-4 h-4 text-indigo-600" /> })()}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2 flex-1 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md overflow-hidden ring-2 ring-white">
                      {service.profiles.avatar_url ? (
                        <img src={service.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        service.profiles.full_name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm font-bold text-slate-900 truncate">{service.profiles.full_name}</span>
                        <PlanBadge plan={service.profiles.plan} />
                      </div>
                      {service.profiles.specialty && <span className="text-xs text-slate-500 truncate block">{service.profiles.specialty}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    {service.profiles.rating > 0 && (
                      <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-900 text-sm">{service.profiles.rating.toFixed(1)}</span>
                        {service.profiles.total_reviews > 0 && <span className="text-xs text-slate-500">({service.profiles.total_reviews})</span>}
                      </div>
                    )}
                    {service.city && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{service.city}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 rounded-xl border border-indigo-100 relative overflow-hidden">
                        <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider mb-0.5 relative z-10">Prix estimé</span>
                        <span className="text-lg font-black text-indigo-600 relative z-10">{service.price}</span>
                      </div>
                      
                      {service.profiles.is_available ? (
                        <button onClick={() => contactWhatsApp(service)} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn">
                          <MessageCircle className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Contacter</span>
                        </button>
                      ) : (
                        <div className="flex-1 py-3 bg-slate-100 text-slate-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200">
                          <Pause className="w-4 h-4" /> Indisponible
                        </div>
                      )}
                    </div>
                    
                    {/* ✅ CORRECTION ICI : Utilisation de service.pro_id au lieu de service.profiles.id */}
                    <Link href={`/pro/${service.pro_id}`} className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-slate-200 hover:border-indigo-200 group/link">
                      <span>Voir le profil complet</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="font-black text-lg text-slate-900">JOB<span className="text-indigo-600">CONNECT</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
              <a href="/terms" className="hover:text-indigo-600 transition-colors">Conditions d'utilisation</a>
              <a href="/privacy" className="hover:text-indigo-600 transition-colors">Confidentialité</a>
              <a href="/contact" className="hover:text-indigo-600 transition-colors">Support</a>
            </div>
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} JobConnect Togo.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}