import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'ProKorb : une plateforme numérique pour rapprocher clients et professionnels au Togo',
  description: 'Découvrez ProKorb, la marketplace N°1 au Togo qui connecte les clients aux professionnels qualifiés. Plomberie, électricité, maçonnerie et plus encore.',
  openGraph: {
    title: 'ProKorb : une plateforme numérique pour rapprocher clients et professionnels',
    description: 'La marketplace de référence au Togo pour trouver des professionnels qualifiés',
    type: 'article',
    publishedTime: '2026-09-16',
    authors: ['Équipe ProKorb'],
  },
}

export default function ArticleProKorbPresentation() {
  return (
    <article className="prose prose-invert max-w-none">
      {/* En-tête de l'article */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-bold rounded-full">
            Présentation
          </span>
          <span className="text-sm text-slate-500">
            Publié le 16 septembre 2026
          </span>
          <span className="text-sm text-slate-500">•</span>
          <span className="text-sm text-slate-500">8 min de lecture</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          ProKorb : une plateforme numérique pour rapprocher clients et professionnels au Togo
        </h1>

        <p className="text-xl text-slate-400 leading-relaxed">
          À l'heure où le numérique transforme progressivement les habitudes de consommation et les modes de travail, 
          le secteur des services au Togo évolue lui aussi. Découvrez comment ProKorb facilite la mise en relation 
          entre particuliers et professionnels qualifiés.
        </p>

        {/* ✅ CHEMIN CORRIGÉ AVEC /images/ */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <Image
            src="/articles/prokorb-plateforme-numerique-togo/images/hero-prokorb.jpg"
            alt="Interface de la plateforme ProKorb montrant la connexion entre clients et professionnels"
            width={1200}
            height={630}
            className="w-full h-auto"
            priority
          />
        </div>
      </header>

      {/* Table des matières */}
      <div className="mb-12 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Sommaire</h2>
        <ul className="space-y-2 text-slate-300">
          <li><Link href="#besoin-concret" className="hover:text-indigo-400 transition-colors">Une réponse à un besoin concret</Link></li>
          <li><Link href="#competences-locales" className="hover:text-indigo-400 transition-colors">Mettre les compétences locales en valeur</Link></li>
          <li><Link href="#confiance" className="hover:text-indigo-400 transition-colors">La confiance comme élément central</Link></li>
          <li><Link href="#fonctionnement" className="hover:text-indigo-400 transition-colors">Un fonctionnement simple</Link></li>
          <li><Link href="#commission" className="hover:text-indigo-400 transition-colors">Un modèle qui annonce 0% de commission</Link></li>
          <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Des services adaptés aux besoins du quotidien</Link></li>
          <li><Link href="#contexte-togolais" className="hover:text-indigo-400 transition-colors">Une approche adaptée au contexte togolais</Link></li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="space-y-12 text-lg leading-relaxed text-slate-300">
        
        <section id="besoin-concret">
          <h2 className="text-3xl font-bold text-white mb-6">Une réponse à un besoin concret</h2>
          <p>
            Dans la vie quotidienne, les besoins en services sont nombreux : plomberie, électricité, maçonnerie, 
            peinture, mécanique, informatique, couture ou encore différents services spécialisés.
          </p>
          <p>
            Traditionnellement, pour trouver un professionnel, il faut souvent se fier au bouche-à-oreille, 
            aux recommandations de son entourage ou aux contacts enregistrés dans son téléphone. Cette méthode 
            peut fonctionner, mais elle présente certaines limites lorsqu'on recherche rapidement une personne 
            disponible, compétente et proche de son lieu d'intervention.
          </p>
          <p>
            <strong className="text-white">ProKorb cherche à simplifier cette démarche</strong> en centralisant 
            les professionnels et leurs services sur une même plateforme.
          </p>
          
          {/* ✅ CHEMIN CORRIGÉ */}
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <Image
              src="/articles/prokorb-plateforme-numerique-togo/images/interface-marketplace.jpg"
              alt="Interface de recherche de professionnels sur ProKorb"
              width={800}
              height={450}
              className="w-full h-auto"
            />
            <p className="p-4 text-sm text-slate-400 text-center">
              Interface intuitive de recherche sur ProKorb
            </p>
          </div>

          <p>
            Le client peut ainsi rechercher un service, consulter les professionnels disponibles et prendre 
            contact avec celui qui correspond à son besoin. Le professionnel, quant à lui, dispose d'un espace 
            pour présenter ses compétences et accroître sa visibilité auprès de potentiels clients.
          </p>
        </section>

        <section id="competences-locales">
          <h2 className="text-3xl font-bold text-white mb-6">Mettre les compétences locales en valeur</h2>
          <p>
            L'un des enjeux majeurs du projet est de donner davantage de visibilité aux professionnels locaux.
          </p>
          <p>
            Un artisan peut posséder plusieurs années d'expérience et maîtriser parfaitement son métier sans 
            pour autant disposer d'une présence numérique lui permettant de se faire connaître au-delà de son 
            réseau habituel.
          </p>
          <p>
            Avec ProKorb, le professionnel peut présenter son activité sur une plateforme dédiée aux services. 
            Cette présence numérique lui permet de mieux exposer son savoir-faire et de toucher des personnes 
            qui n'auraient peut-être jamais eu connaissance de ses services.
          </p>
          <p>
            La plateforme crée ainsi un pont entre la demande des clients et l'offre de compétences disponibles localement.
          </p>
        </section>

        <section id="confiance">
          <h2 className="text-3xl font-bold text-white mb-6">La confiance comme élément central</h2>
          <p>
            Dans le domaine des services, la question de la confiance est essentielle. Avant de confier un travail 
            à un professionnel, un client souhaite savoir à qui il a affaire et disposer d'un minimum d'informations 
            sur ses compétences et son identité.
          </p>
          <p>
            <strong className="text-white">ProKorb met donc en avant un système de vérification des profils professionnels.</strong> 
            Selon les informations présentées sur la plateforme, les professionnels peuvent fournir des documents 
            permettant de vérifier leur identité ainsi que leurs certifications.
          </p>
          
          {/* ✅ CHEMIN CORRIGÉ */}
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <Image
              src="/articles/prokorb-plateforme-numerique-togo/images/verification-badge.jpg"
              alt="Badge de vérification ProKorb pour les professionnels certifiés"
              width={800}
              height={450}
              className="w-full h-auto"
            />
            <p className="p-4 text-sm text-slate-400 text-center">
              Le badge bleu "Pro Vérifié" garantit l'authenticité des professionnels
            </p>
          </div>

          <p>
            Cette démarche vise à créer un environnement plus rassurant pour les utilisateurs et à favoriser 
            des relations professionnelles fondées sur la transparence.
          </p>
          <p>
            La confiance ne repose toutefois pas uniquement sur la vérification initiale. À terme, l'expérience 
            des utilisateurs, la qualité des prestations, les recommandations et les éventuels avis pourront 
            également jouer un rôle important dans la construction de la réputation des professionnels présents 
            sur la plateforme.
          </p>
        </section>

        <section id="fonctionnement">
          <h2 className="text-3xl font-bold text-white mb-6">Un fonctionnement simple</h2>
          <p>
            L'utilisation de ProKorb repose sur un principe relativement simple : permettre au client de trouver 
            le professionnel dont il a besoin sans multiplier les démarches.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl"></span>
              </div>
              <h3 className="text-white font-bold mb-2">1. Recherche</h3>
              <p className="text-sm text-slate-400">
                Le client décrit le service recherché et trouve les professionnels correspondants
              </p>
            </div>
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-white font-bold mb-2">2. Contact</h3>
              <p className="text-sm text-slate-400">
                Échange direct entre le client et le professionnel pour définir les détails
              </p>
            </div>
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-white font-bold mb-2">3. Réalisation</h3>
              <p className="text-sm text-slate-400">
                Le professionnel réalise le travail et le paiement est effectué
              </p>
            </div>
          </div>

          <p>
            Le parcours commence par la recherche ou la publication d'un besoin. Le client décrit ensuite le 
            service recherché et peut entrer en contact avec les professionnels correspondant à sa demande.
          </p>
          <p>
            Les deux parties peuvent alors échanger sur les détails de la prestation, les conditions d'intervention 
            et le prix. Une fois l'accord établi, le professionnel réalise le travail et le paiement peut être 
            effectué directement entre les deux parties.
          </p>
          <p>
            ProKorb met notamment en avant l'utilisation de solutions de paiement mobile adaptées au contexte 
            togolais, telles que <strong className="text-white">T-Money et Flooz</strong>.
          </p>
          <p>
            Cette simplicité constitue l'un des éléments importants du positionnement de la plateforme : faciliter 
            la rencontre entre celui qui recherche un service et celui qui possède la compétence nécessaire pour le réaliser.
          </p>
        </section>

        <section id="commission">
          <h2 className="text-3xl font-bold text-white mb-6">Un modèle qui annonce 0% de commission</h2>
          <p>
            ProKorb met également en avant un modèle destiné à être favorable aux professionnels.
          </p>
          <p>
            La plateforme annonce <strong className="text-emerald-400">0% de commission sur les gains des professionnels</strong>. 
            Le principe présenté est que le client paie directement le professionnel selon le montant convenu pour la prestation.
          </p>
          <p>
            Ce positionnement cherche à réduire les coûts liés à l'utilisation de la plateforme pour les prestataires 
            et à leur permettre de conserver leurs revenus issus des prestations réalisées.
          </p>
          <p>
            Pour les artisans et indépendants, l'intérêt réside donc autant dans la recherche de nouveaux clients 
            que dans la possibilité de développer leur visibilité sans avoir à céder une partie de leurs revenus 
            à chaque prestation.
          </p>
        </section>

        <section id="services">
          <h2 className="text-3xl font-bold text-white mb-6">Des services adaptés aux besoins du quotidien</h2>
          <p>
            Le site ProKorb présente plusieurs catégories de services correspondant à des besoins courants.
          </p>
          
          {/* ✅ CHEMIN CORRIGÉ */}
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <Image
              src="/articles/prokorb-plateforme-numerique-togo/images/categories-services.jpg"
              alt="Catégories de services disponibles sur ProKorb"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>

          <p>On y retrouve notamment :</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>La plomberie</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>L'électricité</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>La maçonnerie</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>La peinture</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>La mécanique</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>L'informatique</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>La couture</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>Et d'autres services professionnels</span>
            </li>
          </ul>

          <p>
            Cette diversité permet à la plateforme de s'adresser à différents profils d'utilisateurs et de couvrir 
            progressivement plusieurs domaines de la vie quotidienne.
          </p>
          <p>
            L'ambition à terme peut être de faire de ProKorb un point de passage naturel pour toute personne 
            recherchant un professionnel au Togo.
          </p>
        </section>

        <section id="contexte-togolais">
          <h2 className="text-3xl font-bold text-white mb-6">Une approche adaptée au contexte togolais</h2>
          <p>
            L'un des aspects intéressants du projet réside dans son ancrage local.
          </p>
          <p>
            ProKorb ne cherche pas simplement à reproduire un modèle de marketplace existant. La plateforme prend 
            en compte certaines réalités du marché togolais, notamment l'importance du paiement mobile, la proximité 
            géographique entre clients et prestataires et le rôle essentiel des artisans et travailleurs indépendants 
            dans l'économie locale.
          </p>
          <p>
            Le site met actuellement en avant plusieurs localités, dont <strong className="text-white">Lomé, Kpalimé et Sokodé</strong>, 
            avec l'objectif de développer progressivement son réseau.
          </p>
          <p>
            Cette dimension géographique est particulièrement importante pour une plateforme de services. Dans la 
            majorité des cas, le client ne recherche pas seulement un professionnel compétent : il recherche également 
            quelqu'un qui peut intervenir dans sa zone.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Une opportunité de digitalisation pour les professionnels</h2>
          <p>
            Au-delà de la mise en relation, ProKorb participe à une évolution plus large : la digitalisation des 
            activités professionnelles.
          </p>
          <p>
            Aujourd'hui, avoir une présence en ligne peut devenir un véritable outil de développement pour un 
            artisan ou un prestataire indépendant. Être visible sur Internet permet de présenter son activité, 
            de faciliter la prise de contact et de toucher une clientèle plus large.
          </p>
          <p>
            Pour de nombreux professionnels, cette transition représente une opportunité de passer progressivement 
            d'une visibilité essentiellement basée sur le réseau personnel à une visibilité numérique structurée.
          </p>
          <p>
            ProKorb se positionne précisément dans cette dynamique en donnant aux professionnels un espace pour 
            présenter leur activité et entrer en contact avec de nouveaux clients.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Les défis d'une marketplace de services</h2>
          <p>
            Comme toute plateforme de mise en relation, le développement de ProKorb dépendra également de sa 
            capacité à construire une communauté active et durable.
          </p>
          <p>
            Une marketplace fonctionne véritablement lorsque l'offre et la demande progressent ensemble : les 
            clients doivent trouver suffisamment de professionnels disponibles, tandis que les professionnels 
            doivent recevoir suffisamment de demandes pour trouver un intérêt réel à leur présence sur la plateforme.
          </p>
          <p>
            La qualité des profils, la fiabilité des informations, la disponibilité des professionnels, la satisfaction 
            des clients et la gestion des éventuels désaccords seront donc des éléments importants dans la construction 
            de la confiance.
          </p>
          <p>
            Le développement dans plusieurs villes du pays constituera également un enjeu majeur afin de rapprocher 
            progressivement la plateforme des utilisateurs partout au Togo.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6">ProKorb et l'avenir des services au Togo</h2>
          <p>
            La transformation numérique ouvre de nouvelles possibilités dans de nombreux secteurs de l'économie. 
            Les services de proximité ne font pas exception.
          </p>
          <p>
            Avec ProKorb, l'objectif est de créer une passerelle numérique entre les personnes qui ont besoin d'un 
            service et les professionnels qui possèdent les compétences pour le réaliser.
          </p>
          <p>
            Le projet repose sur une idée simple : <strong className="text-white">rendre les compétences locales 
            plus accessibles, plus visibles et plus faciles à trouver</strong>.
          </p>
          <p>
            En réunissant professionnels, clients, services, profils vérifiés et solutions de paiement dans un même 
            environnement numérique, ProKorb cherche à moderniser la manière dont les services sont recherchés et 
            proposés au Togo.
          </p>
        </section>

        {/* Conclusion */}
        <div className="mt-16 p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">Conclusion</h2>
          <p>
            ProKorb s'inscrit dans une nouvelle génération de plateformes numériques destinées à faciliter les 
            échanges entre professionnels et particuliers.
          </p>
          <p>
            Son ambition est de répondre à deux besoins complémentaires : permettre aux clients de trouver plus 
            facilement les services dont ils ont besoin et offrir aux artisans et prestataires une nouvelle vitrine 
            pour valoriser leurs compétences.
          </p>
          <p>
            Dans un contexte où le numérique occupe une place croissante dans les habitudes quotidiennes et 
            professionnelles, des initiatives comme ProKorb peuvent contribuer à rendre le marché des services 
            plus accessible et plus structuré.
          </p>
          <p className="text-xl font-bold text-indigo-400 mt-6">
            Le projet porte ainsi une ambition claire : connecter les besoins aux compétences et donner davantage 
            de visibilité au savoir-faire local.
          </p>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-xl text-slate-400 mb-6">
            Pour découvrir la plateforme, rendez-vous sur
          </p>
          <a 
            href="https://www.prokorb.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 text-lg"
          >
            www.prokorb.com →
          </a>
        </div>

        {/* Navigation vers d'autres articles */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-6">Articles liés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/articles"
              className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors group"
            >
              <p className="text-sm text-indigo-400 mb-2">← Retour à tous les articles</p>
              <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                Voir tous nos articles et conseils
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}