// @ts-nocheck
export const categoriesMetiers = [
  'Maçon', 'Plombier', 'Électricien', 'Peintre en bâtiment',
  // ... votre liste complète ici
]

export const plans = [
  { 
    name: 'Starter', 
    semesterPrice: 30000, 
    annualPrice: 50000,
    features: ['Visibilité accrue', 'Mise en avant locale', 'Support prioritaire']
  },
  { 
    name: 'Business', 
    semesterPrice: 75000, 
    annualPrice: 125000,
    features: ['Tout Starter +', 'Top 5 recherches', 'Statistiques avancées']
  },
  { 
    name: 'Premium', 
    semesterPrice: 150000, 
    annualPrice: 250000,
    features: ['Tout Business +', 'Top 1 garanti', '-20% Ideenwerk'],
    highlight: true
  }
]

export const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'Home' },
  { id: 'services', label: 'Mon Service', icon: 'Briefcase' },
  { id: 'profile', label: 'Mon Profil', icon: 'Settings' },
  { id: 'portfolio', label: 'Réalisations', icon: 'ImageIcon' },
  { id: 'reviews', label: 'Avis clients', icon: 'Star' },
  { id: 'subscription', label: 'Mon Abonnement', icon: 'Crown' },
  { id: 'verification', label: 'Vérification', icon: 'Shield' },
]