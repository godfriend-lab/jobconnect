import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  
  // Supabase envoie le code dans l'URL
  const code = requestUrl.searchParams.get('code')
  
  // URL vers laquelle rediriger après succès
  const redirectTo = requestUrl.searchParams.get('redirect_to') || '/login?verified=true'

  if (code) {
    const supabase = await createClient() // ✅ AJOUT DE await ICI
    // Échange le code contre une session valide
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirige l'utilisateur
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}