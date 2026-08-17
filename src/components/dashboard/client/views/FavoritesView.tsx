// @ts-nocheck
import { Heart } from 'lucide-react'
import ProCard from '../shared/ProCard'

export default function FavoritesView({ favorites, onToggleFavorite, onContact, onGoToMarketplace }: any) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <style>{`@keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }`}</style>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-900/30 rounded-xl flex items-center justify-center border border-red-500/50"><Heart className="w-5 h-5 text-red-400 fill-red-400" /></div>
        <h1 className="text-2xl font-black text-white">Mes Favoris</h1>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-16 text-center border border-slate-800 shadow-lg">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><Heart className="w-10 h-10 text-slate-600" /></div>
          <p className="text-white font-bold text-lg">Aucun favori</p>
          <p className="text-slate-400 mt-2">Explorez la marketplace et sauvegardez les profils qui vous intéressent</p>
          <button onClick={onGoToMarketplace} className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
            Explorer la marketplace
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pro: any, index: number) => (
            <ProCard 
              key={pro.id} 
              pro={pro} 
              index={index}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onContact={onContact}
            />
          ))}
        </div>
      )}
    </div>
  )
}