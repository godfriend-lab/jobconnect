// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Essayer la table "orders"
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      // Retourner un tableau vide au lieu d'une erreur
      return NextResponse.json({ orders: [], message: 'Table orders non trouvée ou vide' })
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (err) {
    console.error('Erreur API:', err)
    return NextResponse.json({ orders: [], message: err.message }, { status: 200 })
  }
}