// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Essayer d'abord la table "professionals"
    const { data: professionals, error: profError } = await supabaseAdmin
      .from('professionals')
      .select('*')
      .order('created_at', { ascending: false })

    if (!profError && professionals) {
      return NextResponse.json({ professionals })
    }

    // Sinon récupérer tous les users avec role = professional
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filtrer les utilisateurs qui ont un rôle professionnel
    const professionalsList = data.users.filter(
      u => u.user_metadata?.role === 'professional' || 
           u.user_metadata?.user_type === 'professional'
    )

    return NextResponse.json({ professionals: professionalsList })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}