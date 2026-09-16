import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Articles & Actualités | ProKorb',
  description: 'Découvrez les actualités, conseils et la vision de ProKorb, la marketplace N°1 pour connecter clients et professionnels au Togo.',
}

export default async function ArticlesListPage() {
  const supabase = await createClient()
  
  // ✅ CORRECTION : Ajout de 'thumbnail_url' dans le select pour correspondre à la base de données
  const { data: articles } = await supabase
    .from('articles')
    .select('title, slug, excerpt, published_at, category, thumbnail_url')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la page */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Articles & Actualités
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Retrouvez ici nos dernières actualités, nos conseils pour bien choisir votre professionnel, et tout ce qui fait l'ADN de ProKorb au Togo.
          </p>
        </div>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles && articles.length > 0 ? (
            articles.map((article: any) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {/* ✅ CORRECTION : Utilisation de thumbnail_url au lieu de image */}
                {article.thumbnail_url && (
                  <div className="aspect-video overflow-hidden bg-slate-800">
                    <img 
                      src={article.thumbnail_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wide">
                      {article.category || 'Actualité'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(article.published_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
                      Lire l'article 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-lg">Aucun article publié pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}