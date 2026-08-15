import Link from 'next/link'
import { 
  FileText, 
  UserPlus, 
  Users, 
  Handshake, 
  ShieldAlert, 
  Copyright, 
  RefreshCw, 
  Mail, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react'

export default function TermsOfServicePage() {
  const lastUpdated = "14 Août 2026"

  const sections = [
    {
      id: "acceptation",
      icon: FileText,
      title: "1. Acceptation des conditions",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Bienvenue sur <strong className="text-slate-900">JobConnect Togo</strong>. En accédant à notre site web ou en utilisant notre application, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas utiliser nos services.
        </p>
      )
    },
    {
      id: "service",
      icon: Users,
      title: "2. Description du service",
      content: (
        <p className="text-slate-600 leading-relaxed">
          JobConnect est une plateforme numérique de mise en relation opérant au Togo. Elle permet aux <strong>clients</strong> de rechercher et de contacter des <strong>professionnels</strong> (artisans, prestataires de services, etc.) vérifiés. JobConnect agit en tant qu'intermédiaire technique et ne fournit pas directement les services proposés par les professionnels inscrits.
        </p>
      )
    },
    {
      id: "comptes",
      icon: UserPlus,
      title: "3. Inscription et responsabilité des comptes",
      content: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Exactitude des informations :</strong> Vous vous engagez à fournir des informations vraies, précises et à jour lors de votre inscription.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Sécurité :</strong> Vous êtes seul responsable de la confidentialité de votre mot de passe et de toutes les activités effectuées sous votre compte.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <span><strong>Suspension :</strong> Nous nous réservons le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU ou d'activité frauduleuse.</span>
          </li>
        </ul>
      )
    },
    {
      id: "engagement",
      icon: Handshake,
      title: "4. Engagements des utilisateurs",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
            <p className="text-indigo-900 font-semibold">
              🤝 JobConnect repose sur la confiance et le respect mutuel entre ses utilisateurs.
            </p>
          </div>
          <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
            <li><strong>Pour les Professionnels :</strong> S'engager à fournir des services de qualité, respecter les tarifs annoncés et maintenir des informations de profil à jour.</li>
            <li><strong>Pour les Clients :</strong> Utiliser la plateforme de bonne foi, ne pas harceler les professionnels et fournir des descriptions claires de leurs besoins.</li>
            <li><strong>Interdictions :</strong> Il est strictement interdit d'utiliser la plateforme à des fins illégales, de spam, ou de contournement des règles de sécurité.</li>
          </ul>
        </div>
      )
    },
    {
      id: "responsabilite",
      icon: ShieldAlert,
      title: "5. Limitation de responsabilité",
      content: (
        <p className="text-slate-600 leading-relaxed">
          JobConnect met tout en œuvre pour vérifier l'identité et les compétences des professionnels (via le badge "Vérifié"). Cependant, la plateforme ne peut être tenue pour responsable des litiges, dommages ou malfaçons survenant lors de l'exécution directe d'un service entre un client et un professionnel. Les transactions financières (hors frais de plateforme éventuels) sont de la responsabilité exclusive des deux parties.
        </p>
      )
    },
    {
      id: "propriete",
      icon: Copyright,
      title: "6. Propriété intellectuelle",
      content: (
        <p className="text-slate-600 leading-relaxed">
          L'ensemble du contenu de la plateforme JobConnect (logo, textes, graphismes, icônes, code source) est la propriété exclusive de JobConnect Togo ou de ses partenaires. Toute reproduction, distribution ou modification sans autorisation écrite préalable est strictement interdite.
        </p>
      )
    },
    {
      id: "modification",
      icon: RefreshCw,
      title: "7. Modification des CGU",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Nous nous réservons le droit de modifier les présentes Conditions Générales d'Utilisation à tout moment pour nous conformer aux évolutions légales ou techniques. Les utilisateurs seront informés des changements majeurs par e-mail ou via une notification sur la plateforme. L'utilisation continue du service après modification vaut acceptation des nouvelles CGU.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header de la page */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Conditions Générales d'Utilisation</h1>
              <p className="text-indigo-200 mt-1">Dernière mise à jour : {lastUpdated}</p>
            </div>
          </div>
          <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Ces conditions définissent les règles d'utilisation de la plateforme JobConnect Togo pour garantir une expérience sécurisée et équitable pour tous.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              En utilisant <strong className="text-slate-900">JobConnect Togo</strong>, vous reconnaissez avoir lu, compris et accepté d'être lié par l'intégralité des présentes Conditions Générales d'Utilisation (CGU). Veuillez les lire attentivement.
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
              <h2 className="text-2xl font-bold text-slate-900">8. Contact et Réclamations</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Pour toute question relative à ces conditions, ou pour signaler un problème sur la plateforme, notre équipe juridique et support est à votre écoute :
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
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Objet recommandé</p>
                  <p className="text-slate-900 font-semibold">"Question relative aux CGU"</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}