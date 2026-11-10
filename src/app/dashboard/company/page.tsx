'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  Briefcase,
  Building2,
  LogOut,
  Megaphone,
  Network,
  Store,
} from 'lucide-react'

interface CompanyProfile {
  id: string
  company_name: string
  legal_form?: string | null
  sector?: string | null
  city?: string | null
  email?: string | null
  verification_status?: string | null
}

const WHATSAPP_URL = 'https://wa.me/22870888699'

const tiles = [
  {
    icon: Building2,
    title: 'Espace professionnel',
    text: 'Votre page entreprise, vos informations, votre équipe.',
    span: 'lg:col-span-3',
  },
  {
    icon: Store,
    title: 'Services',
    text: 'Publiez et gérez toutes vos offres.',
    span: 'lg:col-span-3',
  },
  {
    icon: Megaphone,
    title: 'Publicité',
    text: 'Campagnes, mise en avant et suivi.',
    span: 'lg:col-span-2',
  },
  {
    icon: Briefcase,
    title: 'Recrutement et Side Shift',
    text: 'Offres d’emploi et missions ponctuelles.',
    span: 'lg:col-span-2',
  },
  {
    icon: BarChart3,
    title: 'Statistiques',
    text: 'Vues, interactions et rapports.',
    span: 'lg:col-span-2',
  },
  {
    icon: Network,
    title: 'Affiliation IdeenWerk',
    text: 'Votre lien de parrainage et vos commissions.',
    span: 'lg:col-span-3',
  },
]

export default function CompanyDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, company_name, legal_form, sector, city, email, verification_status, role')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        console.error('Impossible de charger le profil entreprise :', error)
        return
      }

      if (data.role !== 'company') {
        router.replace('/dashboard/client')
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Erreur lors du chargement du compte entreprise :', error)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#05070b]">
        <div className="flex items-center gap-1.5" role="status" aria-label="Chargement">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#4285f4] [animation-delay:-0.3s] motion-reduce:animate-none" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#ea4335] [animation-delay:-0.15s] motion-reduce:animate-none" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#fbbc04] motion-reduce:animate-none" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#34a853] [animation-delay:0.15s] motion-reduce:animate-none" />
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white antialiased">
      {/* En-tête */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#8ab4f8]">
            <span className="text-lg font-medium tracking-tight">ProKorb</span>
            <span className="text-lg font-normal tracking-tight text-white/50">Business</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-sm text-white/60 sm:block">
              {profile?.company_name || 'Votre entreprise'}
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm font-medium" aria-hidden="true">
              {profile?.company_name?.charAt(0)?.toUpperCase() || 'E'}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Se déconnecter"
              title="Se déconnecter"
              className="grid h-9 w-9 place-items-center rounded-full text-white/50 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#8ab4f8]"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section className="relative isolate pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[#1a73e8]/20 blur-[120px]"
          />

          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13px] text-white/70">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fbbc04] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fbbc04]" />
            </span>
            En développement
          </div>

          <h1 className="mt-8 max-w-4xl text-[44px] font-light leading-[1.05] tracking-[-0.035em] sm:text-7xl lg:text-[88px]">
            Votre entreprise.
            <br />
            Vos opportunités.
            <br />
            <span className="text-white/45">Votre croissance.</span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-7 text-white/55">
            Tout ce qu’il faut pour développer votre activité, au même endroit. Déploiement progressif.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#05070b] outline-none transition hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-[#8ab4f8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b]"
          >
            Être prévenu du lancement <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        {/* Fonctionnalités */}
        <section aria-label="Fonctionnalités en préparation" className="grid gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-6">
          {tiles.map(({ icon: Icon, title, text, span }) => (
            <article
              key={title}
              className={`group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/25 hover:bg-white/[0.05] ${span}`}
            >
              <Icon className="h-6 w-6 text-[#8ab4f8]" strokeWidth={1.6} />
              <h2 className="mt-10 text-xl font-medium tracking-tight">{title}</h2>
              <p className="mt-2 text-[15px] leading-6 text-white/50">{text}</p>
            </article>
          ))}

          {/* Avantage exclusif */}
          <article className="relative overflow-hidden rounded-3xl border border-[#8ab4f8]/25 bg-gradient-to-br from-[#1a73e8]/25 via-[#1a73e8]/5 to-transparent p-7 sm:col-span-2 lg:col-span-3">
            <BadgePercent className="h-6 w-6 text-[#8ab4f8]" strokeWidth={1.6} />
            <p className="mt-6 text-7xl font-light leading-none tracking-[-0.04em] sm:text-8xl">
              20<span className="text-white/50"> %</span>
            </p>
            <h2 className="mt-5 text-xl font-medium tracking-tight">Avantages IdeenWerk</h2>
            <p className="mt-2 text-[15px] leading-6 text-white/60">De réduction sur les prestations éligibles d’IdeenWerk Technologies.</p>
          </article>
        </section>

        {/* Pied de page */}
        <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ProKorb · Matuneqhyd SARL U</p>
          <div className="flex items-center gap-6">
            <a href="mailto:contact@prokorb.com" className="rounded transition hover:text-white">Contact</a>
            <Link href="/" className="rounded transition hover:text-white">Retour à ProKorb</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}