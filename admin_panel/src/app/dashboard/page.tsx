"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Users, Briefcase, TrendingUp, DollarSign, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    users: 0,
    professionals: 0,
    orders: 0,
    revenue: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)

      // 1. Compter les utilisateurs (role = 'client')
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client")

      // 2. Compter les professionnels (role = 'pro')
      const { count: prosCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "pro")

      // 3. Compter les commandes (table orders)
      const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })

      // 4. Calculer les revenus totaux
      // ✅ UTILISER "reussi" (pas "completed")
      const { data: transactions } = await supabase
        .from("transactions")
        .select("amount")
        .eq("status", "reussi")

      const totalRevenue = transactions?.reduce((sum, t) => sum + (Number(t.amount) || 0), 0) || 0

      setStats({
        users: usersCount || 0,
        professionals: prosCount || 0,
        orders: ordersCount || 0,
        revenue: totalRevenue
      })
    } catch (error) {
      console.error("❌ Erreur chargement stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { 
      title: "Utilisateurs", 
      value: stats.users, 
      icon: Users, 
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      title: "Professionnels", 
      value: stats.professionals, 
      icon: Briefcase, 
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    { 
      title: "Commandes", 
      value: stats.orders, 
      icon: TrendingUp, 
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      title: "Revenus", 
      value: `${stats.revenue.toLocaleString()} FCFA`, 
      icon: DollarSign, 
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Activité Récente</h2>
        <p className="text-gray-600">Les dernières activités apparaîtront ici.</p>
      </div>
    </div>
  )
}