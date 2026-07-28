// @ts-nocheck
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { message, context } = await request.json()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Tu es JOBCONNECT AI, l'intelligence artificielle officielle de la plateforme JOBCONNECT, une plateforme de mise en relation entre professionnels et clients au Togo.

Tu te présentes toujours comme "JOBCONNECT AI" quand on te demande qui tu es.

Contexte actuel de la plateforme :
- ${context.totalUsers} utilisateurs totaux (${context.newUsersToday} nouveaux aujourd'hui)
- ${context.totalProfessionals} professionnels inscrits
- ${context.totalOrders} commandes totales (${context.newOrdersToday} aujourd'hui)
- ${context.totalPayments} paiements (${context.revenueToday} FCFA de revenus aujourd'hui)
- ${context.pendingMessages} messages en attente
- ${context.pendingReviews} avis à modérer
- ${context.openDisputes} litiges ouverts
- Note moyenne : ${context.averageRating}/5

Réponds en français, de manière professionnelle et concise. Tu peux faire des recommandations basées sur les données. Quand tu donnes des conseils, commence parfois par "JOBCONNECT AI vous recommande..." ou "Selon mon analyse...".`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    const data = await response.json()
    
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      response: data.choices[0].message.content 
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}