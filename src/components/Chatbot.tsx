// @ts-nocheck
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, 
  RefreshCw, Loader2, Briefcase, Zap, Shield, 
  Star, TrendingUp, Award, CheckCircle2
} from "lucide-react"

// ============================================================================
// 🧠 MODULE 1 : MOTEUR NLP AVANCÉ (ProKorb & KOBI)
// ============================================================================

const SYNONYMS_DATABASE = {
  "bonjour": ["salut", "coucou", "hello", "bonsoir", "hey", "yo", "bjr", "bsr", "slt", "cc"],
  "prix": ["tarif", "coût", "cout", "combien", "montant", "coute", "coûte", "budget", "argent"],
  "abonnement": ["forfait", "plan", "pack", "offre", "souscription"],
  "inscrire": ["inscription", "register", "créer", "creer", "signup", "rejoindre", "nouveau compte"],
  "connecter": ["connexion", "login", "se connecter", "signin", "entrer", "mot de passe", "password", "mdp"],
  "trouver": ["chercher", "rechercher", "localiser", "découvrir", "decouvrir", "besoin de", "je cherche"],
  "professionnel": ["pro", "prestataire", "artisan", "expert", "spécialiste", "specialiste", "technicien"],
  "sécurité": ["securite", "protection", "confiance", "fiable", "arnaque", "danger"],
  "vérifié": ["verifie", "badge", "certifié", "certifie", "validé", "valide"],
  "commission": ["frais", "pourcentage", "prélèvement", "prelevement", "taxe", "retenue", "cut"],
  "support": ["aide", "assistance", "contact", "joindre", "problème", "probleme", "bug", "erreur", "sos"]
}

const INTENT_PATTERNS = {
  greeting: /^(bonjour|salut|coucou|hello|bonsoir|hey|yo|bjr|bsr|slt|cc|ça va|ca va)/i,
  thanks: /^(merci|thanks|super|parfait|génial|genial|excellent|formidable|bravo)/i,
  question_pricing: /(prix|tarif|coût|cout|combien|abonnement|forfait|plan|pack|offre|coute|coûte)/i,
  question_commission: /(commission|frais|pourcentage|prélèvement|prelevement|taxe|retenue|cut|0%|zero)/i,
  question_registration: /(inscrire|inscription|créer|creer|register|signup|rejoindre|nouveau compte|s'inscrire)/i,
  question_search: /(trouver|chercher|rechercher|localiser|découvrir|besoin de|je cherche|plombier|électricien|développeur)/i,
  question_security: /(sécurité|securite|protection|confiance|fiable|arnaque|vérifié|verifie|badge|certifié)/i,
  question_contact: /(contacter|contact|email|téléphone|telephone|joindre|support|aide|assistance|problème)/i,
  social_who_are_you: /(t'es qui|qui es-tu|ton nom|c'est quoi ProKorb|qu'est-ce que ProKorb|présente-toi)/i
}

const SOCIAL_RESPONSES = {
  greeting: [
    "👋 Bonjour et bienvenue sur **ProKorb** ! Je suis **KOBI**, votre assistant IA. Ravi de faire votre connaissance ! Comment puis-je vous aider aujourd'hui ? 😊",
    "🌟 Salut ! Bienvenue dans l'univers **ProKorb**, la marketplace N°1 des services au Togo 🇹🇬. Je suis KOBI, prêt à vous accompagner. Que souhaitez-vous savoir ?"
  ],
  thanks: [
    "😊 Avec grand plaisir ! C'est exactement pour ça que je suis là. N'hésitez surtout pas si vous avez d'autres questions. Je suis à votre service ! 💫",
    "✨ Merci à VOUS de votre confiance ! C'est toujours un plaisir de vous aider. Revenez me voir quand vous voulez. Excellente journée sur **ProKorb** ! 🚀"
  ],
  social_who_are_you: [
    "🤖 Excellente question ! Je suis **KOBI**, l'assistant IA intelligent de **ProKorb**.\n\n**Ma mission** : Vous accompagner pas à pas, répondre à toutes vos questions, et vous faire découvrir toutes les opportunités de notre plateforme.\n\n**Ce que je sais faire** :\n• 💰 Vous expliquer nos tarifs (**0% commission** !)\n• 📝 Vous guider dans l'inscription\n• 🔍 Vous aider à trouver le pro idéal\n• 🛡️ Vous renseigner sur la sécurité\n\nJe suis là pour vous, 24h/24 ! Que souhaitez-vous savoir en premier ? 😊"
  ]
}

const KNOWLEDGE_BASE = [
  {
    id: "pricing_general",
    intents: ["question_pricing"],
    keywords: ["prix", "tarif", "coût", "cout", "combien", "abonnement", "forfait", "plan", "pack", "offre"],
    category: "pricing",
    responses: [
      "💰 **Les Tarifs ProKorb** - Transparence totale !\n\nNous avons 4 forfaits de visibilité pour les professionnels :\n\n**🆓 GRATUIT** - 0 FCFA\n• Profil professionnel complet & Services illimités\n\n**🚀 STARTER** - 2 000 FCFA/mois\n• Visibilité accrue & Mise en avant locale\n\n**⭐ BUSINESS** - 3 500 FCFA/mois (RECOMMANDÉ)\n• Top 5 des recherches & Statistiques avancées\n\n**👑 PREMIUM** - 7 500 FCFA/mois\n• Top 1 garanti & Page d'accueil\n\n💡 **Bonus annuel** : -10% sur tous les forfaits !\n🚫 **Rappel** : 0% de commission sur vos prestations !\n\n[👉 Voir tous les tarifs](/pricing)",
    ]
  },
  {
    id: "commission",
    intents: ["question_commission"],
    keywords: ["commission", "frais", "pourcentage", "prélèvement", "taxe", "retenue", "cut", "0%"],
    category: "pricing",
    responses: [
      "🚫 **ProKorb = 0% COMMISSION** - C'est notre promesse ! 🤝\n\nContrairement à d'autres plateformes, nous ne prenons AUCUN pourcentage sur vos prestations. \n\n1. Le client et vous convenez d'un prix.\n2. Le client vous paie **DIRECTEMENT** (T-Money, Flooz, espèces).\n3. Vous gardez **100% de l'argent**.\n\nNous nous rémunérons uniquement via les abonnements de visibilité optionnels des professionnels. Votre succès est notre priorité ! 💪",
    ]
  },
  {
    id: "registration",
    intents: ["question_registration"],
    keywords: ["inscrire", "inscription", "créer", "register", "signup", "rejoindre", "nouveau compte"],
    category: "registration",
    responses: [
      "📝 **Inscription sur ProKorb** - Simple et rapide (moins de 2 min) !\n\n1️⃣ Rendez-vous sur : [Page d'inscription](/register)\n2️⃣ Choisissez votre rôle : **Client** ou **Professionnel**\n3️⃣ Remplissez vos infos (Nom, Email, Téléphone, Mot de passe)\n4️⃣ Validez et accédez immédiatement à votre espace !\n\n[👉 S'inscrire maintenant](/register)\n\nBesoin d'aide pour une étape ? Je suis là ! 😊",
    ]
  },
  {
    id: "search",
    intents: ["question_search"],
    keywords: ["trouver", "chercher", "rechercher", "localiser", "découvrir", "besoin de", "je cherche"],
    category: "marketplace",
    responses: [
      "🔍 **Trouver un Professionnel sur ProKorb**\n\n**📍 La Marketplace** : [Explorer les pros](/marketplace)\n\n**Comment chercher** :\n• Utilisez la barre de recherche en haut (ex: \"plombier\", \"développeur\")\n• Filtrez par ville (Lomé, Kara, Sokodé...)\n• Consultez les avis et le portfolio\n\n💡 **Conseil** : Privilégiez toujours les professionnels avec le **Badge Vérifié** 🛡️ pour une confiance maximale !\n\n[👉 Commencer ma recherche](/marketplace)",
    ]
  },
  {
    id: "security",
    intents: ["question_security"],
    keywords: ["sécurité", "securite", "protection", "confiance", "fiable", "arnaque", "vérifié", "badge"],
    category: "security",
    responses: [
      "🛡️ **Sécurité sur ProKorb** - Votre tranquillité d'esprit !\n\n**Le Badge Vérifié** n'est pas décoratif. Chaque professionnel portant ce badge a passé un processus strict :\n• Contrôle d'identité (CNI/Passeport)\n• Casier judiciaire vierge (< 3 mois)\n• Justificatif de qualification\n\n✅ Système d'avis modérés\n✅ Chiffrement des données\n✅ Support réactif en cas de problème\n\n[👉 En savoir plus sur la vérification](/verification)",
    ]
  },
  {
    id: "contact",
    intents: ["question_contact"],
    keywords: ["contacter", "contact", "email", "téléphone", "joindre", "support", "aide", "problème", "bug"],
    category: "support",
    responses: [
      "📞 **Contactez l'Équipe ProKorb**\n\n📧 **Email** : support@prokorb.tg (Réponse sous 24h)\n📱 **Téléphone** : +228 70 88 86 99\n📍 **Siège** : Lomé, Togo\n\n💡 Pour une réponse rapide, décrivez votre problème en détail et indiquez l'email de votre compte.\n\n[👉 Formulaire de contact](/contact)",
    ]
  },
  {
    id: "default_smart",
    intents: [],
    keywords: [],
    category: "default",
    responses: [
      "🤔 **Intéressant comme question !** Laissez-moi vous aider au mieux.\n\nJe suis **KOBI**, l'expert de **ProKorb** 🇹🇬. Je peux vous renseigner sur :\n\n💰 **Nos tarifs** (0% commission !)\n📝 **Inscription et connexion**\n🔍 **Trouver un professionnel** (500+ métiers)\n🛡️ **Sécurité et vérification**\n📞 **Contacter le support**\n\nPourriez-vous préciser votre question avec des mots-clés comme \"prix\", \"inscription\", \"sécurité\" ou \"contact\" ? Je ferai de mon mieux pour vous répondre ! 😊",
      "💡 **Je veux vraiment vous aider !** \n\nPour vous donner la meilleure réponse, dites-moi si votre question concerne :\n• Les **services ProKorb** (comment ça marche ?)\n• La **tarification** (combien coûtent les forfaits ?)\n• La **marketplace** (comment trouver un pro ?)\n• La **sécurité** (qu'est-ce que le Badge Vérifié ?)\n\nPosez-moi votre question en détail, et je vous réponds immédiatement ! 🚀"
    ]
  }
]

// ============================================================================
// 🧠 MODULE 2 : MOTEUR D'INFÉRENCE
// ============================================================================

const normalizeText = (text: string): string => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "").replace(/\s+/g, " ").trim()
}

const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + substitutionCost)
    }
  }
  return matrix[b.length][a.length]
}

const expandWithSynonyms = (text: string): string[] => {
  const words = text.split(/\s+/)
  const expanded = new Set<string>()
  words.forEach(word => {
    expanded.add(word)
    for (const [canonical, synonyms] of Object.entries(SYNONYMS_DATABASE)) {
      if (synonyms.includes(word) || canonical === word) {
        expanded.add(canonical)
        synonyms.forEach(s => expanded.add(s))
      }
    }
  })
  return Array.from(expanded)
}

const detectIntents = (text: string): string[] => {
  const normalizedText = normalizeText(text)
  const detectedIntents: string[] = []
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(normalizedText)) detectedIntents.push(intent)
  }
  return detectedIntents
}

const calculateMatchScore = (userInput: string, entry: any): number => {
  const normalizedInput = normalizeText(userInput)
  const expandedInput = expandWithSynonyms(normalizedInput)
  const detectedIntents = detectIntents(userInput)
  let score = 0
  
  for (const intent of detectedIntents) {
    if (entry.intents.includes(intent)) score += 20
  }
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword)
    if (normalizedInput.includes(normalizedKeyword)) score += normalizedKeyword.length * 2
    for (const expanded of expandedInput) {
      if (expanded === normalizedKeyword) score += 15
    }
    const distance = levenshteinDistance(normalizedInput.substring(0, 30), normalizedKeyword.substring(0, 30))
    if (distance <= 4 && distance > 0) score += Math.max(0, 10 - distance * 2)
  }
  return score
}

const findBestAnswer = (userInput: string): string => {
  const normalizedInput = normalizeText(userInput)
  
  for (const [category, responses] of Object.entries(SOCIAL_RESPONSES)) {
    const pattern = INTENT_PATTERNS[category as keyof typeof INTENT_PATTERNS]
    if (pattern && pattern.test(normalizedInput)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }
  
  let bestMatch = null
  let highestScore = 0
  for (const entry of KNOWLEDGE_BASE) {
    const score = calculateMatchScore(userInput, entry)
    if (score > highestScore) {
      highestScore = score
      bestMatch = entry
    }
  }
  
  if (highestScore >= 10 && bestMatch) {
    return bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)]
  }
  
  const defaultResponses = KNOWLEDGE_BASE.filter(e => e.category === "default").flatMap(e => e.responses)
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

// ============================================================================
// 🎨 MODULE 3 : COMPOSANT CHATBOT UI (Premium Dark Theme)
// ============================================================================

interface Message {
  type: "bot" | "user"
  text: string
  time: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: "bot", 
      text: "👋 **Bonjour et bienvenue sur ProKorb !** 🇹🇬\n\nJe suis **KOBI**, votre assistant IA ultra-intelligent.\n\n✨ **Je peux vous aider à** :\n• 💰 Comprendre nos **tarifs** (0% commission !)\n• 📝 Vous **inscrire** ou vous **connecter**\n• 🔍 Trouver le **professionnel idéal**\n• 🛡️ En savoir plus sur la **sécurité**\n\n**Posez-moi n'importe quelle question**, je suis là pour vous ! 😊",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userRole, setUserRole] = useState<'client' | 'professional'>('client')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = {
    client: ["💰 Quels sont les tarifs ?", "🔍 Comment trouver un pro ?", "🛡️ Est-ce sécurisé ?", "📝 Comment m'inscrire ?"],
    professional: ["💼 Quel plan choisir ?", "🚫 Y a-t-il des commissions ?", "🛡️ Comment être vérifié ?", "📈 Comment réussir ?"]
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const formatMessage = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/)
      const formatted = parts.map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{part}</strong> : part
      )
      
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const processedParts: any[] = []
      let lastIndex = 0
      let match
      const lineStr = Array.isArray(formatted[0]) ? formatted.join('') : formatted
      
      if (typeof lineStr === 'string' && linkRegex.test(lineStr)) {
        linkRegex.lastIndex = 0
        while ((match = linkRegex.exec(lineStr)) !== null) {
          if (match.index > lastIndex) processedParts.push(lineStr.substring(lastIndex, match.index))
          processedParts.push(
            <a key={`link-${i}-${match.index}`} href={match[2]} className="text-indigo-400 underline hover:text-indigo-300 transition-colors font-medium" target="_blank" rel="noopener noreferrer">
              {match[1]}
            </a>
          )
          lastIndex = match.index + match[0].length
        }
        if (lastIndex < lineStr.length) processedParts.push(lineStr.substring(lastIndex))
      } else {
        processedParts.push(...formatted)
      }
      
      if (line.trim().match(/^[•\-\*]\s/) || line.trim().match(/^\d+\.\s/)) {
        return (
          <div key={i} className="flex items-start gap-2 my-1.5 ml-1">
            <span className="text-indigo-400 mt-1 text-lg leading-none flex-shrink-0">
              {line.trim().match(/^\d+\./) ? line.trim().match(/^\d+/)[0] + '.' : '•'}
            </span>
            <span className="text-slate-300 leading-relaxed flex-1 text-[13px]">
              {line.trim().replace(/^[•\-\*]\s/, '').replace(/^\d+\.\s/, '')}
            </span>
          </div>
        )
      }
      return <p key={i} className="mb-1.5 text-slate-300 leading-relaxed last:mb-0 text-[13px]">{processedParts.length > 0 ? processedParts : '\u00A0'}</p>
    })
  }

  const sendMessage = useCallback((messageText: string) => {
    if (!messageText.trim() || isTyping) return
    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { type: "user", text: messageText.trim(), time: currentTime }])
    setInput("")
    setIsTyping(true)

    const thinkingTime = 1500 + Math.random() * 1500 // 1.5s - 3s pour plus de réactivité
    
    setTimeout(() => {
      const reply = findBestAnswer(messageText)
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      setMessages(prev => [...prev, { type: "bot", text: reply, time: botTime }])
      setIsTyping(false)
    }, thinkingTime)
  }, [isTyping])

  const handleSend = () => sendMessage(input)
  
  const handleQuickReply = (reply: string) => {
    const cleanReply = reply.replace(/^[^\w\s]*/g, '').trim()
    sendMessage(cleanReply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleReset = () => {
    setMessages([{
      type: "bot",
      text: "🔄 **Conversation réinitialisée !**\n\nJe suis **KOBI**, votre assistant expert ProKorb. 🇹🇬\n\nComment puis-je vous aider aujourd'hui ? 😊",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <>
      {/* Bouton flottant avec effet de lueur premium */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center z-[9999] border border-white/20 transition-all"
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
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-[95vw] md:w-[400px] max-h-[85vh] md:max-h-[650px] bg-slate-950 rounded-2xl shadow-2xl z-[9999] overflow-hidden flex flex-col border border-slate-800/60"
            >
              {/* Header Premium */}
              <div className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 p-4 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-slate-900">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        KOBI AI
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        {isTyping ? (
                          <><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" /> KOBI réfléchit...</>
                        ) : (
                          <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> En ligne • ProKorb</>
                        )}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleReset} className="p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white" title="Nouvelle conversation">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                {/* Sélecteur de rôle compact */}
                <div className="flex bg-slate-950/50 backdrop-blur-sm p-1 rounded-xl border border-slate-800">
                  <button onClick={() => setUserRole('client')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${userRole === 'client' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                    <User className="w-3.5 h-3.5" /> Client
                  </button>
                  <button onClick={() => setUserRole('professional')} className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${userRole === 'professional' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                    <Briefcase className="w-3.5 h-3.5" /> Pro
                  </button>
                </div>
              </div>

              {/* Zone des Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2.5 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.type === "user" ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : "bg-slate-900 border border-slate-800 text-indigo-400"}`}>
                        {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <div className={`px-4 py-3 rounded-2xl shadow-sm ${msg.type === "user" ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md" : "bg-slate-900 text-slate-200 rounded-bl-md border border-slate-800"}`}>
                          <div className="whitespace-normal">
                            {formatMessage(msg.text)}
                          </div>
                        </div>
                        <span className={`text-[10px] text-slate-500 font-medium mt-1 ${msg.type === "user" ? "text-right pr-1" : "text-left pl-1"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions rapides */}
              <AnimatePresence>
                {messages.length <= 2 && !isTyping && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-4 py-3 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm shrink-0">
                    <p className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-wider">💡 Suggestions :</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies[userRole].map((reply, i) => (
                        <button key={i} onClick={() => handleQuickReply(reply)} className="text-[11px] bg-slate-800 hover:bg-slate-700 hover:border-indigo-500/50 text-slate-300 px-3 py-2 rounded-xl transition-all border border-slate-700 text-left">
                          {reply}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isTyping}
                      placeholder={isTyping ? "KOBI réfléchit..." : "Posez-moi n'importe quelle question..."}
                      className="w-full px-4 py-3 bg-slate-900 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-800 focus:border-indigo-500 text-sm font-medium transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
                    aria-label="Envoyer le message"
                  >
                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-2.5 text-center font-medium">
                  ⏎ Entrée pour envoyer • Propulsé par KOBI AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}