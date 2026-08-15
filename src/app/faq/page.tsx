import Link from 'next/link'
import { 
  HelpCircle, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      category: "Général",
      icon: HelpCircle,
      questions: [
        {
          q: "Qu'est-ce que JobConnect Togo ?",
          a: "JobConnect est la première marketplace numérique au Togo qui met en relation directe les clients avec des professionnels qualifiés et vérifiés (artisans, prestataires de services, etc.) dans leur localité."
        },
        {
          q: "L'inscription est-elle gratuite ?",
          a: "Oui, l'inscription de base est 100% gratuite pour les clients et les professionnels. Nous proposons également des forfaits Premium pour les professionnels souhaitant booster leur visibilité."
        }
      ]
    },
    {
      category: "Pour les Clients",
      icon: Search,
      questions: [
        {
          q: "Comment trouver un professionnel près de chez moi ?",
          a: "Utilisez la barre de recherche sur la page d'accueil ou dans le menu 'Marketplace'. Vous pouvez filtrer par catégorie de service (Plombier, Électricien, etc.) et par ville (Lomé, Sokodé, Kara, etc.)."
        },
        {
          q: "Comment contacter un professionnel ?",
          a: "Une fois que vous avez trouvé le professionnel idéal, cliquez sur le bouton 'Contacter'. Vous serez redirigé vers WhatsApp pour discuter directement avec lui et convenir des détails."
        },
        {
          q: "Les professionnels sont-ils fiables ?",
          a: "Nous encourageons fortement la vérification d'identité. Les professionnels ayant soumis leurs documents et validés par notre équipe arborent un badge bleu 'Vérifié' pour garantir votre tranquillité."
        }
      ]
    },
    {
      category: "Pour les Professionnels",
      icon: UserPlus,
      questions: [
        {
          q: "Comment publier mon service sur la plateforme ?",
          a: "Inscrivez-vous, complétez votre profil professionnel, puis rendez-vous dans votre tableau de bord (Dashboard Pro) et cliquez sur 'Publier un service'. Remplissez les informations et c'est en ligne !"
        },
        {
          q: "Comment recevoir plus de clients ?",
          a: "Assurez-vous d'avoir un profil complet avec une belle photo, des descriptions claires et des tarifs justes. Pensez aussi à demander à vos clients satisfaits de laisser un avis 5 étoiles sur votre profil."
        }
      ]
    },
    {
      category: "Sécurité & Paiement",
      icon: ShieldCheck,
      questions: [
        {
          q: "Comment se passe le paiement ?",
          a: "JobConnect est une plateforme de mise en relation. Le paiement du service se fait directement entre vous et le professionnel (espèces, T-Money, Flooz) une fois le travail convenu ou terminé."
        },
        {
          q: "Que faire en cas de problème avec un professionnel ?",
          a: "Si vous rencontrez un souci, vous pouvez signaler le professionnel directement via son profil ou nous contacter à service.proconnect.tg@gmail.com. Notre équipe interviendra rapidement."
        }
      ]
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
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Foire Aux Questions</h1>
              <p className="text-indigo-200 mt-1">Tout ce que vous devez savoir sur JobConnect</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          {faqs.map((section, index) => {
            const Icon = section.icon
            return (
              <div key={index}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.category}</h2>
                </div>
                
                <div className="space-y-4 pl-0 md:pl-14">
                  {section.questions.map((faq, qIndex) => (
                    <div key={qIndex} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all duration-300 bg-slate-50/50">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                        <ChevronDown className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        {faq.q}
                      </h3>
                      <p className="text-slate-600 leading-relaxed pl-7">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Appel à l'action final */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border border-indigo-100 mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="text-slate-600 mb-6">Notre équipe de support est à votre écoute pour vous aider.</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Contactez-nous
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}