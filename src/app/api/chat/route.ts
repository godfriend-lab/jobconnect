// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 1. Récupération sécurisée de la clé API (depuis .env.local)
    // ⚠️ À l'avenir, mettez votre vraie clé dans .env.local sous le nom GROQ_API_KEY
    const apiKey = process.env.GROQ_API_KEY 

    // Si la clé n'est pas configurée, on renvoie une erreur propre sans crasher le serveur
    if (!apiKey) {
      return NextResponse.json(
        { reply: "️ Le mode IA avancé n'est pas encore activé. Veuillez configurer la clé API." },
        { status: 500 }
      )
    }

    const { messages, userMessage, userRole } = await request.json()

    // 2. Construction du prompt système (Le "cerveau" de l'IA)
    const systemPrompt = `Tu es "JOBI", l'assistant IA expert de PROKORB, la marketplace N°1 des services au Togo (Ideenwerk Technologies).
RÈGLES : 0% de commission. Tarifs : Gratuit, Starter (2000F), Business (3500F), Premium (7500F). Annuel = -10%. Badge vérifié = 5000F/an.
Sois chaleureux, concis, et réponds toujours en français.`

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userMessage }
    ]

    // 3. Appel à l'API (Groq par exemple)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // ✅ Modèle stable et rapide (à ajuster selon votre futur fournisseur)
        model: 'llama-3.1-8b-instant', 
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 600,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur API:', errorText)
      return NextResponse.json({ reply: "⚠️ Erreur de connexion au service IA." }, { status: 502 })
    }

    const data = await response.json()
    
    return NextResponse.json({
      reply: data.choices[0].message.content,
    })

  } catch (error) {
    console.error('Erreur Chat API:', error)
    return NextResponse.json(
      { reply: "⚠️ Erreur technique du serveur." },
      { status: 500 }
    )
  }
}