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

// Icônes SVG inline pour les réseaux sociaux
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

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const YoutubeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
      title: t('footer.company'),
      icon: Building2,
      links: [
        { label: t('footer.about'), href: "/about" },
        { label: t('footer.company_page'), href: "/company" },
        { label: t('footer.careers'), href: "/careers" },
        { label: t('footer.contact'), href: "/contact" },
        { label: t('footer.press'), href: "/press" },
        { label: t('footer.partner'), href: "/partners" },
      ]
    },
    {
      title: t('footer.legal'),
      icon: Shield,
      links: [
        { label: t('footer.privacy'), href: "/privacy" },
        { label: t('footer.terms'), href: "/terms" },
        { label: t('footer.legal_notice'), href: "/legal" },
        { label: t('footer.cookies'), href: "/cookies" },
        { label: t('footer.refund'), href: "/refund" },
      ]
    },
    {
      title: t('footer.security'),
      icon: Shield,
      links: [
        { label: t('footer.security_center'), href: "/security" },
        { label: t('footer.report'), href: "/report" },
        { label: t('footer.verification'), href: "/verification" },
        { label: t('footer.data_protection'), href: "/data-protection" },
      ]
    },
    {
      title: t('footer.pros'),
      icon: Briefcase,
      links: [
        { label: t('footer.pricing'), href: "/pricing" },
        { label: t('footer.how_it_works_pro'), href: "/pro/how-it-works" },
        { label: t('footer.resources'), href: "/pro/resources" },
      ]
    },
    {
      title: t('footer.clients'),
      icon: User,
      links: [
        { label: t('footer.find_pro'), href: "/marketplace" },
        { label: t('footer.how_it_works_client'), href: "/client/how-it-works" },
        { label: t('footer.categories'), href: "/categories" },
        { label: t('footer.client_protection'), href: "/client-protection" },
      ]
    },
    {
      title: t('footer.help'),
      icon: HelpCircle,
      links: [
        { label: t('footer.faq'), href: "/faq" },
        { label: t('footer.contact_us'), href: "/contact" },
      ]
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "#", color: "hover:text-blue-600" },
    { name: "LinkedIn", icon: LinkedinIcon, href: "#", color: "hover:text-blue-700" },
    { name: "Instagram", icon: InstagramIcon, href: "#", color: "hover:text-pink-600" },
    { name: "X (Twitter)", icon: TwitterIcon, href: "#", color: "hover:text-slate-900" },
    { name: "YouTube", icon: YoutubeIcon, href: "#", color: "hover:text-red-600" },
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo et Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 pb-8 border-b border-slate-800">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">JC</span>
              </div>
              <span className="font-black text-2xl text-white">
                JOB<span className="text-indigo-400">CONNECT</span>
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-indigo-400" />
                <a href="mailto:contact@jobconnect.tg" className="hover:text-white transition-colors">
                  contact@jobconnect.tg
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+228 70 88 86 99 / 79 94 07 93</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Lomé, Togo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.stay_informed')}</h3>
            <p className="text-slate-400 text-sm mb-4">
              {t('footer.newsletter_desc')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
              />
              <button 
                type="submit"
                className="w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {t('footer.subscribe')}
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
              <h3 className="text-white font-semibold mb-3">{t('footer.follow_us')}</h3>
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
              {/* ✅ SÉLECTEUR DE LANGUE CORRIGÉ */}
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
              
              {/* ✅ SÉLECTEUR DE PAYS CORRIGÉ */}
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
            <p>© {currentYear} JobConnect Togo. {t('footer.rights_reserved')}</p>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>{t('footer.data_protected')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}