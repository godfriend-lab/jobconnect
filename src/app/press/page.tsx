import Link from 'next/link'
import { ArrowLeft, Download, Mail, Newspaper, Camera } from 'lucide-react'

export default function PressPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Presse & Média</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Ressources, communiqués et contacts pour les journalistes et médias.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">À propos de JobConnect</h2>
            <p className="text-slate-600 leading-relaxed">
              JobConnect Togo est la première marketplace de services au Togo, permettant aux particuliers et entreprises de trouver rapidement des professionnels qualifiés et vérifiés. Lancée en 2026, la plateforme compte déjà plus de 500 professionnels inscrits dans plus de 10 villes du pays.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <Newspaper className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Communiqués</h3>
              <p className="text-sm text-slate-600 mb-3">Téléchargez nos derniers communiqués de presse.</p>
              <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> Télécharger (PDF)
              </button>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <Camera className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Kit Média</h3>
              <p className="text-sm text-slate-600 mb-3">Logos, captures d'écran et visuels officiels.</p>
              <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1">
                <Download className="w-4 h-4" /> Télécharger (ZIP)
              </button>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <Mail className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Contact Presse</h3>
              <p className="text-sm text-slate-600 mb-3">Pour toute demande journalistique.</p>
              <a href="mailto:presse@jobconnect.tg" className="text-indigo-600 font-semibold text-sm">
                presse@jobconnect.tg
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Chiffres clés</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "500+", label: "Professionnels" },
                { value: "10+", label: "Villes" },
                { value: "2000+", label: "Mises en relation" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Demande d'interview</h3>
            <p className="text-slate-600 mb-4">
              Notre fondateur est disponible pour des interviews sur la digitalisation des services en Afrique de l'Ouest.
            </p>
            <a href="mailto:presse@jobconnect.tg?subject=Demande d'interview" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Nous contacter
            </a>
          </div>

        </div>
      </main>
    </div>
  )
}