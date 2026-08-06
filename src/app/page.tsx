// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'
import Chatbot from '@/components/Chatbot'
import TestimonialCard from '@/components/TestimonialCard'
import NewsletterForm from '@/components/NewsletterForm'
import { 
  ShieldCheck, Wallet, Zap, MapPin, MessageSquare, 
  Star, TrendingUp, CheckCircle2, ArrowRight,
  Wrench, Zap as ZapIcon, Hammer, Paintbrush, 
  Home, Car, Scissors, Shirt, Stethoscope, Laptop
} from 'lucide-react'

export default async function HomePage() {
  const supabase = createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('name, professionals_count')
    .order('professionals_count', { ascending: false })
    .limit(8)

  const safeCategories = categories && categories.length > 0 ? categories : [
    { name: 'Plomberie', professionals_count: 45 },
    { name: 'Électricité', professionals_count: 38 },
    { name: 'Maçonnerie', professionals_count: 52 },
    { name: 'Peinture', professionals_count: 31 },
    { name: 'Mécanique', professionals_count: 41 },
    { name: 'Informatique', professionals_count: 28 },
    { name: 'Santé', professionals_count: 15 },
    { name: 'Couture', professionals_count: 24 },
  ]

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('plomber') || n.includes('mécan')) return Wrench
    if (n.includes('électric')) return ZapIcon
    if (n.includes('maçon') || n.includes('bâtiment')) return Hammer
    if (n.includes('peinture')) return Paintbrush
    if (n.includes('informatique')) return Laptop
    if (n.includes('santé')) return Stethoscope
    if (n.includes('couture')) return Scissors
    if (n.includes('immobilier')) return Home
    if (n.includes('auto') || n.includes('mécanique')) return Car
    return Wrench
  }

  // ✅ IMPORTANT : CONFIGURATION DES IMAGE DES TÉMOIGNAGES
  // 1. Crée un dossier : public/image/testimonials/
  // 2. Mets tes 3 image dedans (ex: koffi.jpg, amina.jpg, jean.jpg)
  // 3. Modifie les noms de fichiers ci-dessous pour qu'ils correspondent EXACTEMENT aux tiens (sensible à la casse)
  const testimonials = [
    {
      name: 'koffi A.',
      role: 'Client à Lomé',
      text: "J'ai trouvé un plombier en moins de 2 heures. Le service est fluide et le fait de payer directement l'artisan sans commission est un vrai plus.",
      rating: 5,
      image: '/image/testimonials/koffi.jpg' // ← Remplace 'koffi.jpg' par ton vrai nom de fichier
    },
    {
      name: 'amina S.',
      role: 'Couturière à Agoè',
      text: "Depuis que je suis sur JobConnect, mon carnet de commandes est plein.C est la meilleur plateforme que j ai jamais utiliser",
      rating: 5,
      image: '/image/testimonials/amina.jpg' // ← Remplace 'amina.jpg' par ton vrai nom de fichier
    },
    {
      name: 'jean M.',
      role: 'Électricien à Bè',
      text: "L'application est simple à utiliser. Je reçois des notifications claires et je peux discuter avec les clients avant de me déplacer.",
      rating: 5,
      image: '/image/testimonials/jean.jpg' // ← Remplace 'jean.jpg' par ton vrai nom de fichier
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl font-black tracking-tight">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#avantages" className="hover:text-indigo-600 transition-colors">Avantages</a>
            <a href="#etapes" className="hover:text-indigo-600 transition-colors">Comment ça marche</a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">Métiers</a>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Tarifs</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2">
              Connexion
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mx-auto">
            <Star className="w-4 h-4 fill-indigo-600 text-indigo-600" />
            <span>La plateforme N°1 des services au Togo</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.1]">
            Trouvez l'expert qu'il vous faut, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              ou vendez vos compétences.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
            La marketplace tout-en-un pour connecter les particuliers et les professionnels vérifiés. 
            <span className="text-slate-900 font-bold"> 0% de commission</span> sur vos interventions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register?role=client" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 flex items-center justify-center gap-2">
              Je cherche un professionnel
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/register?role=pro" className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-800 font-bold text-base px-8 py-4 rounded-xl transition-all hover:bg-slate-50 hover:-translate-y-1 flex items-center justify-center gap-2">
              Je propose mes services
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Profils 100% vérifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Paiement direct (T-Money / Flooz)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AVANTAGES SECTION */}
      <section id="avantages" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Une expérience pensée pour <br />la confiance et l'efficacité
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wallet className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-3">0% Commission</h3>
            <p className="text-slate-500 leading-relaxed">
              Nous ne prenons aucune part sur vos gains. Le client paie directement l'artisan selon le devis convenu. Transparence totale.
            </p>
          </div>

          <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-3">Profils Vérifiés</h3>
            <p className="text-slate-500 leading-relaxed">
              Chaque professionnel soumet ses pièces d'identité et certifications. Notre équipe valide chaque profil pour votre sécurité.
            </p>
          </div>

          <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-black text-slate-950 mb-3">Mise en relation éclair</h3>
            <p className="text-slate-500 leading-relaxed">
              Publiez votre besoin et recevez des propositions de professionnels disponibles dans votre quartier en moins de 24h.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMMENT ÇA MARCHE */}
      <section id="etapes" className="bg-slate-900 text-white py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Processus simple</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Du besoin au résultat en 3 étapes</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>

            {[
              { step: '01', title: 'Publiez ou Postulez', desc: 'Le client décrit son besoin (plomberie, développement web...) et les pros reçoivent la demande.' },
              { step: '02', title: 'Discutez & Convenez', desc: 'Échangez via la messagerie ou WhatsApp pour affiner les détails techniques et le prix.' },
              { step: '03', title: 'Validez & Payez', desc: 'Les travaux sont réalisés. Vous réglez directement le professionnel par T-Money, Flooz ou espèces.' }
            ].map((item, idx) => (
              <div key={idx} className="relative bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 text-left hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-indigo-500/30 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CATÉGORIES SECTION */}
      <section id="categories" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
              Nos Métiers
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Explorez nos catégories <br />
              <span className="text-indigo-600">d'experts vérifiés</span>
            </h2>
          </div>
          <Link href="/register?role=pro" className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Voir tous les métiers <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {safeCategories.map((cat, idx) => {
            const Icon = getIconForCategory(cat.name)
            return (
              <Link 
                key={idx} 
                href={`/dashboard/client?category=${cat.name}`}
                className="group bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl flex items-center justify-center transition-colors">
                  <Icon className="w-7 h-7 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-950 mb-1 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{cat.professionals_count || 0} professionnels</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 6. TÉMOIGNAGES */}
      <section className="py-24 px-4 sm:px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Ils ont transformé leur façon de travailler</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={idx} review={review} />
          ))}
        </div>
      </section>

      {/* 7. BIG CTA SECTION */}
      <section className="bg-indigo-600 text-white py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Prêt à simplifier vos services ?</h2>
          <p className="text-indigo-100 text-lg font-medium max-w-xl mx-auto">
            Rejoignez dès aujourd'hui la communauté qui transforme le marché du service au Togo. L'inscription est gratuite.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="bg-white text-indigo-600 font-extrabold text-base px-8 py-4 rounded-xl transition-all shadow-xl hover:bg-slate-50 hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              Créer mon compte gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="bg-indigo-700/50 backdrop-blur-sm border border-indigo-400/30 text-white font-bold text-base px-8 py-4 rounded-xl transition-all hover:bg-indigo-700 inline-flex items-center justify-center">
              Voir les formules Pro
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Colonne 1 : Marque */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-black text-white tracking-tight">
                JOB<span className="text-indigo-500">CONNECT</span>
              </span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              La plateforme de référence au Togo pour connecter les talents locaux aux besoins des particuliers et des entreprises, en toute sécurité.
            </p>
          </div>
          
          {/* Colonne 2 : Liens rapides */}
          <div className="space-y-4 text-sm">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs">Plateforme</h5>
            <ul className="space-y-3">
              <li><a href="#avantages" className="hover:text-white transition-colors">Avantages</a></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Tarification</Link></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Catégories</a></li>
              <li><Link href="/register?role=pro" className="hover:text-white transition-colors">Devenir Pro</Link></li>
            </ul>
          </div>
          
          {/* Colonne 3 : Contact */}
          <div className="space-y-4 text-sm">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs">Contact</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-300">
                <span>📞</span> +228 96 31 50 29
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span>📞</span> +228 90 34 34 29
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span>✉️</span> contact@jobconnect.tg
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span>📍</span> Lomé, Togo
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter */}
          <div className="space-y-4 text-sm">
            <h5 className="text-white font-bold uppercase tracking-wider text-xs">Newsletter</h5>
            <p className="text-slate-400 text-xs leading-relaxed">
              Recevez nos dernières actualités, conseils et offres exclusives directement dans votre boîte mail.
            </p>
            <NewsletterForm />
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} JobConnect Togo. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Tous les systèmes sont opérationnels</span>
          </div>
        </div>
      </footer>

      {/* 9. CHATBOT IA JOBI */}
      <Chatbot />
    </div>
  )
} 