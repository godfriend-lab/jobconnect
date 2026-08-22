// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../src/lib/supabase' // ️ ADAPTE LE CHEMIN SELON TA STRUCTURE
import { CheckCircle, XCircle, Eye, Loader2, FileText, Phone, User } from 'lucide-react'

export default function AdminVerificationsPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingDoc, setViewingDoc] = useState<any>(null)
  const [rejectNote, setRejectNote] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    const { data, error } = await supabase
      .from('verification_documents')
      .select(`
        *,
        profiles:user_id (full_name, specialty, email)
      `)
      .eq('status', 'pending')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Erreur:', error)
    } else {
      setDocuments(data || [])
    }
    setLoading(false)
  }

  const handleApprove = async (docId: string) => {
    if (!confirm('Approuver cette vérification ?')) return

    setProcessing(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase.rpc('approve_verification', {
        document_id: docId,
        admin_id: user?.id
      })

      if (error) throw error

      alert('✓ Professionnel vérifié avec succès !')
      loadDocuments()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async (docId: string) => {
    const note = prompt('Raison du refus (obligatoire) :')
    if (!note) return

    setProcessing(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase.rpc('reject_verification', {
        document_id: docId,
        admin_id: user?.id,
        note: note
      })

      if (error) throw error

      alert('Vérification refusée')
      setViewingDoc(null)
      loadDocuments()
    } catch (error: any) {
      alert('Erreur: ' + error.message)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Vérifications en Attente</h1>
          <p className="text-slate-600">{documents.length} demande(s) de vérification à traiter</p>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Tout est à jour !</h2>
            <p className="text-slate-600">Aucune vérification en attente.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {doc.full_name}
                      </h3>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                        En attente
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {doc.profiles?.full_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {doc.phone}
                      </span>
                      <span>Soumis le {new Date(doc.submitted_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de visualisation */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                Documents de {viewingDoc.full_name}
              </h2>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Infos */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Nom complet</label>
                  <p className="text-slate-900 font-medium">{viewingDoc.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Téléphone</label>
                  <p className="text-slate-900 font-medium">{viewingDoc.phone}</p>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900">Documents soumis :</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Carte d'identité</p>
                    <a 
                      href={viewingDoc.id_card_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      Voir le document
                    </a>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Casier judiciaire</p>
                    <a 
                      href={viewingDoc.criminal_record_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      Voir le document
                    </a>
                  </div>

                  {viewingDoc.qualification_url && (
                    <div className="border border-slate-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Qualification</p>
                      <a 
                        href={viewingDoc.qualification_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        Voir le document
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(viewingDoc.id)}
                    disabled={processing}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approuver la vérification
                  </button>
                  <button
                    onClick={() => handleReject(viewingDoc.id)}
                    disabled={processing}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}