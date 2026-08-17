// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useClientDashboard } from '@/hooks/dashboard/useClientDashboard'
import ClientLayout from '@/components/dashboard/client/ClientLayout'
import MarketplaceView from '@/components/dashboard/client/views/MarketplaceView'
import HistoryView from '@/components/dashboard/client/views/HistoryView'
import FavoritesView from '@/components/dashboard/client/views/FavoritesView'
import SettingsView from '@/components/dashboard/client/views/SettingsView'
import LeaveReviewModal from '@/components/LeaveReviewModal'
import { allCities, marqueeCategories } from '@/lib/clientConstants'

export default function ClientDashboardPage() {
  const [activeView, setActiveView] = useState<'marketplace' | 'history' | 'favorites' | 'settings'>('marketplace')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedProId, setSelectedProId] = useState('')
  const [selectedProName, setSelectedProName] = useState('')

  // Initialisation du Hook
  const {
    profile, loading, filteredServices, favorites, contactHistory,
    uploadingPhoto, searchQuery, setSearchQuery, selectedCity, setSelectedCity,
    citySearchQuery, setCitySearchQuery, showCityDropdown, setShowCityDropdown,
    settings, setSettings, loadServices, handlePhotoUpload, saveSettings, 
    toggleFavorite, contactWhatsApp, handleLogout
  } = useClientDashboard()

  // Chargement des services au montage
  useEffect(() => {
    loadServices()
  }, [loadServices])

  const handleRequestReview = (proId: string, proName: string) => {
    setSelectedProId(proId)
    setSelectedProName(proName)
    setShowReviewModal(true)
  }

  const renderView = () => {
    switch (activeView) {
      case 'marketplace':
        return (
          <MarketplaceView 
            filteredServices={filteredServices} 
            favorites={favorites}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            selectedCategory="all" setSelectedCategory={() => {}} // À connecter si on ajoute le filtre catégorie dans le hook
            selectedCity={selectedCity} setSelectedCity={setSelectedCity}
            citySearchQuery={citySearchQuery} setCitySearchQuery={setCitySearchQuery}
            showCityDropdown={showCityDropdown} setShowCityDropdown={setShowCityDropdown}
            marqueeCategories={marqueeCategories}
            onToggleFavorite={toggleFavorite}
            onContact={contactWhatsApp}
          />
        )
      case 'history':
        return <HistoryView contactHistory={contactHistory} onRequestReview={handleRequestReview} />
      case 'favorites':
        return <FavoritesView favorites={favorites} onToggleFavorite={toggleFavorite} onContact={contactWhatsApp} onGoToMarketplace={() => setActiveView('marketplace')} />
      case 'settings':
        return <SettingsView profile={profile} settings={settings} setSettings={setSettings} uploadingPhoto={uploadingPhoto} onPhotoUpload={handlePhotoUpload} onSaveSettings={saveSettings} />
      default:
        return null
    }
  }

  return (
    <>
      <ClientLayout
        activeView={activeView}
        setActiveView={setActiveView}
        profile={profile}
        handleLogout={handleLogout}
        loading={loading}
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

      {showReviewModal && (
        <LeaveReviewModal
          proId={selectedProId}
          proName={selectedProName}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            setShowReviewModal(false)
            alert('✅ Merci pour votre avis ! Il a été publié avec succès.')
          }}
        />
      )}
    </>
  )
}