// @ts-nocheck
'use client'

import Link from 'next/link'
import { 
  Star, MessageCircle, Rocket, Crown, Globe, 
  CheckCircle2, Pause
} from 'lucide-react'

interface DashboardHomeProps {
  profile: any
  stats: { rating: number; totalReviews: number }
  services: any[]
  isAvailable: boolean
  onToggleAvailability: () => void
  onNavigate: (view: string) => void
}

export default function DashboardHome({
  profile,
  stats,
  services,
  isAvailable,
  onToggleAvailability,
  onNavigate
}: DashboardHomeProps) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bonjour, {profile?.full_name || 'Pro'} 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              Boostez votre visibilité et développez votre activité
            </p>
          </div>
          <button
            onClick={onToggleAvailability}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg ${
              isAvailable 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : 'bg-slate-500 hover:bg-slate-600'
            }`}
          >
            {isAvailable ? <CheckCircle2 className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          label="Note moyenne"
          value={`${stats.rating.toFixed(1)}/5`}
          icon={Star}
          color="from-yellow-500 to-amber-600"
        />
        <StatCard
          label="Total des avis"
          value={stats.totalReviews}
          icon={MessageCircle}
          color="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Actions rapides */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            icon={Rocket}
            title={services.length > 0 ? 'Modifier mon service' : 'Publier mon service'}
            subtitle={services.length > 0 ? 'Mettre à jour' : 'Apparaître sur la marketplace'}
            color="bg-indigo-500"
            onClick={() => onNavigate('services')}
          />
          <QuickAction
            icon={Crown}
            title="Mon Abonnement"
            subtitle="Améliorer ma visibilité"
            color="bg-amber-500"
            onClick={() => onNavigate('subscription')}
          />
          <Link href={`/pro/${profile?.id}`} className="block">
            <QuickAction
              icon={Globe}
              title="Profil public"
              subtitle="Voir ce que voient les clients"
              color="bg-blue-500"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

// Composants réutilisables
function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  )
}

function QuickAction({ icon: Icon, title, subtitle, color, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left w-full"
    >
      <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-sm text-slate-900 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </button>
  )
}