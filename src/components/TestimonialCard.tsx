// src/components/TestimonialCard.tsx
'use client'

import { Star } from 'lucide-react'

export default function TestimonialCard({ review }: { review: any }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-slate-600 leading-relaxed mb-6">"{review.text}"</p>
      
      <div className="flex items-center gap-3">
        {/* Cercle d'image avec fallback intelligent */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 flex-shrink-0 bg-indigo-100 relative">
          <img
            src={review.image}
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Masque l'image cassée
              e.currentTarget.style.display = 'none'
              // Affiche les initiales à la place
              const fallback = e.currentTarget.parentElement?.querySelector('.fallback-initials')
              if (fallback) {
                fallback.classList.remove('hidden')
                fallback.classList.add('flex')
              }
            }}
          />
          <div className="fallback-initials hidden w-full h-full absolute inset-0 items-center justify-center text-indigo-700 font-bold text-lg">
            {review.name.charAt(0)}
          </div>
        </div>
        
        <div>
          <div className="font-bold text-slate-950 text-sm">{review.name}</div>
          <div className="text-xs text-slate-500">{review.role}</div>
        </div>
      </div>
    </div>
  )
}