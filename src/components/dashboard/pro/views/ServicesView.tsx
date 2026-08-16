// @ts-nocheck
'use client'
import { useState } from 'react'
import { Plus, Briefcase, Edit3, Save, Loader2, CheckCircle2, Settings } from 'lucide-react'
import { categoriesMetiers } from '@/lib/constants'

export default function ServicesView({ services, uploading, publishService, updateService }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceDesc, setServiceDesc] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceCategory, setServiceCategory] = useState('')

  const handlePublish = async () => {
    if (!serviceTitle || !serviceDesc || !servicePrice || !serviceCategory) return alert('Veuillez remplir tous les champs')
    const success = await publishService({ title: serviceTitle, description: serviceDesc, price: servicePrice, category: serviceCategory, city: 'Lomé' })
    if (success) {
      setServiceTitle(''); setServiceDesc(''); setServicePrice(''); setServiceCategory('')
      alert('✅ Service publié avec succès !')
    } else {
      alert('❌ Erreur lors de la publication')
    }
  }

  const handleUpdate = async () => {
    if (!serviceTitle || !serviceDesc || !servicePrice || !serviceCategory || !editingServiceId) return alert('Veuillez remplir tous les champs')
    const success = await updateService(editingServiceId, { title: serviceTitle, description: serviceDesc, price: servicePrice, category: serviceCategory, city: 'Lomé' })
    if (success) {
      setIsEditing(false); setEditingServiceId(null)
      setServiceTitle(''); setServiceDesc(''); setServicePrice(''); setServiceCategory('')
      alert('✅ Service mis à jour avec succès !')
    }
  }

  const startEdit = (service: any) => {
    setIsEditing(true)
    setEditingServiceId(service.id)
    setServiceTitle(service.title)
    setServiceDesc(service.description)
    setServicePrice(service.price)
    setServiceCategory(service.category)
  }

  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"
  const inputBg = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Service</h1>
        <p className={`text-sm ${textSecondary}`}>{services.length > 0 ? "Vous avez déjà publié votre service. Vous pouvez le modifier ci-dessous." : "Publiez votre premier service pour être visible sur la marketplace."}</p>
      </div>

      {services.length === 0 ? (
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}><Plus className="w-5 h-5 text-indigo-500" /> Publier mon service</h2>
          <div className="space-y-4">
            <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Titre du service *</label><input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder="Ex: Installation électrique complète" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
            <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Description détaillée *</label><textarea value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} placeholder="Décrivez votre service..." rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Prix (FCFA) *</label><input type="text" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="Ex: 50000" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
              <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Catégorie *</label><input list="categories-metiers" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} placeholder="Tapez ou sélectionnez..." className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /><datalist id="categories-metiers">{[...new Set(categoriesMetiers)].map((cat) => (<option key={cat} value={cat} />))}</datalist></div>
            </div>
            <button onClick={handlePublish} disabled={uploading || !serviceTitle || !serviceDesc || !servicePrice || !serviceCategory} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />} Publier le service
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {!isEditing ? (
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2"><Briefcase className="w-6 h-6 text-indigo-500" /><h3 className={`text-2xl font-bold ${textPrimary}`}>{services[0].title}</h3></div>
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold capitalize">{services[0].category}</span>
                </div>
                <div className="text-right"><span className="text-3xl font-black text-emerald-600">{services[0].price} <span className="text-lg font-medium text-slate-500">FCFA</span></span></div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-6"><p className={`${textSecondary} whitespace-pre-wrap leading-relaxed`}>{services[0].description}</p></div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => startEdit(services[0])} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"><Edit3 className="w-5 h-5" /> Modifier le service</button>
                <span className="px-4 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Service actif et visible</span>
              </div>
            </div>
          ) : (
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
              <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}><Settings className="w-5 h-5 text-indigo-500" /> Modifier mon service</h2>
              <div className="space-y-4">
                <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Titre du service *</label><input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
                <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Description détaillée *</label><textarea value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Prix (FCFA) *</label><input type="text" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /></div>
                  <div><label className={`block text-sm font-medium ${textSecondary} mb-2`}>Catégorie *</label><input list="categories-metiers" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} /><datalist id="categories-metiers">{[...new Set(categoriesMetiers)].map((cat) => (<option key={cat} value={cat} />))}</datalist></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleUpdate} disabled={uploading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">{uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Enregistrer</button>
                  <button onClick={() => { setIsEditing(false); setEditingServiceId(null); setServiceTitle(''); setServiceDesc(''); setServicePrice(''); setServiceCategory('') }} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all">Annuler</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}