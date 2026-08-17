// @ts-nocheck
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function useClientDashboard() {
  const router = useRouter()
  
  // États
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any[]>([])
  const [filteredServices, setFilteredServices] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [contactHistory, setContactHistory] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  
  // États de recherche
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  // États paramètres
  const [settings, setSettings] = useState({
    fullName: '', email: '', phone: '', city: '',
    notifications: true, emailAlerts: true, smsAlerts: false
  })

  // Chargement initial
  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      loadContactHistory()
      loadFavorites()
    }
  }, [profile])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory, searchQuery, selectedCity])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      if (!profileData) { router.push('/login'); return }
      if (profileData.role === 'pro') { router.push('/dashboard/pro'); return }

      setProfile(profileData)
      
      const { data: settingsData } = await supabase.from('user_settings').select('*').eq('id', session.user.id).maybeSingle()
      setSettings({
        fullName: profileData.full_name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        city: profileData.city || '',
        notifications: settingsData?.notifications ?? true,
        emailAlerts: settingsData?.email_alerts ?? true,
        smsAlerts: settingsData?.sms_alerts ?? false
      })
    } catch (error) {
      console.error('Erreur chargement profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadServices = useCallback(async () => {
    try {
      const { data: servicesData } = await supabase.from('services').select('*').eq('is_active', true).order('created_at', { ascending: false })
      if (!servicesData) { setServices([]); return }

      const proIds = [...new Set(servicesData.map(s => s.pro_id))]
      const { data: profilesData } = await supabase.from('profiles').select('id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, is_available, city').in('id', proIds)

      const profilesMap = new Map((profilesData || []).map(p => [p.id, {
        id: p.id, full_name: p.full_name || 'Professionnel', phone: p.phone || '',
        avatar_url: p.avatar_url || null, specialty: p.specialty || '', rating: p.rating || 0,
        total_reviews: p.total_reviews || 0, plan: p.plan || 'Gratuit', is_verified: p.is_verified || false,
        is_available: p.is_available !== false, city: p.city || ''
      }]))

      const combined = servicesData.filter(s => profilesMap.has(s.pro_id)).map(s => ({
        ...s, city: s.city || profilesMap.get(s.pro_id)?.city || null, profiles: profilesMap.get(s.pro_id)!
      }))
      setServices(combined)
    } catch (error) {
      console.error('Erreur services:', error)
      setServices([])
    }
  }, [])

  const loadContactHistory = async () => {
    if (!profile) return
    try {
      const { data: historyData } = await supabase.from('contact_history').select('*').eq('client_id', profile.id).order('created_at', { ascending: false }).limit(20)
      if (!historyData) { setContactHistory([]); return }

      const proIds = [...new Set(historyData.map(h => h.pro_id))]
      const { data: prosData } = await supabase.from('profiles').select('id, full_name, specialty, city, phone, avatar_url').in('id', proIds)
      const prosMap = new Map(prosData?.map(p => [p.id, p]) || [])

      setContactHistory(historyData.map(item => {
        const pro = prosMap.get(item.pro_id)
        return { ...item, proName: pro?.full_name || 'Professionnel', specialty: pro?.specialty || 'Service', city: pro?.city || '', phone: pro?.phone || '', avatar: pro?.avatar_url }
      }))
    } catch (error) {
      console.error('Erreur historique:', error)
    }
  }

  const loadFavorites = async () => {
    if (!profile) return
    try {
      const { data: favData } = await supabase.from('favorites').select('*').eq('client_id', profile.id)
      if (!favData) { setFavorites([]); return }

      const proIds = favData.map(f => f.pro_id)
      const { data: prosData } = await supabase.from('profiles').select('id, full_name, specialty, city, phone, rating, plan, total_reviews, is_verified, is_available, avatar_url').in('id', proIds)
      
      setFavorites((prosData || []).map(p => ({
        id: p.id, full_name: p.full_name, specialty: p.specialty, city: p.city || '', phone: p.phone,
        rating: p.rating || 0, plan: p.plan || 'Gratuit', total_reviews: p.total_reviews || 0,
        is_verified: p.is_verified || false, is_available: p.is_available !== false, avatar_url: p.avatar_url || undefined
      })))
    } catch (error) {
      console.error('Erreur favoris:', error)
    }
  }

  const filterServices = () => {
    let filtered = [...services]
    if (selectedCategory !== 'all') filtered = filtered.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase())
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.profiles.full_name.toLowerCase().includes(q) || s.profiles.specialty.toLowerCase().includes(q) || (s.city && s.city.toLowerCase().includes(q)))
    }
    if (selectedCity !== 'all') {
      const cityLower = selectedCity.toLowerCase().trim()
      filtered = filtered.filter(s => (s.city?.toLowerCase().trim() || '') === cityLower)
    }

    filtered.sort((a, b) => {
      const scores = { 'Premium': 1000, 'Business': 500, 'Starter': 200, 'Gratuit': 0 }
      let scoreA = (scores[a.profiles.plan] || 0) + (a.profiles.rating || 0) * 150 + (a.profiles.total_reviews || 0) * 15 + (a.profiles.is_verified ? 100 : 0)
      let scoreB = (scores[b.profiles.plan] || 0) + (b.profiles.rating || 0) * 150 + (b.profiles.total_reviews || 0) * 15 + (b.profiles.is_verified ? 100 : 0)
      if (scoreA !== scoreB) return scoreB - scoreA
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    setFilteredServices(filtered)
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingPhoto(true)
      const file = e.target.files?.[0]
      if (!file || !profile) return
      if (file.size > 5 * 1024 * 1024) { alert('La photo doit faire moins de 5MB'); return }
      if (!file.type.startsWith('image/')) { alert('Veuillez sélectionner une image valide'); return }

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { cacheControl: '3600', upsert: true })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id)
      
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('✅ Photo de profil mise à jour')
    } catch (error) { 
      alert('❌ Erreur upload photo') 
    } finally { 
      setUploadingPhoto(false) 
    }
  }

  const saveSettings = async () => {
    if (!profile) return
    try {
      await supabase.from('profiles').update({ full_name: settings.fullName, phone: settings.phone, city: settings.city }).eq('id', profile.id)
      await supabase.from('user_settings').upsert({
        id: profile.id, notifications: settings.notifications, email_alerts: settings.emailAlerts, sms_alerts: settings.smsAlerts, updated_at: new Date().toISOString()
      })
      setProfile({ ...profile, full_name: settings.fullName })
      alert('✅ Paramètres sauvegardés')
    } catch (error) {
      alert('❌ Erreur sauvegarde')
    }
  }

  const toggleFavorite = async (pro: any) => {
    if (!profile) return
    try {
      const exists = favorites.find(f => f.id === pro.id)
      if (exists) {
        await supabase.from('favorites').delete().eq('client_id', profile.id).eq('pro_id', pro.id)
        setFavorites(favorites.filter(f => f.id !== pro.id))
      } else {
        await supabase.from('favorites').insert({ client_id: profile.id, pro_id: pro.id })
        setFavorites([...favorites, pro])
      }
    } catch (error) {
      console.error('Erreur favori:', error)
    }
  }

  const contactWhatsApp = async (service: any) => {
    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) phone = '+' + phone
      else if (phone.startsWith('9') || phone.startsWith('7')) phone = '+228' + phone
    }

    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur JobConnect. Pouvez-vous me donner plus d'informations ?`)

    if (profile) {
      try {
        await supabase.from('contact_history').insert({ client_id: profile.id, pro_id: pro.id, status: 'contacted', contact_method: 'whatsapp' })
        loadContactHistory() // Rafraîchir l'historique
      } catch (err) { console.error('Erreur historique:', err) }
    }
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return {
    profile, loading, services, filteredServices, favorites, contactHistory,
    uploadingPhoto, selectedCategory, searchQuery, selectedCity, citySearchQuery, showCityDropdown, settings,
    setSelectedCategory, setSearchQuery, setSelectedCity, setCitySearchQuery, setShowCityDropdown, setSettings,
    loadServices, handlePhotoUpload, saveSettings, toggleFavorite, contactWhatsApp, handleLogout
  }
}