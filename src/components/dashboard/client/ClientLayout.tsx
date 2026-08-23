// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, MapPin, Home, Clock, Heart, Settings, 
  LogOut, Loader2, ChevronDown, Menu, X 
} from 'lucide-react'

export default function ClientLayout({ 
  children, activeView, setActiveView, profile, handleLogout,
  searchQuery, setSearchQuery, citySearchQuery, setCitySearchQuery, 
  showCityDropdown, setShowCityDropdown, selectedCity, setSelectedCity, 
  allCities, marqueeCategories, loading 
}: any) {
  
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredCities = allCities.filter((city: string) => 
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  ).slice(0, 10)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_50%)] animate-pulse"></div>
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
    <div className="min-h-screen bg-slate-950 relative">
      <style>{`
        .glass-effect { background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: scroll 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>

      {/* ✅ HEADER PRINCIPAL */}
      <header className="glass-effect border-b border-slate-800/60 sticky top-0 z-40 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo + Bouton Menu Mobile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-white transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link href="/dashboard/client" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Logo ProKorb" 
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-black text-xl hidden sm:block tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PRO</span>
                <span className="text-white">KORB</span>
              </span>
            </Link>
          </div>
          
          {/* Barre de recherche (Desktop uniquement) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-300"></div>
              <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 group-focus-within:border-indigo-500 transition-colors">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Rechercher un service ou professionnel..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-white placeholder-slate-500" 
                />
              </div>
            </div>
          </div>

          {/* Barre de localité (Desktop uniquement) */}
          <div className="hidden md:block relative" style={{ zIndex: 50 }}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-300"></div>
              <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-700 group-focus-within:border-emerald-500 transition-colors">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Localité..." 
                  value={citySearchQuery} 
                  onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all'); }} 
                  onFocus={() => setShowCityDropdown(true)} 
                  className="w-40 pl-10 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-white placeholder-slate-500" 
                />
              </div>
            </div>
            {showCityDropdown && (
              <>
                <div className="fixed inset-0 z-[9998]" onClick={() => setShowCityDropdown(false)} />
                <div className="absolute top-full right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-[9999] max-h-80 overflow-y-auto animate-fade-in-up">
                  <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} className={`w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 transition-colors flex items-center gap-2 ${selectedCity === 'all' ? 'bg-emerald-900/30 text-emerald-400 font-semibold' : 'text-slate-300'}`}>
                    <MapPin className="w-4 h-4" /> Toutes les localités
                  </button>
                  {filteredCities.map((city: string) => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} className={`w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 transition-colors flex items-center gap-2 ${selectedCity === city ? 'bg-emerald-900/30 text-emerald-400 font-semibold' : 'text-slate-300'}`}>
                      <MapPin className="w-4 h-4 text-slate-500" /> {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Menu Profil Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-800 transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden ring-2 ring-slate-700 shadow-lg group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
                {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" /> : profile?.full_name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileMenuOpen && (
              <>
                <div className="fixed inset-0 z-[40]" onClick={() => setProfileMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden animate-fade-in-up origin-top-right">
                  <div className="p-4 border-b border-slate-700 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                    <p className="font-bold text-white">{profile?.full_name || 'Client'}</p>
                    <p className="text-xs text-slate-400 truncate">{profile?.email || ''}</p>
                  </div>
                  <div className="p-2 border-t border-slate-700">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/30 text-red-400 transition-all duration-200">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ✅ BARRE DE RECHERCHE MOBILE (Visible uniquement sur petit écran) */}
        <div className="lg:hidden px-4 py-3 border-t border-slate-800/60 space-y-3 bg-slate-900/90">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un service..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 text-sm" 
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Localité..." 
              value={citySearchQuery} 
              onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all'); }} 
              onFocus={() => setShowCityDropdown(true)} 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 text-sm" 
            />
          </div>
          
          {/* Dropdown localité mobile */}
          {showCityDropdown && (
            <div className="absolute left-4 right-4 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-emerald-400 font-semibold border-b border-slate-800">
                Toutes les localités
              </button>
              {filteredCities.map((city: string) => (
                <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-slate-300">
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Marquee Catégories */}
        <div className="border-t border-slate-800/60 bg-slate-900/50 overflow-hidden relative">
          <div className="flex animate-marquee py-3 whitespace-nowrap">
            {[...marqueeCategories, ...marqueeCategories].map((cat: any, index: number) => {
              const Icon = cat.icon || Home
              return (
                <div key={`${cat.id}-${index}`} className="mx-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 border border-slate-700 bg-slate-800 text-slate-300 flex-shrink-0 shadow-sm hover:shadow-md hover:border-indigo-500 hover:text-indigo-400 transition-all duration-300 cursor-pointer group">
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                  {cat.name}
                </div>
              )
            })}
          </div>
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>
      </header>

      {/* ✅ SIDEBAR MOBILE (Menu glissant) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-slate-900 border-r border-slate-800 shadow-2xl overflow-y-auto animate-fade-in-up">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-bold text-white">Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="p-4 border-b border-slate-800 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
              <p className="font-bold text-white">{profile?.full_name || 'Client'}</p>
              <p className="text-xs text-slate-400 truncate">{profile?.email || ''}</p>
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-900/30 text-indigo-400 font-semibold' 
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
                  onClick={() => { handleLogout(); setMobileMenuOpen(false) }} 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/30 text-red-400 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ✅ CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-8 relative z-10">
        {children}
      </main>
    </div>
  )
}