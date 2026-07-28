// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, Eye, X, AlertCircle, AlertTriangle, Shield, MessageSquare, 
  Clock, CheckCircle, XCircle, User, Briefcase, FileText, 
  TrendingUp, DollarSign, Calendar, Flag, Filter, Download,
  RefreshCw, ChevronLeft, ChevronRight, MoreVertical, Phone, Mail,
  ExternalLink, BarChart3, PieChart, Activity
} from "lucide-react"

export default function DisputesPage() {
  const [disputes, setDisputes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDispute, setSelectedDispute] = useState(null)
  const itemsPerPage = 10

  useEffect(() => {
    fetchDisputes()
  }, [])

  const fetchDisputes = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("disputes")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Table disputes non disponible")
        setDisputes([])
      } else {
        console.log("✅ Litiges récupérés:", data?.length || 0)
        setDisputes(data || [])
      }
    } catch (err: any) {
      console.error("❌ Erreur:", err)
      setDisputes([])
    } finally {
      setLoading(false)
    }
  }

  // Filtrage
  const filteredDisputes = disputes.filter((dispute) => {
    const searchFields = [
      dispute.id,
      dispute.subject,
      dispute.description,
      dispute.status,
      dispute.priority
    ].join(" ").toLowerCase()

    const matchesSearch = searchFields.includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || dispute.status === filterStatus
    const matchesPriority = filterPriority === "all" || dispute.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage)
  const paginatedDisputes = filteredDisputes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === "open").length,
    inReview: disputes.filter(d => d.status === "in_review").length,
    resolved: disputes.filter(d => d.status === "resolved").length,
    closed: disputes.filter(d => d.status === "closed").length,
    highPriority: disputes.filter(d => d.priority === "high" || d.priority === "urgent").length,
    resolutionRate: disputes.length > 0 
      ? Math.round((disputes.filter(d => d.status === "resolved" || d.status === "closed").length / disputes.length) * 100) 
      : 0
  }

  // Helpers
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      open: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Ouvert", icon: AlertTriangle },
      in_review: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "En examen", icon: Eye },
      resolved: { color: "bg-green-100 text-green-700 border-green-200", label: "Résolu", icon: CheckCircle },
      closed: { color: "bg-slate-100 text-slate-700 border-slate-200", label: "Fermé", icon: XCircle }
    }
    return configs[status] || configs.open
  }

  const getPriorityConfig = (priority: string) => {
    const configs = {
      low: { color: "bg-slate-100 text-slate-600", label: "Basse" },
      medium: { color: "bg-yellow-100 text-yellow-700", label: "Moyenne" },
      high: { color: "bg-orange-100 text-orange-700", label: "Haute" },
      urgent: { color: "bg-red-100 text-red-700", label: "Urgente" }
    }
    return configs[priority] || configs.medium
  }

  const handleUpdateStatus = async (disputeId: string, newStatus: string) => {
    if (!confirm(`Changer le statut du litige ?`)) return
    
    try {
      const { error } = await supabase
        .from("disputes")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === "resolved" || newStatus === "closed" ? { resolved_at: new Date().toISOString() } : {}),
        })
        .eq("id", disputeId)

      if (error) throw error
      fetchDisputes()
    } catch (error: any) {
      console.error("Erreur:", error)
      alert("Erreur lors de la mise à jour")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement des litiges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            Litiges
          </h1>
          <p className="text-slate-600 mt-1">Gestion des conflits entre clients et professionnels</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchDisputes}
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

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Litiges" 
          value={stats.total} 
          icon={AlertTriangle} 
          color="indigo"
          trend="Total"
        />
        <StatCard 
          label="Ouverts" 
          value={stats.open} 
          icon={Flag} 
          color="blue"
          trend="À traiter"
        />
        <StatCard 
          label="Résolus" 
          value={stats.resolved} 
          icon={CheckCircle} 
          color="green"
          trend={`${stats.resolutionRate}%`}
        />
        <StatCard 
          label="Priorité Haute" 
          value={stats.highPriority} 
          icon={AlertCircle} 
          color="red"
          trend="Urgents"
        />
      </div>

      {/* STATS SECONDAIRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-6 h-6 text-blue-200" />
            <Activity className="w-5 h-5 text-blue-200" />
          </div>
          <p className="text-blue-100 text-sm mb-1">En Examen</p>
          <p className="text-2xl font-bold">{stats.inReview}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-6 h-6 text-slate-200" />
            <CheckCircle className="w-5 h-5 text-slate-200" />
          </div>
          <p className="text-slate-100 text-sm mb-1">Fermés</p>
          <p className="text-2xl font-bold">{stats.closed}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-green-200" />
            <TrendingUp className="w-5 h-5 text-green-200" />
          </div>
          <p className="text-green-100 text-sm mb-1">Taux de Résolution</p>
          <p className="text-2xl font-bold">{stats.resolutionRate}%</p>
        </div>
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par sujet, description..."
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
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="open">Ouvert</option>
              <option value="in_review">En examen</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => {
                setFilterPriority(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes priorités</option>
              <option value="urgent">Urgente</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
            <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* TABLEAU */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {paginatedDisputes.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">Aucun litige trouvé</p>
            <p className="text-slate-400 text-sm">
              {disputes.length === 0 ? "Les litiges apparaîtront ici." : "Essayez de modifier vos filtres."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">ID</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Sujet</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Priorité</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Statut</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Date</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDisputes.map((dispute) => {
                  const statusConfig = getStatusConfig(dispute.status)
                  const priorityConfig = getPriorityConfig(dispute.priority)
                  const StatusIcon = statusConfig.icon

                  return (
                    <tr key={dispute.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono font-semibold text-indigo-600">
                          {dispute.id.substring(0, 8)}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{dispute.subject}</div>
                        <div className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">
                          {dispute.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                          {priorityConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          {formatDate(dispute.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedDispute(dispute)}
                            className="p-2 hover:bg-indigo-50 rounded-lg transition"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                          {dispute.status === "open" && (
                            <button
                              onClick={() => handleUpdateStatus(dispute.id, "in_review")}
                              className="p-2 hover:bg-yellow-50 rounded-lg transition"
                              title="Passer en examen"
                            >
                              <Eye className="w-4 h-4 text-yellow-600" />
                            </button>
                          )}
                          {(dispute.status === "open" || dispute.status === "in_review") && (
                            <button
                              onClick={() => handleUpdateStatus(dispute.id, "resolved")}
                              className="p-2 hover:bg-green-50 rounded-lg transition"
                              title="Résoudre"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
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
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredDisputes.length)}</span> sur{" "}
              <span className="font-medium">{filteredDisputes.length}</span> litiges
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
      {selectedDispute && (
        <DisputeModal 
          dispute={selectedDispute} 
          onClose={() => setSelectedDispute(null)} 
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}

// COMPOSANT STAT CARD
function StatCard({ label, value, icon: Icon, color, trend }: any) {
  const colorClasses: any = {
    indigo: "bg-indigo-100 text-indigo-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}

// COMPOSANT MODAL
function DisputeModal({ dispute, onClose, onUpdateStatus }: any) {
  const statusConfig: any = {
    open: { color: "bg-blue-100 text-blue-700", label: "Ouvert" },
    in_review: { color: "bg-yellow-100 text-yellow-700", label: "En examen" },
    resolved: { color: "bg-green-100 text-green-700", label: "Résolu" },
    closed: { color: "bg-slate-100 text-slate-700", label: "Fermé" }
  }

  const formatDate = (date: string) => date ? new Date(date).toLocaleString("fr-FR") : "N/A"

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Détails du Litige</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[dispute.status].color}`}>
                {statusConfig[dispute.status].label}
              </span>
            </div>
            <p className="text-slate-600 font-mono text-sm">{dispute.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* Sujet */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Sujet
            </h3>
            <p className="text-lg font-medium text-slate-900 mb-2">{dispute.subject}</p>
            <p className="text-slate-700 leading-relaxed">{dispute.description}</p>
          </div>

          {/* Priorité et Statut */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Priorité</p>
              <p className="text-sm font-semibold text-slate-900 capitalize">{dispute.priority}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Créé le</p>
              <p className="text-sm font-semibold text-slate-900">{formatDate(dispute.created_at)}</p>
            </div>
          </div>

          {/* Résolution */}
          {dispute.resolution && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Résolution
              </h4>
              <p className="text-green-800">{dispute.resolution}</p>
              {dispute.resolved_at && (
                <p className="text-green-700 text-sm mt-2">
                  Résolu le : {formatDate(dispute.resolved_at)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex flex-wrap gap-3">
          {dispute.status === "open" && (
            <button 
              onClick={() => { onUpdateStatus(dispute.id, "in_review"); onClose(); }}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Passer en examen
            </button>
          )}
          {(dispute.status === "open" || dispute.status === "in_review") && (
            <button 
              onClick={() => { onUpdateStatus(dispute.id, "resolved"); onClose(); }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Résoudre
            </button>
          )}
          <button onClick={onClose} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}