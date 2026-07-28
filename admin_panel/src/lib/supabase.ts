// @ts-nocheck
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Variables d'environnement Supabase manquantes !")
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl)
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Définie" : "Manquante")
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
)