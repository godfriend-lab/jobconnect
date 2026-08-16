// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      
      const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (error || !data) { router.push('/login'); return }
      if (data.role === 'client') { router.push('/dashboard/client'); return }
      
      setProfile(data)
    } catch (error) {
      console.error('Erreur loadProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase.from('profiles').update(updates).eq('id', profile.id)
      if (error) throw error
      setProfile({ ...profile, ...updates })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const uploadAvatar = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { cacheControl: '3600', upsert: true })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      await updateProfile({ avatar_url: publicUrl })
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return { profile, loading, darkMode, setDarkMode, updateProfile, uploadAvatar, loadProfile }
}