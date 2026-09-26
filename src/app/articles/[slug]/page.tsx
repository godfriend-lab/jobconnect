import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react'

// =========================================================
// 1. GÉNÉRATION AUTOMATIQUE DES MÉTADONNÉES (SEO HIGH-END)
// =========================================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('title, excerpt, thumbnail_url, published_at, author, category, slug') // ✅ 'slug' ajouté ici
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !article) {
    return { 
      title: 'Article non trouvé | ProKorb Afrique',
      robots: { index: false, follow: false }
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'
  const url = `${baseUrl}/articles/${article.slug}` // ✅ Variable 'url' correctement définie
  const imageUrl = article.thumbnail_url || `${baseUrl}/og-image.jpg`

  return {
    title: `${article.title} | ProKorb Afrique`,
    description: article.excerpt || `Découvrez l'article ${article.title} sur ProKorb, la marketplace N°1 des services en Afrique.`,
    keywords: [
      article.title,
      article.category,
      'ProKorb',
      'Afrique',
      'services professionnels',
      article.category ? `${article.category} Afrique` : '',
    ].filter(Boolean),
    authors: [{ name: article.author || 'ProKorb' }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: url,
      type: 'article',
      publishedTime: article.published_at,
      siteName: 'ProKorb',
      locale: 'fr_FR',
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: article.title,
        type: 'image/jpeg',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  }
}

// =========================================================
// 2. RENDU DE LA PAGE DYNAMIQUE (UI HIGH-END + SEO)
// =========================================================
export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !article) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

  // ✅ DONNÉES STRUCTURÉES SCHEMA.ORG (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.thumbnail_url ? [article.thumbnail_url] : [],
    "author": { 
      "@type": "Person", 
      "name": article.author || "ProKorb" 
    },
    "publisher": { 
      "@type": "Organization", 
      "name": "ProKorb", 
      "logo": { 
        "@type": "ImageObject", 
        "url": `${baseUrl}/logo.png` 
      } 
    },
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "mainEntityOfPage": { 
      "@type": "WebPage", 
      "@id": `${baseUrl}/articles/${article.slug}` 
    }
  }

  return (
    <>
      {/* Injection du Schema.org dans le <head> pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Bouton retour */}
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à tous les articles
          </Link>

          <header className="mb-12">
            {/* Catégorie et Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {article.category && (
                <span className="px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-bold rounded-full">
                  {article.category}
                </span>
              )}
              {article.published_at && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.published_at}>
                    {new Date(article.published_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>

            {/* Image Principale */}
            {article.thumbnail_url && (
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl mb-12">
                <Image
                  src={article.thumbnail_url}
                  alt={article.title || 'Image de l\'article'}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Contenu de l'article */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h2:text-3xl prose-h3:text-2xl 
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: article.content || '' }} 
          />

          {/* Section de partage */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-600" />
                Partager cet article
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title || '')}&url=${encodeURIComponent(`${baseUrl}/articles/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/articles/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/articles/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${article.title || 'Article'} - ${baseUrl}/articles/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

        </article>
      </div>
    </>
  )
}