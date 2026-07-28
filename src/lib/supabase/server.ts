import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = "https://ddfwhwgpxdzborpvusld.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZndod2dweGR6Ym9ycHZ1c2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NTIwNjAsImV4cCI6MjA5NzUyODA2MH0.U18KxzwXylNP-_8oj4X6mjvE1U8p7QXk7wlJiNSCETg"

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Géré si le composant est rendu depuis un Server Action ou Middleware
        }
      },
    },
  })
}