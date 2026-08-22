// @ts-nocheck
'use client'
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
  const bg = darkMode ? 'bg-slate-950' : 'bg-slate-50'
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600'

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <header className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* ✅ TON VRAI LOGO ICI */}
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
          
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-105 transition-all`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="space-y-2 sticky top-24">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => setActiveView(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeView === item.id ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : `${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`}`}>
                <item.icon className="w-5 h-5" /> {item.label}
              </button>
            ))}
            <Link href="/marketplace" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 font-semibold border-t border-slate-200 dark:border-slate-800 mt-4 pt-4">
              <Globe className="w-5 h-5" /> Voir la Marketplace
            </Link>
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2">
                <LogOut className="w-5 h-5" /> Déconnexion
              </button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}