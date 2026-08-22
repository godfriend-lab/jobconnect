// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getFeaturedProfessionals, FEATURED_COUNT } from '@/lib/priority'

export function useFeaturedProfessionals(count = FEATURED_COUNT) {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFeatured()
  }, [count])

  const loadFeatured = async () => {
    try {
      setLoading(true)
      setError(null)

      // Récupérer les profils avec leurs services actifs
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select(`
          id, 
          full_name, 
          specialty, 
          avatar_url, 
          rating, 
          total_reviews, 
          plan, 
          is_verified, 
          is_available, 
          city,
          services (
            id, 
            title, 
            price, 
            is_active
          )
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      // Filtrer et trier avec notre système de priorité
      const featured = getFeaturedProfessionals(data || [], count)

      // Dédupliquer et nettoyer les services
      const cleaned = featured.map(pro => ({
        ...pro,
        services: (pro.services || []).filter((s: any) => s.is_active)
      })).filter(pro => pro.services.length > 0)

      setProfessionals(cleaned)
    } catch (err: any) {
      console.error('Erreur chargement professionnels vedettes:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { professionals, loading, error, refresh: loadFeatured }
}