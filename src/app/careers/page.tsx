import Link from 'next/link'
import { ArrowLeft, Briefcase, MapPin, Clock, Send } from 'lucide-react'

export default function CareersPage() {
  const jobs = [
    { title: "Développeur Full Stack", location: "Lomé (Hybride)", type: "CDI", desc: "Rejoignez notre équipe technique pour construire l'avenir des services au Togo." },
    { title: "Responsable Marketing", location: "Lomé", type: "CDI", desc: "Pilotez notre stratégie de croissance et faites connaître JobConnect." },
    { title: "Chargé de Support Client", location: "Lomé", type: "CDD", desc: "Accompagnez nos utilisateurs au quotidien avec bienveillance." },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Rejoignez l'aventure</h1>
          <p className="text-lg text-indigo-100 max-w-2xl">
            Envie de contribuer à la transformation digitale du Togo ? Découvrez nos offres d'emploi.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pourquoi nous rejoindre ?</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3"><CheckIcon /> Une startup en pleine croissance avec un impact social réel</li>
              <li className="flex gap-3"><CheckIcon /> Un environnement de travail bienveillant et stimulant</li>
              <li className="flex gap-3"><CheckIcon /> Des opportunités d'apprentissage et d'évolution</li>
              <li className="flex gap-3"><CheckIcon /> La possibilité de construire quelque chose de grand</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Offres disponibles</h2>
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-3">{job.desc}</p>
                    </div>
                    <a href="mailto:contact@jobconnect.tg?subject=Candidature : " className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                      Postuler <Send className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 text-center border border-indigo-100">
            <Briefcase className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pas d'offre qui vous correspond ?</h3>
            <p className="text-slate-600 mb-4">Envoyez-nous votre candidature spontanée</p>
            <a href="mailto:contact@jobconnect.tg?subject=Candidature spontanée" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Nous contacter
            </a>
          </div>

        </div>
      </main>
    </div>
  )
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)