// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import LeaveReviewModal from '@/components/LeaveReviewModal'
import { 
  Search, MapPin, Star, Shield, ShieldCheck, Pause,
  Heart, Home, Clock, Settings, LogOut, 
  Menu, X, Wrench, Zap, Hammer, Paintbrush, Home as HomeIcon, 
  Car, Scissors, Shirt, Building, GraduationCap, Utensils, 
  Camera, Music, Dumbbell, Stethoscope, Scale, Truck, 
  Plane, Ship, Wifi, Loader2,
  Phone, ExternalLink, MessageCircle, Briefcase, Upload, Crown,
  User, Laptop, Briefcase as BriefcaseIcon, Scissors as ScissorsIcon
} from 'lucide-react'

// ✅ COMPOSANT BADGE SÉCURITÉ INTERNE (Propre, Professionnel et Coloré)
const PlanBadge = ({ plan }: { plan: string }) => {
  if (!plan || plan === 'Gratuit') return null

  const config: Record<string, { iconColor: string; bgColor: string; tooltip: string }> = {
    'Starter': { iconColor: 'text-emerald-600', bgColor: 'bg-emerald-100', tooltip: 'Forfait Starter' },
    'Business': { iconColor: 'text-blue-600', bgColor: 'bg-blue-100', tooltip: 'Forfait Business' },
    'Premium': { iconColor: 'text-amber-600', bgColor: 'bg-amber-100', tooltip: 'Forfait Premium' }
  }

  const { iconColor, bgColor, tooltip } = config[plan] || config['Starter']

  return (
    <div 
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${bgColor} ${iconColor} flex-shrink-0 transition-transform hover:scale-110 cursor-help`}
      title={tooltip}
    >
      <ShieldCheck className="w-3.5 h-3.5" />
    </div>
  )
}

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
    is_available: boolean
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
  is_available: boolean
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

  const categoriesMetiers = [
    "Maçon", "Charpentier", "Menuisier", "Ébéniste", "Couvreur", "Plombier", "Électricien", "Peintre en bâtiment", "Carreleur", "Plâtrier", "Plaquiste", "Serrurier", "Ferronnier", "Forgeron", "Soudeur", "Vitrier", "Miroitier", "Tailleur de pierre", "Marbrier", "Façadier", "Étancheur", "Constructeur métallique", "Installateur sanitaire", "Installateur thermique", "Ramoneur", "Chimiste artisanal", "Potier", "Céramiste", "Sculpteur sur bois", "Sculpteur sur pierre", "Tourneur sur bois", "Graveur", "Doreur", "Encadreur", "Restaurateur de meubles", "Tapissier", "Cannage de chaises", "Vannier", "Tonnelier", "Luthier", "Facteur de piano", "Fabricant de guitares", "Fabricant de violons", "Horloger", "Bijoutier", "Joaillier", "Orfèvre", "Sertisseur", "Graveur sur bijoux", "Diamantaire", "Cordonnier", "Bottier", "Sellier", "Bourrelier", "Maroquinier", "Fabricant de sacs", "Fabricant de ceintures", "Fabricant de chaussures", "Chapelier", "Modiste", "Couturier", "Tailleur", "Brodeur", "Dentellier", "Styliste artisanal", "Tricoteur", "Tisserand", "Fileur de laine", "Teinturier textile", "Imprimeur textile", "Fabricant de tapis", "Fabricant de rideaux", "Fabricant de linge de maison", "Fabricant de vêtements traditionnels", "Savonnier", "Parfumeur artisanal", "Fabricant de bougies", "Fabricant d'encens", "Cosméticien artisanal", "Fabricant de produits naturels", "Fabricant de shampoings naturels", "Fabricant de lotions", "Fabricant de crèmes artisanales", "Apiculteur", "Chocolatier", "Confiseur", "Glacier artisanal", "Boulanger", "Pâtissier", "Viennoisier", "Biscuitier", "Traiteur artisanal", "Charcutier", "Boucher", "Poissonnier", "Fromager", "Affineur de fromage", "Torréfacteur", "Brasseur artisanal", "Distillateur artisanal", "Fabricant de jus naturels", "Fabricant de confitures", "Fabricant de miel", "Fabricant de sirops", "Fabricant de sauces", "Fabricant d'épices", "Fabricant de vinaigre", "Fabricant d'huile artisanale", "Fabricant de pâtes fraîches", "Fabricant de couscous", "Fabricant de yaourt", "Fabricant de beurre", "Fabricant de glace", "Fabricant de biscuits", "Fabricant de gâteaux", "Fabricant de bonbons", "Fabricant de nougat", "Fabricant de pâte d'arachide", "Fabricant de farine artisanale", "Meunier", "Brasseur de bière locale", "Vigneron artisanal", "Fabricant de vin de palme", "Fabricant de boissons locales", "Fabricant de fromage artisanal", "Producteur de beurre de karité", "Fabricant de savon noir", "Fabricant d'huile de coco", "Fabricant d'huile de palme", "Fabricant de produits à base d'aloès", "Fabricant de produits bio", "Fabricant de paniers", "Fabricant de nattes", "Fabricant de balais", "Fabricant de meubles en bambou", "Fabricant de meubles en rotin", "Fabricant de meubles en métal", "Fabricant de meubles en bois", "Fabricant de portes", "Fabricant de fenêtres", "Fabricant d'escaliers", "Fabricant de cuisines", "Fabricant de placards", "Fabricant de lits", "Fabricant de tables", "Fabricant de chaises", "Fabricant de canapés", "Fabricant d'armoires", "Fabricant de bureaux", "Fabricant d'étagères", "Fabricant de palettes", "Fabricant de caisses en bois", "Fabricant de jouets en bois", "Fabricant d'objets décoratifs", "Fabricant de sculptures", "Fabricant de cadres photo", "Fabricant de lampes artisanales", "Fabricant de lustres", "Fabricant de décorations murales", "Fabricant de miroirs", "Fabricant de statues", "Fabricant de fontaines", "Fabricant de pots de fleurs", "Fabricant de jardinières", "Fleuriste artisanal", "Paysagiste", "Jardinier", "Élagueur", "Pépiniériste", "Horticulteur", "Maraîcher", "Arboriculteur", "Producteur de fleurs", "Producteur de plantes médicinales", "Producteur de champignons", "Fabricant de compost", "Fabricant de terreau", "Fabricant de clôtures", "Constructeur de puits", "Foreur de puits", "Constructeur de citernes", "Installateur de pompes", "Installateur de panneaux solaires artisanaux", "Installateur d'antennes", "Réparateur de téléviseurs", "Réparateur de radios", "Réparateur d'ordinateurs", "Réparateur de téléphones", "Réparateur d'imprimantes", "Réparateur d'électroménagers", "Réparateur de climatiseurs", "Réparateur de réfrigérateurs", "Réparateur de machines à laver", "Réparateur de ventilateurs", "Réparateur de générateurs", "Réparateur de motos", "Réparateur de vélos", "Réparateur d'automobiles", "Carrossier", "Tôlier automobile", "Peintre automobile", "Vulcanisateur", "Monteur de pneus", "Mécanicien diesel", "Mécanicien essence", "Électricien automobile", "Climaticien automobile", "Réparateur de boîtes de vitesses", "Réparateur de moteurs", "Réparateur de tracteurs", "Réparateur de machines agricoles", "Réparateur de bateaux", "Constructeur de pirogues", "Constructeur de remorques", "Fabricant de pièces métalliques", "Fabricant de clôtures métalliques", "Fabricant de portails", "Fabricant de grilles", "Fabricant de rampes", "Fabricant de citernes métalliques", "Fabricant de réservoirs", "Fabricant de silos", "Fabricant d'enseignes", "Fabricant de panneaux publicitaires", "Calligraphe", "Peintre d'enseignes", "Décorateur", "Décorateur d'intérieur", "Restaurateur d'œuvres d'art", "Restaurateur de tableaux", "Restaurateur de sculptures", "Restaurateur de livres anciens", "Relieur", "Imprimeur artisanal", "Typographe", "Fabricant de papier artisanal", "Fabricant de cahiers", "Fabricant d'enveloppes", "Fabricant de cartes artisanales", "Fabricant de tampons", "Fabricant de cachets", "Fabricant de sceaux", "Fabricant de trophées", "Fabricant de médailles", "Fabricant de plaques signalétiques", "Fabricant de tam-tams", "Fabricant de djembés", "Fabricant de balafons", "Fabricant de flûtes", "Fabricant d'instruments traditionnels", "Fabricant de tambours", "Fabricant de maracas", "Fabricant de xylophones", "Fabricant de bijoux fantaisie", "Fabricant de perles", "Fabricant d'accessoires de mode", "Fabricant de lunettes artisanales", "Fabricant de montres artisanales", "Fabricant de porte-clés", "Fabricant de porte-monnaie", "Fabricant de portefeuilles", "Fabricant de boîtes cadeaux", "Fabricant de coffrets", "Fabricant de jouets artisanaux", "Fabricant de poupées", "Fabricant de figurines", "Fabricant de maquettes", "Fabricant de cerfs-volants", "Fabricant de jeux de société artisanaux", "Fabricant de puzzles", "Fabricant d'articles religieux", "Fabricant de croix", "Fabricant de statues religieuses", "Fabricant de chapelets", "Fabricant de bougeoirs", "Fabricant d'autels", "Fabricant de masques traditionnels", "Fabricant d'objets culturels", "Fabricant de souvenirs touristiques", "Fabricant d'articles en cuir", "Fabricant d'articles en cuivre", "Fabricant d'articles en aluminium", "Fabricant d'articles en inox", "Fabricant d'articles en verre", "Fabricant d'articles en pierre", "Fabricant d'articles en argile", "Fabricant d'articles en bambou", "Fabricant d'articles en rotin", "Fabricant d'articles en osier", "Fabricant d'articles en fibres naturelles", "Fabricant d'articles recyclés", "Artisan recycleur", "Créateur d'objets écologiques", "Fabricant de mobilier urbain", "Fabricant de bancs publics", "Fabricant de pergolas", "Fabricant d'abris de jardin", "Fabricant de kiosques", "Constructeur de cases traditionnelles", "Constructeur de maisons en terre", "Constructeur de maisons en bois", "Constructeur de maisons écologiques", "Constructeur de fours artisanaux", "Fabricant de briques", "Fabricant de tuiles", "Fabricant de pavés", "Fabricant de blocs de béton", "Fabricant de béton décoratif", "Fabricant de ciment artisanal", "Fabricant de chaux", "Fabricant de plâtre", "Fabricant de moules artisanaux", "Fabricant de filets de pêche", "Fabricant de cannes à pêche", "Fabricant de cages d'élevage", "Fabricant de ruches", "Fabricant de mangeoires", "Fabricant d'abreuvoirs", "Fabricant d'équipements agricoles", "Fabricant de brouettes", "Fabricant de charrues", "Fabricant de houes", "Fabricant de machettes", "Fabricant de couteaux artisanaux", "Fabricant de haches", "Fabricant de pelles", "Fabricant de râteaux", "Fabricant d'outils manuels", "Fabricant d'objets personnalisés", "Graveur laser artisanal", "Découpeur CNC artisanal", "Imprimeur 3D artisanal", "Artisan numérique", "Médecin généraliste", "Médecin spécialiste", "Chirurgien", "Cardiologue", "Neurologue", "Dermatologue", "Pédiatre", "Gynécologue", "Obstétricien", "Psychiatre", "Psychologue", "Dentiste", "Orthodontiste", "Pharmacien", "Infirmier", "Infirmière", "Sage-femme", "Kinésithérapeute", "Ostéopathe", "Chiropracteur", "Orthophoniste", "Ergothérapeute", "Opticien", "Ophtalmologue", "Audioprothésiste", "Nutritionniste", "Diététicien", "Biologiste médical", "Radiologue", "Anesthésiste", "Urgentiste", "Oncologue", "Pneumologue", "Gastro-entérologue", "Néphrologue", "Endocrinologue", "Rhumatologue", "Urologue", "Infectiologue", "Gériatre", "Vétérinaire", "Assistant médical", "Technicien de laboratoire", "Technicien en radiologie", "Ambulancier", "Aide-soignant", "Responsable hospitalier", "Directeur d'hôpital", "Responsable qualité santé", "Épidémiologiste", "Avocat", "Notaire", "Huissier de justice", "Magistrat", "Juge", "Procureur", "Greffier", "Juriste", "Conseiller juridique", "Fiscaliste", "Médiateur", "Arbitre", "Commissaire de justice", "Expert judiciaire", "Consultant juridique", "Responsable conformité", "Responsable RGPD", "Officier de police judiciaire", "Enquêteur privé", "Criminologue", "Architecte", "Architecte d'intérieur", "Urbaniste", "Géomètre", "Géomètre-expert", "Ingénieur civil", "Ingénieur en bâtiment", "Conducteur de travaux", "Chef de chantier", "Économiste de la construction", "Dessinateur industriel", "Dessinateur bâtiment", "BIM Manager", "Topographe", "Ingénieur structure", "Ingénieur géotechnique", "Ingénieur hydraulique", "Ingénieur environnement", "Consultant en construction", "Expert immobilier", "Développeur web", "Développeur Front-End", "Développeur Back-End", "Développeur Full Stack", "Développeur Mobile", "Développeur Android", "Développeur iOS", "Développeur Logiciel", "Développeur Jeux vidéo", "Ingénieur logiciel", "Architecte logiciel", "Architecte cloud", "Administrateur système", "Administrateur réseau", "Administrateur bases de données", "DevOps Engineer", "Site Reliability Engineer", "Ingénieur cloud", "Data Scientist", "Data Analyst", "Data Engineer", "Machine Learning Engineer", "Ingénieur IA", "Prompt Engineer", "Chercheur en intelligence artificielle", "Analyste cybersécurité", "Pentester", "Hacker éthique", "Consultant cybersécurité", "RSSI", "Analyste SOC", "Expert blockchain", "Développeur blockchain", "Administrateur Linux", "Administrateur Windows", "Testeur logiciel", "QA Engineer", "Product Manager", "Product Owner", "Scrum Master", "Chef de projet informatique", "Consultant ERP", "Consultant SAP", "Consultant CRM", "UX Designer", "UI Designer", "Web Designer", "Graphiste", "Motion Designer", "Animateur 2D", "Animateur 3D", "Monteur vidéo", "Réalisateur", "Directeur artistique", "Photographe", "Vidéaste", "Community Manager", "Social Media Manager", "Responsable marketing", "Directeur marketing", "Responsable communication", "Directeur communication", "Chargé de communication", "Consultant SEO", "Consultant SEA", "Consultant SEM", "Copywriter", "Rédacteur web", "Journaliste", "Reporter", "Présentateur TV", "Présentateur radio", "Attaché de presse", "Responsable événementiel", "Organisateur d'événements", "Brand Manager", "Responsable e-commerce", "Growth Hacker", "Spécialiste email marketing", "Responsable acquisition", "Responsable CRM", "Analyste marketing", "Chef de produit", "Commercial", "Ingénieur commercial", "Directeur commercial", "Responsable des ventes", "Account Manager", "Business Developer", "Responsable grands comptes", "Conseiller clientèle", "Téléconseiller", "Négociateur immobilier", "Agent immobilier", "Courtier immobilier", "Expert immobilier", "Gestionnaire de patrimoine", "Conseiller financier", "Analyste financier", "Contrôleur de gestion", "Comptable", "Expert-comptable", "Auditeur", "Commissaire aux comptes", "Trésorier", "Directeur financier", "Gestionnaire de paie", "Responsable paie", "Fiscaliste d'entreprise", "Analyste crédit", "Banquier", "Conseiller bancaire", "Gestionnaire de portefeuille", "Trader", "Courtier en bourse", "Gestionnaire d'actifs", "Actuaire", "Économiste", "Statisticien", "Analyste économique", "Responsable RH", "Directeur des ressources humaines", "Chargé de recrutement", "Talent Acquisition Specialist", "Responsable formation", "Coach professionnel", "Consultant RH", "Gestionnaire RH", "Responsable paie RH", "Psychologue du travail", "Responsable QVT", "Responsable diversité", "Enseignant", "Professeur des écoles", "Professeur de collège", "Professeur de lycée", "Professeur d'université", "Maître de conférences", "Formateur", "Chercheur", "Scientifique", "Physicien", "Chimiste", "Mathématicien", "Astronome", "Géologue", "Océanographe", "Climatologue", "Archéologue", "Historien", "Sociologue", "Anthropologue", "Linguiste", "Traducteur", "Interprète", "Bibliothécaire", "Documentaliste", "Conservateur de musée", "Archiviste", "Ingénieur mécanique", "Ingénieur électrique", "Ingénieur électronique", "Ingénieur industriel", "Ingénieur automobile", "Ingénieur aéronautique", "Ingénieur spatial", "Ingénieur robotique", "Ingénieur matériaux", "Ingénieur énergie", "Ingénieur nucléaire", "Ingénieur pétrolier", "Ingénieur minier", "Ingénieur chimiste", "Ingénieur qualité", "Ingénieur production", "Responsable maintenance", "Responsable logistique", "Supply Chain Manager", "Logisticien", "Acheteur", "Responsable achats", "Planificateur de production", "Analyste supply chain", "Responsable transport", "Responsable entrepôt", "Responsable exploitation", "Directeur des opérations", "Pilote de ligne", "Pilote d'hélicoptère", "Contrôleur aérien", "Hôtesse de l'air", "Steward", "Capitaine de navire", "Officier de marine marchande", "Logisticien maritime", "Douanier", "Agent de transit", "Agent portuaire", "Conducteur de train", "Régulateur ferroviaire", "Officier de police", "Gendarme", "Militaire", "Officier militaire", "Pompier", "Sapeur-pompier", "Garde du corps", "Agent de sécurité", "Responsable sécurité", "Agent pénitentiaire", "Garde forestier", "Garde-côte", "Diplomate", "Ambassadeur", "Consul", "Fonctionnaire", "Administrateur territorial", "Préfet", "Sous-préfet", "Inspecteur des impôts", "Contrôleur fiscal", "Inspecteur du travail", "Inspecteur des douanes", "Inspecteur de police", "Conseiller municipal", "Directeur général des services", "Consultant en management", "Consultant en stratégie", "Consultant en transformation digitale", "Consultant qualité", "Consultant environnement", "Consultant ISO", "Consultant Lean", "Consultant Six Sigma", "Coach agile", "Chef de projet", "PMO", "Directeur de programme", "Directeur de projet", "Entrepreneur", "Chef d'entreprise", "Fondateur de startup", "Investisseur", "Business Angel", "Capital-risqueur", "Franchiseur", "Franchisé", "Expert en innovation", "Responsable RSE", "Responsable développement durable", "Responsable qualité", "Responsable HSE", "Auditeur qualité", "Responsable conformité", "Analyste risques", "Risk Manager", "Responsable assurance", "Courtier en assurances", "Conseiller en assurances", "Gestionnaire de sinistres", "Actuaire assurance", "Agent de voyage", "Conseiller en voyages", "Guide touristique", "Directeur d'hôtel", "Réceptionniste", "Concierge d'hôtel", "Revenue Manager", "Responsable restauration", "Chef cuisinier", "Sommelier", "Responsable hébergement", "Responsable tourisme", "Organisateur de séjours", "Directeur de centre de loisirs", "Éducateur spécialisé", "Assistant social", "Conseiller d'orientation", "Conseiller en insertion professionnelle", "Médiateur social", "Animateur socioculturel", "Responsable ONG", "Humanitaire", "Coordinateur de projet humanitaire", "Chargé de mission", "Responsable de programme", "Expert en développement international", "Consultant en coopération internationale", "Analyste politique", "Conseiller politique", "Analyste géopolitique", "Écrivain", "Romancier", "Scénariste", "Dramaturge", "Critique d'art", "Critique de cinéma", "Critique littéraire", "Compositeur", "Chef d'orchestre", "Producteur musical", "Producteur audiovisuel", "Directeur de casting", "Agent artistique", "Influence Manager", "Créateur de contenu", "Podcasteur", "Conférencier", "Coach de vie", "Mentor professionnel", "Expert en intelligence économique", "Analyste veille stratégique", "Responsable innovation", "Responsable transformation", "Directeur général", "Directeur exécutif", "Président-directeur général", "Secrétaire général", "Assistant de direction", "Office Manager", "Responsable administratif", "Directeur administratif et financier", "Contrôleur interne", "Responsable audit interne", "Responsable gouvernance", "Expert en marchés publics", "Consultant en appels d'offres", "Analyste ESG", "Responsable relations investisseurs", "Conseiller en propriété intellectuelle", "Mandataire en brevets", "Expert en cybersurveillance", "Analyste fraude", "Responsable antifraude", "Consultant FinTech", "Consultant LegalTech", "Consultant HealthTech", "Consultant EdTech", "Consultant GreenTech", "Consultant GovTech", "Consultant MarTech", "Consultant PropTech", "Consultant InsurTech", "Consultant AgriTech", "Consultant en intelligence d'affaires", "Analyste BI", "Développeur Power BI", "Développeur Tableau", "Développeur Qlik", "Administrateur Salesforce", "Développeur Salesforce", "Consultant Salesforce", "Administrateur Microsoft 365", "Administrateur Google Workspace", "Consultant Microsoft Dynamics", "Développeur Dynamics 365", "Consultant Oracle", "Administrateur Oracle", "Développeur Oracle", "Consultant Odoo", "Développeur Odoo", "Administrateur Odoo", "Consultant Zoho", "Développeur Zoho", "Consultant HubSpot", "Administrateur HubSpot", "Consultant ServiceNow", "Développeur ServiceNow", "Consultant Workday", "Consultant SuccessFactors", "Consultant Sage", "Consultant Cegid", "Consultant EBP", "Architecte d'entreprise", "Urbaniste des systèmes d'information", "Analyste fonctionnel", "Analyste métier", "Business Analyst", "Analyste PMO", "Coordinateur de projet", "Responsable portefeuille projets", "Consultant en gouvernance IT", "Responsable transformation numérique", "Consultant Open Data", "Data Steward", "Data Governance Manager", "Data Protection Officer", "Responsable confidentialité", "Responsable sécurité informatique", "Responsable infrastructure IT", "Responsable support informatique", "Technicien support informatique", "Helpdesk", "Technicien réseaux", "Technicien télécom", "Ingénieur télécommunications", "Architecte télécom", "Consultant IoT", "Développeur IoT", "Ingénieur IoT", "Développeur embarqué", "Ingénieur systèmes embarqués", "Ingénieur FPGA", "Ingénieur microélectronique", "Ingénieur semi-conducteurs", "Ingénieur vision industrielle", "Ingénieur automatisme", "Automaticien", "Roboticien", "Programmeur PLC", "Programmeur SCADA", "Ingénieur instrumentation", "Ingénieur contrôle-commande", "Responsable méthodes", "Ingénieur procédés", "Responsable industrialisation", "Technicien méthodes", "Responsable amélioration continue", "Black Belt Lean Six Sigma", "Green Belt Lean Six Sigma", "Responsable excellence opérationnelle", "Responsable planification", "Ordonnanceur", "Prévisionniste de la demande", "Responsable approvisionnement", "Gestionnaire de stocks", "Responsable inventaire", "Coordinateur logistique", "Responsable export", "Responsable import", "Déclarant en douane", "Affréteur", "Responsable flotte", "Fleet Manager", "Gestionnaire de parc automobile", "Responsable aviation", "Ingénieur ferroviaire", "Ingénieur naval", "Architecte naval", "Officier mécanicien", "Expert maritime", "Responsable portuaire", "Responsable aéroportuaire", "Analyste transport", "Économiste des transports", "Conseiller en mobilité", "Expert mobilité urbaine", "Urbaniste transport", "Responsable énergie", "Energy Manager", "Auditeur énergétique", "Conseiller en efficacité énergétique", "Ingénieur solaire", "Ingénieur éolien", "Ingénieur biomasse", "Ingénieur hydrogène", "Consultant carbone", "Auditeur carbone", "Responsable climat", "Responsable biodiversité", "Écologue", "Hydrologue", "Ingénieur forestier", "Ingénieur agronome", "Agronome", "Zootechnicien", "Ingénieur agroalimentaire", "Responsable qualité alimentaire", "Responsable sécurité alimentaire", "Microbiologiste", "Toxicologue", "Généticien", "Bioinformaticien", "Biostatisticien", "Chercheur en biotechnologie", "Ingénieur biomédical", "Physicien médical", "Attaché de recherche clinique", "Coordinateur d'essais cliniques", "Responsable pharmacovigilance", "Affaires réglementaires", "Responsable affaires médicales", "Medical Science Liaison", "Pharmacologue", "Virologue", "Immunologiste", "Parasitologue", "Entomologiste", "Botaniste", "Zoologiste", "Paléontologue", "Géophysicien", "Sismologue", "Volcanologue", "Cartographe", "Spécialiste SIG", "Analyste géospatial", "Télédétection", "Météorologue", "Prévisionniste météo", "Océanologue", "Hydrogéologue", "Expert catastrophe naturelle", "Conseiller diplomatique", "Analyste défense", "Analyste renseignement", "Officier de renseignement", "Expert cybersouveraineté", "Conseiller en sécurité nationale", "Responsable protection civile", "Coordinateur gestion de crise", "Négociateur international", "Responsable affaires publiques", "Lobbyiste", "Chargé des relations institutionnelles", "Conseiller parlementaire", "Administrateur parlementaire", "Secrétaire de mairie", "Directeur de cabinet", "Conseiller ministériel", "Responsable marchés publics", "Gestionnaire des subventions", "Responsable coopération internationale", "Consultant ONU", "Expert Banque mondiale", "Expert Union africaine", "Expert Union européenne", "Consultant développement économique", "Consultant microfinance", "Responsable incubateur", "Conseiller en entrepreneuriat", "Consultant innovation sociale", "Analyste investissement", "Gestionnaire de fonds", "Analyste M&A", "Responsable fusions-acquisitions", "Évaluateur d'entreprises", "Conseiller en transmission d'entreprise", "Responsable capital-investissement", "Gestionnaire de fortune", "Family Office Manager", "Responsable conformité bancaire", "Analyste AML", "Analyste KYC", "Responsable lutte contre le blanchiment", "Responsable contrôle permanent", "Responsable recouvrement", "Gestionnaire contentieux", "Responsable service client", "Customer Success Manager", "Customer Experience Manager", "Responsable fidélisation", "Responsable relation partenaires", "Gestionnaire de communauté professionnelle", "Responsable développement international", "Responsable franchise", "Responsable réseau", "Directeur régional", "Directeur de filiale", "Directeur pays", "Directeur innovation", "Chief Technology Officer (CTO)", "Chief Information Officer (CIO)", "Chief Information Security Officer (CISO)", "Chief Marketing Officer (CMO)", "Chief Financial Officer (CFO)", "Chief Operating Officer (COO)", "Chief Human Resources Officer (CHRO)", "Chief Data Officer (CDO)", "Chief Digital Officer (CDO)", "Chief Product Officer (CPO)", "Chief Revenue Officer (CRO)", "Chief Compliance Officer (CCO)", "Chief Sustainability Officer (CSO)", "Chief Legal Officer (CLO)", "Secrétaire de direction", "Assistant exécutif", "Coordinateur administratif", "Responsable des services généraux", "Gestionnaire immobilier d'entreprise", "Facility Manager", "Office Coordinator", "Responsable archives", "Gestionnaire documentaire", "Responsable knowledge management"
  ]

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('plomber') || n.includes('serrur') || n.includes('mécanic') || n.includes('réparat')) return Wrench
    if (n.includes('électric') || n.includes('énerg') || n.includes('soud')) return Zap
    if (n.includes('maçon') || n.includes('charpent') || n.includes('menuis') || n.includes('bâtiment') || n.includes('construct')) return Hammer
    if (n.includes('peintre') || n.includes('décorat')) return Paintbrush
    if (n.includes('médecin') || n.includes('infirm') || n.includes('santé') || n.includes('dentist') || n.includes('pharmac')) return Stethoscope
    if (n.includes('avocat') || n.includes('jurid') || n.includes('notair') || n.includes('juge')) return Scale
    if (n.includes('enseign') || n.includes('profess') || n.includes('formateur')) return GraduationCap
    if (n.includes('cuisin') || n.includes('boulang') || n.includes('restaur') || n.includes('traiteur')) return Utensils
    if (n.includes('photo') || n.includes('vidéo') || n.includes('graphist')) return Camera
    if (n.includes('inform') || n.includes('développ') || n.includes('web') || n.includes('logiciel') || n.includes('data')) return Laptop
    if (n.includes('transport') || n.includes('chauffeur') || n.includes('livreur') || n.includes('logist')) return Truck
    if (n.includes('beauté') || n.includes('coiff') || n.includes('esthét')) return ScissorsIcon
    if (n.includes('comptab') || n.includes('financ') || n.includes('banqu') || n.includes('assur')) return BriefcaseIcon
    if (n.includes('jardin') || n.includes('paysag') || n.includes('agricol')) return HomeIcon
    if (n.includes('musiqu') || n.includes('instrument')) return Music
    return Briefcase
  }

  const marqueeCategories = [
    { id: 'all', name: 'Tous les métiers', icon: Home },
    ...categoriesMetiers.map(cat => ({
      id: cat,
      name: cat,
      icon: getIconForCategory(cat)
    }))
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

      // ✅ CORRECTION CRITIQUE : Redirige UNIQUEMENT si le rôle est explicitement 'pro'
      // Cela empêche la boucle de redirection infinie si le rôle est null (anciens comptes)
      if (profileData.role === 'pro') {
        console.warn('Ce compte est un Pro. Redirection vers le dashboard Pro...')
        router.push('/dashboard/pro')
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
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (servicesError) {
        console.error('Erreur services:', servicesError)
        setServices([])
        return
      }

      if (!servicesData || servicesData.length === 0) {
        setServices([])
        return
      }

      const proIds = [...new Set(servicesData.map(s => s.pro_id))]

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, is_available, city')
        .in('id', proIds)

      if (profilesError) {
        console.error('Erreur profils:', profilesError)
      }

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
          is_available: p.is_available !== false, // Fallback sécurisé à true si la colonne est absente
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

      setServices(combinedServices)
    } catch (error) {
      console.error('Erreur chargement services:', error)
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
      console.error('Erreur historique:', error)
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
        .select('id, full_name, specialty, city, phone, rating, plan, total_reviews, is_verified, is_available, avatar_url')
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
        is_available: p.is_available !== false,
        avatar_url: p.avatar_url || undefined
      }))
      setFavorites(formatted)
    } catch (error) {
      console.error('Erreur favoris:', error)
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

    // ✅ TRI PUISSANT ET STABLE
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
      if (!file || !profile) return
      if (file.size > 5 * 1024 * 1024) { alert('La photo doit faire moins de 5MB'); return }
      if (!file.type.startsWith('image/')) { alert('Veuillez sélectionner une image valide'); return }

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { cacheControl: '3600', upsert: true })
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const { error: updateError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id)
      if (updateError) throw updateError
      
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('✅ Photo de profil mise à jour')
    } catch (error) { 
      alert('❌ Erreur upload photo') 
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

  const contactWhatsApp = async (service: Service) => {
    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) phone = '+' + phone
      else if (phone.startsWith('9') || phone.startsWith('7')) phone = '+228' + phone
    }

    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur JobConnect. Pouvez-vous me donner plus d'informations ?`)

    if (profile) {
      try {
        await supabase.from('contact_history').insert({
          client_id: profile.id,
          pro_id: pro.id,
          status: 'contacted',
          contact_method: 'whatsapp'
        })
      } catch (err) {
        console.error('Erreur historique:', err)
      }
    }

    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank')
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
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 60s linear infinite;
        }
      `}</style>

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
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover object-center" />
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

        <div className="border-t border-slate-200 bg-slate-50 overflow-hidden relative">
          <div className="flex animate-marquee py-3 whitespace-nowrap">
            {[...marqueeCategories, ...marqueeCategories].map((cat, index) => {
              const Icon = cat.icon
              return (
                <div
                  key={`${cat.id}-${index}`}
                  className="mx-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 border border-slate-200 bg-white text-slate-700 flex-shrink-0 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  {cat.name}
                </div>
              )
            })}
          </div>
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
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
                          📍 Toutes les localités
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
                          <div className="px-4 py-2 text-sm text-slate-500">Aucune localité trouvée</div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {selectedCity !== 'all' && (
                    <button onClick={() => { setSelectedCity('all'); setCitySearchQuery('') }} className="ml-2 text-xs text-red-600 hover:text-red-700">✕</button>
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
                    
                    {/* ✅ IMAGE PARFAITEMENT CARRÉE ET CENTRÉE */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
                      {service.profiles.avatar_url ? (
                        <img 
                          src={service.profiles.avatar_url} 
                          alt={service.profiles.full_name} 
                          className="w-full h-full object-cover object-center relative z-10 transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                          <div className="text-8xl opacity-50">👤</div>
                        </div>
                      )}
                      
                      {service.profiles.is_verified && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-20 backdrop-blur-sm border border-white/20">
                          <Shield className="w-3.5 h-3.5" />Vérifié
                        </div>
                      )}

                      {/* ✅ BADGE INDISPONIBLE SI NÉCESSAIRE */}
                      {!service.profiles.is_available && (
                        <div className="absolute top-3 right-3 bg-slate-800/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-20 backdrop-blur-sm border border-white/20">
                          <Pause className="w-3.5 h-3.5" /> Indisponible
                        </div>
                      )}
                      
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
                          is_available: service.profiles.is_available,
                          avatar_url: service.profiles.avatar_url || undefined
                        })} 
                        className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110 z-20"
                      >
                        <Heart className={`w-4.5 h-4.5 ${favorites.some(f => f.id === service.profiles.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                      </button>
                    </div>
                    
                    <div className="p-4 flex flex-col">
                      <div className="flex items-start gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <h3 className="font-bold text-slate-900 text-base line-clamp-2 flex-1">{service.title}</h3>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{service.description}</p>
                      
                      {/* ✅ NOM AVEC SYMBOLE DE SÉCURITÉ COLORÉ À CÔTÉ */}
                      <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md overflow-hidden">
                          {service.profiles.avatar_url ? (
                            <img src={service.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            service.profiles.full_name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-900 truncate block">
                              {service.profiles.full_name}
                            </span>
                            <PlanBadge plan={service.profiles.plan} />
                          </div>
                          {service.profiles.specialty && (
                            <span className="text-xs text-slate-500 truncate block">{service.profiles.specialty}</span>
                          )}
                        </div>
                      </div>
                      
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
                      
                      {/* ✅ PRIX ET BOUTON PARFAITEMENT ALIGNÉS SUR LA MÊME LIGNE */}
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-2.5 rounded-xl border border-indigo-100">
                          <span className="text-[10px] text-slate-600 font-semibold block">Prix</span>
                          <span className="text-lg font-black text-indigo-600">{service.price}</span>
                        </div>
                        
                        {service.profiles.is_available ? (
                          <button 
                            onClick={() => contactWhatsApp(service)} 
                            className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contacter
                          </button>
                        ) : (
                          <div className="flex-1 py-2.5 bg-slate-200 text-slate-500 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed">
                            <Pause className="w-4 h-4" />
                            Indisponible
                          </div>
                        )}
                      </div>
                      
                      <Link href={`/pro/${service.profiles.id}`} className="w-full py-2 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all">
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
                          <img src={item.avatar} alt="" className="w-full h-full object-cover object-center" />
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
                        item.contact_method === 'whatsapp' ? 'bg-green-100 text-green-700' : 
                        item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
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
                  <div key={pro.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                    
                    {/* ✅ IMAGE PARFAITEMENT CARRÉE ET CENTRÉE DANS LES FAVORIS */}
                    <div className="aspect-square bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden relative">
                      {pro.avatar_url ? (
                        <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover object-center" />
                      ) : (
                        <span className="text-6xl">👤</span>
                      )}
                      {pro.is_verified && (
                        <div className="absolute top-3 left-3 bg-blue-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm border border-white/20">
                          <Shield className="w-3 h-3" /> Vérifié
                        </div>
                      )}
                      {!pro.is_available && (
                        <div className="absolute top-3 right-3 bg-slate-800/90 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm border border-white/20">
                          <Pause className="w-3 h-3" /> Indisponible
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center mb-2 gap-1.5">
                        <h3 className="font-bold text-slate-900 truncate flex-1">{pro.full_name}</h3>
                        <PlanBadge plan={pro.plan} />
                      </div>
                      <p className="text-sm text-slate-600 mb-3 truncate">{pro.specialty}</p>
                      <div className="space-y-2">
                        {pro.is_available ? (
                          <button 
                            onClick={() => {
                              const serviceData: Service = {
                                id: pro.id, title: pro.specialty, description: '', category: '', price: '',
                                city: pro.city, pro_id: pro.id, created_at: '',
                                profiles: { ...pro, avatar_url: pro.avatar_url || null }
                              }
                              contactWhatsApp(serviceData)
                            }}
                            className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
                          >
                            <MessageCircle className="w-4 h-4" /> WhatsApp
                          </button>
                        ) : (
                          <div className="w-full py-2.5 bg-slate-200 text-slate-500 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                            <Pause className="w-4 h-4" /> Indisponible
                          </div>
                        )}
                        <Link href={`/pro/${pro.id}`} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition">
                          <ExternalLink className="w-4 h-4" /> Voir le profil
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
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 shadow-lg ring-4 ring-indigo-50 flex-shrink-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                      {profile?.full_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all font-semibold flex items-center gap-2 w-fit">
                    <Upload className="w-4 h-4" /> Changer la photo
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploadingPhoto} />
                  </label>
                  {uploadingPhoto && (
                    <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mt-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Upload en cours...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-slate-900 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label>
                  <input type="text" value={settings.fullName} onChange={(e) => setSettings({...settings, fullName: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input type="email" value={settings.email} disabled className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone</label>
                  <input type="tel" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ville</label>
                  <input type="text" value={settings.city} onChange={(e) => setSettings({...settings, city: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                </div>
              </div>
            </div>
            
            <button onClick={saveSettings} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all shadow-lg shadow-indigo-200">
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