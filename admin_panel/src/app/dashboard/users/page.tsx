// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, Filter, Download, MoreVertical, User, Mail, Phone, MapPin, 
  Calendar, CheckCircle, XCircle, AlertCircle, Shield, Trash2, Edit, 
  Eye, Ban, RefreshCw, ChevronLeft, ChevronRight, UserPlus, Activity
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  role: "client" | "professional"
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  last_login?: string
  city?: string
  plan?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<"all" | "client" | "professional">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "verified">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [viewModal, setViewModal] = useState<UserProfile | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      console.log("🔍 Données brutes:", data)
      console.log("⚠️ Erreur:", error)
      
      if (error) {
        console.error("❌ Erreur Supabase:", error)
        setUsers([])
      } else {
        console.log("✅ Utilisateurs récupérés:", data?.length || 0)
        setUsers(data || [])
      }
    } catch (error: any) {
      console.error("❌ Erreur complète:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Filtrage
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm)

    const matchesRole = filterRole === "all" || user.role === filterRole
    
    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "active" && user.is_active) ||
      (filterStatus === "inactive" && !user.is_active) ||
      (filterStatus === "verified" && user.is_verified)

    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = {
    total: users.length,
    clients: users.filter(u => u.role === "client").length,
    professionals: users.filter(u => u.role === "professional").length,
    verified: users.filter(u => u.is_verified).length,
    active: users.filter(u => u.is_active).length,
  }

  // Helpers
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id))
    }
  }

  const handleBanUser = async (userId: string) => {
    if (!confirm("Bannir cet utilisateur ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: false })
        .eq("id", userId)

      if (error) throw error
      fetchUsers()
    } catch (error) {
      console.error("Erreur bannissement:", error)
      alert("Erreur lors du bannissement")
    }
  }

  const handleUnbanUser = async (userId: string) => {
    if (!confirm("Débannir cet utilisateur ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: true })
        .eq("id", userId)

      if (error) throw error
      fetchUsers()
    } catch (error) {
      console.error("Erreur débannissement:", error)
      alert("Erreur lors du débannissement")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Supprimer définitivement cet utilisateur ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)

      if (error) throw error
      fetchUsers()
    } catch (error) {
      console.error("Erreur suppression:", error)
      alert("Erreur lors de la suppression")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement des utilisateurs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Utilisateurs</h1>
          <p className="text-slate-600 mt-1">Gestion des comptes clients et professionnels</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total" value={stats.total} icon={User} color="slate" />
        <StatCard label="Clients" value={stats.clients} icon={User} color="blue" />
        <StatCard label="Professionnels" value={stats.professionals} icon={Shield} color="purple" />
        <StatCard label="Vérifiés" value={stats.verified} icon={CheckCircle} color="green" />
        <StatCard label="Actifs" value={stats.active} icon={Activity} color="emerald" />
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les rôles</option>
              <option value="client">Clients</option>
              <option value="professional">Professionnels</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="verified">Vérifiés</option>
            </select>
            <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {paginatedUsers.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">Aucun utilisateur trouvé</p>
            <p className="text-slate-400 text-sm">
              {users.length === 0 ? "Les utilisateurs apparaîtront ici." : "Essayez de modifier vos filtres."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Utilisateur
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Rôle
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Statut
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Localisation
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Inscription
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.full_name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.full_name || "Non spécifié"}</div>
                          <div className="text-sm text-slate-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "professional"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role === "professional" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {user.role === "professional" ? "Professionnel" : "Client"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            Actif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            <XCircle className="w-3 h-3" />
                            Banni
                          </span>
                        )}
                        {user.is_verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            <CheckCircle className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {user.city || "Non spécifié"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(user.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewModal(user)}
                          className="p-2 hover:bg-indigo-50 rounded-lg transition"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button
                          onClick={() => user.is_active ? handleBanUser(user.id) : handleUnbanUser(user.id)}
                          className="p-2 hover:bg-orange-50 rounded-lg transition"
                          title={user.is_active ? "Bannir" : "Débannir"}
                        >
                          <Ban className={`w-4 h-4 ${user.is_active ? "text-orange-600" : "text-green-600"}`} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                          <MoreVertical className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Affichage de <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> sur{" "}
              <span className="font-medium">{filteredUsers.length}</span> utilisateurs
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DÉTAILS */}
      {viewModal && (
        <UserModal user={viewModal} onClose={() => setViewModal(null)} />
      )}
    </div>
  )
}

// COMPOSANT STAT CARD
function StatCard({ label, value, icon: Icon, color }: any) {
  const colorClasses: any = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    emerald: "bg-emerald-100 text-emerald-600",
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}

// COMPOSANT MODAL
function UserModal({ user, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.full_name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user.full_name || "Utilisateur"}</h2>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <XCircle className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* Infos principales */}
          <div className="grid grid-cols-2 gap-4">
            <InfoBlock label="Rôle" value={user.role === "professional" ? "Professionnel" : "Client"} />
            <InfoBlock label="Statut" value={user.is_active ? "Actif" : "Banni"} />
            <InfoBlock label="Vérifié" value={user.is_verified ? "Oui" : "Non"} />
            <InfoBlock label="Téléphone" value={user.phone || "Non spécifié"} />
            <InfoBlock label="Ville" value={user.city || "Non spécifié"} />
            <InfoBlock label="Inscription" value={formatDate(user.created_at)} />
            {user.plan && <InfoBlock label="Plan" value={user.plan} />}
          </div>

          {/* Activité récente */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Activité</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Dernière connexion</span>
                <span className="font-medium text-slate-900">
                  {user.last_login ? formatDate(user.last_login) : "Jamais"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Compte créé</span>
                <span className="font-medium text-slate-900">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2">
            <Edit className="w-5 h-5" />
            Modifier
          </button>
          <button onClick={onClose} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

// COMPOSANT INFO BLOCK
function InfoBlock({ label, value }: any) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}