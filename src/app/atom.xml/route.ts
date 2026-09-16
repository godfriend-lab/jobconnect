import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

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
    return new Response('Erreur', { status: 500 })
  }

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>ProKorb - Actualités</title>
  <link href="${baseUrl}/atom.xml" rel="self" />
  <link href="${baseUrl}" />
  <updated>${new Date().toISOString()}</updated>
  <author><name>Équipe ProKorb</name></author>
  <id>${baseUrl}/</id>
  ${articles.map(article => `
  <entry>
    <title><![CDATA[${article.title}]]></title>
    <link href="${baseUrl}/articles/${article.slug}" />
    <id>${baseUrl}/articles/${article.slug}</id>
    <updated>${new Date(article.published_at).toISOString()}</updated>
    <summary><![CDATA[${article.excerpt}]]></summary>
    <content type="html"><![CDATA[${article.content}]]></content>
    <category term="${article.category || 'Général'}" />
  </entry>
  `).join('')}
</feed>`

  return new Response(atomXml, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  })
}