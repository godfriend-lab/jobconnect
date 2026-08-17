// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// Hooks
import { useProfile } from '@/hooks/dashboard/useProfile'
import { useServices } from '@/hooks/dashboard/useServices'
import { usePortfolio } from '@/hooks/dashboard/usePortfolio'
import { useReviews } from '@/hooks/dashboard/useReviews'

// Layout & Views
import ProLayout from '@/components/dashboard/pro/ProLayout'
import DashboardHome from '@/components/dashboard/pro/views/DashboardHome'
import ServicesView from '@/components/dashboard/pro/views/ServicesView'
import ProfileView from '@/components/dashboard/pro/views/ProfileView'
import PortfolioView from '@/components/dashboard/pro/views/PortfolioView'
import ReviewsView from '@/components/dashboard/pro/views/ReviewsView'
import SubscriptionView from '@/components/dashboard/pro/views/SubscriptionView'
import VerificationView from '@/components/dashboard/pro/views/VerificationView'

import { Loader2 } from 'lucide-react'

export default function ProDashboardPage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState('dashboard')
  
  // 1. Charger les données via les hooks
  const { profile, loading, darkMode, setDarkMode, updateProfile, uploadAvatar } = useProfile()
  const { services, uploading: servicesUploading, publishService, updateService } = useServices(profile?.id)
  const { portfolio, uploading: portfolioUploading, uploadImage, addItem, deleteItem } = usePortfolio(profile?.id)
  const { reviews, stats } = useReviews(profile?.id)

  // ✅ CORRECTION 1 : Ne pas utiliser useState. Dériver la valeur directement de profile.
  // Ainsi, dès que profile se met à jour, isAvailable se met à jour automatiquement partout.
  const isAvailable = profile?.is_available !== false

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  // ✅ CORRECTION 2 : Handler robuste avec gestion d'erreur
  const handleToggleAvailability = async () => {
    const newStatus = !isAvailable
    
    try {
      // On met à jour via le hook. 
      // (Le hook useProfile DOIT mettre à jour son état local après cet appel, voir note plus bas)
      const success = await updateProfile({ is_available: newStatus })
      
      if (!success) {
        throw new Error("Échec de la mise à jour")
      }
      
      // Optionnel : petit feedback visuel
      console.log(`✅ Statut changé : ${newStatus ? 'DISPONIBLE' : 'INDISPONIBLE'}`)
    } catch (error) {
      console.error("Erreur toggle disponibilité:", error)
      alert("❌ Erreur lors du changement de statut. Veuillez réessayer.")
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // 3. Rendu conditionnel des vues
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardHome 
            profile={profile} 
            stats={stats} 
            services={services} 
            isAvailable={isAvailable} 
            onToggleAvailability={handleToggleAvailability} 
            onNavigate={setActiveView} 
          />
        )
      case 'services':
        return <ServicesView services={services} uploading={servicesUploading} publishService={publishService} updateService={updateService} />
      case 'profile':
        return <ProfileView profile={profile} updateProfile={updateProfile} uploadAvatar={uploadAvatar} />
      case 'portfolio':
        return <PortfolioView portfolio={portfolio} uploading={portfolioUploading} uploadImage={uploadImage} addItem={addItem} deleteItem={deleteItem} />
      case 'reviews':
        return <ReviewsView reviews={reviews} stats={stats} />
      case 'subscription':
        return <SubscriptionView profile={profile} />
      case 'verification':
        return <VerificationView profile={profile} />
      default:
        return <DashboardHome profile={profile} stats={stats} services={services} isAvailable={isAvailable} onToggleAvailability={handleToggleAvailability} onNavigate={setActiveView} />
    }
  }

  // 4. Assemblage final
  return (
    <ProLayout
      activeView={activeView}
      setActiveView={setActiveView}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      handleLogout={handleLogout}
      profile={profile} // ✅ Ajouté : pour que le Layout puisse afficher le nom/avatar
      isAvailable={isAvailable} // ✅ Ajouté : pour afficher un indicateur vert/rouge dans le header si voulu
    >
      {renderView()}
    </ProLayout>
  )
}