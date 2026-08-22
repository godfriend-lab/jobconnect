// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// Initialisation du client Supabase "Admin" (contourne les règles de sécurité pour le webhook)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-kkiapay-signature') || request.headers.get('signature')

    console.log('🔔 Webhook KKiaPay reçu:', body)

    // 1. Vérification de la signature (Sécurité)
    if (signature && process.env.KKIAPAY_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.KKIAPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(body))
        .digest('hex')

      if (signature !== expectedSignature) {
        console.error('❌ Signature webhook invalide')
        return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
      }
    }

    const { transactionId, status, amount, phone, external_id } = body

    // 2. Enregistrer la transaction dans la base de données
    const { error: dbError } = await supabaseAdmin
      .from('payment_transactions')
      .insert({
        transaction_id: transactionId,
        external_id: external_id,
        amount: amount,
        phone: phone,
        status: status?.toLowerCase() || 'unknown',
        kkiapay_response: body,
        created_at: new Date().toISOString(),
      })

    if (dbError) console.error('Erreur log transaction:', dbError)

    // 3. Si le paiement est réussi, on active l'abonnement
    if (status === 'SUCCESS' || status === 'APPROVED') {
      // On récupère les infos depuis l'external_id (format: "userId:planName:billingCycle")
      const parts = external_id?.split(':')
      const userId = parts[0]
      const planName = parts[1]
      const billingCycle = parts[2] || 'monthly'

      if (userId && planName) {
        const now = new Date()
        const endDate = new Date(now)
        
        // Calcul de la date de fin
        if (billingCycle === 'annual') {
          endDate.setFullYear(endDate.getFullYear() + 1)
        } else {
          endDate.setMonth(endDate.getMonth() + 1)
        }

        // Mise à jour du profil de l'utilisateur
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: planName, // Ex: "Starter", "Business"
            plan_start_date: now.toISOString(),
            plan_end_date: endDate.toISOString(),
            plan_billing_cycle: billingCycle,
            updated_at: now.toISOString(),
          })
          .eq('id', userId)

        if (updateError) {
          console.error('❌ Erreur activation abonnement:', updateError)
        } else {
          console.log(`✅ Abonnement ${planName} activé pour l'utilisateur ${userId}`)
        }
      }
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('❌ Erreur critique webhook:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}