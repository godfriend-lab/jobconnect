// Ce fichier sert aux fonctions utilitaires personnalisées pour Supabase.
// Exemple : une fonction pour vérifier si un utilisateur est Admin
export function isAdmin(profile: any) {
  return profile?.role === 'admin'
}