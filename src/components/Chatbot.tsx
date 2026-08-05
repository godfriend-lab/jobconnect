// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles, ThumbsUp, ThumbsDown, RefreshCw, Loader2 } from "lucide-react"

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
      text: "👋 Bonjour et bienvenue sur **JOBCONNECT** !\n\nJe suis **JOBI**, votre assistant IA expert.\n\nJe peux vous aider à :\n• 🔍 Trouver le professionnel idéal\n• 💼 Devenir pro sur la plateforme\n• 💰 Comprendre nos tarifs\n• 💡 Obtenir des conseils personnalisés\n\nQue souhaitez-vous savoir ?",
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
  }, [messages, isTyping])

  // Formateur de texte sécurisé et élégant pour React
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
      
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return `<div key="${i}" class="flex items-start gap-2 my-1.5"><span class="text-[#818CF8] mt-1 text-lg leading-none">•</span><span class="text-white/90 leading-relaxed">${formatted.replace(/^[•-]\s*/, '')}</span></div>`
      }
      return `<p key="${i}" class="mb-1.5 text-white/90 leading-relaxed last:mb-0">${formatted || '&nbsp;'}</p>`
    }).join('')
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isTyping) return

    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const userMessage: Message = { type: "user", text: messageText.trim(), time: currentTime }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages, // Envoie l'historique pour le contexte
          userMessage: messageText.trim(),
          userRole: userRole
        })
      })

      if (!response.ok) throw new Error('Erreur réseau')

      const data = await response.json()
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: data.reply || "Désolé, je n'ai pas pu générer de réponse.", 
        time: botTime 
      }])
    } catch (error) {
      console.error('Erreur Chatbot:', error)
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: "⚠️ Je rencontre un petit problème technique. Veuillez réessayer dans un instant ou contacter le support à **support@jobconnect.tg**.", 
        time: botTime 
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSend = () => sendMessage(input)
  
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
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, feedback: type } : msg
    ))
  }

  const handleReset = () => {
    setMessages([{
      type: "bot",
      text: "🔄 Conversation réinitialisée.\n\nJe suis **JOBI**, votre assistant expert. Comment puis-je vous aider aujourd'hui ?",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <>
      {/* Bouton flottant avec effet de lueur (Glow) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center justify-center z-[9999] border border-white/20 transition-all"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour mobile */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            />
            
            {/* Fenêtre de Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-[95vw] md:w-[420px] max-h-[85vh] md:max-h-[650px] bg-[#0F172A] rounded-2xl shadow-2xl z-[9999] overflow-hidden flex flex-col border border-white/10"
              style={{ 
                scrollbarWidth: 'thin', 
                scrollbarColor: 'rgba(255,255,255,0.2) transparent' 
              }}
            >
              {/* Header */}
              <div className="bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10 p-4 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#0F172A]">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        JOBCONNECT AI
                        <Sparkles className="w-4 h-4 text-[#818CF8]" />
                      </h3>
                      <p className="text-xs text-white/60 flex items-center gap-1.5">
                        {isTyping ? (
                          <><span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full animate-pulse" /> Réflexion en cours...</>
                        ) : (
                          <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> En ligne • Propulsé par Groq</>
                        )}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="p-2 hover:bg-white/10 rounded-full transition text-white/70 hover:text-white"
                    title="Nouvelle conversation"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                {/* Sélecteur de rôle (Segmented Control) */}
                <div className="flex bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setUserRole('client')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userRole === 'client' 
                        ? 'bg-white text-[#0F172A] shadow-sm' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" /> Client
                  </button>
                  <button
                    onClick={() => setUserRole('professional')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userRole === 'professional' 
                        ? 'bg-white text-[#0F172A] shadow-sm' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <BriefcaseIcon className="w-3.5 h-3.5" /> Pro
                  </button>
                </div>
              </div>

              {/* Zone des Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0F172A]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2.5 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                        msg.type === "user" 
                          ? "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white" 
                          : "bg-white/10 border border-white/20 text-white"
                      }`}>
                        {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      
                      {/* Bulle de message */}
                      <div className="flex flex-col">
                        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                          msg.type === "user"
                            ? "bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white rounded-br-md"
                            : "bg-white/10 backdrop-blur-md text-white rounded-bl-md border border-white/10"
                        }`}>
                          <div 
                            className="text-[13px] whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                          />
                        </div>
                        
                        {/* Métadonnées (Heure + Feedback) */}
                        <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <span className="text-[10px] text-white/40 font-medium">{msg.time}</span>
                          {msg.type === "bot" && i > 0 && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleFeedback(i, 'up')}
                                className={`p-1 rounded-md transition-all ${
                                  msg.feedback === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/30 hover:text-emerald-400 hover:bg-white/5'
                                }`}
                                aria-label="Réponse utile"
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleFeedback(i, 'down')}
                                className={`p-1 rounded-md transition-all ${
                                  msg.feedback === 'down' ? 'bg-red-500/20 text-red-400' : 'text-white/30 hover:text-red-400 hover:bg-white/5'
                                }`}
                                aria-label="Réponse inutile"
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
                
                {/* Indicateur de frappe */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-md border border-white/10 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions rapides */}
              <AnimatePresence>
                {messages.length <= 2 && !isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-3 border-t border-white/10 bg-[#0F172A]/50 backdrop-blur-sm shrink-0"
                  >
                    <p className="text-[11px] text-white/50 mb-2 font-semibold uppercase tracking-wider">💡 Suggestions :</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies[userRole].map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="text-[12px] bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/90 px-3 py-2 rounded-xl transition-all border border-white/10 text-left"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-white/10 bg-[#0F172A] shrink-0">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isTyping}
                      placeholder={isTyping ? "JOBI réfléchis..." : "Posez-moi n'importe quelle question..."}
                      className="w-full px-4 py-3 bg-white text-[#0F172A] placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 text-sm font-medium transition-all disabled:opacity-70"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-[#4F46E5]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
                    aria-label="Envoyer le message"
                  >
                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-white/30 mt-2.5 text-center font-medium">
                  ⏎ Entrée pour envoyer • Propulsé par Groq AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Petit composant icône manquant dans les imports lucide par sécurité
function BriefcaseIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  )
}