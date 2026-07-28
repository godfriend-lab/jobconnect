// @ts-nocheck
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { data } = await request.json()

    const prompt = `Tu es JOBCONNECT AI, l'intelligence artificielle de la plateforme JOBCONNECT.

Génère un résumé journalier professionnel et détaillé pour la plateforme JOBCONNECT basé sur ces données :

📊 STATISTIQUES DU JOUR :
- Nouveaux utilisateurs : ${data.newUsersToday} (total: ${data.totalUsers})
- Nouvelles commandes : ${data.newOrdersToday} (total: ${data.totalOrders})
- Revenus aujourd'hui : ${data.revenueToday} FCFA
- Revenus totaux : ${data.totalRevenue} FCFA
- Messages en attente : ${data.pendingMessages}
- Avis à modérer : ${data.pendingReviews}
- Litiges ouverts : ${data.openDisputes}
- Note moyenne : ${data.averageRating}/5

Format le résumé ainsi :
1.  Vue d'ensemble (2-3 phrases commençant par "JOBCONNECT AI analyse...")
2. 📈 Points positifs
3. ️ Points d'attention
4. 💡 Recommandations actionnables (commence par "JOBCONNECT AI recommande...")
5.  Objectifs pour demain

Sois précis, utilise les chiffres exacts, et donne des insights actionnables. Réponds en français. Termine par une phrase signée "— JOBCONNECT AI".`

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
            content: 'Tu es JOBCONNECT AI, un analyste business expert qui génère des résumés exécutifs précis et actionnables pour la plateforme JOBCONNECT.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    })

    const result = await response.json()
    
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      summary: result.choices[0].message.content 
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}