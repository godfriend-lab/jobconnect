"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "../../../lib/supabase"
import {
  CreditCard, TrendingUp, DollarSign, Users, Crown,
  Download, ArrowUpRight, ArrowDownRight,
  Sparkles, Zap, Award, CheckCircle, XCircle,
  Activity, RefreshCw, Gift
} from "lucide-react"
import {
  ResponsiveContainer, ComposedChart, Area, Line, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts"

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════

type Period = "7d" | "30d" | "90d" | "1y" | "all"

interface TradingData {
  date: string
  revenue: number
  ma7: number | null
  ma30: number | null
  volume: number
}

interface Stats {
  totalRevenue: number
  previousRevenue: number
  activeSubscriptions: number
  freeCount: number
  starterCount: number
  businessCount: number
  premiumCount: number
  newSubscriptions: number
  churnedSubscriptions: number
}

interface LiveData {
  currentRevenue: number
  change24h: number
  high24h: number
  low24h: number
  totalVolume: number
}

// ═══════════════════════════════════════════════════════════
// CONFIGURATION DES PLANS
// ═══════════════════════════════════════════════════════════

const PLANS = {
  Gratuit: { price: 0, color: "#94a3b8", icon: Gift, gradient: "from-gray-50 to-slate-50", border: "border-gray-200" },
  Starter: { price: 5000, color: "#64748b", icon: Zap, gradient: "from-slate-50 to-slate-100", border: "border-slate-200" },
  Business: { price: 12000, color: "#6366f1", icon: Sparkles, gradient: "from-indigo-50 to-purple-50", border: "border-indigo-200" },
  Premium: { price: 20000, color: "#f59e0b", icon: Award, gradient: "from-amber-50 to-orange-50", border: "border-amber-200" },
} as const

const PERIODS: { id: Period; label: string }[] = [
  { id: "7d", label: "7J" },
  { id: "30d", label: "30J" },
  { id: "90d", label: "3M" },
  { id: "1y", label: "1A" },
  { id: "all", label: "MAX" },
]

// ═══════════════════════════════════════════════════════════
// UTILITAIRE : Normaliser le nom du plan
// ═══════════════════════════════════════════════════════════

const normalizePlan = (plan: string | null | undefined): string => {
  if (!plan) return "Gratuit"
  const lower = plan.toLowerCase()
  if (lower === "gratuit" || lower === "free") return "Gratuit"
  if (lower === "starter") return "Starter"
  if (lower === "business") return "Business"
  if (lower === "premium") return "Premium"
  return "Gratuit"
}

// ═══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════

export default function PaymentsPage() {
  const [period, setPeriod] = useState<Period>("30d")
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const channelRef = useRef<any>(null)

  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    previousRevenue: 0,
    activeSubscriptions: 0,
    freeCount: 0,
    starterCount: 0,
    businessCount: 0,
    premiumCount: 0,
    newSubscriptions: 0,
    churnedSubscriptions: 0
  })

  const [liveData, setLiveData] = useState<LiveData>({
    currentRevenue: 0,
    change24h: 0,
    high24h: 0,
    low24h: 0,
    totalVolume: 0
  })

  const [tradingData, setTradingData] = useState<TradingData[]>([])
  const [planDistribution, setPlanDistribution] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  // ═══════════════════════════════════════════════════════════
  // INITIALISATION
  // ═══════════════════════════════════════════════════════════

  useEffect(() => {
    loadAllData()
    setupRealtime()

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
  }, [period])

  // ═══════════════════════════════════════════════════════════
  // TEMPS RÉEL SUPABASE
  // ═══════════════════════════════════════════════════════════

  const setupRealtime = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
    }

    const channel = supabase
      .channel('payments-realtime-v3')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions'
        },
        () => {
          console.log('🔴 Changement transaction détecté')
          loadAllData()
          setIsLive(true)
          setTimeout(() => setIsLive(false), 3000)
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions'
        },
        () => {
          console.log('📊 Changement abonnement détecté')
          loadAllData()
          setIsLive(true)
          setTimeout(() => setIsLive(false), 3000)
        }
      )
      .subscribe((status) => {
        console.log('📡 Realtime status:', status)
      })

    channelRef.current = channel
  }

  // ═══════════════════════════════════════════════════════════
  // CHARGEMENT DES DONNÉES
  // ═══════════════════════════════════════════════════════════

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadStats(),
        loadTradingData(),
        loadSubscriptions(),
        loadTransactions()
      ])
    } catch (error) {
      console.error("❌ Erreur chargement:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const days = getDaysFromPeriod(period)
      const currentStart = days > 0 ? getDateRange(days) : null
      const previousStart = days > 0 ? getDateRange(days * 2) : null

      // ═══ TRANSACTIONS PÉRIODE ACTUELLE ═══
      let transactionsQuery = supabase
        .from("transactions")
        .select("amount, payment_method")
        .eq("status", "reussi")

      if (currentStart) {
        transactionsQuery = transactionsQuery.gte("created_at", currentStart)
      }

      const { data: currentTransactions } = await transactionsQuery
      const totalRevenue = currentTransactions?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0

      // ═══ TRANSACTIONS PÉRIODE PRÉCÉDENTE ═══
      let previousQuery = supabase
        .from("transactions")
        .select("amount")
        .eq("status", "reussi")

      if (previousStart && currentStart) {
        previousQuery = previousQuery
          .gte("created_at", previousStart)
          .lt("created_at", currentStart)
      }

      const { data: previousTransactions } = await previousQuery
      const previousRevenue = previousTransactions?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0

      // ═══ ABONNEMENTS ACTIFS ═══
      const { data: activeSubs, count: activeCount } = await supabase
        .from("subscriptions")
        .select("plan, user_id")
        .eq("status", "actif")

      // Compter par plan (normalise pour gérer les variations)
      const normalizedPlans = activeSubs?.map(s => normalizePlan(s.plan)) || []
      const freeCount = normalizedPlans.filter(p => p === "Gratuit").length
      const starterCount = normalizedPlans.filter(p => p === "Starter").length
      const businessCount = normalizedPlans.filter(p => p === "Business").length
      const premiumCount = normalizedPlans.filter(p => p === "Premium").length

      // Compter les pros sans abonnement actif = Gratuit
      const { data: allPros } = await supabase
        .from("profiles")
        .select("id")
        .eq("role", "pro")

      const prosWithSubscription = new Set(activeSubs?.map(s => s.user_id) || [])
      const prosWithoutSubscription = Math.max(0, (allPros?.length || 0) - prosWithSubscription.size)
      const totalFreeCount = freeCount + prosWithoutSubscription

      // ═══ NOUVEAUX ABONNÉS ═══
      let newSubsQuery = supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .in("status", ["actif", "essai"])

      if (currentStart) {
        newSubsQuery = newSubsQuery.gte("created_at", currentStart)
      }

      const { count: newCount } = await newSubsQuery

      // ═══ DÉSABONNÉS ═══
      let churnedQuery = supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "annule")

      if (currentStart) {
        churnedQuery = churnedQuery.gte("created_at", currentStart)
      }

      const { count: churnedCount } = await churnedQuery

      setStats({
        totalRevenue,
        previousRevenue,
        activeSubscriptions: (activeCount || 0) + prosWithoutSubscription,
        freeCount: totalFreeCount,
        starterCount,
        businessCount,
        premiumCount,
        newSubscriptions: newCount || 0,
        churnedSubscriptions: churnedCount || 0
      })

      // ✅ Distribution des plans - CORRIGÉ
      setPlanDistribution([
        { name: "Gratuit", value: totalFreeCount, amount: 0, color: PLANS.Gratuit.color },
        { name: "Starter", value: starterCount, amount: starterCount * PLANS.Starter.price, color: PLANS.Starter.color },
        { name: "Business", value: businessCount, amount: businessCount * PLANS.Business.price, color: PLANS.Business.color },
        { name: "Premium", value: premiumCount, amount: premiumCount * PLANS.Premium.price, color: PLANS.Premium.color },
      ])
    } catch (error) {
      console.error("❌ Erreur stats:", error)
    }
  }

  const loadTradingData = async () => {
    try {
      const { data: allTransactions } = await supabase
        .from("transactions")
        .select("id, amount, payment_method, created_at")
        .eq("status", "reussi")
        .order("created_at", { ascending: true })

      if (!allTransactions || allTransactions.length === 0) {
        setTradingData([])
        setLiveData({
          currentRevenue: 0,
          change24h: 0,
          high24h: 0,
          low24h: 0,
          totalVolume: 0
        })
        return
      }

      // Agréger par jour
      const dailyMap = new Map<string, { revenue: number; count: number }>()

      allTransactions.forEach(t => {
        const date = new Date(t.created_at)
        const dateStr = date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })

        if (!dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, { revenue: 0, count: 0 })
        }

        const current = dailyMap.get(dateStr)!
        current.revenue += Number(t.amount || 0)
        current.count += 1
      })

      const dailyData: TradingData[] = Array.from(dailyMap.entries()).map(([date, { revenue, count }]) => ({
        date,
        revenue,
        ma7: null,
        ma30: null,
        volume: count
      }))

      // Calculer moyennes mobiles
      const withMA = dailyData.map((item, index) => {
        const ma7 = index >= 6
          ? dailyData.slice(index - 6, index + 1).reduce((sum, d) => sum + d.revenue, 0) / 7
          : null

        const ma30 = index >= 29
          ? dailyData.slice(index - 29, index + 1).reduce((sum, d) => sum + d.revenue, 0) / 30
          : null

        return {
          ...item,
          ma7: ma7 ? Math.round(ma7) : null,
          ma30: ma30 ? Math.round(ma30) : null
        }
      })

      setTradingData(withMA)

      // Stats 24h
      const now = new Date()
      const last24h = allTransactions.filter(t => {
        const date = new Date(t.created_at)
        const diff = now.getTime() - date.getTime()
        return diff <= 24 * 60 * 60 * 1000
      })

      const previous24h = allTransactions.filter(t => {
        const date = new Date(t.created_at)
        const diff = now.getTime() - date.getTime()
        return diff > 24 * 60 * 60 * 1000 && diff <= 48 * 60 * 60 * 1000
      })

      const currentRevenue = last24h.reduce((sum, t) => sum + Number(t.amount || 0), 0)
      const previousRevenue = previous24h.reduce((sum, t) => sum + Number(t.amount || 0), 0)
      const change24h = previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : (currentRevenue > 0 ? 100 : 0)

      const high24h = last24h.length > 0 ? Math.max(...last24h.map(t => Number(t.amount || 0))) : 0
      const low24h = last24h.length > 0 ? Math.min(...last24h.map(t => Number(t.amount || 0))) : 0

      setLiveData({
        currentRevenue,
        change24h,
        high24h,
        low24h,
        totalVolume: allTransactions.length
      })
    } catch (error) {
      console.error("❌ Erreur trading data:", error)
    }
  }

  const loadSubscriptions = async () => {
    try {
      const { data } = await supabase
        .from("subscriptions")
        .select(`
          *,
          profiles:user_id(full_name, email, specialty)
        `)
        .eq("status", "actif")
        .order("created_at", { ascending: false })
        .limit(50)

      setSubscriptions(data || [])
    } catch (error) {
      console.error("❌ Erreur subscriptions:", error)
    }
  }

  const loadTransactions = async () => {
    try {
      const { data } = await supabase
        .from("transactions")
        .select(`
          id, amount, payment_method, reference, created_at,
          profiles:user_id(full_name, email, specialty)
        `)
        .eq("status", "reussi")
        .order("created_at", { ascending: false })
        .limit(50)

      setTransactions(data || [])
    } catch (error) {
      console.error("❌ Erreur transactions:", error)
    }
  }

  // ═══════════════════════════════════════════════════════════
  // UTILITAIRES
  // ═══════════════════════════════════════════════════════════

  const getDaysFromPeriod = (p: Period): number => {
    switch (p) {
      case "7d": return 7
      case "30d": return 30
      case "90d": return 90
      case "1y": return 365
      case "all": return 0
    }
  }

  const getDateRange = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString()
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("fr-FR") + " FCFA"
  }

  const revenueChange = stats.previousRevenue > 0
    ? ((stats.totalRevenue - stats.previousRevenue) / stats.previousRevenue) * 100
    : (stats.totalRevenue > 0 ? 100 : 0)

  // ═══════════════════════════════════════════════════════════
  // DÉTECTER LE TYPE DE TRANSACTION (sans colonne type)
  // ═══════════════════════════════════════════════════════════

  const getTransactionType = (transaction: any): "subscription" | "boost" => {
    const amount = Number(transaction.amount || 0)
    const method = (transaction.payment_method || "").toLowerCase()
    
    if (amount === 5000 || amount === 12000 || amount === 20000 || amount === 0) {
      return "subscription"
    }
    if (method.includes("boost") || method.includes("mise_en_avant")) {
      return "boost"
    }
    return "subscription"
  }

  // ═══════════════════════════════════════════════════════════
  // TOOLTIPS PERSONNALISÉS
  // ═══════════════════════════════════════════════════════════

  const TradingTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700">
          <p className="text-sm font-semibold mb-2">{label}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-xs mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
              <span className="text-slate-400">{p.name}:</span>
              <span className="font-bold">
                {p.name === "Volume" ? p.value : formatCurrency(p.value || 0)}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  // ═══════════════════════════════════════════════════════════
  // LOADING STATE
  // ═══════════════════════════════════════════════════════════

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement des données en temps réel...</p>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Revenus & Abonnements</h1>
            {isLive && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse flex items-center gap-1">
                <Activity className="w-3 h-3" />
                LIVE
              </span>
            )}
          </div>
          <p className="text-gray-600">Suivi en temps réel des forfaits et revenus cumulés</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium">
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* GRAPHIQUE TRADING PRINCIPAL */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">JOBCONNECT/FCFA</h2>
              {isLive && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
                  ● LIVE
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(liveData.currentRevenue)}
              </span>
              <div className={`flex items-center gap-1 text-lg font-semibold ${
                liveData.change24h >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {liveData.change24h >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                {Math.abs(liveData.change24h).toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  period === p.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Trading */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Plus Haut 24h</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(liveData.high24h)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Plus Bas 24h</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(liveData.low24h)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Volume Total</p>
            <p className="text-lg font-bold text-gray-900">{liveData.totalVolume} transactions</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">MA7 / MA30</p>
            <p className="text-lg font-bold text-gray-900">
              {tradingData.length > 0 && tradingData[tradingData.length - 1]?.ma7
                ? formatCurrency(tradingData[tradingData.length - 1].ma7!)
                : formatCurrency(0)}
            </p>
          </div>
        </div>

        {/* Graphique Principal */}
        <div className="h-96 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={tradingData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
              <YAxis
                yAxisId="revenue"
                stroke="#9ca3af"
                fontSize={11}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis yAxisId="volume" orientation="right" stroke="#9ca3af" fontSize={11} />
              <Tooltip content={<TradingTooltip />} />
              <Legend />

              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenu"
              />

              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="ma7"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="MA7"
                strokeDasharray="5 5"
              />

              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="ma30"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="MA30"
                strokeDasharray="5 5"
              />

              <Bar
                yAxisId="volume"
                dataKey="volume"
                fill="#e5e7eb"
                opacity={0.5}
                name="Volume"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Légende */}
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span className="text-gray-600">Revenu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">MA7 (Moyenne 7j)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-600">MA30 (Moyenne 30j)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-gray-600">Volume</span>
          </div>
        </div>

        {/* Info Temps Réel */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                Données en temps réel via Supabase Realtime
              </p>
              <p className="text-xs text-green-700 mt-1">
                Les transactions et abonnements sont mis à jour automatiquement sans rafraîchir la page
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STATS CARDS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${
              revenueChange >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              {revenueChange >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(revenueChange).toFixed(1)}%
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Revenu Total</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Abonnés</p>
          <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Nouveaux Abonnés</p>
          <p className="text-2xl font-bold text-gray-900">{stats.newSubscriptions}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Désabonnés</p>
          <p className="text-2xl font-bold text-gray-900">{stats.churnedSubscriptions}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* GRAPHIQUES SECONDAIRES */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Évolution des revenus */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Évolution des Revenus</h2>
              <p className="text-sm text-gray-500">
                {period === "7d" && "7 derniers jours"}
                {period === "30d" && "30 derniers jours"}
                {period === "90d" && "3 derniers mois"}
                {period === "1y" && "12 derniers mois"}
                {period === "all" && "Toute l'histoire"}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">
                {revenueChange >= 0 ? "+" : ""}{revenueChange.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={tradingData}>
                <defs>
                  <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderRadius: "12px", color: "#fff", border: "none" }}
                  formatter={(value: any) => [formatCurrency(value), "Revenu"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue2)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution des plans */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Répartition par Plan</h2>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistribution.filter(p => p.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [`${value} abonnés`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {planDistribution.map((plan) => (
              <div key={plan.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{plan.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{plan.value}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(plan.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CARDS PAR PLAN (4 plans) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ✅ Plan Gratuit - CORRIGÉ */}
<div className={`bg-gradient-to-br ${PLANS.Gratuit.gradient} rounded-xl border-2 ${PLANS.Gratuit.border} p-6`}>          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <Gift className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Gratuit</h3>
              <p className="text-xs text-gray-500">0 FCFA/mois</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.freeCount}</p>
          <p className="text-sm text-gray-600">abonnés actifs</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              {formatCurrency(0)} / mois
            </p>
          </div>
        </div>

        {/* Plan Starter */}
        <div className={`bg-gradient-to-br ${PLANS.Starter.gradient} rounded-xl border-2 ${PLANS.Starter.border} p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
              <Zap className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Starter</h3>
              <p className="text-xs text-gray-500">5 000 FCFA/mois</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.starterCount}</p>
          <p className="text-sm text-gray-600">abonnés actifs</p>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-700">
              {formatCurrency(stats.starterCount * PLANS.Starter.price)} / mois
            </p>
          </div>
        </div>

        {/* Plan Business */}
        <div className={`bg-gradient-to-br ${PLANS.Business.gradient} rounded-xl border-2 ${PLANS.Business.border} p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-200 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Business</h3>
              <p className="text-xs text-gray-500">12 000 FCFA/mois</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.businessCount}</p>
          <p className="text-sm text-gray-600">abonnés actifs</p>
          <div className="mt-4 pt-4 border-t border-indigo-200">
            <p className="text-sm font-semibold text-indigo-700">
              {formatCurrency(stats.businessCount * PLANS.Business.price)} / mois
            </p>
          </div>
        </div>

        {/* Plan Premium */}
        <div className={`bg-gradient-to-br ${PLANS.Premium.gradient} rounded-xl border-2 ${PLANS.Premium.border} p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-200 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Premium</h3>
              <p className="text-xs text-gray-500">20 000 FCFA/mois</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.premiumCount}</p>
          <p className="text-sm text-gray-600">abonnés actifs</p>
          <div className="mt-4 pt-4 border-t border-amber-200">
            <p className="text-sm font-semibold text-amber-700">
              {formatCurrency(stats.premiumCount * PLANS.Premium.price)} / mois
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ABONNEMENTS ACTIFS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Abonnements Actifs</h2>
            <p className="text-sm text-gray-500">{subscriptions.length} professionnels abonnés</p>
          </div>
        </div>

        {subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">En attente du premier abonnement</p>
            <p className="text-xs text-gray-400 mt-2">Les abonnements apparaîtront ici en temps réel</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Professionnel</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Montant</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Début</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => {
                  const planName = normalizePlan(sub.plan)
                  return (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">{sub.profiles?.full_name || "N/A"}</p>
                          <p className="text-xs text-gray-500">{sub.profiles?.specialty || ""}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          planName === "Premium" ? "bg-amber-100 text-amber-700" :
                          planName === "Business" ? "bg-indigo-100 text-indigo-700" :
                          planName === "Starter" ? "bg-slate-100 text-slate-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {planName === "Premium" && <Award className="w-3 h-3" />}
                          {planName === "Business" && <Sparkles className="w-3 h-3" />}
                          {planName === "Starter" && <Zap className="w-3 h-3" />}
                          {planName === "Gratuit" && <Gift className="w-3 h-3" />}
                          {planName}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {Number(sub.amount || 0).toLocaleString()} FCFA
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-500">
                        {new Date(sub.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TRANSACTIONS RÉCENTES */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transactions Récentes</h2>
            <p className="text-sm text-gray-500">{transactions.length} transactions</p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">En attente de la première transaction</p>
            <p className="text-xs text-gray-400 mt-2">Les transactions apparaîtront ici en temps réel</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction) => {
              const txType = getTransactionType(transaction)
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      txType === "subscription" ? "bg-indigo-100 text-indigo-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      {txType === "subscription" ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.profiles?.full_name || "N/A"}</p>
                      <p className="text-xs text-gray-500">
                        {txType === "subscription" ? "Abonnement" : "Boost"} • {transaction.payment_method || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">+{Number(transaction.amount).toLocaleString()} FCFA</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}