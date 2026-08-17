// @ts-nocheck
import { useState } from 'react'
import { Search, MapPin, ShieldCheck, Briefcase } from 'lucide-react'
import ServiceCard from '../shared/ServiceCard'

const allCities = ['Lomé', 'Kara', 'Sokodé', 'Kpalimé', 'Atakpamé', 'Dapaong', 'Tsévié', 'Aného', 'Vogan', 'Badou', 'Niamtougou', 'Bassar', 'Mango']

export default function MarketplaceView({ 
  filteredServices, favorites, searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory, selectedCity, setSelectedCity, 
  citySearchQuery, setCitySearchQuery, showCityDropdown, setShowCityDropdown,
  onToggleFavorite, onContact 
}: any) {
  const [imageError, setImageError] = useState(false)
  const filteredCities = allCities.filter((city: string) => city.toLowerCase().includes(citySearchQuery.toLowerCase())).slice(0, 10)

  return (
    <div className="space-y-8">
      <style>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-indigo-500/30 animate-fade-in-up">
        <div className="absolute top-4 left-4 grid grid-cols-4 gap-2 opacity-30">
          {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 bg-indigo-400 rounded-full"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Trouvez le <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">professionnel</span> qu'il vous faut
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              JOBCONNECT vous connecte avec des professionnels qualifiés et vérifiés près de chez vous.
            </p>
            <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-500/50 shadow-lg w-fit">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <div className="w-6 h-6 bg-emerald-900/50 rounded-full flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                <span>Professionnels vérifiés</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            {!imageError ? (
              <img src="/image/professionals-illustration.png" alt="Professionnels" className="w-full h-auto object-contain drop-shadow-2xl" style={{ maxHeight: '500px', transform: 'translateY(-20px)' }} onError={() => setImageError(true)} />
            ) : (
              <div className="relative z-10 w-full h-[400px] bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50 rounded-3xl flex items-center justify-center border-4 border-slate-700 shadow-2xl">
                <div className="text-center p-8">
                  <div className="flex justify-center gap-4 mb-6 text-6xl"><span></span><span>👩‍</span><span>🔧</span></div>
                  <p className="text-white font-bold text-lg mb-2">Professionnels JOBCONNECT</p>
                </div>
              </div>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Barre de recherche Mobile */}
      <div className="md:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Rechercher un service..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500" />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Localité..." value={citySearchQuery} onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all'); }} onFocus={() => setShowCityDropdown(true)} className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500" />
          {showCityDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
              <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery(''); }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-emerald-400 font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Toutes les localités</button>
              {filteredCities.map((city: string) => (
                <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city); }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-slate-300 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" /> {city}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badge nombre de services */}
      <div className="flex items-center gap-2 px-4 py-2 bg-indigo-900/30 border border-indigo-500/50 rounded-xl w-fit animate-fade-in-up">
        <Briefcase className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-bold text-indigo-300">{filteredServices.length} <span className="font-normal text-indigo-400">services disponibles</span></span>
      </div>

      {/* Grille de résultats */}
      {filteredServices.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-16 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-10 h-10 text-slate-600" /></div>
          <p className="text-white font-bold text-lg">Aucun service trouvé</p>
          <p className="text-slate-400 mt-2">Essayez de modifier vos critères de recherche ou de localisation</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service: any, index: number) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isFavorite={favorites.some((f: any) => f.id === service.profiles.id)}
              onToggleFavorite={onToggleFavorite}
              onContact={onContact}
            />
          ))}
        </div>
      )}
    </div>
  )
}