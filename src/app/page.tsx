// @ts-nocheck
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/client'
import Chatbot from '@/components/Chatbot'
import FeaturedProfessionals from '@/components/landing/FeaturedProfessionals'
import FadeIn from '@/components/ui/FadeIn'
import { 
  ShieldCheck, Wallet, Zap, Star, CheckCircle2, ArrowRight,
  Wrench, Zap as ZapIcon, Hammer, Paintbrush, 
  Home, Car, Scissors, Stethoscope, Laptop
} from 'lucide-react'

// ==========================================================
// 🚀 SEO ULTRA-PUISSANT : MÉTADONNÉES NEXT.JS
// ==========================================================
export const metadata: Metadata = {
  title: 'ProKorb | Trouvez un Artisan ou Professionnel Vérifié au Togo',
  description: 'La 1ère marketplace au Togo pour trouver des plombiers, électriciens, mécaniciens et artisans vérifiés à Lomé, Kpalimé, Sokodé. Inscription 100% gratuite, 0% commission.',
  keywords: 'plombier Lomé, électricien Togo, artisan vérifié, ProKorb, service à domicile Togo, réparation climatiseur, menuisier Kpalimé, marketplace services Togo, trouver un pro',
  authors: [{ name: 'ProKorb Togo' }],
  creator: 'ProKorb',
  publisher: 'ProKorb',
  formatDetection: { telephone: true },
  alternates: {
    canonical: 'https://prokorb.com',
  },
  openGraph: {
    title: 'ProKorb | Trouvez un professionnel de confiance au Togo',
    description: 'Connectez-vous avec les meilleurs artisans et professionnels du Togo. 100% Gratuit et sans commission.',
    url: 'https://prokorb.com',
    siteName: 'ProKorb',
    locale: 'fr_TG',
    type: 'website',
    images: [
      {
        url: 'https://prokorb.com/og-image.jpg', // ⚠️ Crée une image 1200x630px dans le dossier public/
        width: 1200,
        height: 630,
        alt: 'ProKorb - Marketplace de services au Togo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProKorb | Trouvez un professionnel de confiance au Togo',
    description: 'La 1ère marketplace au Togo pour trouver des artisans vérifiés. 100% Gratuit.',
    images: ['https://prokorb.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'TON_CODE_DE_VERIFICATION_GOOGLE_ICI', // À ajouter après inscription sur Search Console
  // },
}

// ==========================================================
// 🧠 SEO ULTRA-PUISSANT : DONNÉES STRUCTURÉES (JSON-LD)
// ==========================================================
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://prokorb.com/#organization',
      name: 'ProKorb',
      url: 'https://prokorb.com',
      logo: 'https://prokorb.com/logo.png',
      description: 'La 1ère marketplace au Togo pour connecter les particuliers et les professionnels vérifiés.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lomé',
        addressCountry: 'TG',
      },
      sameAs: [
        'https://facebook.com/prokorb', // Remplace par tes vrais liens
        'https://instagram.com/prokorb',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://prokorb.com/#website',
      url: 'https://prokorb.com',
      name: 'ProKorb',
      description: 'Trouvez un artisan ou professionnel vérifié au Togo',
      publisher: {
        '@id': 'https://prokorb.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://prokorb.com/marketplace?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    }
  ]
}

export default async function HomePage() {
  const supabase = createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('name, professionals_count')
    .order('professionals_count', { ascending: false })
    .limit(8)

  const safeCategories = categories && categories.length > 0 ? categories : [
    { name: 'Plomberie', professionals_count: 45 },
    { name: 'Électricité', professionals_count: 38 },
    { name: 'Maçonnerie', professionals_count: 52 },
    { name: 'Peinture', professionals_count: 31 },
    { name: 'Mécanique', professionals_count: 41 },
    { name: 'Informatique', professionals_count: 28 },
    { name: 'Santé', professionals_count: 15 },
    { name: 'Couture', professionals_count: 24 },
  ]

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('plomber') || n.includes('mécan')) return Wrench
    if (n.includes('électric')) return ZapIcon
    if (n.includes('maçon') || n.includes('bâtiment')) return Hammer
    if (n.includes('peinture')) return Paintbrush
    if (n.includes('informatique')) return Laptop
    if (n.includes('santé')) return Stethoscope
    if (n.includes('couture')) return Scissors
    if (n.includes('immobilier')) return Home
    if (n.includes('auto') || n.includes('véhicule')) return Car
    return Wrench
  }

  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* INJECTION DES DONNÉES STRUCTURÉES JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Retour à l'accueil ProKorb">
            {/* ✅ OPTIMISATION SEO : Utilisation de Next/Image pour le LCP (Largest Contentful Paint) */}
            <Image 
              src="/logo.png" 
              alt="Logo ProKorb - Marketplace de services au Togo" 
              width={150}
              height={40}
              priority
              className="h-10 w-auto max-w-[150px] object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="text-2xl font-black tracking-tight hidden sm:block">
              <span className="text-indigo-600">PRO</span>
              <span className="text-slate-900 dark:text-white">KORB</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#avantages" className="hover:text-indigo-600 transition-colors">Avantages</a>
            <a href="#etapes" className="hover:text-indigo-600 transition-colors">Comment ça marche</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">Métiers</a>
            <Link href="/marketplace" className="hover:text-indigo-600 transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors px-4 py-2">
              Connexion
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:-translate-y-0.5">
              Inscription Gratuite
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full">
        {/* 2. HERO SECTION */}
        <section className="relative pt-20 pb-24 px-4 sm:px-6 overflow-hidden bg-white dark:bg-slate-950">
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mx-auto">
                <Star className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                <span>La plateforme N°1 des services au Togo</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* ✅ OPTIMISATION SEO : H1 contient les mots-clés principaux "Artisan", "Professionnel Vérifié", "Togo" */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                Trouvez un artisan ou professionnel <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  vérifié au Togo.
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                La marketplace tout-en-un pour connecter les particuliers et les professionnels à Lomé, Kpalimé et Sokodé. 
                <span className="text-slate-900 dark:text-white font-bold"> 100% Gratuit</span> pour commencer, 0% commission.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register?role=client" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:-translate-y-1 flex items-center justify-center gap-2">
                  Je cherche un professionnel <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/register?role=pro" className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-200 text-slate-800 dark:text-white font-bold text-base px-8 py-4 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 flex items-center justify-center gap-2">
                  Je propose mes services
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>Profils 100% vérifiés</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>Paiement direct (T-Money / Flooz)</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span>Support local réactif</span></div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 3. AVANTAGES SECTION */}
        <section id="avantages" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full">Pourquoi choisir ProKorb</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                Une expérience pensée pour <br />la confiance et l'efficacité
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { color: 'emerald', icon: Wallet, title: '0% Commission', desc: 'Nous ne prenons aucune part sur vos gains. Le client paie directement l\'artisan selon le devis convenu. Transparence totale.' },
              { color: 'blue', icon: ShieldCheck, title: 'Profils Vérifiés', desc: 'Chaque professionnel soumet ses pièces d\'identité et certifications. Notre équipe valide chaque profil pour votre sécurité.' },
              { color: 'purple', icon: Zap, title: 'Mise en relation éclair', desc: 'Publiez votre besoin et recevez des propositions de professionnels disponibles dans votre quartier en moins de 24h.' }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} direction="up">
                <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 ${colorMap[item.color].bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${colorMap[item.color].text}`} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* 4. PROFESSIONNELS EN VEDETTE */}
        <FadeIn direction="up">
          <FeaturedProfessionals />
        </FadeIn>

        {/* 5. COMMENT ÇA MARCHE */}
        <section id="etapes" className="bg-slate-900 dark:bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-16 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Processus simple</span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Du besoin au résultat en 3 étapes</h2>
              </div>
            </FadeIn>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>

              {[
                { step: '01', title: 'Publiez ou Postulez', desc: 'Le client décrit son besoin et les pros reçoivent la demande.' },
                { step: '02', title: 'Discutez & Convenez', desc: 'Échangez pour affiner les détails techniques et le prix.' },
                { step: '03', title: 'Validez & Payez', desc: 'Les travaux sont réalisés. Vous réglez directement le professionnel.' }
              ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.2} direction="up">
                  <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 text-left hover:bg-slate-800 transition-colors h-full">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-indigo-500/30 relative z-10">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CATÉGORIES SECTION */}
        <section id="categories" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full">Nos Métiers</span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
                  Explorez nos catégories <br /><span className="text-indigo-600">d'experts vérifiés au Togo</span>
                </h2>
              </div>
              <Link href="/marketplace" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all" aria-label="Voir tous les métiers sur la marketplace">
                Voir tous les métiers <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {safeCategories.map((cat, idx) => {
              const Icon = getIconForCategory(cat.name)
              return (
                <FadeIn key={idx} delay={idx * 0.05} direction="up">
                  <Link 
                    href={`/marketplace?category=${cat.name}`} 
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 block h-full"
                    aria-label={`Trouver un professionnel en ${cat.name}`}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 rounded-2xl flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-950 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{cat.professionals_count || 0} professionnels</p>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* 7. BIG CTA SECTION */}
        <section className="bg-indigo-600 text-white py-24 px-4 sm:px-6 pb-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
          
          <FadeIn direction="up" className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Prêt à simplifier vos services au Togo ?</h2>
            <p className="text-indigo-100 text-lg font-medium max-w-xl mx-auto">
              Rejoignez dès aujourd'hui la communauté qui transforme le marché du service. L'inscription est 100% gratuite.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-white text-indigo-600 font-extrabold text-base px-8 py-4 rounded-xl transition-all shadow-xl hover:bg-slate-50 hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                Créer mon compte gratuitement <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/marketplace" className="bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold text-base px-8 py-4 rounded-xl transition-all hover:bg-indigo-700 inline-flex items-center justify-center">
                Voir les professionnels
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* 8. CHATBOT IA */}
      <Chatbot />
      
    </div>
  )
}