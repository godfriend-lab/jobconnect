// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Briefcase, Loader2, AlertCircle, Star, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import AvailabilityToggle from '@/components/dashboard/pro/shared/AvailabilityToggle'

export default function DashboardHome({ profile }: any) {
  const [stats, setStats] = useState({
    rating: 0,
    reviews: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile) {
      loadStats()
    }
  }, [profile])

  const loadStats = async () => {
    try {
      if (!profile?.id) return

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewee_id', profile.id)

      const avgRating = reviewsData && reviewsData.length > 0
        ? reviewsData.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviewsData.length
        : 0

      setStats({
        rating: avgRating,
        reviews: reviewsData?.length || 0
      })
    } catch (error) {
      console.error('Erreur chargement stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 relative z-10" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header avec gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Bonjour, {profile?.full_name?.split(' ')[0]} 👋
            </h1>
            <p className="text-indigo-100 text-base md:text-lg max-w-xl">
              Voici un résumé de votre activité sur ProKorb. Continuez comme ça !
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <AvailabilityToggle 
              userId={profile.id}
              currentStatus={profile.is_available}
            />
          </div>
        </div>
      </div>

      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Note moyenne */}
        <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/30">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              {stats.rating > 0 && (
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold">
                  <TrendingUp className="w-4 h-4" />
                  Excellent
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-slate-600 dark:text-slate-400 font-medium">Note moyenne</p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-black text-slate-900 dark:text-white">
                  {stats.rating > 0 ? stats.rating.toFixed(1) : 'N/A'}
                </p>
                <span className="text-slate-400 text-lg">/5</span>
              </div>
              {stats.rating > 0 && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(stats.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total des avis */}
        <div className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/30">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              {stats.reviews > 0 && (
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-bold">
                  {stats.reviews} avis
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-slate-600 dark:text-slate-400 font-medium">Total des avis</p>
              <p className="text-5xl font-black text-slate-900 dark:text-white">
                {stats.reviews}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                {stats.reviews === 0 ? 'Soyez le premier à recevoir des avis' : 'Clients satisfaits'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section conseils */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-200 dark:border-indigo-800 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">
              Astuce pour décrocher plus de missions 
            </h3>
            <p className="text-indigo-800 dark:text-indigo-400 leading-relaxed">
              Assurez-vous que votre <strong>photo de profil</strong> est professionnelle et que votre section <strong>"Bio"</strong> décrit clairement vos compétences. 
              Les profils complets reçoivent jusqu'à <span className="font-bold text-indigo-900 dark:text-indigo-300">3x plus de demandes</span> !
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-indigo-200 dark:border-indigo-800">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Photo pro</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-indigo-200 dark:border-indigo-800">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Bio complète</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-indigo-200 dark:border-indigo-800">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats rapides en bas */}
      {stats.reviews > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-2xl font-bold text-indigo-600">{Math.round(stats.rating * stats.reviews)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Points totaux</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.reviews > 0 ? '100%' : '0%'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Satisfaction</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.reviews}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ce mois</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}