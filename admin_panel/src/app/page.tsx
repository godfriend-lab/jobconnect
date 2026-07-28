// @ts-nocheck
import Link from "next/link"
import { 
  Users, Briefcase, DollarSign, AlertTriangle, 
  TrendingUp, Activity, Shield, Settings,
  MessageSquare, Star, Calendar, BarChart3
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Utilisateurs", value: "1,234", change: "+12%", icon: Users, color: "blue" },
    { label: "Professionnels", value: "567", change: "+8%", icon: Briefcase, color: "purple" },
    { label: "Revenus du mois", value: "2.4M FCFA", change: "+23%", icon: DollarSign, color: "green" },
    { label: "Litiges ouverts", value: "12", change: "-5%", icon: AlertTriangle, color: "red" },
  ]

  const recentActivities = [
    { icon: Users, text: "Nouveau professionnel inscrit", time: "Il y a 5 min", color: "blue" },
    { icon: AlertTriangle, text: "Nouveau litige signalé", time: "Il y a 12 min", color: "red" },
    { icon: DollarSign, text: "Retrait de 50,000 FCFA", time: "Il y a 1 heure", color: "green" },
    { icon: Star, text: "Nouvel avis 5 étoiles", time: "Il y a 2 heures", color: "yellow" },
    { icon: MessageSquare, text: "Message du support", time: "Il y a 3 heures", color: "purple" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900">
              JOB<span className="text-indigo-600">CONNECT</span>
            </h1>
            <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg relative">
              <AlertTriangle className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* WELCOME */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Bonjour, Administrateur 👋
          </h2>
          <p className="text-slate-600">
            Voici un aperçu de l'activité de JobConnect aujourd'hui
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600",
              purple: "bg-purple-100 text-purple-600",
              green: "bg-green-100 text-green-600",
              red: "bg-red-100 text-red-600",
            }
            return (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} bg-slate-50 px-2 py-1 rounded-full`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ACTIVITÉ RÉCENTE */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Activité récente</h3>
              <Link href="/dashboard/activity" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">
                Voir tout →
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => {
                const Icon = activity.icon
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600",
                  red: "bg-red-100 text-red-600",
                  green: "bg-green-100 text-green-600",
                  yellow: "bg-yellow-100 text-yellow-600",
                  purple: "bg-purple-100 text-purple-600",
                }
                return (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[activity.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.text}</p>
                      <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* LIENS RAPIDES */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Accès rapide</h3>
            <div className="space-y-3">
              <Link 
                href="/dashboard/disputes" 
                className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition group"
              >
                <AlertTriangle className="w-6 h-6 text-red-600 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold text-slate-900">Litiges</p>
                  <p className="text-sm text-slate-600">0 en attente</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/users" 
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition group"
              >
                <Users className="w-6 h-6 text-blue-600 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold text-slate-900">Utilisateurs</p>
                  <p className="text-sm text-slate-600">Gérer les comptes</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/professionals" 
                className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition group"
              >
                <Briefcase className="w-6 h-6 text-purple-600 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold text-slate-900">Professionnels</p>
                  <p className="text-sm text-slate-600">0 inscrits</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/finances" 
                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition group"
              >
                <DollarSign className="w-6 h-6 text-green-600 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold text-slate-900">Finances</p>
                  <p className="text-sm text-slate-600">Retraits & revenus</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/settings" 
                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition group"
              >
                <Settings className="w-6 h-6 text-slate-600 group-hover:scale-110 transition" />
                <div>
                  <p className="font-semibold text-slate-900">Paramètres</p>
                  <p className="text-sm text-slate-600">Configuration</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        
        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-indigo-200" />
              <TrendingUp className="w-6 h-6 text-green-300" />
            </div>
            <p className="text-indigo-100 text-sm mb-1">Croissance ce mois</p>
            <p className="text-3xl font-bold">+23.5%</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-200" />
              <Calendar className="w-6 h-6 text-green-200" />
            </div>
            <p className="text-green-100 text-sm mb-1">Taux d'activité</p>
            <p className="text-3xl font-bold">94.2%</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-orange-200" />
              <AlertTriangle className="w-6 h-6 text-orange-200" />
            </div>
            <p className="text-orange-100 text-sm mb-1">Taux de résolution</p>
            <p className="text-3xl font-bold">0.0%</p>
          </div>
        </div>
      </div>
    </div>
  )
}