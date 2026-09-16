// @ts-nocheck
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Building2, 
  MapPin, 
  Award, 
  Shield, 
  Globe, 
  Heart, 
  Users, 
  Lightbulb,
  Handshake,
  TrendingUp,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react'

// ✅ MÉTADONNÉES SEO COMPLÈTES POUR GOOGLE
export const metadata: Metadata = {
  title: 'Notre Entreprise | Ideenwerk Technologies & Matuneqhyd - ProKorb',
  description: 'ProKorb est co-édité par Ideenwerk Technologies et Matuneqhyd, deux entreprises togolaises fondées par Godfriend et Yves Agbevivi. Découvrez notre vision et nos engagements.',
  keywords: [
    'ProKorb entreprise',
    'Ideenwerk Technologies',
    'Matuneqhyd',
    'Godfriend Agbevivi',
    'Yves Agbevivi',
    'startup Togo',
    'marketplace services Togo',
    'entreprise technologique Lomé'
  ],
  openGraph: {
    title: 'Notre Entreprise | ProKorb by Ideenwerk & Matuneqhyd',
    description: 'Découvrez les co-fondateurs et la vision derrière ProKorb, la marketplace N°1 des services au Togo.',
    type: 'website',
    url: 'https://www.prokorb.com/company',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre Entreprise | ProKorb',
    description: 'Ideenwerk Technologies & Matuneqhyd - Co-fondateurs de ProKorb',
  },
  alternates: {
    canonical: 'https://www.prokorb.com/company',
  },
}

// ✅ SCHEMA.ORG ORGANIZATION (Le langage que Google comprend pour les entreprises)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ProKorb",
  "alternateName": "ProKorb by Ideenwerk & Matuneqhyd",
  "url": "https://www.prokorb.com",
  "logo": "https://www.prokorb.com/logo.png",
  "description": "Marketplace N°1 des services professionnels au Togo, co-éditée par Ideenwerk Technologies et Matuneqhyd.",
  "founder": [
    {
      "@type": "Person",
      "name": "Godfriend Agbevivi",
      "jobTitle": "CEO, Ideenwerk Technologies & Co-fondateur ProKorb",
      "worksFor": { "@type": "Organization", "name": "Ideenwerk Technologies" }
    },
    {
      "@type": "Person",
      "name": "Yves Agbevivi",
      "jobTitle": "CEO, Matuneqhyd & Co-fondateur ProKorb",
      "worksFor": { "@type": "Organization", "name": "Matuneqhyd" }
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lomé",
    "addressCountry": "TG"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+228-70-88-86-99",
    "contactType": "customer service",
    "email": "contact@prokorb.tg"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61593667670576",
    "https://www.instagram.com/ProKorbafrica/",
    "https://x.com/ProKorbAfric"
  ]
}

export default function CompanyPage() {
  return (
    <>
      {/* ✅ INJECTION DU SCHEMA.ORG POUR GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-8">
              <Handshake className="w-4 h-4 text-indigo-300" />
              <span>Une alliance stratégique Ideenwerk Technologies & Matuneqhyd</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              L'Excellence au Service de <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                l'Innovation Africaine
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              ProKorb est le fruit d'une vision partagée : connecter les talents aux opportunités 
              en bâtissant la marketplace de services la plus fiable, sécurisée et premium du Togo.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          
          {/* ==========================================
              LA VISION CONJOINTE
          ========================================== */}
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    Une Synergie de Compétences
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-lg">
                    ProKorb n'est pas seulement une plateforme, c'est le résultat d'un partenariat stratégique 
                    entre <strong className="text-indigo-600 dark:text-indigo-400">Ideenwerk Technologies</strong> et <strong className="text-purple-600 dark:text-purple-400">Matuneqhyd</strong>. 
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    Cette alliance unique combine l'expertise technologique de pointe d'Ideenwerk avec 
                    l'excellence opérationnelle et la vision marché de Matuneqhyd. Ensemble, nous développons 
                    des écosystèmes numériques qui répondent aux défis locaux tout en respectant les standards 
                    internationaux les plus exigeants.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              LEADERSHIP & CO-FONDATEURS
          ========================================== */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                Notre Leadership
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Deux visionnaires, une seule ambition : transformer le paysage des services au Togo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Godfriend Agbevivi */}
              <div className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-700/50">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                    <Award className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Godfriend Agbevivi</h3>
                    <p className="text-indigo-400 font-semibold mb-4">CEO, Ideenwerk Technologies<br/>Co-fondateur de ProKorb</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mt-6 border-t border-slate-700 pt-6">
                  Visionnaire technologique et architecte de l'innovation, Godfriend pilote la stratégie 
                  produit et l'infrastructure technique de ProKorb. Son expertise garantit que chaque 
                  fonctionnalité de la plateforme est conçue avec une rigueur d'ingénierie et une vision 
                  à long terme, assurant scalabilité et sécurité.
                </p>
              </div>

              {/* Yves Agbevivi */}
              <div className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-700/50">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Yves Agbevivi</h3>
                    <p className="text-purple-400 font-semibold mb-4">CEO, Matuneqhyd<br/>Co-fondateur de ProKorb</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mt-6 border-t border-slate-700 pt-6">
                  Stratège et leader opérationnel, Yves apporte une expertise approfondie du marché et 
                  une exigence de qualité sans compromis. Il veille à ce que l'expérience utilisateur, 
                  la croissance commerciale et les partenariats de ProKorb soient alignés avec les plus 
                  hauts standards d'excellence du secteur.
                </p>
              </div>
            </div>
          </section>

          {/* ==========================================
              NOS ENGAGEMENTS (PILIERS)
          ========================================== */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
              Les Piliers de Notre Excellence
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Gouvernance & Conformité",
                  desc: "Respect strict des réglementations togolaises et des standards internationaux (RGPD, sécurité des données)."
                },
                {
                  icon: Globe,
                  title: "Scalabilité Internationale",
                  desc: "Une architecture robuste conçue pour s'adapter aux marchés régionaux et internationaux sans friction."
                },
                {
                  icon: Heart,
                  title: "Impact Économique",
                  desc: "Création de valeur réelle en formalisant et en valorisant le travail des professionnels locaux."
                },
                {
                  icon: Users,
                  title: "Inclusion Numérique",
                  desc: "Une interface intuitive et accessible, conçue pour tous les niveaux de maîtrise technologique."
                },
                {
                  icon: Lightbulb,
                  title: "Innovation Continue",
                  desc: "Une feuille de route produit évolutive, nourrie par l'IA et les retours terrains de nos utilisateurs."
                },
                {
                  icon: MapPin,
                  title: "Ancrage Local Fort",
                  desc: "Siège social au Togo, avec une équipe qui comprend intimement les dynamiques culturelles et économiques."
                }
              ].map((commitment, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-800 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <commitment.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{commitment.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{commitment.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ==========================================
              INFORMATIONS LÉGALES & CORPORATE
          ========================================== */}
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                Informations Corporatives
              </h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-slate-600 dark:text-slate-300">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Co-éditeurs de la plateforme</h3>
                  <p className="font-semibold text-slate-900 dark:text-white text-lg">Ideenwerk Technologies</p>
                  <p className="font-semibold text-slate-900 dark:text-white text-lg">& Matuneqhyd</p>
                  <p className="mt-1 text-sm">Produit phare : ProKorb</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Siège Social</h3>
                  <p className="font-medium">Lomé, République Togolaise</p>
                  <p className="text-sm mt-1">Afrique de l'Ouest</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Direction Générale</h3>
                  <p className="font-medium">Godfriend Agbevivi</p>
                  <p className="font-medium">Yves Agbevivi</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Officiel</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    <p className="font-medium">contact@prokorb.tg</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <p className="font-medium">+228 70 88 86 99 / +228 79 94 07 93</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              CERTIFICATION & STANDARDS
          ========================================== */}
          <section>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-3xl p-8 md:p-12 border border-emerald-100 dark:border-emerald-900/50">
              <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                Engagement Qualité & Sécurité
              </h2>
              <div className="space-y-4 text-emerald-800 dark:text-emerald-200">
                <p className="leading-relaxed text-lg">
                  En tant qu'entreprise technologique de premier plan, ProKorb s'engage à maintenir une 
                  intégrité irréprochable à chaque niveau de son fonctionnement :
                </p>
                <ul className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    "Chiffrement de bout en bout (SSL/TLS) pour toutes les données.",
                    "Conformité stricte aux lois sur la protection des données au Togo.",
                    "Processus de vérification d'identité rigoureux pour tous les professionnels.",
                    "Politique de tolérance zéro en matière de discrimination et de fraude."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ==========================================
              CALL TO ACTION
          ========================================== */}
          <section className="text-center pb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
              Façonnons l'avenir ensemble
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Ideenwerk Technologies et Matuneqhyd continuent d'investir dans l'innovation pour offrir 
              des solutions qui dépassent les attentes. Découvrez notre écosystème.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/marketplace" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
              >
                Explorer la Marketplace
                <Globe className="w-5 h-5" />
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold transition-all"
              >
                Nous Contacter
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}