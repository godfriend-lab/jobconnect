// @ts-nocheck
import Link from 'next/link'
import { Star, MessageCircle, ExternalLink, Heart, Pause, Shield } from 'lucide-react'
import PlanBadge from './PlanBadge'

export default function ProCard({ pro, isFavorite, onToggleFavorite, onContact, index }: any) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center overflow-hidden group">
        {pro.avatar_url ? (
          <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <span className="text-7xl text-white/30 group-hover:scale-110 transition-transform duration-500">{pro.full_name.charAt(0).toUpperCase()}</span>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
        
        {pro.is_verified && (
          <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
            <Shield className="w-3.5 h-3.5" /> Vérifié
          </div>
        )}
        {!pro.is_available && (
          <div className="absolute top-3 right-3 bg-slate-800/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border border-slate-600">
            <Pause className="w-3.5 h-3.5" /> Indisponible
          </div>
        )}
        {pro.is_available && (
          <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
            Disponible
          </div>
        )}
        
        <button onClick={() => onToggleFavorite(pro)} className="absolute bottom-3 right-3 w-10 h-10 bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-slate-700">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-white text-lg truncate flex-1">{pro.full_name}</h3>
          <PlanBadge plan={pro.plan} />
        </div>
        <p className="text-sm text-slate-400 mb-4 font-medium">{pro.specialty}</p>
        
        <div className="flex items-center gap-2 mb-6 bg-amber-900/30 w-fit px-3 py-1.5 rounded-lg border border-amber-700/50">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-bold text-white text-sm">{pro.rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({pro.total_reviews} avis)</span>
        </div>
        
        <div className="mt-auto space-y-3">
          {pro.is_available ? (
            <button onClick={() => onContact(pro)} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]">
              <MessageCircle className="w-4 h-4" /> Contacter via WhatsApp
            </button>
          ) : (
            <div className="w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700">
              <Pause className="w-4 h-4" /> Indisponible
            </div>
          )}
          <Link href={`/pro/${pro.id}`} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-indigo-500/50">
            <ExternalLink className="w-4 h-4" /> Voir le profil complet
          </Link>
        </div>
      </div>
    </div>
  )
}