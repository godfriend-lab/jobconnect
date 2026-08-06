// src/app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server' // Assure-toi que ce chemin correspond à ton client serveur Supabase
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // L'URL vers laquelle rediriger après vérification (ex: page de connexion avec un message de succès)
  const redirectTo = requestUrl.searchParams.get('redirect_to') || '/login?verified=true'

  if (code) {
    const supabase = createClient()
    // Échange le code contre une session valide
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirige l'utilisateur vers la page de connexion (ou le dashboard)
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
}