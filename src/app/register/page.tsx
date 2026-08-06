// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Briefcase, User, Loader2, AlertCircle, CheckCircle2,
  MapPin, Phone, UserCircle, Check
} from 'lucide-react'

// ✅ LISTE COMPLÈTE DES VILLES ET QUARTIERS
const allCities = [
  'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Bè', 'Tokoin', 'Akodesséwa', 'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué', 
  'Aflao-Gakli', 'Aflao-Sagbado', 'Avedji', 'Totsi', 'Hedzranawoé', 'Baguida', 'Adétikopé', 'Noépé', 'Kovié', 'Tsévié', 
  'Mission-Tové', 'Dalavé', 'Gbatopé', 'Djagblé', 'Kpomé', 'Zanguéra', 'Vakpossito', 'Légbassito', 'Sanguéra', 'Kévé', 
  'Tabligbo', 'Aného', 'Glidji', 'Agbodrafo', 'Togoville', 'Séko', 'Kpémé', 'Vogan', 'Akoumapé', 'Vakpo', 'Hahotoé', 
  'Gbodjomé', 'Aklakou', 'Tohoun', 'Ahépé', 'Davié', 'Kpomé-Dzogblakopé', 'Assahoun', 'Badja', 'Kpélé-Adéta', 'Kpalimé', 
  'Agou-Gadzépé', 'Agou-Nyogbo', 'Agou-Kebo', 'Agomé-Tomégbé', 'Kougnohou', 'Womé', 'Kpimé', 'Yikpa', 'Kuma-Apéyémé', 
  'Kuma-Bala', 'Kuma-Tokpli', 'Danyi-Apéyémé', 'Danyi-Elavagnon', 'Danyi-Kpodzi', 'Atakpamé', 'Gléi', 'Kpessi', 'Anié', 
  'Adogbénou', 'Akparé', 'Elavagnon', 'Amou-Oblo', 'Amlamé', 'Kpatégan', 'Badou', 'Kamina', 'Tohoun-Centre', 'Notsè', 
  'Wahala', 'Kpédomé', 'Hahotoé-Kondji', 'Kpélé-Tutu', 'Tado', 'Agbandi', 'Kpékplémé', 'Tchamba', 'Koussountou', 'Alibi', 
  'Kaboli', 'Bago', 'Tchalo', 'Sotouboua', 'Fazao', 'Titigbe', 'Blitta', 'Pagala', 'Langabou', 'Yégué', 'Agbandi-Yaka', 
  'Kpario', 'Tchaoudjo', 'Sokodé', 'Komah', 'Kpangalam', 'Kparatao', 'Kolina', 'Bafilo', 'Alédjo', 'Bassar', 'Kabou', 
  'Bangéli', 'Dimori', 'Guérin-Kouka', 'Niamtougou', 'Défalé', 'Pagouda', 'Lama-Kara', 'Pya', 'Landa', 'Tchitchao', 
  'Kétao', 'Kouméa', 'Kéran', 'Kandé', 'Namon', 'Kpinzindè', 'Koka', 'Sarakawa', 'Farendè', 'Binah', 'Assoli', 
  'Aouda', 'Kouka', 'Katchamba', 'Mango', 'Gando', 'Kpendjal', 'Mandouri', 'Borgou', 'Dapaong', 'Nano', 'Korbongou', 
  'Pana', 'Cinkassé', 'Timbou', 'Tandjouaré', 'Nayéga', 'Bombouaka', 'Lokpa', 'Ogaro', 'Barkoissi', 
  'Ponio', 'Tami', 'Kantè', 'Nadoba', 'Koutammakou', 'Warengo', 'Takpamba', 'Galangashi', 'Koundjoaré',
  'Pessaré', 'Tindjassi', 'Bitchabé', 'Kri-Kri', 'Tovégan', 'Dzrékpo', 
  'Koutimé', 'Sévagan', 'Afagnan', 'Attitogon', 'Agomé-Glozou', 'Aképé', 'Kpogan', 'Sogbossito', 'Agbalépédogan', 
  'Klikamé', 'Avénou', 'Gbényédzi', 'Kélégougan', 'Adakpamé', 'Hanoukopé', 'Kodjoviakopé', 'Aguiarkomé', 
  'Béniglato', 'Nukafu', 'Ablogamé', 'Katanga', 'Doumassessé', 'Adawlato', 'Akassimé', 'Amadahomé', 'Ségbé',
  'Wonyomé', 'Logopé', 'Tokoin-Hôpital', 'Tokoin-Aviation', 'Tokoin-Lycée',
  'Bè-Klikamé', 'Bè-Kpota', 'Bè-Attiégou', 'Bè-Adidomé', 'Adamavo',
  'Kélégougan-Haut', 'Kélégougan-Bas', 'Gblinkomé', 'Gbonvié', 'Kpota-Colas', 'Tové', 'Mission-Tové II', 
  'Kpomé-Kpota', 'Bolou', 'Bolou-Kpégan', 'Bolou-Atti', 'Bolou-Kékéli', 'Kpessi-Zou', 'Gblainvié', 'Ségbégan', 
  'Adétikopé-Kpota', 'Zolo', 'Kovié-Kondji', 'Kovié-Kopé', 'Kovié-Dzogbégan', 'Kovié-Agbléta', 'Gapé', 'Gapé-Centre', 
  'Gapé-Kpodzi', 'Gapé-Atimé', 'Kévégan', 'Kévé-Kpota', 'Kévé-Kondji', 'Kévé-Agbata', 'Tomety-Kondji', 'Tomety-Kopé', 
  'Démé', 'Démé-Kondji', 'Démé-Kopé', 'Agbélouvé', 'Gbatopé-Kondji', 'Kpoguédé', 'Agbatitoé', 'Agouègan', 'Attitogon-Kondji', 
  'Attitogon-Kopé', 'Koutimé-Kondji', 'Sévagan-Kondji', 'Dzrékpo-Kondji', 'Tsévié-Zongo', 'Tsévié-Démakpoè', 'Tsévié-Administratif', 
  'Tchékpo', 'Tchékpo-Dédékpoè', 'Tchékpo-Anagali', 'Tchékpo-Kpota', 'Kpélé-Tsiko', 'Kpélé-Dafo', 'Kpélé-Elé', 'Kpélé-Govié', 
  'Kpélé-Tutu Sud', 'Kpélé-North', 'Agou-Tségan', 'Agou-Kébo-Dzigbé', 'Agou-Ekpé', 'Agou-Kpéta', 'Agou-Atiamé', 'Kpadapé', 
  'Avétonou', 'Hanyigba', 'Dzogbégan', 'Kpimé-Séva', 'Kpimé-Tomégbé', 'Kpimé-Dzimé', 'Agomé-Yoh', 'Agomé-Kpodzi', 
  'Agomé-Kpalimé', 'Agomé-Glozou', 'Agomé-Konda', 'Womé-Yomé', 'Womé-Tomégbé', 'Kuma-Konda', 'Kuma-Adamé', 'Kuma-Tokpli II', 
  'Danyi-N\'digbé', 'Danyi-Kétémé', 'Danyi-Tététou', 'Danyi-Dzogbégan', 'Danyi-Womé', 'Danyi-Monome', 'Badou-Zone', 
  'Badou-Kessibo', 'Badou-Tomégbé', 'Badou-Kamina', 'Badou-Tététou', 'Badou-Kougnohou', 'Amlamé-Kpota', 'Amlamé-Kondji', 
  'Amlamé-Dzigbé', 'Amou-Oblo-Kopé', 'Amou-Oblo-Kondji', 'Kpatégan-Kopé', 'Kpatégan-Kondji', 'Notsè-Zongo', 'Notsè-Domé', 
  'Notsè-Kpota', 'Notsè-Agbalépédo', 'Notsè-Kondji', 'Wahala-Kondji', 'Wahala-Kopé', 'Agbandi-Kopé', 'Agbandi-Kondji', 
  'Elavagnon-Kopé', 'Elavagnon-Kondji', 'Gléi-Kopé', 'Gléi-Kondji', 'Atakpamé-Gnagna', 'Atakpamé-Dzogbégan', 'Atakpamé-Anyron', 
  'Atakpamé-Kpota', 'Atakpamé-Zongo', 'Atakpamé-Haut', 'Atakpamé-Bas', 'Anié-Kopé', 'Anié-Kondji', 'Adogbénou-Kopé', 
  'Akparé-Kondji', 'Tchamba-Gare', 'Tchamba-Haut', 'Tchamba-Bas', 'Koussountou-Kopé', 'Koussountou-Kondji', 'Kaboli-Centre', 
  'Kaboli-Bas', 'Alibi-Kopé', 'Bago-Kondji', 'Sotouboua-Gare', 'Sotouboua-Kpota', 'Sotouboua-Zongo', 'Fazao-Centre', 
  'Fazao-Kondji', 'Titigbe-Kondji', 'Blitta-Gare', 'Blitta-Village', 'Blitta-Campement', 'Pagala-Gare', 'Pagala-Kondji', 
  'Yégué-Kopé', 'Langabou-Kondji', 'Sokodé-Komah', 'Sokodé-Kpangalam', 'Sokodé-Kparatao', 'Sokodé-Tchalo', 'Sokodé-Didaourè', 
  'Sokodé-Kouloundè', 'Sokodé-Zongo', 'Sokodé-Administratif', 'Kolina-Haut', 'Kolina-Bas', 'Bafilo-Centre', 'Bafilo-Zongo', 
  'Bafilo-Kpéwa', 'Bassar-Centre', 'Bassar-Campement', 'Bangéli-Haut', 'Bangéli-Bas', 'Kabou-Centre', 'Kabou-Bas', 
  'Dimori-Kondji', 'Guérin-Kouka-Centre', 'Guérin-Kouka-Bas', 'Niamtougou-Centre', 'Niamtougou-Aéroport', 'Défalé-Centre', 
  'Défalé-Bas', 'Pagouda-Centre', 'Lama-Kara-Tomdè', 'Lama-Kara-Haoussa', 'Lama-Kara-Dongoyo', 'Lama-Kara-Kasséna', 'Pya-Hodo', 
  'Pya-Sarakawa', 'Pya-Lao', 'Kétao-Centre', 'Tchitchao-Centre', 'Kouméa-Centre', 'Kandé-Zongo', 'Kandé-Haut', 'Kandé-Bas', 
  'Namon-Centre', 'Kpinzindè-Centre', 'Koka-Centre', 'Koka-Kondji', 'Koka-Bas', 'Farendè-Centre', 'Farendè-Bas', 'Sarakawa-Centre', 
  'Sarakawa-Kondji', 'Pessidé', 'Agbanda', 'Kawa', 'Koundjoaré-Centre', 'Koundjoaré-Bas', 'Nano-Kondji', 'Nano-Bas', 'Borgou-Centre', 
  'Borgou-Bas', 'Mandouri-Kopé', 'Mandouri-Kondji', 'Mandouri-Nord', 'Mandouri-Sud', 'Gando-Centre', 'Gando-Bas', 'Gando-Nord', 
  'Mango-Zongo', 'Mango-Gare', 'Mango-Haut', 'Mango-Bas', 'Takpamba-Centre', 'Takpamba-Bas', 'Galangashi-Centre', 'Galangashi-Bas', 
  'Nayéga-Centre', 'Nayéga-Bas', 'Bombouaka-Centre', 'Bombouaka-Bas', 'Lokpa-Centre', 'Lokpa-Bas', 'Ogaro-Centre', 'Ogaro-Bas', 
  'Barkoissi-Centre', 'Barkoissi-Bas', 'Ponio-Centre', 'Ponio-Bas', 'Timbou-Centre', 'Timbou-Bas', 'Cinkassé-Centre', 'Cinkassé-Gare', 
  'Cinkassé-Marché', 'Korbongou-Centre', 'Korbongou-Bas', 'Pana-Centre', 'Pana-Bas', 'Tandjouaré-Centre', 'Tandjouaré-Bas', 'Namoni', 
  'Namoni-Centre', 'Tami-Centre', 'Tami-Bas', 'Warengo-Centre', 'Warengo-Bas', 'Nadoba-Centre', 'Nadoba-Bas', 'Koutougou', 
  'Koutougou-Centre', 'Koutammakou-Centre', 'Koutammakou-Bas', 'Naki-Est', 'Naki-Ouest', 'Siou', 'Siou-Haut', 'Siou-Bas', 
  'Kantè-Gare', 'Kantè-Haut', 'Kantè-Bas', 'Kadjalla', 'Kémérida', 'Kémérida-Centre', 'Kémérida-Bas', 'Namoudjoga', 
  'Namoudjoga-Centre', 'Sadori', 'Sadori-Centre', 'Baghan', 'Baghan-Centre', 'Kri-Kri-Centre', 'Kri-Kri-Bas', 'Tindjassi-Centre', 
  'Tindjassi-Bas', 'Bitchabé-Centre', 'Bitchabé-Bas', 'Pya-Haut', 'Pya-Bas', 'Lassa', 'Lassa-Haut', 'Lassa-Bas', 'Bohou', 
  'Bohou-Centre', 'Yadè', 'Yadè-Centre', 'Awandjélo', 'Awandjélo-Centre', 'Agbandé-Yaka', 'Agbandé-Yaka-Centre', 'Kéran-Centre', 
  'Kéran-Bas', 'Kéran-Nord', 'Kéran-Sud', 'Kpaha', 'Kpaha-Centre', 'Pessaré-Centre', 'Pessaré-Bas', 'Kouka-Centre', 'Kouka-Bas', 
  'Aouda-Centre', 'Aouda-Bas', 'Assoli-Centre', 'Assoli-Bas', 'Bafilo-Kpéwa II', 'Alédjo-Kadara', 'Alédjo-Village', 'Ténéga', 
  'Ténéga-Centre', 'Bitchabé-Nord', 'Bitchabé-Sud', 'Katchamba-Centre', 'Katchamba-Bas', 'Katchamba-Nord', 'Katchamba-Sud', 
  'Kabou-Nord', 'Kabou-Sud', 'Kpario-Centre', 'Kpario-Bas', 'Tchalo-Centre', 'Tchalo-Bas', 'Komah-Centre', 'Komah-Bas', 
  'Didaourè-Centre', 'Didaourè-Bas', 'Kouloundè-Centre', 'Kouloundè-Bas', 'Ténéga-Bas', 'Fazao-Malfakassa', 'Assrama', 'Kambolé', 
  'Kambolé-Centre', 'Kambolé-Bas', 'Aléhéridè', 'Aléhéridè-Centre', 'Aouda-Kopé', 'Aouda-Kondji', 'Kémérida-Kopé', 'Niamtougou-Zongo', 
  'Niamtougou-Haut', 'Niamtougou-Bas', 'Défalé-Kopé', 'Pagouda-Kopé', 'Lama-Kara-Haut', 'Lama-Kara-Bas', 'Tomdè', 'Dongoyo', 
  'Tchintchinda', 'Kpélouwayi', 'Landa-Centre', 'Landa-Bas', 'Kétao-Haut', 'Kétao-Bas', 'Tchitchao-Haut', 'Tchitchao-Bas', 
  'Kouméa-Haut', 'Kouméa-Bas', 'Kandé-Kopé', 'Kandé-Kondji', 'Namon-Kopé', 'Namon-Kondji', 'Kpinzindè-Kopé', 'Kpinzindè-Kondji', 
  'Farendè-Kopé', 'Farendè-Kondji', 'Sarakawa-Kopé', 'Sarakawa-Kondji', 'Bassar-Zongo', 'Bassar-Haut', 'Bassar-Bas', 'Bangéli-Kopé', 
  'Bangéli-Kondji', 'Dimori-Kopé', 'Dimori-Kondji', 'Guérin-Kouka-Kopé', 'Guérin-Kouka-Kondji', 'Bafilo-Haut', 'Bafilo-Bas', 
  'Alédjo-Haut', 'Alédjo-Bas', 'Kéran-Ouest', 'Kéran-Est', 'Dankpen-Centre', 'Dankpen-Nord', 'Dankpen-Sud', 'Binah-Centre', 
  'Binah-Nord', 'Binah-Sud'
]

// ✅ LISTE DES SPÉCIALITÉS COURANTES POUR LES PROS
const commonSpecialties = [
  'Plombier', 'Électricien', 'Maçon', 'Menuisier', 'Peintre en bâtiment', 'Mécanicien auto', 
  'Climaticien', 'Soudeur', 'Couvreur', 'Jardinier', 'Femme de ménage', 'Couturier(ère)', 
  'Coiffeur(se)', 'Développeur Web', 'Graphiste', 'Comptable', 'Avocat', 'Médecin', 'Infirmier(ère)'
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<'client' | 'pro' | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    specialty: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // ✅ NOUVEAU : État pour afficher l'écran de succès après l'inscription
  const [isVerificationSent, setIsVerificationSent] = useState(false)
  
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false)

  const isPasswordSecure = (pwd: string) => {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas.')
        setLoading(false)
        return
      }

      if (!isPasswordSecure(formData.password)) {
        setError('Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.')
        setLoading(false)
        return
      }

      const cleanEmail = formData.email.trim().toLowerCase()
      const cleanPhone = formData.phone.replace(/\s+/g, '')
      const cleanName = formData.fullName.trim()
      const cleanCity = formData.city.trim()
      const cleanSpecialty = role === 'pro' ? formData.specialty.trim() : null

      // ✅ AJOUT : emailRedirectTo pour que Supabase sache où renvoyer l'utilisateur après le clic
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
          data: {
            full_name: cleanName,
            role: role
          }
        }
      })

      if (authError) {
        if (authError.message.includes('User already registered')) {
          setError('Un compte avec cet email existe déjà. Veuillez vous connecter.')
        } else {
          setError(authError.message)
        }
        setLoading(false)
        return
      }

      if (!authData.user) {
        setError('Erreur lors de la création du compte. Veuillez réessayer.')
        setLoading(false)
        return
      }

      // Création du profil en base de données
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: cleanName,
          email: cleanEmail,
          role: role,
          phone: cleanPhone,
          city: cleanCity,
          specialty: cleanSpecialty,
          is_active: true, // Ou false, selon ta logique métier
          is_verified: false,
          is_available: role === 'pro'
        })

      if (profileError) {
        console.warn('⚠️ Erreur création profil:', profileError)
      }

      // ✅ SUCCÈS : On ne connecte pas l'utilisateur, on affiche l'écran de vérification
      setIsVerificationSent(true)

    } catch (err) {
      console.error('❌ Erreur critique inscription:', err)
      setError('Une erreur inattendue est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const isStep1Valid = role !== null
  const isStep2Valid = formData.fullName.trim() && formData.email.trim() && formData.phone.trim() && formData.city.trim() && (role !== 'pro' || formData.specialty.trim())
  const isStep3Valid = isPasswordSecure(formData.password) && formData.password === formData.confirmPassword

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(formData.city.toLowerCase())
  ).slice(0, 8)

  const filteredSpecialties = commonSpecialties.filter(spec => 
    spec.toLowerCase().includes(formData.specialty.toLowerCase())
  ).slice(0, 8)

  // ✅ ÉCRAN DE SUCCÈS : Vérification par email
  if (isVerificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        <header className="py-6 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black">
                <span className="text-indigo-600">JOB</span>
                <span className="text-slate-900">CONNECT</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Vérifiez votre boîte mail</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Nous avons envoyé un lien de confirmation à <br />
              <strong className="text-slate-900">{formData.email}</strong>
            </p>
            <p className="text-sm text-slate-500 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
              Cliquez sur le lien dans l'email pour activer votre compte JobConnect et accéder à votre espace.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Retour à la connexion
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setIsVerificationSent(false)}
              className="mt-4 text-sm text-slate-500 hover:text-indigo-600 underline"
            >
              Renvoyer l'email de vérification
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ... Le reste de ton JSX (Étapes 1, 2 et 3) reste EXACTEMENT le même que dans ton code original ...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-black">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </span>
          </Link>
          <Link 
            href="/login" 
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            Déjà un compte ? Se connecter
          </Link>
        </div>
      </header>

      {/* Contenu principal (Étapes 1, 2, 3 identiques à ton code) */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Créer un compte 🚀</h1>
            <p className="text-slate-600">Rejoignez JobConnect en quelques étapes</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && <div className={`w-8 h-1 rounded-full ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <p className="text-center text-sm font-semibold text-slate-700">Quel est votre profil ?</p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { setRole('client'); setError('') }} className={`group bg-white border-2 rounded-2xl p-6 transition-all ${role === 'client' ? 'border-blue-500 shadow-xl scale-105 ring-4 ring-blue-100' : 'border-slate-200 hover:border-blue-500 hover:shadow-lg'}`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Client</h3>
                  <p className="text-xs text-slate-500">Je cherche un professionnel</p>
                </button>
                <button onClick={() => { setRole('pro'); setError('') }} className={`group bg-white border-2 rounded-2xl p-6 transition-all ${role === 'pro' ? 'border-purple-500 shadow-xl scale-105 ring-4 ring-purple-100' : 'border-slate-200 hover:border-purple-500 hover:shadow-lg'}`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Professionnel</h3>
                  <p className="text-xs text-slate-500">Je propose mes services</p>
                </button>
              </div>
              <button onClick={() => isStep1Valid && setStep(2)} disabled={!isStep1Valid} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                Continuer <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => { setStep(1); setError('') }} className="text-sm text-slate-500 hover:text-indigo-600 transition flex items-center gap-1">← Retour</button>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${role === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {role === 'pro' ? <Briefcase className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  {role === 'pro' ? 'Professionnel' : 'Client'}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Vos informations</h2>
              <form onSubmit={(e) => { e.preventDefault(); isStep2Valid && setStep(3) }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet *</label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Jean Dupont" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="votre@email.com" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+228 90 00 00 00" required className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ville *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" value={formData.city} onChange={(e) => { setFormData({...formData, city: e.target.value}); setShowCityDropdown(true) }} onFocus={() => setShowCityDropdown(true)} placeholder="Rechercher votre ville" required autoComplete="off" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                  </div>
                  {showCityDropdown && formData.city.length > 0 && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                      <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {filteredCities.map((city) => (
                          <button key={city} type="button" onClick={() => { setFormData({...formData, city: city}); setShowCityDropdown(false) }} className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-slate-700 text-sm transition-colors flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />{city}
                          </button>
                        ))}
                        <div className="px-4 py-2.5 text-xs text-slate-400 border-t border-slate-100">💡 Si votre ville n'est pas dans la liste, tapez-la et appuyez sur "Continuer".</div>
                      </div>
                    </>
                  )}
                </div>
                {role === 'pro' && (
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Spécialité *</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" value={formData.specialty} onChange={(e) => { setFormData({...formData, specialty: e.target.value}); setShowSpecialtyDropdown(true) }} onFocus={() => setShowSpecialtyDropdown(true)} placeholder="Ex: Plombier, Électricien..." required autoComplete="off" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                    </div>
                    {showSpecialtyDropdown && formData.specialty.length > 0 && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowSpecialtyDropdown(false)} />
                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                          {filteredSpecialties.map((spec) => (
                            <button key={spec} type="button" onClick={() => { setFormData({...formData, specialty: spec}); setShowSpecialtyDropdown(false) }} className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-slate-700 text-sm transition-colors flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />{spec}
                            </button>
                          ))}
                          <div className="px-4 py-2.5 text-xs text-slate-400 border-t border-slate-100">💡 Vous pouvez aussi taper votre spécialité manuellement.</div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
                  </div>
                )}
                <button type="submit" disabled={!isStep2Valid} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  Continuer <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => { setStep(2); setError('') }} className="text-sm text-slate-500 hover:text-indigo-600 transition flex items-center gap-1">← Retour</button>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${role === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {role === 'pro' ? <Briefcase className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  {role === 'pro' ? 'Professionnel' : 'Client'}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sécuriser votre compte</h2>
              <p className="text-sm text-slate-500 mb-6">Votre mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" required className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${formData.password && !isPasswordSecure(formData.password) ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${isPasswordSecure(formData.password) ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={isPasswordSecure(formData.password) ? 'text-green-600' : 'text-red-600'}>
                        {isPasswordSecure(formData.password) ? 'Mot de passe sécurisé' : 'Doit contenir 8+ caractères, 1 majuscule, 1 chiffre'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmer le mot de passe *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="••••••••" required className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'}`} />
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
                  </div>
                )}
                <button type="submit" disabled={loading || !isStep3Valid} className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Création du compte...</>) : (<><>Créer mon compte</><ArrowRight className="w-5 h-5" /></>)}
                </button>
              </form>
              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">Déjà un compte ? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Se connecter</Link></p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}