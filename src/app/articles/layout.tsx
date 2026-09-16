import Link from 'next/link'

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* En-tête */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ProKorb" className="h-10 w-auto" />
            <span className="font-black text-xl">
              <span className="text-indigo-400">PRO</span>
              <span className="text-white">KORB</span>
            </span>
          </Link>
          <Link 
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold"
          >
            ← Accueil
          </Link>
        </div>
      </header>

      {/* Contenu de l'article */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </main>

      {/* Pied de page */}
      <footer className="border-t border-slate-800 bg-slate-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ProKorb. Tous droits réservés.
        </div>
      </footer>
    </div>
  )
}