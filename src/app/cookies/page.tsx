import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Settings, Info, Mail } from 'lucide-react'
import { SVGProps } from 'react'

// Icônes SVG inline typées correctement
const Cookie = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Scale = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
)

export default function CookiesPolicyPage() {
  const cookieTypes = [
    {
      name: "Cookies essentiels",
      desc: "Nécessaires au fonctionnement du site (connexion, sécurité, préférences).",
      required: true,
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      name: "Cookies de performance",
      desc: "Nous aident à comprendre comment les visiteurs utilisent le site (Google Analytics).",
      required: false,
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Cookies fonctionnels",
      desc: "Mémorisent vos choix (langue, région) pour améliorer votre expérience.",
      required: false,
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Cookies publicitaires",
      desc: "Utilisés pour vous proposer des contenus pertinents (désactivés par défaut).",
      required: false,
      color: "bg-amber-100 text-amber-700"
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Politique relative aux cookies</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Tout savoir sur les cookies utilisés par ProKorb et comment les gérer.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Cookie className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Qu'est-ce qu'un cookie ?</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 leading-relaxed">
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet de stocker des informations relatives à votre navigation, comme vos préférences ou votre historique de connexion.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Info className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Cookies utilisés par ProKorb</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4">
              {cookieTypes.map((cookie, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{cookie.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cookie.color}`}>
                      {cookie.required ? "Obligatoire" : "Optionnel"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{cookie.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Durée de conservation</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>Les cookies déposés par ProKorb ont une durée de vie maximale de <strong className="text-slate-900">13 mois</strong>, conformément aux recommandations de la CNIL et à la législation togolaise en vigueur.</p>
              <p>Au-delà de cette période, votre consentement vous sera à nouveau demandé.</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Settings className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Comment gérer les cookies ?</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>Vous pouvez à tout moment modifier vos préférences en matière de cookies :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Dans votre navigateur :</strong> Chaque navigateur (Chrome, Firefox, Safari, Edge) propose des options pour accepter, refuser ou supprimer les cookies.</li>
                <li><strong>Sur ProKorb :</strong> Vous pouvez gérer vos préférences via notre panneau de gestion des cookies accessible à tout moment en bas de page.</li>
              </ul>
              <p className="text-sm text-slate-500 italic">
                Note : Le refus des cookies essentiels peut affecter le bon fonctionnement du site.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Base légale</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>
                Le traitement des données via les cookies repose sur votre <strong className="text-slate-900">consentement explicite</strong> (article 6.1.a du RGPD et Loi n° 2019-024 du Togo).
              </p>
              <p>
                Pour les cookies essentiels, la base légale est l'<strong className="text-slate-900">exécution du service</strong> demandé par l'utilisateur.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Contact</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>Pour toute question relative à notre politique de cookies :</p>
              <ul className="space-y-1 ml-4">
                <li>📧 <a href="mailto:contact@ProKorb.tg" className="text-indigo-600 hover:underline">contact@ProKorb.tg</a></li>
                <li>📞 +228 70 88 86 99</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Dernière mise à jour :</strong> 14 août 2026
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}