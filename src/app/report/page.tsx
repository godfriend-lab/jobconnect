import Link from 'next/link'
import { ArrowLeft, AlertTriangle, MessageSquare, User, FileText, Send } from 'lucide-react'

export default function ReportPage() {
  const reportTypes = [
    { id: 'user', label: 'Signaler un utilisateur', icon: User },
    { id: 'content', label: 'Signaler un contenu inapproprié', icon: FileText },
    { id: 'fraud', label: 'Signaler une fraude ou arnaque', icon: AlertTriangle },
    { id: 'other', label: 'Autre problème', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Signaler un problème</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Aidez-nous à maintenir une communauté sûre en signalant tout comportement ou contenu inapproprié.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-8">
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Signalement urgent ?</h3>
                <p className="text-sm text-amber-800">
                  Si vous êtes en danger immédiat, contactez les autorités locales. Pour les urgences sur la plateforme, écrivez-nous à <a href="mailto:urgence@jobconnect.tg" className="underline font-semibold">urgence@jobconnect.tg</a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Type de signalement</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {reportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <label key={type.id} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                    <input type="radio" name="reportType" className="w-5 h-5 text-indigo-600" />
                    <Icon className="w-6 h-6 text-slate-600" />
                    <span className="font-semibold text-slate-900">{type.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Personne ou contenu concerné <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Nom d'utilisateur, lien du profil ou description"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description du problème <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={5}
                placeholder="Décrivez en détail le problème rencontré..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Preuves (captures d'écran, messages, etc.)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                <input type="file" multiple className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-indigo-600">Cliquez pour uploader</span> ou glissez-déposez vos fichiers
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF (max 10MB)</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Votre email (pour le suivi)
              </label>
              <input 
                type="email" 
                placeholder="votre@email.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Envoyer le signalement
            </button>
          </form>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Confidentialité garantie</h3>
            <p className="text-sm text-slate-600">
              Votre signalement est traité de manière confidentielle. L'utilisateur signalé ne sera pas informé de votre identité.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}