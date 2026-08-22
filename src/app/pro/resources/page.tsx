import Link from 'next/link'
import { 
  ArrowLeft, BookOpen, Video, FileText, Download, 
  TrendingUp, Users, Award, Lightbulb, ExternalLink,
  CheckCircle2, Clock, Star
} from 'lucide-react'

export default function ProResourcesPage() {
  const guides = [
    {
      icon: BookOpen,
      title: "Guide du professionnel débutant",
      desc: "Tout ce qu'il faut savoir pour bien démarrer sur ProKorb : optimisation du profil, fixation des prix, gestion des clients.",
      type: "PDF",
      pages: "24 pages"
    },
    {
      icon: Video,
      title: "Tutoriels vidéo",
      desc: "Série de vidéos courtes pour maîtriser toutes les fonctionnalités de la plateforme en moins de 30 minutes.",
      type: "Vidéo",
      pages: "12 vidéos"
    },
    {
      icon: FileText,
      title: "Modèles de devis",
      desc: "Templates professionnels prêts à l'emploi pour vos devis, factures et contrats de prestation.",
      type: "Templates",
      pages: "8 modèles"
    },
    {
      icon: Lightbulb,
      title: "Bonnes pratiques métier",
      desc: "Conseils spécifiques par catégorie de métier pour améliorer votre qualité de service et vos avis clients.",
      type: "Guide",
      pages: "36 pages"
    },
  ]

  const articles = [
    {
      title: "Comment fixer ses tarifs quand on débute",
      category: "Pricing",
      readTime: "5 min",
      date: "10 août 2026"
    },
    {
      title: "5 astuces pour obtenir plus d'avis 5 étoiles",
      category: "Réputation",
      readTime: "4 min",
      date: "5 août 2026"
    },
    {
      title: "Optimiser son profil pour apparaître en premier",
      category: "Visibilité",
      readTime: "7 min",
      date: "1 août 2026"
    },
    {
      title: "Gérer les clients difficiles : le guide complet",
      category: "Relation client",
      readTime: "8 min",
      date: "28 juillet 2026"
    },
    {
      title: "Les erreurs à éviter quand on lance son activité",
      category: "Entrepreneuriat",
      readTime: "6 min",
      date: "20 juillet 2026"
    },
    {
      title: "Comment passer du statut Gratuit à Premium",
      category: "Croissance",
      readTime: "4 min",
      date: "15 juillet 2026"
    },
  ]

  const tools = [
    { icon: TrendingUp, title: "Calculateur de tarifs", desc: "Estimez vos prix en fonction de votre métier et de votre expérience." },
    { icon: Users, title: "Base de clients types", desc: "Découvrez les profils de clients les plus courants par catégorie." },
    { icon: Award, title: "Checklist de vérification", desc: "Assurez-vous que votre dossier est complet avant soumission." },
    { icon: Star, title: "Générateur de description", desc: "Créez une description de profil attractive en 2 minutes." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ressources pour professionnels</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Guides, tutoriels, outils et articles pour vous aider à développer votre activité sur ProKorb.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-12">
          
          {/* Guides */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Guides & Documentation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, idx) => {
                const Icon = guide.icon
                return (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                        <Icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-slate-900">{guide.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{guide.desc}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
                            {guide.type}
                          </span>
                          <span className="text-slate-500">{guide.pages}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Articles & Conseils</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, idx) => (
                <article key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{article.date}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Outils gratuits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool, idx) => {
                const Icon = tool.icon
                return (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{tool.title}</h3>
                      <p className="text-sm text-slate-600">{tool.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Témoignages de professionnels</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Koffi A.", job: "Plombier", city: "Lomé", quote: "Grâce à ProKorb, j'ai doublé mon chiffre d'affaires en 3 mois. La visibilité est incroyable !", rating: 5 },
                { name: "Amina K.", job: "Couturière", city: "Sokodé", quote: "J'ai trouvé plus de 50 nouvelles clientes en 6 mois. Le badge vérifié fait toute la différence.", rating: 5 },
                { name: "Jean-Marc T.", job: "Électricien", city: "Kara", quote: "Plateforme sérieuse et clients de qualité. Je recommande à tous les artisans du Togo.", rating: 5 },
              ].map((story, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-4 italic">"{story.quote}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                    <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{story.name}</p>
                      <p className="text-xs text-slate-500">{story.job} · {story.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white">
            <h3 className="text-3xl font-black mb-4">Besoin d'aide supplémentaire ?</h3>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Notre équipe support est à votre disposition pour vous accompagner dans votre réussite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
                Contacter le support
              </Link>
              <Link href="/faq" className="inline-block bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                Consulter la FAQ
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}