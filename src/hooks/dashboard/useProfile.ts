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
  const [saving, setSaving] = useState(false)

  // ✅ CHARGEMENT DU PROFIL
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true)
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        console.warn('⚠️ [useProfile] Aucune session, redirection vers login')
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('❌ [useProfile] Erreur chargement:', error)
        throw error
      }

      if (!data) {
        console.warn('⚠️ [useProfile] Profil inexistant, redirection')
        router.push('/login')
        return
      }

      // Vérifier que c'est bien un pro
      if (data.role !== 'pro') {
        console.log('ℹ️ [useProfile] Utilisateur non-pro, redirection vers dashboard client')
        router.push('/dashboard/client')
        return
      }

      console.log('✅ [useProfile] Profil chargé avec succès:', data.full_name)
      setProfile(data)
      
      // Charger le thème sauvegardé
      const savedTheme = localStorage.getItem('darkMode')
      if (savedTheme !== null) {
        setDarkMode(savedTheme === 'true')
      }
      
    } catch (error) {
      console.error('❌ [useProfile] Erreur critique chargement:', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  // ✅ MISE À JOUR DU PROFIL (Sécurisée et robuste)
  const updateProfile = async (updates: any) => {
    if (!profile) {
      console.error('❌ [useProfile] Impossible de mettre à jour: profil non chargé')
      return { success: false, error: 'Profil non chargé' }
    }

    if (saving) {
      console.warn('⚠️ [useProfile] Sauvegarde déjà en cours')
      return { success: false, error: 'Sauvegarde en cours' }
    }

    console.log('🔄 [useProfile] Début de la mise à jour...')
    setSaving(true)

    try {
      // 1. Sauvegarde de l'ancien profil pour rollback si besoin
      const previousProfile = { ...profile }

      // 2. Mise à jour optimiste (UI immédiate)
      setProfile((prev: any) => ({ ...prev, ...updates }))

      // 3. Nettoyer les champs interdits en modification
      const forbiddenFields = ['id', 'role', 'created_at', 'updated_at', 'email']
      const safeUpdates: any = {}
      
      Object.keys(updates).forEach(key => {
        if (!forbiddenFields.includes(key)) {
          safeUpdates[key] = updates[key]
        }
      })

      // Ajouter le timestamp de mise à jour
      safeUpdates.updated_at = new Date().toISOString()

      console.log('📝 [useProfile] Champs à mettre à jour:', safeUpdates)

      // 4. Requête Supabase
      const { data, error } = await supabase
        .from('profiles')
        .update(safeUpdates)
        .eq('id', profile.id)
        .select() // IMPORTANT: Récupérer les données mises à jour

      if (error) {
        console.error('❌ [useProfile] Erreur Supabase:', error)
        // Rollback: restaurer l'ancien profil
        setProfile(previousProfile)
        return { success: false, error: error.message }
      }

      // 5. Vérifier les données retournées
      if (!data || data.length === 0) {
        console.warn('⚠️ [useProfile] Aucune donnée retournée par Supabase')
        // Recharger pour synchroniser
        await loadProfile()
        return { success: true }
      }

      // 6. Mettre à jour avec les données confirmées de la BDD
      console.log('✅ [useProfile] Mise à jour confirmée par la BDD')
      setProfile(data[0])
      
      return { success: true, data: data[0] }

    } catch (error) {
      console.error(' [useProfile] Erreur critique:', error)
      // Rollback en cas d'erreur
      await loadProfile()
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    } finally {
      setSaving(false)
    }
  }

  // ✅ UPLOAD D'AVATAR
  const uploadAvatar = async (file: File) => {
    if (!profile) {
      console.error('❌ [useProfile] Profil non chargé pour upload avatar')
      return { success: false, error: 'Profil non chargé' }
    }

    console.log(' [useProfile] Upload avatar en cours...', file.name)

    try {
      // 1. Vérifier la taille du fichier (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        return { success: false, error: 'L\'image ne doit pas dépasser 5MB' }
      }

      // 2. Vérifier le type de fichier
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        return { success: false, error: 'Format non supporté. Utilisez JPG, PNG ou WebP' }
      }

      // 3. Préparer le nom du fichier
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/avatar.${fileExt}`

      // 4. Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true // Remplacer l'ancien avatar s'il existe
        })

      if (uploadError) {
        console.error('❌ [useProfile] Erreur upload:', uploadError)
        throw uploadError
      }

      // 5. Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      console.log('✅ [useProfile] Avatar uploadé:', publicUrl)

      // 6. Mettre à jour le profil avec la nouvelle URL
      const result = await updateProfile({ avatar_url: publicUrl })
      
      return result

    } catch (error) {
      console.error('❌ [useProfile] Erreur upload avatar:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur lors de l\'upload' 
      }
    }
  }

  // ✅ SAUVEGARDER LE THÈME
  const toggleDarkMode = (value: boolean) => {
    setDarkMode(value)
    localStorage.setItem('darkMode', value.toString())
    
    // Appliquer la classe au body
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // ✅ CHARGEMENT INITIAL
  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // ✅ CLEANUP
  useEffect(() => {
    return () => {
      // Nettoyer si nécessaire
      console.log(' [useProfile] Cleanup')
    }
  }, [])

  return {
    profile,
    loading,
    saving,
    darkMode,
    setDarkMode: toggleDarkMode,
    updateProfile,
    uploadAvatar,
    loadProfile
  }
}