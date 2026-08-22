// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    // 1. Récupérer le body et la signature
    const body = await request.json()
    const signature = request.headers.get('x-kkiapay-signature')

    console.log(' Webhook reçu:', body)

    // 2. ✅ VÉRIFICATION DE LA SIGNATURE (CRITIQUE POUR LA SÉCURITÉ)
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.KKIAPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(body))
        .digest('hex')

      if (signature !== expectedSignature) {
        console.error('❌ Signature invalide - Requête suspecte !')
        return NextResponse.json(
          { error: 'Signature invalide' },
          { status: 401 }
        )
      }
      console.log('✅ Signature vérifiée avec succès')
    }

    const supabase = createClient()

    // 3. Extraire les données
    const {
      transactionId,
      status,
      amount,
      phone,
      external_id,
    } = body

    // 4. Mettre à jour la transaction en base
    const { data: transaction } = await supabase
      .from('payment_transactions')
      .update({
        status: status?.toLowerCase() || 'unknown',
        kkiapay_response: body,
        updated_at: new Date().toISOString(),
      })
      .eq('transaction_id', transactionId)
      .select()
      .single()

    // 5. Si paiement réussi → Activer l'abonnement
    if (status === 'SUCCESS' || status === 'APPROVED') {
      await activateSubscription(supabase, transaction)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('❌ Erreur webhook:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

async function activateSubscription(supabase, transaction) {
  const { plan_id, billing_period, user_id } = transaction
  
  const now = new Date()
  const endDate = new Date(now)
  
  if (billing_period === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1)
  } else {
    endDate.setMonth(endDate.getMonth() + 1)
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      plan: plan_id?.charAt(0).toUpperCase() + plan_id?.slice(1) || 'Starter',
      plan_start_date: now.toISOString(),
      plan_end_date: endDate.toISOString(),
      plan_billing_period: billing_period || 'monthly',
      updated_at: now.toISOString(),
    })
    .eq('id', user_id)

  if (error) {
    console.error('❌ Erreur activation:', error)
  } else {
    console.log(`✅ Abonnement activé pour ${user_id}`)
  }
}