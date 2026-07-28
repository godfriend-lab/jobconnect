// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Search, Filter, Download, MoreVertical, MessageSquare, Mail, 
  Clock, CheckCircle, XCircle, AlertCircle, Eye, RefreshCw, 
  ChevronLeft, ChevronRight, Activity, Send, Paperclip, 
  User, Briefcase, Star, Flag, Archive, Trash2, X, Phone,
  MailOpen, MessageCircle, Headphones, Users
} from "lucide-react"

interface Conversation {
  id: string
  participant_id: string
  participant_name?: string
  participant_email?: string
  participant_role?: "client" | "professional"
  participant_phone?: string
  subject?: string
  last_message?: string
  last_message_at?: string
  unread_count: number
  status: "unread" | "read" | "in_progress" | "resolved" | "archived"
  priority: "low" | "medium" | "high"
  category: "support" | "complaint" | "question" | "technical" | "other"
  created_at: string
  messages?: Message[]
}

interface Message {
  id: string
  conversation_id: string
  sender_id: string
  sender_name: string
  sender_role: "client" | "professional" | "admin"
  content: string
  created_at: string
  is_read: boolean
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | Conversation["status"]>("all")
  const [filterCategory, setFilterCategory] = useState<"all" | Conversation["category"]>("all")
  const [filterPriority, setFilterPriority] = useState<"all" | Conversation["priority"]>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const itemsPerPage = 10

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
  setLoading(true)
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("last_message_at", { ascending: false })

    if (error) throw error
    setConversations(data || [])
  } catch (error: any) {
    console.warn("⚠️ Erreur:", error)
    setConversations([])
  } finally {
    setLoading(false)
  }
}

  // Filtrage
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = 
      conv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || conv.status === filterStatus
    const matchesCategory = filterCategory === "all" || conv.category === filterCategory
    const matchesPriority = filterPriority === "all" || conv.priority === filterPriority

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage)
  const paginatedConversations = filteredConversations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const stats = {
    total: conversations.length,
    unread: conversations.filter(c => c.status === "unread").length,
    inProgress: conversations.filter(c => c.status === "in_progress").length,
    resolved: conversations.filter(c => c.status === "resolved").length,
    highPriority: conversations.filter(c => c.priority === "high").length,
    todayMessages: conversations.filter(c => new Date(c.last_message_at || "").toDateString() === new Date().toDateString()).length,
    avgResponseTime: "2h 15min",
    totalUnreadMessages: conversations.reduce((sum, c) => sum + c.unread_count, 0),
  }

  // Helpers
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `Il y a ${minutes}min`
    if (hours < 24) return `Il y a ${hours}h`
    if (days < 7) return `Il y a ${days}j`
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
  }

  const getStatusConfig = (status: string) => {
    const configs: any = {
      unread: { color: "bg-blue-100 text-blue-700", label: "Non lu", icon: Mail },
      read: { color: "bg-slate-100 text-slate-700", label: "Lu", icon: MailOpen },
      in_progress: { color: "bg-yellow-100 text-yellow-700", label: "En cours", icon: Clock },
      resolved: { color: "bg-green-100 text-green-700", label: "Résolu", icon: CheckCircle },
      archived: { color: "bg-gray-100 text-gray-700", label: "Archivé", icon: Archive },
    }
    return configs[status] || configs.unread
  }

  const getPriorityConfig = (priority: string) => {
    const configs: any = {
      low: { color: "bg-slate-100 text-slate-600", label: "Basse" },
      medium: { color: "bg-yellow-100 text-yellow-700", label: "Moyenne" },
      high: { color: "bg-red-100 text-red-700", label: "Haute" },
    }
    return configs[priority] || configs.medium
  }

  const getCategoryConfig = (category: string) => {
    const configs: any = {
      support: { label: "Support", icon: Headphones },
      complaint: { label: "Réclamation", icon: AlertCircle },
      question: { label: "Question", icon: MessageCircle },
      technical: { label: "Technique", icon: Activity },
      other: { label: "Autre", icon: MessageSquare },
    }
    return configs[category] || configs.other
  }

  const handleMarkAsRead = async (convId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .update({ status: "read", unread_count: 0 })
        .eq("id", convId)

      if (error) throw error
      fetchConversations()
    } catch (error: any) {
      console.error("Erreur:", error)
    }
  }

  const handleMarkAsResolved = async (convId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .update({ status: "resolved" })
        .eq("id", convId)

      if (error) throw error
      fetchConversations()
    } catch (error: any) {
      console.error("Erreur:", error)
    }
  }

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedConversation) return
    
    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: selectedConversation.id,
          sender_id: "admin",
          sender_name: "Support JobConnect",
          sender_role: "admin",
          content: replyText,
          is_read: false,
        })

      if (error) throw error
      
      // Mettre à jour la conversation
      await supabase
        .from("conversations")
        .update({
          last_message: replyText,
          last_message_at: new Date().toISOString(),
          status: "in_progress",
        })
        .eq("id", selectedConversation.id)

      setReplyText("")
      alert("✅ Message envoyé avec succès")
      fetchConversations()
    } catch (error: any) {
      console.error("Erreur:", error)
      alert("Erreur lors de l'envoi")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Chargement des messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600 mt-1">Centre de support et conversations</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchConversations}
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
          label="Total Conversations" 
          value={stats.total} 
          icon={MessageSquare} 
          color="indigo"
          trend={`${stats.todayMessages} aujourd'hui`}
        />
        <StatCard 
          label="Non Lus" 
          value={stats.unread} 
          icon={Mail} 
          color="blue"
          trend={`${stats.totalUnreadMessages} messages`}
        />
        <StatCard 
          label="En Cours" 
          value={stats.inProgress} 
          icon={Clock} 
          color="yellow"
          trend="À traiter"
        />
        <StatCard 
          label="Résolus" 
          value={stats.resolved} 
          icon={CheckCircle} 
          color="green"
          trend={`${stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%`}
        />
      </div>

      {/* STATS SECONDAIRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-6 h-6 text-red-200" />
            <Flag className="w-5 h-5 text-red-200" />
          </div>
          <p className="text-red-100 text-sm mb-1">Priorité Haute</p>
          <p className="text-2xl font-bold">{stats.highPriority}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6 text-blue-200" />
            <Activity className="w-5 h-5 text-blue-200" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Temps de Réponse Moyen</p>
          <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-purple-200" />
            <Headphones className="w-5 h-5 text-purple-200" />
          </div>
          <p className="text-purple-100 text-sm mb-1">Support Actif</p>
          <p className="text-2xl font-bold">{stats.inProgress + stats.unread}</p>
        </div>
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par ID, nom, sujet, message..."
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
              <option value="unread">Non lu</option>
              <option value="read">Lu</option>
              <option value="in_progress">En cours</option>
              <option value="resolved">Résolu</option>
              <option value="archived">Archivé</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes catégories</option>
              <option value="support">Support</option>
              <option value="complaint">Réclamation</option>
              <option value="question">Question</option>
              <option value="technical">Technique</option>
              <option value="other">Autre</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => {
                setFilterPriority(e.target.value as any)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Toutes priorités</option>
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

      {/* LISTE DES CONVERSATIONS */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {paginatedConversations.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">Aucune conversation trouvée</p>
            <p className="text-slate-400 text-sm">
              {conversations.length === 0 ? "Les conversations apparaîtront ici." : "Essayez de modifier vos filtres."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedConversations.map((conv) => {
              const statusConfig = getStatusConfig(conv.status)
              const priorityConfig = getPriorityConfig(conv.priority)
              const categoryConfig = getCategoryConfig(conv.category)
              const StatusIcon = statusConfig.icon
              const CategoryIcon = categoryConfig.icon

              return (
                <div 
                  key={conv.id} 
                  className={`p-4 hover:bg-slate-50 transition cursor-pointer ${
                    conv.unread_count > 0 ? "bg-blue-50/30" : ""
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        conv.participant_role === "professional" 
                          ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                          : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      }`}>
                        {conv.participant_role === "professional" ? (
                          <Briefcase className="w-5 h-5 text-white" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      {conv.unread_count > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                          {conv.unread_count}
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900">{conv.participant_name}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            conv.participant_role === "professional" 
                              ? "bg-purple-100 text-purple-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {conv.participant_role === "professional" ? "Pro" : "Client"}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.color}`}>
                            {priorityConfig.label}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex-shrink-0">
                          {formatDate(conv.last_message_at || conv.created_at)}
                        </div>
                      </div>

                      {conv.subject && (
                        <p className={`text-sm mb-1 ${conv.unread_count > 0 ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                          {conv.subject}
                        </p>
                      )}

                      <p className="text-sm text-slate-600 truncate">
                        {conv.last_message}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <CategoryIcon className="w-3 h-3" />
                          {categoryConfig.label}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{conv.id}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {conv.status === "unread" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsRead(conv.id)
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition"
                          title="Marquer comme lu"
                        >
                          <MailOpen className="w-4 h-4 text-blue-600" />
                        </button>
                      )}
                      {conv.status !== "resolved" && conv.status !== "archived" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsResolved(conv.id)
                          }}
                          className="p-2 hover:bg-green-100 rounded-lg transition"
                          title="Marquer comme résolu"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                        <MoreVertical className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Affichage de <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredConversations.length)}</span> sur{" "}
              <span className="font-medium">{filteredConversations.length}</span> conversations
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

      {/* MODAL CONVERSATION */}
      {selectedConversation && (
        <ConversationModal 
          conversation={selectedConversation} 
          onClose={() => {
            setSelectedConversation(null)
            setReplyText("")
          }}
          replyText={replyText}
          setReplyText={setReplyText}
          onSendReply={handleSendReply}
          onMarkAsRead={handleMarkAsRead}
          onMarkAsResolved={handleMarkAsResolved}
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
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
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

// COMPOSANT MODAL CONVERSATION
function ConversationModal({ conversation, onClose, replyText, setReplyText, onSendReply, onMarkAsRead, onMarkAsResolved }: any) {
  const formatDate = (date: string) => new Date(date).toLocaleString("fr-FR")

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* HEADER */}
        <div className="bg-white border-b border-slate-200 p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              conversation.participant_role === "professional" 
                ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                : "bg-gradient-to-br from-blue-500 to-cyan-500"
            }`}>
              {conversation.participant_role === "professional" ? (
                <Briefcase className="w-6 h-6 text-white" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{conversation.participant_name}</h2>
              <p className="text-sm text-slate-600">{conversation.participant_email}</p>
              {conversation.participant_phone && (
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3" />
                  {conversation.participant_phone}
                </p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* INFO BAR */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-4 flex-wrap">
          {conversation.subject && (
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">{conversation.subject}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">ID:</span>
            <span className="text-xs font-mono text-slate-700">{conversation.id}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button 
              onClick={() => onMarkAsRead(conversation.id)}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition"
            >
              Marquer lu
            </button>
            <button 
              onClick={() => onMarkAsResolved(conversation.id)}
              className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition"
            >
              Résoudre
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {conversation.messages?.map((msg: any) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender_role === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${
                msg.sender_role === "admin" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white border border-slate-200 text-slate-900"
              } rounded-2xl px-4 py-3 shadow-sm`}>
                <div className={`flex items-center gap-2 mb-1 ${
                  msg.sender_role === "admin" ? "text-indigo-200" : "text-slate-500"
                }`}>
                  <span className="text-xs font-semibold">{msg.sender_name}</span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">{formatDate(msg.created_at)}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* REPLY BOX */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex gap-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tapez votre réponse..."
              rows={3}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <button
              onClick={onSendReply}
              disabled={!replyText.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}