import type { Metadata, Viewport } from "next"
import "./globals.css"
import Chatbot from "@/components/Chatbot"
import ConditionalFooter from "@/components/ConditionalFooter"
import { LanguageProvider } from "@/contexts/LanguageContext"
import InstallPrompt from "@/components/InstallPrompt"

// ==========================================
// 1. CONFIGURATION VIEWPORT (Mobile & PWA)
// ==========================================
export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

// ==========================================
// 2. MÉTADONNÉES SEO & PWA (Next.js Metadata API)
// ==========================================
export const metadata: Metadata = {
  // ✅ Résout le warning des images Open Graph/Twitter
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'),
  
  title: {
    default: "ProKorb - La Marketplace N°1 des Services au Togo",
    template: "%s | ProKorb",
  },
  description: "Trouvez les meilleurs professionnels vérifiés du Togo. Plombiers, électriciens, maçons et plus encore à Lomé, Kpalimé, Sokodé.",
  keywords: ["services", "professionnels", "Togo", "Lomé", "marketplace", "ProKorb", "plombier Lomé", "électricien Togo", "artisan vérifié"],
  
  // PWA Manifest
  manifest: "/manifest.json",
  
  // ✅ Icônes corrigées - Utilise favicon.png directement
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  
  // Configuration spécifique Apple (iOS)
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ProKorb",
  },
  
  // Vérification Google Search Console
  verification: {
    google: "mYpnXsmHzgD9s0WWb6ULIYD4Wl8m0UPQZgTFOs-R9aw",
  },

  // Flux RSS/Atom pour l'indexation
  alternates: {
    types: {
      'application/rss+xml': `/rss.xml`,
      'application/atom+xml': `/atom.xml`,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "ProKorb - La Marketplace N°1 des Services au Togo",
    description: "Trouvez les meilleurs professionnels vérifiés du Togo",
    siteName: "ProKorb",
    locale: "fr_FR",
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "ProKorb Marketplace" }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ProKorb - Marketplace de Services",
    description: "Trouvez des professionnels vérifiés au Togo",
    images: ["/og-image.jpg"],
  },
}

// ==========================================
// 3. COMPOSANT RACINE (Layout)
// ==========================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* BALISES PWA EXPLICITES (Compatibilité maximale iOS Safari) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ProKorb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="ProKorb" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        
        {/* Liens directs vers les ressources PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png" />
        
        {/* Favicon standard */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        
        {/* Préconnexion aux polices pour un chargement plus rapide */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body className="antialiased font-sans flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <LanguageProvider>
          {/* Contenu principal de la page */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Éléments globaux */}
          <ConditionalFooter />
          <Chatbot />
          
          {/* Invite d'installation PWA personnalisée (iOS & Android) */}
          <InstallPrompt />
        </LanguageProvider>
        
        {/* ENREGISTREMENT DU SERVICE WORKER */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js?v=3', {
                    scope: '/',
                    updateViaCache: 'none'
                  })
                    .then(registration => {
                      console.log('✅ Service Worker enregistré avec succès:', registration.scope);
                      
                      // Vérifier les mises à jour du SW toutes les heures
                      setInterval(() => {
                        registration.update();
                      }, 60 * 60 * 1000);
                    })
                    .catch(error => {
                      console.error('❌ Échec de l\\'enregistrement du Service Worker:', error);
                    });
                });
                
                // Recharger automatiquement la page quand une nouvelle version du SW prend le contrôle
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                  console.log('🔄 Nouvelle version de l\\'application détectée. Rechargement...');
                  window.location.reload();
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}