import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Scale
} from 'lucide-react'

// ==========================================================
// 🚀 SEO : MÉTADONNÉES DE LA PAGE CONDITIONS D'UTILISATION
// ==========================================================
export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation (CGU) | ProKorb by Matuneqhyd SARL U',
  description: 'Consultez les Conditions Générales d\'Utilisation de ProKorb. Plateforme 100% gratuite, 0% commission. Seul frais : 5 000 FCFA/an pour le badge de vérification. Droit togolais.',
  keywords: ['CGU ProKorb', 'Conditions d\'utilisation', 'Matuneqhyd SARL U', '0% commission artisan Togo', '5000 FCFA vérification'],
  alternates: {
    canonical: 'https://www.prokorb.com/terms',
  },
  openGraph: {
    title: 'Conditions Générales d\'Utilisation | ProKorb',
    description: 'Transparence totale : 0% de commission, 5 000 FCFA/an pour la vérification. Découvrez nos engagements.',
    url: 'https://www.prokorb.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 transition-colors duration-300">
      
      {/* ==========================================
          HEADER ÉPURÉ ET PROFESSIONNEL
      ========================================== */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo ProKorb" 
              className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-black text-xl tracking-tight hidden sm:block">
              <span className="text-indigo-600 dark:text-indigo-400">PRO</span>
              <span className="text-slate-900 dark:text-white">KORB</span>
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* ==========================================
          CONTENU PRINCIPAL
      ========================================== */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        {/* En-tête de la page */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            Document Juridique
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Dernière mise à jour : <span className="font-semibold text-slate-700 dark:text-slate-200">{currentDate}</span>
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme <strong>ProKorb</strong>, produit phare édité par <strong>Matuneqhyd SARL U</strong>, fondée par Yves Atsou Agbevivi.
          </p>
        </div>

        {/* Corps du texte structuré */}
        <div className="space-y-10">
          
          {/* Section 1 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">1</span>
              Acceptation des conditions
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              En accédant, en naviguant ou en utilisant la plateforme ProKorb (site web ou application), vous acceptez sans réserve l'intégralité des présentes CGU. Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement d'utiliser nos services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">2</span>
              Description du service
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
              ProKorb est une marketplace numérique qui facilite la mise en relation entre des clients (particuliers ou entreprises) et des professionnels qualifiés (artisans, prestataires de services). Développée sous la direction technologique de Godfriend Goretti et du mouvement Ideenwerk-Technologies, la plateforme permet :
            </p>
            <ul className="space-y-3">
              {[
                "La recherche et la découverte de professionnels vérifiés.",
                "La publication d'offres de services par les professionnels.",
                "La mise en relation directe (via messagerie intégrée ou WhatsApp).",
                "Un système de notation et d'avis pour garantir la transparence."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 : MODÈLE ÉCONOMIQUE (CRUCIAL) */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-6 md:p-8 border border-indigo-100 dark:border-indigo-900/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Building2 className="w-32 h-32 text-indigo-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 relative z-10">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-black">3</span>
              Modèle Économique & Tarifs (Transparence Totale)
            </h2>
            <div className="space-y-4 relative z-10">
              <p className="leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
                ProKorb s'engage dans un modèle de confiance et de simplicité :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Inscription 100% Gratuite :</strong> La création de compte et l'utilisation de base de la plateforme sont entièrement gratuites.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">0% de Commission :</strong> ProKorb ne prélève aucun pourcentage sur les prestations réalisées. Le professionnel conserve 100% de ses revenus.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Frais de Vérification Uniques :</strong> Le seul et unique frais est de <strong>5 000 FCFA par an</strong>. Ce montant couvre le processus de vérification d'identité et de compétences, et offre au professionnel le badge "Vérifié" pour une durée de 12 mois, renouvelable à l'identique. Aucun autre frais caché.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">4</span>
              Obligations des Utilisateurs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Pour les Professionnels
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400 ml-2">
                  <li>Fournir des informations exactes et à jour.</li>
                  <li>Respecter les devis et prix convenus avec le client.</li>
                  <li>Offrir des prestations conformes aux règles de l'art.</li>
                  <li>Respecter la législation togolaise en vigueur.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Pour les Clients
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400 ml-2">
                  <li>Décrire leurs besoins de manière claire et honnête.</li>
                  <li>Régler les prestations selon les modalités convenues.</li>
                  <li>Traiter les professionnels avec respect et courtoisie.</li>
                  <li>Publier des avis objectifs et de bonne foi.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">5</span>
              Paiements et Transactions
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
              ProKorb agit exclusivement comme un intermédiaire de mise en relation. <strong className="text-slate-900 dark:text-white">La plateforme n'encaisse pas les paiements des prestations.</strong> 
              Les transactions financières s'effectuent en direct entre le client et le professionnel, selon leurs propres accords. Les modes de paiement couramment utilisés incluent :
            </p>
            <div className="flex flex-wrap gap-3">
              {['T-Money (Togocom)', 'Flooz (Moov Africa)', 'Espèces (Cash)', 'Virement bancaire'].map((method) => (
                <span key={method} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">
                  {method}
                </span>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">6</span>
              Limitation de Responsabilité
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Bien que ProKorb et son équipe technologique (Ideenwerk-Technologies) mettent tout en œuvre pour vérifier les identités et assurer la sécurité de la plateforme, ProKorb ne peut être tenu responsable de la qualité finale des prestations, des retards, ou des litiges survenant entre les utilisateurs. En cas de désaccord, ProKorb s'engage à offrir un service de médiation gratuit pour faciliter la résolution du conflit.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-black">7</span>
              Droit Applicable et Juridiction
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Les présentes CGU sont soumises au <strong className="text-slate-900 dark:text-white">droit de la République Togolaise</strong>. En cas de litige qui n'aurait pu être résolu par médiation, compétence expresse et exclusive est attribuée aux tribunaux de Lomé, Togo.
            </p>
          </section>

          {/* Section Contact */}
          <section className="bg-slate-900 dark:bg-black rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
              Contact et Support Juridique
            </h2>
            <p className="text-slate-300 mb-6">
              Pour toute question relative à ces conditions, à votre compte ou à une vérification, notre équipe est à votre disposition.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</p>
                  <p className="font-medium">contact@prokorb.tg</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Téléphone</p>
                  <p className="font-medium">+228 70 88 86 99</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Siège</p>
                  <p className="font-medium">Lomé, Togo</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ==========================================
          FOOTER SIMPLE
      ========================================== */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-200">Matuneqhyd SARL U</strong>. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Politique de Confidentialité
              </Link>
              <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 font-medium">
                Conditions d'Utilisation
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}