// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    const { data: settings, error } = await supabaseAdmin
      .from('app_settings')
      .select('*')
      .single()

    if (error) {
      // Retourner les valeurs par défaut si la table n'existe pas
      return NextResponse.json({
        settings: getDefaultSettings(),
        message: 'Utilisation des paramètres par défaut'
      })
    }

    return NextResponse.json({ settings: settings || getDefaultSettings() })
  } catch (err: any) {
    return NextResponse.json({ settings: getDefaultSettings(), message: err.message })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from('app_settings')
      .upsert(body, { onConflict: 'id' })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ settings: data, success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function getDefaultSettings() {
  return {
    id: 1,
    site_name: 'JOBCONNECT',
    site_description: 'Plateforme de mise en relation professionnels et clients',
    site_url: 'https://jobconnect.tg',
    logo_url: '',
    favicon_url: '',
    primary_color: '#4F46E5',
    secondary_color: '#7C3AED',
    support_email: 'support@jobconnect.tg',
    contact_email: 'contact@jobconnect.tg',
    contact_phone: '+228 90 00 00 00',
    address: 'Lomé, Togo',
    commission_rate: 15,
    min_withdrawal: 5000,
    payment_methods: ['mobile_money', 'card'],
    currency: 'FCFA',
    maintenance_mode: false,
    allow_registration: true,
    require_email_verification: true,
    two_factor_required: false,
    session_duration: 24,
    max_login_attempts: 5,
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    marketing_emails: true,
    plans: {
      free: { name: 'Gratuit', price: 0, features: ['Profil basique', '5 candidatures/mois'] },
      starter: { name: 'Starter', price: 5000, features: ['Badge Starter', '20 candidatures/mois', 'Support prioritaire'] },
      business: { name: 'Business', price: 12000, features: ['Badge Business', 'Candidatures illimitées', 'Statistiques avancées', 'Support 24/7'] },
      premium: { name: 'Premium', price: 20000, features: ['Badge Premium', 'Tout illimité', 'Account manager dédié', 'API access', 'Mise en avant'] }
    },
    categories: ['Plomberie', 'Électricité', 'Ménage', 'Jardinage', 'Informatique', 'Couture', 'Mécanique', 'Construction'],
    cities: ['Lomé', 'Kara', 'Sokodé', 'Kpalimé', 'Atakpamé', 'Dapaong', 'Tsévié'],
    terms_url: '',
    privacy_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}