// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Essayer la table "reviews"
    const { data: reviews, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ reviews: [], message: 'Table reviews non trouvée' })
    }

    return NextResponse.json({ reviews: reviews || [] })
  } catch (err) {
    console.error('Erreur API:', err)
    return NextResponse.json({ reviews: [], message: err.message }, { status: 200 })
  }
}