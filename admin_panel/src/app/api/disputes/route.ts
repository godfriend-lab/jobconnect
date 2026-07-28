// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Essayer la table "disputes"
    const { data: disputes, error } = await supabaseAdmin
      .from('disputes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ disputes: [], message: 'Table disputes non trouvée' })
    }

    return NextResponse.json({ disputes: disputes || [] })
  } catch (err) {
    console.error('Erreur API:', err)
    return NextResponse.json({ disputes: [], message: err.message })
  }
}