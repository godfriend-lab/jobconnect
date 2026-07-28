// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  Home, Star, Settings, LogOut, CheckCircle, Clock, Upload, 
  Shield, Loader2, Menu, X, Crown, Award, Image as ImageIcon,
  Trash2, Sun, Moon, Heart, Bot, CheckCircle2, AlertCircle, 
  Play, Pause, Save, Phone, MessageCircle, ExternalLink, Briefcase,
  Plus, Eye, Zap, FileText, Camera, Globe, Rocket
} from 'lucide-react'

export default function ProDashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState('dashboard')
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [stats, setStats] = useState({
    completedMissions: 0,
    pendingMissions: 0,
    rating: 0,
    totalReviews: 0
  })

  const [recentViewers, setRecentViewers] = useState<any[]>([])

  const [profileData, setProfileData] = useState({
    full_name: '',
    specialty: '',
    city: '',
    phone: '',
    bio: '',
    experience_years: 0
  })

  const [portfolio, setPortfolio] = useState<any[]>([])
  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [portfolioDesc, setPortfolioDesc] = useState('')
  const [portfolioImage, setPortfolioImage] = useState<string | null>(null)

  const [services, setServices] = useState<any[]>([])
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceDesc, setServiceDesc] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceCategory, setServiceCategory] = useState('')

  const [verificationStatus, setVerificationStatus] = useState('pending')
  const [idCardFile, setIdCardFile] = useState<File | null>(null)
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null)
  const [reviews, setReviews] = useState<any[]>([])

  const [autoMessages, setAutoMessages] = useState({
    welcome: { enabled: false, message: '' },
    unavailable: { enabled: false, message: '' },
    thankYou: { enabled: false, message: '' }
  })
  const [isAvailable, setIsAvailable] = useState(true)

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

  useEffect(() => {
    if (profile) {
      loadStats()
      loadPortfolio()
      loadServices()
      loadVerificationStatus()
      loadReviews()
      loadAutoMessages()
      loadRecentViewers()
    }
  }, [profile])

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
        console.error('Erreur chargement profil:', error)
        router.push('/login')
        return 
      }

      setProfile(profileData)
      setIsAvailable(profileData.is_available !== false)
      setProfileData({
        full_name: profileData.full_name || '',
        specialty: profileData.specialty || '',
        city: profileData.city || '',
        phone: profileData.phone || '',
        bio: profileData.bio || '',
        experience_years: profileData.experience_years || 0
      })
    } catch (error) {
      console.error('Erreur loadProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    if (!profile) return
    try {
      const { count: completedCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('professional_id', profile.id)
        .eq('status', 'terminee')

      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('professional_id', profile.id)
        .in('status', ['en_attente', 'en_cours'])

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewee_id', profile.id)
      
      const avgRating = reviewsData && reviewsData.length > 0
        ? reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsData.length
        : 0

      setStats({
        completedMissions: completedCount || 0,
        pendingMissions: pendingCount || 0,
        rating: avgRating,
        totalReviews: reviewsData?.length || 0
      })
    } catch (error) {
      console.error('Erreur stats:', error)
    }
  }

  const loadRecentViewers = async () => {
    if (!profile) return
    try {
      const { data } = await supabase
        .from('profile_views_history')
        .select('*')
        .eq('pro_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (data) setRecentViewers(data)
    } catch (error) {
      console.error('Erreur chargement visiteurs:', error)
    }
  }

  const loadPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('professional_portfolio')
        .select('*')
        .eq('professional_id', profile.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        setPortfolio([])
        return
      }
      if (data) setPortfolio(data)
    } catch (error) { 
      setPortfolio([])
    }
  }

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('pro_id', profile.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        setServices([])
        return
      }
      if (data) setServices(data)
    } catch (error) { 
      setServices([])
    }
  }

  const loadVerificationStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('professional_verification')
        .select('status')
        .eq('professional_id', profile.id)
        .maybeSingle()
      
      if (error) {
        setVerificationStatus('pending')
        return
      }
      if (data) setVerificationStatus(data.status)
    } catch (error) { 
      setVerificationStatus('pending')
    }
  }

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('reviewee_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      if (data) setReviews(data)
    } catch (error) { 
      console.error('Erreur reviews:', error)
    }
  }

  const loadAutoMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('auto_messages')
        .select('*')
        .eq('professional_id', profile.id)
        .maybeSingle()
      
      if (error) {
        return
      }
      if (data) {
        setAutoMessages({
          welcome: { enabled: data.welcome_enabled || false, message: data.welcome_message || '' },
          unavailable: { enabled: data.unavailable_enabled || false, message: data.unavailable_message || '' },
          thankYou: { enabled: data.thankyou_enabled || false, message: data.thankyou_message || '' }
        })
      }
    } catch (error) { 
      console.error('Erreur auto messages:', error)
    }
  }

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file || !profile) {
        alert('Aucun fichier sélectionné')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La photo doit faire moins de 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide')
        return
      }

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })
      
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)
      
      if (updateError) throw updateError
      
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('✅ Photo de profil mise à jour')
    } catch (error) { 
      console.error('Erreur upload photo:', error)
      alert(' Erreur upload photo de profil') 
    } finally { 
      setUploading(false) 
    }
  }

  const handlePortfolioImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/${Date.now()}.${fileExt}`
      
      const { error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file)
      
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName)
      
      setPortfolioImage(publicUrl)
    } catch (error) { 
      console.error('Erreur upload portfolio:', error)
      alert('❌ Erreur upload image') 
    } finally { 
      setUploading(false) 
    }
  }

  const handlePortfolioUpload = async () => {
    if (!portfolioTitle || !portfolioImage || !profile) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    try {
      setUploading(true)
      const { error } = await supabase
        .from('professional_portfolio')
        .insert({
          professional_id: profile.id,
          title: portfolioTitle,
          description: portfolioDesc,
          image_url: portfolioImage
        })
      
      if (error) throw error
      
      setPortfolioTitle('')
      setPortfolioDesc('')
      setPortfolioImage(null)
      await loadPortfolio()
      alert('✅ Réalisation ajoutée avec succès')
    } catch (error) { 
      console.error('Erreur ajout portfolio:', error)
      alert('❌ Erreur lors de l\'ajout') 
    } finally { 
      setUploading(false) 
    }
  }

  const handleServicePublish = async () => {
    if (!serviceTitle || !serviceDesc || !servicePrice || !serviceCategory || !profile) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    try {
      setUploading(true)
      
      const { data, error } = await supabase
        .from('services')
        .insert({
          pro_id: profile.id,
          title: serviceTitle,
          description: serviceDesc,
          price: servicePrice,
          category: serviceCategory,
          city: profile.city || 'Lomé',
          is_active: true
        })
        .select()
      
      if (error) throw error
      
      setServiceTitle('')
      setServiceDesc('')
      setServicePrice('')
      setServiceCategory('')
      await loadServices()
      alert('✅ Service publié avec succès !')
    } catch (error) { 
      console.error('❌ Erreur publication service:', error)
      alert(`❌ Erreur: ${error.message}`)
    } finally { 
      setUploading(false) 
    }
  }

  const handleVerificationSubmit = async () => {
    if (!idCardFile || !diplomaFile || !profile) {
      alert('⚠️ Les deux documents sont obligatoires')
      return
    }
    
    try {
      setUploading(true)
      
      const idCardPath = `${profile.id}/id-card/${Date.now()}.${idCardFile.name.split('.').pop()}`
      const { error: idCardError } = await supabase.storage
        .from('verification-docs')
        .upload(idCardPath, idCardFile)
      
      if (idCardError) throw idCardError
      
      const { data: { publicUrl: idCardUrl } } = supabase.storage
        .from('verification-docs')
        .getPublicUrl(idCardPath)
      
      const diplomaPath = `${profile.id}/diploma/${Date.now()}.${diplomaFile.name.split('.').pop()}`
      const { error: diplomaError } = await supabase.storage
        .from('verification-docs')
        .upload(diplomaPath, diplomaFile)
      
      if (diplomaError) throw diplomaError
      
      const { data: { publicUrl: diplomaUrl } } = supabase.storage
        .from('verification-docs')
        .getPublicUrl(diplomaPath)
      
      const { error: verificationError } = await supabase
        .from('professional_verification')
        .upsert({
          professional_id: profile.id,
          id_card_url: idCardUrl,
          diploma_url: diplomaUrl,
          status: 'pending',
          submitted_at: new Date().toISOString()
        })
      
      if (verificationError) throw verificationError
      
      setVerificationStatus('pending')
      setIdCardFile(null)
      setDiplomaFile(null)
      alert('✅ Documents envoyés ! Vérification en cours...')
    } catch (error) { 
      console.error('Erreur vérification:', error)
      alert('❌ Erreur lors de l\'envoi des documents') 
    } finally { 
      setUploading(false) 
    }
  }

  const deletePortfolioItem = async (id: string) => {
    if (!confirm('Supprimer cette réalisation ?')) return
    
    try {
      const { error } = await supabase
        .from('professional_portfolio')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await loadPortfolio()
      alert('✅ Réalisation supprimée')
    } catch (error) { 
      console.error('Erreur suppression:', error)
      alert('❌ Erreur lors de la suppression') 
    }
  }

  const saveProfile = async () => {
    if (!profile) return
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', profile.id)
      
      if (error) throw error
      
      setProfile({ ...profile, ...profileData })
      alert('✅ Profil sauvegardé avec succès')
    } catch (error) { 
      console.error('Erreur sauvegarde profil:', error)
      alert('❌ Erreur lors de la sauvegarde') 
    }
  }

  const saveAutoMessages = async () => {
    if (!profile) return
    
    try {
      const { error } = await supabase
        .from('auto_messages')
        .upsert({
          professional_id: profile.id,
          welcome_enabled: autoMessages.welcome.enabled,
          welcome_message: autoMessages.welcome.message,
          unavailable_enabled: autoMessages.unavailable.enabled,
          unavailable_message: autoMessages.unavailable.message,
          thankyou_enabled: autoMessages.thankYou.enabled,
          thankyou_message: autoMessages.thankYou.message
        })
      
      if (error) throw error
      
      alert('✅ Messages automatiques sauvegardés')
    } catch (error) { 
      console.error('Erreur sauvegarde auto messages:', error)
      alert('❌ Erreur lors de la sauvegarde') 
    }
  }

  const toggleAvailability = async () => {
    if (!profile) return
    
    const newStatus = !isAvailable
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: newStatus })
        .eq('id', profile.id)
      
      if (error) throw error
      
      setIsAvailable(newStatus)
      alert(newStatus ? '✅ Vous êtes maintenant disponible' : '⏸️ Mode indisponible activé')
    } catch (error) { 
      console.error('Erreur toggle availability:', error)
      alert(' Erreur lors du changement de statut') 
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const bg = darkMode ? 'bg-slate-950' : 'bg-slate-50'
  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
  const textPrimary = darkMode ? 'text-white' : 'text-slate-900'
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600'
  const inputBg = darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className={`text-lg ${textSecondary}`}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* HEADER */}
      <header className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/pro" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <div>
              <span className="font-bold text-lg text-indigo-600">JOBCONNECT</span>
              <span className={`text-xs ${textSecondary} block`}>Espace Pro</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-105 transition-all`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} lg:hidden`}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-t lg:hidden`}>
            <nav className="p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: Home },
                { id: 'services', label: 'Mes Services', icon: Briefcase },
                { id: 'profile', label: 'Mon Profil', icon: Settings },
                { id: 'portfolio', label: 'Réalisations', icon: ImageIcon },
                { id: 'reviews', label: 'Avis clients', icon: Star },
                { id: 'verification', label: 'Vérification', icon: Shield },
                { id: 'automation', label: 'Automatisation', icon: Bot },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeView === item.id
                      ? 'bg-indigo-600 text-white'
                      : darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <Link href="/pricing" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}>
                <Crown className="w-5 h-5" />
                <span className="font-medium">Forfaits</span>
              </Link>
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-600 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="space-y-2 sticky top-24">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: Home },
              { id: 'services', label: 'Mes Services', icon: Briefcase },
              { id: 'profile', label: 'Mon Profil', icon: Settings },
              { id: 'portfolio', label: 'Réalisations', icon: ImageIcon },
              { id: 'reviews', label: 'Avis clients', icon: Star },
              { id: 'verification', label: 'Vérification', icon: Shield },
              { id: 'automation', label: 'Automatisation', icon: Bot },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeView === item.id
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                    : `${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <Link href="/pricing" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                <Crown className="w-5 h-5" />
                Forfaits
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2">
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Bonjour, {profile?.full_name || 'Pro'} 👋</h1>
                    <p className="text-indigo-100 text-lg">Boostez votre visibilité et développez votre activité</p>
                  </div>
                  <button
                    onClick={toggleAvailability}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg ${
                      isAvailable 
                        ? 'bg-emerald-500 hover:bg-emerald-600' 
                        : 'bg-slate-500 hover:bg-slate-600'
                    }`}
                  >
                    {isAvailable ? <CheckCircle2 className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    {isAvailable ? 'Disponible' : 'Indisponible'}
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Missions terminées', value: stats.completedMissions, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
                  { label: 'En cours', value: stats.pendingMissions, icon: Clock, color: 'from-amber-500 to-orange-600' },
                  { label: 'Note moyenne', value: `${stats.rating.toFixed(1)} `, icon: Star, color: 'from-yellow-500 to-amber-600' },
                ].map((stat, i) => (
                  <div key={i} className={`${cardBg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${textSecondary} mb-1`}>{stat.label}</p>
                    <p className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Viewers */}
                <div className={`lg:col-span-2 ${cardBg} border rounded-2xl p-6 shadow-sm`}>
                  <h2 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                    <Eye className="w-5 h-5 text-indigo-500" />
                    Derniers visiteurs
                  </h2>
                  {recentViewers.length === 0 ? (
                    <p className={`text-sm ${textSecondary} py-8 text-center`}>Aucun visiteur récent</p>
                  ) : (
                    <div className="space-y-3">
                      {recentViewers.map((viewer, index) => (
                        <div key={viewer.id || index} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'} transition-colors`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                              {viewer.viewer_avatar ? (
                                <img src={viewer.viewer_avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                (viewer.viewer_name || 'V').charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <p className={`font-medium text-sm ${textPrimary}`}>{viewer.viewer_name || 'Visiteur anonyme'}</p>
                              <p className={`text-xs ${textSecondary}`}>
                                {new Date(viewer.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h2 className={`text-lg font-semibold ${textPrimary}`}>Actions rapides</h2>
                  <button onClick={() => setActiveView('services')} className={`w-full ${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>Nouveau service</p>
                      <p className={`text-xs ${textSecondary}`}>Ajouter une offre</p>
                    </div>
                  </button>
                  <button onClick={() => setActiveView('portfolio')} className={`w-full ${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>Portfolio</p>
                      <p className={`text-xs ${textSecondary}`}>Montrer votre travail</p>
                    </div>
                  </button>
                  <Link href={`/pro/${profile?.id}`} className={`w-full ${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>Profil public</p>
                      <p className={`text-xs ${textSecondary}`}>Voir ce que voient les clients</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeView === 'services' && (
            <div className="space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mes Services</h1>
                <p className={`text-sm ${textSecondary}`}>Publiez et gérez vos services</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
                  <Plus className="w-5 h-5 text-indigo-500" />
                  Publier un nouveau service
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Titre du service *</label>
                    <input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder="Ex: Installation électrique complète" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Description détaillée *</label>
                    <textarea value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} placeholder="Décrivez votre service..." rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Prix (FCFA) *</label>
                      <input type="text" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="Ex: 50000" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Catégorie *</label>
                      <select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`}>
                        <option value="">Sélectionner...</option>
                        <option value="plumbing">Plomberie</option>
                        <option value="electricity">Électricité</option>
                        <option value="masonry">Maçonnerie</option>
                        <option value="painting">Peinture</option>
                        <option value="carpentry">Menuiserie</option>
                        <option value="mechanic">Mécanique</option>
                        <option value="cleaning">Nettoyage</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={handleServicePublish} disabled={uploading || !serviceTitle || !serviceDesc || !servicePrice || !serviceCategory} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                    Publier le service
                  </button>
                </div>
              </div>

              {services.length > 0 && (
                <div>
                  <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>Services publiés ({services.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(service => (
                      <div key={service.id} className={`${cardBg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-semibold">
                            {service.is_active ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>{service.title}</h3>
                        <p className={`text-sm ${textSecondary} mb-4 line-clamp-2`}>{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-2xl font-bold ${textPrimary}`}>{service.price} FCFA</span>
                          <span className="text-sm text-indigo-600 font-semibold capitalize">{service.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeView === 'profile' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Profil</h1>
                <p className={`text-sm ${textSecondary}`}>Gérez vos informations publiques</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Photo de profil</h2>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 shadow-lg">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                        {profile?.full_name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <label className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition-all font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Changer la photo
                    <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {uploading && <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />}
                </div>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Informations publiques</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Nom complet', key: 'full_name', type: 'text' },
                    { label: 'Spécialité', key: 'specialty', type: 'text' },
                    { label: 'Ville', key: 'city', type: 'text' },
                    { label: 'Téléphone (WhatsApp)', key: 'phone', type: 'tel' },
                    { label: 'Années d\'expérience', key: 'experience_years', type: 'number' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>{field.label}</label>
                      <input type={field.type} value={profileData[field.key as keyof typeof profileData]} onChange={(e) => setProfileData({...profileData, [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Bio / Description</label>
                    <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  </div>
                  <button onClick={saveProfile} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'portfolio' && (
            <div className="space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mes Réalisations</h1>
                <p className={`text-sm ${textSecondary}`}>Montrez vos meilleurs travaux</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Ajouter une réalisation</h2>
                <div className="space-y-4">
                  <input type="text" value={portfolioTitle} onChange={(e) => setPortfolioTitle(e.target.value)} placeholder="Titre du projet" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  <textarea value={portfolioDesc} onChange={(e) => setPortfolioDesc(e.target.value)} placeholder="Description" rows={3} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Photo</label>
                    {portfolioImage ? (
                      <div className="relative inline-block">
                        <img src={portfolioImage} alt="Portfolio" className="h-40 rounded-xl object-cover shadow-lg" />
                        <button onClick={() => setPortfolioImage(null)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className={`flex items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer ${darkMode ? 'border-slate-700 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-500'} transition-all`}>
                        <div className="text-center">
                          <Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                          <p className={`text-sm ${textSecondary}`}>Cliquez pour uploader</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                  <button onClick={handlePortfolioUpload} disabled={uploading || !portfolioImage || !portfolioTitle} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {uploading ? 'Upload...' : 'Ajouter'}
                  </button>
                </div>
              </div>

              {portfolio.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {portfolio.map(item => (
                    <div key={item.id} className={`${cardBg} border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                      <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className={`font-bold ${textPrimary} mb-2`}>{item.title}</h3>
                        <p className={`text-sm ${textSecondary} mb-3`}>{item.description}</p>
                        <button onClick={() => deletePortfolioItem(item.id)} className="text-red-600 text-sm flex items-center gap-1 hover:underline font-semibold">
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'reviews' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Avis Clients</h1>
                  <p className={`text-sm ${textSecondary}`}>Ce que disent vos clients</p>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-3 rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                  <span className="text-2xl font-bold text-white">{stats.rating.toFixed(1)}</span>
                  <span className="text-white/90 font-semibold">({stats.totalReviews} avis)</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className={`${cardBg} border rounded-2xl p-16 text-center shadow-sm`}>
                  <Star className="w-20 h-20 text-slate-300 mx-auto mb-4" />
                  <p className={`text-lg ${textSecondary}`}>Aucun avis pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className={`${cardBg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`font-bold ${textPrimary} text-lg`}>{review.reviewer_name || 'Client'}</h3>
                          <p className={`text-xs ${textSecondary}`}>{new Date(review.created_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className={`${textSecondary} leading-relaxed`}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'verification' && (
            <div className="max-w-2xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Vérification</h1>
                  <p className={`text-sm ${textSecondary}`}>Obtenez le badge "Pro Vérifié"</p>
                </div>
                <span className={`px-6 py-3 rounded-xl text-sm font-semibold shadow-lg ${
                  verificationStatus === 'approved' ? 'bg-emerald-500 text-white' :
                  verificationStatus === 'rejected' ? 'bg-red-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {verificationStatus === 'approved' ? '✅ Vérifié' : verificationStatus === 'rejected' ? '❌ Refusé' : '⏳ En attente'}
                </span>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>Badge "Pro Vérifié"</h3>
                    <p className={`text-sm ${textSecondary}`}>Soumettez vos documents pour obtenir le badge vérifié</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className={`block font-semibold mb-2 ${textPrimary} flex items-center gap-2`}>
                      <FileText className="w-5 h-5 text-indigo-500" />
                      Carte d'identité / Passeport *
                    </label>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setIdCardFile(e.target.files?.[0] || null)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    {idCardFile && <p className="text-xs text-emerald-600 mt-2 font-semibold">✅ {idCardFile.name}</p>}
                  </div>
                  <div>
                    <label className={`block font-semibold mb-2 ${textPrimary} flex items-center gap-2`}>
                      <Award className="w-5 h-5 text-indigo-500" />
                      Diplôme / Certification *
                    </label>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setDiplomaFile(e.target.files?.[0] || null)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    {diplomaFile && <p className="text-xs text-emerald-600 mt-2 font-semibold">✅ {diplomaFile.name}</p>}
                  </div>
                  <button onClick={handleVerificationSubmit} disabled={uploading || !idCardFile || !diplomaFile} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                    Envoyer les documents
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'automation' && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Automatisation</h1>
                <p className={`text-sm ${textSecondary}`}>Configurez des réponses automatiques</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isAvailable ? 'bg-emerald-500' : 'bg-slate-500'}`}>
                      {isAvailable ? <Play className="w-6 h-6 text-white" /> : <Pause className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${textPrimary}`}>Statut de disponibilité</h3>
                      <p className={`text-sm ${textSecondary}`}>{isAvailable ? 'Vous acceptez de nouvelles missions' : 'Vous ne recevez plus de demandes'}</p>
                    </div>
                  </div>
                  <button onClick={toggleAvailability} className={`px-6 py-3 rounded-xl font-semibold transition-all ${isAvailable ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}>
                    {isAvailable ? 'Passer indisponible' : 'Passer disponible'}
                  </button>
                </div>
              </div>

              {[
                { key: 'welcome', label: 'Message de bienvenue', desc: 'Envoyé quand un client vous contacte', icon: Heart },
                { key: 'unavailable', label: 'Message d\'indisponibilité', desc: 'Envoyé quand vous êtes indisponible', icon: AlertCircle },
                { key: 'thankYou', label: 'Message de remerciement', desc: 'Envoyé après une mission terminée', icon: CheckCircle2 },
              ].map(auto => (
                <div key={auto.key} className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <auto.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${textPrimary} text-lg`}>{auto.label}</h3>
                        <p className={`text-sm ${textSecondary}`}>{auto.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={autoMessages[auto.key as keyof typeof autoMessages].enabled} onChange={(e) => setAutoMessages({...autoMessages, [auto.key]: { ...autoMessages[auto.key as keyof typeof autoMessages], enabled: e.target.checked }})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 peer-checked:bg-indigo-600 rounded-full transition peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  {autoMessages[auto.key as keyof typeof autoMessages].enabled && (
                    <textarea value={autoMessages[auto.key as keyof typeof autoMessages].message} onChange={(e) => setAutoMessages({...autoMessages, [auto.key]: { ...autoMessages[auto.key as keyof typeof autoMessages], message: e.target.value }})} placeholder="Votre message automatique..." rows={3} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  )}
                </div>
              ))}

              <button onClick={saveAutoMessages} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
                <Save className="w-5 h-5" /> Sauvegarder les automatisations
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}