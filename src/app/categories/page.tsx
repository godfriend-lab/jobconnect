import Link from 'next/link'
import { ArrowLeft, Wrench, Zap, Hammer, Paintbrush, Scissors, Laptop, Stethoscope, Briefcase, Home, Car, Heart } from 'lucide-react'

export default function CategoriesPage() {
  const categories = [
    {
      icon: Hammer,
      name: "Bâtiment & Construction",
      count: 156,
      color: "from-orange-500 to-red-600",
      services: ["Maçon", "Charpentier", "Couvreur", "Plaquiste", "Carreleur"]
    },
    {
      icon: Wrench,
      name: "Plomberie & Sanitaire",
      count: 89,
      color: "from-blue-500 to-cyan-600",
      services: ["Plombier", "Installateur sanitaire", "Déboucheur", "Chauffagiste"]
    },
    {
      icon: Zap,
      name: "Électricité",
      count: 72,
      color: "from-yellow-500 to-amber-600",
      services: ["Électricien", "Installateur électrique", "Dépanneur", "Technicien panneaux solaires"]
    },
    {
      icon: Paintbrush,
      name: "Peinture & Décoration",
      count: 64,
      color: "from-purple-500 to-pink-600",
      services: ["Peintre en bâtiment", "Décorateur d'intérieur", "Poseur de papier peint"]
    },
    {
      icon: Laptop,
      name: "Informatique & Digital",
      count: 45,
      color: "from-indigo-500 to-blue-600",
      services: ["Développeur web", "Technicien informatique", "Graphiste", "Community Manager"]
    },
    {
      icon: Car,
      name: "Mécanique & Auto",
      count: 58,
      color: "from-slate-600 to-gray-700",
      services: ["Mécanicien auto", "Carrossier", "Électricien auto", "Vulcanisateur"]
    },
    {
      icon: Scissors,
      name: "Couture & Mode",
      count: 41,
      color: "from-pink-500 to-rose-600",
      services: ["Couturier", "Tailleur", "Modiste", "Retoucheur"]
    },
    {
      icon: Stethoscope,
      name: "Santé & Bien-être",
      count: 33,
      color: "from-emerald-500 to-green-600",
      services: ["Infirmier", "Kinésithérapeute", "Esthéticienne", "Coiffeur à domicile"]
    },
    {
      icon: Home,
      name: "Ménage & Jardinage",
      count: 67,
      color: "from-teal-500 to-emerald-600",
      services: ["Femme de ménage", "Jardinier", "Agent d'entretien", "Paysagiste"]
    },
    {
      icon: Briefcase,
      name: "Services Professionnels",
      count: 52,
      color: "from-violet-500 to-purple-600",
      services: ["Comptable", "Avocat", "Consultant", "Traducteur"]
    },
    {
      icon: Heart,
      name: "Événementiel",
      count: 38,
      color: "from-rose-500 to-pink-600",
      services: ["Photographe", "Traiteur", "DJ", "Organisateur d'événements"]
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Toutes les catégories</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Explorez nos {categories.reduce((acc, cat) => acc + cat.count, 0)} professionnels répartis en {categories.length} catégories de services.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <Link 
                key={idx} 
                href={`/marketplace?category=${encodeURIComponent(category.name)}`}
                className="group bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`h-3 bg-linear-to-r ${category.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-slate-900">{category.count}</div>
                      <div className="text-xs text-slate-500 font-semibold uppercase">professionnels</div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.services.slice(0, 3).map((service, sIdx) => (
                      <span key={sIdx} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                        {service}
                      </span>
                    ))}
                    {category.services.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md font-medium">
                        +{category.services.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white">
          <h3 className="text-3xl font-black mb-4">Vous ne trouvez pas ce que vous cherchez ?</h3>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Contactez-nous et nous vous aiderons à trouver le professionnel adapté à vos besoins.
          </p>
          <Link href="/contact" className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
            Nous contacter
          </Link>
        </div>
      </main>
    </div>
  )
}