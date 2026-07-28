// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"

interface Message {
  type: "bot" | "user"
  text: string
  time: string
  feedback?: "up" | "down" | null
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: "bot", 
      text: "👋 Bonjour et bienvenue sur JOBCONNECT !\n\nJe suis **JOBI**, votre assistant IA expert.\n\nJe peux vous aider à :\n• 🔍 Trouver le professionnel idéal\n• 💼 Devenir pro sur la plateforme\n• 💰 Comprendre nos tarifs\n• 💡 Obtenir des conseils personnalisés\n\nQue souhaitez-vous savoir ?",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userRole, setUserRole] = useState<'client' | 'professional'>('client')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = {
    client: [
      "🔍 Comment trouver un pro ?",
      "💰 Quels sont les tarifs ?",
      "🛡️ Est-ce sécurisé ?",
      "⭐ Comment sont vérifiés les pros ?"
    ],
    professional: [
      "📈 Comment réussir sur JOBCONNECT ?",
      "💼 Quel plan choisir ?",
      "💡 Conseils pour démarrer",
      "🎯 Comment avoir plus de clients ?"
    ]
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return

    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const userMessage: Message = { 
      type: "user", 
      text: messageText.trim(), 
      time: currentTime 
    }
    
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          userMessage: messageText.trim(),
          userRole: userRole
        })
      })

      const data = await response.json()
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: data.reply, 
        time: botTime 
      }])
    } catch (error) {
      console.error('Erreur:', error)
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: "⚠️ Je n'ai pas pu traiter votre demande. Contactez support@jobconnect.tg", 
        time: botTime 
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = () => {
    sendMessage(input)
  }

  const handleQuickReply = (reply: string) => {
    const cleanReply = reply.replace(/[🔍💰🛡️⭐📈💼💡🎯]/g, '').trim()
    sendMessage(cleanReply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    const newMessages = [...messages]
    newMessages[index] = { ...newMessages[index], feedback: type }
    setMessages(newMessages)
  }

  const handleReset = () => {
    setMessages([{
      type: "bot",
      text: "👋 Bonjour ! Je suis **JOBI**, votre assistant expert.\n\nComment puis-je vous aider aujourd'hui ?",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }])
  }

  // Formatage markdown basique
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .split('\n')
      .map((line, i) => {
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return `<div key="${i}" class="flex gap-2 my-1"><span class="text-blue-400">•</span><span>${line.replace(/^[•-]\s*/, '')}</span></div>`
        }
        return line || '<br/>'
      })
      .join('')
  }

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-full shadow-2xl flex items-center justify-center z-50 border border-white/10"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-2rem)] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-white/10"
            style={{ height: "650px" }}
          >
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 text-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0F172A]"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      JOBI
                      <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                    </h3>
                    <p className="text-xs text-white/70">
                      {isTyping ? "⌨️ Réflexion..." : "🟢 En ligne - IA Propulsée par Groq"}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleReset}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                  title="Nouvelle conversation"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {/* Sélecteur de rôle */}
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1 rounded-xl">
                <button
                  onClick={() => setUserRole('client')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    userRole === 'client' 
                      ? 'bg-white text-[#0F172A]' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  👤 Client
                </button>
                <button
                  onClick={() => setUserRole('professional')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    userRole === 'professional' 
                      ? 'bg-white text-[#0F172A]' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  💼 Professionnel
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === "user" 
                        ? "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white" 
                        : "bg-white/10 backdrop-blur text-white border border-white/20"
                    }`}>
                      {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        msg.type === "user"
                          ? "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-br-sm shadow-lg"
                          : "bg-white/10 backdrop-blur text-white rounded-bl-sm border border-white/20"
                      }`}>
                        <div 
                          className="text-sm whitespace-pre-line leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                        />
                      </div>
                      <div className={`flex items-center gap-2 mt-1 ${msg.type === "user" ? "justify-end" : ""}`}>
                        <p className="text-xs text-white/50">
                          {msg.time}
                        </p>
                        {msg.type === "bot" && i > 0 && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleFeedback(i, 'up')}
                              className={`p-0.5 rounded transition-colors ${
                                msg.feedback === 'up' ? 'bg-green-500/20 text-green-400' : 'text-white/40 hover:text-green-400'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleFeedback(i, 'down')}
                              className={`p-0.5 rounded transition-colors ${
                                msg.feedback === 'down' ? 'bg-red-500/20 text-red-400' : 'text-white/40 hover:text-red-400'
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-2xl rounded-bl-sm border border-white/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 py-3 border-t border-white/10 bg-white/5 backdrop-blur">
                <p className="text-xs text-white/70 mb-2 font-medium">💡 Suggestions :</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies[userRole].map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition border border-white/20"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isTyping}
                  placeholder={isTyping ? "Je réfléchis..." : "Posez-moi n'importe quelle question..."}
                  className="flex-1 px-4 py-2.5 bg-white text-[#0F172A] placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm border border-white/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white p-2.5 rounded-full hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/50 mt-2 text-center">
                ⏎ Entrée pour envoyer • Propulsé par Groq AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}