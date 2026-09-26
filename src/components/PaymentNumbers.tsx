'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function PaymentNumbers() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
        Numéros de paiement Mobile Money
      </h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-2xl border-2 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">T-Money</span>
            <button 
              onClick={() => copyToClipboard('70888699', 'tmoney')}
              className="p-2 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-lg transition-colors"
              title="Copier le numéro"
            >
              {copied === 'tmoney' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              )}
            </button>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-wider">70 88 86 99</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Moov Money</span>
            <button 
              onClick={() => copyToClipboard('79940793', 'moov')}
              className="p-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors"
              title="Copier le numéro"
            >
              {copied === 'moov' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              )}
            </button>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-wider">79 94 07 93</p>
        </div>
      </div>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Montant à envoyer : <strong className="text-slate-900 dark:text-white">5 000 FCFA</strong>
      </p>
    </section>
  )
}