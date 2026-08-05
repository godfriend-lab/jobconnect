// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  ArrowLeft, Upload, CheckCircle, XCircle, Clock, 
  CreditCard, FileText, User, Phone, Loader2, ShieldCheck 
} from 'lucide-react'

export default function ProVerificationPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  
  // États du flux
  const [step, setStep] = useState<'check-status' | 'payment' | 'form' | 'success' | 'rejected'>('check-status')
  const [verificationData, setVerificationData] = useState<any>(null)

  // États du formulaire
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [idFile, setIdFile] = useState<File | null>(null)
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null)

  useEffect(() => {
    loadProfileAndStatus()
  }, [])

  const loadProfileAndStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
      setProfile(prof)
      setFullName(prof?.full_name || '')
      setPhone(prof?.phone || '')

      // Vérifier s'il y a déjà une demande
      const { data: verif } = await supabase
        .from('professional_verifications')
        .select('*')
        .eq('pro_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (verif) {
        setVerificationData(verif)
        if (verif.status === 'approved') {
          // Si déjà approuvé, on redirige vers le dashboard
          router.push('/dashboard/pro')
        } else if (verif.status === 'rejected') {
          setStep('rejected')
        } else {
          setStep('success') // En attente
        }
      } else {
        setStep('payment') // Aucune demande, on commence par le paiement
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSimulation = async () => {
    setUploading(true)
    // ⚠️ TODO: INTÉGRATION PAYDUNYA ICI
    // 1. Appeler ton API backend pour créer une session PayDunya.
    // 2. Rediriger l'utilisateur vers l'URL de paiement PayDunya.
    // 3. Au retour (webhook ou callback), passer à l'étape 'form'.
    
    // Simulation pour le développement :
    setTimeout(() => {
      setUploading(false)
      setStep('form')
    }, 1500)
  }

  const handleSubmitVerification = async () => {
    if (!profile || !idFile || !diplomaFile || !fullName || !phone) {
      alert('Veuillez remplir tous les champs et télécharger les deux documents.')
      return
    }

    try {
      setUploading(true)

      // 1. Upload CNI
      const idExt = idFile.name.split('.').pop()
      const idPath = `${profile.id}/cni-${Date.now()}.${idExt}`
      const { error: idError } = await supabase.storage.from('verification-docs').upload(idPath, idFile)
      if (idError) throw idError
      const { data: { publicUrl: idUrl } } = supabase.storage.from('verification-docs').getPublicUrl(idPath)

      // 2. Upload Diplôme
      const dipExt = diplomaFile.name.split('.').pop()
      const dipPath = `${profile.id}/diploma-${Date.now()}.${dipExt}`
      const { error: dipError } = await supabase.storage.from('verification-docs').upload(dipPath, diplomaFile)
      if (diplomaError) throw diplomaError
      const { data: { publicUrl: dipUrl } } = supabase.storage.from('verification-docs').getPublicUrl(dipPath)

      // 3. Enregistrer la demande
      const { error: dbError } = await supabase.from('professional_verifications').insert({
        pro_id: profile.id,
        full_name: fullName,
        phone: phone,
        id_document_url: idUrl,
        diploma_document_url: dipUrl,
        status: 'pending'
      })

      if (dbError) throw dbError

      setStep('success')
    } catch (error) {
      console.error('Erreur soumission:', error)
      alert('❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header simple */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/pro" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour au tableau de bord</span>
          </Link>
          <Logo className="w-8 h-8" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* ÉTAPE 1 : PAIEMENT */}
        {step === 'payment' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vérification d'identité</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Pour obtenir le badge <strong>"Pro Vérifié"</strong> et gagner la confiance des clients, des frais de vérification de <strong>5 000 FCFA / an</strong> sont requis.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Ce que vous obtenez :
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Badge "Vérifié" visible sur votre profil</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Meilleur classement dans les résultats de recherche</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Confiance accrue des clients (+40% de contacts)</li>
              </ul>
            </div>

            <button 
              onClick={handlePaymentSimulation}
              disabled={uploading}
              className="w-full max-w-md py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Payer 5 000 FCFA et continuer'}
            </button>
            <p className="text-xs text-slate-400 mt-4">Paiement sécurisé via PayDunya (T-Money, Flooz, Carte)</p>
          </div>
        )}

        {/* ÉTAPE 2 : FORMULAIRE */}
        {step === 'form' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Paiement confirmé</h2>
                <p className="text-sm text-slate-600">Veuillez maintenant fournir vos documents pour validation.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" /> Nom et Prénoms (tels que sur la CNI)
                  </label>
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Numéro de téléphone
                  </label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  📄 Carte d'Identité ou Passeport (Recto/Verso) *
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600">{idFile ? idFile.name : 'Cliquer pour uploader'}</p>
                    </div>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setIdFile(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  🎓 Diplôme ou Attestation de travail officielle *
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600">{diplomaFile ? diplomaFile.name : 'Cliquer pour uploader'}</p>
                    </div>
                    <input type="file" accept="image/*,.pdf" onChange={(e) => setDiplomaFile(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition"
                >
                  Retour
                </button>
                <button 
                  onClick={handleSubmitVerification}
                  disabled={uploading}
                  className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Soumettre ma demande'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : EN ATTENTE */}
        {step === 'success' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Demande en cours de validation</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Merci ! Notre équipe administrative examine vos documents. Vous serez notifié par email dès que votre badge <strong>"Pro Vérifié"</strong> sera activé (délai moyen : 24-48h).
            </p>
            <Link 
              href="/dashboard/pro" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
            >
              Retourner au tableau de bord
            </Link>
          </div>
        )}

        {/* ÉTAPE 4 : REJETÉ */}
        {step === 'rejected' && (
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vérification rejetée</h2>
            <p className="text-slate-600 mb-4 max-w-md mx-auto">
              Votre demande n'a pas pu être validée. Veuillez vous assurer que les documents sont :
            </p>
            <ul className="text-sm text-slate-600 text-left max-w-md mx-auto mb-8 space-y-2 bg-slate-50 p-4 rounded-xl">
              <li>• Lisibles et non flous</li>
              <li>• Valides (non expirés)</li>
              <li>• Correspondant exactement à votre nom et numéro sur le profil</li>
            </ul>
            
            {verificationData?.rejection_reason && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 text-sm text-left max-w-md mx-auto">
                <strong>Message de l'administrateur :</strong> {verificationData.rejection_reason}
              </div>
            )}

            <button 
              onClick={() => {
                // Reset pour recommencer
                setIdFile(null)
                setDiplomaFile(null)
                setStep('form')
              }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
            >
              Recommencer la vérification
            </button>
          </div>
        )}

      </main>
    </div>
  )
}