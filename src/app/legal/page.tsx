import Link from 'next/link'
import { ArrowLeft, Building2, Scale, Mail, Phone } from 'lucide-react'

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Mentions légales</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Informations légales relatives à la plateforme JobConnect Togo.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Éditeur du site</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-3 text-slate-600">
              <p>Le site <strong className="text-slate-900">JobConnect</strong> (jobconnect.tg) est édité par :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Raison sociale :</strong> JobConnect Togo SARL</li>
                <li><strong>Siège social :</strong> Lomé, Togo</li>
                <li><strong>Capital social :</strong> [À compléter]</li>
                <li><strong>RCCM :</strong> [À compléter]</li>
                <li><strong>Numéro d'identification fiscale :</strong> [À compléter]</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Phone className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Contact</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-2 text-slate-600">
              <p>Pour toute question relative au site ou à son utilisation :</p>
              <ul className="space-y-1 ml-4">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-600" /> <a href="mailto:contact@jobconnect.tg" className="text-indigo-600 hover:underline">contact@jobconnect.tg</a></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600" /> +228 70 88 86 99 / +228 79 94 07 93</li>
                <li className="flex items-center gap-2">📍 Lomé, Togo</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Hébergement</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-2 text-slate-600">
              <p>Le site est hébergé par :</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
                <li><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">vercel.com</a></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Propriété intellectuelle</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>
                L'ensemble du contenu du site JobConnect (textes, images, logos, icônes, code source, base de données) est la propriété exclusive de JobConnect Togo SARL ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification ou utilisation non autorisée de ces éléments est strictement interdite et peut faire l'objet de poursuites judiciaires conformément au <strong className="text-slate-900">Code de la propriété intellectuelle du Togo</strong>.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Droit applicable</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>
                Les présentes mentions légales sont régies par le <strong className="text-slate-900">droit togolais</strong>. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Lomé, Togo.
              </p>
              <p>
                En cas de désaccord, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Scale className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Protection des données</h2>
            </div>
            <div className="pl-0 md:pl-14 text-slate-600 space-y-3">
              <p>
                JobConnect s'engage à protéger les données personnelles de ses utilisateurs conformément à la <strong className="text-slate-900">Loi n° 2019-024 du 24 octobre 2019 portant protection des données à caractère personnel en République Togolaise</strong>.
              </p>
              <p>
                Pour plus d'informations, consultez notre <Link href="/privacy" className="text-indigo-600 hover:underline font-semibold">Politique de confidentialité</Link>.
              </p>
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