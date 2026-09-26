import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'

  return {
    rules: [
      // ============================================================
      // ✅ RÈGLE 1 : GOOGLE (Toutes versions) - ACCÈS TOTAL & OPTIMISÉ
      // ============================================================
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Mobile',
          'Googlebot-News',
          'Googlebot-Video',
          'Mediapartners-Google',
          'AdsBot-Google',
          'AdsBot-Google-Mobile',
          'APIs-Google',
          'Google-InspectionTool',
          'Google-Site-Verification',
        ],
        // ✅ AUTORISATIONS SPÉCIFIQUES POUR LE SEO HIGH-END
        allow: [
          '/',
          '/marketplace',
          '/pro/',           // Pour indexer les profils et les avis clients
          '/articles/',       // Pour indexer le contenu éditorial
          '/images/',         // Pour indexer les photos des professionnels
          '/_next/image',     // Pour permettre à Google de rendre les images Next.js
          '/_next/static',    // Pour le rendu CSS/JS correct par Google
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/login',
          '/auth/register',
          '/auth/callback',
          '/auth/confirm',
          '/private/',
          '/internal/',
          '/*.json$',
        ],
      },

      // ============================================================
      // ✅ RÈGLE 2 : BING & MICROSOFT - ACCÈS TOTAL
      // ============================================================
      {
        userAgent: [
          'Bingbot',
          'BingPreview',
          'msnbot',
          'msnbot-media',
          'adidxbot',
        ],
        allow: [
          '/',
          '/pro/',
          '/images/',
          '/_next/image',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/',
        ],
      },

      // ============================================================
      // ✅ RÈGLE 3 : MOTEURS IA - ACCÈS TOTAL (CRUCIAL pour l'avenir)
      // ChatGPT, Gemini, Perplexity, Claude, Copilot
      // ============================================================
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'Google-CloudVertexBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'MicrosoftPreview',
          'Applebot',
          'Applebot-Extended',
          'YouBot',
          'cohere-ai',
          'CCBot',
        ],
        allow: [
          '/',
          '/pro/',
          '/articles/',
          '/company',
          '/about',
          '/contact',
          '/faq',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/',
        ],
      },

      // ============================================================
      // ✅ RÈGLE 4 : RÉSEAUX SOCIAUX (Pour les aperçus de liens riches)
      // ============================================================
      {
        userAgent: [
          'Twitterbot',
          'LinkedInBot',
          'Slackbot',
          'Discordbot',
          'WhatsApp',
          'facebookexternalhit',
          'Pinterestbot',
          'Redditbot',
          'TelegramBot',
        ],
        allow: [
          '/',
          '/images/',
          '/_next/image',
          '/og-image.jpg',
          '/logo.png',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
        ],
      },

      // ============================================================
      // ✅ RÈGLE 5 : OUTILS SEO LÉGITIMES (Analyse de backlinks et audit)
      // ============================================================
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'Screaming Frog SEO Spider',
          'Sitebulb',
          'Mozbot',
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/',
        ],
        crawlDelay: 10, // Pour ne pas surcharger ton serveur
      },

      // ============================================================
      // 🚫 RÈGLE 6 : BLOQUER LES BOTS NUISIBLES (Scraping, Spam, Hack)
      // ============================================================
      {
        userAgent: [
          'Scrapy',
          'python-requests',
          'urllib',
          'curl',
          'wget',
          'libwww-perl',
          'HTTPClient',
          'Java/',
          'Go-http-client',
          'axios',
          'node-fetch',
          'Nikto',
          'Nessus',
          'sqlmap',
          'masscan',
          'nmap',
          'ZmEu',
          'CensysInspect',
          'Shodan',
          'BLEXBot',
          'PetalBot',
        ],
        disallow: '/',
      },

      // ============================================================
      // 🤖 RÈGLE 7 : TOUS LES AUTRES BOTS (Règle par défaut sécurisée)
      // ============================================================
      {
        userAgent: '*',
        allow: [
          '/',
          '/marketplace',
          '/pro/',
          '/articles/',
          '/company',
          '/about',
          '/contact',
          '/faq',
          '/categories',
          '/metiers',
          '/avantages',
          '/comment-ca-marche',
          '/pricing',
          '/terms',
          '/privacy',
          '/cookies',
          '/legal',
          '/images/',
          '/_next/image',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/admin/',
          '/auth/login',
          '/auth/register',
          '/auth/callback',
          '/auth/confirm',
          '/_next/data/',
          '/_next/static/',
          '/static/',
          '/private/',
          '/internal/',
          '/cgi-bin/',
          '/wp-admin/',
          '/wp-login.php',
          '/*.json$',
          '/*.xml$',
          // Blocage des paramètres de tracking et de tri inutiles pour le SEO
          '*?sort=',
          '*?filter=',
          '*?page=',
          '*?utm_',
          '*?fbclid',
          '*?gclid',
          '*?ref=',
          '*?search=',
          '*?q=',
        ],
        crawlDelay: 15,
      },
    ],

    // ============================================================
    // 📍 SITEMAPS (Déclaration complète pour une indexation maximale)
    // ============================================================
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/news-sitemap.xml`,
      `${BASE_URL}/video-sitemap.xml`,
    ],

    // ============================================================
    // 🌍 HOST (Domaine canonique pour éviter le contenu dupliqué)
    // ============================================================
    host: BASE_URL,
  }
}