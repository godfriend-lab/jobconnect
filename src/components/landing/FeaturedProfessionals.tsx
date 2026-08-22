// @ts-nocheck
import { createClient } from '@/lib/supabase/client' // Garde ton import habituel
import Link from 'next/link'
import { Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react'

export default async function FeaturedProfessionals() {
  const supabase = createClient()
  
  // ✅ MODIFICATION CRUCIALE : On récupère les 6 meilleurs pros disponibles, 
  // peu importe leur plan, pour garantir que la section s'affiche toujours.
  const { data: pros, error } = await supabase
    .from('profiles')
    .select(`
      id, full_name, specialty, avatar_url, rating, total_reviews, plan, is_verified, city,
      services (id, title, price, is_active)
    `)
    .eq('is_available', true)
    .order('rating', { ascending: false })
    .limit(6)

  // Fallback élégant si la base de données est vraiment vide
  if (error || !pros || pros.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mx-auto">
            <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
            Bientôt disponible
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950">
            Nos meilleurs professionnels arrivent
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            La plateforme est en cours de remplissage par des experts vérifiés. Revenez très vite !
          </p>
        </div>
      </section>
    )
  }

  // Nettoyage des données : on garde uniquement les services actifs (max 2 par carte)
  const cleanedPros = pros.map(pro => ({
    ...pro,
    services: (pro.services || []).filter((s: any) => s.is_active).slice(0, 2)
  })).filter(pro => pro.services.length > 0).slice(0, 6)

  // Si après filtrage il n'y a plus personne, on affiche un message alternatif
  if (cleanedPros.length === 0) {
    return (
      <section className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-950">Professionnels en préparation</h2>
          <p className="text-slate-500">Des experts sont inscrits, mais finalisent encore l'ajout de leurs services.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header de la section */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold mx-auto">
            <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
            Professionnels en vedette
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Les experts les mieux notés <br />
            <span className="text-indigo-600">à votre service</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg">
            Découvrez une sélection de professionnels d'élite, soigneusement vérifiés pour vous garantir des prestations de qualité supérieure.
          </p>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cleanedPros.map((pro) => {
            // ✅ LOGIQUE INVISIBLE : On met en valeur UNIQUEMENT si c'est Premium ou Business
            const isRecommended = pro.plan === 'Premium' || pro.plan === 'Business'

            return (
              <Link 
                key={pro.id} 
                href={`/pro/${pro.id}`}
                className={`group relative block h-full bg-white border rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 ${
                  isRecommended 
                    ? 'border-amber-300 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-100/50' 
                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50'
                }`}
              >
                {/* Badge Neutre "Recommandé" (Affiché SEULEMENT pour Premium/Business) */}
                {isRecommended && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-full shadow-sm">
                      <Star className="w-3 h-3 fill-amber-600" />
                      Recommandé
                    </span>
                  </div>
                )}

                {/* Avatar & Infos de base */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full overflow-hidden ring-4 flex-shrink-0 ${
                    isRecommended ? 'ring-amber-100 bg-amber-50' : 'ring-slate-100 bg-slate-100'
                  }`}>
                    {pro.avatar_url ? (
                      <img src={pro.avatar_url} alt={pro.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center font-bold text-2xl ${
                        isRecommended ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        {pro.full_name?.charAt(0).toUpperCase() || 'P'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-slate-950 truncate group-hover:text-indigo-600 transition-colors">
                      {pro.full_name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">{pro.specialty || 'Professionnel'}</p>
                    {pro.city && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {pro.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats (Note + Vérifié) */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  {pro.rating > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-slate-900">{pro.rating.toFixed(1)}</span>
                      {pro.total_reviews > 0 && (
                        <span className="text-xs text-slate-400">({pro.total_reviews} avis)</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Nouveau sur la plateforme</span>
                  )}
                  
                  {pro.is_verified && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Vérifié
                    </div>
                  )}
                </div>

                {/* Services proposés */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services proposés</p>
                  {pro.services.map((service: any) => (
                    <div key={service.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 font-medium truncate pr-2">{service.title}</span>
                      <span className="text-indigo-600 font-bold ml-2 whitespace-nowrap">{service.price}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Footer de la carte */}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  <span>Voir le profil complet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Lien global vers la marketplace */}
        <div className="text-center mt-12">
          <Link 
            href="/marketplace" 
            className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors text-base group/link"
          >
            Voir tous les professionnels 
            <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}