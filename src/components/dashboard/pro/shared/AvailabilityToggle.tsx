// @ts-nocheck
import { Loader2, Pause, CheckCircle } from 'lucide-react'

interface AvailabilityToggleProps {
  isAvailable: boolean
  onToggle: () => void
  loading?: boolean
}

export default function AvailabilityToggle({ isAvailable, onToggle, loading }: AvailabilityToggleProps) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isAvailable 
              ? 'bg-emerald-900/30 border border-emerald-700/50' 
              : 'bg-slate-800 border border-slate-700'
          }`}>
            {isAvailable ? (
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            ) : (
              <Pause className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">
              {isAvailable ? 'Disponible' : 'Indisponible'}
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              {isAvailable 
                ? 'Vous êtes visible sur la marketplace et pouvez recevoir des demandes' 
                : 'Vous êtes masqué de la marketplace'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          disabled={loading}
          className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
            isAvailable 
              ? 'bg-emerald-500 hover:bg-emerald-600' 
              : 'bg-slate-700 hover:bg-slate-600'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            isAvailable ? 'translate-x-9' : 'translate-x-1'
          }`}>
            {loading && (
              <Loader2 className="w-4 h-4 animate-spin text-slate-600 absolute top-1 left-1" />
            )}
          </div>
        </button>
      </div>
    </div>
  )
}