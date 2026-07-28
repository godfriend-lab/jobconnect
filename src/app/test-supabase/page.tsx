'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [result, setResult] = useState('Test en cours...')

  useEffect(() => {
    async function test() {
      try {
        console.log('🔍 Test de connexion à Supabase...')
        
        // Test 1 : Vérifier que le client est créé
        console.log('Client Supabase URL:', supabase.supabaseUrl)
        
        // Test 2 : Essayer une requête simple
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        if (error) {
          console.error('❌ Erreur:', error)
          setResult(`Erreur: ${error.message}`)
        } else {
          console.log('✅ Succès:', data)
          setResult('✅ Connexion réussie ! Supabase répond.')
        }
      } catch (err) {
        console.error('❌ Exception:', err)
        setResult(`Exception: ${err}`)
      }
    }
    
    test()
  }, [])

  return (
    <div className="p-8">
      <h1>Test Supabase</h1>
      <p>{result}</p>
      <p>Ouvre la console (F12) pour voir les détails</p>
    </div>
  )
}