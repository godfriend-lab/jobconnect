// @ts-nocheck
'use client'
import { Star } from 'lucide-react'

export default function ReviewsView({ reviews, stats }: any) {
  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className={`text-2xl font-bold ${textPrimary}`}>Avis Clients</h1><p className={`text-sm ${textSecondary}`}>Ce que disent vos clients</p></div>
        <div className="flex items-center gap-3 bg-linear-to-r from-yellow-500 to-amber-600 px-6 py-3 rounded-xl shadow-lg">
          <Star className="w-6 h-6 text-white fill-white" />
          <span className="text-2xl font-bold text-white">{stats.rating.toFixed(1)}</span>
          <span className="text-white/90 font-semibold">({stats.totalReviews} avis)</span>
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className={`${cardBg} rounded-2xl p-16 text-center shadow-sm`}>
          <Star className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <p className={`text-lg ${textSecondary}`}>Aucun avis pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review.id} className={`${cardBg} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
                  {review.reviewer_avatar ? <img src={review.reviewer_avatar} alt={review.reviewer_name} className="w-full h-full object-cover" /> : review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className={`font-bold ${textPrimary} text-lg`}>{review.reviewer_name}</h3>
                      <p className={`text-xs ${textSecondary}`}>{new Date(review.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />))}
                    </div>
                  </div>
                  <p className={`${textSecondary} leading-relaxed`}>{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}