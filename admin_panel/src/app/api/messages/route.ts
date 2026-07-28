// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Essayer la table "messages" ou "support_tickets"
    const { data: messages, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ messages: [], message: 'Table messages non trouvée' })
    }

    return NextResponse.json({ messages: messages || [] })
  } catch (err) {
    console.error('Erreur API:', err)
    return NextResponse.json({ messages: [], message: err.message }, { status: 200 })
  }
}