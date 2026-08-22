// @ts-nocheck
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, CheckCircle, AlertCircle, Loader2, FileText } from 'lucide-react'

export default function VerificationPage() {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [existingDoc, setExistingDoc] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    id_card: null as File | null,
    criminal_record: null as File | null,
    qualification: null as File | null,
  })

  // Vérifier si un document existe déjà
  useEffect(() => {
    checkExistingDocument()
  }, [])

  const checkExistingDocument = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('verification_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single()

    if (data) {
      setExistingDoc(data)
      if (data.status === 'pending') setSubmitted(true)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }))
    }
  }

  const uploadFile = async (file: File, userId: string, fieldName: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${fieldName}-${Date.now()}.${fileExt}`
    
    const { error } = await supabase.storage
      .from('verification-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error
    
    const { data } = supabase.storage
      .from('verification-documents')
      .getPublicUrl(fileName)
    
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Non authentifié')

      // Créer le bucket si nécessaire
      const { error: bucketError } = await supabase.storage.createBucket('verification-documents', {
        public: false,
        fileSizeLimit: 5242880 // 5MB
      })

      // Upload des fichiers
      const idCardUrl = await uploadFile(formData.id_card!, user.id, 'id-card')
      const criminalRecordUrl = await uploadFile(formData.criminal_record!, user.id, 'criminal-record')
      const qualificationUrl = formData.qualification 
        ? await uploadFile(formData.qualification, user.id, 'qualification')
        : null

      // Sauvegarder dans la base
      const { error } = await supabase
        .from('verification_documents')
        .insert({
          user_id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          id_card_url: idCardUrl,
          criminal_record_url: criminalRecordUrl,
          qualification_url: qualificationUrl,
          status: 'pending'
        })

      if (error) throw error

      setSubmitted(true)
    } catch (error: any) {
      console.error('Erreur:', error)
      alert('Erreur lors de la soumission: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (existingDoc?.status === 'approved') {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-emerald-900 mb-2">
            Profil Vérifié !
          </h2>
          <p className="text-emerald-700">
            Votre badge de vérification est affiché sur votre profil. Les clients vous font davantage confiance.
          </p>
        </div>
      </div>
    )
  }

  if (existingDoc?.status === 'rejected') {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-black text-red-900">Vérification Refusée</h2>
          </div>
          <p className="text-red-700 mb-4">
            {existingDoc.admin_note || 'Les documents fournis ne sont pas conformes.'}
          </p>
          <button
            onClick={() => {
              setExistingDoc(null)
              setSubmitted(false)
            }}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Soumettre à nouveau
          </button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-blue-50 border-2 border-blue-500 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-black text-blue-900 mb-2">
            En cours de vérification
          </h2>
          <p className="text-blue-700">
            Vos documents ont été soumis. Notre équipe les examine. Vous recevrez une notification sous 24-48h.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Vérification de Profil</h1>
        <p className="text-slate-600">
          Soumettez vos documents pour obtenir le badge vérifié et gagner la confiance des clients.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">
        {/* Informations personnelles */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Informations Personnelles
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Votre nom tel qu'il apparaît sur la CNI"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: 90000000"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Documents Requis *</h3>
          
          {/* Carte d'identité */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Carte d'identité ou Passeport (Recto-Verso)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                required
                onChange={(e) => handleFileChange(e, 'id_card')}
                className="hidden"
                id="id-card"
              />
              <label htmlFor="id-card" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm text-slate-600">
                  {formData.id_card ? formData.id_card.name : 'Cliquez pour uploader'}
                </span>
              </label>
            </div>
          </div>

          {/* Casier judiciaire */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Casier Judiciaire (moins de 3 mois)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                required
                onChange={(e) => handleFileChange(e, 'criminal_record')}
                className="hidden"
                id="criminal-record"
              />
              <label htmlFor="criminal-record" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm text-slate-600">
                  {formData.criminal_record ? formData.criminal_record.name : 'Cliquez pour uploader'}
                </span>
              </label>
            </div>
          </div>

          {/* Qualification */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Justificatif de Qualification (Optionnel)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, 'qualification')}
                className="hidden"
                id="qualification"
              />
              <label htmlFor="qualification" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-sm text-slate-600">
                  {formData.qualification ? formData.qualification.name : 'Diplôme, certification...'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Important :</strong> Assurez-vous que tous les documents sont lisibles et à jour. 
            Le processus de vérification prend 24 à 48 heures.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Soumission en cours...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Soumettre ma demande de vérification
            </>
          )}
        </button>
      </form>
    </div>
  )
}