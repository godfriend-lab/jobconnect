import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Lock, 
  ShieldCheck, 
  Database, 
  Eye, 
  CheckCircle2, 
  Key, 
  Server,
  FileText,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

// ==========================================================
// 🚀 SEO HIGH-END : MÉTADONNÉES OPTIMISÉES POUR GOOGLE & IA
// ==========================================================
export const metadata: Metadata = {
  title: 'Protection des Données & Confidentialité | ProKorb (Loi 2019-024 Togo)',
  description: 'Politique de protection des données personnelles de ProKorb. Conformité à la Loi n° 2019-024 du Togo. Chiffrement SSL, contrôle total de vos données et respect de votre vie privée.',
  keywords: [
    'Protection des données ProKorb',
    'Politique de confidentialité Togo',
    'Loi 2019-024 protection données',
    'RGPD Afrique',
    'Sécurité des données Matuneqhyd SARL U',
    'Droit à l\'oubli Togo'
  ],
  alternates: {
    canonical: 'https://www.prokorb.com/data-protection',
  },
  openGraph: {
    title: 'Protection des Données & Confidentialité | ProKorb',
    description: 'Nous protégeons vos données personnelles conformément à la législation togolaise et aux standards internationaux de cybersécurité.',
    url: 'https://www.prokorb.com/data-protection',
    type: 'website',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protection des Données | ProKorb',
    description: 'Transparence, sécurité et contrôle total sur vos données personnelles.',
  },
}

// ==========================================================
// 🧠 SCHEMA.ORG : LANGAGE COMPRÉHENSIBLE PAR LES MOTEURS IA
// ==========================================================
const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Politique de Protection des Données Personnelles",
  "description": "Politique de confidentialité et de protection des données de la plateforme ProKorb, éditée par Matuneqhyd SARL U.",
  "url": "https://www.prokorb.com/data-protection",
  "mainEntity": {
    "@type": "PrivacyPolicy",
    "name": "Politique de Confidentialité ProKorb",
    "inLanguage": "fr-FR",
    "publisher": {
      "@type": "Organization",
      "name": "Matuneqhyd SARL U",
      "url": "https://www.prokorb.com"
    }
  }
}

export default function DataProtectionPage() {
  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  const principles = [
    {
      icon: Lock,
      title: "Chiffrement de bout en bout",
      desc: "Toutes les données transitent via une connexion HTTPS sécurisée avec un chiffrement SSL/TLS 256-bit de niveau bancaire."
    },
    {
      icon: Database,
      title: "Stockage souverain et sécurisé",
      desc: "Vos données sont hébergées sur des serveurs hautement sécurisés, avec des sauvegardes automatiques chiffrées et redondantes."
    },
    {
      icon: Eye,
      title: "Accès strictement restreint",
      desc: "Seul le personnel autorisé et assermenté a accès aux données, protégé par une authentification à deux facteurs (2FA)."
    },
    {
      icon: Key,
      title: "Contrôle total utilisateur",
      desc: "Vous gardez la maîtrise de vos informations. Vous pouvez les exporter, les modifier ou demander leur suppression à tout moment."
    },
  ]

  const rights = [
    "Droit d'accès et de copie de vos données personnelles",
    "Droit de rectification des informations inexactes ou incomplètes",
    "Droit à l'effacement (droit à l'oubli) de votre compte et de vos données",
    "Droit à la limitation du traitement de vos données",
    "Droit à la portabilité des données (format structuré et lisible)",
    "Droit d'opposition au traitement, notamment à des fins de prospection",
  ]

  return (
    <>
      {/* ✅ INJECTION DU SCHEMA.ORG POUR LES MOTEURS DE RECHERCHE IA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicySchema) }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-8 group text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Conformité Légale
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Protection de vos <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Données Personnelles
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Chez <strong className="text-white">ProKorb</strong> (Matuneqhyd SARL U), votre vie privée n'est pas une option, c'est notre fondation. 
              Nous protégeons vos informations conformément à la <strong className="text-white">Loi n° 2019-024</strong> du Togo et aux meilleurs standards internationaux.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Dernière mise à jour : <span className="text-slate-200 font-medium">{currentDate}</span>
            </p>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 -mt-10 relative z-10 space-y-10">
          
          {/* 1. NOS MESURES DE PROTECTION */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Server className="w-7 h-7 text-indigo-600" />
              Nos mesures de sécurité techniques
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="group p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 2. DONNÉES COLLECTÉES (AJOUT CRUCIAL POUR LE SEO IA) */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <FileText className="w-7 h-7 text-indigo-600" />
              Quelles données collectons-nous ?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Dans le strict cadre de l'exécution de nos services de mise en relation, nous collectons uniquement les données nécessaires :
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Identité (Nom, Prénom, Numéro de téléphone)",
                "Localisation approximative (Ville, Quartier)",
                "Données professionnelles (Spécialité, Portfolio, CV)",
                "Données de connexion (Adresse IP, logs de sécurité)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. VOS DROITS LÉGAUX */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Vos droits légaux</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Conformément à la <strong className="text-slate-900 dark:text-white bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">Loi n° 2019-024 du 24 octobre 2019</strong> portant protection des données à caractère personnel en République Togolaise, vous disposez des droits inaliénables suivants :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. DURÉE DE CONSERVATION */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
                <Database className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Durée de conservation des données</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: "Données de compte et de profil", desc: "Conservées pendant la durée de vie active du compte, puis supprimées ou anonymisées 3 ans après la dernière connexion." },
                { title: "Historique des échanges et transactions", desc: "Conservé pendant 5 ans conformément aux obligations légales, comptables et fiscales en vigueur au Togo." },
                { title: "Cookies et traceurs de navigation", desc: "Durée maximale de 13 mois à compter de leur dépôt, renouvelable uniquement avec votre consentement explicite." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. CONTACT DPO (Délégué à la Protection des Données) */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-indigo-200" />
                Délégué à la Protection des Données (DPO)
              </h3>
              <p className="text-indigo-100 mb-8 max-w-2xl leading-relaxed">
                Notre équipe dédiée est à votre entière disposition pour répondre à vos questions, traiter vos demandes d'exercice de droits ou vous accompagner dans la sécurisation de votre compte.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <Mail className="w-6 h-6 text-indigo-200 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Email DPO</p>
                    <p className="font-semibold">dpo@prokorb.tg</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <Phone className="w-6 h-6 text-indigo-200 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Téléphone</p>
                    <p className="font-semibold">+228 70 88 86 99</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <MapPin className="w-6 h-6 text-indigo-200 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Siège Social</p>
                    <p className="font-semibold">Lomé, République Togolaise</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ==========================================
            FOOTER SIMPLE
        ========================================== */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <p>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-200">Matuneqhyd SARL U</strong>. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Politique de Confidentialité
                </Link>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Conditions d'Utilisation
                </Link>
                <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}