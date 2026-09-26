import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Award, 
  MessageCircle,
  Upload,
  Wallet,
  BadgeCheck,
  TrendingUp,
  Users,
  Star,
  FileText,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import PaymentNumbers from '@/components/PaymentNumbers'

// ==========================================================
// 🚀 SEO HIGH-END : MÉTADONNÉES OPTIMISÉES
// ==========================================================
export const metadata: Metadata = {
  title: 'Vérification Professionnel ProKorb | Badge Vérifié - 5 000 FCFA/an',
  description: 'Obtenez votre badge de professionnel vérifié sur ProKorb pour seulement 5 000 FCFA/an. Processus simple via WhatsApp : CNI + Diplôme + Selfie. Validation sous 24h. Boostez votre visibilité de 300%.',
  keywords: [
    'vérification professionnel Togo',
    'badge vérifié ProKorb',
    '5000 FCFA vérification artisan',
    'devenir pro vérifié Lomé',
    'certification professionnel Afrique',
    'augmenter visibilité artisan Togo',
    'Matuneqhyd SARL U'
  ],
  alternates: {
    canonical: 'https://www.prokorb.com/verification',
  },
  openGraph: {
    title: 'Devenez un Professionnel Vérifié ProKorb | 5 000 FCFA/an',
    description: 'Processus simple et rapide : Badge bleu exclusif, priorité dans les résultats, 3x plus de clients. Paiement Mobile Money.',
    url: 'https://www.prokorb.com/verification',
    type: 'website',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Badge Vérifié ProKorb | 5 000 FCFA/an',
    description: 'Validation sous 24h. Paiement T-Money ou Moov Money. Boostez votre activité dès maintenant.',
  },
}

// ==========================================================
//  SCHEMA.ORG : OPTIMISÉ POUR LES MOTEURS IA
// ==========================================================
const verificationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vérification de Professionnel ProKorb",
  "description": "Service de vérification d'identité et de compétences pour les professionnels sur la plateforme ProKorb. Badge vérifié valable 1 an.",
  "provider": {
    "@type": "Organization",
    "name": "Matuneqhyd SARL U - ProKorb",
    "url": "https://www.prokorb.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "5000",
    "priceCurrency": "XOF",
    "description": "Paiement unique annuel. Aucun frais caché."
  },
  "processingTime": "P1D",
  "serviceType": "Identity Verification",
  "areaServed": {
    "@type": "Country",
    "name": "Togo"
  }
}

export default function VerificationPage() {
  const steps = [
    {
      icon: MessageCircle,
      number: "1",
      title: "Contactez-nous sur WhatsApp",
      desc: "Cliquez sur le bouton vert ci-dessous. Un message automatique vous parviendra et nous vous enverrons un guide de bienvenue.",
      color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
    },
    {
      icon: Upload,
      number: "2",
      title: "Envoyez vos documents",
      desc: "Photo claire Recto/Verso de votre CNI, Passeport ou Carte ANID + Votre Diplôme/Certificat + Un selfie de vérification.",
      color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      required: true
    },
    {
      icon: Wallet,
      number: "3",
      title: "Effectuez le paiement",
      desc: "Envoyez 5 000 FCFA via T-Money au 70 88 86 99 ou Moov Money au 79 94 07 93.",
      color: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
      price: true
    },
    {
      icon: BadgeCheck,
      number: "4",
      title: "Envoyez la preuve et soyez vérifié",
      desc: "Partagez la capture d'écran de la transaction sur WhatsApp. Votre badge sera activé sous 24h après validation.",
      color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
    },
  ]

  const benefits = [
    { 
      icon: BadgeCheck, 
      title: "Badge Bleu 'Vérifié'", 
      desc: "Affichez le badge exclusif sur votre profil pour inspirer une confiance immédiate.",
      highlight: true
    },
    { 
      icon: TrendingUp, 
      title: "Priorité Absolue", 
      desc: "Apparaissez en tête des résultats de recherche. Jusqu'à 3x plus de visibilité." 
    },
    { 
      icon: Users, 
      title: "Confiance Accrue", 
      desc: "Les clients sont 3x plus susceptibles de choisir un professionnel vérifié." 
    },
    { 
      icon: Star, 
      title: "Indépendant", 
      desc: "Ce badge s'ajoute à votre abonnement visibilité actuel. Cumulez les avantages." 
    },
  ]

  const faqs = [
    {
      q: "Le badge est-il valable combien de temps ?",
      a: "Le badge de professionnel vérifié est valable 12 mois à compter de la date de validation. Vous pourrez le renouveler pour 5 000 FCFA supplémentaires."
    },
    {
      q: "Puis-je payer en plusieurs fois ?",
      a: "Non, le paiement de 5 000 FCFA est unique et annuel. Cependant, c'est un investissement qui peut multiplier vos revenus par 3."
    },
    {
      q: "Que se passe-t-il si mon dossier est refusé ?",
      a: "Si vos documents ne sont pas conformes, nous vous expliquerons précisément pourquoi et vous pourrez les renvoyer gratuitement."
    },
    {
      q: "Le badge est-il visible par tous les clients ?",
      a: "Oui, le badge bleu 'Vérifié' apparaît sur votre profil public, dans les résultats de recherche et à côté de votre nom dans les messages."
    }
  ]

  return (
    <>
      {/* ✅ INJECTION DU SCHEMA.ORG POUR GOOGLE ET LES IA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(verificationSchema) }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-8 group text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Processus 100% Sécurisé</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Devenez un <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                Professionnel Vérifié
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl leading-relaxed mb-8">
              Obtenez votre <strong className="text-white">badge bleu exclusif</strong> pour seulement 
              <span className="text-white font-bold text-2xl mx-2">5 000 FCFA/an</span>.
              <br className="hidden md:block" />
              Validation sous 24h. Boostez votre visibilité et multipliez vos contacts par 3.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Validation 24-48h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>0% Commission</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Wallet className="w-4 h-4 text-emerald-300" />
                <span>Paiement Mobile Money</span>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 -mt-10 relative z-10 space-y-10">
          
          {/* ==========================================
              PRIX ET PROCESSUS (COMBINÉS)
          ========================================== */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-900/10 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Colonne Gauche - Prix */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <Award className="w-3.5 h-3.5" />
                  Offre Exclusive
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Badge Vérifié ProKorb
                </h2>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">5 000</span>
                    <span className="text-xl font-bold text-slate-700 dark:text-slate-300">FCFA <span className="text-base font-normal text-slate-500">/ an</span></span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Paiement unique annuel. Aucun frais caché.</p>
                </div>
                
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Vos avantages
                </h3>
                <ul className="space-y-3">
                  {[
                    "Badge bleu 'Vérifié' exclusif sur votre profil",
                    "Apparition en priorité absolue dans les résultats",
                    "Confiance accrue des clients (jusqu'à 3x plus de contacts)",
                    "Indépendant de votre abonnement visibilité actuel"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonne Droite - Comment ça marche */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
                  Comment ça marche ? <span className="text-indigo-600 dark:text-indigo-400">(Simple & Rapide)</span>
                </h2>
                <div className="space-y-4">
                  {steps.map((step, idx) => {
                    const Icon = step.icon
                    return (
                      <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl border ${step.color} transition-all hover:scale-[1.02]`}>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center font-black text-sm">
                            {step.number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{step.title}</h3>
                          <p className="text-sm opacity-90 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              NUMÉROS DE PAIEMENT (CLIENT COMPONENT)
          ========================================== */}
          <PaymentNumbers />

          {/* ==========================================
              BOUTON WHATSAPP CTA PRINCIPAL
          ========================================== */}
          <section className="text-center pb-8">
            <a
              href="https://wa.me/22870888699?text=Bonjour%20ProKorb%2C%20je%20souhaite%20obtenir%20mon%20badge%20de%20professionnel%20v%C3%A9rifi%C3%A9."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-green-500/30 hover:-translate-y-1 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              VÉRIFIER MON COMPTE
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Cliquez pour démarrer le processus de vérification sur WhatsApp
            </p>
          </section>

          {/* ==========================================
              AVANTAGES DÉTAILLÉS
          ========================================== */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Pourquoi devenir un professionnel vérifié ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      benefit.highlight 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      benefit.highlight ? 'bg-white/20' : 'bg-indigo-100 dark:bg-indigo-900/30'
                    }`}>
                      <Icon className={`w-6 h-6 ${benefit.highlight ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                    </div>
                    <h3 className={`font-bold mb-2 ${benefit.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {benefit.title}
                    </h3>
                    <p className={`text-sm ${benefit.highlight ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {benefit.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              FAQ
          ========================================== */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-200 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-3">
                    <span className="text-indigo-600 dark:text-indigo-400 font-black">Q:</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">R:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ==========================================
              CONTACT SUPPORT
          ========================================== */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-indigo-200" />
                Besoin d'aide pour la vérification ?
              </h3>
              <p className="text-indigo-100 mb-8 max-w-2xl leading-relaxed">
                Notre équipe est à votre disposition pour vous accompagner dans chaque étape du processus de vérification.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                  <Mail className="w-6 h-6 text-indigo-200 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Email</p>
                    <p className="font-semibold">contact@prokorb.tg</p>
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
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Siège</p>
                    <p className="font-semibold">Lomé, Togo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ==========================================
            FOOTER
        ========================================== */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <p>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-200">Matuneqhyd SARL U</strong>. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Confidentialité
                </Link>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Conditions
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