// @ts-nocheck
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: string
  amount: number
  userId: string
  userEmail: string
}

export default function PaymentModal({
  isOpen,
  onClose,
  plan,
  amount,
  userId,
  userEmail,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/paydunya/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          amount,
          userId,
          userEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du paiement")
      }

      // Rediriger vers la page de paiement PayDunya
      window.location.href = data.checkout_url
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A]">Paiement</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Paiement réussi !
                </h3>
                <p className="text-[#6B7280] mb-6">
                  Votre abonnement {plan} est maintenant actif
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#4F46E5] text-white px-6 py-3 rounded-xl font-medium"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                {/* Résumé */}
                <div className="bg-[#F9FAFB] rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#6B7280]">Forfait</span>
                    <span className="font-bold text-[#0F172A]">{plan}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#6B7280]">Durée</span>
                    <span className="font-bold text-[#0F172A]">1 mois</span>
                  </div>
                  <div className="border-t border-gray-200 my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#0F172A]">Total</span>
                    <span className="text-2xl font-bold text-[#4F46E5]">
                      {amount.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

                {/* Méthodes de paiement */}
                <div className="mb-6">
                  <p className="text-sm text-[#6B7280] mb-3">
                    Méthodes de paiement acceptées :
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 text-center">
                      <Smartphone className="w-8 h-8 text-[#4F46E5] mx-auto mb-2" />
                      <p className="text-sm font-medium text-[#0F172A]">
                        Mobile Money
                      </p>
                    </div>
                    <div className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-4 text-center">
                      <CreditCard className="w-8 h-8 text-[#4F46E5] mx-auto mb-2" />
                      <p className="text-sm font-medium text-[#0F172A]">
                        Carte bancaire
                      </p>
                    </div>
                  </div>
                </div>

                {/* Erreur */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Bouton payer */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#4F46E5]/50 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Payer {amount.toLocaleString()} FCFA
                    </>
                  )}
                </button>

                <p className="text-xs text-[#6B7280] text-center mt-4">
                  Paiement sécurisé par PayDunya
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}