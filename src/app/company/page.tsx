import Link from 'next/link'
import { ArrowLeft, Building2, Users, Target, Award } from 'lucide-react'

export default function CompanyPage() {
  const team = [
    { name: "Godfriend Agbevivi", role: "Fondateur & CEO", desc: "Visionnaire tech passionné par l'impact social en Afrique." },
    { name: "Équipe Technique", role: "Développement", desc: "Des développeurs talentueux basés à Lomé." },
    { name: "Équipe Support", role: "Service client", desc: "À votre écoute du lundi au samedi." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Notre Entreprise</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Découvrez l'équipe et la structure derrière JobConnect Togo.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Qui sommes-nous ?</h2>
            <p className="text-slate-600 leading-relaxed">
              JobConnect Togo est une startup technologique basée à Lomé, spécialisée dans la mise en relation entre professionnels qualifiés et clients. Notre plateforme est conçue pour répondre aux besoins spécifiques du marché togolais, avec une attention particulière portée à la vérification des profils et à la qualité du service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <Building2 className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Siège social</h3>
              <p className="text-sm text-slate-600">Lomé, Togo</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <Users className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Équipe</h3>
              <p className="text-sm text-slate-600">Une équipe jeune et dynamique</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <Target className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Objectif</h3>
              <p className="text-sm text-slate-600">Digitaliser les services au Togo</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Notre Équipe</h2>
            <div className="space-y-4">
              {team.map((member, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-slate-600">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <Award className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Notre Certification</h3>
            <p className="text-slate-600">
              JobConnect s'engage à respecter les normes de protection des données et à offrir un service de qualité à tous ses utilisateurs.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}