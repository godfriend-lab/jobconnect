// @ts-nocheck

/**
 * Configuration visuelle de la section "Professionnels en vedette"
 * Centralise tous les paramètres pour une maintenance facile
 */

export const FEATURED_SECTION_CONFIG = {
  // Titre et sous-titre
  title: 'Les professionnels recommandés',
  subtitle: 'Découvrez les talents les mieux notés de notre plateforme',
  badge: {
    text: 'En vedette',
    icon: 'star', // 'star' | 'crown' | 'sparkles'
  },

  // Nombre de professionnels à afficher
  count: 6,

  // Animation
  animation: {
    enabled: true,
    staggerDelay: 100, // ms entre chaque carte
  },

  // Couleurs (pour cohérence avec le thème)
  colors: {
    primary: 'amber',    // Couleur principale
    secondary: 'orange', // Couleur secondaire
    background: 'slate-950',
  },

  // CTA (bouton en bas)
  cta: {
    text: 'Voir tous les professionnels',
    href: '/marketplace',
  },

  // Informations affichées sur chaque carte
  display: {
    showRating: true,
    showReviews: true,
    showCity: true,
    showVerified: true,
    maxServices: 2, // Nombre max de services affichés par carte
  },
} as const

export type FeaturedConfig = typeof FEATURED_SECTION_CONFIG