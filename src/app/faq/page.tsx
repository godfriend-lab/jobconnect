'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const faqs = [
    {
      category: 'Général',
      question: 'Qu\'est-ce que JobConnect et comment ça fonctionne ?',
      answer: 'JobConnect est la plateforme de référence au Togo pour la mise en relation entre clients et professionnels du quotidien (électriciens, maçons, plombiers, répétiteurs, etc.). Les clients publient gratuitement leurs besoins de chantiers ou dépannages, et les artisans qualifiés à proximité postulent pour réaliser la mission.',
    },
    {
      category: 'Pour les Artisans',
      question: 'Comment obtenir le badge "Artisan Vérifié" sur mon profil ?',
      answer: 'La confiance est notre priorité. Pour être certifié, vous devez soumettre via votre espace membre une pièce d\'identité valide (Carte d\'identité togolaise, Passeport ou Carte d\'électeur) et, si applicable, vos diplômes ou attestations de fin d\'apprentissage. Notre équipe examine et valide chaque dossier sous 24h à 48h.',
    },
    {
      category: 'Paiements',
      question: 'Quels sont les moyens de paiement acceptés pour les abonnements ?',
      answer: 'Pour faciliter l\'accès à tous les professionnels au Togo, nous acceptons les paiements mobiles locaux les plus populaires : T-Money et Flooz. L\'activation de votre abonnement (Découverte, Pro, Entreprise) est instantanée dès la validation du transfert.',
    },
    {
      category: 'Pour les Clients',
      question: 'Est-ce que la publication d\'une demande de service est payante ?',
      answer: 'Non, c\'est 100% gratuit pour les clients ! Vous pouvez publier autant de demandes de chantiers ou de dépannages que vous le souhaitez. Vous ne payez que l\'artisan que vous aurez choisi, selon le devis convenu ensemble.',
    },
    {
      category: 'Sécurité',
      question: 'Que se passe-t-il en cas de litige ou de travail mal fait ?',
      answer: 'JobConnect intègre un service de médiation. Nous recommandons d\'utiliser notre système de messagerie pour garder une trace écrite de vos échanges. En cas de désaccord sur la conformité des travaux, notre support local intervient pour analyser la situation et trouver une solution équitable.',
    },
  ]

  // État pour suivre quelle question est ouverte (null = aucune)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Barre de navigation */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight text-blue-600">
            JOB<span className="text-slate-800">CONNECT</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* En-tête de la page */}
      <header className="max-w-3xl mx-auto text-center px-4 pt-16 pb-12">
        <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100">
          💬 Centre d'aide
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Questions fréquemment <br />
          <span className="text-blue-600">posées.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Trouvez des réponses claires à toutes vos questions sur l'utilisation de la plateforme, les paiements mobiles et la sécurité.
        </p>
      </header>

      {/* Liste des FAQ de type Accordéon */}
      <main className="max-w-3xl mx-auto px-4 pb-24">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <div className="pr-4">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-600 transition duration-150">
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`text-xl font-bold shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Zone de réponse animée en hauteur */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bannière de contact */}
        <div className="mt-12 text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h4 className="font-extrabold text-slate-950 text-lg">Vous ne trouvez pas votre réponse ?</h4>
          <p className="text-sm text-slate-500 mt-1">Notre équipe d'assistance est basée à Lomé et disponible pour vous guider.</p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a
              href="https://wa.me/22890000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-5 rounded-xl transition shadow-md shadow-emerald-100 flex items-center gap-2"
            >
              💬 Support WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}