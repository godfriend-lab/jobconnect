// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import LeaveReviewModal from '@/components/LeaveReviewModal'
import { 
  Search, MapPin, Star, Shield, 
  Heart, Home, Clock, Settings, LogOut, 
  Menu, X, Wrench, Zap, Hammer, Paintbrush, Home as HomeIcon, 
  Car, Scissors, Shirt, Building, GraduationCap, Utensils, 
  Camera, Music, Dumbbell, Stethoscope, Scale, Truck, 
  Plane, Ship, Wifi, Loader2,
  Phone, ExternalLink, MessageCircle, Briefcase, Upload, Crown
} from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  city: string | null
  pro_id: string
  created_at: string
  profiles: {
    id: string
    full_name: string
    phone: string
    avatar_url: string | null
    specialty: string
    rating: number
    total_reviews: number
    plan: string
    is_verified: boolean
  }
}

interface Professional {
  id: string
  full_name: string
  specialty: string
  city: string
  phone: string
  rating: number
  total_reviews: number
  plan: string
  is_verified: boolean
  avatar_url?: string | null
}

export default function ClientDashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<'marketplace' | 'history' | 'favorites' | 'settings'>('marketplace')
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [favorites, setFavorites] = useState<Professional[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [contactHistory, setContactHistory] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedProId, setSelectedProId] = useState('')
  const [selectedProName, setSelectedProName] = useState('')

  const [settings, setSettings] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notifications: true,
    emailAlerts: true,
    smsAlerts: false
  })

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

  const categories = [
    { id: 'plumbing', name: 'Plomberie', icon: Wrench },
    { id: 'electricity', name: 'Électricité', icon: Zap },
    { id: 'masonry', name: 'Maçonnerie', icon: Hammer },
    { id: 'painting', name: 'Peinture', icon: Paintbrush },
    { id: 'carpentry', name: 'Menuiserie', icon: Hammer },
    { id: 'mechanic', name: 'Mécanique Auto', icon: Car },
    { id: 'hairdressing', name: 'Coiffure', icon: Scissors },
    { id: 'sewing', name: 'Couture', icon: Shirt },
    { id: 'realestate', name: 'Immobilier', icon: HomeIcon },
    { id: 'construction', name: 'Construction', icon: Building },
    { id: 'teaching', name: 'Enseignement', icon: GraduationCap },
    { id: 'catering', name: 'Restauration', icon: Utensils },
    { id: 'photography', name: 'Photographie', icon: Camera },
    { id: 'music', name: 'Musique', icon: Music },
    { id: 'fitness', name: 'Sport/Fitness', icon: Dumbbell },
    { id: 'health', name: 'Santé', icon: Stethoscope },
    { id: 'legal', name: 'Juridique', icon: Scale },
    { id: 'transport', name: 'Transport', icon: Truck },
    { id: 'cleaning', name: 'Nettoyage', icon: HomeIcon },
    { id: 'gardening', name: 'Jardinage', icon: HomeIcon },
    { id: 'beauty', name: 'Beauté/Esthétique', icon: Shield },
    { id: 'it', name: 'Informatique', icon: Wifi },
    { id: 'event', name: 'Événementiel', icon: Clock },
    { id: 'tourism', name: 'Tourisme/Voyage', icon: Plane },
    { id: 'maritime', name: 'Maritime', icon: Ship },
  ]

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  ).slice(0, 10)

  useEffect(() => {
    loadProfile()
    loadServices()
  }, [])

  useEffect(() => {
    if (profile) {
      loadContactHistory()
      loadFavorites()
    }
  }, [profile])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory, searchQuery, selectedCity])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { 
        router.push('/login')
        return 
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!profileData) { 
        router.push('/login')
        return 
      }

      setProfile(profileData)
      
      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()

      setSettings({
        fullName: profileData.full_name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        city: profileData.city || '',
        notifications: settingsData?.notifications ?? true,
        emailAlerts: settingsData?.email_alerts ?? true,
        smsAlerts: settingsData?.sms_alerts ?? false
      })
    } catch (error) {
      console.error('Erreur chargement profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadServices = async () => {
    try {
      console.log('🔍 Chargement des services...')
      
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (servicesError) {
        console.error('❌ Erreur chargement services:', servicesError)
        setServices([])
        return
      }

      if (!servicesData || servicesData.length === 0) {
        console.log('️ Aucun service trouvé')
        setServices([])
        return
      }

      console.log(`✅ ${servicesData.length} services trouvés`)

      const proIds = [...new Set(servicesData.map(s => s.pro_id))]
      console.log('👥 IDs des pros à charger:', proIds)

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, city')
        .in('id', proIds)

      if (profilesError) {
        console.error('❌ Erreur chargement profils:', profilesError)
      }

      console.log(`✅ ${profilesData?.length || 0} profils chargés`)

      const profilesMap = new Map(
        (profilesData || []).map(p => [p.id, {
          id: p.id,
          full_name: p.full_name || 'Professionnel',
          phone: p.phone || '',
          avatar_url: p.avatar_url || null,
          specialty: p.specialty || '',
          rating: p.rating || 0,
          total_reviews: p.total_reviews || 0,
          plan: p.plan || 'Gratuit',
          is_verified: p.is_verified || false,
          city: p.city || ''
        }])
      )

      const combinedServices: Service[] = servicesData
        .filter(service => profilesMap.has(service.pro_id))
        .map(service => ({
          id: service.id,
          title: service.title,
          description: service.description || '',
          category: service.category,
          price: service.price,
          city: service.city || profilesMap.get(service.pro_id)?.city || null,
          pro_id: service.pro_id,
          created_at: service.created_at,
          profiles: profilesMap.get(service.pro_id)!
        }))

      console.log(`✅ ${combinedServices.length} services combinés et prêts à l'affichage`)
      setServices(combinedServices)
    } catch (error) {
      console.error('❌ Erreur critique chargement services:', error)
      setServices([])
    }
  }

  const loadContactHistory = async () => {
    if (!profile) return
    try {
      const { data: historyData } = await supabase
        .from('contact_history')
        .select('*')
        .eq('client_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (!historyData || historyData.length === 0) { 
        setContactHistory([])
        return 
      }

      const proIds = [...new Set(historyData.map(h => h.pro_id))]
      const { data: prosData } = await supabase
        .from('profiles')
        .select('id, full_name, specialty, city, phone, avatar_url')
        .in('id', proIds)

      const prosMap = new Map(prosData?.map(p => [p.id, p]) || [])
      const formatted = historyData.map(item => {
        const pro = prosMap.get(item.pro_id)
        return {
          id: item.id,
          proId: item.pro_id,
          proName: pro?.full_name || 'Professionnel',
          specialty: pro?.specialty || 'Service',
          city: pro?.city || '',
          phone: pro?.phone || '',
          avatar: pro?.avatar_url,
          date: item.created_at,
          status: item.status,
          amount: item.amount,
          rating: item.rating,
          contact_method: item.contact_method
        }
      })
      setContactHistory(formatted)
    } catch (error) {
      setContactHistory([])
    }
  }

  const loadFavorites = async () => {
    if (!profile) return
    try {
      const { data: favData } = await supabase
        .from('favorites')
        .select('*')
        .eq('client_id', profile.id)

      if (!favData || favData.length === 0) { 
        setFavorites([])
        return 
      }

      const proIds = favData.map(f => f.pro_id)
      const { data: prosData } = await supabase
        .from('profiles')
        .select('id, full_name, specialty, city, phone, rating, plan, total_reviews, is_verified, avatar_url')
        .in('id', proIds)

      const formatted = (prosData || []).map(p => ({
        id: p.id,
        full_name: p.full_name,
        specialty: p.specialty,
        city: p.city || '',
        phone: p.phone,
        rating: p.rating || 0,
        plan: p.plan || 'Gratuit',
        total_reviews: p.total_reviews || 0,
        is_verified: p.is_verified || false,
        avatar_url: p.avatar_url || undefined
      }))
      setFavorites(formatted)
    } catch (error) {
      setFavorites([])
    }
  }

  const filterServices = () => {
    let filtered = [...services]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.profiles.full_name.toLowerCase().includes(query) ||
        service.profiles.specialty.toLowerCase().includes(query) ||
        (service.city && service.city.toLowerCase().includes(query))
      )
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(service => {
        const serviceCity = service.city?.toLowerCase().trim() || ''
        const selectedCityLower = selectedCity.toLowerCase().trim()
        return serviceCity === selectedCityLower
      })
    }

    filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0
      const levelScores: Record<string, number> = { 
        'Premium': 1000, 
        'Business': 500, 
        'Starter': 200, 
        'Gratuit': 0 
      }
      scoreA += levelScores[a.profiles.plan] || 0
      scoreB += levelScores[b.profiles.plan] || 0
      scoreA += (a.profiles.rating || 0) * 150
      scoreB += (b.profiles.rating || 0) * 150
      scoreA += (a.profiles.total_reviews || 0) * 15
      scoreB += (b.profiles.total_reviews || 0) * 15
      if (a.profiles.is_verified) scoreA += 100
      if (b.profiles.is_verified) scoreB += 100
      
      if (scoreA !== scoreB) return scoreB - scoreA
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredServices(filtered)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingPhoto(true)
      const file = e.target.files?.[0]
      if (!file || !profile) {
        alert('Aucun fichier sélectionné')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La photo doit faire moins de 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide')
        return
      }

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })
      
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)
      
      if (updateError) throw updateError
      
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('✅ Photo de profil mise à jour')
    } catch (error) { 
      console.error('Erreur upload photo:', error)
      alert('❌ Erreur upload photo de profil') 
    } finally { 
      setUploadingPhoto(false) 
    }
  }

  const saveSettings = async () => {
    if (!profile) return
    try {
      await supabase.from('profiles').update({
        full_name: settings.fullName,
        phone: settings.phone,
        city: settings.city
      }).eq('id', profile.id)

      await supabase.from('user_settings').upsert({
        id: profile.id,
        notifications: settings.notifications,
        email_alerts: settings.emailAlerts,
        sms_alerts: settings.smsAlerts,
        updated_at: new Date().toISOString()
      })

      setProfile({ ...profile, full_name: settings.fullName })
      alert('✅ Paramètres sauvegardés')
    } catch (error) {
      alert('❌ Erreur sauvegarde')
    }
  }

  const toggleFavorite = async (pro: Professional) => {
    if (!profile) return
    try {
      const exists = favorites.find(f => f.id === pro.id)
      if (exists) {
        await supabase.from('favorites').delete().eq('client_id', profile.id).eq('pro_id', pro.id)
        setFavorites(favorites.filter(f => f.id !== pro.id))
      } else {
        await supabase.from('favorites').insert({ client_id: profile.id, pro_id: pro.id })
        setFavorites([...favorites, pro])
      }
    } catch (error) {
      console.error('Erreur favori:', error)
    }
  }

  const contactWhatsApp = (service: Service) => {
    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) {
        phone = '+' + phone
      } else if (phone.startsWith('9') || phone.startsWith('7')) {
        phone = '+228' + phone
      }
    }

    const message = encodeURIComponent(
      `Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur JobConnect. Pouvez-vous me donner plus d'informations ?`
    )

    if (profile) {
      supabase.from('contact_history').insert({
        client_id: profile.id,
        pro_id: pro.id,
        status: 'contacted',
        contact_method: 'whatsapp'
      }).then(({ error }) => {
        if (error) console.error('Erreur historique:', error)
      })
    }

    const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const LevelBadge = ({ plan }: { plan: string }) => {
    if (!plan || plan === 'Gratuit') return null
    const config: Record<string, { colors: string[]; shadow: string }> = {
      'Starter': { colors: ['#3B82F6', '#1D4ED8'], shadow: 'rgba(59, 130, 246, 0.4)' },
      'Business': { colors: ['#10B981', '#047857'], shadow: 'rgba(16, 185, 129, 0.4)' },
      'Premium': { colors: ['#FBBF24', '#D97706'], shadow: 'rgba(251, 191, 36, 0.4)' }
    }
    const { colors, shadow } = config[plan] || config['Starter']
    const gradientId = `badge-${plan}`
    return (
      <div className="inline-flex items-center justify-center w-5 h-5 mr-2 flex-shrink-0" style={{ filter: `drop-shadow(0 1px 2px ${shadow})` }}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <path d="M12 2 L13.5 4.5 L16 3.5 L16.5 6 L19 6.5 L18.5 9 L21 10 L20 12.5 L21.5 14.5 L19.5 16 L20 18.5 L17.5 19 L17 21.5 L14.5 21 L13 22.5 L11 22.5 L9.5 21 L7 21.5 L6.5 19 L4 18.5 L4.5 16 L2.5 14.5 L4 12.5 L3 10 L5.5 9 L6 6.5 L8.5 6 L9 3.5 L11.5 4.5 Z" fill={`url(#${gradientId})`} />
          <path d="M7 12 L10.5 15.5 L17 9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-slate-600">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/dashboard/client" className="flex items-center gap-3 flex-shrink-0 group">
            <Logo className="w-10 h-10 shadow-lg group-hover:scale-110 transition-transform" />
            <span className="font-black text-xl hidden sm:block tracking-tight">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </span>
          </Link>
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher un service ou professionnel..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden ring-2 ring-white shadow-lg">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || 'C'
                  )}
                </div>
              </button>
              {sidebarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSidebarOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                      <p className="font-bold text-slate-900">{profile?.full_name || 'Client'}</p>
                      <p className="text-xs text-slate-500">{profile?.email || ''}</p>
                    </div>
                    <nav className="p-2 space-y-1">
                      <button onClick={() => { setActiveView('marketplace'); setSidebarOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100"><Home className="w-5 h-5" /><span>Marketplace</span></button>
                      <button onClick={() => { setActiveView('history'); setSidebarOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100"><Clock className="w-5 h-5" /><span>Historique</span></button>
                      <button onClick={() => { setActiveView('favorites'); setSidebarOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100"><Heart className="w-5 h-5" /><span>Favoris</span></button>
                      <button onClick={() => { setActiveView('settings'); setSidebarOpen(false) }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100"><Settings className="w-5 h-5" /><span>Paramètres</span></button>
                    </nav>
                    <div className="p-2 border-t border-slate-200">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"><LogOut className="w-5 h-5" /><span>Déconnexion</span></button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3">
              <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Tous</button>
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    <Icon className="w-4 h-4" />{cat.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeView === 'marketplace' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-semibold text-slate-700">{filteredServices.length} services disponibles</span>
                
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Rechercher une localité..."
                      value={citySearchQuery}
                      onChange={(e) => {
                        setCitySearchQuery(e.target.value)
                        setShowCityDropdown(true)
                        setSelectedCity('all')
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  {showCityDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowCityDropdown(false)} />
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                        <button
                          onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${selectedCity === 'all' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                        >
                           Toutes les localités
                        </button>
                        {filteredCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${selectedCity === city ? 'bg-indigo-50 text-indigo-600' : ''}`}
                          >
                            {city}
                          </button>
                        ))}
                        {filteredCities.length === 0 && (
                          <div className="px-4 py-2 text-sm text-slate-500">
                            Aucune localité trouvée
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {selectedCity !== 'all' && (
                    <button
                      onClick={() => { setSelectedCity('all'); setCitySearchQuery('') }}
                      className="ml-2 text-xs text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucun service trouvé</p>
                <p className="text-sm text-slate-400 mt-2">Essayez de modifier vos filtres</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    {/* ✅ LAYOUT HORIZONTAL PARFAIT */}
                    {/* Photo en haut - 50% de la hauteur */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
                      {service.profiles.avatar_url ? (
                        <img src={service.profiles.avatar_url} alt={service.profiles.full_name} className="w-full h-full object-cover relative z-10" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                          <div className="text-8xl opacity-50">👤</div>
                        </div>
                      )}
                      
                      {/* Badge vérifié */}
                      {service.profiles.is_verified && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-20">
                          <Shield className="w-3.5 h-3.5" />Vérifié
                        </div>
                      )}
                      
                      {/* Badge plan */}
                      {service.profiles.plan && service.profiles.plan !== 'Gratuit' && (
                        <div className="absolute top-3 right-3 z-20">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                            service.profiles.plan === 'Premium' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white' :
                            service.profiles.plan === 'Business' ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' :
                            'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                          }`}>
                            <Crown className="w-3.5 h-3.5" />
                            {service.profiles.plan}
                          </span>
                        </div>
                      )}
                      
                      {/* Bouton favori */}
                      <button 
                        onClick={() => toggleFavorite({
                          id: service.profiles.id,
                          full_name: service.profiles.full_name,
                          specialty: service.profiles.specialty,
                          city: service.city || '',
                          phone: service.profiles.phone,
                          rating: service.profiles.rating,
                          total_reviews: service.profiles.total_reviews,
                          plan: service.profiles.plan,
                          is_verified: service.profiles.is_verified,
                          avatar_url: service.profiles.avatar_url || undefined
                        })} 
                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110 z-20"
                      >
                        <Heart className={`w-4.5 h-4.5 ${favorites.some(f => f.id === service.profiles.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                      </button>
                    </div>
                    
                    {/* Contenu en bas - 50% de la hauteur */}
                    <div className="p-4 flex flex-col">
                      {/* Titre du service */}
                      <div className="flex items-start gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <h3 className="font-bold text-slate-900 text-base line-clamp-2 flex-1">{service.title}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{service.description}</p>
                      
                      {/* Info Pro */}
                      <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 rounded-lg">
                        <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                          {service.profiles.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-slate-900 truncate block">{service.profiles.full_name}</span>
                          {service.profiles.specialty && (
                            <span className="text-xs text-slate-500">{service.profiles.specialty}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Rating et ville */}
                      <div className="flex items-center justify-between mb-3">
                        {service.profiles.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-slate-900 text-sm">{service.profiles.rating.toFixed(1)}</span>
                            {service.profiles.total_reviews > 0 && (
                              <span className="text-xs text-slate-500">({service.profiles.total_reviews})</span>
                            )}
                          </div>
                        )}
                        {service.city && (
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{service.city}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Prix et bouton sur la même ligne */}
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-2.5 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-600 font-semibold block">Prix</span>
                          <span className="text-lg font-black text-indigo-600">{service.price}</span>
                        </div>
                        <button 
                          onClick={() => contactWhatsApp(service)} 
                          className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contacter
                        </button>
                      </div>
                      
                      {/* Lien voir profil */}
                      <Link 
                        href={`/pro/${service.profiles.id}`}
                        className="w-full py-2 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Voir le profil complet
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'history' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Historique des contacts</h1>
            {contactHistory.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucun historique</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {contactHistory.map((item) => (
                  <div key={item.id} className="p-6 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                        {item.avatar ? (
                          <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          item.proName.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold">{item.proName}</h3>
                        <p className="text-sm text-slate-600">{item.specialty}</p>
                        <p className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.contact_method === 'whatsapp' 
                          ? 'bg-green-100 text-green-700' 
                          : item.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.contact_method === 'whatsapp' ? 'WhatsApp' : item.status === 'completed' ? 'Terminé' : 'En attente'}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedProId(item.proId)
                          setSelectedProName(item.proName)
                          setShowReviewModal(true)
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Laisser un avis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'favorites' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Favoris</h1>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucun favori</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((pro) => (
                  <div key={pro.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                      {pro.avatar_url ? (
                        <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-6xl">👤</span>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <LevelBadge plan={pro.plan} />
                        <h3 className="font-bold text-slate-900">{pro.full_name}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{pro.specialty}</p>
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            const serviceData: Service = {
                              id: pro.id,
                              title: pro.specialty,
                              description: '',
                              category: '',
                              price: '',
                              city: pro.city,
                              pro_id: pro.id,
                              created_at: '',
                              profiles: {
                                ...pro,
                                avatar_url: pro.avatar_url || null
                              }
                            }
                            contactWhatsApp(serviceData)
                          }}
                          className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </button>
                        <Link 
                          href={`/pro/${pro.id}`}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir le profil
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Photo de profil</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 shadow-lg">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                      {profile?.full_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <label className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Changer la photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploadingPhoto} />
                </label>
                {uploadingPhoto && <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label>
                  <input type="text" value={settings.fullName} onChange={(e) => setSettings({...settings, fullName: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input type="email" value={settings.email} disabled className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone</label>
                  <input type="tel" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ville</label>
                  <input type="text" value={settings.city} onChange={(e) => setSettings({...settings, city: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
            
            <button onClick={saveSettings} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all">
              Sauvegarder les modifications
            </button>
          </div>
        )}

        {showReviewModal && (
          <LeaveReviewModal
            proId={selectedProId}
            proName={selectedProName}
            onClose={() => setShowReviewModal(false)}
            onSuccess={() => {
              setShowReviewModal(false)
              alert('✅ Merci pour votre avis ! Il a été publié avec succès.')
            }}
          />
        )}
      </main>
    </div>
  )
}