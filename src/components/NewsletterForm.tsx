// src/components/NewsletterForm.tsx
'use client'

import { Mail, ArrowRight } from 'lucide-react'

export default function NewsletterForm() {
  return (
    <form 
      className="space-y-2" 
      onSubmit={(e) => { 
        e.preventDefault()
        // Ici tu pourras plus tard ajouter ta logique d'API ou d'envoi d'email
        alert('Merci pour votre inscription à la newsletter !') 
      }}
    >
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="email"
          placeholder="votre@email.com"
          required
          className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        S'abonner
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}