// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Upload, Loader2, User } from 'lucide-react'

export default function ProfileView({ profile, updateProfile, uploadAvatar, loadProfile }: any) {
  const [profileData, setProfileData] = useState({
    full_name: '',
    specialty: '',
    city: '',
    phone: '',
    bio: '',
    years_of_experience: 0
  })
  
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  // ✅ Synchroniser l'état local avec le profil
  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        specialty: profile.specialty || '',
        city: profile.city || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        years_of_experience: profile.years_of_experience || 0
      })
    }
  }, [profile])

  // ✅ Upload d'image de profil CORRIGÉ
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      alert('Veuillez sélectionner une image valide (JPG, PNG, WebP)')
      return
    }
    
    setUploading(true)
    try {
      const res = await uploadAvatar(file)
      
      if (res === true || res?.success) {
        alert('✅ Photo de profil mise à jour avec succès')
        
        // ✅ CORRECTION 1 : Rafraîchir les données du profil de manière fluide
        if (typeof loadProfile === 'function') {
          await loadProfile()
        } else {
          // Fallback uniquement si loadProfile n'est pas disponible
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      } else {
        alert('❌ Erreur lors de l\'upload: ' + (res?.error || 'Erreur inconnue'))
      }
    } catch (error) {
      console.error('Erreur upload:', error)
      alert('❌ Erreur lors de l\'upload de la photo')
    } finally {
      setUploading(false)
    }
  }

  // ✅ Sauvegarde du profil
  const handleSave = async () => {
    if (!profile) {
      alert('Erreur: Profil non chargé')
      return
    }
    
    setSaving(true)
    try {
      const res = await updateProfile(profileData)
      
      if (res === true || res?.success) {
        alert('✅ Profil sauvegardé avec succès !')
        
        // ✅ CORRECTION 2 : Rafraîchissement fluide après sauvegarde
        if (typeof loadProfile === 'function') {
          await loadProfile()
        } else {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }
      } else {
        alert('❌ Erreur lors de la sauvegarde: ' + (res?.error || 'Vérifiez votre connexion'))
      }
    } catch (error) {
      console.error('Erreur critique sauvegarde:', error)
      alert('❌ Une erreur inattendue est survenue')
    } finally {
      setSaving(false)
    }
  }

  // Styles
  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"
  const inputBg = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Mon Profil</h1>
        <p className={`text-sm ${textSecondary}`}>Gérez vos informations publiques visibles sur la marketplace</p>
      </div>

      {/* Carte 1: Photo de profil */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
          <User className="w-5 h-5 text-indigo-600" />
          Photo de profil
        </h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar avec CACHE-BUSTER pour forcer l'affichage de la nouvelle image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-lg border-4 border-indigo-100 dark:border-indigo-900 flex-shrink-0">
            {profile?.avatar_url ? (
              <img 
                src={`${profile.avatar_url}?v=${Date.now()}`} 
                alt="Photo de profil" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-5xl font-bold">
                {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
              </div>
            )}
          </div>

          {/* Infos upload */}
          <div className="flex-1 space-y-4">
            <div className={`text-sm ${textSecondary} space-y-1`}>
              <p>💡 <strong>Conseils :</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-xs">
                <li>Photo carrée (1:1) ou portrait recommandée</li>
                <li>Image claire et professionnelle</li>
                <li>Taille maximale: 5MB</li>
                <li>Formats: JPG, PNG, WebP</li>
              </ul>
            </div>
            
            <label className={`inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl cursor-pointer transition-all font-semibold shadow-md ${uploading ? 'cursor-not-allowed' : ''}`}>
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              {uploading ? 'Upload en cours...' : 'Changer la photo'}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                disabled={uploading} 
              />
            </label>
          </div>
        </div>
      </div>

      {/* Carte 2: Informations publiques */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>
          Informations publiques
        </h2>
        
        <div className="space-y-5">
          {/* Nom complet */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profileData.full_name}
              onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputBg}`}
              placeholder="Ex: Jean Dupont"
            />
          </div>

          {/* Spécialité */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
              Spécialité <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profileData.specialty}
              onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputBg}`}
              placeholder="Ex: Développeur Web, Plombier..."
            />
          </div>

          {/* Ville et Téléphone sur une ligne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Ville
              </label>
              <input
                type="text"
                value={profileData.city}
                onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputBg}`}
                placeholder="Ex: Lomé"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                Téléphone (WhatsApp)
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputBg}`}
                placeholder="Ex: 90000000"
              />
            </div>
          </div>

          {/* Années d'expérience */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
              Années d'expérience
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={profileData.years_of_experience}
              onChange={(e) => setProfileData({...profileData, years_of_experience: parseInt(e.target.value) || 0})}
              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${inputBg}`}
            />
          </div>

          {/* Bio / Description */}
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
              Bio / Description
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              rows={5}
              maxLength={500}
              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none ${inputBg}`}
              placeholder="Décrivez votre parcours, vos compétences et ce qui vous rend unique..."
            />
            <p className={`text-xs ${textSecondary} mt-1 text-right`}>
              {profileData.bio.length}/500 caractères
            </p>
          </div>

          {/* Bouton Sauvegarder */}
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sauvegarde en cours...
                </>
              ) : (
                <>
                  💾 Sauvegarder les modifications
                </>
              )}
            </button>
            
            {saving && (
              <p className={`text-sm ${textSecondary}`}>
                Veuillez patienter...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className={`${cardBg} rounded-xl p-4 border-l-4 border-indigo-500`}>
        <p className={`text-sm ${textSecondary}`}>
          <strong>ℹ️ Information :</strong> Les modifications apportées à votre profil seront visibles sur la marketplace et le dashboard client après sauvegarde.
        </p>
      </div>
    </div>
  )
}