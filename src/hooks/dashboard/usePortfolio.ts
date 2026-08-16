// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePortfolio(proId: string | null) {
  const [portfolio, setPortfolio] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (proId) loadPortfolio()
  }, [proId])

  const loadPortfolio = async () => {
    try {
      const { data, error } = await supabase.from('professional_portfolio').select('*').eq('professional_id', proId).order('created_at', { ascending: false })
      if (!error && data) setPortfolio(data)
    } catch (error) { console.error('Erreur loadPortfolio:', error) }
  }

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${proId}/${Date.now()}.${fileExt}`
      const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(fileName)
      return { success: true, publicUrl }
    } catch (error) {
      return { success: false, error }
    } finally { setUploading(false) }
  }

  const addItem = async (title: string, description: string, imageUrl: string) => {
    try {
      setUploading(true)
      const { error } = await supabase.from('professional_portfolio').insert({ professional_id: proId, title, description, image_url: imageUrl })
      if (error) throw error
      await loadPortfolio()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    } finally { setUploading(false) }
  }

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from('professional_portfolio').delete().eq('id', id)
      if (error) throw error
      await loadPortfolio()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  return { portfolio, uploading, uploadImage, addItem, deleteItem }
}