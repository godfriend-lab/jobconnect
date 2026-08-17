// @ts-nocheck
import { NextResponse } from 'next/server'

// ✅ ALGORITHME DE CALCUL SÉCURISÉ (Côté Serveur)
// Ces prix sont la source de vérité. Le frontend ne peut pas les modifier.
const SECURE_PRICING = {
  starter: { monthly: 2000, annual: 21600 },   // 24000 - 10%
  business: { monthly: 3500, annual: 37800 },  // 42000 - 10%
  premium: { monthly: 7500, annual: 81000 },   // 90000 - 10%
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, planName, billingCycle = 'monthly', userEmail } = body

    // 1. Normaliser le nom du plan pour la sécurité (ex: "Premium" -> "premium")
    const planKey = planName.toLowerCase().trim()

    // 2. VÉRIFICATION DE SÉCURITÉ : Le plan existe-t-il dans notre liste sécurisée ?
    if (!SECURE_PRICING[planKey]) {
      return NextResponse.json(
        { success: false, message: 'Plan d\'abonnement invalide.' }, 
        { status: 400 }
      )
    }

    // 3. CALCUL RÉEL DU MONTANT (On ignore le montant envoyé par le frontend pour éviter la fraude)
    const secureAmount = billingCycle === 'annual' 
      ? SECURE_PRICING[planKey].annual 
      : SECURE_PRICING[planKey].monthly

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // 4. Appel à l'API de paiement (KKiaPay en mode démo ou réel)
    // Note: Remplacez cette partie par votre vraie intégration KKiaPay quand vous aurez les clés
    const response = await fetch('https://api.kkiapay.me/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KKIAPAY_PRIVATE_KEY}`
      },
      body: JSON.stringify({
        amount: secureAmount, // ← C'est ICI que le montant sécurisé est utilisé
        api_key: process.env.KKIAPAY_PUBLIC_KEY,
        sandbox: process.env.KKIAPAY_SANDBOX === 'true',
        callback_url: `${baseUrl}/api/webhook/kkiapay`,
        redirect_url: `${baseUrl}/dashboard/pro?payment=success&plan=${planKey}`,
        email: userEmail || '',
        phone: ''
      })
    })

    const data = await response.json()

    if (response.ok && data.url) {
      return NextResponse.json({
        success: true,
        checkoutUrl: data.url,
        transactionId: data.transactionId,
        calculatedAmount: secureAmount // Pour le logging/débogage
      })
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || 'Erreur lors de la création de la transaction KKiaPay'
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Erreur API Checkout:', error)
    return NextResponse.json({
      success: false,
      message: 'Erreur interne du serveur lors du traitement du paiement'
    }, { status: 500 })
  }
}