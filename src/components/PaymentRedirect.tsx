// @ts-nocheck
'use client'

import { useState } from 'react'
import { Loader2, Smartphone, AlertCircle } from 'lucide-react'

export default function PaymentRedirect({ 
  amount, 
  phone, 
  reason, 
  userId, 
  planName, 
  billingCycle, 
  onSuccess 
}: any) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = () => {
    setLoading(true)
    setError('')
    
    // Vérifier que la clé publique existe
    const publicKey = process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY
    if (!publicKey) {
      setError('❌ Clé API KKiaPay non configurée')
      setLoading(false)
      return
    }

    // Création d'un identifiant unique pour KKiaPay
    const externalId = `${userId}:${planName}:${billingCycle}`
    
    console.log('🔗 URL de paiement:')
    console.log('- Public Key:', publicKey)
    console.log('- Amount:', amount)
    console.log('- Phone:', phone)
    console.log('- External ID:', externalId)

    const params = new URLSearchParams({
      amount: amount.toString(),
      phone: phone.replace(/\s+/g, ''),
      reason: reason,
      external_id: externalId,
      sandbox: process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === 'true' ? 'true' : 'false',
    })

    const paymentUrl = `https://app.kkiapay.me/p/${publicKey}?${params.toString()}`
    
    console.log('🚀 URL complète:', paymentUrl)
    
    // Ouvrir KKiaPay
    window.open(paymentUrl, '_blank')
    
    setTimeout(() => {
      setLoading(false)
      onSuccess({ 
        status: 'PENDING_WEBHOOK',
        externalId,
        amount 
      })
    }, 3000)
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirection...
          </>
        ) : (
          <>
            <Smartphone className="w-5 h-5" />
            Payer {amount.toLocaleString()} FCFA
          </>
        )}
      </button>
    </div>
  )
}