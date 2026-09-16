import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Mis en cache 1 heure

export async function GET() {
  const supabase = await createClient()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50)

  if (error || !articles) {
    return new Response('Erreur génération RSS', { status: 500 })
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ProKorb - Actualités et Conseils</title>
    <link>${baseUrl}</link>
    <description>Découvrez les derniers articles, conseils et actualités de ProKorb, la marketplace N°1 au Togo pour connecter clients et professionnels qualifiés.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <author><![CDATA[${article.author || 'Équipe ProKorb'}]]></author>
      <category><![CDATA[${article.category || 'Général'}]]></category>
      ${article.thumbnail_url ? `
      <media:content url="${baseUrl}${article.thumbnail_url}" type="image/jpeg" />
      <media:thumbnail url="${baseUrl}${article.thumbnail_url}" />
      ` : ''}
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}