import Link from 'next/link'
import { 
  Shield, 
  Database, 
  Eye, 
  Share2, 
  Lock, 
  UserCheck, 
  Cookie, 
  Mail, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = "14 Août 2026"

  const sections = [
    {
      id: "collecte",
      icon: Database,
      title: "1. Quelles données collectons-nous ?",
      content: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Données d'inscription :</strong> Nom complet, adresse e-mail, numéro de téléphone, ville de résidence et photo de profil.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Données de profil professionnel :</strong> Spécialité, description des services, tarifs et statut de vérification.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Données d'utilisation :</strong> Historique des recherches, professionnels favoris et historique des contacts.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Données techniques :</strong> Adresse IP et type de navigateur (uniquement pour la sécurité et l'amélioration du service).</span>
          </li>
        </ul>
      )
    },
    {
      id: "utilisation",
      icon: Eye,
      title: "2. Comment utilisons-nous vos données ?",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Vos données sont utilisées exclusivement pour : mettre en relation efficace les clients avec les professionnels qualifiés, personnaliser votre expérience en vous proposant des services pertinents dans votre localité, vérifier l'identité des professionnels (badge "Vérifié") pour prévenir les fraudes, et vous envoyer des notifications importantes relatives à votre compte (avec votre consentement).
        </p>
      )
    },
    {
      id: "partage",
      icon: Share2,
      title: "3. Partage des données avec des tiers",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
            <p className="text-indigo-900 font-semibold">
              🛡️ Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Vos informations ne sont partagées que dans les cas strictement nécessaires suivants :
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
            <li><strong>Avec l'autre partie :</strong> Lorsque vous contactez un professionnel, votre numéro peut être partagé avec ce dernier pour faciliter la communication (et inversement).</li>
            <li><strong>Obligations légales :</strong> Si la loi togolaise ou une autorité judiciaire compétente l'exige.</li>
            <li><strong>Prestataires techniques :</strong> Nos hébergeurs (ex: Vercel, Supabase) qui stockent les données de manière sécurisée, sous des accords de confidentialité stricts.</li>
          </ul>
        </div>
      )
    },
    {
      id: "securite",
      icon: Lock,
      title: "4. Comment protégeons-nous vos données ?",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles de haut niveau : chiffrement des données sensibles en transit et au repos, accès restreint aux données personnelles uniquement au personnel autorisé, et surveillance régulière de nos systèmes pour détecter les vulnérabilités.
        </p>
      )
    },
    {
      id: "droits",
      icon: UserCheck,
      title: "5. Vos droits sur vos données",
      content: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Droit d'accès :</strong> Consultez les données que nous détenons sur vous via votre tableau de bord.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Droit de rectification :</strong> Modifiez votre nom, photo, numéro ou spécialité à tout moment dans vos paramètres.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Droit à l'effacement :</strong> Demandez la suppression définitive de votre compte et de vos données.</span>
          </li>
        </ul>
      )
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "6. Utilisation des Cookies",
      content: (
        <p className="text-slate-600 leading-relaxed">
          JobConnect utilise des cookies pour assurer le bon fonctionnement de l'application (comme le maintien de votre session de connexion) et pour analyser de manière anonyme comment l'application est utilisée afin de l'améliorer continuellement. Vous pouvez gérer les cookies via les paramètres de votre navigateur.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header de la page */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Politique de Confidentialité</h1>
              <p className="text-indigo-200 mt-1">Dernière mise à jour : {lastUpdated}</p>
            </div>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Chez JobConnect Togo, votre vie privée est notre priorité absolue. Cette page explique de manière transparente comment nous protégeons vos informations.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              Bienvenue sur <strong className="text-slate-900">JobConnect Togo</strong>. Nous accordons une importance capitale à la protection de votre vie privée et à la sécurité de vos données personnelles. Cette politique a pour objectif de vous expliquer clairement comment nous collectons, utilisons, protégeons et partageons vos informations.
            </p>
          </div>

          {/* Sections dynamiques */}
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <div className="pl-0 md:pl-14 text-slate-600">
                  {section.content}
                </div>
              </section>
            )
          })}

          {/* Section Contact */}
          <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">7. Nous contacter</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Si vous avez des questions, des préoccupations ou si vous souhaitez exercer vos droits concernant cette politique ou vos données personnelles, notre équipe est à votre disposition :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <Mail className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">E-mail</p>
                  <a href="mailto:service.proconnect.tg@gmail.com" className="text-slate-900 font-semibold hover:text-indigo-600 transition-colors">
                    service.proconnect.tg@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <Shield className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Objet recommandé</p>
                  <p className="text-slate-900 font-semibold">"Demande relative à la confidentialité"</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}