// @ts-nocheck
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Rocket, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* 1. NAVIGATION BAR (Simplifiée) */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl font-black tracking-tight">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </div>
          </Link>
          
          <Link 
            href="/" 
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
        </div>
      </nav>

      {/* 2. CONTENU PRINCIPAL (Message "Bientôt disponible") */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-20">
        <div className="text-center max-w-2xl mx-auto space-y-8">
          
          {/* Icône animée */}
          <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-100">
            <Rocket className="w-12 h-12 text-indigo-600" />
          </div>
          
          {/* Titre et sous-titre */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Tarification <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">bientôt disponible</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              Nous travaillons actuellement sur nos formules pour vous offrir le meilleur rapport qualité-prix. 
              Cette page est en cours de développement et sera disponible très prochainement.
            </p>
          </div>

          {/* Badge "En cours de développement" */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            En cours de développement
          </div>

          {/* Ce qui arrive bientôt (pour rassurer l'utilisateur) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 shadow-sm">
            <h3 className="font-bold text-slate-950 text-sm uppercase tracking-wider mb-4">Ce qui arrive bientôt :</h3>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Formule Gratuite pour démarrer sans risque</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Forfaits Pro abordables (Starter, Business, Premium)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Paiement sécurisé via T-Money, Flooz, Stripe, et cartes </span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Retour à l'accueil
            </Link>
            <a 
              href="mailto:contact@jobconnect.io" 
              className="w-full sm:w-auto text-slate-700 hover:text-indigo-600 font-semibold px-8 py-3.5 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Nous contacter
            </a>
          </div>

        </div>
      </main>

      {/* 3. FOOTER SIMPLIFIÉ */}
      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 bg-white">
        <p>&copy; {new Date().getFullYear()} JobConnect Togo. Tous droits réservés.</p>
      </footer>

    </div>
  )
}