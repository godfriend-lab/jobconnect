// @ts-nocheck
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Building2, 
  Shield, 
  Briefcase, 
  User, 
  HelpCircle, 
  Globe, 
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Lock
} from 'lucide-react'

// Icônes SVG inline pour les réseaux sociaux (UNIQUEMENT FB, IG, X)
const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function Footer() {
  const pathname = usePathname()
  const { lang, setLang, t } = useLanguage()

  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: t('footer.company') || 'Entreprise',
      icon: Building2,
      links: [
        { label: t('footer.about') || 'À propos', href: "/about" },
        { label: t('footer.company_page') || 'Notre Entreprise', href: "/company" },
        { label: t('footer.careers') || 'Carrières', href: "/careers" },
        { label: t('footer.contact') || 'Contact', href: "/contact" },
        { label: t('footer.press') || 'Presse', href: "/press" },
        { label: t('footer.partner') || 'Devenir Partenaire', href: "/partners" },
      ]
    },
    {
      title: t('footer.legal') || 'Légal',
      icon: Shield,
      links: [
        { label: t('footer.privacy') || 'Confidentialité', href: "/privacy" },
        { label: t('footer.terms') || 'Conditions', href: "/terms" },
        { label: t('footer.legal_notice') || 'Mentions légales', href: "/legal" },
        { label: t('footer.cookies') || 'Cookies', href: "/cookies" },
        { label: t('footer.refund') || 'Remboursement', href: "/refund" },
      ]
    },
    {
      title: t('footer.security') || 'Sécurité',
      icon: Shield,
      links: [
        { label: t('footer.security_center') || 'Centre de sécurité', href: "/security" },
        { label: t('footer.report') || 'Signaler', href: "/report" },
        { label: t('footer.verification') || 'Vérification', href: "/verification" },
        { label: t('footer.data_protection') || 'Protection des données', href: "/data-protection" },
      ]
    },
    {
      title: t('footer.pros') || 'Professionnels',
      icon: Briefcase,
      links: [
        { label: t('footer.pricing') || 'Tarifs', href: "/pricing" },
        { label: t('footer.how_it_works_pro') || 'Comment ça marche (Pro)', href: "/pro/how-it-works" },
        { label: t('footer.resources') || 'Ressources', href: "/pro/resources" },
      ]
    },
    {
      title: t('footer.clients') || 'Clients',
      icon: User,
      links: [
        { label: t('footer.find_pro') || 'Trouver un pro', href: "/marketplace" },
        { label: t('footer.how_it_works_client') || 'Comment ça marche (Client)', href: "/client/how-it-works" },
        { label: t('footer.categories') || 'Catégories', href: "/categories" },
        { label: t('footer.client_protection') || 'Protection client', href: "/client-protection" },
      ]
    },
    {
      title: t('footer.help') || 'Aide',
      icon: HelpCircle,
      links: [
        { label: t('footer.faq') || 'FAQ', href: "/faq" },
        { label: t('footer.contact_us') || 'Nous contacter', href: "/contact" },
      ]
    },
  ]

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: FacebookIcon, 
      href: "https://www.facebook.com/profile.php?id=61593667670576", 
      color: "hover:text-blue-500" 
    },
    { 
      name: "Instagram", 
      icon: InstagramIcon, 
      href: "https://www.instagram.com/ProKorbafrica/", 
      color: "hover:text-pink-500" 
    },
    { 
      name: "X (Twitter)", 
      icon: TwitterIcon, 
      href: "https://x.com/ProKorbAfric", 
      color: "hover:text-white" 
    },
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ✅ LOGO ET NEWSLETTER MIS À JOUR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 pb-8 border-b border-slate-800">
          <div className="lg:col-span-4">
            {/* REMPLACEMENT DU "PK" PAR TON VRAI LOGO */}
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <img 
                src="/logo.png" 
                alt="Logo ProKorb" 
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-black text-2xl text-white hidden sm:block">
                PRO<span className="text-indigo-400">KORB</span>
              </span>
            </Link>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('footer.tagline') || "La marketplace N°1 au Togo pour connecter les professionnels qualifiés avec des clients exigeants."}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href="mailto:contact@prokorb.tg" className="hover:text-white transition-colors">
                  contact@prokorb.tg
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+228 70 88 86 99 / 79 94 07 93</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Lomé, Togo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.stay_informed') || 'Restez informé'}</h3>
            <p className="text-slate-400 text-sm mb-4">
              {t('footer.newsletter_desc') || 'Recevez nos actualités et offres exclusives directement dans votre boîte mail.'}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.email_placeholder') || 'Votre adresse email'}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {t('footer.subscribe') || 'S\'abonner'}
              </button>
            </form>
          </div>
        </div>

        {/* Grille des liens */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {footerSections.map((section, index) => {
            const Icon = section.icon
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold mb-3">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Réseaux sociaux et langue */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">{t('footer.follow_us') || 'Suivez-nous'}</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sélecteur de langue */}
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <Globe className="w-4 h-4 text-indigo-400" />
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value as 'fr' | 'en')}
                  className="bg-slate-900 text-sm text-white font-medium focus:outline-none cursor-pointer rounded"
                  style={{ backgroundColor: '#1e293b' }}
                >
                  <option value="fr" style={{ backgroundColor: '#1e293b', color: 'white' }}>🇫🇷 Français</option>
                  <option value="en" style={{ backgroundColor: '#1e293b', color: 'white' }}>🇬🇧 English</option>
                </select>
              </div>
              
              {/* Sélecteur de pays */}
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                <span className="text-lg">🇹🇬</span>
                <select 
                  className="bg-slate-900 text-sm text-white font-medium focus:outline-none cursor-pointer rounded"
                  style={{ backgroundColor: '#1e293b' }}
                >
                  <option value="tg" style={{ backgroundColor: '#1e293b', color: 'white' }}>Togo</option>
                  <option value="bj" style={{ backgroundColor: '#1e293b', color: 'white' }}>Bénin</option>
                  <option value="ci" style={{ backgroundColor: '#1e293b', color: 'white' }}>Côte d'Ivoire</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {currentYear} ProKorb . {t('footer.rights_reserved') || 'Tous droits réservés.'}</p>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>{t('footer.data_protected') || 'Vos données sont protégées et sécurisées.'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}