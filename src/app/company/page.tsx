// @ts-nocheck
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Building2, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Globe, 
  Heart, 
  Users, 
  Cpu, 
  Handshake,
  TrendingUp,
  CheckCircle2,
  Mail,
  Phone,
  Code2,
  BrainCircuit
} from 'lucide-react'

// ✅ MÉTADONNÉES SEO COMPLÈTES ET MISES À JOUR
export const metadata: Metadata = {
  title: 'Notre Entreprise | ProKorb by Matuneqhyd SARL U & Ideenwerk-Technologies',
  description: 'ProKorb est le produit phare de Matuneqhyd SARL U, fondée par Yves Atsou Agbevivi. Dirigé technologiquement par l\'expert Godfriend Goretti et son équipe d\'élite Ideenwerk-Technologies (IA, Cybersécurité, Data).',
  keywords: [
    'ProKorb entreprise',
    'Matuneqhyd SARL U',
    'Yves Atsou Agbevivi',
    'Godfriend Goretti',
    'Ideenwerk-Technologies',
    'startup Togo',
    'développeur fullstack Afrique',
    'intelligence artificielle Togo',
    'digitalisation PME Afrique'
  ],
  openGraph: {
    title: 'Notre Entreprise | ProKorb by Matuneqhyd & Ideenwerk-Technologies',
    description: 'Découvrez la vision de Yves Atsou Agbevivi et l\'expertise technologique de Godfriend Goretti derrière ProKorb, la marketplace N°1 des services au Togo.',
    type: 'website',
    url: 'https://www.prokorb.com/company',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre Entreprise | ProKorb',
    description: 'Matuneqhyd SARL U & Ideenwerk-Technologies - L\'excellence technologique au service de l\'Afrique.',
  },
  alternates: {
    canonical: 'https://www.prokorb.com/company',
  },
}

// ✅ SCHEMA.ORG ORGANIZATION (Mis à jour pour refléter la structure réelle)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Matuneqhyd SARL U",
  "alternateName": "ProKorb",
  "url": "https://www.prokorb.com",
  "logo": "https://www.prokorb.com/logo.png",
  "description": "Matuneqhyd SARL U est une entreprise technologique togolaise. Son produit phare, ProKorb, est développé par son département technologique dirigé par Godfriend Goretti et le mouvement Ideenwerk-Technologies.",
  "founder": {
    "@type": "Person",
    "name": "Yves Atsou Agbevivi",
    "jobTitle": "Fondateur & CEO, Matuneqhyd SARL U"
  },
  "employee": {
    "@type": "Person",
    "name": "Godfriend Goretti",
    "jobTitle": "Directeur du Département Technologique & Créateur de ProKorb"
  },
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
        <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-8">
              <Building2 className="w-4 h-4 text-indigo-300" />
              <span>Produit Phare de Matuneqhyd SARL U</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
              L'Excellence Technologique <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                au Service de l'Afrique
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              ProKorb est bien plus qu'une marketplace. C'est la fusion parfaite entre la vision 
              stratégique de <strong>Matuneqhyd SARL U</strong> et la puissance de feu technique du mouvement 
              <strong> Ideenwerk-Technologies</strong>.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          
          {/* ==========================================
              LEADERSHIP & VISION
          ========================================== */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                Les Architectes de la Révolution
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Une alliance puissante entre vision business et expertise technique de niveau mondial.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Yves Atsou Agbevivi */}
              <div className="group bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Yves Atsou Agbevivi</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">Fondateur & CEO, Matuneqhyd SARL U</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  Visionnaire et stratège, Yves est le fondateur de Matuneqhyd SARL U. Il porte la vision globale de ProKorb, 
                  assurant son ancrage dans les réalités du marché africain tout en visant l'excellence opérationnelle. 
                  Son leadership garantit que chaque décision sert l'intérêt des professionnels et des clients, 
                  dans une transparence totale.
                </p>
              </div>

              {/* Godfriend Goretti */}
              <div className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-700/50">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <Code2 className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Godfriend Goretti</h3>
                    <p className="text-purple-400 font-semibold mb-4">Directeur Technologique & Créateur de ProKorb</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mt-4 border-t border-slate-700 pt-6">
                  Expert développeur Fullstack de renommée internationale, Godfriend est le maître d'œuvre technique de ProKorb. 
                  Fort d'une expérience sur des projets d'envergure mondiale comme <strong>Digiu.ai, Werklock et Poplove</strong>, 
                  il a conçu l'architecture robuste et sécurisée de la plateforme. Il est également le fondateur du mouvement 
                  <strong> Ideenwerk-Technologies</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* ==========================================
              LE MOUVEMENT IDEENWERK-TECHNOLOGIES
          ========================================== */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-3xl -m-4 blur-xl"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    La Puissance de Feu : Ideenwerk-Technologies
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                    Derrière ProKorb se cache une élite technologique. Godfriend Goretti a réuni au sein du mouvement 
                    <strong> Ideenwerk-Technologies</strong> une équipe de <strong>14 experts de haut niveau</strong>, 
                    répartis entre l'Afrique et l'Europe.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <BrainCircuit className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Intelligence Artificielle</h4>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Cybersécurité</h4>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Data Analysis</h4>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-6 text-lg font-medium text-indigo-600 dark:text-indigo-400">
                    🚀 Ils ont déjà digitalisé avec succès de nombreuses entreprises et PME, et nous ne faisons que commencer.
                  </p>
                </div>
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
                  icon: ShieldCheck,
                  title: "Sécurité de Niveau Bancaire",
                  desc: "Chiffrement de bout en bout et audits de sécurité réguliers par nos experts en cybersécurité."
                },
                {
                  icon: Globe,
                  title: "Standards Internationaux",
                  desc: "Une architecture conçue par des experts ayant travaillé sur des projets mondiaux (Digiu.ai, Werklock)."
                },
                {
                  icon: Heart,
                  title: "Impact Économique Réel",
                  desc: "Formaliser et valoriser le travail des professionnels locaux avec des outils de pointe."
                },
                {
                  icon: Users,
                  title: "Inclusion Numérique",
                  desc: "Une interface intuitive, pensée pour être accessible à tous, quel que soit le niveau de maîtrise technologique."
                },
                {
                  icon: BrainCircuit,
                  title: "Innovation par l'IA",
                  desc: "Intégration continue de l'intelligence artificielle pour améliorer le matching et l'expérience utilisateur."
                },
                {
                  icon: MapPin,
                  title: "Ancrage Local Fort",
                  desc: "Siège social au Togo, dirigé par des leaders qui comprennent intimement les dynamiques africaines."
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Raison Sociale</h3>
                  <p className="font-semibold text-slate-900 dark:text-white text-lg">Matuneqhyd SARL U</p>
                  <p className="text-sm mt-1 text-indigo-600 dark:text-indigo-400 font-medium">Produit phare : ProKorb</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Siège Social</h3>
                  <p className="font-medium">Lomé, République Togolaise</p>
                  <p className="text-sm mt-1">Afrique de l'Ouest</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Direction</h3>
                  <p className="font-medium">Yves Atsou Agbevivi (Fondateur & CEO)</p>
                  <p className="font-medium">Godfriend Goretti (Directeur Technologique)</p>
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
              CALL TO ACTION
          ========================================== */}
          <section className="text-center pb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
              Rejoignez la Révolution Numérique
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Matuneqhyd SARL U et le mouvement Ideenwerk-Technologies continuent d'investir dans l'innovation 
              pour offrir des solutions qui dépassent les attentes. Découvrez l'écosystème ProKorb.
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