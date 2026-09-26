import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProProfileClient from './ProProfileClient'

// ==========================================================
//  GENERATE METADATA DYNAMIQUE (SEO PAR PROFESSIONNEL)
// ==========================================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, specialty, city, bio, avatar_url, is_verified, rating, reviews_count, is_available')
    .eq('id', id)
    .eq('role', 'pro')
    .eq('is_active', true)
    .single()

  if (error || !profile) {
    return {
      title: 'Professionnel non trouvé | ProKorb Afrique',
      robots: { index: false, follow: false },
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'
  const profileUrl = `${baseUrl}/pro/${id}`
  const imageUrl = profile.avatar_url || `${baseUrl}/og-image.jpg`

  // Titre optimisé avec badge vérifié
  const title = profile.is_verified
    ? `${profile.full_name} - ${profile.specialty} Vérifié(e) à ${profile.city} | ProKorb`
    : `${profile.full_name} - ${profile.specialty} à ${profile.city} | ProKorb`

  // Description optimisée (max 155 caractères)
  const description = profile.bio 
    ? `${profile.bio.substring(0, 155)}${profile.bio.length > 155 ? '...' : ''}`
    : `Trouvez ${profile.full_name}, ${profile.specialty} ${profile.is_verified ? 'vérifié(e)' : ''} à ${profile.city} sur ProKorb, la marketplace N°1 en Afrique.`

  return {
    title,
    description,
    keywords: [
      profile.full_name,
      profile.specialty,
      profile.city,
      'professionnel vérifié',
      'ProKorb',
      'Afrique',
      profile.is_verified ? 'vérifié' : '',
    ].filter(Boolean),
    authors: [{ name: profile.full_name || 'ProKorb' }],
    openGraph: {
      title,
      description,
      url: profileUrl,
      siteName: 'ProKorb',
      type: 'profile',
      locale: 'fr_FR',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${profile.full_name} - ${profile.specialty}`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: profileUrl,
    },
  }
}

// ==========================================================
// 📄 SERVER COMPONENT PRINCIPAL
// ==========================================================
export default async function ProProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()

  // Charger le profil
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('role', 'pro')
    .eq('is_active', true)
    .single()

  if (error || !profile) {
    notFound()
  }

  // Charger le portfolio
  const { data: portfolio } = await supabase
    .from('professional_portfolio')
    .select('*')
    .eq('professional_id', id)
    .order('created_at', { ascending: false })

  // Charger les avis
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, profiles:client_id(full_name, avatar_url)')
    .eq('reviewee_id', id)
    .order('created_at', { ascending: false })
    .limit(20)

  const formattedReviews = reviews?.map(review => ({
    ...review,
    reviewer_name: review.profiles?.full_name || 'Client anonyme',
    reviewer_avatar: review.profiles?.avatar_url || null
  })) || []

  // Calculer la note moyenne
  const avgRating = formattedReviews.length > 0
    ? formattedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / formattedReviews.length
    : 0

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

  // ✅ DONNÉES STRUCTURÉES SCHEMA.ORG (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/pro/${profile.id}`,
    "name": profile.full_name,
    "description": profile.bio || `${profile.specialty} à ${profile.city}`,
    "image": profile.avatar_url || `${baseUrl}/og-image.jpg`,
    "url": `${baseUrl}/pro/${profile.id}`,
    "telephone": profile.phone || "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profile.city || "Lomé",
      "addressCountry": "TG"
    },
    "jobTitle": profile.specialty || "Professionnel",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": formattedReviews.length
    },
    "review": formattedReviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.reviewer_name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.comment
    })),
    "isVerified": profile.is_verified || false
  }

  return (
    <>
      {/* Injection du Schema.org dans le <head> pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Client Component pour l'interactivité */}
      <ProProfileClient 
        profile={profile}
        portfolio={portfolio || []}
        reviews={formattedReviews}
        avgRating={avgRating}
      />
    </>
  )
}