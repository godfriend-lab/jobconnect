// @ts-nocheck
import { Clock, MessageCircle, Star } from 'lucide-react'

export default function HistoryView({ contactHistory, onRequestReview }: any) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <style>{`@keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }`}</style>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-900/30 rounded-xl flex items-center justify-center border border-indigo-500/50"><Clock className="w-5 h-5 text-indigo-400" /></div>
        <h1 className="text-2xl font-black text-white">Historique des contacts</h1>
      </div>
      
      {contactHistory.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-16 text-center border border-slate-800 shadow-lg">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4"><Clock className="w-10 h-10 text-slate-600" /></div>
          <p className="text-white font-bold text-lg">Aucun historique</p>
          <p className="text-slate-400 mt-2">Vos interactions avec les professionnels apparaîtront ici</p>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 divide-y divide-slate-800 overflow-hidden">
          {contactHistory.map((item: any, index: number) => (
            <div key={item.id} className="p-6 flex items-center justify-between flex-wrap gap-4 hover:bg-slate-800/50 transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold overflow-hidden shadow-md ring-4 ring-slate-900">
                  {item.avatar ? <img src={item.avatar} alt="" className="w-full h-full object-cover" /> : item.proName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{item.proName}</h3>
                  <p className="text-sm text-slate-400 font-medium">{item.specialty}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.date || item.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  item.contact_method === 'whatsapp' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/50' : 
                  item.status === 'completed' ? 'bg-blue-900/30 text-blue-400 border border-blue-700/50' : 'bg-amber-900/30 text-amber-400 border border-amber-700/50'
                }`}>
                  {item.contact_method === 'whatsapp' ? <MessageCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {item.contact_method === 'whatsapp' ? 'WhatsApp' : item.status === 'completed' ? 'Terminé' : 'En attente'}
                </span>
                <button onClick={() => onRequestReview(item.pro_id, item.proName)} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" /> Laisser un avis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}