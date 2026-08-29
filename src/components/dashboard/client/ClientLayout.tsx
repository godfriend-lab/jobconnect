// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, MapPin, Home, Clock, Heart, Settings, 
  LogOut, Loader2, ChevronDown, Menu, X, User
} from 'lucide-react'

export default function ClientLayout({ 
  children, 
  activeView, 
  setActiveView, 
  profile, 
  handleLogout,
  searchQuery, 
  setSearchQuery, 
  citySearchQuery, 
  setCitySearchQuery, 
  showCityDropdown, 
  setShowCityDropdown, 
  selectedCity, 
  setSelectedCity, 
  allCities = [], 
  marqueeCategories = [], 
  loading 
}: any) {
  
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Sécurité : filtrage des villes avec fallback
  const filteredCities = (allCities || []).filter((city: string) => 
    city.toLowerCase().includes((citySearchQuery || '').toLowerCase())
  ).slice(0, 15)

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)] animate-pulse"></div>
        <div className="relative z-10 text-center">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-slate-300 font-medium animate-pulse">Chargement de votre espace...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Home },
    { id: 'history', label: 'Historique', icon: Clock },
    { id: 'favorites', label: 'Favoris', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-slate-950 relative flex flex-col">
      <style>{`
        .glass-effect { background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: scroll 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>

      {/* ✅ HEADER PRINCIPAL */}
      <header className="glass-effect border-b border-slate-800/60 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          
          {/* LIGNE 1 : Logo + Menu Mobile + Profil */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 flex-shrink-0">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-white transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Link href="/dashboard/client" className="flex items-center gap-3 group">
                <img src="/logo.png" alt="Logo ProKorb" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                <span className="font-black text-lg hidden sm:block tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PRO</span>
                  <span className="text-white">KORB</span>
                </span>
              </Link>
            </div>

            {/* Menu Profil - CLIC SUR L'AVATAR */}
            <div className="relative">
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-800 transition-colors group border border-transparent hover:border-slate-700"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden ring-2 ring-slate-800 shadow-lg">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || 'C'
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Profil */}
              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[40]" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden animate-fade-in-up">
                    {/* En-tête du menu avec infos profil */}
                    <div className="p-4 border-b border-slate-800 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
                      <p className="font-bold text-white text-sm truncate">{profile?.full_name || 'Client'}</p>
                      <p className="text-xs text-slate-400 truncate">{profile?.email || ''}</p>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="p-2 space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeView === item.id
                        return (
                          <button 
                            key={item.id}
                            onClick={() => { 
                              setActiveView(item.id)
                              setProfileMenuOpen(false)
                            }} 
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                              isActive 
                                ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/20' 
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </button>
                        )
                      })}
                    </nav>
                    
                    {/* Bouton Déconnexion */}
                    <div className="p-2 border-t border-slate-800">
                      <button 
                        onClick={() => { handleLogout(); setProfileMenuOpen(false); }} 
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/20 text-red-400 font-medium transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ✅ LIGNE 2 : Barres de recherche (100% Responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Champ Recherche */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Rechercher un service ou professionnel..." 
                value={searchQuery || ''} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-[16px] transition-all" 
              />
            </div>
            
            {/* Champ Localité */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Localité..." 
                value={citySearchQuery || ''} 
                onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all'); }} 
                onFocus={() => setShowCityDropdown(true)} 
                className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500 text-[16px] transition-all" 
              />
            </div>
          </div>

          {/* Dropdown localité */}
          {showCityDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 animate-fade-in-up custom-scrollbar">
                <button 
                  onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery(''); }} 
                  className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/20 text-emerald-400 font-semibold border-b border-slate-800 flex items-center gap-2 transition-colors sticky top-0 bg-slate-900 z-10"
                >
                  <MapPin className="w-4 h-4" /> Toutes les localités
                </button>
                {filteredCities.map((city: string) => (
                  <button 
                    key={city} 
                    onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city); }} 
                    className="w-full px-4 py-3 text-left text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-slate-500" /> {city}
                  </button>
                ))}
                {filteredCities.length === 0 && (
                  <div className="px-4 py-4 text-center text-sm text-slate-500">
                    Aucune ville trouvée
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ✅ Marquee Catégories */}
        <div className="border-t border-slate-800/60 bg-slate-900/50 overflow-hidden relative">
          <div className="flex animate-marquee py-3 whitespace-nowrap">
            {[...(marqueeCategories || []), ...(marqueeCategories || [])].map((cat: any, index: number) => {
              const Icon = cat.icon || Home
              return (
                <div 
                  key={`${cat.id || cat.name}-${index}`} 
                  className="mx-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 border border-slate-700 bg-slate-800 text-slate-300 flex-shrink-0 shadow-sm hover:shadow-md hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-700 transition-all duration-300 cursor-pointer group"
                >
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  {cat.name}
                </div>
              )
            })}
          </div>
          <div className="absolute top-0 left-0 w-16 sm:w-24 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-16 sm:w-24 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>
      </header>

      {/* ✅ SIDEBAR MOBILE (Menu hamburger) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-slate-900 border-r border-slate-800 shadow-2xl overflow-y-auto animate-fade-in-up">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeView === item.id
                return (
                  <button 
                    key={item.id}
                    onClick={() => { 
                      setActiveView(item.id)
                      setMobileMenuOpen(false) 
                    }} 
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/20' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
              
              <div className="pt-4 mt-4 border-t border-slate-800">
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-red-900/20 text-red-400 font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ✅ CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full relative z-10">
        {children}
      </main>
    </div>
  )
}