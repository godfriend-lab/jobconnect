// @ts-nocheck
'use client'
import { Shield, CheckCircle2, FileText } from 'lucide-react'

export default function VerificationView({ profile }: any) {
  const cardBg = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  const textPrimary = "text-slate-900 dark:text-white"
  const textSecondary = "text-slate-600 dark:text-slate-400"

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div><h1 className={`text-2xl font-bold ${textPrimary}`}>Vérification d'identité</h1><p className={`text-sm ${textSecondary}`}>Obtenez le badge bleu "Pro Vérifié" pour inspirer une confiance maximale.</p></div>
      <div className={`${cardBg} rounded-3xl p-8 md:p-12 shadow-sm`}>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto md:mx-0 shadow-lg shadow-blue-500/30 mb-4"><Shield className="w-12 h-12 text-white" /></div>
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>Badge Vérifié</h3>
              <p className={`text-3xl font-black text-indigo-600 mb-1`}>5 000 FCFA <span className="text-sm font-medium text-slate-500">/an</span></p>
              <p className={`text-xs ${textSecondary}`}>Paiement unique annuel</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h4 className={`font-bold ${textPrimary} mb-3`}>Pourquoi se faire vérifier ?</h4>
              <ul className="space-y-3">
                {['Badge bleu exclusif sur votre profil', 'Apparition en priorité dans les résultats', 'Confiance accrue des clients (3x plus de contacts)', 'Indépendant de votre abonnement visibilité'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className={`text-sm ${textSecondary}`}>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className={`p-4 rounded-xl ${profile?.is_verified ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'} border`}>
              <h4 className={`font-bold ${textPrimary} mb-2 flex items-center gap-2`}><FileText className="w-4 h-4 text-indigo-500" /> Documents requis</h4>
              <ul className={`text-sm ${textSecondary} space-y-1 list-disc list-inside`}>
                <li>Pièce d'identité valide (CNI ou Passeport)</li>
                <li>Casier judiciaire vierge (moins de 3 mois)</li>
                <li>Justificatif de qualification (Diplôme, attestation)</li>
              </ul>
            </div>
            <button onClick={() => alert("Le système de paiement pour la vérification sera activé très prochainement. Préparez vos documents !")} className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <Shield className="w-5 h-5" /> Lancer ma vérification (5 000 FCFA)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}