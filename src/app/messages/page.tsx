// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import MessagingSystem from '@/components/MessagingSystem'
import { 
  MessageSquare, Search, Loader2, LogOut, Home,
  Settings, Bell, Menu, X, CheckCircle2
} from 'lucide-react'

export default function MessagesPage() {
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [selectedConv, setSelectedConv] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [autoMessages, setAutoMessages] = useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      loadConversations()
      loadAutoMessages()
    }
  }, [profile])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (data) {
        setProfile(data)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Erreur profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadConversations = async () => {
    try {
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
        .order('created_at', { ascending: false })
        .limit(200)

      if (!messagesData) return

      // Grouper par conversation
      const convMap = new Map()
      messagesData.forEach(msg => {
        const otherId = msg.sender_id === profile.id ? msg.receiver_id : msg.sender_id
        if (!convMap.has(otherId)) {
          convMap.set(otherId, {
            otherId,
            lastMessage: msg.content,
            lastDate: msg.created_at,
            unread: 0,
            isAuto: msg.is_auto || false
          })
        }
        if (msg.receiver_id === profile.id && !msg.is_read) {
          convMap.get(otherId).unread += 1
        }
      })

      // Récupérer les infos des autres utilisateurs
      const otherIds = Array.from(convMap.keys())
      const { data: othersData } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, specialty, role')
        .in('id', otherIds)

      const othersMap = new Map(othersData?.map(p => [p.id, p]) || [])

      // Fusionner
      const conversations = Array.from(convMap.entries()).map(([otherId, conv]) => ({
        ...conv,
        otherName: othersMap.get(otherId)?.full_name || 'Utilisateur',
        otherAvatar: othersMap.get(otherId)?.avatar_url,
        otherSpecialty: othersMap.get(otherId)?.specialty,
        otherRole: othersMap.get(otherId)?.role
      }))

      // Trier par date
      conversations.sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate))
      setConversations(conversations)
    } catch (error) {
      console.error('Erreur conversations:', error)
    }
  }

  const loadAutoMessages = async () => {
    try {
      const { data } = await supabase
        .from('auto_messages')
        .select('*')
        .eq('professional_id', profile.id)
        .maybeSingle()

      if (data) {
        setAutoMessages({
          welcome: { enabled: data.welcome_enabled, message: data.welcome_message },
          unavailable: { enabled: data.unavailable_enabled, message: data.unavailable_message },
          thankYou: { enabled: data.thankyou_enabled, message: data.thankyou_message }
        })
      }
    } catch (error) {
      console.error('Erreur auto messages:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const filteredConversations = conversations.filter(conv =>
    conv.otherName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  const dashboardLink = profile?.role === 'pro' ? '/dashboard/pro' : '/dashboard/client'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="font-black text-xl">
                <span className="text-indigo-600">JOB</span>
                <span className="text-slate-900">CONNECT</span>
              </h1>
              <p className="text-xs text-slate-500">Messagerie</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href={dashboardLink} className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
              <Home className="w-4 h-4" />
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Liste des conversations */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            {/* Recherche */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Aucune conversation</p>
                </div>
              ) : (
                filteredConversations.map(conv => (
                  <button
                    key={conv.otherId}
                    onClick={() => setSelectedConv(conv)}
                    className={`w-full p-4 text-left flex items-center gap-3 border-b border-slate-100 hover:bg-slate-50 transition ${
                      selectedConv?.otherId === conv.otherId ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {conv.otherAvatar ? (
                          <img src={conv.otherAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          conv.otherName.charAt(0).toUpperCase()
                        )}
                      </div>
                      {conv.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-900 truncate">{conv.otherName}</p>
                        <span className="text-xs text-slate-400">
                          {new Date(conv.lastDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                      {conv.otherSpecialty && (
                        <p className="text-xs text-indigo-600 mt-1">{conv.otherSpecialty}</p>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Zone de chat */}
          <div className="lg:col-span-2">
            {selectedConv ? (
              <MessagingSystem
                currentUserId={profile.id}
                currentUserName={profile.full_name}
                currentUserAvatar={profile.avatar_url}
                otherUserId={selectedConv.otherId}
                otherUserName={selectedConv.otherName}
                otherUserAvatar={selectedConv.otherAvatar}
                otherUserSpecialty={selectedConv.otherSpecialty}
                autoMessages={autoMessages}
                onClose={() => setSelectedConv(null)}
              />
            ) : (
              <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Sélectionnez une conversation</p>
                  <p className="text-sm text-slate-400 mt-1">pour commencer à discuter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}