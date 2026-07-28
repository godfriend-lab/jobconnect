// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Shield,
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Trash2,
  Edit,
  Eye,
  Ban,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Activity,
  Award,
  Clock,
  TrendingUp,
  Briefcase,
  Crown,
  BadgeCheck
} from "lucide-react"

interface ProfessionalProfile {
  id: string
  email: string
  full_name: string
  phone?: string
  role: "professional"
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  last_login?: string
  city?: string
  specialty?: string
  bio?: string
  plan?: "Gratuit" | "Starter" | "Business" | "Premium"
  rating?: number
  total_jobs?: number
  revenue?: number
  response_rate?: number
  documents?: {
    id_card?: boolean
    diploma?: boolean
    insurance?: boolean
  }
}

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlan, setFilterPlan] = useState<"all" | "Gratuit" | "Starter" | "Business" | "Premium">("all")
  const [filterVerification, setFilterVerification] = useState<"all" | "verified" | "pending" | "rejected">("all")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPros, setSelectedPros] = useState<string[]>([])
  const [viewModal, setViewModal] = useState<ProfessionalProfile | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const fetchProfessionals = async () => {
  setLoading(true)
  try {
    // Récupérer TOUS les profils d'abord
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur Supabase:", error.message)
      throw new Error(error.message)
    }

    // Filtrer côté client pour les professionnels
    const professionalsOnly = (data || []).filter(
      (profile: any) => profile.role === "professional"
    )

    console.log("✅ Professionnels récupérés:", professionalsOnly.length)
    setProfessionals(professionalsOnly)
  } catch (error: any) {
    console.error("❌ Erreur détaillée:", error)
    alert(`Erreur: ${error.message || "Impossible de récupérer les professionnels"}`)
  } finally {
    setLoading(false)
  }
}

  // Filtrage
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch = 
      pro.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.phone?.includes(searchTerm)

    const matchesPlan = filterPlan === "all" || pro.plan === filterPlan
    
    const matchesVerification = 
      filterVerification === "all" ||
      (filterVerification === "verified" && pro.is_verified) ||
      (filterVerification === "pending" && !pro.is_verified)

    const matchesSpecialty = filterSpecialty === "all" || pro.specialty === filterSpecialty

    return matchesSearch && matchesPlan && matchesVerification && matchesSpecialty
  })

  // Pagination
  const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage)
  const paginatedProfessionals = filteredProfessionals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = {
    total: professionals.length,
    verified: professionals.filter(p => p.is_verified).length,
    premium: professionals.filter(p => p.plan === "Premium" || p.plan === "Business").length,
    pending: professionals.filter(p => !p.is_verified).length,
    active: professionals.filter(p => p.is_active).length,
    avgRating: professionals.length > 0 
      ? (professionals.reduce((sum, p) => sum + (p.rating || 0), 0) / professionals.length).toFixed(1)
      : "0.0",
    totalRevenue: professionals.reduce((sum, p) => sum + (p.revenue || 0), 0),
  }

  const specialties = [...new Set(professionals.map(p => p.specialty).filter(Boolean))]

  // Helpers
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  const toggleProSelection = (proId: string) => {
    setSelectedPros(prev =>
      prev.includes(proId)
        ? prev.filter(id => id !== proId)
        : [...prev, proId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedPros.length === paginatedProfessionals.length) {
      setSelectedPros([])
    } else {
      setSelectedPros(paginatedProfessionals.map(p => p.id))
    }
  }

  const handleVerifyPro = async (proId: string) => {
    if (!confirm("Vérifier ce professionnel ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_verified: true })
        .eq("id", proId)

      if (error) throw error
      fetchProfessionals()
    } catch (error) {
      console.error("Erreur vérification:", error)
      alert("Erreur lors de la vérification")
    }
  }

  const handleBanPro = async (proId: string) => {
    if (!confirm("Suspendre ce professionnel ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: false })
        .eq("id", proId)

      if (error) throw error
      fetchProfessionals()
    } catch (error) {
      console.error("Erreur suspension:", error)
      alert("Erreur lors de la suspension")
    }
  }

  const handleDeletePro = async (proId: string) => {
    if (!confirm("Supprimer définitivement ce professionnel ?")) return
    
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", proId)

      if (error) throw error
      fetchProfessionals()
    } catch (error) {
      console.error("Erreur suppression:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const getPlanConfig = (plan: string) => {
    const configs = {
      Gratuit: { color: "bg-slate-100 text-slate-700", icon: Briefcase },
      Starter: { color: "bg-blue-100 text-blue-700", icon: Star },
      Business: { color: "bg-purple-100 text-purple-700", icon: Award },
      Premium: { color: "bg-amber-100 text-amber-700", icon: Crown },
    }
    return configs[plan] || configs.Gratuit
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement des professionnels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Professionnels</h1>
          <p className="text-slate-600 mt-1">Gestion et vérification des prestataires</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchProfessionals}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Professionnels" 
          value={stats.total} 
          icon={Shield} 
          color="purple"
          trend="+12%"
        />
        <StatCard 
          label="Vérifiés" 
          value={stats.verified} 
          icon={BadgeCheck} 
          color="green"
          trend={`${stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}%`}
        />
        <StatCard 
          label="Premium & Business" 
          value={stats.premium} 
          icon={Crown} 
          color="amber"
          trend="Payants"
        />
        <StatCard 
          label="Note Moyenne" 
          value={`${stats.avgRating}/5`} 
          icon={Star} 
          color="yellow"
          trend="⭐"
        />
      </div>

      {/* STATS SECONDAIRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-indigo-200" />
            <TrendingUp className="w-5 h-5 text-green-300" />
          </div>
          <p className="text-indigo-100 text-sm mb-1">Revenus Générés</p>
          <p className="text-2xl font-bold">{formatAmount(stats.totalRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-orange-200" />
            <AlertCircle className="w-5 h-5 text-orange-200" />
          </div>
          <p className="text-orange-100 text-sm mb-1">En Attente de Vérification</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-emerald-200" />
            <Award className="w-5 h-5 text-emerald-200" />
          </div>
          <p className="text-emerald-100 text-sm mb-1">Actifs</p>
          <p className="text-2xl font-bold">{stats.active}</p>
        </div>
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, spécialité..."
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
              value={filterPlan}
              onChange={(e) => {
                setFilterPlan(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les plans</option>
              <option value="Gratuit">Gratuit</option>
              <option value="Starter">Starter</option>
              <option value="Business">Business</option>
              <option value="Premium">Premium</option>
            </select>
            <select
              value={filterVerification}
              onChange={(e) => {
                setFilterVerification(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous statuts</option>
              <option value="verified">Vérifiés</option>
              <option value="pending">En attente</option>
            </select>
            <select
              value={filterSpecialty}
              onChange={(e) => {
                setFilterSpecialty(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes spécialités</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ACTIONS MASSIVES */}
      {selectedPros.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-indigo-900">{selectedPros.length} professionnel(s) sélectionné(s)</p>
              <p className="text-sm text-indigo-700">Actions disponibles en masse</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (confirm(`Vérifier ${selectedPros.length} professionnel(s) ?`)) {
                  Promise.all(selectedPros.map(id => handleVerifyPro(id)))
                  setSelectedPros([])
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <BadgeCheck className="w-4 h-4" />
              Vérifier
            </button>
            <button 
              onClick={() => {
                if (confirm(`Suspendre ${selectedPros.length} professionnel(s) ?`)) {
                  Promise.all(selectedPros.map(id => handleBanPro(id)))
                  setSelectedPros([])
                }
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
            >
              <Ban className="w-4 h-4" />
              Suspendre
            </button>
            <button 
              onClick={() => setSelectedPros([])}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* TABLEAU */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {paginatedProfessionals.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">Aucun professionnel trouvé</p>
            <p className="text-slate-400 text-sm">
              {professionals.length === 0 ? "Les professionnels apparaîtront ici." : "Essayez de modifier vos filtres."}
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
                      checked={selectedPros.length === paginatedProfessionals.length && paginatedProfessionals.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Professionnel
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Spécialité
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Plan
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Performance
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">
                    Statut
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
                {paginatedProfessionals.map((pro) => {
                  const planConfig = getPlanConfig(pro.plan || "Gratuit")
                  const PlanIcon = planConfig.icon

                  return (
                    <tr key={pro.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPros.includes(pro.id)}
                          onChange={() => toggleProSelection(pro.id)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {pro.full_name?.charAt(0).toUpperCase() || "P"}
                            </div>
                            {pro.is_verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                <BadgeCheck className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                              {pro.full_name || "Non spécifié"}
                            </div>
                            <div className="text-sm text-slate-600 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {pro.email}
                            </div>
                            {pro.phone && (
                              <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {pro.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{pro.specialty || "Non spécifié"}</div>
                        {pro.city && (
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {pro.city}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${planConfig.color}`}>
                          <PlanIcon className="w-3 h-3" />
                          {pro.plan || "Gratuit"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold text-slate-900">{pro.rating?.toFixed(1) || "0.0"}</span>
                            <span className="text-xs text-slate-500">({pro.total_jobs || 0} jobs)</span>
                          </div>
                          {pro.response_rate && (
                            <div className="text-xs text-slate-600">
                              Taux réponse: <span className="font-medium">{pro.response_rate}%</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {pro.is_active ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 w-fit">
                              <CheckCircle className="w-3 h-3" />
                              Actif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 w-fit">
                              <XCircle className="w-3 h-3" />
                              Suspendu
                            </span>
                          )}
                          {pro.is_verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 w-fit">
                              <BadgeCheck className="w-3 h-3" />
                              Vérifié
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(pro.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setViewModal(pro)}
                            className="p-2 hover:bg-indigo-50 rounded-lg transition"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                          {!pro.is_verified && (
                            <button
                              onClick={() => handleVerifyPro(pro.id)}
                              className="p-2 hover:bg-green-50 rounded-lg transition"
                              title="Vérifier"
                            >
                              <BadgeCheck className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => handleBanPro(pro.id)}
                            className="p-2 hover:bg-orange-50 rounded-lg transition"
                            title={pro.is_active ? "Suspendre" : "Réactiver"}
                          >
                            <Ban className={`w-4 h-4 ${pro.is_active ? "text-orange-600" : "text-green-600"}`} />
                          </button>
                          <button
                            onClick={() => handleDeletePro(pro.id)}
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
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Affichage de <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProfessionals.length)}</span> sur{" "}
              <span className="font-medium">{filteredProfessionals.length}</span> professionnels
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
        <ProfessionalModal pro={viewModal} onClose={() => setViewModal(null)} />
      )}
    </div>
  )
}

// COMPOSANT STAT CARD
function StatCard({ label, value, icon: Icon, color, trend }: any) {
  const colorClasses: any = {
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}

// COMPOSANT MODAL
function ProfessionalModal({ pro, onClose }: { pro: ProfessionalProfile; onClose: () => void }) {
  const formatAmount = (amount: number) => new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  const formatDate = (date: string) => new Date(date).toLocaleDateString("fr-FR")

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {pro.full_name?.charAt(0).toUpperCase() || "P"}
              </div>
              {pro.is_verified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-3 border-white">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{pro.full_name || "Professionnel"}</h2>
              <p className="text-slate-600">{pro.specialty || "Non spécifié"}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-slate-900">{pro.rating?.toFixed(1) || "0.0"}</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-600">{pro.total_jobs || 0} interventions</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <XCircle className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickStat label="Revenus" value={formatAmount(pro.revenue || 0)} icon="💰" />
            <QuickStat label="Taux réponse" value={`${pro.response_rate || 0}%`} icon="⚡" />
            <QuickStat label="Ville" value={pro.city || "N/A"} icon="📍" />
            <QuickStat label="Plan" value={pro.plan || "Gratuit"} icon="" />
          </div>

          {/* Bio */}
          {pro.bio && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">À propos</h3>
              <p className="text-slate-700 text-sm leading-relaxed">{pro.bio}</p>
            </div>
          )}

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBlock label="Email" value={pro.email} icon={Mail} />
            <InfoBlock label="Téléphone" value={pro.phone || "Non spécifié"} icon={Phone} />
            <InfoBlock label="Inscription" value={formatDate(pro.created_at)} icon={Calendar} />
            <InfoBlock label="Dernière connexion" value={pro.last_login ? formatDate(pro.last_login) : "Jamais"} icon={Clock} />
          </div>

          {/* Documents */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Documents</h3>
            <div className="grid grid-cols-3 gap-3">
              <DocBadge label="Carte d'identité" verified={pro.documents?.id_card} />
              <DocBadge label="Diplôme" verified={pro.documents?.diploma} />
              <DocBadge label="Assurance" verified={pro.documents?.insurance} />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
          {!pro.is_verified && (
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              <BadgeCheck className="w-5 h-5" />
              Vérifier
            </button>
          )}
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

function QuickStat({ label, value, icon }: any) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <div className="text-lg mb-1">{icon}</div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
    </div>
  )
}

function InfoBlock({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 flex items-start gap-3">
      <Icon className="w-5 h-5 text-slate-400 mt-0.5" />
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-900 break-all">{value}</p>
      </div>
    </div>
  )
}

function DocBadge({ label, verified }: any) {
  return (
    <div className={`rounded-lg p-3 text-center ${verified ? "bg-green-50 border border-green-200" : "bg-slate-100 border border-slate-200"}`}>
      <div className="text-2xl mb-1">{verified ? "✅" : "⏳"}</div>
      <p className="text-xs font-medium text-slate-700">{label}</p>
      <p className={`text-xs mt-0.5 ${verified ? "text-green-600" : "text-slate-500"}`}>
        {verified ? "Vérifié" : "En attente"}
      </p>
    </div>
  )
}