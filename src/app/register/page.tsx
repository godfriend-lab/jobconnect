// @ts-nocheck
'use client'

/*
  ─────────────────────────────────────────────────────────────
  SQL À EXÉCUTER UNE FOIS DANS SUPABASE (SQL Editor)
  Nouvelles colonnes utilisées par l'inscription "Entreprise" :

  alter table profiles
    add column if not exists company_name text,
    add column if not exists legal_form text,
    add column if not exists sector text,
    add column if not exists rccm text,
    add column if not exists if_number text,
    add column if not exists company_size text,
    add column if not exists founded_year int,
    add column if not exists address text,
    add column if not exists website text,
    add column if not exists manager_role text,
    add column if not exists description text,
    add column if not exists verification_status text default 'none',
    add column if not exists accepted_terms_at timestamptz;
  ─────────────────────────────────────────────────────────────
*/

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Briefcase, User, Loader2,
  AlertCircle, CheckCircle2, MapPin, Phone, UserCircle, Check, Building2,
  FileText, ShieldCheck, Sparkles, Zap, BadgeCheck, Globe, Users, Star,
  Calendar, Hash, Search, Wallet, Clock, Layers, Landmark, Award, TrendingUp
} from 'lucide-react'

/* ═══════════════════════ DONNÉES ═══════════════════════ */

const allCities = [
  // Grand Lomé
  'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Agoè-Assiyéyé', 'Agoè-Cacavéli', 'Bè', 'Bè-Kpota', 'Bè-Klikamé', 'Tokoin',
  'Tokoin-Hôpital', 'Tokoin-Aviation', 'Tokoin-Lycée', 'Akodésséwa', 'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué',
  'Aflao-Gakli', 'Aflao-Sagbado', 'Avédji', 'Totsi', 'Hédzranawoé', 'Baguida', 'Adétikopé', 'Noépé', 'Kodjoviakopé',
  'Hanoukopé', 'Amadahomé', 'Ablogamé', 'Wonyomé', 'Katanga', 'Dékon', 'Gbadago', 'Kpogan', 'Légbassito', 'Sanguéra',
  'Vakpossito', 'Gbossimé', 'Cacavéli', 'Aguiarkomé', 'Adakpamé', 'Akato', 'Amoutivé', 'Kanyikopé', 'Zanguéra',
  // Région Maritime
  'Tsévié', 'Kévé', 'Tabligbo', 'Aného', 'Glidji', 'Agbodrafo', 'Togoville', 'Séko', 'Kpémé', 'Vogan', 'Akoumapé',
  'Vakpo', 'Hahotoé', 'Gbodjomé', 'Aklakou', 'Tohoun', 'Ahépé', 'Davié', 'Assahoun', 'Badja', 'Mission-Tové', 'Dalavé',
  'Gbatopé', 'Kpomé', 'Lilikopé', 'Kovié', 'Bolou', 'Zio', 'Haho',
  // Région des Plateaux
  'Kpalimé', 'Agou-Gadzépé', 'Agou-Nyogbo', 'Kougnohou', 'Womé', 'Kpimé', 'Yikpa', 'Kuma-Apéyémé', 'Danyi-Apéyémé',
  'Danyi-Elavagnon', 'Atakpamé', 'Gléi', 'Kpessi', 'Anié', 'Elavagnon', 'Amou-Oblo', 'Amlamé', 'Badou', 'Kamina',
  'Notsè', 'Wahala', 'Tado', 'Agbandi', 'Kpélé-Adéta', 'Akparé', 'Adogbénou',
  // Région Centrale
  'Sokodé', 'Tchamba', 'Koussountou', 'Alibi', 'Kaboli', 'Bago', 'Tchalo', 'Sotouboua', 'Fazao', 'Blitta', 'Pagala',
  'Langabou', 'Yégué', 'Komah', 'Kpangalam', 'Kparatao', 'Kolina', 'Bafilo', 'Alédjo',
  // Région de la Kara
  'Kara', 'Lama-Kara', 'Bassar', 'Kabou', 'Bangéli', 'Dimori', 'Guérin-Kouka', 'Niamtougou', 'Défalé', 'Pagouda',
  'Pya', 'Landa', 'Kétao', 'Kouméa', 'Kéran', 'Kandé', 'Namon', 'Koka', 'Sarakawa', 'Farendè', 'Binah', 'Assoli',
  'Aouda', 'Kouka', 'Katchamba',
  // Région des Savanes
  'Dapaong', 'Mango', 'Gando', 'Mandouri', 'Cinkassé', 'Korbongou', 'Pana', 'Timbou', 'Tandjouaré', 'Nano',
  'Bombouaka', 'Borgou', 'Ogaro', 'Barkoissi', 'Ponio', 'Tami', 'Warengo', 'Nadoba', 'Koutammakou', 'Takpamba'
]

const commonSpecialties = [
  'Plombier', 'Électricien', 'Maçon', 'Menuisier', 'Peintre en bâtiment', 'Mécanicien auto', 'Climaticien',
  'Soudeur', 'Couvreur', 'Carreleur', 'Jardinier', 'Femme de ménage', 'Couturier(ère)', 'Coiffeur(se)',
  'Développeur web', 'Graphiste', 'Photographe', 'Comptable', 'Avocat', 'Médecin', 'Infirmier(ère)',
  'Chauffeur', 'Déménageur', 'Traiteur', 'Professeur particulier', 'Technicien informatique'
]

const legalForms = ['SARL', 'SARL-U', 'SA', 'SAS', 'SNC', 'Entreprise individuelle', 'Groupement / Coopérative', 'Association / ONG', 'Autre']

const sectors = [
  'BTP & construction', 'Électricité & énergie', 'Plomberie & sanitaire', 'Nettoyage & entretien',
  'Informatique & numérique', 'Transport & logistique', 'Services à domicile', 'Beauté & bien-être',
  'Restauration & traiteur', 'Mode & couture', 'Éducation & formation', 'Santé', 'Commerce & distribution',
  'Agriculture & agro-industrie', 'Immobilier', 'Événementiel & communication', 'Autre secteur'
]

const companySizes = ['1 – 5', '6 – 20', '21 – 50', '51 – 200', '200+']

const managerRoles = ['Gérant(e)', 'Directeur(trice) général(e)', 'Président(e)', 'Responsable commercial', 'Responsable RH', 'Autre']

/* ═══════════════════════ THÈME PAR RÔLE ═══════════════════════ */

const ROLES = {
  client: {
    label: 'Client',
    short: 'Je cherche un professionnel',
    icon: User,
    text: 'text-blue-600', softBg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-500', ring: 'focus:ring-blue-500', ringSoft: 'ring-blue-100',
    gradient: 'from-blue-500 to-cyan-500', btn: 'from-blue-600 to-cyan-600', glow: 'bg-blue-500/30',
    headline: 'Trouvez le bon pro en quelques minutes.',
    sub: 'Comparez les profils vérifiés, demandez un devis et réservez sans quitter ProKorb.',
    perks: [
      [Search, 'Recherche instantanée par métier et par quartier'],
      [ShieldCheck, 'Professionnels vérifiés et avis authentiques'],
      [Wallet, 'Devis gratuits, sans engagement'],
    ],
  },
  pro: {
    label: 'Professionnel',
    short: 'Je propose mes services',
    icon: Briefcase,
    text: 'text-purple-600', softBg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700',
    border: 'border-purple-500', ring: 'focus:ring-purple-500', ringSoft: 'ring-purple-100',
    gradient: 'from-purple-500 to-fuchsia-500', btn: 'from-purple-600 to-fuchsia-600', glow: 'bg-purple-500/30',
    headline: 'Transformez votre savoir-faire en clients.',
    sub: 'Un profil professionnel, des demandes qualifiées et un agenda qui se remplit.',
    perks: [
      [TrendingUp, 'Des demandes de clients proches de chez vous'],
      [BadgeCheck, 'Badge « Vérifié » pour gagner leur confiance'],
      [Calendar, 'Agenda et disponibilités gérés en un clic'],
    ],
  },
  company: {
    label: 'Entreprise',
    short: 'Je représente une société',
    icon: Building2,
    text: 'text-emerald-600', softBg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-500', ring: 'focus:ring-emerald-500', ringSoft: 'ring-emerald-100',
    gradient: 'from-emerald-500 to-teal-500', btn: 'from-emerald-600 to-teal-600', glow: 'bg-emerald-500/30',
    headline: 'Passez à l\'échelle avec votre entreprise.',
    sub: 'Page entreprise certifiée, appels d\'offres, équipes et facturation professionnelle.',
    perks: [
      [Landmark, 'Vérification RCCM & IF pour un profil certifié'],
      [Users, 'Gestion d\'équipe et de plusieurs interlocuteurs'],
      [Layers, 'Accès aux marchés et demandes à gros volume'],
    ],
  },
}

/* ═══════════════════════ HELPERS ═══════════════════════ */

const getDashboardRoute = (r) => (r === 'pro' ? '/dashboard/pro' : r === 'company' ? '/dashboard/company' : '/dashboard/client')

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

// Accepte : 90000000 · 90 00 00 00 · +228 90 00 00 00 · 00228...
const normalizeTogoPhone = (v) => {
  let d = v.replace(/[\s.\-()]/g, '')
  d = d.replace(/^(\+|00)228/, '')
  return /^\d{8}$/.test(d) ? `+228${d}` : null
}

// RCCM togolais type : TG-LFW-01-2020-B12-00001 (format souple : lettres + chiffres, 8 à 30 caractères)
const isRccm = (v) => {
  const s = v.trim()
  return s.length >= 8 && s.length <= 30 && /[A-Za-z]/.test(s) && /\d/.test(s) && /^[A-Za-z0-9\s\-\/.]+$/.test(s)
}

// Numéro IF / NIF : 7 à 15 caractères alphanumériques
const isIfNumber = (v) => /^[A-Za-z0-9]{7,15}$/.test(v.replace(/[\s\-]/g, ''))

const isUrl = (v) => !v.trim() || /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v.trim())

const passwordChecks = (p) => ({
  length: p.length >= 8,
  upper: /[A-Z]/.test(p),
  digit: /[0-9]/.test(p),
  special: /[^A-Za-z0-9]/.test(p),
})
const isPasswordSecure = (p) => { const c = passwordChecks(p); return c.length && c.upper && c.digit }

const currentYear = new Date().getFullYear()

/* ═══════════════════════ SOUS-COMPOSANTS ═══════════════════════ */

function Field({ label, icon: Icon, error, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none" />}
        {children}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
}

function Autocomplete({ value, onChange, options, placeholder, icon: Icon, theme, label, required, emptyHint }) {
  const [open, setOpen] = useState(false)
  const filtered = options.filter((o) => o.toLowerCase().includes(value.toLowerCase())).slice(0, 8)
  return (
    <div className="relative">
      <Field label={label} icon={Icon}>
        <input
          type="text" value={value} required={required} autoComplete="off" placeholder={placeholder}
          onChange={(e) => { onChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className={`w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all bg-white text-slate-900 placeholder:text-slate-400`}
        />
      </Field>
      {open && value.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            {filtered.map((o) => (
              <button key={o} type="button" onClick={() => { onChange(o); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 hover:${theme.softBg} text-slate-700 text-sm transition-colors flex items-center gap-2`}>
                {Icon && <Icon className={`w-4 h-4 ${theme.text} flex-shrink-0`} />}{o}
              </button>
            ))}
            <div className="px-4 py-2.5 text-xs text-slate-400 border-t border-slate-100">{emptyHint}</div>
          </div>
        </>
      )}
    </div>
  )
}

function Chips({ options, value, onChange, theme }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
            value === o ? `${theme.border} ${theme.softBg} ${theme.text} ring-4 ${theme.ringSoft}` : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
          }`}>
          {o}
        </button>
      ))}
    </div>
  )
}

function PasswordMeter({ password }) {
  const c = passwordChecks(password)
  const score = Object.values(c).filter(Boolean).length
  const colors = ['bg-slate-200', 'bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-emerald-600']
  const labels = ['', 'Trop faible', 'Moyen', 'Solide', 'Excellent']
  const rules = [[c.length, '8 caractères minimum'], [c.upper, '1 majuscule'], [c.digit, '1 chiffre'], [c.special, '1 symbole (recommandé)']]
  return (
    <div className="mt-3">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${score >= i ? colors[score] : 'bg-slate-200'}`} />)}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-semibold text-slate-600">{labels[score]}</span>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
        {rules.map(([ok, txt]) => (
          <li key={txt} className={`text-xs flex items-center gap-1.5 ${ok ? 'text-green-600' : 'text-slate-400'}`}>
            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${ok ? 'bg-green-100' : 'bg-slate-100'}`}>{ok && <Check className="w-2.5 h-2.5" />}</span>{txt}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Aperçu en direct : montre exactement comment le compte apparaîtra sur ProKorb */
function LivePreview({ role, data }) {
  const t = ROLES[role]
  const Icon = t.icon
  const isCompany = role === 'company'
  const name = (isCompany ? data.companyName : data.fullName).trim() || (isCompany ? 'Nom de votre entreprise' : role === 'pro' ? 'Votre nom' : 'Votre nom')
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?'
  const subtitle = isCompany ? [data.legalForm, data.sector].filter(Boolean).join(' · ') || 'Forme juridique · Secteur'
    : role === 'pro' ? data.specialty || 'Votre spécialité' : 'Membre ProKorb'
  const city = data.city || 'Votre ville'

  return (
    <div className="rounded-2xl bg-white/[0.06] backdrop-blur border border-white/10 p-5 shadow-2xl">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>{initials}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-white truncate">{name}</p>
            {role !== 'client' && <BadgeCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />}
          </div>
          <p className="text-sm text-slate-300 truncate">{subtitle}</p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{city}</p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-slate-200 flex items-center gap-1 flex-shrink-0"><Icon className="w-3 h-3" />{t.label}</span>
      </div>

      {role === 'client' && (
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[['0', 'Demandes'], ['0', 'Devis reçus'], ['0', 'Favoris']].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-white/5 py-2.5"><p className="text-white font-bold">{n}</p><p className="text-[11px] text-slate-400">{l}</p></div>
          ))}
        </div>
      )}

      {role === 'pro' && (
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" />Disponible</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />Nouveau profil</span>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-slate-300">Demande reçue · {data.specialty || 'votre métier'}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200">Nouvelle</span>
          </div>
        </div>
      )}

      {role === 'company' && (
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white/5 py-2.5"><p className="text-white font-bold text-sm">{data.companySize || '—'}</p><p className="text-[11px] text-slate-400">Employés</p></div>
            <div className="rounded-xl bg-white/5 py-2.5"><p className="text-white font-bold text-sm">{data.foundedYear || '—'}</p><p className="text-[11px] text-slate-400">Création</p></div>
            <div className="rounded-xl bg-white/5 py-2.5"><p className="text-white font-bold text-sm">{data.legalForm || '—'}</p><p className="text-[11px] text-slate-400">Statut</p></div>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs"><span className="text-slate-400">RCCM</span><span className="text-slate-200 font-mono truncate ml-3">{data.rccm || '—'}</span></div>
            <div className="flex items-center justify-between text-xs"><span className="text-slate-400">N° IF</span><span className="text-slate-200 font-mono truncate ml-3">{data.ifNumber || '—'}</span></div>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-400/10 rounded-xl px-3 py-2">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />Vérification des documents sous 24 à 48 h
          </div>
        </div>
      )}
    </div>
  )
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <img src="/logo.png" alt="Logo ProKorb" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
      <span className="text-2xl font-black tracking-tight">
        <span className="text-indigo-600">PRO</span><span className="text-slate-900">KORB</span>
      </span>
    </Link>
  )
}

/* ═══════════════════════ PAGE ═══════════════════════ */

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '', managerRole: '', email: '', phone: '', city: '', specialty: '',
    companyName: '', legalForm: '', sector: '', rccm: '', ifNumber: '', companySize: '',
    foundedYear: '', address: '', website: '', description: '',
    password: '', confirmPassword: ''
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }))
  const theme = ROLES[role || 'client']

  // Étapes dynamiques selon le profil
  const stepKeys = role === 'company' ? ['role', 'company', 'contact', 'security'] : ['role', 'info', 'security']
  const stepLabels = { role: 'Profil', info: 'Informations', company: 'Entreprise', contact: 'Responsable', security: 'Sécurité' }
  const totalSteps = stepKeys.length
  const stepKey = stepKeys[Math.min(step, totalSteps) - 1]

  /* ─── Validation ─── */
  const yearNum = parseInt(formData.foundedYear, 10)
  const errors = {
    email: formData.email && !isEmail(formData.email) ? 'Adresse email invalide.' : '',
    phone: formData.phone && !normalizeTogoPhone(formData.phone) ? 'Numéro togolais à 8 chiffres attendu (ex : 90 00 00 00).' : '',
    rccm: formData.rccm && !isRccm(formData.rccm) ? 'Format invalide. Ex : TG-LFW-01-2020-B12-00001' : '',
    ifNumber: formData.ifNumber && !isIfNumber(formData.ifNumber) ? '7 à 15 caractères, lettres et chiffres uniquement.' : '',
    foundedYear: formData.foundedYear && !(yearNum >= 1960 && yearNum <= currentYear) ? `Année entre 1960 et ${currentYear}.` : '',
    website: !isUrl(formData.website) ? 'Adresse du site invalide.' : '',
    confirm: formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Les mots de passe ne correspondent pas.' : '',
  }

  const valid = {
    role: role !== null,
    info: !!(formData.fullName.trim() && isEmail(formData.email) && normalizeTogoPhone(formData.phone) && formData.city.trim() &&
      (role !== 'pro' || formData.specialty.trim())),
    company: !!(formData.companyName.trim() && formData.legalForm && formData.sector && isRccm(formData.rccm) &&
      isIfNumber(formData.ifNumber) && formData.companySize && yearNum >= 1960 && yearNum <= currentYear &&
      formData.description.trim().length >= 20 && isUrl(formData.website)),
    contact: !!(formData.fullName.trim() && formData.managerRole && isEmail(formData.email) &&
      normalizeTogoPhone(formData.phone) && formData.city.trim() && formData.address.trim()),
    security: isPasswordSecure(formData.password) && formData.password === formData.confirmPassword && acceptTerms,
  }

  const goNext = () => { if (valid[stepKey]) { setStep((s) => s + 1); setError('') } }
  const goBack = () => { setStep((s) => Math.max(1, s - 1)); setError('') }

  const chooseRole = (r) => {
    setRole(r); setError('')
    if (step > 1) setStep(1)
  }

  /* ─── Inscription ─── */
  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!valid.security) { setError('Vérifiez votre mot de passe et acceptez les conditions.'); return }
    if (!role) { setError('Veuillez sélectionner un profil.'); return }

    setLoading(true)
    try {
      const isCompany = role === 'company'
      const cleanEmail = formData.email.trim().toLowerCase()
      const cleanPhone = normalizeTogoPhone(formData.phone)
      const cleanName = formData.fullName.trim()
      const cleanCompany = isCompany ? formData.companyName.trim() : null

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: formData.password,
        options: { data: { full_name: cleanName, company_name: cleanCompany, role } }
      })

      if (authError) {
        setError(authError.message.includes('already registered')
          ? 'Un compte avec cet email existe déjà. Veuillez vous connecter.'
          : authError.message)
        return
      }
      if (!authData.user) { setError('Erreur lors de la création du compte. Veuillez réessayer.'); return }

      const profile = {
        id: authData.user.id,
        full_name: cleanName,
        email: cleanEmail,
        role,
        phone: cleanPhone,
        city: formData.city.trim(),
        specialty: role === 'pro' ? formData.specialty.trim() : null,
        is_active: true,
        is_verified: false,
        is_available: role === 'pro',
        accepted_terms_at: new Date().toISOString(),
        // Champs entreprise
        company_name: cleanCompany,
        legal_form: isCompany ? formData.legalForm : null,
        sector: isCompany ? formData.sector : null,
        rccm: isCompany ? formData.rccm.trim().toUpperCase() : null,
        if_number: isCompany ? formData.ifNumber.replace(/[\s\-]/g, '').toUpperCase() : null,
        company_size: isCompany ? formData.companySize : null,
        founded_year: isCompany ? yearNum : null,
        address: isCompany ? formData.address.trim() : null,
        website: isCompany && formData.website.trim() ? formData.website.trim() : null,
        manager_role: isCompany ? formData.managerRole : null,
        description: isCompany ? formData.description.trim() : null,
        verification_status: isCompany ? 'pending' : 'none',
      }

      const { error: profileError } = await supabase.from('profiles').upsert(profile, { onConflict: 'id' })
      if (profileError) {
        console.warn('⚠️ Erreur création profil:', profileError)
        setError("Compte créé, mais l'enregistrement du profil a échoué. Contactez le support.")
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: formData.password })
      if (signInError) {
        console.warn('⚠️ Connexion automatique impossible:', signInError.message)
        setError('Compte créé, mais la connexion automatique a échoué. Veuillez vous connecter manuellement.')
        setIsRegistered(true)
        return
      }

      setIsRegistered(true)
      setRedirecting(true)
      setTimeout(() => { router.push(getDashboardRoute(role)); router.refresh() }, 1600)
    } catch (err) {
      console.error('❌ Erreur critique inscription:', err)
      setError('Une erreur inattendue est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  /* ═══════════ ÉCRAN DE SUCCÈS ═══════════ */
  if (isRegistered) {
    const t = ROLES[role]
    const isCompany = role === 'company'
    const nextSteps = isCompany
      ? ['Vos documents RCCM et IF sont en cours de vérification (24 à 48 h)', 'Complétez le profil public de votre entreprise', 'Invitez vos collaborateurs et publiez vos premiers services']
      : role === 'pro'
        ? ['Ajoutez une photo et une description de vos services', 'Précisez vos tarifs et vos zones d\'intervention', 'Recevez vos premières demandes de clients']
        : ['Décrivez le service dont vous avez besoin', 'Comparez les professionnels près de chez vous', 'Choisissez et réservez en toute confiance']
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="py-6 px-4"><div className="max-w-7xl mx-auto"><Logo /></div></header>
        <main className="flex-1 flex justify-center px-4 py-8 w-full">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${t.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Votre compte est prêt</h2>
            <p className="text-slate-600 mb-6 text-center">
              Bienvenue sur ProKorb, <strong className="text-slate-900">{formData.companyName || formData.fullName}</strong>
            </p>

            <div className={`rounded-2xl ${t.softBg} p-5 mb-6`}>
              <p className={`text-sm font-semibold ${t.text} mb-3`}>Vos prochaines étapes</p>
              <ul className="space-y-2.5">
                {nextSteps.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.text}`} />{s}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
              </div>
            )}

            {redirecting && (
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-5">
                <Loader2 className="w-4 h-4 animate-spin" />Ouverture de votre espace {t.label.toLowerCase()}…
              </div>
            )}

            <button onClick={() => router.push(getDashboardRoute(role))}
              className={`inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r ${t.btn} text-white font-bold rounded-xl hover:shadow-lg transition-all`}>
              Accéder à mon espace {t.label.toLowerCase()}<ArrowRight className="w-5 h-5" />
            </button>
            {!redirecting && (
              <p className="mt-5 text-center text-sm text-slate-500">
                Ou <Link href="/login" className="text-indigo-600 font-semibold hover:underline">connectez-vous manuellement</Link>
              </p>
            )}
          </div>
        </main>
      </div>
    )
  }

  /* ═══════════ FORMULAIRE ═══════════ */
  const inputCls = `w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all bg-white text-slate-900 placeholder:text-slate-400`
  const plainInputCls = `w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 ${theme.ring} focus:border-transparent transition-all bg-white text-slate-900 placeholder:text-slate-400`
  const primaryBtn = `w-full py-3.5 bg-gradient-to-r ${theme.btn} text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2`

  const RoleBadge = () => (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${theme.badge}`}>
      {(() => { const I = theme.icon; return <I className="w-3 h-3" /> })()}{theme.label}
    </div>
  )

  const StepHeader = ({ title, subtitle }) => (
    <>
      <div className="flex items-center justify-between mb-6">
        <button type="button" onClick={goBack} className="text-sm text-slate-500 hover:text-indigo-600 transition flex items-center gap-1"><ArrowLeft className="w-4 h-4" />Retour</button>
        <RoleBadge />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mb-6">{subtitle}</p>}
    </>
  )

  const ErrorBox = () => error ? (
    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
    </div>
  ) : null

  // Champs communs (réutilisés selon l'étape)
  const emailPhoneFields = (
    <>
      <Field label="Email professionnel *" icon={Mail} error={errors.email}>
        <input type="email" value={formData.email} onChange={(e) => set('email', e.target.value)} placeholder="contact@votre-entreprise.com" required className={inputCls} />
      </Field>
      <Field label="Téléphone *" icon={Phone} error={errors.phone} hint="Ce numéro peut être utilisé pour WhatsApp.">
        <input type="tel" value={formData.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+228 90 00 00 00" required className={inputCls} />
      </Field>
    </>
  )

  const cityField = (
    <Autocomplete label="Ville / Quartier *" icon={MapPin} theme={theme} required value={formData.city}
      onChange={(v) => set('city', v)} options={allCities} placeholder="Rechercher votre ville"
      emptyHint="💡 Votre ville n'est pas listée ? Tapez-la, elle sera enregistrée telle quelle." />
  )

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">

      {/* ═════ PANNEAU GAUCHE : vitrine produit (desktop) ═════ */}
      <aside className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white flex-col justify-between p-12 xl:p-16">
        <div className={`absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl transition-colors duration-700 ${role ? theme.glow : 'bg-indigo-500/30'}`} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

        <div className="relative">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <img src="/logo.png" alt="Logo ProKorb" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-black tracking-tight"><span className="text-indigo-400">PRO</span>KORB</span>
          </Link>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight mb-4">
            {role ? theme.headline : 'La plateforme qui connecte le MONDE aux MEILLEURS PROFESSIONNELS.'}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            {role ? theme.sub : 'Choisissez votre profil et voyez en direct comment votre compte prendra vie.'}
          </p>

          {role ? (
            <>
              <LivePreview role={role} data={formData} />
              <ul className="mt-8 space-y-3">
                {theme.perks.map(([Icon, txt]) => (
                  <li key={txt} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4" /></span>{txt}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="space-y-3">
              {Object.entries(ROLES).map(([k, r]) => {
                const I = r.icon
                return (
                  <div key={k} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 p-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center flex-shrink-0`}><I className="w-5 h-5 text-white" /></div>
                    <div><p className="font-semibold">{r.label}</p><p className="text-sm text-slate-400">{r.short}</p></div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="relative flex items-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" />Données chiffrées</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" />Inscription en 2 minutes</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-sky-400" />Partout dans le monde</span>
        </div>
      </aside>

      {/* ═════ PANNEAU DROIT : formulaire ═════ */}
      <div className="flex flex-col min-h-screen">
        <header className="py-5 px-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="lg:invisible"><Logo /></div>
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">Déjà un compte ? Se connecter</Link>
          </div>
        </header>

        <main className="flex-1 flex justify-center px-4 sm:px-8 pb-16">
          <div className="w-full max-w-xl">
            {/* Titre + progression */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1.5">Créer votre compte</h1>
              <p className="text-slate-600">Rejoignez ProKorb en {totalSteps} étapes.</p>
              <div className="flex items-center gap-2 mt-6">
                {stepKeys.map((k, i) => {
                  const n = i + 1
                  return (
                    <div key={k} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= n ? `bg-gradient-to-br ${theme.gradient} text-white` : 'bg-slate-200 text-slate-500'}`}>
                          {step > n ? <Check className="w-4 h-4" /> : n}
                        </div>
                        <span className={`text-xs font-semibold hidden sm:block ${step >= n ? 'text-slate-800' : 'text-slate-400'}`}>{stepLabels[k]}</span>
                      </div>
                      {n < totalSteps && <div className={`h-0.5 flex-1 rounded-full transition-all ${step > n ? `bg-gradient-to-r ${theme.gradient}` : 'bg-slate-200'}`} />}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ───────── ÉTAPE : CHOIX DU PROFIL ───────── */}
            {stepKey === 'role' && (
              <div className="space-y-5">
                <p className="text-sm font-semibold text-slate-700">Quel est votre profil ?</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['client', 'pro'].map((k) => {
                    const r = ROLES[k]; const I = r.icon; const active = role === k
                    return (
                      <button key={k} type="button" onClick={() => chooseRole(k)}
                        className={`group bg-white border-2 rounded-2xl p-6 text-left transition-all ${active ? `${r.border} shadow-xl ring-4 ${r.ringSoft}` : `border-slate-200 hover:${r.border} hover:shadow-lg`}`}>
                        <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${r.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}><I className="w-7 h-7 text-white" /></div>
                        <h3 className="font-bold text-slate-900 mb-1">{r.label}</h3>
                        <p className="text-sm text-slate-500">{r.short}</p>
                      </button>
                    )
                  })}
                </div>

                <button type="button" onClick={() => chooseRole('company')}
                  className={`group w-full bg-white border-2 rounded-2xl p-5 transition-all flex items-center gap-4 text-left ${role === 'company' ? `${ROLES.company.border} shadow-xl ring-4 ${ROLES.company.ringSoft}` : 'border-slate-200 hover:border-emerald-500 hover:shadow-lg'}`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><Building2 className="w-7 h-7 text-white" /></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">Entreprise / Société</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Je représente une entreprise (RCCM, IF, équipe…)</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 hidden sm:block">Compte certifié</span>
                </button>

                {/* Aperçu mobile (le panneau gauche est masqué) */}
                {role && (
                  <div className="lg:hidden rounded-2xl bg-slate-950 p-4">
                    <LivePreview role={role} data={formData} />
                  </div>
                )}

                <button type="button" onClick={goNext} disabled={!valid.role} className={primaryBtn}>Continuer <ArrowRight className="w-5 h-5" /></button>
              </div>
            )}

            {/* ───────── ÉTAPE : INFOS CLIENT / PRO ───────── */}
            {stepKey === 'info' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
                <StepHeader title="Vos informations" subtitle="Elles apparaîtront sur votre profil." />
                <form onSubmit={(e) => { e.preventDefault(); goNext() }} className="space-y-4">
                  <Field label="Nom complet *" icon={UserCircle}>
                    <input type="text" value={formData.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Jean Dupont" required className={inputCls} />
                  </Field>
                  <Field label="Email *" icon={Mail} error={errors.email}>
                    <input type="email" value={formData.email} onChange={(e) => set('email', e.target.value)} placeholder="votre@email.com" required className={inputCls} />
                  </Field>
                  <Field label="Téléphone *" icon={Phone} error={errors.phone}>
                    <input type="tel" value={formData.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+228 90 00 00 00" required className={inputCls} />
                  </Field>
                  {cityField}
                  {role === 'pro' && (
                    <Autocomplete label="Spécialité *" icon={Briefcase} theme={theme} required value={formData.specialty}
                      onChange={(v) => set('specialty', v)} options={commonSpecialties} placeholder="Ex : Plombier, Électricien…"
                      emptyHint="💡 Vous pouvez aussi taper votre spécialité manuellement." />
                  )}
                  <ErrorBox />
                  <button type="submit" disabled={!valid.info} className={primaryBtn}>Continuer <ArrowRight className="w-5 h-5" /></button>
                </form>
              </div>
            )}

            {/* ───────── ÉTAPE : ENTREPRISE (identité légale) ───────── */}
            {stepKey === 'company' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
                <StepHeader title="Votre entreprise" subtitle="Ces informations légales servent à certifier votre société et à rassurer vos futurs clients." />
                <form onSubmit={(e) => { e.preventDefault(); goNext() }} className="space-y-5">
                  <Field label="Raison sociale *" icon={Building2}>
                    <input type="text" value={formData.companyName} onChange={(e) => set('companyName', e.target.value)} placeholder="Ex : SARL Bâtiment Plus" required className={inputCls} />
                  </Field>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Forme juridique *</label>
                    <Chips options={legalForms} value={formData.legalForm} onChange={(v) => set('legalForm', v)} theme={theme} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Secteur d'activité *</label>
                    <select value={formData.sector} onChange={(e) => set('sector', e.target.value)} required className={plainInputCls}>
                      <option value="">Sélectionnez un secteur</option>
                      {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="N° RCCM *" icon={FileText} error={errors.rccm} hint="Registre du Commerce et du Crédit Mobilier.">
                      <input type="text" value={formData.rccm} onChange={(e) => set('rccm', e.target.value)} placeholder="TG-LFW-01-2020-B12-00001" required className={`${inputCls} font-mono text-sm`} />
                    </Field>
                    <Field label="N° IF (NIF) *" icon={Hash} error={errors.ifNumber} hint="Identifiant fiscal délivré par l'OTR.">
                      <input type="text" value={formData.ifNumber} onChange={(e) => set('ifNumber', e.target.value)} placeholder="1000123456" required className={`${inputCls} font-mono text-sm`} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Année de création *" icon={Calendar} error={errors.foundedYear}>
                      <input type="number" inputMode="numeric" value={formData.foundedYear} onChange={(e) => set('foundedYear', e.target.value)} placeholder={String(currentYear - 3)} required className={inputCls} />
                    </Field>
                    <Field label="Site web" icon={Globe} error={errors.website} hint="Optionnel">
                      <input type="text" value={formData.website} onChange={(e) => set('website', e.target.value)} placeholder="www.votre-site.com" className={inputCls} />
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Effectif *</label>
                    <Chips options={companySizes} value={formData.companySize} onChange={(v) => set('companySize', v)} theme={theme} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Présentation de l'entreprise *</label>
                    <textarea value={formData.description} onChange={(e) => set('description', e.target.value.slice(0, 400))} rows={4} required
                      placeholder="Décrivez vos services, votre zone d'intervention et ce qui vous distingue."
                      className={`${plainInputCls} resize-none`} />
                    <p className={`mt-1.5 text-xs ${formData.description.trim().length >= 20 ? 'text-slate-400' : 'text-amber-600'}`}>
                      {formData.description.length}/400 · 20 caractères minimum
                    </p>
                  </div>

                  <ErrorBox />
                  <button type="submit" disabled={!valid.company} className={primaryBtn}>Continuer <ArrowRight className="w-5 h-5" /></button>
                </form>
              </div>
            )}

            {/* ───────── ÉTAPE : RESPONSABLE & COORDONNÉES (entreprise) ───────── */}
            {stepKey === 'contact' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
                <StepHeader title="Responsable du compte" subtitle="La personne qui administrera l'espace entreprise et sera notre interlocuteur." />
                <form onSubmit={(e) => { e.preventDefault(); goNext() }} className="space-y-5">
                  <Field label="Nom du responsable *" icon={UserCircle}>
                    <input type="text" value={formData.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Jean Dupont" required className={inputCls} />
                  </Field>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Fonction *</label>
                    <Chips options={managerRoles} value={formData.managerRole} onChange={(v) => set('managerRole', v)} theme={theme} />
                  </div>

                  {emailPhoneFields}
                  {cityField}

                  <Field label="Adresse du siège *" icon={Landmark} hint="Rue, quartier, repère connu.">
                    <input type="text" value={formData.address} onChange={(e) => set('address', e.target.value)} placeholder="Ex : Bd du 13 Janvier, en face de la pharmacie…" required className={inputCls} />
                  </Field>

                  <ErrorBox />
                  <button type="submit" disabled={!valid.contact} className={primaryBtn}>Continuer <ArrowRight className="w-5 h-5" /></button>
                </form>
              </div>
            )}

            {/* ───────── ÉTAPE : SÉCURITÉ ───────── */}
            {stepKey === 'security' && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
                <StepHeader title="Sécuriser votre compte" subtitle="Choisissez un mot de passe solide que vous n'utilisez nulle part ailleurs." />

                {role === 'company' && (
                  <div className={`rounded-2xl ${theme.softBg} p-4 mb-6 flex items-start gap-3`}>
                    <ShieldCheck className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme.text}`} />
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">{formData.companyName}</p>
                      <p>{formData.legalForm} · RCCM {formData.rccm.toUpperCase()} · IF {formData.ifNumber.toUpperCase()}</p>
                      <p className="text-slate-500 mt-1">Vérification manuelle sous 24 à 48 h après l'inscription.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Field label="Mot de passe *" icon={Lock}>
                      <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" required
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-white text-slate-900 placeholder:text-slate-400 ${formData.password && !isPasswordSecure(formData.password) ? 'border-red-300 focus:ring-red-500' : `border-slate-200 ${theme.ring}`}`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Afficher ou masquer le mot de passe" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </Field>
                    {formData.password && <PasswordMeter password={formData.password} />}
                  </div>

                  <Field label="Confirmer le mot de passe *" icon={Lock} error={errors.confirm}>
                    <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} placeholder="••••••••" required
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-white text-slate-900 placeholder:text-slate-400 ${errors.confirm ? 'border-red-300 focus:ring-red-500' : `border-slate-200 ${theme.ring}`}`} />
                  </Field>

                  <label className="flex items-start gap-3 cursor-pointer select-none pt-1">
                    <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-slate-300 accent-indigo-600" />
                    <span className="text-sm text-slate-600">
                      J'accepte les <Link href="/terms" className="text-indigo-600 font-semibold hover:underline">conditions d'utilisation</Link> et la <Link href="/privacy" className="text-indigo-600 font-semibold hover:underline">politique de confidentialité</Link>
                      {role === 'company' && ' et certifie que les informations de l\'entreprise sont exactes'}.
                    </span>
                  </label>

                  <ErrorBox />
                  <button type="submit" disabled={loading || !valid.security} className={primaryBtn}>
                    {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />Création du compte…</>) : (<>Créer mon compte<ArrowRight className="w-5 h-5" /></>)}
                  </button>
                </form>

                <p className="mt-6 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                  Déjà un compte ? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Se connecter</Link>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}