// @ts-nocheck
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Récupérer toutes les données de la plateforme
    const [users, professionals, orders, payments, messages, reviews, disputes] = await Promise.all([
      supabaseAdmin.auth.admin.listUsers(),
      supabaseAdmin.from('professionals').select('*'),
      supabaseAdmin.from('orders').select('*'),
      supabaseAdmin.from('payments').select('*'),
      supabaseAdmin.from('messages').select('*'),
      supabaseAdmin.from('reviews').select('*'),
      supabaseAdmin.from('disputes').select('*')
    ])

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Filtrer les données d'aujourd'hui
    const todayUsers = users.data?.users?.filter(u => 
      new Date(u.created_at) >= yesterday
    ) || []
    
    const todayOrders = (orders.data || []).filter(o => 
      new Date(o.created_at) >= yesterday
    )
    
    const todayPayments = (payments.data || []).filter(p => 
      new Date(p.created_at) >= yesterday
    )

    const todayRevenue = todayPayments
      .filter(p => p.status === 'success' || p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0)

    const data = {
      totalUsers: users.data?.users?.length || 0,
      newUsersToday: todayUsers.length,
      totalProfessionals: professionals.data?.length || 0,
      totalOrders: orders.data?.length || 0,
      newOrdersToday: todayOrders.length,
      totalPayments: payments.data?.length || 0,
      revenueToday: todayRevenue,
      totalRevenue: (payments.data || [])
        .filter(p => p.status === 'success' || p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0),
      pendingMessages: (messages.data || []).filter(m => m.status === 'new' || m.status === 'open').length,
      pendingReviews: (reviews.data || []).filter(r => r.status === 'pending').length,
      openDisputes: (disputes.data || []).filter(d => d.status === 'open' || d.status === 'new').length,
      averageRating: reviews.data?.length > 0
        ? reviews.data.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.data.length
        : 0
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error('Erreur:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}