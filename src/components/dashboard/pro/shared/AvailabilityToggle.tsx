// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Pause, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AvailabilityToggleProps {
  userId: string
  currentStatus?: boolean
  onStatusChange?: (newStatus: boolean) => void
}

export default function AvailabilityToggle({ 
  userId, 
  currentStatus,
  onStatusChange 
}: AvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = useState<boolean>(currentStatus ?? true)
  const [updating, setUpdating] = useState(false)

  // Synchroniser avec le statut externe si fourni
  useEffect(() => {
    if (currentStatus !== undefined) {
      setIsAvailable(currentStatus)
    }
  }, [currentStatus])

  const toggleAvailability = async () => {
    if (!userId) {
      console.error('❌ UserId manquant pour toggle availability')
      return
    }

    setUpdating(true)
    const newStatus = !isAvailable
    
    // Mise à jour optimiste de l'UI
    setIsAvailable(newStatus)

    try {
      // Mise à jour dans Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_available: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('❌ Erreur update availability:', error)
        // Rollback en cas d'erreur
        setIsAvailable(!newStatus)
        alert('❌ Erreur lors de la mise à jour du statut')
        return
      }

      // Notification au parent si callback fourni
      if (onStatusChange) {
        onStatusChange(newStatus)
      }

      console.log('✅ Disponibilité mise à jour:', newStatus ? 'Disponible' : 'Indisponible')
      
    } catch (error) {
      console.error('❌ Erreur critique toggle availability:', error)
      // Rollback
      setIsAvailable(!newStatus)
      alert('❌ Une erreur est survenue')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleAvailability}
        disabled={updating}
        className={`
          inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold 
          transition-all duration-300 shadow-sm border
          disabled:opacity-60 disabled:cursor-not-allowed
          ${isAvailable 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-500/20 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-900/30' 
            : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-md hover:shadow-amber-500/20 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/30'
          }
        `}
      >
        {updating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isAvailable ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Pause className="w-5 h-5" />
        )}
        
        <span className="font-medium">
          {updating 
            ? 'Mise à jour...' 
            : isAvailable 
              ? 'Disponible' 
              : 'Indisponible'
          }
        </span>
      </button>
    </div>
  )
}