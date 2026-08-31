// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

// ✅ CONFIGURATION DE BASE
const BASE_URL = 'https://prokorb.com'

// ✅ LISTE COMPLÈTE DES VILLES DU TOGO (SEO LOCAL)
const TOGO_CITIES = [
  // Région Maritime (Lomé et environs)
  'lome', 'adidogome', 'agoe-nyive', 'be', 'tokoin', 'akodessewa', 
  'nyekonakpoe', 'djidjole', 'attiegu', 'kegue', 'baguida', 'benua',
  'tsévié', 'aneho', 'glidji', 'agbodrafo', 'togoville', 'vogan',
  'kpalime', 'atkpame', 'nötse', 'badou', 'amlame',
  
  // Région des Plateaux
  'kpalime', 'agou', 'danyi', 'badou', 'amlame', 'notse', 'atakpame',
  
  // Région Centrale
  'sokode', 'tchamba', 'blitta', 'sotouboua', 'tchaoudjo',
  
  // Région de la Kara
  'kara', 'bassar', 'niaimtougou', 'pagouda', 'kandé', 'bafilo',
  
  // Région des Savanes
  'dapaong', 'mango', 'cinkasse', 'tandjouare', 'kpendjal',
]

// ✅ LISTE DES MÉTIERS PRINCIPAUX (SEO PAR CATÉGORIE)
const TOP_METIERS = [
  'plombier', 'electricien', 'macon', 'menuisier', 'peintre',
  'mecanicien', 'carreleur', 'soudeur', 'couvreur', 'jardinier',
  'femme-de-menage', 'couturier', 'coiffeur', 'developpeur-web',
  'graphiste', 'comptable', 'avocat', 'medecin', 'infirmier',
  'chauffeur', 'livreur', 'technicien', 'climaticien', 'frigoriste',
  'serrurier', 'vitrier', 'tapissier', 'ebeniste', 'charpentier',
  'ferronnier', 'platrier', 'facadier', 'etancheur', 'ramoneur',
]

// ✅ FONCTION POUR GÉNÉRER LES SLUGS PROPRES
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlève les accents
    .replace(/[^a-z0-9]+/g, '-')     // Remplace les caractères spéciaux par -
    .replace(/^-+|-+$/g, '')         // Enlève les - au début/fin
    .substring(0, 60)                // Limite la longueur
}

// ✅ TYPE POUR LES PROFILS
interface Profile {
  id: string
  full_name: string | null
  specialty: string | null
  city: string | null
  is_verified: boolean
  is_active: boolean
  created_at?: string
}

// ✅ TYPE POUR LES SERVICES
interface Service {
  id: string
  title: string | null
  category: string | null
  city: string | null
  pro_id: string
  created_at?: string
}

// ✅ FONCTION POUR RÉCUPÉRER LES PROFILS PROS DEPUIS SUPABASE
async function getProProfiles(): Promise<Profile[]> {
  try {
    // ✅ CORRECTION : createClient() est async, il faut await
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, specialty, city, is_verified, is_active, created_at')
      .eq('role', 'pro')
      .eq('is_active', true)
      .limit(500)
      .order('is_verified', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Erreur récupération profils pour sitemap:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error(' Erreur critique sitemap profils:', error)
    return []
  }
}

// ✅ FONCTION POUR RÉCUPÉRER LES SERVICES ACTIFS
async function getActiveServices(): Promise<Service[]> {
  try {
    // ✅ CORRECTION : createClient() est async, il faut await
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
    console.error(' Erreur critique sitemap services:', error)
    return []
  }
}

// ✅ FONCTION PRINCIPALE DE GÉNÉRATION DU SITEMAP
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // ============================================
  // 🏠 1. PAGES PRINCIPALES (PRIORITÉ MAXIMALE)
  // ============================================
  const mainPages = [
    {
      url: '/',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: '/marketplace',
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: '/about',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/contact',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: '/faq',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: '/categories',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: '/client/how-it-works',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/pro/how-it-works',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/pricing',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: '/security',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: '/client-protection',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  sitemapEntries.push(...mainPages)

  // ============================================
  // 📍 2. PAGES PAR VILLE (SEO LOCAL TOGO)
  // ============================================
  const cityPages = TOGO_CITIES.map((city) => ({
    url: `${BASE_URL}/marketplace?city=${encodeURIComponent(city)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  sitemapEntries.push(...cityPages)

  // ============================================
  // 🔧 3. PAGES PAR MÉTIER/CATÉGORIE
  // ============================================
  const metierPages = TOP_METIERS.map((metier) => ({
    url: `${BASE_URL}/marketplace?category=${encodeURIComponent(metier)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  sitemapEntries.push(...metierPages)

  // ============================================
  // 👨‍ 4. PROFILS PROFESSIONNELS (DYNAMIQUE)
  // ============================================
  try {
    const profiles = await getProProfiles()
    
    const profilePages = profiles.map((pro: Profile) => {
      const slug = slugify(pro.full_name || 'pro')
      const citySlug = pro.city ? slugify(pro.city) : 'togo'
      
      return {
        url: `${BASE_URL}/pro/${pro.id}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: pro.is_verified ? 0.8 : 0.6,
      }
    })

    sitemapEntries.push(...profilePages)
    console.log(`✅ Sitemap: ${profilePages.length} profils pros ajoutés`)
  } catch (error) {
    console.error('❌ Erreur génération profils sitemap:', error)
  }

  // ============================================
  // 🛠️ 5. SERVICES ACTIFS (DYNAMIQUE)
  // ============================================
  try {
    const services = await getActiveServices()
    
    const servicePages = services.map((service: Service) => ({
      url: `${BASE_URL}/marketplace?service=${service.id}`,
      lastModified: new Date(service.created_at || now),
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }))

    sitemapEntries.push(...servicePages)
    console.log(`✅ Sitemap: ${servicePages.length} services ajoutés`)
  } catch (error) {
    console.error('❌ Erreur génération services sitemap:', error)
  }

  // ============================================
  // 📄 6. PAGES LÉGALES (PRIORITÉ FAIBLE)
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
    priority: 0.3,
  }))

  sitemapEntries.push(...legalPages)

  // ============================================
  // 📊 STATISTIQUES FINALES
  // ============================================
  console.log('========================================')
  console.log(' SITEMAP GÉNÉRÉ AVEC SUCCÈS')
  console.log('========================================')
  console.log(`📍 Total URLs: ${sitemapEntries.length}`)
  console.log(`🏠 Pages principales: ${mainPages.length}`)
  console.log(`📍 Pages villes: ${cityPages.length}`)
  console.log(` Pages métiers: ${metierPages.length}`)
  console.log(`📄 Pages légales: ${legalPages.length}`)
  console.log('========================================')

  return sitemapEntries
}