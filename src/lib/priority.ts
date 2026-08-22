// @ts-nocheck

/**
 * Système de priorité des professionnels
 * Gère l'ordre d'affichage sans révéler le plan souscrit
 */

// Ordre de priorité (plus le chiffre est haut, plus c'est prioritaire)
export const PLAN_PRIORITY: Record<string, number> = {
  'Premium': 4,
  'Business': 3,
  'Starter': 2,
  'Gratuit': 1,
  'gratuit': 1,
  'starter': 2,
  'business': 3,
  'premium': 4,
}

// Plans éligibles pour la section "En vedette"
export const FEATURED_PLANS = ['Premium', 'Business']

// Nombre de professionnels à afficher dans la section vedette
export const FEATURED_COUNT = 6

// Label affiché pour les pros prioritaires (neutre, ne révèle pas le plan)
export const FEATURED_LABEL = 'En vedette'

/**
 * Calcule le score de priorité d'un professionnel
 * Plus le score est haut, plus il apparaît en haut
 */
export function calculatePriorityScore(pro: any): number {
  let score = 0
  
  // 1. Priorité du plan (le plus important)
  const plan = pro?.plan || 'Gratuit'
  score += (PLAN_PRIORITY[plan] || 1) * 1000
  
  // 2. Note (rating)
  score += (pro?.rating || 0) * 100
  
  // 3. Nombre d'avis (crédibilité)
  score += (pro?.total_reviews || 0) * 10
  
  // 4. Vérification (bonus)
  if (pro?.is_verified) {
    score += 50
  }
  
  // 5. Disponibilité (bonus)
  if (pro?.is_available !== false) {
    score += 25
  }
  
  return score
}

/**
 * Trie une liste de professionnels par priorité
 */
export function sortByPriority(pros: any[]): any[] {
  return [...pros].sort((a, b) => {
    const scoreA = calculatePriorityScore(a)
    const scoreB = calculatePriorityScore(b)
    return scoreB - scoreA
  })
}

/**
 * Filtre les professionnels éligibles pour la section vedette
 */
export function getFeaturedProfessionals(pros: any[], count = FEATURED_COUNT): any[] {
  return pros
    .filter(pro => FEATURED_PLANS.includes(pro?.plan))
    .filter(pro => pro?.is_available !== false)
    .slice(0, count)
}