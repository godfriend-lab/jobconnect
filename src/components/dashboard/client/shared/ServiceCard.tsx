// @ts-nocheck
import Link from 'next/link'
import { Star, MapPin, MessageCircle, ExternalLink, Heart, Pause, Shield } from 'lucide-react'
import { getIconForCategory } from '@/lib/dashboard/utils'
import PlanBadge from './PlanBadge'

export default function ServiceCard({ service, isFavorite, onToggleFavorite, onContact, index }: any) {
  const Icon = getIconForCategory(service.category)

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 group-hover:opacity-0 transition-opacity duration-500"></div>
        {service.profiles.avatar_url ? (
          <img src={service.profiles.avatar_url} alt={service.profiles.full_name} className="w-full h-full object-cover object-center relative z-10 transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative z-10"><div className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500"></div></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>
        
        {service.profiles.is_verified && (
          <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-30 border border-white/20">
            <Shield className="w-3.5 h-3.5" /> Vérifié
          </div>
        )}
        {!service.profiles.is_available && (
          <div className="absolute top-3 left-3 bg-slate-800/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-30 border border-slate-600">
            <Pause className="w-3.5 h-3.5" /> Indisponible
          </div>
        )}
        {service.profiles.is_available && (
          <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-30 border border-white/20">
            Disponible
          </div>
        )}
        
        <button onClick={() => onToggleFavorite(service.profiles)} className="absolute bottom-3 right-3 w-10 h-10 bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-30 group/btn border border-slate-700">
          <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400 group-hover/btn:text-red-400'}`} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="font-bold text-white text-base leading-tight line-clamp-2 flex-1 group-hover:text-indigo-400 transition-colors">{service.title}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
        
        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-indigo-500/30 transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md overflow-hidden ring-2 ring-slate-700">
            {service.profiles.avatar_url ? <img src={service.profiles.avatar_url} alt="" className="w-full h-full object-cover" /> : service.profiles.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-sm font-bold text-white truncate">{service.profiles.full_name}</span>
              <PlanBadge plan={service.profiles.plan} />
            </div>
            {service.profiles.specialty && <span className="text-xs text-slate-400 truncate block">{service.profiles.specialty}</span>}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          {service.profiles.rating > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-900/30 px-2.5 py-1.5 rounded-lg border border-amber-700/50">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-white text-sm">{service.profiles.rating.toFixed(1)}</span>
              {service.profiles.total_reviews > 0 && <span className="text-xs text-slate-400">({service.profiles.total_reviews})</span>}
            </div>
          )}
          {service.city && (
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium">{service.city}</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gradient-to-r from-emerald-900/30 to-green-900/30 px-4 py-3 rounded-xl border border-emerald-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/20 rounded-full -mr-8 -mt-8 blur-xl"></div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider mb-0.5 relative z-10">Prix estimé</span>
              <span className="text-lg font-black text-emerald-400 relative z-10">{service.price}</span>
            </div>
            
            {service.profiles.is_available ? (
              <button onClick={() => onContact(service)} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Contacter</span>
              </button>
            ) : (
              <div className="flex-1 py-3 bg-slate-800 text-slate-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-700">
                <Pause className="w-4 h-4" /> Indisponible
              </div>
            )}
          </div>
          <Link href={`/pro/${service.profiles.id}`} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-slate-700 hover:border-indigo-500/50 group/link">
            <span>Voir le profil complet</span>
            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}