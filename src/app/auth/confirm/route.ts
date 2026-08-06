import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  
  // ✅ RÉCUPÉRER LE CODE DEPUIS L'URL
  const code = requestUrl.searchParams.get('code')
  
  // Définir où rediriger l'utilisateur après succès
  const redirectTo = requestUrl.searchParams.get('redirect_to') || '/login?verified=true'

  if (code) {
    // Créer le client Supabase (côté serveur)
    const supabase = await createClient()
    
    // Échanger le code contre une session valide
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Rediriger l'utilisateur vers la page de connexion
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}