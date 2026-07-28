import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Utiliser la table 'transactions' (celle qu'on a créée)
    const { data: transactions, error } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ 
        payments: [], 
        error: error.message 
      })
    }

    return NextResponse.json({ 
      payments: transactions || [],
      total: transactions?.length || 0
    })
  } catch (err: any) {
    console.error('Erreur API:', err)
    return NextResponse.json({ 
      payments: [], 
      error: err.message 
    }, { status: 500 })
  }
}