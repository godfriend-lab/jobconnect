'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
  category: string
}

interface FaqSearchProps {
  faqs: FaqItem[]
  categories: string[]
}

export default function FaqSearch({ faqs, categories }: FaqSearchProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Toutes' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher une question (ex: vérification, paiement, commission...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste des FAQ */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">Aucune question ne correspond à votre recherche</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold">
                      Q
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pl-17">
                    <div className="pl-11 border-l-2 border-indigo-200 dark:border-indigo-800 ml-4">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Compteur */}
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4">
        {filteredFaqs.length} question{filteredFaqs.length > 1 ? 's' : ''} affichée{filteredFaqs.length > 1 ? 's' : ''}
      </div>
    </div>
  )
}