// @ts-nocheck
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

// Traductions
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Footer
    'footer.tagline': 'La plateforme de référence au Afrika pour connecter les professionnels qualifiés avec les clients.',
    'footer.stay_informed': 'Restez informé',
    'footer.newsletter_desc': 'Inscrivez-vous à notre newsletter pour recevoir les dernières actualités.',
    'footer.email_placeholder': 'Votre adresse email',
    'footer.subscribe': "S'inscrire",
    'footer.follow_us': 'Suivez-nous',
    'footer.data_protected': 'Données protégées',
    'footer.rights_reserved': 'Tous droits réservés.',
    
    // Sections footer
    'footer.company': 'Entreprise',
    'footer.legal': 'Informations légales',
    'footer.security': 'Sécurité & Confiance',
    'footer.pros': 'Pour les professionnels',
    'footer.clients': 'Pour les clients',
    'footer.help': 'Assistance',
    
    // Company links
    'footer.about': 'À propos',
    'footer.company_page': 'Notre entreprise',
    'footer.careers': 'Carrières',
    'footer.contact': 'Contact',
    'footer.press': 'Presse & Média',
    'footer.partner': 'Devenir partenaire',
    
    // Legal links
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': "Conditions d'utilisation",
    'footer.legal_notice': 'Mentions légales',
    'footer.cookies': 'Politique cookies',
    'footer.refund': 'Remboursement',
    
    // Security links
    'footer.security_center': 'Centre de sécurité',
    'footer.report': 'Signaler un problème',
    'footer.verification': 'Vérification pros',
    'footer.data_protection': 'Protection données',
    
    // Pros links
    'footer.pricing': 'Tarifs',
    'footer.how_it_works_pro': 'Comment ça marche ?',
    'footer.resources': 'Ressources',
    
    // Clients links
    'footer.find_pro': 'Trouver un pro',
    'footer.how_it_works_client': 'Comment ça marche ?',
    'footer.categories': 'Catégories',
    'footer.client_protection': 'Protection clients',
    
    // Help links
    'footer.faq': 'FAQ',
    'footer.contact_us': 'Contactez-nous',
  },
  en: {
    // Footer
    'footer.tagline': 'The leading platform in Afrika connecting qualified professionals with clients.',
    'footer.stay_informed': 'Stay informed',
    'footer.newsletter_desc': 'Subscribe to our newsletter to receive the latest news.',
    'footer.email_placeholder': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.follow_us': 'Follow us',
    'footer.data_protected': 'Data protected',
    'footer.rights_reserved': 'All rights reserved.',
    
    // Sections footer
    'footer.company': 'Company',
    'footer.legal': 'Legal Information',
    'footer.security': 'Security & Trust',
    'footer.pros': 'For Professionals',
    'footer.clients': 'For Clients',
    'footer.help': 'Support',
    
    // Company links
    'footer.about': 'About',
    'footer.company_page': 'Our Company',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.press': 'Press & Media',
    'footer.partner': 'Become a Partner',
    
    // Legal links
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.legal_notice': 'Legal Notice',
    'footer.cookies': 'Cookie Policy',
    'footer.refund': 'Refund Policy',
    
    // Security links
    'footer.security_center': 'Security Center',
    'footer.report': 'Report an Issue',
    'footer.verification': 'Pro Verification',
    'footer.data_protection': 'Data Protection',
    
    // Pros links
    'footer.pricing': 'Pricing',
    'footer.how_it_works_pro': 'How it works?',
    'footer.resources': 'Resources',
    
    // Clients links
    'footer.find_pro': 'Find a Pro',
    'footer.how_it_works_client': 'How it works?',
    'footer.categories': 'Categories',
    'footer.client_protection': 'Client Protection',
    
    // Help links
    'footer.faq': 'FAQ',
    'footer.contact_us': 'Contact Us',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr')

  useEffect(() => {
    // Charger la langue depuis localStorage au démarrage
    const saved = localStorage.getItem('ProKorb_lang') as Language
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('ProKorb_lang', newLang)
    // Recharger la page pour appliquer la traduction partout
    window.location.reload()
  }

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['fr'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}