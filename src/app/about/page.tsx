import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ShieldCheck, 
  BadgeCheck, 
  Banknote, 
  HeartHandshake, 
  Globe, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Lock
} from 'lucide-react'

// ==========================================================
// 🚀 SEO : MÉTADONNÉES DE LA PAGE À PROPOS
// ==========================================================
export const metadata: Metadata = {
  title: 'À Propos de ProKorb | Notre Mission et Modèle 100% Transparent',
  description: 'Découvrez ProKorb, la marketplace N°1 en Afrique. 100% gratuit, 0% commission. Seuls 5 000 FCFA/an pour le badge de vérification des professionnels. Aucun frais caché.',
  keywords: 'ProKorb, marketplace Afrique, professionnel vérifié, 0% commission, 5000 FCFA vérification, artisan Togo, confiance services',
  alternates: {
    canonical: 'https://www.prokorb.com/about',
  },
  openGraph: {
    title: 'À Propos de ProKorb | Transparence et Confiance en Afrique',
    description: '100% Gratuit. 0% Commission. Seulement 5 000 FCFA/an pour être vérifié. Découvrez notre mission.',
    url: 'https://www.prokorb.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-200 text-sm font-semibold mb-6 border border-white/20">
            <Globe className="w-4 h-4" />
            <span>La marketplace N°1 des services en Afrique</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            Révolutionner la <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">confiance</span><br />
            dans les services.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Nous connectons les particuliers avec des artisans et professionnels de confiance. 
            Notre mission est simple : éliminer les arnaques et valoriser le travail bien fait.
          </p>
        </div>
      </section>

      {/* 2. NOTRE MODÈLE ÉCONOMIQUE (LE CŒUR DU MESSAGE) */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Notre Promesse : <span className="text-indigo-600">Transparence Totale</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Contrairement aux autres plateformes, nous ne prenons jamais de pourcentage sur votre travail. Notre modèle est conçu pour vous faire gagner, pas pour vous taxer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte 1 : 100% Gratuit */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Banknote className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">100% Gratuit</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                L'inscription est gratuite. La mise en relation est gratuite. Vous gardez <strong>100% de vos gains</strong>. Nous ne prenons <strong>0% de commission</strong>, jamais.
              </p>
            </div>

            {/* Carte 2 : La Vérification (Mise en avant) */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white text-center shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4 border border-indigo-400/30">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Le seul frais
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <BadgeCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-2">5 000 FCFA / an</h3>
              <p className="text-indigo-100 leading-relaxed mb-6">
                Frais uniques de vérification d'identité et de compétences. 
                <br/>
                <span className="font-bold text-white">Renouvelable à 5 000 FCFA chaque année.</span>
              </p>
              <div className="bg-white/10 rounded-xl p-4 text-left space-y-2 text-sm backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Badge Bleu "Vérifié" sur votre profil</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Mise en avant dans les résultats de recherche</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Confiance accrue des clients (+ de missions)</span>
                </div>
              </div>
            </div>

            {/* Carte 3 : Aucun Frais Caché */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Zéro Frais Caché</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Pas de frais d'abonnement mensuel surprise. Pas de retenue sur vos paiements. Ce que vous voyez est ce que vous payez. Point final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMENT FONCTIONNE LA VÉRIFICATION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Comment obtenir votre Badge Bleu ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Un processus simple, rapide et sécurisé pour protéger votre réputation et celle de vos clients.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Inscription', desc: 'Créez votre profil professionnel gratuitement en 2 minutes.' },
              { step: '02', title: 'Soumission', desc: 'Envoyez votre pièce d\'identité et un justificatif de votre métier.' },
              { step: '03', title: 'Paiement', desc: 'Réglez les frais uniques de 5 000 FCFA via Mobile Money.' },
              { step: '04', title: 'Validation', desc: 'Notre équipe valide sous 24h. Vous recevez votre Badge Bleu !' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-slate-200 dark:text-slate-800 absolute -top-6 -left-2 select-none">
                  {item.step}
                </div>
                <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-full pt-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NOS VALEURS */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                Plus qu'une plateforme,<br />
                <span className="text-indigo-600">un mouvement pour l'Afrique.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">La Confiance avant tout</h3>
                    <p className="text-slate-600 dark:text-slate-400">Chaque professionnel vérifié est contrôlé manuellement par notre équipe pour garantir votre sécurité.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Autonomisation des travailleurs</h3>
                    <p className="text-slate-600 dark:text-slate-400">Nous donnons aux artisans les outils numériques pour développer leur activité sans les appauvrir avec des commissions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Proximité et Support</h3>
                    <p className="text-slate-600 dark:text-slate-400">Une équipe locale basée en Afrique, disponible pour vous accompagner à chaque étape.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image ou Illustration de confiance */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 text-center">
                <BadgeCheck className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Le Badge Bleu ProKorb</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Ce symbole est la garantie pour le client que le professionnel a été vérifié, et la garantie pour le professionnel d'obtenir plus de visibilité et de missions.
                </p>
                <Link 
                  href="/register?role=pro" 
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1"
                >
                  Devenir un Pro Vérifié
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Prêt à travailler en toute transparence ?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Que vous cherchiez un professionnel de confiance ou que vous souhaitiez développer votre activité, ProKorb est là pour vous.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register?role=client" 
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-1"
            >
              Je cherche un professionnel
            </Link>
            <Link 
              href="/register?role=pro" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-1 border border-indigo-500"
            >
              Je suis professionnel (5 000 FCFA/an)
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}