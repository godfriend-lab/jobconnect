import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

// =========================================================
// 1. GÉNÉRATION AUTOMATIQUE DES MÉTADONNÉES (SEO, OG, TWITTER)
// =========================================================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient()
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (error || !article) {
    return { title: 'Article non trouvé | ProKorb' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'
  const url = `${baseUrl}/articles/${article.slug}`

  return {
    title: `${article.title} | ProKorb`,
    description: article.excerpt,
    alternates: {
      canonical: url, // ✅ URL Canonique
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: url,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      images: [{
        url: article.thumbnail_url || `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: article.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail_url || `${baseUrl}/logo.png`],
    },
  }
}

// =========================================================
// 2. RENDU DE LA PAGE DYNAMIQUE
// =========================================================
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (error || !article) {
    notFound() // Affiche une page 404 propre si l'article n'existe pas
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

  // ✅ 3. DONNÉES STRUCTURÉES SCHEMA.ORG (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.thumbnail_url,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { 
      "@type": "Organization", 
      "name": "ProKorb", 
      "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` } 
    },
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/articles/${article.slug}` }
  }

  return (
    <>
      {/* Injection du Schema.org dans le <head> pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="prose prose-invert max-w-none">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-bold rounded-full">
              {article.category || 'Actualité'}
            </span>
            <span className="text-sm text-slate-500">
              {new Date(article.published_at).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {article.thumbnail_url && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <Image
                src={article.thumbnail_url}
                alt={article.title}
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </header>

        {/* Contenu de l'article (supporte le HTML riche si tu utilises un éditeur de texte) */}
        <div 
          className="text-lg leading-relaxed text-slate-300 space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link href="/articles" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2">
            ← Retour à tous les articles
          </Link>
        </div>
      </article>
    </>
  )
}