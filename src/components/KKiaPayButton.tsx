// @ts-nocheck
'use client'

import { KkiapayButton } from 'kkiapay-react'

interface KKiaPayButtonProps {
  amount: number
  phone: string
  reason: string
  onSuccess: (response: any) => void
  onFailure?: () => void
}

export default function KKiaPayButtonCustom({ 
  amount, 
  phone, 
  reason, 
  onSuccess, 
  onFailure 
}: KKiaPayButtonProps) {
  
  return (
    <KkiapayButton
      amount={amount.toString()}
      phone={phone}
      reason={reason}
      sandbox={process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === 'true'}
      publicKey={process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY}
      onSuccess={(response) => {
        console.log('✅ Paiement réussi :', response)
        onSuccess(response)
      }}
      onFailure={() => {
        console.log('❌ Paiement échoué ou annulé')
        if (onFailure) onFailure()
      }}
      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
    >
      Payer {amount.toLocaleString()} FCFA
    </KkiapayButton>
  )
}