// @ts-nocheck
import { Settings, User, Shield, Upload, Loader2, Sparkles } from 'lucide-react'

export default function SettingsView({ profile, settings, setSettings, uploadingPhoto, onPhotoUpload, onSaveSettings }: any) {
  return (
    <div className="space-y-8 max-w-4xl animate-fade-in-up">
      <style>{`@keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }`}</style>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/50"><Settings className="w-5 h-5 text-purple-400" /></div>
        <h1 className="text-2xl font-black text-white">Paramètres du compte</h1>
      </div>
      
      <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8">
        <h2 className="font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" /> Photo de profil
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-800 shadow-lg ring-4 ring-indigo-900/50 flex-shrink-0 transition-all duration-300 group-hover:ring-indigo-500/50">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover object-center" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                  {profile?.full_name?.charAt(0).toUpperCase() || 'C'}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-slate-400 leading-relaxed">
              💡 <strong className="text-white">Conseil :</strong> Pour un rendu professionnel optimal, utilisez une photo <strong className="text-white">carrée (1:1)</strong> ou en portrait, bien éclairée. Formats acceptés : JPG, PNG (Max 5MB).
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl cursor-pointer transition-all font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
              <Upload className="w-4 h-4" /> Changer la photo
              <input type="file" accept="image/*" onChange={onPhotoUpload} className="hidden" disabled={uploadingPhoto} />
            </label>
            {uploadingPhoto && (
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                <Loader2 className="w-4 h-4 animate-spin" /> Upload en cours...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8">
        <h2 className="font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" /> Informations personnelles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Nom complet</label>
            <input type="text" value={settings.fullName} onChange={(e) => setSettings({...settings, fullName: e.target.value})} className="w-full px-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Email</label>
            <input type="email" value={settings.email} disabled className="w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-800 text-slate-500 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Téléphone</label>
            <input type="tel" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all bg-slate-800 text-white" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Ville</label>
            <input type="text" value={settings.city} onChange={(e) => setSettings({...settings, city: e.target.value})} className="w-full px-4 py-3 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all bg-slate-800 text-white" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button onClick={onSaveSettings} className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Sauvegarder les modifications
        </button>
      </div>
    </div>
  )
}