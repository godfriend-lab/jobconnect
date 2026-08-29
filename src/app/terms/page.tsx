// @ts-nocheck
'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Logo ProKorb" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-black text-xl tracking-tight hidden sm:block">
              <span className="text-indigo-400">PRO</span>
              <span className="text-white">KORB</span>
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-8 md:p-12">
          {/* Titre */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Conditions d'Utilisation
            </h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
            <p className="text-sm text-slate-400">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                1. Acceptation des conditions
              </h2>
              <p className="leading-relaxed">
                En accédant et en utilisant la plateforme ProKorb, vous acceptez sans réserve les présentes Conditions d'Utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                2. Description du service
              </h2>
              <p className="leading-relaxed">
                ProKorb est une marketplace qui met en relation des professionnels qualifiés avec des clients recherchant 
                des services. Notre plateforme permet :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>Aux clients de trouver et contacter des professionnels vérifiés</li>
                <li>Aux professionnels de publier leurs services et recevoir des demandes</li>
                <li>Une mise en relation directe via WhatsApp ou notre messagerie</li>
                <li>Un système d'avis et de notation pour garantir la qualité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                3. Inscription et compte utilisateur
              </h2>
              <p className="leading-relaxed">
                Pour utiliser ProKorb, vous devez créer un compte en fournissant des informations exactes et complètes. 
                Vous êtes responsable de :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>La confidentialité de vos identifiants de connexion</li>
                <li>Toutes les activités effectuées sur votre compte</li>
                <li>La mise à jour de vos informations personnelles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                4. Obligations des professionnels
              </h2>
              <p className="leading-relaxed">
                Les professionnels s'engagent à :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>Fournir des informations exactes sur leurs qualifications et expériences</li>
                <li>Respecter les prix convenus avec les clients</li>
                <li>Offrir des services de qualité professionnelle</li>
                <li>Répondre aux demandes dans un délai raisonnable</li>
                <li>Respecter les lois et réglementations en vigueur </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                5. Obligations des clients
              </h2>
              <p className="leading-relaxed">
                Les clients s'engagent à :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>Fournir des descriptions précises de leurs besoins</li>
                <li>Respecter les accords de prix convenus</li>
                <li>Traiter les professionnels avec respect et courtoisie</li>
                <li>Laisser des avis honnêtes et constructifs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                6. Tarifs et commissions
              </h2>
              <p className="leading-relaxed">
                ProKorb fonctionne sur un modèle de <strong className="text-white">0% de commission</strong> sur les prestations. 
                Les professionnels conservent 100% de leurs revenus. Notre plateforme se rémunère uniquement via 
                des abonnements optionnels pour améliorer la visibilité des professionnels.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                7. Vérification et sécurité
              </h2>
              <p className="leading-relaxed">
                Nous mettons en place un processus de vérification pour les professionnels souhaitant obtenir 
                le badge "Vérifié". Cela inclut :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>Vérification de l'identité (CNI ou Passeport)</li>
                <li>Casier judiciaire vierge (datant de moins de 3 mois)</li>
                <li>Justificatifs de qualifications professionnelles</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Cependant, ProKorb ne garantit pas la qualité des prestations et encourage les clients 
                à consulter les avis et portfolios avant de choisir un professionnel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                8. Paiements
              </h2>
              <p className="leading-relaxed">
                Les paiements s'effectuent <strong className="text-white">directement</strong> entre le client et le professionnel. 
                ProKorb n'intervient pas dans les transactions financières. Les modes de paiement acceptés incluent :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>T-Money (Togocom)</li>
                <li>Flooz (Moov Africa)</li>
                <li>Espèces (cash)</li>
                <li>Virement bancaire (selon accord)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                9. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                Le contenu de la plateforme ProKorb (logo, design, code, textes) est protégé par les droits 
                de propriété intellectuelle. Vous ne pouvez pas copier, reproduire ou distribuer notre contenu 
                sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                10. Limitation de responsabilité
              </h2>
              <p className="leading-relaxed">
                ProKorb agit uniquement comme intermédiaire de mise en relation. Nous ne sommes pas responsables :
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li>De la qualité des prestations fournies par les professionnels</li>
                <li>Des litiges entre clients et professionnels</li>
                <li>Des dommages résultant de l'utilisation de nos services</li>
              </ul>
              <p className="leading-relaxed mt-3">
                En cas de litige, nous encourageons le dialogue direct entre les parties et proposons 
                une médiation gratuite via notre support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                11. Modification des conditions
              </h2>
              <p className="leading-relaxed">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les changements 
                entreront en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter 
                régulièrement cette page pour rester informé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                12. Résiliation
              </h2>
              <p className="leading-relaxed">
                Nous pouvons suspendre ou résilier votre compte à tout moment si vous violez ces conditions. 
                Vous pouvez également supprimer votre compte à tout moment en contactant notre support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                13. Droit applicable
              </h2>
              <p className="leading-relaxed">
                Ces conditions sont régies par le droit togolais. Tout litige relatif à ces conditions 
                sera soumis à la compétence exclusive des tribunaux de Lomé, Togo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                14. Contact
              </h2>
              <p className="leading-relaxed">
                Pour toute question concernant ces conditions, contactez-nous :
              </p>
              <div className="bg-slate-800 rounded-xl p-6 mt-4 space-y-2">
                <p><strong className="text-white">Email :</strong> contact@prokorb.tg</p>
                <p><strong className="text-white">Téléphone :</strong> +228 70 88 86 99</p>
                <p><strong className="text-white">Adresse :</strong> Lomé, Togo</p>
              </div>
            </section>

            <div className="border-t border-slate-800 pt-8 mt-8">
              <p className="text-sm text-slate-400 text-center">
                En utilisant ProKorb, vous reconnaissez avoir lu, compris et accepté ces Conditions d'Utilisation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} ProKorb . Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                
              </Link>
              <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                
              </Link>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}