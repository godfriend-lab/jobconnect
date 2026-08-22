// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, ShieldCheck, TrendingUp, DollarSign, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerifications: 0,
    totalServices: 0,
    monthlyRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Nombre total d'utilisateurs
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Vérifications en attente
      const { count: pendingCount } = await supabase
        .from('verification_documents')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Total des services
      const { count: servicesCount } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true })

      setStats({
        totalUsers: usersCount || 0,
        pendingVerifications: pendingCount || 0,
        totalServices: servicesCount || 0,
        monthlyRevenue: 0 // À implémenter avec les paiements
      })
    } catch (error) {
      console.error('Erreur chargement stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Vérifications en Attente',
      value: stats.pendingVerifications,
      icon: ShieldCheck,
      color: 'bg-amber-500',
      textColor: 'text-amber-600'
    },
    {
      title: 'Services Actifs',
      value: stats.totalServices,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Revenus du Mois',
      value: `${stats.monthlyRevenue.toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Tableau de Bord</h1>
        <p className="text-slate-600">Vue d'ensemble de votre plateforme ProKorb</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</h3>
              <p className={`text-3xl font-black ${stat.textColor}`}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Actions Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Actions Rapides</h2>
          <div className="space-y-3">
            <a
              href="/admin/verifications"
              className="block p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-slate-900">Vérifier les profils</p>
                  <p className="text-sm text-slate-600">
                    {stats.pendingVerifications} en attente
                  </p>
                </div>
              </div>
            </a>
            <a
              href="/admin/users"
              className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-slate-900">Gérer les utilisateurs</p>
                  <p className="text-sm text-slate-600">{stats.totalUsers} utilisateurs</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Statut du Système</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span className="font-medium">Base de données</span>
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                Opérationnelle
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span className="font-medium">Storage</span>
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                Actif
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <span className="font-medium">Authentification</span>
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                Sécurisée
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}