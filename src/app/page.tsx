// @ts-nocheck
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Chatbot from '@/components/Chatbot'
import { Logo } from '@/components/Logo'

export default async function HomePage() {
  const supabase = createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('professionals_count', { ascending: false })
    .limit(8)

  const safeCategories = categories || [
    { id: 1, name: 'Plomberie', icon: '🔧' },
    { id: 2, name: 'Électricité', icon: '⚡' },
    { id: 3, name: 'Maçonnerie', icon: '🧱' },
    { id: 4, name: 'Peinture', icon: '🎨' },
    { id: 5, name: 'Immobilier', icon: '🏠' },
    { id: 6, name: 'Mécanique', icon: '🔩' },
    { id: 7, name: 'Coiffure', icon: '💇' },
    { id: 8, name: 'Couture', icon: '👗' },
  ]

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* ═══════════════════════════════════════════════════════════════
          1. NAVIGATION BAR
          ═══════════════════════════════════════════════════════════════ */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <div className="text-2xl font-black tracking-tight">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#avantages" className="hover:text-indigo-600 transition">Avantages</a>
            <a href="#etapes" className="hover:text-indigo-600 transition">Comment ça marche</a>
            <a href="#fonctionnalites" className="hover:text-indigo-600 transition">Fonctionnalités</a>
            <a href="#categories" className="hover:text-indigo-600 transition">Catégories</a>
            <Link href="/pricing" className="hover:text-indigo-600 transition">Tarification</Link>
            <Link href="/faq" className="hover:text-indigo-600 transition">Aide / FAQ</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">
              Connexion
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-100">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          2. HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.15]">
            Trouvez un Professionnel de confiance, <br />
            <span className="text-indigo-600">vendez vos compétences.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
            La plateforme tout-en-un au Togo pour trouver un professionnel qualifié à proximité ou décrocher vos prochains chantiers. Avec seulement <span className="text-indigo-600 font-bold">0% de commission</span> sur vos interventions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/register?role=client" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition shadow-xl shadow-indigo-200">
              JE CHERCHE UN PROFESSIONNEL FIABLE 
            </Link>
            <Link href="/register?role=pro" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-sm px-8 py-4 rounded-xl transition shadow-sm">
              JE PROPOSE MES SERVICES 
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. AVANTAGES SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="avantages" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
          Avantages
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          La plateforme qui simplifie <br />les services du quotidien
        </h2>
        <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto text-sm sm:text-base">
          JobConnect réunit rapidité, sécurité et proximité pour que vous puissiez concrétiser vos projets de chantiers ou dépannages en toute sérénité.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="text-2xl font-black text-slate-950">0% Commission</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Vous payez directement l'artisan selon le devis convenu. Aucun frais caché sur vos transactions.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-4">🔎</div>
            <h3 className="text-2xl font-black text-slate-950">Profils Vérifiés</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Chaque professionnel soumet ses pièces justificatives et diplômes pour garantir un travail soigné.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-3xl p-8 text-left shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-black text-slate-950">Suivi en direct</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Publiez votre service et recevez instantanément des demandes disponibles près de chez vous.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. COMMENT ÇA MARCHE SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="etapes" className="bg-[#1e1b4b] text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Comment ça marche</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Du besoin au résultat en 3 étapes</h2>
          <p className="text-indigo-200 text-sm sm:text-base font-medium max-w-xl mx-auto">Avec JobConnect, trouver le bon profil ou être sollicité pour un travail devient un jeu d'enfant.</p>
          
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="space-y-2">
              <div className="text-indigo-400 font-black text-xl">01. Publiez ou Postulez</div>
              <p className="text-indigo-200 text-sm leading-relaxed">Le client décrit son besoin (maçonnerie, plomberie...) et le professionnel recoit sa demande.</p>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-black text-xl">02. Discutez & Convenez</div>
              <p className="text-indigo-200 text-sm leading-relaxed">Échangez via la messagerie interne pour affiner les détails techniques et le prix du devis.</p>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-black text-xl">03. Validez & Payez</div>
              <p className="text-indigo-200 text-sm leading-relaxed">Les travaux sont réalisés et vous réglez directement par T-Money, Flooz ou en espèces le professionnel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. CATÉGORIES SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="categories" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
            Catégories
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Explorez nos <span className="text-indigo-600">métiers</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto text-sm sm:text-base">
            {safeCategories.length} catégories de professionnels vérifiés à votre service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {safeCategories.map((cat) => (
            <div key={cat.id} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{cat.icon || '💼'}</div>
              <h3 className="font-bold text-slate-950 mb-1">{cat.name}</h3>
              <p className="text-xs text-slate-500">{cat.professionals_count || 0} professionnels</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. FONCTIONNALITÉS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section id="fonctionnalites" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Fonctionnalités</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">Les options qui font la différence</h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base">Tout est pensé pour optimiser la mise en relation entre porteurs de projets et experts locaux au Togo.</p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-xl">📍</div>
              <h4 className="font-bold text-slate-950">Géolocalisation</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Trouvez des professionnels immédiatement disponibles dans votre quartier (Agoè, Adidogomé, Bè...).</p>
            </div>
            <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-xl">💬</div>
              <h4 className="font-bold text-slate-950">Messagerie instantanée</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Envoyez des photos de vos chantiers et discutez des prix en toute sécurité.</p>
            </div>
            <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-xl">⭐</div>
              <h4 className="font-bold text-slate-950">Notes et Avis</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Laissez une évaluation après chaque intervention pour valoriser les meilleurs techniciens.</p>
            </div>
            <div className="bg-white border border-slate-200/60 p-6 rounded-2xl space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-xl">📱</div>
              <h4 className="font-bold text-slate-950">Mobile Money Ready</h4>
              <p className="text-slate-500 text-xs leading-relaxed">Abonnements ou options de boost payables instantanément via T-Money et Flooz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. BIG CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Prêt à développer votre activité ?</h2>
          <p className="text-indigo-100 text-sm sm:text-base font-medium max-w-xl mx-auto">Rejoignez dès aujourd'hui des centaines d'artisans et de clients qui transforment le marché du service au Togo.</p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="bg-white text-indigo-600 font-extrabold text-sm px-8 py-4 rounded-xl transition shadow-xl hover:bg-slate-50 inline-block">
              Créer mon compte gratuitement 
            </Link>
            <Link href="/pricing" className="bg-transparent border-2 border-white text-white font-extrabold text-sm px-8 py-4 rounded-xl transition hover:bg-white/10 inline-block">
              Voir les tarifs 
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. FOOTER SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0f172a] text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="text-xl font-black text-white tracking-tight">
                JOB<span className="text-indigo-400">CONNECT</span>
              </span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed">La plateforme de référence au Togo pour connecter les talents locaux aux besoins des particuliers et des entreprises.</p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-indigo-600 rounded-full flex items-center justify-center transition">
                <span className="text-xs">📘</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-indigo-600 rounded-full flex items-center justify-center transition">
                <span className="text-xs">📷</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-indigo-600 rounded-full flex items-center justify-center transition">
                <span className="text-xs">🐦</span>
              </a>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px]">Liens rapides</h5>
            <ul className="space-y-2">
              <li><a href="#avantages" className="hover:text-white transition">Avantages</a></li>
              <li><Link href="/pricing" className="hover:text-white transition">Tarification</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Centre d'aide / FAQ</Link></li>
              <li><a href="#categories" className="hover:text-white transition">Catégories</a></li>
            </ul>
          </div>
          <div className="space-y-3 text-xs">
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px]">Légal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition">Conditions Générales d'Utilisation</a></li>
              <li><a href="#" className="hover:text-white transition">Mentions légales</a></li>
            </ul>
            <h5 className="text-white font-bold uppercase tracking-wider text-[11px] pt-4">Contact</h5>
            <ul className="space-y-2">
              <li>📞 +228 90 00 00 00</li>
              <li>✉️ contact@jobconnect.tg</li>
              <li>📍 Lomé, Togo</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; 2026 JobConnect. Tous droits réservés. 
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════
          9. CHATBOT IA JOBI
          ═══════════════════════════════════════════════════════════════ */}
      <Chatbot />
    </div>
  )
}