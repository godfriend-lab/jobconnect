// @ts-nocheck
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Chatbot from '@/components/Chatbot'
import FeaturedProfessionals from '@/components/landing/FeaturedProfessionals'
import FadeIn from '@/components/ui/FadeIn'
import { 
  ShieldCheck, Wallet, Zap, Star, Globe, User, ArrowRight, CheckCircle2,
  Wrench, Zap as ZapIcon, Hammer, Paintbrush, 
  Home, Car, Scissors, Stethoscope, Laptop, MessageCircleQuestion, ChevronDown
} from 'lucide-react'

// ==========================================================
// 🚀 SEO HYPER-PUISSANT : MÉTADONNÉES NEXT.JS (AFRIQUE COMPLÈTE)
// ==========================================================
export const metadata: Metadata = {
  title: {
    default: 'ProKorb | La 1ère Marketplace de Services en Afrique - 0% Commission',
    template: '%s | ProKorb Afrique',
  },
  description: 'ProKorb est la marketplace N°1 en Afrique pour trouver des artisans et professionnels vérifiés. 100% Gratuit, 0% commission. Disponible au Togo, Bénin, Côte d\'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana, Nigeria.',
  keywords: [
    'marketplace services Afrique', 'trouver artisan Afrique', 'professionnel vérifié Afrique',
    'plombier Lomé Togo', 'électricien Dakar Sénégal', 'mécanicien Abidjan Côte d\'Ivoire',
    '0% commission artisan', 'badge vérifié professionnel 5000 FCFA', 'ProKorb Afrique'
  ],
  authors: [{ name: 'ProKorb', url: 'https://www.prokorb.com' }],
  creator: 'ProKorb',
  publisher: 'ProKorb',
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: 'https://www.prokorb.com',
  },
  openGraph: {
    title: 'ProKorb | La 1ère Marketplace de Services en Afrique',
    description: 'Trouvez des artisans et professionnels vérifiés dans toute l\'Afrique de l\'Ouest. 100% Gratuit, 0% commission.',
    url: 'https://www.prokorb.com',
    siteName: 'ProKorb',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.prokorb.com/og-image.jpg', width: 1200, height: 630, alt: 'ProKorb Afrique' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProKorb | La 1ère Marketplace de Services en Afrique',
    description: 'Trouvez des artisans et professionnels vérifiés dans toute l\'Afrique. 100% Gratuit, 0% commission.',
    images: ['https://www.prokorb.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    'ChatGPT-User': 'allow', 'GPTBot': 'allow', 'Google-Extended': 'allow', 'PerplexityBot': 'allow', 'ClaudeBot': 'allow',
  },
  other: {
    'geo.region': 'AF',
    'geo.placename': 'Afrique de l\'Ouest',
  },
}

// ==========================================================
// 📋 DONNÉES FAQ (Utilisées à la fois pour l'UI et le Schema.org)
// ==========================================================
const faqData = [
  {
    question: "ProKorb est-il vraiment gratuit pour les professionnels ?",
    answer: "Oui, absolument. L'inscription, la création de profil et la réception de demandes clients sont 100% gratuites. ProKorb ne prélève 0% de commission sur vos prestations. Le seul frais est de 5 000 FCFA par an pour obtenir le badge de vérification, qui est optionnel mais multiplie votre visibilité par 3."
  },
  {
    question: "Dans quels pays d'Afrique ProKorb est-il disponible ?",
    answer: "ProKorb est actuellement opérationnel dans 9 pays d'Afrique de l'Ouest : le Togo, le Bénin, la Côte d'Ivoire, le Sénégal, le Burkina Faso, le Mali, le Niger, le Ghana et le Nigeria. Nous continuons d'étendre notre réseau pour couvrir l'ensemble du continent."
  },
  {
    question: "Qu'est-ce que le badge vérifié et comment l'obtenir ?",
    answer: "Le badge bleu 'Vérifié' garantit que l'identité et les compétences du professionnel ont été validées manuellement par notre équipe. Pour l'obtenir, il suffit d'envoyer votre CNI/Passeport, un justificatif de métier et de régler les frais uniques de 5 000 FCFA/an via Mobile Money. Validation sous 24h."
  },
  {
    question: "Comment se passent les paiements entre clients et professionnels ?",
    answer: "Les paiements s'effectuent en direct entre vous et le professionnel, selon vos accords (T-Money, Moov Money, Wave, Orange Money, MTN MoMo ou espèces). ProKorb n'intervient pas dans les transactions financières et ne prend aucune commission."
  },
  {
    question: "ProKorb garantit-il la qualité des prestations ?",
    answer: "ProKorb est une plateforme de mise en relation. Bien que nous ne puissions pas garantir le résultat final, nous mettons tout en œuvre pour minimiser les risques : vérification stricte des identités, système d'avis clients authentiques, et un service de médiation gratuit en cas de litige."
  },
  {
    question: "Qui est derrière la plateforme ProKorb ?",
    answer: "ProKorb est le produit phare de Matuneqhyd SARL U, fondée par Yves Atsou Agbevivi. La direction technologique est assurée par Godfriend Goretti, expert développeur Fullstack (ayant travaillé sur Digiu.ai, Werklock, Poplove) et fondateur du mouvement Ideenwerk-Technologies, réunissant 14 experts en IA, cybersécurité et data."
  }
]

// ==========================================================
// 🧠 GÉNÉRATION DYNAMIQUE DU SCHEMA.ORG (GARANTIT 100% DE COHÉRENCE)
// ==========================================================
const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.prokorb.com/#organization',
        name: 'ProKorb',
        url: 'https://www.prokorb.com',
        logo: { '@type': 'ImageObject', url: 'https://www.prokorb.com/logo.png', width: 512, height: 512 },
        description: 'La marketplace N°1 en Afrique pour connecter les particuliers avec des artisans et professionnels vérifiés. 0% commission.',
        areaServed: [
          { '@type': 'Country', name: 'Togo' }, { '@type': 'Country', name: 'Bénin' }, { '@type': 'Country', name: 'Côte d\'Ivoire' },
          { '@type': 'Country', name: 'Sénégal' }, { '@type': 'Country', name: 'Burkina Faso' }, { '@type': 'Country', name: 'Mali' },
          { '@type': 'Country', name: 'Niger' }, { '@type': 'Country', name: 'Ghana' }, { '@type': 'Country', name: 'Nigeria' }
        ],
        sameAs: ['https://facebook.com/prokorb', 'https://instagram.com/prokorb', 'https://twitter.com/prokorb']
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.prokorb.com/#website',
        url: 'https://www.prokorb.com',
        name: 'ProKorb Afrique',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.prokorb.com/marketplace?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.prokorb.com/#faq',
        mainEntity: faqData.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  }
}

export default async function HomePage() {
  const supabase = await createClient()

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
    <div className="bg-white min-h-screen flex flex-col font-sans text-slate-900 overflow-x-hidden">
      
      {/* ✅ INJECTION DYNAMIQUE DES DONNÉES STRUCTURÉES JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />

      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image src="/logo.png" alt="Logo ProKorb" width={150} height={40} priority className="h-10 w-auto max-w-[150px] object-contain" />
            <div className="text-2xl font-black tracking-tight hidden sm:block">
              <span className="text-indigo-600">PRO</span>
              <span className="text-slate-900">KORB</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#avantages" className="hover:text-indigo-600 transition-colors">Avantages</a>
            <a href="#etapes" className="hover:text-indigo-600 transition-colors">Comment ça marche</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">Métiers</a>
            <Link href="/marketplace" className="hover:text-indigo-600 transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2">
              <User className="w-4 h-4" /> Connexion
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
              Inscription Gratuite <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full">
        {/* 2. HERO SECTION */}
        <section className="relative bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden pt-8 pb-16">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <BlueArcText />

            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                TROUVEZ UN ARTISAN OU
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  PROFESSIONNEL VÉRIFIÉ
                </span>
                <br />
                À TRAVERS L'AFRIQUE
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src="/images/hero/professionnel-gauche.jpg" alt="Professionnels qualifiés ProKorb en Afrique" className="relative w-full h-auto object-contain rounded-3xl shadow-2xl" style={{ maxHeight: '500px' }} />
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src="/images/hero/professionnel-droite.jpg" alt="Professionnels vérifiés ProKorb Afrique" className="relative w-full h-auto object-contain rounded-3xl shadow-2xl" style={{ maxHeight: '500px' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: 'Professionnels', sub: 'vérifiés' },
                { icon: Zap, title: 'Service rapide', sub: 'et fiable' },
                { icon: Star, title: 'Qualité', sub: 'garantie' },
                { icon: Globe, title: 'Partout en', sub: 'Afrique' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                    <p className="text-xs text-slate-600">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-2xl mx-auto">
              <Link href="/register?role=client" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-10 py-5 rounded-full transition-all shadow-2xl shadow-indigo-300 hover:-translate-y-1 flex items-center justify-center gap-3">
                Je cherche un professionnel <ArrowRight className="w-6 h-6" />
              </Link>
              <Link href="/register?role=pro" className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-indigo-300 text-slate-800 font-bold text-lg px-10 py-5 rounded-full transition-all hover:bg-slate-50 hover:-translate-y-1 flex items-center justify-center gap-3">
                Je propose mes services
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto border border-slate-100">
              <div className="grid grid-cols-3 md:grid-cols-9 gap-4 md:gap-6">
                {[
                  { flag: 'https://flagcdn.com/w80/tg.png', name: 'TOGO' },
                  { flag: 'https://flagcdn.com/w80/bj.png', name: 'BENIN' },
                  { flag: 'https://flagcdn.com/w80/ci.png', name: "COTE D'IVOIRE" },
                  { flag: 'https://flagcdn.com/w80/sn.png', name: 'SENEGAL' },
                  { flag: 'https://flagcdn.com/w80/bf.png', name: 'BURKINA FASO' },
                  { flag: 'https://flagcdn.com/w80/ml.png', name: 'MALI' },
                  { flag: 'https://flagcdn.com/w80/ne.png', name: 'NIGER' },
                  { flag: 'https://flagcdn.com/w80/gh.png', name: 'GHANA' },
                  { flag: 'https://flagcdn.com/w80/ng.png', name: 'NIGERIA' },
                ].map((country) => (
                  <div key={country.name} className="text-center group">
                    <img src={country.flag} alt={`Drapeau ${country.name}`} className="w-12 h-9 md:w-14 md:h-10 mx-auto mb-2 rounded-lg shadow-md object-cover group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] md:text-xs font-bold text-slate-700">{country.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. AVANTAGES SECTION */}
        <section id="avantages" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">Pourquoi choisir ProKorb</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">La marketplace de services <br />N°1 en Afrique</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { color: 'emerald', icon: Wallet, title: '0% Commission', desc: 'Nous ne prenons aucune part sur vos gains. Le client paie directement l\'artisan selon le devis convenu. Transparence totale.' },
              { color: 'blue', icon: ShieldCheck, title: 'Profils Vérifiés', desc: 'Chaque professionnel soumet ses pièces d\'identité et certifications. Notre équipe valide chaque profil pour votre sécurité.' },
              { color: 'purple', icon: Zap, title: 'Mise en relation éclair', desc: 'Publiez votre besoin et recevez des propositions de professionnels disponibles dans votre quartier en moins de 24h.' }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} direction="up">
                <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 ${colorMap[item.color].bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 ${colorMap[item.color].text}`} />
                  </div>
                  <h3 className="text-xl font-black text-slate-950 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
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
        <section id="etapes" className="bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
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
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-indigo-500/30 relative z-10">{item.step}</div>
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
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">Nos Métiers</span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">Explorez nos catégories <br /><span className="text-indigo-600">d'experts vérifiés en Afrique</span></h2>
              </div>
              <Link href="/marketplace" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">Voir tous les métiers <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {safeCategories.map((cat, idx) => {
              const Icon = getIconForCategory(cat.name)
              return (
                <FadeIn key={idx} delay={idx * 0.05} direction="up">
                  <Link href={`/marketplace?category=${cat.name}`} className="group bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 block h-full">
                    <div className="w-14 h-14 mx-auto mb-4 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-950 mb-1 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{cat.professionals_count || 0} professionnels</p>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </section>

        {/* 7. SECTION FAQ - SEO IA ULTRA PUISSANT (Alignée avec le Schema.org) */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-16 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
                  <MessageCircleQuestion className="w-4 h-4" />
                  Questions Fréquentes
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                  Tout ce que vous devez savoir <br />sur ProKorb
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Les réponses transparentes aux questions les plus posées par nos utilisateurs en Afrique.
                </p>
              </div>
            </FadeIn>

            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} direction="up">
                  <details className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer open:bg-indigo-50/30 dark:open:bg-indigo-950/10">
                    <summary className="flex items-center justify-between font-bold text-slate-900 text-lg list-none pr-4">
                      <span className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black mt-0.5">Q</span>
                        {faq.question}
                      </span>
                      <ChevronDown className="w-6 h-6 text-indigo-600 flex-shrink-0 group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <div className="mt-4 pl-11 border-l-2 border-indigo-200 ml-4">
                      <p className="text-slate-600 leading-relaxed text-base">{faq.answer}</p>
                    </div>
                  </details>
                </FadeIn>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/faq" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                Voir toutes les questions fréquentes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. BIG CTA SECTION */}
        <section className="bg-indigo-600 text-white py-24 px-4 sm:px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
          
          <FadeIn direction="up" className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Prêt à transformer le marché des services en Afrique ?</h2>
            <p className="text-indigo-100 text-lg font-medium max-w-xl mx-auto">Rejoignez dès aujourd'hui la communauté ProKorb. L'inscription est 100% gratuite, sans commission, dans 9 pays d'Afrique.</p>
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

      {/* 9. CHATBOT IA */}
      <Chatbot />
    </div>
  )
}

// ==========================================================
// 💎 COMPOSANT ARC BLEU HAUT DE GAMME
// ==========================================================
function BlueArcText() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mb-12">
      <svg viewBox="0 0 1400 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e40af" /><stop offset="20%" stopColor="#3b82f6" /><stop offset="40%" stopColor="#6366f1" />
            <stop offset="60%" stopColor="#8b5cf6" /><stop offset="80%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" /><stop offset="30%" stopColor="white" stopOpacity="0.6" />
            <stop offset="50%" stopColor="white" stopOpacity="0.9" /><stop offset="70%" stopColor="white" stopOpacity="0.6" /><stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="textOutline" x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="2" />
            <feFlood floodColor="white" floodOpacity="0.8" result="white" />
            <feComposite in="white" in2="dilated" operator="in" result="outline" />
            <feMerge><feMergeNode in="outline" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="textArc" d="M 80 240 Q 700 20 1320 240" fill="none" />
        </defs>
        <path d="M 80 240 Q 700 20 1320 240" stroke="url(#glowGradient)" strokeWidth="100" fill="none" strokeLinecap="round" opacity="0.15" filter="url(#softGlow)" />
        <path d="M 80 240 Q 700 20 1320 240" stroke="url(#blueGradient)" strokeWidth="75" fill="none" strokeLinecap="round" opacity="0.95" />
        <path d="M 80 240 Q 700 20 1320 240" stroke="white" strokeWidth="78" fill="none" strokeLinecap="round" opacity="0.3" style={{ mixBlendMode: 'overlay' }} />
        <path d="M 80 240 Q 700 20 1320 240" stroke="url(#shineGradient)" strokeWidth="30" fill="none" strokeLinecap="round" opacity="0.7" transform="translate(0, -12)" />
        <path d="M 80 240 Q 700 20 1320 240" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" transform="translate(0, -18)" />
        <text fontSize="44" fontWeight="900" fill="url(#blueGradient)" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5" filter="url(#textOutline)">
          <textPath href="#textArc" startOffset="50%" textAnchor="middle">La plateforme N°1 des services en Afrique</textPath>
        </text>
        <circle cx="80" cy="240" r="8" fill="url(#blueGradient)" opacity="0.6" />
        <circle cx="1320" cy="240" r="8" fill="url(#blueGradient)" opacity="0.6" />
      </svg>
    </div>
  )
}