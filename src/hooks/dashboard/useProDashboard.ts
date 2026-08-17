// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useProDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updatingAvailability, setUpdatingAvailability] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { 
        router.push('/login')
        return 
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error || !profileData) { 
        router.push('/login')
        return 
      }

      if (profileData.role !== 'pro') {
        router.push('/dashboard/client')
        return
      }

      setProfile(profileData)
    } catch (error) {
      console.error('Erreur chargement profil:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FONCTION POUR TOGGLER LA DISPONIBILITÉ
  const toggleAvailability = async () => {
    if (!profile) return
    
    try {
      setUpdatingAvailability(true)
      const newStatus = !profile.is_available
      
      // Mettre à jour Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: newStatus })
        .eq('id', profile.id)
      
      if (error) throw error
      
      // Mettre à jour l'état local immédiatement
      setProfile({ ...profile, is_available: newStatus })
      
      // Afficher un message de confirmation
      alert(newStatus 
        ? '✅ Vous êtes maintenant DISPONIBLE et visible sur la marketplace' 
        : '⏸️ Vous êtes maintenant INDISPONIBLE et masqué de la marketplace'
      )
    } catch (error) {
      console.error('Erreur toggle disponibilité:', error)
      alert('❌ Erreur lors du changement de statut')
    } finally {
      setUpdatingAvailability(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return {
    profile,
    loading,
    updatingAvailability,
    toggleAvailability,
    handleLogout,
    loadProfile // Pour rafraîchir si besoin
  }
}