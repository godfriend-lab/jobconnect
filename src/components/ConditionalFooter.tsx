// @ts-nocheck
'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Afficher le footer UNIQUEMENT sur la landing page (racine)
  if (pathname === '/') {
    return <Footer />
  }
  
  // Ne rien afficher sur toutes les autres pages
  return null
}