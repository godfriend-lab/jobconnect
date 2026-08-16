// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useServices(proId: string | null) {
  const [services, setServices] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (proId) loadServices()
  }, [proId])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').eq('pro_id', proId).order('created_at', { ascending: false })
      if (!error && data) setServices(data)
    } catch (error) { console.error('Erreur loadServices:', error) }
  }

  const publishService = async (serviceData: any) => {
    try {
      setUploading(true)
      const { error } = await supabase.from('services').insert({ pro_id: proId, ...serviceData, is_active: true })
      if (error) throw error
      await loadServices()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    } finally { setUploading(false) }
  }

  const updateService = async (id: string, updates: any) => {
    try {
      setUploading(true)
      const { error } = await supabase.from('services').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id)
      if (error) throw error
      await loadServices()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    } finally { setUploading(false) }
  }

  return { services, uploading, publishService, updateService, loadServices }
}