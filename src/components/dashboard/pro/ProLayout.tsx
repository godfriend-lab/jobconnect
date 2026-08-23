// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Briefcase, Settings, ImageIcon, Star, Crown, Shield, Globe, LogOut, Sun, Moon, Menu, X } from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'services', label: 'Mon Service', icon: Briefcase },
  { id: 'profile', label: 'Mon Profil', icon: Settings },
  { id: 'portfolio', label: 'Réalisations', icon: ImageIcon },
  { id: 'reviews', label: 'Avis clients', icon: Star },
  { id: 'subscription', label: 'Mon Abonnement', icon: Crown },
  { id: 'verification', label: 'Vérification', icon: Shield },
]

export default function ProLayout({ children, activeView, setActiveView, darkMode, setDarkMode, handleLogout }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const bg = darkMode ? 'bg-slate-950' : 'bg-slate-50'
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600'
  const cardBg = darkMode ? 'bg-slate-900' : 'bg-white'
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200'

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      
      {/* ✅ HEADER (visible sur TOUS les écrans) */}
      <header className={`${cardBg} ${borderColor} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo + Bouton Menu Mobile */}
          <div className="flex items-center gap-3">
            {/* Bouton hamburger (visible uniquement sur mobile) */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'} transition-colors`}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link href="/dashboard/pro" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Logo ProKorb" 
                className="h-8 w-auto object-contain"
              />
              <div>
                <span className="font-bold text-lg text-indigo-600">PROKORB</span>
                <span className={`text-xs ${textSecondary} block`}>Espace Pro</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-105 transition-all`}
              aria-label="Changer le thème"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ✅ SIDEBAR MOBILE (overlay glissant) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar glissant */}
          <div className={`absolute left-0 top-0 h-full w-72 ${cardBg} border-r ${borderColor} shadow-2xl overflow-y-auto`}>
            <div className={`p-4 ${borderColor} border-b flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-bold text-indigo-600">PROKORB</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon
                const isActive = activeView === item.id
                return (
                  <button 
                    key={item.id} 
                    onClick={() => {
                      setActiveView(item.id)
                      setMobileMenuOpen(false)
                    }} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' 
                        : `${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`
                    }`}
                  >
                    <Icon className="w-5 h-5" /> 
                    {item.label}
                  </button>
                )
              })}
              
              <Link 
                href="/marketplace" 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 font-semibold border-t border-slate-200 dark:border-slate-800 mt-4 pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Globe className="w-5 h-5" /> Voir la Marketplace
              </Link>
              
              <div className={`pt-4 mt-4 border-t ${borderColor}`}>
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2"
                >
                  <LogOut className="w-5 h-5" /> Déconnexion
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ✅ LAYOUT PRINCIPAL (Desktop + Mobile) */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar Desktop (visible uniquement sur grand écran) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="space-y-2 sticky top-24">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = activeView === item.id
              return (
                <button 
                  key={item.id} 
                  onClick={() => setActiveView(item.id)} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' 
                      : `${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`
                  }`}
                >
                  <Icon className="w-5 h-5" /> 
                  {item.label}
                </button>
              )
            })}
            
            <Link 
              href="/marketplace" 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 font-semibold border-t border-slate-200 dark:border-slate-800 mt-4 pt-4"
            >
              <Globe className="w-5 h-5" /> Voir la Marketplace
            </Link>
            
            <div className={`pt-4 mt-4 border-t ${borderColor}`}>
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2"
              >
                <LogOut className="w-5 h-5" /> Déconnexion
              </button>
            </div>
          </nav>
        </aside>
        
        {/* ✅ CONTENU PRINCIPAL (prend toute la largeur sur mobile) */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}