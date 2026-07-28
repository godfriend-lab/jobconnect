import { createClient } from '@supabase/supabase-js'

// ⚠️ TEMPORAIRE : Uniquement pour tester si le .env.local est en cause
const supabaseUrl = 'https://ddfwhwgpxdzborpvusld.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZndod2dweGR6Ym9ycHZ1c2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NTIwNjAsImV4cCI6MjA5NzUyODA2MH0.U18KxzwXylNP-_8oj4X6mjvE1U8p7QXk7wlJiNSCETg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)