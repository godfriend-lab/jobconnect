// @ts-nocheck
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const loadProfile = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) throw error
      if (!data) { router.push('/login'); return }
      if (data.role !== 'pro') { router.push('/dashboard/client'); return }

      console.log('✅ [useProfile] Profil chargé depuis la BDD:', data)
      setProfile(data)
    } catch (error) {
      console.error('❌ [useProfile] Erreur chargement profil:', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // ✅ FONCTION DE MISE À JOUR ROBUSTE AVEC COMMUNICATION GARANTIE
  const updateProfile = async (updates: any) => {
    if (!profile) {
      console.warn('⚠️ [useProfile] Impossible de mettre à jour: profil nul')
      return false
    }
    
    console.log('🔄 [useProfile] Tentative de mise à jour avec:', updates)
    
    try {
      // 1. MISE À JOUR OPTIMISTE : L'interface réagit IMMÉDIATEMENT (0ms)
      setProfile((prev: any) => ({ ...prev, ...updates }))

      // 2. ENVOI À SUPABASE
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select() // <-- TRÈS IMPORTANT : demande à Supabase de renvoyer les nouvelles données

      if (error) {
        console.error('❌ [useProfile] Erreur Supabase:', error)
        // Rollback : on annule le changement visuel et on recharge les vraies données
        await loadProfile() 
        return false
      }

      console.log('✅ [useProfile] Succès ! Données reçues de Supabase:', data)
      
      // 3. SYNCHRONISATION FINALE : On écrase l'état local avec les données confirmées de la BDD
      if (data && data.length > 0) {
        setProfile(data[0])
      }
      
      return true // Succès
    } catch (error) {
      console.error('❌ [useProfile] Erreur critique:', error)
      await loadProfile() // Rollback
      return false
    }
  }

  const uploadAvatar = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })
        
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      
      // On réutilise updateProfile pour garantir la synchronisation
      await updateProfile({ avatar_url: publicUrl })
      return true
    } catch (error) {
      console.error('❌ [useProfile] Erreur upload avatar:', error)
      return false
    }
  }

  return { 
    profile, 
    loading, 
    darkMode, 
    setDarkMode, 
    updateProfile, 
    uploadAvatar,
    loadProfile // Exposé pour forcer un rafraîchissement si besoin
  }
}