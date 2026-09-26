import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  BadgeCheck, 
  Clock, 
  Wallet,
  Users,
  Globe,
  Sparkles,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react'

// ==========================================================
// 🚀 SEO HIGH-END : MÉTADONNÉES OPTIMISÉES
// ==========================================================
export const metadata: Metadata = {
  title: 'Comment Trouver un Artisan Vérifié sur ProKorb | Guide Client 100% Gratuit',
  description: 'Trouvez facilement un artisan ou professionnel vérifié au Togo, Bénin, Côte d\'Ivoire, Sénégal et partout en Afrique. 100% gratuit, 0% commission. Guide étape par étape pour les clients.',
  keywords: [
    'trouver artisan vérifié Afrique',
    'comment utiliser ProKorb client',
    'marketplace services gratuit Togo',
    'trouver plombier électricien Lomé',
    'professionnel vérifié 0% commission',
    'ProKorb guide client'
  ],
  alternates: {
    canonical: 'https://www.prokorb.com/client/how-it-works',
  },
  openGraph: {
    title: 'Trouvez un Artisan de Confiance en 3 Étapes | ProKorb',
    description: 'Guide complet pour les clients : recherchez, contactez et évaluez des professionnels vérifiés dans 9 pays d\'Afrique. 100% gratuit.',
    url: 'https://www.prokorb.com/client/how-it-works',
    type: 'website',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comment Trouver un Artisan Vérifié | ProKorb',
    description: 'Guide client 100% gratuit pour trouver des professionnels de confiance en Afrique.',
  },
}

// ==========================================================
//  SCHEMA.ORG : HOWTO + FAQ (CRUCIAL POUR GOOGLE)
// ==========================================================
const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "name": "Comment trouver et contacter un professionnel vérifié sur ProKorb",
      "description": "Guide complet en 4 étapes pour trouver, comparer et contacter un artisan ou professionnel vérifié sur ProKorb, la marketplace N°1 en Afrique.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Recherchez le professionnel dont vous avez besoin",
          "text": "Utilisez la barre de recherche ou parcourez les catégories pour trouver le métier dont vous avez besoin (plombier, électricien, mécanicien, etc.). Filtrez par votre ville pour des résultats locaux."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Comparez les profils et les avis",
          "text": "Consultez les profils des professionnels, leurs portfolios, leurs avis clients et privilégiez ceux avec le badge bleu 'Vérifié' pour une confiance maximale."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Contactez directement via WhatsApp",
          "text": "Cliquez sur le bouton 'Contacter sur WhatsApp' pour discuter directement avec le professionnel, décrire votre besoin et convenir d'un prix. ProKorb ne prend aucune commission."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Payez directement et laissez un avis",
          "text": "Une fois le travail terminé, payez directement le professionnel selon vos accords (Mobile Money ou espèces). Laissez ensuite un avis honnête pour aider la communauté."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Est-ce que ProKorb est gratuit pour les clients ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, 100% gratuit. La recherche, la mise en relation et l'utilisation de la plateforme sont entièrement gratuites pour les clients. ProKorb ne prend aucune commission sur les prestations."
          }
        },
        {
          "@type": "Question",
          "name": "Comment sont vérifiés les professionnels sur ProKorb ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chaque professionnel vérifié a soumis sa pièce d'identité (CNI, passeport ou ANID) et ses justificatifs de compétences. Notre équipe valide manuellement chaque dossier sous 24h. Le badge bleu 'Vérifié' est votre garantie de sérieux."
          }
        },
        {
          "@type": "Question",
          "name": "Que faire en cas de problème avec un professionnel ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contactez d'abord le professionnel pour une résolution amiable. Si le problème persiste, utilisez le bouton 'Signaler' sur son profil ou contactez notre support via WhatsApp (+228 70 88 86 99). Nous proposons un service de médiation gratuit."
          }
        }
      ]
    }
  ]
}

export default function ClientHowItWorksPage() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Recherchez",
      desc: "Tapez le métier dont vous avez besoin (plombier, électricien, mécanicien...) ou parcourez nos catégories. Filtrez par votre ville pour des résultats proches de chez vous.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: ShieldCheck,
      number: "02",
      title: "Comparez",
      desc: "Consultez les profils, les portfolios, les avis clients. Privilégiez les professionnels avec le badge bleu 'Vérifié' pour une confiance maximale.",
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: MessageCircle,
      number: "03",
      title: "Contactez",
      desc: "Cliquez sur 'Contacter sur WhatsApp' pour discuter directement, décrire votre besoin et convenir d'un prix. Réponse rapide garantie.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: ThumbsUp,
      number: "04",
      title: "Évaluez",
      desc: "Après la prestation, payez directement le professionnel et laissez un avis honnête pour aider la communauté à faire les bons choix.",
      color: "from-pink-500 to-rose-600"
    }
  ]

  const benefits = [
    {
      icon: Wallet,
      title: "100% Gratuit pour les Clients",
      desc: "Recherchez, contactez et comparez autant de professionnels que vous le souhaitez. Aucun frais caché, aucune commission. ProKorb ne vous facture jamais."
    },
    {
      icon: BadgeCheck,
      title: "Professionnels Vérifiés",
      desc: "Les professionnels avec le badge bleu ont été contrôlés manuellement par notre équipe : identité, compétences et références vérifiées."
    },
    {
      icon: Star,
      title: "Avis Authentiques",
      desc: "Consultez les avis laissés par d'autres clients pour faire votre choix en toute connaissance de cause. Transparence totale."
    },
    {
      icon: Clock,
      title: "Réponse Rapide",
      desc: "La plupart des professionnels répondent en moins d'une heure via WhatsApp. Trouvez une solution à votre problème rapidement."
    },
    {
      icon: Users,
      title: "Large Choix",
      desc: "Des dizaines de métiers disponibles : plombiers, électriciens, mécaniciens, développeurs, médecins, couturiers et bien plus."
    },
    {
      icon: Globe,
      title: "Disponible en Afrique",
      desc: "ProKorb est actif dans 9 pays : Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana et Nigeria."
    }
  ]

  const safetyTips = [
    {
      icon: CheckCircle2,
      title: "Privilégiez les pros vérifiés",
      desc: "Le badge bleu garantit que l'identité et les compétences du professionnel ont été validées par notre équipe."
    },
    {
      icon: MessageCircle,
      title: "Demandez un devis écrit",
      desc: "Avant de commencer, convenez d'un prix clair par écrit (WhatsApp ou SMS) pour éviter les malentendus."
    },
    {
      icon: Star,
      title: "Consultez les avis",
      desc: "Lisez les commentaires des autres clients pour vous faire une idée de la qualité du travail."
    },
    {
      icon: AlertTriangle,
      title: "Signalez les problèmes",
      desc: "En cas de souci, utilisez le bouton 'Signaler' ou contactez notre support. Nous intervenons sous 24h."
    }
  ]

  const faqs = [
    {
      q: "Est-ce que ProKorb est vraiment gratuit pour les clients ?",
      a: "Oui, 100% gratuit. La recherche, la mise en relation et l'utilisation de la plateforme sont entièrement gratuites pour les clients. ProKorb ne prend aucune commission sur les prestations. Le seul frais de 5 000 FCFA/an concerne les professionnels qui souhaitent obtenir le badge vérifié."
    },
    {
      q: "Comment sont vérifiés les professionnels ?",
      a: "Chaque professionnel vérifié a soumis sa pièce d'identité (CNI, passeport ou ANID) et ses justificatifs de compétences (diplôme, certificat). Notre équipe valide manuellement chaque dossier sous 24h. Le badge bleu 'Vérifié' est votre garantie de sérieux."
    },
    {
      q: "Comment se passent les paiements ?",
      a: "Les paiements s'effectuent directement entre vous et le professionnel, selon les modalités que vous convenez ensemble : T-Money, Moov Money, Wave, Orange Money, MTN MoMo ou espèces. ProKorb n'intervient pas dans les transactions et ne prend aucune commission."
    },
    {
      q: "Que faire si le travail ne me satisfait pas ?",
      a: "Contactez d'abord le professionnel pour tenter une résolution amiable. Si le problème persiste, utilisez le bouton 'Signaler' sur son profil ou contactez notre support via WhatsApp (+228 70 88 86 99). Nous proposons un service de médiation gratuit."
    },
    {
      q: "Puis-je laisser un avis sur un professionnel ?",
      a: "Oui, et c'est même fortement encouragé ! Après une prestation, vous pouvez laisser une note de 1 à 5 étoiles et un commentaire détaillé. Vos avis aident la communauté à faire des choix éclairés et récompensent les bons professionnels."
    },
    {
      q: "Dans quelles villes ProKorb est-il disponible ?",
      a: "ProKorb est actuellement disponible dans 9 pays d'Afrique de l'Ouest : Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana et Nigeria. Nous couvrons les grandes villes de chaque pays et continuons de nous étendre."
    }
  ]

  return (
    <>
      {/* ✅ INJECTION DU SCHEMA.ORG */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-600/20 to-transparent"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>100% Gratuit pour les Clients</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Trouvez un artisan de confiance <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                en quelques clics
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Recherchez, comparez et contactez des professionnels vérifiés dans votre ville. 
              <span className="text-white font-bold"> 0% de commission</span>, 
              paiement direct, et avis authentiques.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/marketplace" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg transition-all shadow-xl hover:bg-slate-100 hover:-translate-y-1"
              >
                <Search className="w-5 h-5" />
                Rechercher un professionnel
              </Link>
              <Link 
                href="/register?role=client" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
              >
                Créer un compte gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Sans commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Professionnels vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>9 pays d'Afrique</span>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
          
          {/* ==========================================
              LE PROCESSUS EN 4 ÉTAPES
          ========================================== */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Trouvez le professionnel idéal en 4 étapes simples. Rapide, gratuit et sécurisé.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div 
                    key={idx} 
                    className="relative bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2">ÉTAPE {step.number}</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              POURQUOI CHOISIR PROKORB
          ========================================== */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                Pourquoi choisir ProKorb ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                La plateforme conçue pour vous, les clients, avec transparence et simplicité.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="flex gap-5 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              CONSEILS DE SÉCURITÉ
          ========================================== */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-2xl">
                <ShieldCheck className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Conseils pour votre sécurité
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Votre sécurité est notre priorité. Suivez ces conseils simples pour une expérience sereine :
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {safetyTips.map((tip, idx) => {
                const Icon = tip.icon
                return (
                  <div key={idx} className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{tip.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              LE BADGE VÉRIFIÉ EXPLIQUÉ
          ========================================== */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Gage de Confiance
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  Que signifie le badge bleu "Vérifié" ?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Le badge bleu est votre garantie que le professionnel a été contrôlé manuellement par notre équipe. Voici ce qui est vérifié :
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Pièce d'identité valide (CNI, Passeport ou Carte ANID)",
                    "Justificatifs de compétences (diplôme, certificat, attestation)",
                    "Selfie de vérification pour confirmer l'identité",
                    "Paiement des frais de vérification (5 000 FCFA/an)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/verification" 
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all mt-8"
                >
                  En savoir plus sur la vérification <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 flex flex-col justify-center text-white">
                <BadgeCheck className="w-20 h-20 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">
                  Pourquoi privilégier un pro vérifié ?
                </h3>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Identité confirmée et documentée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Compétences professionnelles validées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Apparition en priorité dans les résultats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>3x plus de contacts que les pros non vérifiés</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ==========================================
              FAQ CLIENTS
          ========================================== */}
          <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-12">
              Questions fréquentes des clients
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{faq.q}</h3>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-12 border-l-2 border-indigo-200 dark:border-indigo-800 ml-4">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ==========================================
              CTA FINAL
          ========================================== */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Search className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Besoin d'un professionnel maintenant ?
                </h2>
                <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                  Rejoignez des milliers de clients satisfaits qui ont trouvé le professionnel idéal grâce à ProKorb.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/marketplace" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-indigo-700 rounded-xl font-black text-lg transition-all shadow-xl hover:bg-slate-50 hover:-translate-y-1"
                  >
                    <Search className="w-5 h-5" />
                    Rechercher un professionnel
                  </Link>
                  <a
                    href="https://wa.me/22870888699?text=Bonjour%20ProKorb%2C%20j'ai%20besoin%20d'aide%20pour%20trouver%20un%20professionnel."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg transition-all hover:bg-white/20 backdrop-blur-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Besoin d'aide ? Contactez-nous
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ==========================================
            FOOTER SIMPLE
        ========================================== */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <p>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-200">Matuneqhyd SARL U</strong>. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Confidentialité</Link>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Conditions</Link>
                <Link href="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">FAQ</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}