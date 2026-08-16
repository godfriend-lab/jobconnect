// @ts-nocheck
'use client'
import { useState } from 'react'
import { Upload, X, Loader2, Trash2 } from 'lucide-react'

export default function PortfolioView({ portfolio, uploading, uploadImage, addItem, deleteItem }: any) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    const res = await uploadImage(file)
    if (res.success) setImage(res.publicUrl)
    else alert('❌ Erreur upload image')
  }

  const handleAdd = async () => {
    if (!title || !image) return alert('Veuillez remplir le titre et ajouter une photo')
    const success = await addItem(title, desc, image)
    if (success) {
      setTitle(''); setDesc(''); setImage(null); setPreview(null)
      alert('✅ Réalisation ajoutée avec succès')
    }
  }

  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"
  const inputBg = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"

  return (
    <div className="space-y-8">
      <div><h1 className={`text-2xl font-bold ${textPrimary}`}>Mes Réalisations</h1><p className={`text-sm ${textSecondary}`}>Montrez vos meilleurs travaux</p></div>
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Ajouter une réalisation</h2>
        <div className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du projet" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows={3} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
          <div>
            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Photo</label>
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="h-40 rounded-xl object-cover shadow-lg" />
                <button onClick={() => { setPreview(null); setImage(null) }} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <label className={`flex items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer dark:border-slate-700 hover:border-indigo-500 transition-all`}>
                <div className="text-center"><Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" /><p className={`text-sm ${textSecondary}`}>Cliquez pour uploader</p></div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
              </label>
            )}
          </div>
          <button onClick={handleAdd} disabled={uploading || !title || !image} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50">{uploading ? <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> : null} Ajouter</button>
        </div>
      </div>
      {portfolio.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.map((item: any) => (
            <div key={item.id} className={`${cardBg} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all`}>
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className={`font-bold ${textPrimary} mb-2`}>{item.title}</h3>
                <p className={`text-sm ${textSecondary} mb-3`}>{item.description}</p>
                <button onClick={() => deleteItem(item.id)} className="text-red-600 text-sm flex items-center gap-1 hover:underline font-semibold"><Trash2 className="w-4 h-4" /> Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}