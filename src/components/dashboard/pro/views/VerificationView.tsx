// @ts-nocheck
'use client'

import { useState } from 'react'
import { 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  Copy, 
  Check, 
  Smartphone, 
  CreditCard, 
  UserCheck,
  Sparkles
} from 'lucide-react'
import VerifiedBadge from '@/components/VerifiedBadge'

export default function VerificationView({ profile }: any) {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)

  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"

  const whatsappNumber = "22870888699"
  const preFilledMessage = encodeURIComponent(
    "Bonjour équipe ProKorb , je souhaite activer mon badge 'Pro Vérifié' (5 000 FCFA/an). Je suis prêt à vous envoyer mes documents (CNI/Passeport/ANID, Diplôme, Selfie) et la preuve de paiement. Merci de me guider !"
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedNumber(id)
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold border border-indigo-100 dark:border-indigo-800">
          <Sparkles className="w-4 h-4" />
          Statut Premium
        </div>
        <h1 className={`text-3xl md:text-4xl font-black ${textPrimary}`}>
          Devenez un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pro Vérifié</span>
        </h1>
        <p className={`text-lg ${textSecondary} max-w-2xl mx-auto`}>
          Obtenez le badge bleu exclusif pour inspirer une confiance maximale, apparaître en priorité et multiplier vos contacts par 3.
        </p>
      </div>

      <div className={`${cardBg} rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLONNE GAUCHE : PRIX & AVANTAGES */}
          <div className="lg:col-span-5 space-y-8">
            <div className="text-center lg:text-left">
              {/* ✅ VRAI BADGE DE VÉRIFICATION */}
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="relative">
                  <VerifiedBadge
                    isVerified={true}
                    verifiedAt={new Date().toISOString()}
                    size={80}
                    showLabel={false}
                    showExpiration={false}
                  />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>Badge Vérifié</h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-1 mb-2">
                <span className="text-4xl font-black text-indigo-600">5 000</span>
                <span className={`text-xl font-medium ${textSecondary}`}>FCFA <span className="text-sm font-normal">/an</span></span>
              </div>
              <p className={`text-sm ${textSecondary}`}>Paiement unique annuel. Aucun frais caché.</p>
            </div>

            <div className="space-y-4">
              <h4 className={`font-bold ${textPrimary} flex items-center gap-2`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Vos avantages
              </h4>
              <ul className="space-y-3">
                {[
                  'Badge bleu "Vérifié" exclusif sur votre profil',
                  'Apparition en priorité absolue dans les résultats',
                  'Confiance accrue des clients (jusqu\'à 3x plus de contacts)',
                  'Indépendant de votre abonnement visibilité actuel'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className={`text-sm font-medium ${textSecondary}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLONNE DROITE : PROCESSUS & DOCUMENTS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* ÉTAPES */}
            <div>
              <h4 className={`font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                <Smartphone className="w-5 h-5 text-indigo-500" />
                Comment ça marche ? (Simple & Rapide)
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: <MessageCircle className="w-5 h-5 text-green-500" />,
                    title: "1. Contactez-nous sur WhatsApp",
                    desc: "Cliquez sur le bouton vert ci-dessous. Un message automatique nous parviendra et nous vous enverrons un guide de bienvenue."
                  },
                  {
                    icon: <FileText className="w-5 h-5 text-blue-500" />,
                    title: "2. Envoyez vos documents",
                    desc: "Photo claire Recto/Verso de votre CNI, Passeport ou Carte ANID + Votre Diplôme/Certificat + Un selfie de vérification."
                  },
                  {
                    icon: <CreditCard className="w-5 h-5 text-amber-500" />,
                    title: "3. Effectuez le paiement",
                    desc: "Envoyez 5 000 FCFA via T-Money au 70 88 86 99 ou Moov Money au 79 94 07 93."
                  },
                  {
                    icon: <UserCheck className="w-5 h-5 text-emerald-500" />,
                    title: "4. Envoyez la preuve et soyez vérifié",
                    desc: "Partagez la capture d'écran de la transaction sur WhatsApp. Votre badge sera activé sous 24h après validation."
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                      {step.icon}
                    </div>
                    <div>
                      <h5 className={`font-bold text-sm ${textPrimary}`}>{step.title}</h5>
                      <p className={`text-sm mt-1 ${textSecondary}`}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NUMÉROS À COPIER (High-Tech UX) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => copyToClipboard('70888699', 'tmoney')}
                className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all group"
              >
                <div className="text-left">
                  <p className="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase tracking-wider">T-Money</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">70 88 86 99</p>
                </div>
                {copiedNumber === 'tmoney' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400 group-hover:text-yellow-600 transition-colors" />
                )}
              </button>

              <button 
                onClick={() => copyToClipboard('79940793', 'moov')}
                className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all group"
              >
                <div className="text-left">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-500 uppercase tracking-wider">Moov Money</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">79 94 07 93</p>
                </div>
                {copiedNumber === 'moov' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                )}
              </button>
            </div>

            {/* BOUTON D'ACTION PRINCIPAL */}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-black text-lg rounded-2xl transition-all shadow-lg shadow-green-600/30 hover:shadow-green-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>VÉRIFIER MON COMPTE</span>
              <span className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
            </a>
            
            <p className={`text-center text-xs ${textSecondary}`}>
             
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}