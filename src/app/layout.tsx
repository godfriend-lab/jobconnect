import type { Metadata, Viewport } from "next"
import "./globals.css"
import Chatbot from "@/components/Chatbot"
import ConditionalFooter from "@/components/ConditionalFooter"
import { LanguageProvider } from "@/contexts/LanguageContext"

// ✅ CONFIGURATION VIEWPORT (Empêche le zoom et s'adapte à l'écran mobile)
export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

// ✅ CONFIGURATION METADATA (Inclut le manifest et les icônes PWA)
export const metadata: Metadata = {
  title: "ProKorb - La Marketplace N°1 des Services au Togo",
  description: "Trouvez les meilleurs professionnels vérifiés du Togo. Plombiers, électriciens, maçons et plus encore.",
  keywords: ["services", "professionnels", "Togo", "Lomé", "marketplace", "ProKorb"],
  manifest: "/manifest.json", // <-- Lien vers le fichier manifest
  icons: {
    icon: '/favicon.png',
    apple: '/icon-192x192.png', // <-- Icône haute qualité pour l'écran d'accueil
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ProKorb",
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
        {/* ✅ META TAGS PWA CRUCIAUX (Supprime la barre du navigateur) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ProKorb" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Liens vers les ressources */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        {/* Polices (ton code existant) */}
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
        
        {/* ✅ ENREGISTREMENT DU SERVICE WORKER (Fonctionnement hors-ligne et PWA) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('Service Worker enregistré avec succès:', registration)
                    })
                    .catch(error => {
                      console.log('Échec de l\'enregistrement du Service Worker:', error)
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