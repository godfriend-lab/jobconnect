// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/admin/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      router.push('/admin/login')
      return
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/verifications', label: 'Vérifications', icon: ShieldCheck },
    { href: '/admin/users', label: 'Utilisateurs', icon: Users },
    { href: '/admin/settings', label: 'Paramètres', icon: Settings },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 text-white fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-black">
            <span className="text-indigo-400">PRO</span>
            <span className="text-white">KORB</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Panel Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-slate-900 text-white p-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black">
                <span className="text-indigo-400">PRO</span>
                <span className="text-white">KORB</span>
              </h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Déconnexion</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Administrateur</p>
                <p className="text-xs text-slate-500">Panel de contrôle</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}