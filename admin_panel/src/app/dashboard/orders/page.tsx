// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, Filter, Download, MoreVertical, ShoppingCart, Mail, Phone, MapPin, 
  Calendar, CheckCircle, XCircle, Clock, AlertCircle, Trash2, Edit, Eye, 
  RefreshCw, ChevronLeft, ChevronRight, Activity, TrendingUp, DollarSign, 
  Package, Truck, X, User, Briefcase, FileText, Star
} from "lucide-react"

interface Order {
  id: string
  client_id: string
  professional_id: string
  client_name?: string
  client_email?: string
  client_phone?: string
  professional_name?: string
  professional_email?: string
  professional_phone?: string
  service_title: string
  service_description?: string
  amount: number
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled" | "disputed"
  location?: string
  scheduled_date?: string
  created_at: string
  updated_at?: string
  completed_at?: string
  cancelled_at?: string
  cancellation_reason?: string
  payment_status?: "pending" | "paid" | "refunded"
  rating?: number
  review?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | Order["status"]>("all")
  const [filterPayment, setFilterPayment] = useState<"all" | "pending" | "paid" | "refunded">("all")
  const [filterDate, setFilterDate] = useState<"all" | "today" | "week" | "month">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [viewModal, setViewModal] = useState<Order | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Table orders non disponible")
        setOrders([])
      } else {
        console.log("✅ Commandes récupérées:", data?.length || 0)
        setOrders(data || [])
      }
    } catch (error: any) {
      console.warn("⚠️ Erreur:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  // Filtrage
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.professional_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service_title?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesPayment = filterPayment === "all" || order.payment_status === filterPayment

    const matchesDate = filterDate === "all" || (() => {
      const orderDate = new Date(order.created_at)
      const now = new Date()
      if (filterDate === "today") {
        return orderDate.toDateString() === now.toDateString()
      }
      if (filterDate === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return orderDate >= weekAgo
      }
      if (filterDate === "month") {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()
      }
      return true
    })()

    return matchesSearch && matchesStatus && matchesPayment && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    inProgress: orders.filter(o => o.status === "in_progress").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
    disputed: orders.filter(o => o.status === "disputed").length,
    totalRevenue: orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.amount, 0),
    pendingRevenue: orders.filter(o => o.status !== "cancelled" && o.status !== "completed").reduce((sum, o) => sum + o.amount, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length : 0,
    todayOrders: orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length,
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  }

  const getStatusConfig = (status: string) => {
    const configs: any = {
      pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "En attente", icon: Clock },
      accepted: { color: "bg-blue-100 text-blue-700 border-blue-200", label: "Acceptée", icon: CheckCircle },
      in_progress: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "En cours", icon: Truck },
      completed: { color: "bg-green-100 text-green-700 border-green-200", label: "Terminée", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-700 border-red-200", label: "Annulée", icon: XCircle },
      disputed: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Litige", icon: AlertCircle },
    }
    return configs[status] || configs.pending
  }

  const getPaymentConfig = (status: string) => {
    const configs: any = {
      pending: { color: "bg-yellow-100 text-yellow-700", label: "En attente" },
      paid: { color: "bg-green-100 text-green-700", label: "Payé" },
      refunded: { color: "bg-red-100 text-red-700", label: "Remboursé" },
    }
    return configs[status] || configs.pending
  }

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(paginatedOrders.map(o => o.id))
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"]) => {
    if (!confirm(`Changer le statut de la commande ${orderId} ?`)) return
    
    try {
      const { error } = await supabase
        .from("orders")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === "completed" ? { completed_at: new Date().toISOString() } : {}),
          ...(newStatus === "cancelled" ? { cancelled_at: new Date().toISOString() } : {}),
        })
        .eq("id", orderId)

      if (error) throw error
      fetchOrders()
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
          <p className="text-slate-600 font-medium">Chargement des commandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commandes</h1>
          <p className="text-slate-600 mt-1">Gestion des commandes et services</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchOrders}
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

      {/* STATS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Commandes" 
          value={stats.total} 
          icon={ShoppingCart} 
          color="indigo"
          trend={`${stats.todayOrders} aujourd'hui`}
        />
        <StatCard 
          label="En Cours" 
          value={stats.inProgress + stats.pending} 
          icon={Clock} 
          color="blue"
          trend="À traiter"
        />
        <StatCard 
          label="Terminées" 
          value={stats.completed} 
          icon={CheckCircle} 
          color="green"
          trend={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`}
        />
        <StatCard 
          label="CA Total" 
          value={formatAmount(stats.totalRevenue)} 
          icon={DollarSign} 
          color="emerald"
          trend="+23%"
        />
      </div>

      {/* STATS SECONDAIRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-6 h-6 text-blue-200" />
            <TrendingUp className="w-5 h-5 text-green-300" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Revenus en Attente</p>
          <p className="text-2xl font-bold">{formatAmount(stats.pendingRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-purple-200" />
            <Activity className="w-5 h-5 text-purple-200" />
          </div>
          <p className="text-purple-100 text-sm mb-1">Panier Moyen</p>
          <p className="text-2xl font-bold">{formatAmount(stats.avgOrderValue)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-6 h-6 text-red-200" />
            <XCircle className="w-5 h-5 text-red-200" />
          </div>
          <p className="text-red-100 text-sm mb-1">Annulées / Litiges</p>
          <p className="text-2xl font-bold">{stats.cancelled + stats.disputed}</p>
        </div>
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par ID, client, professionnel, service..."
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
                setFilterStatus(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="accepted">Acceptée</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminée</option>
              <option value="cancelled">Annulée</option>
              <option value="disputed">Litige</option>
            </select>
            <select
              value={filterPayment}
              onChange={(e) => {
                setFilterPayment(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous paiements</option>
              <option value="pending">En attente</option>
              <option value="paid">Payé</option>
              <option value="refunded">Remboursé</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
            <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ACTIONS MASSIVES */}
      {selectedOrders.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-indigo-900">{selectedOrders.length} commande(s) sélectionnée(s)</p>
              <p className="text-sm text-indigo-700">Actions disponibles en masse</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (confirm(`Marquer ${selectedOrders.length} commande(s) comme terminée(s) ?`)) {
                  Promise.all(selectedOrders.map(id => handleUpdateStatus(id, "completed")))
                  setSelectedOrders([])
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Terminer
            </button>
            <button 
              onClick={() => setSelectedOrders([])}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* TABLEAU */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {paginatedOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">Aucune commande trouvée</p>
            <p className="text-slate-400 text-sm">
              {orders.length === 0 ? "Les commandes apparaîtront ici." : "Essayez de modifier vos filtres."}
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
                      checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">ID / Date</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Client → Pro</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Service</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Montant</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Statut</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Paiement</th>
                  <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status)
                  const paymentConfig = getPaymentConfig(order.payment_status || "pending")
                  const StatusIcon = statusConfig.icon

                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono font-semibold text-indigo-600">{order.id}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(order.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-blue-600" />
                            <span className="text-sm font-medium text-slate-900">{order.client_name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-purple-600" />
                            <span className="text-sm text-slate-600">{order.professional_name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{order.service_title}</div>
                        {order.location && (
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {order.location}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-900">{formatAmount(order.amount)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${paymentConfig.color}`}>
                          {paymentConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setViewModal(order)}
                            className="p-2 hover:bg-indigo-50 rounded-lg transition"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                          {order.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, "accepted")}
                              className="p-2 hover:bg-green-50 rounded-lg transition"
                              title="Accepter"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          {order.status === "accepted" && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, "in_progress")}
                              className="p-2 hover:bg-blue-50 rounded-lg transition"
                              title="Démarrer"
                            >
                              <Truck className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                          {order.status === "in_progress" && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, "completed")}
                              className="p-2 hover:bg-green-50 rounded-lg transition"
                              title="Terminer"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
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
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> sur{" "}
              <span className="font-medium">{filteredOrders.length}</span> commandes
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
        <OrderModal order={viewModal} onClose={() => setViewModal(null)} onUpdateStatus={handleUpdateStatus} />
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
    emerald: "bg-emerald-100 text-emerald-600",
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
function OrderModal({ order, onClose, onUpdateStatus }: any) {
  const statusConfig: any = {
    pending: { color: "bg-yellow-100 text-yellow-700", label: "En attente" },
    accepted: { color: "bg-blue-100 text-blue-700", label: "Acceptée" },
    in_progress: { color: "bg-indigo-100 text-indigo-700", label: "En cours" },
    completed: { color: "bg-green-100 text-green-700", label: "Terminée" },
    cancelled: { color: "bg-red-100 text-red-700", label: "Annulée" },
    disputed: { color: "bg-orange-100 text-orange-700", label: "Litige" },
  }

  const formatAmount = (amount: number) => new Intl.NumberFormat("fr-FR").format(amount) + " FCFA"
  const formatDate = (date: string) => date ? new Date(date).toLocaleString("fr-FR") : "N/A"

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Détails de la Commande</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}>
                {statusConfig[order.status].label}
              </span>
            </div>
            <p className="text-slate-600 font-mono">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* Montant */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Montant Total</p>
                <p className="text-3xl font-bold text-indigo-600">{formatAmount(order.amount)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-indigo-600 opacity-20" />
            </div>
          </div>

          {/* Service */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Service Commandé
            </h3>
            <p className="text-lg font-medium text-slate-900 mb-2">{order.service_title}</p>
            {order.service_description && (
              <p className="text-slate-700 leading-relaxed">{order.service_description}</p>
            )}
            {order.location && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" />
                {order.location}
              </div>
            )}
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-slate-900">Client</h4>
              </div>
              <div className="space-y-3">
                <InfoRow label="Nom" value={order.client_name} />
                <InfoRow label="Email" value={order.client_email} icon={Mail} />
                <InfoRow label="Téléphone" value={order.client_phone} icon={Phone} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-slate-900">Professionnel</h4>
              </div>
              <div className="space-y-3">
                <InfoRow label="Nom" value={order.professional_name} />
                <InfoRow label="Email" value={order.professional_email} icon={Mail} />
                <InfoRow label="Téléphone" value={order.professional_phone} icon={Phone} />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              Dates Clés
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <DateBox label="Créée le" date={order.created_at} />
              <DateBox label="Planifiée" date={order.scheduled_date} />
              {order.completed_at && <DateBox label="Terminée" date={order.completed_at} />}
              {order.cancelled_at && <DateBox label="Annulée" date={order.cancelled_at} />}
            </div>
          </div>

          {/* Avis */}
          {order.rating && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                Avis Client ({order.rating}/5)
              </h4>
              <p className="text-yellow-800">{order.review || "Pas de commentaire"}</p>
            </div>
          )}

          {/* Raison annulation */}
          {order.cancellation_reason && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Raison de l'annulation
              </h4>
              <p className="text-red-800">{order.cancellation_reason}</p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex flex-wrap gap-3">
          {order.status === "pending" && (
            <button 
              onClick={() => { onUpdateStatus(order.id, "accepted"); onClose(); }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Accepter
            </button>
          )}
          {order.status === "accepted" && (
            <button 
              onClick={() => { onUpdateStatus(order.id, "in_progress"); onClose(); }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5" />
              Démarrer
            </button>
          )}
          {order.status === "in_progress" && (
            <button 
              onClick={() => { onUpdateStatus(order.id, "completed"); onClose(); }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Terminer
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

function InfoRow({ label, value, icon: Icon }: any) {
  if (!value) return null
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="w-4 h-4 text-slate-400 mt-0.5" />}
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-900 break-all">{value}</p>
      </div>
    </div>
  )
}

function DateBox({ label, date }: any) {
  if (!date) return null
  return (
    <div className="bg-white rounded-lg p-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-slate-900">
        {new Date(date).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })}
      </p>
    </div>
  )
}