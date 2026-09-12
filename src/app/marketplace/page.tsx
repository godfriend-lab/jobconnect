// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import VerifiedBadge from '@/components/VerifiedBadge'

import {
  Search,
  MapPin,
  Star,
  Heart,
  Loader2,
  AlertCircle,
  Eye,
  MessageCircle,
  User,
  Pause,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ChevronDown,
  RefreshCw,
} from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

interface Profile {
  id: string
  full_name: string
  phone: string | null
  avatar_url: string | null
  specialty: string | null
  rating: number | null
  total_reviews: number | null
  plan: string | null
  is_verified: boolean | null
  verified_at: string | null
  is_available: boolean | null
  city: string | null
}

interface Service {
  id: string
  title: string
  description: string | null
  category: string | null
  price: string | number | null
  city: string | null
  pro_id: string
  created_at: string
  is_active?: boolean
  profiles: Profile
}

/* =========================================================
   CONFIGURATION
========================================================= */

const PLAN_PRIORITY: Record<string, number> = {
  premium: 4,
  business: 3,
  starter: 2,
  gratuit: 1,
}

const CITIES = [
  'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Bè', 'Tokoin', 'Akodesséwa',
  'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué', 'Tsévié', 'Kpalimé',
  'Sokodé', 'Kara', 'Dapaong',
]

const ALL_METIERS = [
  'Tous les métiers', 'Maçon', 'Carreleur', 'Plombier', 'Électricien bâtiment',
  'Peintre en bâtiment', 'Charpentier', 'Couvreur', 'Menuisier', 'Ébéniste',
  'Ferronnier', 'Métallier', 'Soudeur', 'Serrurier', 'Vitrier', 'Plâtrier',
  'Plaquiste', 'Staffeur', 'Façadier', 'Tailleur de pierre', 'Marbrier',
  'Poseur de parquet', 'Poseur de moquette', 'Poseur de revêtements muraux',
  'Étancheur', 'Terrassier', 'Paveur', 'Grutier', 'Conducteur d’engins de chantier',
  'Coffreur', 'Ferrailleur', 'Bancheur', 'Conducteur de travaux bâtiment',
  'Installateur sanitaire', 'Installateur de chauffage', 'Frigoriste', 'Climaticien',
  'Installateur photovoltaïque', 'Installateur d’antennes', 'Installateur de portes',
  'Installateur de fenêtres', 'Installateur de stores', 'Poseur de vérandas',
  'Poseur de cuisines', 'Poseur de salles de bains', 'Jardinier', 'Paysagiste',
  'Élagueur', 'Arboriste', 'Pépiniériste', 'Horticulteur', 'Maraîcher', 'Floriculteur',
  'Fleuriste', 'Apiculteur', 'Éleveur de volailles', 'Éleveur de porcs', 'Éleveur de bovins',
  'Éleveur de chèvres', 'Éleveur de moutons', 'Éleveur de lapins', 'Éleveur de poissons',
  'Pisciculteur', 'Pêcheur professionnel', 'Berger', 'Bouvier', 'Vacher', 'Conducteur de tracteur',
  'Ouvrier agricole', 'Irrigateur agricole', 'Greffeur d’arbres', 'Producteur de plantes',
  'Producteur de champignons', 'Producteur de miel', 'Producteur de cacao', 'Producteur de café',
  'Meunier', 'Boulanger', 'Pâtissier', 'Chocolatier', 'Confiseur', 'Glacier', 'Biscuitier',
  'Traiteur', 'Charcutier', 'Boucher', 'Poissonnier', 'Fromager', 'Torréfacteur de café',
  'Fabricant de jus', 'Fabricant de sirops', 'Fabricant de confitures', 'Fabricant de sauces',
  'Fabricant de pâtes alimentaires', 'Fabricant de farine', 'Fabricant d’huile alimentaire',
  'Fabricant de beurre', 'Fabricant de yaourt', 'Cuisinier', 'Grillardin', 'Rôtisseur',
  'Pizzaïolo', 'Crêpier', 'Préparateur de plats cuisinés', 'Transformateur de manioc',
  'Transformateur de maïs', 'Transformateur de soja', 'Transformateur de cacao',
  'Transformateur de café', 'Transformateur d’arachides', 'Transformateur de céréales',
  'Fabricant de gari', 'Fabricant de tapioca', 'Fabricant de chips de manioc',
  'Fabricant de chips de banane', 'Fabricant de pâte de tomate', 'Fabricant de jus de fruits',
  'Fabricant de nectar de fruits', 'Fabricant de boissons non alcoolisées', 'Tailleur',
  'Couturier', 'Modéliste', 'Styliste', 'Brodeur', 'Tricoteur', 'Crocheteur', 'Tisserand',
  'Teinturier textile', 'Sérigraphe textile', 'Imprimeur textile', 'Fabricant de vêtements',
  'Fabricant de chemises', 'Fabricant de pantalons', 'Fabricant de robes', 'Fabricant de vestes',
  'Fabricant de costumes', 'Fabricant d’uniformes', 'Fabricant de vêtements traditionnels',
  'Fabricant de pagnes', 'Fabricant d’écharpes', 'Fabricant de foulards', 'Fabricant de chapeaux',
  'Chapelier', 'Fabricant de casquettes', 'Tapissier', 'Garnisseur de meubles', 'Matelassier',
  'Fabricant de matelas', 'Fabricant de chaussures', 'Cordonnier', 'Bottier', 'Maroquinier',
  'Sellier', 'Fabricant de ceintures', 'Fabricant de portefeuilles', 'Fabricant de sacs en cuir',
  'Fabricant de bracelets en cuir', 'Travailleur du cuir', 'Réparateur de chaussures',
  'Réparateur de sacs', 'Artisan du cuir', 'Graveur sur cuir', 'Peintre sur cuir',
  'Embosseur sur cuir', 'Découpeur de cuir', 'Couturier cuir', 'Sellier automobile',
  'Sellier-harnacheur', 'Bourrelier', 'Fabricant de selles', 'Fabricant de harnais', 'Potier',
  'Céramiste', 'Faïencier', 'Modeleur en argile', 'Sculpteur sur argile', 'Sculpteur sur bois',
  'Sculpteur sur pierre', 'Sculpteur sur métal', 'Graveur sur bois', 'Graveur sur métal',
  'Graveur sur verre', 'Graveur sur pierre', 'Bijoutier', 'Joaillier', 'Orfèvre', 'Lapidaire',
  'Sertisseur', 'Horloger', 'Réparateur de montres', 'Réparateur de bijoux',
  'Fabricant de bijoux fantaisie', 'Forgeron', 'Fabricant d’outils agricoles', 'Affûteur',
  'Aiguiseur', 'Mécanicien automobile', 'Mécanicien moto', 'Mécanicien poids lourds',
  'Mécanicien agricole', 'Mécanicien de machines', 'Mécanicien naval', 'Mécanicien cycles',
  'Réparateur de vélos', 'Réparateur de motos', 'Réparateur de voitures', 'Carrossier',
  'Peintre automobile', 'Tôlier automobile', 'Dépanneur automobile', 'Électricien automobile',
  'Électromécanicien', 'Mécatronicien', 'Réparateur de moteurs', 'Réparateur de pompes',
  'Réparateur de groupes électrogènes', 'Réparateur de machines agricoles',
  'Réparateur de machines industrielles', 'Réparateur de matériel de chantier',
  'Réparateur de réfrigérateurs', 'Réparateur de climatiseurs', 'Réparateur de machines à laver',
  'Réparateur de fours', 'Réparateur de cuisinières', 'Réparateur de téléviseurs',
  'Réparateur de radios', 'Réparateur d’appareils électroniques', 'Réparateur de téléphones',
  'Réparateur d’ordinateurs', 'Assembleur d’ordinateurs', 'Technicien électronique',
  'Technicien électromécanique', 'Installateur électrique', 'Monteur de tableaux électriques',
  'Câbleur électrique', 'Électricien industriel', 'Électricien naval', 'Installateur domotique',
  'Installateur de systèmes de sécurité', 'Installateur de vidéosurveillance',
  'Installateur d’alarmes', 'Installateur de contrôle d’accès', 'Technicien de maintenance électrique',
  'Technicien de maintenance industrielle', 'Monteur mécanique', 'Assembleur mécanique',
  'Ajusteur industriel', 'Chaudronnier', 'Tuyauteur', 'Plieur de métal', 'Découpeur de métal',
  'Découpeur plasma', 'Opérateur de machine-outil', 'Opérateur CNC', 'Perceur industriel',
  'Meuleur', 'Polisseur de métal', 'Sableur', 'Galvaniseur', 'Peintre industriel',
  'Restaurateur de meubles', 'Fabricant de meubles', 'Fabricant de tables', 'Fabricant de chaises',
  'Fabricant de lits', 'Fabricant d’armoires', 'Fabricant de bibliothèques', 'Fabricant de bureaux',
  'Fabricant de portes en bois', 'Fabricant de fenêtres en bois', 'Fabricant d’escaliers',
  'Fabricant de meubles de cuisine', 'Fabricant de meubles de salle de bains',
  'Fabricant de meubles de jardin', 'Fabricant de meubles sur mesure', 'Tourneur sur bois',
  'Marqueteur', 'Vernisseur de meubles', 'Laqueur de meubles', 'Polisseur de bois',
  'Restaurateur de bois', 'Fabricant de jouets en bois', 'Fabricant d’objets en bois',
  'Fabricant d’ustensiles en bois', 'Vannier', 'Tresseur de fibres végétales', 'Tresseur de paniers',
  'Tresseur de nattes', 'Fabricant de paniers', 'Fabricant de corbeilles', 'Fabricant de meubles en rotin',
  'Fabricant de meubles en bambou', 'Artisan du bambou', 'Artisan du raphia', 'Artisan du jonc',
  'Peintre décorateur', 'Peintre muraliste', 'Fresquiste', 'Mosaïste', 'Mosaïste décorateur',
  'Poseur de mosaïque', 'Décorateur de céramique', 'Peintre sur porcelaine', 'Peintre sur verre',
  'Peintre sur céramique', 'Émailleur', 'Verrier', 'Souffleur de verre', 'Vitraliste',
  'Fabricant de vitraux', 'Restaurateur de vitraux', 'Miroitier', 'Fabricant de miroirs',
  'Polisseur de verre', 'Découpeur de verre', 'Tailleur de verre', 'Fabricant de vases en verre',
  'Fabricant d’objets en verre', 'Fabricant de tuiles', 'Tuilier', 'Briquetier', 'Fabricant de briques',
  'Fabricant de blocs en béton', 'Fabricant de pavés', 'Fabricant de bordures', 'Fabricant de béton préfabriqué',
  'Fabricant de pierres artificielles', 'Fabricant de plâtre', 'Fabricant de mortier',
  'Fabricant de peinture artisanale', 'Fabricant de pigments', 'Fabricant d’enduits décoratifs',
  'Fabricant de résines', 'Fabricant de colle artisanale', 'Fabricant de vernis',
  'Fabricant de produits d’entretien', 'Artisan bétonnier', 'Applicateur de stuc', 'Stucateur',
  'Décorateur en stuc', 'Staffeur-ornemaniste', 'Ornemaniste', 'Sculpteur ornemaniste', 'Mouleur',
  'Modeleur', 'Fabricant de moules', 'Mouliste', 'Plâtrier décorateur', 'Staffeur décorateur',
  'Fabricant d’éléments décoratifs', 'Fabricant de colonnes décoratives', 'Fabricant de corniches',
  'Fabricant de rosaces', 'Fabricant de moulures', 'Poseur de moulures', 'Poseur de corniches',
  'Poseur d’ornements', 'Décorateur de plafonds', 'Nettoyeur industriel', 'Nettoyeur de tapis',
  'Nettoyeur de moquettes', 'Nettoyeur de canapés', 'Nettoyeur de matelas', 'Nettoyeur de façades',
  'Nettoyeur haute pression', 'Agent de nettoyage manuel', 'Laveur automobile', 'Préparateur esthétique automobile',
  'Polisseur automobile', 'Detailer automobile', 'Réparateur de pneus', 'Monteur de pneus',
  'Vulcanisateur', 'Réparateur de chambres à air', 'Réparateur de jantes', 'Peintre de jantes',
  'Débosselage automobile', 'Débosseleur', 'Installateur de pare-brise', 'Réparateur de pare-brise',
  'Installateur d’accessoires automobiles', 'Installateur d’attelages', 'Hydraulicien',
  'Pneumaticien industriel', 'Installateur hydraulique', 'Installateur de pompes',
  'Installateur de systèmes d’irrigation', 'Installateur de forage', 'Foreur', 'Puitsier',
  'Constructeur de puits', 'Réparateur de puits', 'Technicien de forage', 'Opérateur de forage',
  'Technicien en énergie solaire', 'Installateur de panneaux solaires', 'Installateur de chauffe-eau solaire',
  'Technicien solaire', 'Monteur de structures solaires', 'Installateur d’éoliennes', 'Technicien éolien',
  'Installateur de batteries solaires', 'Installateur de bornes de recharge', 'Technicien de recharge électrique',
  'Installateur de pompes à chaleur', 'Technicien en climatisation', 'Technicien frigoriste',
  'Réparateur de chambres froides', 'Installateur de chambres froides', 'Constructeur de pirogues',
  'Constructeur de bateaux en bois', 'Charpentier naval', 'Calfat', 'Peintre naval', 'Réparateur de bateaux',
  'Réparateur de moteurs hors-bord', 'Fabricant de pagaies', 'Fabricant de rames', 'Fabricant de filets de pêche',
  'Fabricant de casiers de pêche', 'Fabricant de nasses', 'Réparateur de matériel de pêche', 'Sécheur de poisson',
  'Transformateur de poisson', 'Transformateur de fruits de mer', 'Salaisonnier', 'Producteur de sel artisanal',
  'Imprimeur artisanal', 'Sérigraphe', 'Typographe', 'Relieur', 'Brocheur', 'Fabricant de carnets',
  'Fabricant de cahiers', 'Fabricant d’agendas', 'Fabricant d’albums photo', 'Fabricant de livres artisanaux',
  'Restaurateur de livres', 'Restaurateur de documents', 'Calligraphe', 'Calligraphe décoratif', 'Enlumineur',
  'Fabricant de cartes artisanales', 'Fabricant de cartes de vœux', 'Fabricant d’invitations',
  'Fabricant de faire-part', 'Fabricant de boîtes cadeaux', 'Fabricant de boîtes en carton', 'Cartonnier',
  'Fabricant d’emballages', 'Fabricant de sacs en papier', 'Fabricant d’étiquettes', 'Fabricant de papier artisanal',
  'Papetier', 'Fabricant de papier recyclé', 'Décorateur événementiel', 'Décorateur de mariage',
  'Installateur de décorations', 'Monteur de stands', 'Fabricant de stands', 'Fabricant de kiosques',
  'Fabricant de comptoirs', 'Fabricant de présentoirs', 'Fabricant d’enseignes artisanales', 'Peintre d’enseignes',
  'Lettrier', 'Graveur d’enseignes', 'Fabricant de panneaux publicitaires', 'Fabricant de panneaux en bois',
  'Fabricant de panneaux métalliques', 'Fabricant de lettres en relief', 'Fabricant de lettres lumineuses',
  'Poseur d’enseignes', 'Poseur de panneaux', 'Recycleur de plastique', 'Transformateur de plastique',
  'Fabricant d’objets en plastique recyclé', 'Fabricant de meubles en plastique recyclé',
  'Fabricant de pavés en plastique recyclé', 'Fabricant de briques recyclées', 'Recycleur de verre',
  'Transformateur de verre recyclé', 'Recycleur de métal', 'Transformateur de métal recyclé',
  'Recycleur de papier', 'Transformateur de papier recyclé', 'Fabricant d’objets recyclés',
  'Fabricant de meubles recyclés', 'Fabricant de décoration recyclée', 'Fabricant de bijoux recyclés',
  'Fabricant de sacs recyclés', 'Fabricant de vêtements recyclés', 'Fabricant de jouets recyclés',
  'Artisan récupérateur', 'Collecteur de matériaux recyclables', 'Trieur de déchets recyclables',
  'Transformateur de déchets organiques', 'Composteur', 'Producteur de compost', 'Fabricant d’engrais organiques',
  'Producteur d’engrais naturel', 'Fabricant de terreau', 'Producteur de terreau', 'Producteur de biomasse',
  'Fabricant de charbon écologique', 'Fabricant de biochar', 'Producteur d’aliments pour animaux',
  'Fabricant d’aliments pour volailles', 'Fabricant d’aliments pour poissons', 'Fabricant d’aliments pour bétail',
  'Fabricant de provende', 'Mélangeur d’aliments pour animaux', 'Fabricant de cages', 'Fabricant de poulaillers',
  'Fabricant de clapiers', 'Fabricant d’enclos', 'Fabricant de niches pour chiens', 'Fabricant de maisons pour animaux',
  'Fabricant d’aquariums artisanaux', 'Fabricant de terrariums', 'Fabricant de cages à oiseaux', 'Fabricant de perchoirs',
  'Fabricant de nichoirs', 'Fabricant de ruches', 'Fabricant d’équipements apicoles', 'Fabricant d’enfumoirs apicoles',
  'Fabricant de cadres apicoles', 'Fabricant de cire d’abeille', 'Transformateur de cire d’abeille',
  'Fabricant de produits de la ruche', 'Transformateur de miel', 'Conditionneur de miel', 'Artisan polyvalent',
  'Artisan décorateur', 'Artisan créateur', 'Créateur d’objets artisanaux',
]

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value: unknown): string => {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const getPlanPriority = (plan: string | null | undefined): number => {
  return PLAN_PRIORITY[normalize(plan)] || 1
}

const getPlanName = (plan: string | null | undefined): string => {
  const value = normalize(plan)
  if (value === 'premium') return 'Premium'
  if (value === 'business') return 'Business'
  if (value === 'starter') return 'Starter'
  return 'Gratuit'
}

const normalizePhone = (phone: string | null | undefined): string => {
  if (!phone) return ''
  let value = phone.replace(/[^\d+]/g, '')
  if (value.startsWith('+')) return value
  if (value.startsWith('228')) return `+${value}`
  if (/^(7|9)/.test(value)) return `+228${value}`
  return value
}

const hashString = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const getFairExposureScore = (service: Service): number => {
  const day = new Date().toISOString().slice(0, 10)
  return hashString(`${day}-${service.id}`)
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MarketplacePage() {
  const router = useRouter()

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [dbError, setDbError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [favorites, setFavorites] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  // ✅ État pour forcer la mise à jour de l'affichage (rotation toutes les 5 min)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    let mounted = true
    const initialize = async () => {
      await Promise.all([checkUserSession(mounted), loadServices()])
    }
    initialize()
    return () => { mounted = false }
  }, [])

  // ✅ Intervalle pour mettre à jour l'heure et déclencher la rotation des 28 cartes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000) // Vérifie chaque minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('prokorb_favorites')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setFavorites(parsed)
      }
    } catch (error) {
      console.error('Erreur favoris:', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('prokorb_favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Erreur sauvegarde favoris:', error)
    }
  }, [favorites])

  const checkUserSession = async (mounted = true) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) { console.error('Erreur session:', error); return }
      if (!session) { if (mounted) setCurrentUser(null); return }
      const { data: profileData, error: profileError } = await supabase
        .from('profiles').select('*').eq('id', session.user.id).maybeSingle()
      if (profileError) { console.error('Erreur profil:', profileError.message); return }
      if (mounted) setCurrentUser(profileData)
    } catch (error) {
      console.error('Erreur vérification session:', error)
    }
  }

  const loadServices = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setDbError(null)

      const { data, error } = await supabase
        .from('services')
        .select(`
          id, title, description, category, price, city, pro_id, created_at, is_active,
          profiles:pro_id (id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, verified_at, is_available, city)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur Supabase:', error.message)
        setDbError('Impossible de charger les services actuellement.')
        return
      }

      const formatted: Service[] = (data || []).map((service: any) => {
        let profile = service.profiles
        if (Array.isArray(profile)) profile = profile[0]
        const safeProfile: Profile = {
          id: profile?.id || service.pro_id,
          full_name: profile?.full_name || 'Professionnel',
          phone: profile?.phone || null,
          avatar_url: profile?.avatar_url || null,
          specialty: profile?.specialty || null,
          rating: Number(profile?.rating || 0),
          total_reviews: Number(profile?.total_reviews || 0),
          plan: profile?.plan || 'Gratuit',
          is_verified: Boolean(profile?.is_verified),
          verified_at: profile?.verified_at || null,
          is_available: profile?.is_available !== false,
          city: profile?.city || service.city || null,
        }
        return { ...service, profiles: safeProfile }
      }).filter(service => service.pro_id && service.profiles)

      setServices(formatted)
    } catch (error: any) {
      console.error('Erreur chargement services:', error)
      setDbError(error?.message || 'Une erreur inattendue est survenue.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredCities = useMemo(() => {
    const query = normalize(citySearchQuery)
    if (!query) return CITIES
    return CITIES.filter(city => normalize(city).includes(query))
  }, [citySearchQuery])

  const filteredServices = useMemo(() => {
    let result = [...services]
    const search = normalize(searchQuery)
    const city = normalize(selectedCity)
    const category = normalize(selectedCategory)

    if (search) {
      result = result.filter(service => {
        const values = [service.title, service.description, service.category, service.profiles?.full_name, service.profiles?.specialty, service.profiles?.city, service.city]
        return values.some(value => normalize(value).includes(search))
      })
    }

    if (category && category !== 'all' && category !== normalize('Tous les métiers')) {
      result = result.filter(service => {
        const serviceCategory = normalize(service.category)
        const specialty = normalize(service.profiles?.specialty)
        return serviceCategory.includes(category) || category.includes(serviceCategory) || specialty.includes(category) || category.includes(specialty)
      })
    }

    if (city && city !== 'all') {
      result = result.filter(service => {
        const serviceCity = normalize(service.city)
        const profileCity = normalize(service.profiles?.city)
        return serviceCity === city || profileCity === city
      })
    }

    // Tri : 1. Vérifiés, 2. Bonne note, 3. Plan, 4. Exposition équitable, 5. Date
    result.sort((a, b) => {
      const aVerified = a.profiles?.is_verified ? 1 : 0
      const bVerified = b.profiles?.is_verified ? 1 : 0
      if (bVerified !== aVerified) return bVerified - aVerified

      const aRating = Number(a.profiles?.rating || 0)
      const bRating = Number(b.profiles?.rating || 0)
      if (bRating !== aRating) return bRating - aRating

      const aPlan = getPlanPriority(a.profiles?.plan)
      const bPlan = getPlanPriority(b.profiles?.plan)
      if (bPlan !== aPlan) return bPlan - aPlan

      const aFair = getFairExposureScore(a)
      const bFair = getFairExposureScore(b)
      if (aFair !== bFair) return aFair - bFair

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return result
  }, [services, searchQuery, selectedCity, selectedCategory])

  // ✅ Détermine si un filtre de recherche est actif
  const hasActiveFilter = searchQuery !== '' || selectedCity !== 'all' || selectedCategory !== 'all'

  // ✅ Logique de rotation toutes les 5 minutes (300 000 ms)
  const servicesToDisplay = useMemo(() => {
    if (hasActiveFilter) {
      return filteredServices
    }

    const pageSize = 28
    const totalPages = Math.ceil(filteredServices.length / pageSize) || 1
    
    const FIVE_MINUTES_MS = 5 * 60 * 1000
    const currentSlot = Math.floor(currentTime / FIVE_MINUTES_MS)
    const currentOffset = (currentSlot % totalPages) * pageSize

    return filteredServices.slice(currentOffset, currentOffset + pageSize)
  }, [filteredServices, hasActiveFilter, currentTime])

  const toggleFavorite = (serviceId: string) => {
    setFavorites(previous => {
      if (previous.includes(serviceId)) return previous.filter(id => id !== serviceId)
      return [...previous, serviceId]
    })
  }

  const contactWhatsApp = (service: Service) => {
    const pro = service.profiles
    if (!pro?.is_available) {
      alert('Ce professionnel est actuellement en mission. Veuillez réessayer plus tard.')
      return
    }
    const phone = normalizePhone(pro.phone)
    if (!phone) {
      alert('Ce professionnel n’a pas encore renseigné de numéro WhatsApp.')
      return
    }
    const cleanPhone = phone.replace(/\D/g, '')
    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" sur ProKorb.`)
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const handleMonEspace = () => {
    if (!currentUser) { router.push('/login'); return }
    if (currentUser.role === 'pro') { router.push('/dashboard/pro'); return }
    router.push('/dashboard/client')
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCity('all')
    setSelectedCategory('all')
    setCitySearchQuery('')
    setShowCityDropdown(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
          <h2 className="text-white font-bold text-lg">Chargement de la marketplace</h2>
          <p className="text-slate-500 text-sm mt-2">Recherche des meilleurs professionnels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <img src="/logo.png" alt="ProKorb" className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="font-black text-xl tracking-tight hidden sm:block">
                <span className="text-indigo-400">PRO</span><span className="text-white">KORB</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => loadServices(true)} disabled={refreshing} className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 flex items-center justify-center transition-all" title="Actualiser">
                <RefreshCw className={`w-4 h-4 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button onClick={handleMonEspace} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                <User className="w-4 h-4" /><span className="hidden sm:inline">Mon Espace</span>
              </button>
            </div>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Rechercher un service, un métier ou un professionnel..."
              className="w-full pl-12 pr-12 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>

          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden w-full mb-3 py-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 text-sm font-semibold text-white">
            <SlidersHorizontal className="w-4 h-4" /> Filtres
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
              <input
                type="text"
                placeholder="Rechercher une localité..."
                value={citySearchQuery}
                onChange={event => {
                  setCitySearchQuery(event.target.value)
                  setShowCityDropdown(true)
                  if (event.target.value) setSelectedCity('all')
                }}
                onFocus={() => setShowCityDropdown(true)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {citySearchQuery && (
                <button onClick={() => { setCitySearchQuery(''); setSelectedCity('all') }} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
              {showCityDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 max-h-72 overflow-y-auto">
                    <button onClick={() => { setSelectedCity('all'); setCitySearchQuery(''); setShowCityDropdown(false) }} className="w-full px-4 py-3 text-left text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 border-b border-slate-800">
                      <MapPin className="w-4 h-4 inline mr-2" /> Toutes les localités
                    </button>
                    {filteredCities.length > 0 ? (
                      filteredCities.map(city => (
                        <button key={city} onClick={() => { setSelectedCity(city); setCitySearchQuery(city); setShowCityDropdown(false) }} className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-800 transition-colors ${normalize(selectedCity) === normalize(city) ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-300'}`}>
                          <MapPin className="w-4 h-4 inline mr-2 text-slate-500" /> {city}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-slate-500">Aucune localité trouvée</div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <select
                value={selectedCategory === 'all' ? 'Tous les métiers' : selectedCategory}
                onChange={event => setSelectedCategory(event.target.value === 'Tous les métiers' ? 'all' : event.target.value)}
                className="appearance-none w-full pl-12 pr-10 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {ALL_METIERS.map(metier => (
                  <option key={metier} value={metier} className="bg-slate-900 text-white">{metier}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 bg-slate-900/50 overflow-hidden py-3">
          <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
            {ALL_METIERS.slice(0, 80).map(metier => {
              const active = selectedCategory === 'all' ? metier === 'Tous les métiers' : normalize(selectedCategory) === normalize(metier)
              return (
                <button key={metier} onClick={() => setSelectedCategory(metier === 'Tous les métiers' ? 'all' : metier)} className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap transition-all shrink-0 ${active ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400'}`}>
                  {metier}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ERROR */}
        {dbError && (
          <div className="mb-8 bg-red-950/30 border border-red-900/50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-400">Impossible de charger la marketplace</h3>
                <p className="text-sm text-slate-400 mt-1">{dbError}</p>
                <button onClick={() => loadServices()} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold">Réessayer</button>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!dbError && filteredServices.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 sm:p-20 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800 flex items-center justify-center mb-6">
              <Search className="w-9 h-9 text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Aucun service trouvé</h2>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">Aucun professionnel ne correspond actuellement à vos critères.</p>
            <button onClick={resetFilters} className="mt-6 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all">Voir tous les professionnels</button>
          </div>
        )}

        {/* SERVICE GRID - DIRECTEMENT SANS TITRE */}
        {!dbError && servicesToDisplay.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {servicesToDisplay.map((service, index) => {
                const pro = service.profiles
                const isAvailable = pro?.is_available !== false
                const rating = Number(pro?.rating || 0)
                const reviews = Number(pro?.total_reviews || 0)
                const isVerified = Boolean(pro?.is_verified)
                const plan = getPlanName(pro?.plan)
                const isPremium = normalize(pro?.plan) === 'premium' || normalize(pro?.plan) === 'business'
                const displayCity = service.city || pro?.city
                const isFavorite = favorites.includes(service.id)

                return (
                  <article key={service.id} className={`group bg-slate-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isPremium ? 'border-amber-500/20 hover:border-amber-500/50' : 'border-slate-800 hover:border-indigo-500/40'}`} style={{ animationDelay: `${index * 40}ms` }}>
                    <div className="relative aspect-square overflow-hidden bg-slate-800">
                      {pro?.avatar_url ? (
                        <img src={pro.avatar_url} alt={pro.full_name} loading={index < 4 ? 'eager' : 'lazy'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 flex items-center justify-center">
                          <User className="w-20 h-20 text-white/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3">
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Disponible
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                            <Pause className="w-3.5 h-3.5" /> En mission
                          </span>
                        )}
                      </div>
                      {plan !== 'Gratuit' && (
                        <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide backdrop-blur-md ${plan === 'Premium' ? 'bg-amber-500 text-slate-950' : plan === 'Business' ? 'bg-emerald-500 text-slate-950' : 'bg-blue-500 text-white'}`}>
                            {plan}
                          </span>
                        </div>
                      )}
                      <button type="button" onClick={() => toggleFavorite(service.id)} aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-slate-950 transition-all">
                        <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
                      </button>
                      {rating > 0 && (
                        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg shadow-xl">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-black text-slate-900">{rating.toFixed(1)}</span>
                          {reviews > 0 && <span className="text-xs text-slate-500">({reviews})</span>}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{pro?.full_name}</h2>
                            {isVerified && (
                              <VerifiedBadge isVerified={true} verifiedAt={pro.verified_at} size={18} showLabel={false} showExpiration={false} />
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-1">{pro?.specialty || service.category || 'Professionnel'}</p>
                        </div>
                      </div>
                      {displayCity && (
                        <div className="flex items-center gap-2 text-sm text-slate-400 mt-4">
                          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="truncate">{displayCity}</span>
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-slate-800">
                        <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold">Service</p>
                        <h3 className="text-sm font-semibold text-slate-200 mt-1 line-clamp-2 min-h-[40px]">{service.title}</h3>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-slate-600">À partir de</p>
                        <p className={`text-lg font-black mt-0.5 ${isAvailable ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {service.price || 'Prix sur devis'} {service.price && !String(service.price).toLowerCase().includes('fcfa') ? 'FCFA' : ''}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-5">
                        <Link href={`/pro/${service.pro_id}`} className="px-3 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                          <Eye className="w-4 h-4" /> Profil
                        </Link>
                        {isAvailable ? (
                          <button type="button" onClick={() => contactWhatsApp(service)} className="px-3 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
                            <MessageCircle className="w-4 h-4" /> Contacter
                          </button>
                        ) : (
                          <button type="button" disabled className="px-3 py-3 bg-slate-800 border border-slate-700 text-slate-600 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                            <Pause className="w-4 h-4" /> En mission
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* BOUTON "VOIR PLUS" (Visible seulement si pas de filtre actif et qu'il reste des éléments) */}
            {!hasActiveFilter && servicesToDisplay.length < filteredServices.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => {
                    // Force une mise à jour de l'heure pour passer au lot suivant immédiatement
                    setCurrentTime(Date.now() + 5 * 60 * 1000)
                  }}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  Voir plus de professionnels
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ProKorb" className="h-8 w-auto" />
              <div>
                <div className="font-black text-lg text-white">PRO<span className="text-indigo-400">KORB</span></div>
                <p className="text-xs text-slate-600">Connecter les clients aux professionnels.</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Conditions</Link>
              <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Confidentialité</Link>
              <Link href="/contact" className="text-slate-500 hover:text-white transition-colors">Support</Link>
            </nav>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} ProKorb</p>
          </div>
        </div>
      </footer>
    </div>
  )
}