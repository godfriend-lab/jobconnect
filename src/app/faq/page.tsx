import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  ShieldCheck,
  Sparkles,
  Globe
} from 'lucide-react'
import FaqSearch from '@/components/FaqSearch'

// ==========================================================
// 🚀 SEO HIGH-END : MÉTADONNÉES OPTIMISÉES (AFRIQUE)
// ==========================================================
export const metadata: Metadata = {
  title: 'FAQ ProKorb | 30 Réponses pour Clients & Professionnels en Afrique',
  description: 'Questions fréquentes sur ProKorb : inscription 100% gratuite, badge vérifié à 5 000 FCFA/an, 0% commission, sécurité et paiement Mobile Money au Togo, Bénin, Côte d\'Ivoire, Sénégal et plus.',
  keywords: [
    'FAQ ProKorb Afrique',
    'marketplace services Afrique de l\'Ouest',
    'badge vérifié professionnel 5000 FCFA',
    '0% commission artisan Afrique',
    'trouver professionnel vérifié Lomé Abidjan Dakar',
    'inscription gratuite professionnel Afrique'
  ],
  alternates: {
    canonical: 'https://www.prokorb.com/faq',
  },
  openGraph: {
    title: 'FAQ ProKorb | La Référence des Services en Afrique',
    description: '30 questions-réponses pour les clients et professionnels. Transparence totale : 0% commission, badge vérifié à 5 000 FCFA/an. Disponible dans 9 pays.',
    url: 'https://www.prokorb.com/faq',
    type: 'website',
    siteName: 'ProKorb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ ProKorb | 30 Questions-Réponses',
    description: 'Tout savoir sur ProKorb : gratuité, vérification, sécurité et expansion en Afrique.',
  },
}

// ==========================================================
// 🧠 SCHEMA.ORG FAQPAGE (CRUCIAL POUR GOOGLE RICH SNIPPETS)
// ==========================================================
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que ProKorb et dans quels pays est-il disponible ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ProKorb est la marketplace N°1 des services professionnels en Afrique de l'Ouest, éditée par Matuneqhyd SARL U. Elle est actuellement disponible au Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana et Nigeria. L'inscription est 100% gratuite, avec 0% de commission."
      }
    },
    {
      "@type": "Question",
      "name": "ProKorb est-il vraiment gratuit pour les professionnels ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, absolument. L'inscription, la publication de services et la réception de demandes sont 100% gratuites. ProKorb ne prend 0% de commission. Le seul frais est de 5 000 FCFA/an pour le badge de vérification, optionnel mais recommandé pour multiplier vos contacts par 3."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le badge vérifié et combien coûte-t-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le badge vérifié est un symbole bleu exclusif qui apparaît sur votre profil après validation de votre identité et de vos compétences par notre équipe. Il coûte 5 000 FCFA par an (paiement unique), renouvelable à l'identique, et vous donne une priorité absolue dans les résultats de recherche."
      }
    }
  ]
}

// ==========================================================
// 📋 LES 30 QUESTIONS-RÉPONSES STRATÉGIQUES (SCOPE AFRIQUE)
// ==========================================================
const faqs = [
  // === GÉNÉRAL ===
  {
    category: "Général",
    question: "Qu'est-ce que ProKorb et comment ça marche ?",
    answer: "ProKorb est la marketplace N°1 des services professionnels en Afrique de l'Ouest, éditée par Matuneqhyd SARL U. Elle met en relation des clients avec des artisans et professionnels vérifiés. L'inscription est 100% gratuite, il n'y a 0% de commission, et le seul frais est de 5 000 FCFA/an pour obtenir le badge de professionnel vérifié."
  },
  {
    category: "Général",
    question: "Dans quels pays ProKorb est-il actuellement disponible ?",
    answer: "ProKorb est opérationnel dans 9 pays d'Afrique de l'Ouest : Togo, Bénin, Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Niger, Ghana et Nigeria. Nous continuons d'étendre notre réseau pour couvrir l'ensemble du continent africain d'ici 2026."
  },
  {
    category: "Général",
    question: "ProKorb est-il vraiment gratuit pour les professionnels ?",
    answer: "Oui, absolument. L'inscription, la création de profil, la publication de services et la réception de demandes clients sont 100% gratuites. ProKorb ne prélève 0% de commission sur vos prestations. Le seul frais est de 5 000 FCFA par an pour le badge de vérification, qui est optionnel mais fortement recommandé."
  },
  {
    category: "Général",
    question: "Qui est derrière ProKorb ?",
    answer: "ProKorb est le produit phare de Matuneqhyd SARL U, fondée par Yves Atsou Agbevivi. La direction technologique est assurée par Godfriend Goretti, expert développeur Fullstack ayant travaillé sur des projets internationaux (Digiu.ai, Werklock, Poplove), et fondateur du mouvement Ideenwerk-Technologies qui réunit 14 experts en IA, cybersécurité et data analysis."
  },
  {
    category: "Général",
    question: "Quelle est la différence majeure entre ProKorb et les autres plateformes ?",
    answer: "Trois différences fondamentales : 1) 0% de commission (vous gardez 100% de vos revenus), 2) Un modèle transparent avec un seul frais de 5 000 FCFA/an pour la vérification, 3) Une équipe 100% africaine qui comprend les réalités locales et propose un support réactif via WhatsApp."
  },

  // === CLIENTS ===
  {
    category: "Clients",
    question: "Comment trouver un professionnel de confiance sur ProKorb ?",
    answer: "C'est très simple : utilisez la barre de recherche pour trouver un métier (ex: plombier, électricien), filtrez par votre ville, puis consultez les profils. Privilégiez toujours les professionnels avec le badge bleu 'Vérifié' et les avis positifs. Vous pouvez les contacter directement via WhatsApp."
  },
  {
    category: "Clients",
    question: "Que signifie le badge bleu 'Vérifié' sur un profil ?",
    answer: "Le badge bleu 'Vérifié' garantit que le professionnel a soumis sa pièce d'identité (CNI, passeport ou ANID) et ses justificatifs de compétences, qui ont été validés manuellement par notre équipe. C'est un gage de sérieux, de sécurité et de professionnalisme."
  },
  {
    category: "Clients",
    question: "Comment contacter directement un professionnel ?",
    answer: "Vous avez deux options : 1) Via WhatsApp en cliquant sur le bouton vert 'Contacter sur WhatsApp' sur le profil du professionnel, 2) Via notre messagerie intégrée si vous êtes connecté à votre compte ProKorb. Nous recommandons WhatsApp pour une réponse plus rapide."
  },
  {
    category: "Clients",
    question: "Comment se passent les paiements pour une prestation ?",
    answer: "Les paiements s'effectuent directement entre vous et le professionnel, selon les modalités que vous convenez ensemble (Mobile Money local comme T-Money, Moov, Wave, Orange Money, MTN MoMo, ou espèces). ProKorb n'intervient pas dans les transactions et ne prend aucune commission."
  },
  {
    category: "Clients",
    question: "Puis-je laisser un avis sur un professionnel après une prestation ?",
    answer: "Oui, et c'est même fortement encouragé ! Après une prestation, vous pouvez laisser une note de 1 à 5 étoiles et un commentaire détaillé sur le profil du professionnel. Vos avis aident la communauté à faire des choix éclairés et récompensent les bons professionnels."
  },
  {
    category: "Clients",
    question: "Que faire en cas de litige ou de problème avec un professionnel ?",
    answer: "En cas de problème, contactez d'abord le professionnel pour tenter une résolution amiable. Si cela ne fonctionne pas, contactez notre support via WhatsApp (+228 70 88 86 99) ou email. Nous proposons un service de médiation gratuit pour faciliter la résolution du conflit."
  },

  // === PROFESSIONNELS ===
  {
    category: "Professionnels",
    question: "Comment m'inscrire en tant que professionnel sur ProKorb ?",
    answer: "L'inscription est gratuite et prend 2 minutes : cliquez sur 'Devenir professionnel' sur la page d'accueil, remplissez vos informations (nom, spécialité, ville, téléphone), et publiez votre premier service. Vous pouvez immédiatement commencer à recevoir des demandes de clients dans votre ville."
  },
  {
    category: "Professionnels",
    question: "Dois-je payer un abonnement mensuel pour utiliser ProKorb ?",
    answer: "Non, il n'y a aucun abonnement mensuel obligatoire. L'utilisation de base est 100% gratuite. Vous pouvez créer votre profil, publier vos services et recevoir des demandes sans rien payer. Le seul frais est de 5 000 FCFA/an pour le badge de vérification."
  },
  {
    category: "Professionnels",
    question: "ProKorb prend-il une commission sur mes revenus ?",
    answer: "Jamais. ProKorb fonctionne sur un modèle de 0% de commission. Vous conservez 100% de vos revenus, peu importe le montant de la prestation. C'est notre engagement fondamental envers les professionnels africains."
  },
  {
    category: "Professionnels",
    question: "Comment obtenir plus de visibilité et de clients sur la plateforme ?",
    answer: "Trois leviers puissants : 1) Obtenez le badge vérifié (5 000 FCFA/an) pour apparaître en priorité absolue dans les résultats, 2) Complétez votre profil à 100% (photo, bio, portfolio, avis), 3) Répondez rapidement aux demandes. Les pros vérifiés reçoivent jusqu'à 3x plus de contacts."
  },
  {
    category: "Professionnels",
    question: "Quels documents sont nécessaires pour obtenir le badge vérifié ?",
    answer: "Trois éléments simples : 1) Une photo claire Recto/Verso de votre CNI, Passeport ou Carte ANID, 2) Un justificatif de votre métier (diplôme, certificat, attestation d'expérience), 3) Un selfie de vérification. Envoyez le tout via WhatsApp au +228 70 88 86 99."
  },
  {
    category: "Professionnels",
    question: "Combien de temps dure le processus de vérification d'un professionnel ?",
    answer: "La vérification est traitée sous 24 à 48 heures après réception de vos documents et du paiement de 5 000 FCFA. Vous recevez une notification dès que votre badge est activé. En cas de dossier incomplet, nous vous contactons pour vous guider."
  },
  {
    category: "Professionnels",
    question: "Le badge vérifié est-il valable à vie ou a-t-il une durée limitée ?",
    answer: "Le badge est valable 12 mois à compter de la date de validation. À l'expiration, vous pouvez le renouveler pour 5 000 FCFA supplémentaires. Nous vous enverrons un rappel 30 jours avant l'expiration pour que vous ne perdiez pas votre visibilité."
  },
  {
    category: "Professionnels",
    question: "Puis-je modifier ou supprimer mon profil professionnel à tout moment ?",
    answer: "Oui, à tout moment. Vous pouvez modifier vos informations, vos services, vos photos et votre bio depuis votre tableau de bord. Si vous souhaitez supprimer définitivement votre compte, contactez notre support et nous procéderons à la suppression dans les 48h."
  },

  // === PAIEMENT & VÉRIFICATION ===
  {
    category: "Paiement & Vérification",
    question: "Quels sont les moyens de paiement acceptés pour le badge vérifié (5 000 FCFA) ?",
    answer: "Pour le paiement du badge vérifié, nous acceptons deux moyens principaux : T-Money (Togocom) au numéro 70 88 86 99, et Moov Money au numéro 79 94 07 93. Le montant est de 5 000 FCFA, payable en une seule fois."
  },
  {
    category: "Paiement & Vérification",
    question: "Que se passe-t-il si mon dossier de vérification est refusé ?",
    answer: "Si vos documents ne sont pas conformes (photo floue, document expiré, etc.), nous vous expliquons précisément la raison et vous pouvez renvoyer de nouveaux documents gratuitement. Il n'y a aucun frais supplémentaire. Notre objectif est de vous aider à obtenir votre badge."
  },
  {
    category: "Paiement & Vérification",
    question: "Puis-je payer les 5 000 FCFA du badge vérifié en plusieurs fois ?",
    answer: "Non, le paiement de 5 000 FCFA est unique et annuel. Cependant, considérez-le comme un investissement : les professionnels vérifiés reçoivent en moyenne 3x plus de contacts clients, ce qui rentabilise largement ce frais dès la première mission."
  },
  {
    category: "Paiement & Vérification",
    question: "Reçois-je une confirmation après le paiement du badge vérifié ?",
    answer: "Oui. Après avoir envoyé les 5 000 FCFA, envoyez la capture d'écran de la transaction sur WhatsApp. Nous vous confirmons la réception et activons votre badge sous 24h. Conservez toujours votre capture d'écran comme preuve."
  },
  {
    category: "Paiement & Vérification",
    question: "Le renouvellement annuel du badge vérifié est-il automatique ?",
    answer: "Non, le renouvellement n'est pas automatique pour respecter votre liberté de choix. 30 jours avant l'expiration, nous vous envoyons un rappel par WhatsApp et email. Vous pouvez alors renouveler pour 5 000 FCFA ou laisser expirer le badge."
  },

  // === SÉCURITÉ & CONFIANCE ===
  {
    category: "Sécurité",
    question: "Mes données personnelles sont-elles protégées sur ProKorb ?",
    answer: "Absolument. ProKorb est conforme aux lois sur la protection des données en vigueur dans nos pays d'opération (ex: Loi n° 2019-024 au Togo, et équivalents régionaux). Vos données sont chiffrées (SSL/TLS 256-bit), stockées sur des serveurs sécurisés, et ne sont jamais vendues à des tiers."
  },
  {
    category: "Sécurité",
    question: "Comment ProKorb lutte-t-il contre les faux profils et les arnaques ?",
    answer: "Notre système de vérification d'identité (CNI + diplôme + selfie) élimine la majorité des faux profils. Le système d'avis clients permet de signaler les comportements suspects. Enfin, notre équipe de modération intervient manuellement sur chaque signalement sous 24h."
  },
  {
    category: "Sécurité",
    question: "Comment signaler un comportement suspect d'un client ou d'un professionnel ?",
    answer: "Sur chaque profil, vous trouverez un bouton 'Signaler'. Vous pouvez aussi contacter directement notre support via WhatsApp (+228 70 88 86 99) ou email. Chaque signalement est traité manuellement sous 24h avec une enquête approfondie."
  },
  {
    category: "Sécurité",
    question: "ProKorb garantit-il la qualité finale des prestations réalisées ?",
    answer: "ProKorb est une plateforme de mise en relation et ne peut garantir la qualité finale des prestations. Cependant, nous mettons tout en œuvre pour vous aider à faire le bon choix : badges vérifiés, avis clients, portfolios, et service de médiation en cas de litige."
  },

  // === TECHNIQUE & SUPPORT ===
  {
    category: "Support",
    question: "Comment contacter le support client de ProKorb en cas de besoin ?",
    answer: "Trois moyens rapides : 1) WhatsApp au +228 70 88 86 99 (réponse en moins d'1h en journée), 2) Email à contact@prokorb.tg (réponse sous 24h), 3) Téléphone au +228 70 88 86 99 ou +228 79 94 07 93. Notre équipe est basée à Lomé et parle français."
  },
  {
    category: "Support",
    question: "ProKorb est-il disponible sur smartphone et dans quelles langues ?",
    answer: "Oui, ProKorb est une application web responsive, parfaitement optimisée pour les smartphones Android et iPhone. Elle est actuellement disponible en français, avec une expansion prévue en anglais et en langues locales (éwé, kabiyè, etc.) en 2025 pour mieux servir toute l'Afrique."
  }
]

const categories = ['Toutes', 'Général', 'Clients', 'Professionnels', 'Paiement & Vérification', 'Sécurité', 'Support']

export default function FaqPage() {
  return (
    <>
      {/* ✅ INJECTION DU SCHEMA.ORG FAQPAGE POUR GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <Globe className="w-4 h-4" />
              <span>Disponible dans 9 pays d'Afrique</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Questions <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                Fréquentes
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl leading-relaxed">
              Tout ce que vous devez savoir sur <strong className="text-white">ProKorb</strong> : 
              notre modèle <strong className="text-white">100% gratuit</strong>, le badge vérifié à 
              <span className="text-white font-bold"> 5 000 FCFA/an</span>, la sécurité, et notre expansion en Afrique.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Mises à jour régulièrement</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Réponses 100% transparentes</span>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 -mt-10 relative z-10">
          
          {/* Section FAQ interactive */}
          <FaqSearch faqs={faqs} categories={categories} />

          {/* ==========================================
              SECTION CONTACT SUPPORT
          ========================================== */}
          <section className="mt-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <HelpCircle className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-2xl leading-relaxed">
                Notre équipe basée à Lomé est disponible pour répondre à toutes vos questions, 
                que vous soyez client ou professionnel, où que vous soyez en Afrique.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/22870888699?text=Bonjour%20ProKorb%2C%20j'ai%20une%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <MessageCircle className="w-8 h-8 text-green-300" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">WhatsApp</p>
                    <p className="font-bold text-lg">+228 70 88 86 99</p>
                  </div>
                </a>
                <a
                  href="mailto:contact@prokorb.tg"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <Mail className="w-8 h-8 text-indigo-200" />
                  <div>
                    <p className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-1">Email</p>
                    <p className="font-bold text-lg">contact@prokorb.tg</p>
                  </div>
                </a>
              </div>
            </div>
          </section>

        </main>

        {/* ==========================================
            FOOTER
        ========================================== */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <p>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-200">Matuneqhyd SARL U</strong>. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Confidentialité
                </Link>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Conditions
                </Link>
                <Link href="/verification" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                  Vérification
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}