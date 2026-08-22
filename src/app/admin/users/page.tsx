// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, Search, ShieldCheck, ShieldAlert, Loader2, Crown, Star, Zap } from 'lucide-react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100) // Limite pour la performance

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlanIcon = (plan: string) => {
    if (plan === 'Premium') return <Crown className="w-4 h-4 text-amber-500" />
    if (plan === 'Business') return <Star className="w-4 h-4 text-blue-500" />
    if (plan === 'Starter') return <Zap className="w-4 h-4 text-emerald-500" />
    return null
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(search.toLowerCase()) || 
                          user.email?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Utilisateurs</h1>
          <p className="text-slate-600">Gérez les comptes de votre plateforme</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          <option value="all">Tous les rôles</option>
          <option value="pro">Professionnels</option>
          <option value="client">Clients</option>
          <option value="admin">Administrateurs</option>
        </select>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.full_name || 'Sans nom'}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'pro' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {user.role || 'client'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.plan && user.plan !== 'Gratuit' ? (
                      <div className="flex items-center gap-2">
                        {getPlanIcon(user.plan)}
                        <span className="font-semibold text-slate-900">{user.plan}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">Gratuit</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_verified ? (
                      <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
                        <ShieldCheck className="w-4 h-4" /> Vérifié
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <ShieldAlert className="w-4 h-4" /> Non vérifié
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            Aucun utilisateur trouvé.
          </div> 
        )}
      </div>
    </div>
  )
}