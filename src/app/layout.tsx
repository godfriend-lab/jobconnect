import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "JOBCONNECT - La Marketplace N°1 des Services au Togo",
  description: "Trouvez les meilleurs professionnels vérifiés du Togo. Plombiers, électriciens, maçons et plus encore.",
  keywords: ["services", "professionnels", "Togo", "Lomé", "marketplace"],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}