// @ts-nocheck
'use client'
import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'

export default function ProfileView({ profile, updateProfile, uploadAvatar }: any) {
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || '', specialty: profile?.specialty || '', city: profile?.city || '',
    phone: profile?.phone || '', bio: profile?.bio || '', experience_years: profile?.experience_years || 0
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return alert('Aucun fichier sélectionné')
    if (file.size > 5 * 1024 * 1024) return alert('La photo doit faire moins de 5MB')
    if (!file.type.startsWith('image/')) return alert('Veuillez sélectionner une image valide')
    
    setUploading(true)
    const res = await uploadAvatar(file)
    if (res.success) alert('✅ Photo de profil mise à jour')
    else alert('❌ Erreur upload photo')
    setUploading(false)
  }

  const handleSave = async () => {
    const res = await updateProfile(profileData)
    if (res.success) alert('✅ Profil sauvegardé avec succès')
    else alert('❌ Erreur lors de la sauvegarde')
  }

  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"
  const inputBg = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"

  return (
    <div className="max-w-3xl space-y-6">
      <div><h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Profil</h1><p className={`text-sm ${textSecondary}`}>Gérez vos informations publiques</p></div>
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Photo de profil</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-200 shadow-lg border-4 border-indigo-100 dark:border-indigo-900 flex-shrink-0">
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-5xl bg-linear-to-br from-indigo-500 to-purple-600 text-white font-bold">{profile?.full_name?.charAt(0).toUpperCase() || 'P'}</div>}
          </div>
          <div className="flex-1 space-y-3">
            <p className={`text-sm ${textSecondary}`}>💡 <strong>Conseil format :</strong> Photo carrée (1:1) ou portrait, bien éclairée. Max 5MB.</p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition-all font-semibold shadow-md">
              <Upload className="w-5 h-5" /> Changer la photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
            {uploading && <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium"><Loader2 className="w-4 h-4 animate-spin" /> Upload en cours...</div>}
          </div>
        </div>
      </div>
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Informations publiques</h2>
        <div className="space-y-4">
          {[{ label: 'Nom complet', key: 'full_name', type: 'text' }, { label: 'Spécialité', key: 'specialty', type: 'text' }, { label: 'Ville', key: 'city', type: 'text' }, { label: 'Téléphone (WhatsApp)', key: 'phone', type: 'tel' }, { label: 'Années d\'expérience', key: 'experience_years', type: 'number' }].map((field: any) => (
            <div key={field.key}>
              <label className={`block text-sm font-medium ${textSecondary} mb-2`}>{field.label}</label>
              <input type={field.type} value={profileData[field.key]} onChange={(e) => setProfileData({...profileData, [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
            </div>
          ))}
          <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Bio / Description</label><textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
          <button onClick={handleSave} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all">Sauvegarder</button>
        </div>
      </div>
    </div>
  )
}