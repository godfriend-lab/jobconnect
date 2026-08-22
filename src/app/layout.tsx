import type { Metadata, Viewport } from "next"
import "./globals.css"
import Chatbot from "@/components/Chatbot"
import ConditionalFooter from "@/components/ConditionalFooter"
import { LanguageProvider } from "@/contexts/LanguageContext"

export const viewport: Viewport = {
  themeColor: "#4f46e5", // Couleur Indigo de ProKorb
}

export const metadata: Metadata = {
  title: "ProKorb - La Marketplace N°1 des Services au Togo",
  description: "Trouvez les meilleurs professionnels vérifiés du Togo. Plombiers, électriciens, maçons et plus encore.",
  keywords: ["services", "professionnels", "Togo", "Lomé", "marketplace", "ProKorb"],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
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
        {/* ✅ BALISE DIRECTE : C'est ce qui force l'affichage sur tous les navigateurs */}
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
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
        
      </body>
    </html>
  )
}