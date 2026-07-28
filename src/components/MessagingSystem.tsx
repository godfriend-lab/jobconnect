// @ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Send, Paperclip, Smile, Check, CheckCheck, 
  Clock, ArrowLeft, MoreVertical, Phone, Video,
  Image as ImageIcon, Bot
} from 'lucide-react'

export default function MessagingSystem({ 
  currentUserId, 
  currentUserName,
  currentUserAvatar,
  otherUserId,
  otherUserName,
  otherUserAvatar,
  otherUserSpecialty,
  autoMessages = null,
  onClose 
}) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef(null)
  const autoMessageSentRef = useRef(false)

  // Charger les messages
  useEffect(() => {
    if (currentUserId && otherUserId) {
      loadMessages()
    }
  }, [currentUserId, otherUserId])

  // Scroll automatique vers le bas
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Supabase Realtime - Écouter les nouveaux messages
  useEffect(() => {
    if (!currentUserId || !otherUserId) return

    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${otherUserId}`,
        },
        (payload) => {
          // Nouveau message reçu
          setMessages(prev => [...prev, payload.new])
          markAsRead(payload.new.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentUserId, otherUserId])

  // Envoyer message automatique de bienvenue
  useEffect(() => {
    if (autoMessages && autoMessages.welcome?.enabled && !autoMessageSentRef.current && messages.length === 0) {
      sendAutoMessage(autoMessages.welcome.message)
      autoMessageSentRef.current = true
    }
  }, [autoMessages, messages.length])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`)
        .order('created_at', { ascending: true })
        .limit(100)

      if (error) throw error

      setMessages(data || [])
      
      // Marquer les messages non lus comme lus
      const unreadMessages = data?.filter(m => m.receiver_id === currentUserId && !m.is_read) || []
      if (unreadMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessages.map(m => m.id))
      }
    } catch (error) {
      console.error('Erreur chargement messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('receiver_id', currentUserId)
    } catch (error) {
      console.error('Erreur mark as read:', error)
    }
  }

  const sendMessage = async (content = null) => {
    const messageContent = content || newMessage.trim()
    if (!messageContent || !currentUserId || !otherUserId) return

    try {
      setSending(true)
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUserId,
          receiver_id: otherUserId,
          content: messageContent,
          is_read: false
        })

      if (error) throw error

      if (!content) {
        setNewMessage('')
      }
    } catch (error) {
      console.error('Erreur envoi:', error)
      alert('Erreur lors de l\'envoi du message')
    } finally {
      setSending(false)
    }
  }

  const sendAutoMessage = async (content) => {
    if (!content || !currentUserId || !otherUserId) return

    try {
      await supabase
        .from('messages')
        .insert({
          sender_id: currentUserId,
          receiver_id: otherUserId,
          content: `[Automatique] ${content}`,
          is_read: false,
          is_auto: true
        })
    } catch (error) {
      console.error('Erreur auto message:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier'
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    }
  }

  const emojis = ['😀', '😂', '❤️', '👍', '', '😊', '🎉', '', '🔥', '']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-slate-500">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {otherUserAvatar ? (
              <img src={otherUserAvatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              otherUserName?.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-bold">{otherUserName}</h3>
            {otherUserSpecialty && (
              <p className="text-xs text-white/80">{otherUserSpecialty}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:bg-white/20 p-2 rounded-lg transition">
            <Phone className="w-5 h-5" />
          </button>
          <button className="hover:bg-white/20 p-2 rounded-lg transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-slate-500">Aucun message</p>
            <p className="text-sm text-slate-400 mt-1">Envoyez le premier message !</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isMe = msg.sender_id === currentUserId
              const showDate = index === 0 || 
                formatDate(messages[index - 1].created_at) !== formatDate(msg.created_at)

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm">
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        isMe 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md' 
                          : 'bg-white border border-slate-200 text-slate-900 rounded-bl-md shadow-sm'
                      } ${msg.is_auto ? 'opacity-75 italic' : ''}`}>
                        {msg.is_auto && (
                          <div className="flex items-center gap-1 mb-1 text-xs opacity-75">
                            <Bot className="w-3 h-3" />
                            <span>Message automatique</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-slate-400">{formatTime(msg.created_at)}</span>
                        {isMe && (
                          msg.is_read ? (
                            <CheckCheck className="w-3 h-3 text-blue-500" />
                          ) : (
                            <Check className="w-3 h-3 text-slate-400" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <Smile className="w-5 h-5 text-slate-500" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Tapez votre message..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={sending}
            />
            
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg p-2 flex gap-1">
                {emojis.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setNewMessage(prev => prev + emoji)
                      setShowEmojiPicker(false)
                    }}
                    className="text-2xl hover:scale-125 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => sendMessage()}
            disabled={!newMessage.trim() || sending}
            className="p-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Clock className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}