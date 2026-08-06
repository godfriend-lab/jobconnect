// @ts-nocheck
'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Briefcase, User, Loader2, AlertCircle, CheckCircle2 // ✅ CheckCircle2 ajouté ici
} from 'lucide-react'

// ✅ Composant interne qui utilise useSearchParams en toute sécurité
function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const defaultRole = searchParams.get('role')
  
  // ✅ RÉCUPÉRATION DU STATUT DE VÉRIFICATION
  const isVerified = searchParams.get('verified') === 'true'

  const [role, setRole] = useState<'client' | 'pro' | null>(defaultRole as 'client' | 'pro' || null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('🔍 Tentative de connexion...', { email: email.trim().toLowerCase() })

      // 1. Authentification
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      })

      if (authError) {
        console.error('❌ Erreur Supabase:', authError)
        
        if (authError.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Veuillez vérifier votre adresse email avant de vous connecter.')
        } else {
          setError(authError.message)
        }
        setLoading(false)
        return
      }

      if (!data.user) {
        setError('Utilisateur non trouvé.')
        setLoading(false)
        return
      }

      console.log('✅ Connexion réussie, récupération du profil...')

      // 2. Récupération du rôle en base de données (Sécurité stricte)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError || !profile) {
        console.warn('⚠️ Impossible de récupérer le profil:', profileError)
        setError('Erreur de configuration du compte. Veuillez contacter le support.')
        setLoading(false)
        return
      }

      const userRole = profile.role || 'client'
      console.log(`👉 Redirection vérifiée vers le dashboard: ${userRole}`)

      // 3. Redirection sécurisée
      setTimeout(() => {
        if (redirect) {
          router.push(redirect)
        } else if (userRole === 'pro') {
          router.push('/dashboard/pro')
        } else {
          router.push('/dashboard/client')
        }
      }, 300)

    } catch (err) {
      console.error('❌ Erreur inattendue:', err)
      setError('Une erreur inattendue est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* HEADER */}
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black">
              <span className="text-indigo-600">JOB</span>
              <span className="text-slate-900">CONNECT</span>
            </span>
          </Link>
          <Link 
            href="/register" 
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            Pas de compte ? S'inscrire
          </Link>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* TITRE */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Bon retour ! 👋
            </h1>
            <p className="text-slate-600">
              Connectez-vous à votre espace
            </p>
          </div>

          {/* ✅ MESSAGE DE SUCCÈS DE VÉRIFICATION EMAIL */}
          {isVerified && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800">Email vérifié avec succès ! 🎉</p>
                <p className="text-xs text-green-700 mt-1">
                  Votre compte est maintenant activé. Connectez-vous pour accéder à votre espace.
                </p>
              </div>
            </div>
          )}

          {/* SÉLECTEUR DE RÔLE (Étape 1) */}
          {!role && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-center text-sm font-semibold text-slate-700 mb-4">
                Comment souhaitez-vous vous connecter ?
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Carte Client */}
                <button
                  onClick={() => { setRole('client'); setError('') }}
                  className="group bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Client</h3>
                  <p className="text-xs text-slate-500">Je cherche un professionnel</p>
                </button>

                {/* Carte Professionnel */}
                <button
                  onClick={() => { setRole('pro'); setError('') }}
                  className="group bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Professionnel</h3>
                  <p className="text-xs text-slate-500">Je propose mes services</p>
                </button>
              </div>
            </div>
          )}

          {/* FORMULAIRE DE CONNEXION (Étape 2) */}
          {role && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header formulaire */}
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => { setRole(null); setError('') }}
                  className="text-sm text-slate-500 hover:text-indigo-600 transition flex items-center gap-1"
                >
                  ← Changer
                </button>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  role === 'pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {role === 'pro' ? <Briefcase className="w-3 h-3" /> : <User className="w-3 h-3" />}
                  {role === 'pro' ? 'Professionnel' : 'Client'}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Connexion
              </h2>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Affichage des erreurs */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer formulaire */}
              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Pas encore de compte ?{' '}
                  <Link 
                    href={`/register?role=${role}`} 
                    className="text-indigo-600 font-semibold hover:underline transition"
                  >
                    S'inscrire gratuitement
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 px-4 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} JOBCONNECT. Tous droits réservés.
        </p>
      </footer>
    </div>
  )
}

// ✅ Composant principal qui enveloppe le tout dans Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  )
}