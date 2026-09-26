import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowRight, 
  CheckCircle2, 
  BadgeCheck, 
  Wallet, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Smartphone, 
  FileText,
  MessageCircle,
  Star,
  Globe
} from 'lucide-react'

// ==========================================================
// 🚀 SEO HIGH-END : MÉTADONNÉES OPTIMISÉES
// ==========================================================
export const metadata: Metadata = {
  title: 'Devenir Professionnel Vérifié sur ProKorb | 0% Commission, 5 000 FCFA/an',
  description: 'Inscrivez-vous gratuitement sur ProKorb et obtenez votre badge vérifié pour 5 000 FCFA/an. 0% de commission, priorité dans les résultats, et paiement direct par vos clients au Togo, Bénin, Côte d\'Ivoire et partout en Afrique.',
  keywords: [
    'devenir professionnel vérifié Afrique',
    'inscription artisan gratuit Togo',
    'badge vérifié ProKorb 5000 FCFA',
    'trouver des clients sans commission',
    'plateforme artisans Afrique de l\'Ouest',
    'Matuneqhyd SARL U'
  ],
  alternates: {
    canonical: 'https://www.prokorb.com/pro/how-it-works',
  },
  openGraph: {
    title: 'Boostez votre activité avec ProKorb | 0% Commission',
    description: 'Rejoignez la marketplace N°1 en Afrique. Inscription gratuite, badge vérifié à 5 000 FCFA/an. Gardez 100% de vos revenus.',
    url: 'https://www.prokorb.com/pro/how-it-works',
    type: 'website',
    siteName: 'ProKorb',
  },
}

// ==========================================================
// 🧠 SCHEMA.ORG : HOWTO + FAQ (CRUCIAL POUR GOOGLE)
// ==========================================================
const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "name": "Comment devenir un professionnel vérifié sur ProKorb",
      "description": "Guide en 4 étapes pour s'inscrire, se faire vérifier et commencer à recevoir des clients sur ProKorb, la marketplace N°1 en Afrique.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Créez votre compte gratuitement",
          "text": "Inscrivez-vous en tant que professionnel en 2 minutes. Remplissez votre profil avec votre spécialité, votre ville et vos coordonnées."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Complétez votre profil et vos services",
          "text": "Ajoutez une photo professionnelle, une description de votre expérience et publiez vos premiers services pour attirer les clients."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Obtenez votre badge vérifié (5 000 FCFA/an)",
          "text": "Envoyez votre CNI/Passeport, un justificatif de métier et un selfie via WhatsApp. Réglez les frais uniques de 5 000 FCFA via T-Money ou Moov Money. Validation sous 24h."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Recevez des demandes et soyez payé directement",
          "text": "Les clients vous contactent. Vous convenez du prix ensemble. Vous êtes payé directement par le client (Mobile Money ou espèces). ProKorb prend 0% de commission."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "L'inscription sur ProKorb est-elle vraiment gratuite ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, l'inscription, la création de profil et la réception de demandes sont 100% gratuites. ProKorb ne prend 0% de commission. Le seul frais est de 5 000 FCFA par an pour le badge de vérification, qui est optionnel mais fortement recommandé."
          }
        },
        {
          "@type": "Question",
          "name": "Comment payer les 5 000 FCFA pour le badge vérifié ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le paiement se fait uniquement par Mobile Money : T-Money au 70 88 86 99 ou Moov Money au 79 94 07 93. Envoyez ensuite la capture d'écran de la transaction sur notre WhatsApp pour une activation sous 24h."
          }
        }
      ]
    }
  ]
}

export default function ProHowItWorksPage() {
  const steps = [
    {
      icon: Smartphone,
      title: "1. Inscription Gratuite",
      desc: "Créez votre compte professionnel en 2 minutes. C'est 100% gratuit, sans engagement ni carte bancaire.",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      icon: FileText,
      title: "2. Complétez votre Profil",
      desc: "Ajoutez votre photo, votre spécialité, votre ville et décrivez votre expérience. Plus votre profil est complet, plus vous inspirez confiance.",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      icon: BadgeCheck,
      title: "3. Obtenez le Badge Vérifié",
      desc: "Envoyez votre CNI et un justificatif de métier. Réglez les frais uniques de 5 000 FCFA/an. Votre badge bleu est activé sous 24h.",
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      highlight: true
    },
    {
      icon: MessageCircle,
      title: "4. Recevez des Clients",
      desc: "Apparaissez en priorité dans les recherches. Les clients vous contactent, vous convenez du prix, et vous êtes payé directement par eux.",
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    }
  ]

  const benefits = [
    {
      icon: Wallet,
      title: "0% de Commission",
      desc: "Contrairement aux autres plateformes, nous ne prenons rien sur vos prestations. Vous gardez 100% de vos revenus, sans exception."
    },
    {
      icon: TrendingUp,
      title: "Visibilité x3",
      desc: "Les professionnels avec le badge vérifié apparaissent en tête des résultats de recherche et reçoivent en moyenne 3 fois plus de contacts."
    },
    {
      icon: ShieldCheck,
      title: "Confiance Immédiate",
      desc: "Le badge bleu 'Vérifié' rassure instantanément les clients. Ils savent que votre identité et vos compétences ont été validées par notre équipe."
    },
    {
      icon: Users,
      title: "Réseau Panafricain",
      desc: "Développez votre clientèle non seulement dans votre ville, mais dans les 9 pays où ProKorb est actif (Togo, Bénin, CI, Sénégal, etc.)."
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
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/20 to-transparent"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-8">
              <Globe className="w-4 h-4 text-indigo-300" />
              <span>Disponible dans 9 pays d'Afrique</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Développez votre activité <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                sans payer de commission
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Rejoignez la marketplace N°1 des services en Afrique. Inscription 100% gratuite, 
              badge vérifié à <span className="text-white font-bold">5 000 FCFA/an</span>, 
              et vous gardez <span className="text-white font-bold">100% de vos revenus</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register?role=pro" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-1"
              >
                M'inscrire gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/verification" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
              >
                En savoir plus sur la vérification
              </Link>
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
                Un processus simple, transparent et conçu pour vous faire gagner du temps et de l'argent.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div 
                    key={idx} 
                    className={`relative p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                      step.highlight 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-indigo-500 shadow-xl shadow-indigo-500/20' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      step.highlight ? 'bg-white/20' : step.color
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${step.highlight ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {step.desc}
                    </p>
                    {step.highlight && (
                      <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-lg">
                        RECOMMANDÉ
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              ZOOM SUR LA VÉRIFICATION (TRANSPARENCE TOTALE)
          ========================================== */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Processus de Vérification
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  Obtenez votre Badge Bleu en 3 étapes simples
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  La vérification est la clé pour multiplier vos contacts par 3. Voici exactement ce dont vous avez besoin :
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Une photo claire Recto/Verso de votre CNI, Passeport ou Carte ANID",
                    "Un justificatif de votre métier (Diplôme, Certificat ou Attestation)",
                    "Un selfie de vérification pour confirmer votre identité",
                    "Le règlement des frais uniques de 5 000 FCFA pour 1 an"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/verification" 
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all"
                >
                  Voir le guide détaillé de vérification <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-8 md:p-12 bg-slate-900 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  Comment payer les 5 000 FCFA ?
                </h3>
                <p className="text-slate-300 mb-8">
                  Nous acceptons uniquement les paiements Mobile Money pour votre sécurité et votre rapidité.
                </p>
                
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">T-Money (Togocom)</p>
                      <p className="text-2xl font-black tracking-wider">70 88 86 99</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-xs">T-M</span>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Moov Money</p>
                      <p className="text-2xl font-black tracking-wider">79 94 07 93</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-xs">Moov</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mt-6 text-center">
                  💡 Après le paiement, envoyez la capture d'écran sur notre WhatsApp pour une activation sous 24h.
                </p>
              </div>
            </div>
          </section>

          {/* ==========================================
              AVANTAGES CONCRETS
          ========================================== */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                Pourquoi choisir ProKorb ?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Nous avons construit cette plateforme pour les professionnels, pas pour les intermédiaires.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <div key={idx} className="flex gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ==========================================
              FAQ PROFESSIONNELS
          ========================================== */}
          <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-12">
              Questions fréquentes des professionnels
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "Est-ce que je peux utiliser ProKorb si je ne suis pas encore vérifié ?",
                  a: "Oui, absolument. Vous pouvez créer votre profil et recevoir des demandes gratuitement. Cependant, le badge vérifié (5 000 FCFA/an) vous donne une priorité absolue dans les résultats et inspire beaucoup plus confiance aux clients."
                },
                {
                  q: "Comment se passent les paiements avec les clients ?",
                  a: "ProKorb ne gère pas l'argent. Vous convenez du prix directement avec le client et il vous paie comme il le souhaite : T-Money, Moov Money, Wave, Orange Money, MTN MoMo ou en espèces. Nous ne prenons 0% de commission."
                },
                {
                  q: "Le renouvellement du badge vérifié est-il automatique ?",
                  a: "Non, pour respecter votre liberté, le renouvellement n'est pas automatique. Nous vous enverrons un rappel 30 jours avant l'expiration. Vous pourrez alors renouveler pour 5 000 FCFA ou laisser expirer le badge."
                },
                {
                  q: "Dans quelles villes puis-je travailler ?",
                  a: "Vous pouvez travailler dans n'importe quelle ville des 9 pays où ProKorb est actif (Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana, Nigeria). Indiquez simplement votre zone d'intervention lors de votre inscription."
                }
              ].map((faq, idx) => (
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
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-16 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <TrendingUp className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Prêt à multiplier vos clients ?
                </h2>
                <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
                  Rejoignez des milliers de professionnels qui ont choisi la transparence, 
                  la gratuité et la croissance avec ProKorb.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/register?role=pro" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-indigo-700 rounded-xl font-black text-lg transition-all shadow-xl hover:bg-slate-50 hover:-translate-y-1"
                  >
                    Créer mon compte professionnel
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="https://wa.me/22870888699?text=Bonjour%20ProKorb%2C%20j'ai%20une%20question%20sur%20l'inscription%20pro."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg transition-all hover:bg-white/20 backdrop-blur-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Poser une question sur WhatsApp
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