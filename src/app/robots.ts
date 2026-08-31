// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ✅ RÈGLE 1 : Autoriser tous les bons crawlers (Google, Bing, etc.)
      {
        userAgent: '*',
        allow: [
          '/',
          '/marketplace',
          '/pro/',
          '/about',
          '/contact',
          '/faq',
          '/categories',
          '/client/how-it-works',
          '/pro/how-it-works',
          '/pricing',
          '/terms',
          '/privacy',
          '/security',
          '/client-protection',
          '/data-protection',
          '/refund',
          '/legal',
          '/cookies',
          '/careers',
          '/company',
          '/partners',
          '/press',
          '/jobs',
          '/resources',
          '/verification',
          '/auth/confirm',
          '/auth/callback',
        ],
        disallow: [
          // Routes privées et sensibles
          '/dashboard/',
          '/api/',
          '/login',
          '/register',
          '/messages',
          '/_next/',
          '/static/',
          
          // Paramètres d'URL inutiles
          '/*?',
          '/*&',
          '/*#',
          
          // Fichiers système
          '/*.json$',
          '/*.xml$',
          '/*.txt$',
        ],
      },
      
      // ✅ RÈGLE 2 : Bloquer les mauvais bots (spam, scraping, IA non désirée)
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'Baiduspider',
          'YandexBot',
          'Exabot',
          'facebot',
          'ia_archiver',
          'archive.org_bot',
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'CCBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'cohere-ai',
          'YouBot',
        ],
        disallow: '/',
      },
      
      // ✅ RÈGLE 3 : Googlebot spécifique (priorité maximale)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/login',
          '/register',
          '/messages',
        ],
      },
      
      // ✅ RÈGLE 4 : Googlebot-Image (pour indexer les photos de pros)
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/pro/',
          '/marketplace',
          '/_next/image',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
        ],
      },
      
      // ✅ RÈGLE 5 : Googlebot-Mobile (optimisation mobile)
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
        ],
      },
      
      // ✅ RÈGLE 6 : Bingbot (2ème moteur de recherche)
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/login',
          '/register',
        ],
      },
    ],
    
    // ✅ SITEMAP : Indispensable pour l'indexation
    sitemap: 'https://prokorb.com/sitemap.xml',
    
    // ✅ HOST : Domaine canonique (évite le contenu dupliqué)
    host: 'https://prokorb.com',
  }
}