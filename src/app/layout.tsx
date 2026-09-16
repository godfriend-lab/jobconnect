import type { Metadata, Viewport } from "next"
import "./globals.css"
import Chatbot from "@/components/Chatbot"
import ConditionalFooter from "@/components/ConditionalFooter"
import { LanguageProvider } from "@/contexts/LanguageContext"

// ✅ CONFIGURATION VIEWPORT
export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

// ✅ CONFIGURATION METADATA PWA & SEO
export const metadata: Metadata = {
  title: "ProKorb - La Marketplace N°1 des Services au Togo",
  description: "Trouvez les meilleurs professionnels vérifiés du Togo. Plombiers, électriciens, maçons et plus encore à Lomé, Kpalimé, Sokodé.",
  keywords: ["services", "professionnels", "Togo", "Lomé", "marketplace", "ProKorb", "plombier Lomé", "électricien Togo", "artisan vérifié"],
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.png',
    apple: '/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ProKorb",
  },
  
  // ✅ AJOUT DE LA VÉRIFICATION GOOGLE SEARCH CONSOLE
  verification: {
    google: "mYpnXsmHzgD9s0WWb6ULIYD4Wl8m0UPQZgTFOs-R9aw",
  },

  // ✅ NOUVEAU : Auto-découverte des flux pour les agrégateurs (Google, Phoenix, lecteurs RSS)
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'}/rss.xml`,
      'application/atom+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prokorb.com'}/atom.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        {/* ✅ META TAGS PWA - SUPPRIMENT LA BARRE CHROME */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ProKorb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4f46e5" />
        
        {/* Liens vers les ressources PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        {/* Polices */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body className="antialiased font-sans flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <LanguageProvider>
          <main className="flex-grow">
            {children}
          </main>
          
          <ConditionalFooter />
          <Chatbot /> 
        </LanguageProvider>
        
        {/* ✅ ENREGISTREMENT DU SERVICE WORKER */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('✅ Service Worker enregistré:', registration)
                    })
                    .catch(error => {
                      console.error('❌ Erreur Service Worker:', error)
                    })
                })
              }
            `
          }}
        />
      </body>
    </html>
  )
}