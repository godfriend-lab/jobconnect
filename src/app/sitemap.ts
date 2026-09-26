// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

// ✅ CORRECTION : Empêche la génération statique pendant le build
export const dynamic = 'force-dynamic'
export const revalidate = 3600

// ✅ CONFIGURATION DE BASE - URL COMPLÈTE
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

// ✅ LISTE COMPLÈTE DES VILLES DU TOGO
const TOGO_CITIES = [
  'lome', 'adidogome', 'agoe-nyive', 'be', 'tokoin', 'akodessewa', 
  'nyekonakpoe', 'djidjole', 'attiegu', 'kegue', 'baguida', 'benua',
  'tsevie', 'aneho', 'glidji', 'agbodrafo', 'togoville', 'vogan',
  'kpalime', 'atkpame', 'notse', 'badou', 'amlame',
  'agou', 'danyi', 'atakpame',
  'sokode', 'tchamba', 'blitta', 'sotouboua', 'tchaoudjo',
  'kara', 'bassar', 'niaimtougou', 'pagouda', 'kande', 'bafilo',
  'dapaong', 'mango', 'cinkasse', 'tandjouare', 'kpendjal',
]

// ✅ LISTE DES MÉTIERS PRINCIPAUX
const TOP_METIERS = [
  'plombier', 'electricien', 'macon', 'menuisier', 'peintre',
  'mecanicien', 'carreleur', 'soudeur', 'couvreur', 'jardinier',
  'femme-de-menage', 'couturier', 'coiffeur', 'developpeur-web',
  'graphiste', 'comptable', 'avocat', 'medecin', 'infirmier',
  'chauffeur', 'livreur', 'technicien', 'climaticien', 'frigoriste',
  'serrurier', 'vitrier', 'tapissier', 'ebeniste', 'charpentier',
  'ferronnier', 'platrier', 'facadier', 'etancheur', 'ramoneur',
]

// ✅ TYPES
interface Profile {
  id: string
  full_name: string | null
  specialty: string | null
  city: string | null
  avatar_url: string | null
  is_verified: boolean
  is_active: boolean
  created_at?: string | null
  updated_at?: string | null
}

interface Service {
  id: string
  title: string | null
  category: string | null
  city: string | null
  pro_id: string
  created_at?: string | null
}

interface Article {
  id: string
  slug: string
  title: string | null
  thumbnail_url: string | null
  published_at: string
}

// ✅ FONCTIONS SUPABASE
async function getProProfiles(): Promise<Profile[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, specialty, city, avatar_url, is_verified, is_active, created_at, updated_at')
      .eq('role', 'pro')
      .eq('is_active', true)
      .limit(1000)
      .order('is_verified', { ascending: false })
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('❌ Erreur récupération profils pour sitemap:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('❌ Erreur critique sitemap profils:', error)
    return []
  }
}

async function getActiveServices(): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('id, title, category, city, pro_id, created_at')
      .eq('is_active', true)
      .limit(1000)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Erreur récupération services pour sitemap:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('❌ Erreur critique sitemap services:', error)
    return []
  }
}

async function getArticles(): Promise<Article[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, thumbnail_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('❌ Erreur récupération articles pour sitemap:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('❌ Erreur critique sitemap articles:', error)
    return []
  }
}

// ✅ FONCTION PRINCIPALE HIGH END SEO
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // ============================================
  // 🏠 1. PAGES PRINCIPALES
  // ============================================
  const mainPages = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE_URL}/marketplace`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${BASE_URL}/company`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/articles`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/client/how-it-works`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/pro/how-it-works`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/security`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/client-protection`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]
  sitemapEntries.push(...mainPages)

  // ============================================
  // 📍 2. PAGES PAR VILLE
  // ============================================
  const cityPages = TOGO_CITIES.map((city) => ({
    url: `${BASE_URL}/marketplace?city=${encodeURIComponent(city)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  sitemapEntries.push(...cityPages)

  // ============================================
  // 🔧 3. PAGES PAR MÉTIER
  // ============================================
  const metierPages = TOP_METIERS.map((metier) => ({
    url: `${BASE_URL}/marketplace?category=${encodeURIComponent(metier)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  sitemapEntries.push(...metierPages)

  // ============================================
  // 👨‍🔧 4. PROFILS PROFESSIONNELS
  // ============================================
  try {
    const profiles = await getProProfiles()
    const profilePages = profiles.map((pro: Profile) => {
      // ✅ Gestion sécurisée des dates
      const lastModDate = pro.updated_at || pro.created_at ? new Date(pro.updated_at || pro.created_at || now) : now
      
      return {
        url: `${BASE_URL}/pro/${pro.id}`,
        lastModified: lastModDate,
        changeFrequency: 'weekly' as const,
        priority: pro.is_verified ? 0.9 : 0.7,
      }
    })
    sitemapEntries.push(...profilePages)
    console.log(`✅ Sitemap: ${profilePages.length} profils pros ajoutés`)
  } catch (error) {
    console.error('❌ Erreur génération profils sitemap:', error)
  }

  // ============================================
  // 🛠️ 5. SERVICES ACTIFS
  // ============================================
  try {
    const services = await getActiveServices()
    const servicePages = services.map((service: Service) => {
      const lastModDate = service.created_at ? new Date(service.created_at) : now
      
      return {
        url: `${BASE_URL}/marketplace?service=${service.id}`,
        lastModified: lastModDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
    sitemapEntries.push(...servicePages)
    console.log(`✅ Sitemap: ${servicePages.length} services ajoutés`)
  } catch (error) {
    console.error('❌ Erreur génération services sitemap:', error)
  }

  // ============================================
  // 📰 6. ARTICLES
  // ============================================
  try {
    const articles = await getArticles()
    const articlePages = articles.map((article: Article) => {
      const lastModDate = article.published_at ? new Date(article.published_at) : now
      
      return {
        url: `${BASE_URL}/articles/${article.slug}`,
        lastModified: lastModDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      }
    })
    sitemapEntries.push(...articlePages)
    console.log(`✅ Sitemap: ${articlePages.length} articles ajoutés`)
  } catch (error) {
    console.error('❌ Erreur génération articles sitemap:', error)
  }

  // ============================================
  // 📄 7. PAGES LÉGALES
  // ============================================
  const legalPages = [
    '/terms',
    '/privacy',
    '/cookies',
    '/legal',
    '/data-protection',
    '/refund',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))
  sitemapEntries.push(...legalPages)

  console.log('========================================')
  console.log('✅ SITEMAP HIGH-END SEO GÉNÉRÉ AVEC SUCCÈS')
  console.log('========================================')
  console.log(`📍 Total URLs générées: ${sitemapEntries.length}`)
  console.log('========================================')

  return sitemapEntries
}