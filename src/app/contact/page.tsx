// @ts-nocheck
'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, ShieldAlert, Building2, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contactez-nous</h1>
          <p className="text-xl text-indigo-100">
            Notre équipe est à votre disposition. Pour votre sécurité, veuillez utiliser le canal approprié à votre demande.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Canaux de contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" /> Canaux Sécurisés
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="block font-semibold text-slate-900 dark:text-white">Support Général</span>
                  <a href="mailto:support@jobconnect.tg" className="text-indigo-600 hover:underline">support@jobconnect.tg</a>
                </li>
                <li>
                  <span className="block font-semibold text-slate-900 dark:text-white">Confidentialité & Données (DPO)</span>
                  <a href="mailto:privacy@ideenwerk.tg" className="text-indigo-600 hover:underline">privacy@ideenwerk.tg</a>
                </li>
                <li>
                  <span className="block font-semibold text-slate-900 dark:text-white">Signalement de Sécurité</span>
                  <a href="mailto:security@ideenwerk.tg" className="text-red-600 hover:underline font-medium">security@ideenwerk.tg</a>
                  <p className="text-xs text-slate-500 mt-1">Pour les vulnérabilités ou incidents de sécurité uniquement.</p>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" /> Siège Social
              </h3>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>Lomé, République Togolaise<br/>(Adresse complète sur demande officielle)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0" />
                  <p>+228 70 88 86 99</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 shrink-0" />
                  <p>Lun - Ven : 08h00 - 17h00 (GMT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Envoyez-nous un message</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                ⚠️ <strong>Avertissement de sécurité :</strong> Ne partagez jamais de mots de passe, de numéros de carte bancaire ou de documents d'identité sensibles via ce formulaire.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom complet</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Adresse email professionnelle</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="vous@entreprise.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sujet de la demande</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <option>Demande d'information générale</option>
                    <option>Support technique (Compte / Application)</option>
                    <option>Partenariat commercial</option>
                    <option>Question juridique ou conformité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Décrivez votre demande en détail..."></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="privacy" className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                  <label htmlFor="privacy" className="text-sm text-slate-600 dark:text-slate-400">
                    J'accepte que mes données soient traitées conformément à la <Link href="/privacy" className="text-indigo-600 hover:underline">Politique de Confidentialité</Link> d'Ideenwerk Technologies pour répondre à ma demande.
                  </label>
                </div>

                <button type="submit" className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Envoyer de manière sécurisée
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}