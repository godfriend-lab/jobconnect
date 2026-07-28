"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "../../lib/supabase"
import { Logo } from "@/components/Logo"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  ShoppingBag,
  MessageSquare,
  Star,
  AlertTriangle,
  Settings,
  LogOut,
  Menu,
  X,
  Bot
} from "lucide-react"
import { useState } from "react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users },
  { name: "Professionnels", href: "/dashboard/professionals", icon: Briefcase },
  { name: "Paiements", href: "/dashboard/payments", icon: CreditCard },
  { name: "Commandes", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Avis", href: "/dashboard/reviews", icon: Star },
  { name: "Litiges", href: "/dashboard/disputes", icon: AlertTriangle },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  { name: "JOBCONNECT AI", href: "/dashboard/ai-assistant", icon: Bot },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo avec icône SVG */}
          <Link href="/dashboard" className="flex items-center gap-3 h-16 px-6 border-b hover:bg-gray-50 transition">
            <Logo className="w-10 h-10 flex-shrink-0" />
            <div>
              <h1 className="text-lg font-bold text-[#4F46E5] leading-tight">
                JOB<span className="text-slate-900">CONNECT</span>
              </h1>
              <p className="text-xs text-gray-500">Panel Admin</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                setSidebarOpen(false)
              }}
              className="lg:hidden text-gray-500 ml-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </Link>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#4F46E5] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 lg:hidden">
            <Logo className="w-8 h-8" />
            <h2 className="font-bold text-[#4F46E5]">JOBCONNECT</h2>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-800 hidden lg:block">
            {menuItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + '/'))?.name || "Dashboard"}
          </h2>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}