// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

// Hooks & Layout
import { useClientDashboard } from '@/hooks/dashboard/useClientDashboard'
import ClientLayout from '@/components/dashboard/client/ClientLayout'

// Views
import MarketplaceView from '@/components/dashboard/client/views/MarketplaceView'
import HistoryView from '@/components/dashboard/client/views/HistoryView'
import FavoritesView from '@/components/dashboard/client/views/FavoritesView'
import SettingsView from '@/components/dashboard/client/views/SettingsView'

// Modals & Constants
import LeaveReviewModal from '@/components/LeaveReviewModal'
import { allCities, marqueeCategories } from '@/lib/clientConstants'

type ActiveView = 'marketplace' | 'history' | 'favorites' | 'settings'

export default function ClientDashboardPage() {
  // 1. États locaux
  const [activeView, setActiveView] = useState<ActiveView>('marketplace')
  
  // État consolidé pour le modal d'avis (plus propre que 3 useState séparés)
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    proId: '',
    proName: ''
  })

  // 2. Initialisation du Hook (Regroupé par logique pour la lisibilité)
  const {
    // Données
    profile, 
    loading, 
    filteredServices, 
    favorites, 
    contactHistory,
    
    // Filtres & Recherche
    searchQuery, setSearchQuery, 
    selectedCity, setSelectedCity,
    citySearchQuery, setCitySearchQuery, 
    showCityDropdown, setShowCityDropdown,
    
    // Paramètres
    settings, setSettings, 
    uploadingPhoto,
    
    // Actions
    loadServices, 
    handlePhotoUpload, 
    saveSettings, 
    toggleFavorite, 
    contactWhatsApp, 
    handleLogout
  } = useClientDashboard()

  // 3. Effets
  useEffect(() => {
    loadServices()
    // Note: Si loadServices change de référence, cela peut déclencher un re-rendu. 
    // Assure-toi qu'il est mémorisé (useCallback) dans ton hook.
  }, [loadServices])

  // 4. Handlers
  const openReviewModal = (proId: string, proName: string) => {
    setReviewModal({ isOpen: true, proId, proName })
  }

  const closeReviewModal = () => {
    setReviewModal({ isOpen: false, proId: '', proName: '' })
  }

  const handleReviewSuccess = () => {
    closeReviewModal()
    // Idéalement, remplace cette alert par un composant Toast/Notification
    alert('✅ Merci pour votre avis ! Il a été publié avec succès.')
  }

  // 5. Rendu conditionnel des vues
  const renderView = () => {
    switch (activeView) {
      case 'marketplace':
        return (
          <MarketplaceView 
            filteredServices={filteredServices} 
            favorites={favorites}
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            selectedCategory="all" 
            setSelectedCategory={() => {}} // TODO: Connecter le filtre catégorie si besoin
            selectedCity={selectedCity} 
            setSelectedCity={setSelectedCity}
            citySearchQuery={citySearchQuery} 
            setCitySearchQuery={setCitySearchQuery}
            showCityDropdown={showCityDropdown} 
            setShowCityDropdown={setShowCityDropdown}
            marqueeCategories={marqueeCategories}
            onToggleFavorite={toggleFavorite}
            onContact={contactWhatsApp}
          />
        )
      case 'history':
        return (
          <HistoryView 
            contactHistory={contactHistory} 
            onRequestReview={openReviewModal} 
          />
        )
      case 'favorites':
        return (
          <FavoritesView 
            favorites={favorites} 
            onToggleFavorite={toggleFavorite} 
            onContact={contactWhatsApp} 
            onGoToMarketplace={() => setActiveView('marketplace')} 
          />
        )
      case 'settings':
        return (
          <SettingsView 
            profile={profile} 
            settings={settings} 
            setSettings={setSettings} 
            uploadingPhoto={uploadingPhoto} 
            onPhotoUpload={handlePhotoUpload} 
            onSaveSettings={saveSettings} 
          />
        )
      default:
        return null
    }
  }

  // 6. Écran de chargement (Early Return pour éviter les bugs d'affichage)
  if (loading || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">Chargement de votre espace...</p>
      </div>
    )
  }

  // 7. Rendu principal
  return (
    <>
      <ClientLayout
        activeView={activeView}
        setActiveView={setActiveView}
        profile={profile}
        handleLogout={handleLogout}
        loading={loading}
        // Props de recherche passées au layout (si le header du client en a besoin)
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        citySearchQuery={citySearchQuery}
        setCitySearchQuery={setCitySearchQuery}
        showCityDropdown={showCityDropdown}
        setShowCityDropdown={setShowCityDropdown}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        allCities={allCities}
        marqueeCategories={marqueeCategories}
      >
        {renderView()}
      </ClientLayout>

      {/* Modal d'avis */}
      {reviewModal.isOpen && (
        <LeaveReviewModal
          proId={reviewModal.proId}
          proName={reviewModal.proName}
          onClose={closeReviewModal}
          onSuccess={handleReviewSuccess}
        />
      )}
    </>
  )
} 