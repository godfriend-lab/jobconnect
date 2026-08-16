// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useReviews(proId: string | null) {
  const [reviews, setReviews] = useState<any[]>([])
  const [stats, setStats] = useState({ rating: 0, totalReviews: 0 })

  useEffect(() => {
    if (proId) loadData()
  }, [proId])

  const loadData = async () => {
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*, profiles:client_id(full_name, avatar_url)')
        .eq('reviewee_id', proId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (!reviewsError && reviewsData) {
        const formatted = reviewsData.map(r => ({
          ...r,
          reviewer_name: r.profiles?.full_name || 'Client',
          reviewer_avatar: r.profiles?.avatar_url || null
        }))
        setReviews(formatted)

        const { data: statsData } = await supabase.from('reviews').select('rating').eq('reviewee_id', proId)
        const avg = statsData && statsData.length > 0 ? statsData.reduce((sum, r) => sum + (r.rating || 0), 0) / statsData.length : 0
        setStats({ rating: avg, totalReviews: statsData?.length || 0 })
      }
    } catch (error) {
      console.error('Erreur useReviews:', error)
    }
  }

  return { reviews, stats }
}