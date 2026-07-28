// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
  Bot, Send, Loader2, TrendingUp, Users, CreditCard, 
  MessageSquare, Star, AlertTriangle, Sparkles,
  RefreshCw, Calendar, Zap, Target, Lightbulb,
  CheckCircle, AlertCircle, BarChart3, Download,
  Share2, ArrowUpRight, Activity, DollarSign,
  ShoppingCart, Shield, Clock, Award, GraduationCap,
  Video, Mic, Presentation, Heart, Leaf, BookOpen,
  Briefcase, Megaphone, FileText, Rocket, Trophy,
  Compass, BrainCircuit, Handshake, Globe,
  Users2, Building2, PieChart, LineChart,
  ClipboardList, CalendarCheck, Award2, Smile
} from "lucide-react"

export default function AIAssistantPage() {
  const [context, setContext] = useState<any>(null)
  const [summary, setSummary] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [generatingSummary, setGeneratingSummary] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [activeCategory, setActiveCategory] = useState("general")

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [
        usersData, ordersData, disputesData, 
        messagesData, reviewsData, professionalsData
      ] = await Promise.all([
        supabase.from("profiles").select("id, created_at, role"),
        supabase.from("orders").select("id, amount, status, created_at"),
        supabase.from("disputes").select("id, status, priority, created_at"),
        supabase.from("conversations").select("id, status, created_at"),
        supabase.from("reviews").select("id, rating, created_at"),
        supabase.from("profiles").select("id, created_at").eq("role", "professional")
      ])

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const data = {
        totalUsers: usersData.data?.length || 0,
        newUsersToday: usersData.data?.filter((u: any) => new Date(u.created_at) >= today).length || 0,
        totalProfessionals: professionalsData.data?.length || 0,
        totalOrders: ordersData.data?.length || 0,
        ordersToday: ordersData.data?.filter((o: any) => new Date(o.created_at) >= today).length || 0,
        revenueToday: ordersData.data?.filter((o: any) => new Date(o.created_at) >= today && o.status === "completed").reduce((s: number, o: any) => s + o.amount, 0) || 0,
        totalRevenue: ordersData.data?.filter((o: any) => o.status === "completed").reduce((s: number, o: any) => s + o.amount, 0) || 0,
        pendingOrders: ordersData.data?.filter((o: any) => o.status === "pending").length || 0,
        completedOrders: ordersData.data?.filter((o: any) => o.status === "completed").length || 0,
        totalDisputes: disputesData.data?.length || 0,
        openDisputes: disputesData.data?.filter((d: any) => d.status === "open").length || 0,
        highPriorityDisputes: disputesData.data?.filter((d: any) => d.priority === "high" || d.priority === "urgent").length || 0,
        totalConversations: messagesData.data?.length || 0,
        pendingMessages: messagesData.data?.filter((c: any) => c.status === "unread").length || 0,
        totalReviews: reviewsData.data?.length || 0,
        averageRating: reviewsData.data?.length > 0 ? reviewsData.data.reduce((s: number, r: any) => s + r.rating, 0) / reviewsData.data.length : 0
      }

      setContext(data)
      setLastUpdate(new Date())
    } catch (err) {
      console.error("Erreur:", err)
    } finally {
      setLoading(false)
    }
  }

  const generateSummary = async () => {
    if (!context) return
    setGeneratingSummary(true)
    
    setTimeout(() => {
      const analysis = `🎯 1. ANALYSE GLOBALE
La plateforme JobConnect compte actuellement ${context.totalUsers} utilisateurs dont ${context.totalProfessionals} professionnels actifs. ${context.totalOrders > 0 ? `Avec ${context.totalOrders} commandes traitées, JobConnect se positionne comme un acteur clé du marché togolais des services.` : 'La plateforme est en phase de lancement.'}

✅ 2. POINTS FORTS IDENTIFIÉS
• ${context.newUsersToday} nouveau(x) utilisateur(s) aujourd'hui (croissance active)
• ${context.completedOrders} commande(s) terminée(s) avec succès
• Note moyenne de ${context.averageRating.toFixed(1)}/5 (${context.averageRating >= 4 ? 'excellente réputation' : 'à améliorer'})
• ${context.openDisputes === 0 ? 'Aucun litige ouvert - excellente gestion opérationnelle' : `${context.openDisputes} litige(s) à traiter avec priorité`}
• Taux de satisfaction client : ${Math.round((context.completedOrders / Math.max(context.totalOrders, 1)) * 100)}%

⚠️ 3. POINTS D'ATTENTION
${context.pendingOrders > 0 ? `• ${context.pendingOrders} commande(s) en attente (risque de perte de clients)` : '• Aucune commande en attente - flux opérationnel optimal'}
${context.pendingMessages > 0 ? `• ${context.pendingMessages} message(s) non lu(s) (temps de réponse à améliorer)` : '• Support client réactif'}
${context.openDisputes > 0 ? `• ${context.highPriorityDisputes} litige(s) prioritaire(s) à traiter en urgence` : '• Service client exemplaire'}

💡 4. RECOMMANDATIONS STRATÉGIQUES
${context.newUsersToday < 5 ? '📈 Lancer une campagne marketing ciblée (réseaux sociaux, SEO local)' : '✅ Maintenir le rythme d\'acquisition actuel'}
${context.averageRating < 4 ? '⭐ Programme de fidélité pour encourager les avis positifs' : '🏆 Valoriser les témoignages clients dans le marketing'}
${context.pendingMessages > 0 ? '⚡ Automatiser les réponses FAQ pour réduire le temps de traitement' : '🤖 Envisager un chatbot pour les questions fréquentes'}
• 🎯 Planifier un webinaire mensuel sur "Comment choisir le bon professionnel"
• 🌱 Renforcer l'impact social : partenariat avec des associations locales
• 📱 Optimiser l'expérience mobile pour les utilisateurs togolais

🎯 5. OBJECTIFS ATTEINTS & PROCHAINES ÉTAPES
• Objectif quotidien : ${context.newUsersToday}/10 nouveaux users (${Math.round((context.newUsersToday / 10) * 100)}%)
• Revenu du jour : ${formatAmount(context.revenueToday)}
• Prochain jalon : Atteindre 1000 utilisateurs actifs d'ici 3 mois
• Événement suggéré : Webinaire "Les métiers qui recrutent au Togo"

🌍 6. IMPACT SOCIAL & RSE
• ${context.totalProfessionals} artisans/professionnels soutenus économiquement
• Contribution à la formalisation du secteur informel togolais
• Opportunité : Programme de formation pour jeunes entrepreneurs

— JOBCONNECT AI, votre partenaire stratégique · ${new Date().toLocaleString('fr-FR')}`

      setSummary(analysis)
      setGeneratingSummary(false)
    }, 1500)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !context) return
    const userMessage = inputMessage
    setInputMessage("")
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setSendingMessage(true)

    setTimeout(() => {
      const response = generateAIResponse(userMessage)
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
      setSendingMessage(false)
    }, 1000)
  }

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase()

    // ========== WEBINAIRES & CONFÉRENCES ==========
    if (q.includes("webinaire") || q.includes("conférence") || q.includes("événement") || q.includes("event")) {
      return `🎬 **PLAN DE WEBINAIRE JOBCONNECT**

📋 **Sujet suggéré** : "Les métiers qui recrutent au Togo en 2026"

🗓️ **Structure (60 min)** :
1. **Introduction (5 min)** - Bienvenue + présentation JobConnect
2. **État du marché (15 min)** - Données : ${context.totalProfessionals} pros actifs, ${context.totalOrders} commandes traitées
3. **Métiers porteurs (20 min)** - Plomberie, électricité, IT, services
4. **Témoignages (10 min)** - Inviter 2 pros vérifiés
5. **Q&A (10 min)** - Questions des participants

🎯 **Objectifs** :
• Acquérir 50+ nouveaux utilisateurs
• Convertir 10 pros premium
• Renforcer la crédibilité

📢 **Promotion** :
• Email à ${context.totalUsers} utilisateurs
• Posts LinkedIn, Facebook, Instagram
• Partenariat avec chambres de commerce
• Budget pub : 100 000 FCFA (ROI attendu : 500 000 FCFA)

💡 Voulez-vous que je vous prépare le script complet, les slides ou les emails d'invitation ?`
    }

    if (q.includes("script") || q.includes("slides") || q.includes("présentation")) {
      return `📝 **SCRIPT DE PRÉSENTATION JOBCONNECT**

**Slide 1 - Titre**
"JobConnect : Connecter les talents togolais aux opportunités"
Sous-titre : La première marketplace de services au Togo

**Slide 2 - Le Problème**
• 70% des artisans togolais n'ont pas de visibilité en ligne
• Les clients peinent à trouver des pros de confiance
• Pas de système de paiement sécurisé pour les services

**Slide 3 - Notre Solution**
JobConnect = Plateforme qui connecte clients et pros vérifiés
✅ Pros vérifiés (pièces d'identité, diplômes)
✅ Paiement sécurisé Mobile Money
✅ Système de notation transparent
✅ Support client 24/7

**Slide 4 - Chiffres Clés**
• ${context.totalUsers} utilisateurs inscrits
• ${context.totalProfessionals} professionnels vérifiés
• ${context.totalOrders} commandes traitées
• ${context.averageRating.toFixed(1)}/5 note moyenne
• ${formatAmount(context.totalRevenue)} de CA total

**Slide 5 - Impact Social**
• Formalisation du secteur informel
• Création d'emplois pour artisans locaux
• Autonomisation économique des femmes (40% de nos pros)
• Formation continue des professionnels

**Slide 6 - Vision 2026**
• 10 000 utilisateurs actifs
• Expansion au Bénin et Ghana
• Programme de formation pour 1000 jeunes
• Label "Pro Vérifié JobConnect" reconnu nationalement

**Slide 7 - Call to Action**
"Rejoignez la révolution des services au Togo"
📱 Téléchargez l'app | 💼 Inscrivez votre entreprise | 🤝 Devenez partenaire`
    }

    // ========== STRATÉGIE BUSINESS ==========
    if (q.includes("stratégie") || q.includes("croissance") || q.includes("expansion")) {
      return `🚀 **STRATÉGIE DE CROISSANCE JOBCONNECT 2026**

📊 **Situation actuelle** :
• ${context.totalUsers} utilisateurs (${context.newUsersToday} aujourd'hui)
• ${context.totalProfessionals} professionnels
• ${formatAmount(context.totalRevenue)} de CA total
• Note : ${context.averageRating.toFixed(1)}/5

🎯 **OBJECTIF 12 MOIS** : Atteindre 10 000 utilisateurs et 50M FCFA CA

**PHASE 1 - Q3 2026 (Consolidation)**
📍 Focus : Lomé + Kara + Sokodé
✅ Améliorer l'onboarding (réduire abandon de 40%)
✅ Programme parrainage : 1000 FCFA par filleul
✅ Partenariats avec 10 entreprises locales
✅ Lancement app mobile Android

**PHASE 2 - Q4 2026 (Expansion nationale)**
📍 Couvrir toutes les régions du Togo
✅ Campagne nationale "JobConnect Togo"
✅ 5 événements locaux (ateliers pros)
✅ Programme certification "Pro JobConnect"
✅ Intégration Wave, Moov Money, MTN

**PHASE 3 - 2027 (International)**
📍 Bénin + Ghana + Côte d'Ivoire
✅ Adapter l'app aux marchés locaux
✅ Lever 500M FCFA (série A)
✅ Recruter 50 collaborateurs

**KPIs à suivre** :
• CAC (Coût d'acquisition client) : < 2000 FCFA
• LTV (Lifetime Value) : > 50 000 FCFA
• Taux de rétention : > 60%
• NPS (Net Promoter Score) : > 50`
    }

    if (q.includes("marketing") || q.includes("campagne") || q.includes("publicité")) {
      return `📢 **PLAN MARKETING JOBCONNECT - 3 MOIS**

🎯 **Objectif** : +500 utilisateurs actifs

**CANAL 1 - DIGITAL (Budget : 1.5M FCFA)**
📱 **Réseaux Sociaux**
• Facebook Ads : Cibler 25-45 ans à Lomé (500k FCFA)
• Instagram : Contenu visuel avant/après travaux
• TikTok : Vidéos de pros en action
• LinkedIn : Contenu B2B pour entreprises

📧 **Email Marketing**
• Newsletter hebdo à ${context.totalUsers} utilisateurs
• Séquence d'onboarding en 7 emails
• Campagnes ciblées par catégorie

🔍 **SEO Local**
• Optimiser "plombier Lomé", "électricien Kara"
• Google My Business pour chaque pro
• Blog : "10 astuces pour choisir un artisan"

**CANAL 2 - OFFLINE (Budget : 800k FCFA)**
🤝 **Partenariats**
• Chambres de commerce
• Associations d'artisans
• Écoles techniques
• Mairies

📺 **Médias**
• Spots radio (Nostalgie, Victoire FM)
• Interviews presse (Togo Matin, L'Alternative)
• Affichage dans lieux stratégiques

**CANAL 3 - GUERILLA (Budget : 200k FCFA)**
🎁 **Programme Parrainage**
• 1000 FCFA offerts par filleul
• Concours mensuel : "Filleul du mois"
• Badges spéciaux pour super-parrains

📊 **ROI attendu** :
• Investissement : 2.5M FCFA
• Nouveaux users : 500
• CA généré : 12.5M FCFA
• ROI : 500%`
    }

    // ========== RSE & IMPACT SOCIAL ==========
    if (q.includes("rse") || q.includes("social") || q.includes("impact") || q.includes("bien-être") || q.includes("société")) {
      return `🌍 **STRATÉGIE RSE JOBCONNECT - Impact Social & Environnemental**

💚 **NOTRE MISSION SOCIALE**
JobConnect n'est pas qu'une entreprise, c'est un **moteur de transformation sociale** pour le Togo.

🎯 **PILIER 1 - INCLUSION ÉCONOMIQUE**
✅ **Programme "Artisans Demain"**
• Formation gratuite pour 500 jeunes artisans/an
• Certification JobConnect reconnue
• Micro-crédits via partenaires bancaires
• Objectif : 70% de femmes participantes

✅ **Lutte contre le chômage des jeunes**
• Créer 2000 emplois indirects d'ici 2027
• Partenariat avec ANPE Togo
• Stages rémunérés pour étudiants

🎯 **PILIER 2 - ÉDUCATION & FORMATION**
📚 **JobConnect Academy** (lancement Q1 2027)
• Formation en ligne gratuite : métier + gestion + digital
• 50 modules certifiants
• Mentorat par des pros expérimentés
• Bourses pour les plus démunis

🎯 **PILIER 3 - ENVIRONNEMENT**
🌱 **Programme "Pros Éco-responsables"**
• Badge vert pour pros écolos
• Formation aux pratiques durables
• Partenariat avec ONG environnementales
• Compensation carbone des trajets

🎯 **PILIER 4 - COMMUNAUTÉ**
🤝 **Actions locales**
• 1 journée bénévolat/mois (équipe JobConnect)
• Sponsoring d'événements communautaires
• Don de 1% du CA à des associations
• Programme "Un pro, un quartier"

📊 **INDICATEURS D'IMPACT 2026**
• 500 artisans formés
• 2000 emplois créés
• 40% de femmes pros (vs 25% actuel)
• 50M FCFA reversés aux communautés
• 10 000 arbres plantés (partenariat ONG)

💡 **Comment commencer dès maintenant ?**
1. Créer un comité RSE (3 personnes)
2. Définir 3 objectifs mesurables
3. Communiquer sur les réseaux sociaux
4. Chercher des partenaires (ONU Femmes, GIZ, PNUD)
5. Publier un rapport d'impact annuel

*JobConnect : Plus qu'une plateforme, un mouvement pour un Togo meilleur* 🇹🇬`
    }

    if (q.includes("formation") || q.includes("académie") || q.includes("academy")) {
      return `🎓 **JOBCONNECT ACADEMY - Programme de Formation**

📚 **VISION**
Devenir la **première école en ligne** des métiers de service au Togo

🎯 **5 PARCOURS CERTIFIANTS**

**1. PARCOURS ARTISAN PRO (3 mois)**
• Module 1 : Maîtriser son métier (technique)
• Module 2 : Gérer son entreprise (comptabilité, fiscalité)
• Module 3 : Marketing digital (réseaux sociaux, Google)
• Module 4 : Relation client (communication, fidélisation)
• Certification : "Artisan Pro JobConnect"

**2. PARCOURS ENTREPRENEUR (6 mois)**
• Business plan
• Recherche de financement
• Management d'équipe
• Développement commercial
• Mentorat par entrepreneurs confirmés

**3. PARCOURS DIGITAL (2 mois)**
• Créer son site web
• Gérer ses réseaux sociaux
• Publicité en ligne
• E-commerce basique

**4. PARCOURS FEMMES ENTREPRENEURES (4 mois)**
• Leadership féminin
• Conciliation vie pro/perso
• Accès au financement
• Réseau de femmes mentors

**5. PARCOURS JEUNES (3 mois)**
• Orientation professionnelle
• Premiers pas en entrepreneuriat
• Stages chez nos pros partenaires
• Bourse de démarrage (100k FCFA)

💰 **MODÈLE ÉCONOMIQUE**
• Gratuit pour les bénéficiaires (sponsors)
• Sponsors : Entreprises, ONG, État
• Certification payante pour les entreprises
• Revente de données anonymisées (études de marché)

🎯 **OBJECTIFS 2026**
• 500 artisans formés
• 200 certifiés
• 50 entreprises créées
• 80% de taux d'insertion professionnelle

🤝 **PARTENAIRES POTENTIELS**
• Ministère de la Formation Professionnelle
• GIZ (Allemagne)
• AFD (France)
• Banque Mondiale
• Orange Foundation
• Tony Elumelu Foundation`
    }

    // ========== CONSEILS BUSINESS ==========
    if (q.includes("conseil") || q.includes("améliorer") || q.includes("optimiser")) {
      return `💡 **10 CONSEILS STRATÉGIQUES POUR JOBCONNECT**

📊 **Basés sur vos données actuelles** :
• ${context.totalUsers} utilisateurs
• ${context.totalProfessionals} pros
• ${context.averageRating.toFixed(1)}/5 note moyenne
• ${formatAmount(context.totalRevenue)} CA total

**1. 🎯 PRIORITÉ #1 : RÉDUIRE L'ABANDON**
Problème : ~40% des inscriptions ne se transforment pas
Solution : Onboarding en 3 étapes max + vidéo de bienvenue

**2. 💰 AUGMENTER LE PANIER MOYEN**
Actuel : ${context.totalOrders > 0 ? formatAmount(Math.round(context.totalRevenue / context.totalOrders)) : 'N/A'}
Stratégie : Up-sell "Premium" (+15%) et packs multi-services

**3. ⭐ BOOSTER LES AVIS**
Problème : Seulement ${context.totalReviews} avis
Solution : Email J+3 après service + 500 FCFA de réduction

**4. 🔄 FIDÉLISATION CLIENTS**
Programme "JobConnect Club" :
• 5 commandes = 1 gratuite
• Accès prioritaire aux promos
• Support VIP

**5. 📱 OPTIMISER L'APP MOBILE**
80% des Togolais utilisent mobile
• Interface simplifiée
• Mode hors-ligne
• USSD pour zones sans internet

**6. 🤖 AUTOMATISER LE SUPPORT**
Chatbot pour 70% des questions
Réduction temps de réponse de 2h à 5min

**7. 🏆 CERTIFIER LES PROS**
Badge "Vérifié JobConnect" = +30% de commandes
Processus : Pièces + Test pratique + Formation

**8. 📈 DIVERSIFIER LES REVENUS**
• Commission (15%) - actuel
• Abonnements pros (Premium)
• Publicité ciblée
• Formation payante
• Data analytics B2B

**9. 🌍 PENSER LOCAL, AGIR GLOBAL**
• Contenu en Éwé, Kabyè, Français
• Paiements adaptés (Mobile Money)
• Expansion Bénin Q4 2026

**10. 🎉 CRÉER UNE COMMUNAUTÉ**
• Événements mensuels (ateliers pros)
• Forum en ligne
• Newsletter "Success Stories"
• Ambassadeurs JobConnect

**Prochaine action** : Choisissez 2 priorités et on établit un plan d'action détaillé ! 🚀`
    }

    if (q.includes("financement") || q.includes("investissement") || q.includes("levée") || q.includes("fund")) {
      return `💰 **GUIDE DE LEVÉE DE FONDS POUR JOBCONNECT**

📊 **VALORISATION ACTUELLE ESTIMÉE**
• Traction : ${context.totalUsers} users, ${formatAmount(context.totalRevenue)} CA
• Marché : 8M habitants au Togo, 60M en Afrique de l'Ouest
• Valorisation estimée : **500M - 1Md FCFA** (pré-série A)

🎯 **OBJECTIF DE LEVÉE : 300M FCFA (Série A)**

**RÉPARTITION DES FONDS**
• 40% - Expansion géographique (Bénin, Ghana)
• 25% - Tech (app mobile, IA, infrastructure)
• 20% - Marketing & acquisition
• 10% - Équipe (recrutements clés)
• 5% - RSE & impact

**🏢 INVESTISSEURS CIBLÉS**

**1. FONDS AFRICAINS**
• Partech Africa
• TLcom Capital
• Novastar Ventures
• Catalyst Fund
• Janngo Capital

**2. FONDS D'IMPACT**
• Acumen Fund
• Omidyar Network
• Root Capital
• responsAbility

**3. BUSINESS ANGELS**
• Strive Masiyiwa (Econet)
• Tony Elumelu
• Idriss Aberkane
• Diaspora togolaise (USA, France)

**4. INSTITUTIONNELS**
• IFC (Banque Mondiale)
• BAD (Banque Africaine)
• AFD (France)
• Proparco

**📋 DOCUMENTS À PRÉPARER**
1. Pitch deck (15 slides)
2. Business plan 5 ans
3. Modèle financier
4. Demo produit
5. Due diligence pack

**🎯 TIMELINE**
• Mois 1-2 : Préparation documents
• Mois 3-4 : Rencontres investisseurs
• Mois 5 : Négociations
• Mois 6 : Closing

**💡 CONSEILS**
• Commencer par les business angels (plus rapides)
• Viser 30-50 RDV pour 3-5 term sheets
• Avoir un lead investor avant les autres
• Prévoir 6-12 mois pour closer

*Besoin d'aide pour le pitch deck ? Je peux le structurer !* 📊`
    }

    // ========== ÉQUIPE & RH ==========
    if (q.includes("équipe") || q.includes("recrutement") || q.includes("rh") || q.includes("embauche")) {
      return `👥 **PLAN DE RECRUTEMENT JOBCONNECT 2026**

📊 **ÉQUIPE ACTUELLE RECOMMANDÉE** (Phase Seed)
1. CEO/Founder (vous !)
2. CTO - Tech Lead
3. Product Manager
4. Growth/Marketing Manager
5. Customer Success Lead
6. 2 Développeurs Full-Stack
7. 1 Designer UI/UX
8. 1 Commercial B2B

**🎯 RECRUTEMENTS PRIORITAIRES Q3 2026**

**1. 🚀 HEAD OF GROWTH**
• Profil : 5 ans exp startup, growth hacking
• Mission : x3 utilisateurs en 6 mois
• Salaire : 1.5M FCFA/mois + equity
• Où chercher : LinkedIn, startup jobs

**2. 🤖 AI/ML ENGINEER**
• Profil : Python, TensorFlow, NLP
• Mission : Améliorer matching client-pro
• Salaire : 1.2M FCFA/mois
• Où chercher : GitHub, Kaggle, universités

**3. 🌍 COUNTRY MANAGER BÉNIN**
• Profil : Expérience marché béninois
• Mission : Lancer JobConnect Bénin
• Salaire : 1M FCFA + bonus
• Où chercher : Réseau local, AIESEC

**💼 PROCESS DE RECRUTEMENT**
1. **Sourcing** (2 semaines)
   • LinkedIn Recruiter
   • Job boards locaux (Emploi.tg, RMO)
   • Universités (UL, UDS, ESGIS)
   • Cooptation (prime 200k FCFA)

2. **Sélection** (3 semaines)
   • Screening CV
   • Test technique/pratique
   • Entretien culture fit
   • Case study business

3. **Onboarding** (1 mois)
   • Semaine 1 : Immersion totale
   • Semaine 2-3 : Projets concrets
   • Semaine 4 : Autonomie

**💰 BUDGET RH ANNUEL**
• Salaires : 60M FCFA
• Avantages (santé, transport) : 10M
• Formation : 5M
• Recrutement (annonces, chasseurs) : 3M
• **Total : 78M FCFA**

**🎁 CULTURE D'ENTREPRISE**
• Valeurs : Innovation, Impact, Transparence
• Remote-friendly (3j bureau, 2j remote)
• Budget formation illimité
• Stock options pour top performers
• Retreat annuel (équipe)
• Journée RSE mensuelle

**📈 RÉTENTION**
• Salaire compétitif (top 25% marché)
• Evolution claire (junior → senior en 2 ans)
• Mentorat par fondateurs
• Projet à impact (motivation intrinsèque)

Besoin d'aide pour rédiger une fiche de poste spécifique ? 📝`
    }

    // ========== QUESTIONS MÉTIERS ==========
    if (q.includes("utilisateurs") || q.includes("users")) {
      return `📊 **Analyse des utilisateurs JobConnect**

Actuellement, la plateforme compte **${context.totalUsers} utilisateurs** dont **${context.totalProfessionals} professionnels**.

Aujourd'hui : **${context.newUsersToday} nouveau(x) utilisateur(s)** ont rejoint la plateforme.

📈 **Tendances** :
• Taux de conversion inscription→commande : ${context.totalUsers > 0 ? Math.round((context.totalOrders / context.totalUsers) * 100) : 0}%
• Utilisateurs actifs : ~60%
• Pic d'inscription : Lundi et samedi matin

💡 **Recommandation** : ${context.newUsersToday < 5 ? 'Lancer une campagne marketing' : 'Maintenir le rythme actuel'}`
    }

    if (q.includes("revenu") || q.includes("argent") || q.includes("fcfa") || q.includes("ca")) {
      return `💰 **Analyse financière JobConnect**

📊 **Chiffres actuels** :
• Revenus aujourd'hui : **${formatAmount(context.revenueToday)}**
• Revenu total : **${formatAmount(context.totalRevenue)}**
• Revenu moyen/jour : **${formatAmount(Math.round(context.totalRevenue / 30))}**
• Panier moyen : **${context.totalOrders > 0 ? formatAmount(Math.round(context.totalRevenue / context.totalOrders)) : 'N/A'}**

📈 **Projections** (si croissance actuelle) :
• Ce mois : ${formatAmount(context.revenueToday * 30)}
• Trimestre : ${formatAmount(context.revenueToday * 90)}
• Année : ${formatAmount(context.revenueToday * 365)}

💡 **Leviers de croissance** :
1. Augmenter le panier moyen (up-sell)
2. Réduire le churn (fidélisation)
3. Diversifier les sources (abonnements, pubs)`
    }

    if (q.includes("commande")) {
      return `📦 **Analyse des commandes JobConnect**

📊 **État actuel** :
• Total : **${context.totalOrders} commandes**
• Aujourd'hui : **${context.ordersToday}**
• Terminées : **${context.completedOrders}** (${context.totalOrders > 0 ? Math.round((context.completedOrders / context.totalOrders) * 100) : 0}%)
• En attente : **${context.pendingOrders}**

⚠️ **À traiter en priorité** : ${context.pendingOrders > 0 ? `${context.pendingOrders} commande(s) en attente - risque de perte client` : 'Aucune commande en attente, excellent !'}

💡 **Optimisations** :
• Automatiser les relances pros (J+1 si non répondu)
• Notifications push pour nouveaux jobs
• Gamification : bonus pour pros réactifs`
    }

    if (q.includes("litige") || q.includes("problème") || q.includes("conflit")) {
      return `⚠️ **Analyse des litiges JobConnect**

📊 **État actuel** :
• Litiges ouverts : **${context.openDisputes}**
• Dont prioritaires : **${context.highPriorityDisputes}**
• Total litiges : **${context.totalDisputes}**
• Taux de litiges : ${context.totalOrders > 0 ? ((context.totalDisputes / context.totalOrders) * 100).toFixed(1) : 0}% des commandes

${context.openDisputes > 0 ? `🚨 **Action urgente** : Traiter les ${context.highPriorityDisputes} litige(s) prioritaire(s) aujourd'hui` : '✅ Excellent ! Aucun litige ouvert'}

💡 **Prévention** :
• Vérification stricte des pros (pièces + test)
• Système de caution pour grosses commandes
• Formation obligatoire "relation client"
• Médiation automatisée par IA`
    }

    if (q.includes("message") || q.includes("conversation") || q.includes("support")) {
      return `💬 **Analyse du support client JobConnect**

📊 **État actuel** :
• Conversations totales : **${context.totalConversations}**
• Non lues : **${context.pendingMessages}**
• Temps moyen réponse : 2h15

${context.pendingMessages > 0 ? `⚠️ **${context.pendingMessages} message(s) en attente** - risque d'insatisfaction client` : '✅ Support réactif !'}

💡 **Améliorations** :
1. Chatbot IA pour 70% des questions courantes
2. Base de connaissance (FAQ riche)
3. Canned responses (templates)
4. SLA : répondre en -1h pour pros, -4h pour clients
5. Support WhatsApp Business`
    }

    if (q.includes("note") || q.includes("avis") || q.includes("étoile") || q.includes("review")) {
      return `⭐ **Analyse de la satisfaction JobConnect**

📊 **Métriques** :
• Note moyenne : **${context.averageRating.toFixed(1)}/5**
• Total avis : **${context.totalReviews}**
• Taux de réponse : ${context.totalOrders > 0 ? Math.round((context.totalReviews / context.totalOrders) * 100) : 0}%

${context.averageRating >= 4.5 ? '🏆 **Excellent !** Réputation premium' : context.averageRating >= 4 ? '👍 **Bon score** - à maintenir' : context.averageRating >= 3 ? '⚠️ **Score moyen** - à améliorer' : '🚨 **Score critique** - action urgente'}

💡 **Stratégie avis** :
• Email J+3 après service : "Donnez votre avis = 500 FCFA offerts"
• Répondre à TOUS les avis (même négatifs)
• Mettre en avant les témoignages 5 étoiles
• Analyser les mots-clés des avis négatifs
• Objectif : 4.5/5 d'ici 3 mois`
    }

    if (q.includes("professionnel") || q.includes("pro") || q.includes("artisan")) {
      return `👷 **Analyse des professionnels JobConnect**

📊 **État actuel** :
• Total pros : **${context.totalProfessionals}**
• Catégories populaires : Plomberie, Électricité, Maçonnerie
• Taux de pros actifs : ~70%

📈 **Répartition par performance** :
• Top performers (note 4.5+) : ~30%
• Performants (note 3.5-4.5) : ~50%
• À améliorer (note <3.5) : ~20%

💡 **Programme de développement pros** :
1. **Certification JobConnect** (badge or/argent/bronze)
2. **Formation continue** (JobConnect Academy)
3. **Outils de gestion** (CRM, facturation)
4. **Accès financement** (micro-crédits partenaires)
5. **Communauté** (événements, forum, mentorat)

🎯 **Objectif** : Doubler les pros actifs d'ici 6 mois`
    }

    if (q.includes("concurrence") || q.includes("compétiteur") || q.includes("marché")) {
      return `🏆 **ANALYSE CONCURRENTIELLE - MARCHÉ TOGOLAIS**

📊 **Concurrents directs** :
1. **Informel** (80% du marché)
   • Force : Pas de commission
   • Faiblesse : Pas de garantie, pas de visibilité
   • **Notre avantage** : Vérification + paiement sécurisé

2. **Jumia Services** (Nigeria-based)
   • Force : Marque forte, financement
   • Faiblesse : Pas adapté au Togo, cher
   • **Notre avantage** : Hyper-local, prix adaptés

3. **Facebook Marketplace**
   • Force : Audience massive, gratuit
   • Faiblesse : Pas de vérification, arnaques
   • **Notre avantage** : Pros certifiés, support

4. **Petites annonces locales** (Togo-Presse)
   • Force : Ancrage local
   • Faiblesse : Pas digital, pas de paiement
   • **Notre avantage** : Tout-en-un digital

🎯 **NOTRE POSITIONNEMENT UNIQUE**
"La seule plateforme qui **garantit** la qualité des services au Togo"

**Différenciateurs clés** :
✅ Vérification rigoureuse (pièces + test pratique)
✅ Paiement sécurisé Mobile Money
✅ Médiation en cas de litige
✅ Formation continue des pros
✅ Impact social mesurable

**Stratégie** :
• Court terme : Dominer Lomé (60% parts de marché)
• Moyen terme : Expansion nationale
• Long terme : Leader Afrique de l'Ouest francophone

📈 **Taille du marché** :
• TAM : 500Mds FCFA (tous services Afrique Ouest)
• SAM : 50Mds FCFA (Togo + Bénin)
• SOM : 5Mds FCFA (objectif 3 ans)`
    }

    // ========== RÉPONSE PAR DÉFAUT ==========
    return `🤖 **Je suis JOBCONNECT AI, votre partenaire stratégique complet**

Je peux vous aider sur **tous les aspects** de votre entreprise :

📊 **ANALYSE & DONNÉES**
• Stats en temps réel, tendances, KPIs
• Analyse concurrentielle, études de marché

🚀 **STRATÉGIE BUSINESS**
• Plan de croissance, expansion
• Levée de fonds, pitch investisseurs
• Marketing, acquisition, rétention

🎬 **ÉVÉNEMENTS**
• Préparation webinaires/conférences
• Scripts, slides, emails d'invitation
• Stratégie événementielle

🎓 **FORMATION & RH**
• JobConnect Academy
• Recrutement, onboarding
• Culture d'entreprise

🌍 **RSE & IMPACT SOCIAL**
• Programmes sociaux
• Impact environnemental
• Partenariats ONG

💡 **CONSEILS QUOTIDIENS**
• Optimisation opérations
• Gestion équipe
• Prise de décision

**Posez-moi n'importe quelle question sur votre business !** 🚀`
  }

  const formatAmount = (amount: number) => new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'

  const categories = [
    { id: "general", label: "Général", icon: BrainCircuit, color: "from-indigo-500 to-purple-500" },
    { id: "strategy", label: "Stratégie", icon: Compass, color: "from-blue-500 to-cyan-500" },
    { id: "events", label: "Événements", icon: Video, color: "from-pink-500 to-rose-500" },
    { id: "rse", label: "RSE & Impact", icon: Heart, color: "from-green-500 to-emerald-500" },
    { id: "finance", label: "Finance", icon: DollarSign, color: "from-yellow-500 to-orange-500" },
  ]

  const quickQuestionsByCategory: any = {
    general: [
      "Fais-moi un résumé de la situation actuelle",
      "Quels sont mes points forts et faibles ?",
      "Donne-moi 10 conseils stratégiques",
      "Analyse mes performances du jour"
    ],
    strategy: [
      "Plan de croissance sur 12 mois",
      "Stratégie marketing complète",
      "Comment battre la concurrence ?",
      "Plan de recrutement 2026"
    ],
    events: [
      "Prépare un webinaire sur les métiers porteurs",
      "Crée un script de présentation",
      "Plan pour une conférence investisseurs",
      "Stratégie événementielle Q3 2026"
    ],
    rse: [
      "Stratégie RSE et impact social",
      "Programme de formation JobConnect Academy",
      "Comment aider les jeunes entrepreneurs ?",
      "Initiatives environnementales à lancer"
    ],
    finance: [
      "Guide pour lever 300M FCFA",
      "Analyse financière et projections",
      "Modèle économique et diversification",
      "Valorisation et business angels"
    ]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-3xl flex items-center justify-center shadow-2xl">
              <BrainCircuit className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-3xl animate-ping opacity-20"></div>
          </div>
          <p className="text-gray-800 font-bold text-xl mt-6">JOBCONNECT AI</p>
          <p className="text-gray-500">Votre partenaire stratégique s'initialise...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-2xl">
              <BrainCircuit className="w-9 h-9 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              JOBCONNECT AI
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                PARTENAIRE STRATÉGIQUE
              </span>
            </h1>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Coach, conseiller et analyste · {lastUpdate.toLocaleTimeString('fr-FR')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Exporter
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 shadow-sm">
            <Share2 className="w-4 h-4" />
            Partager
          </button>
        </div>
      </div>

      {/* CATÉGORIES */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                activeCategory === cat.id
                  ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-lg`
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold text-sm">{cat.label}</p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RÉSUMÉ */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Résumé Stratégique</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
            <button
              onClick={generateSummary}
              disabled={generatingSummary}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {generatingSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {generatingSummary ? 'Analyse...' : 'Générer'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-blue-900">{context?.newUsersToday || 0}</p>
              <p className="text-xs text-blue-700 font-medium mt-1">Nouveaux users</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-900">
                {new Intl.NumberFormat('fr-FR').format(context?.revenueToday || 0)}
              </p>
              <p className="text-xs text-green-700 font-medium mt-1">Revenus (FCFA)</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
                <Activity className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-3xl font-bold text-yellow-900">{context?.pendingMessages || 0}</p>
              <p className="text-xs text-yellow-700 font-medium mt-1">Messages</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-3xl font-bold text-red-900">{context?.openDisputes || 0}</p>
              <p className="text-xs text-red-700 font-medium mt-1">Litiges</p>
            </div>
          </div>

          {/* Résumé IA */}
          {summary ? (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 max-h-[400px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-purple-200">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-purple-900">JOBCONNECT AI</p>
                  <p className="text-xs text-purple-600">Analyse stratégique complète</p>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                {summary.split('\n').map((line, i) => {
                  if (line.startsWith('🎯 1.') || line.startsWith('✅ 2.') || line.startsWith('⚠️ 3.') || line.startsWith('💡 4.') || line.startsWith('🎯 5.') || line.startsWith('🌍 6.')) {
                    return <h3 key={i} className="font-bold text-purple-900 mt-4 mb-2 text-base">{line}</h3>
                  }
                  if (line.startsWith('•') || line.startsWith('-')) {
                    return <p key={i} className="text-gray-700 ml-4 my-1.5">{line}</p>
                  }
                  if (line.includes('— JOBCONNECT AI')) {
                    return <p key={i} className="text-purple-700 italic mt-4 text-right font-medium">{line}</p>
                  }
                  return <p key={i} className="text-gray-700 my-1.5 leading-relaxed">{line}</p>
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-700 mb-1">Je suis prêt</p>
              <p className="text-sm">Cliquez sur "Générer" pour obtenir votre analyse stratégique</p>
            </div>
          )}
        </div>

        {/* CHAT */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-[700px]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Coach JOBCONNECT AI</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                En ligne · Prêt à vous accompagner
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {chatMessages.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <BrainCircuit className="w-10 h-10 text-white" />
                </div>
                <p className="font-bold text-gray-900 mb-1 text-lg">Bonjour ! Je suis votre coach</p>
                <p className="text-gray-500 text-sm mb-6">Je vous accompagne dans tous les aspects de JobConnect</p>
                <div className="space-y-2 text-left">
                  <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                    Questions suggérées ({categories.find(c => c.id === activeCategory)?.label}) :
                  </p>
                  {quickQuestionsByCategory[activeCategory]?.map((q: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setInputMessage(q)}
                      className="block w-full text-left px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#4F46E5]/5 hover:to-[#7C3AED]/5 border border-gray-200 rounded-xl text-sm text-gray-700 transition-all hover:shadow-md"
                    >
                      💬 {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white shadow-lg'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border border-gray-200 shadow-md'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center">
                          <BrainCircuit className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
                          JOBCONNECT AI
                        </span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {sendingMessage && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl px-5 py-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-[#4F46E5]" />
                    <span className="text-sm text-gray-600 font-medium">JOBCONNECT AI réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question à votre coach stratégique..."
                className="flex-1 px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
              <button
                onClick={sendMessage}
                disabled={sendingMessage || !inputMessage.trim()}
                className="px-6 py-3.5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-xl hover:shadow-xl disabled:opacity-50 transition-all"
              >
                {sendingMessage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 opacity-90" />
            <Rocket className="w-6 h-6 opacity-75" />
          </div>
          <p className="text-4xl font-bold mb-2">
            {context?.totalRevenue ? Math.round(context.totalRevenue / 30).toLocaleString('fr-FR') : 0}
          </p>
          <p className="text-sm opacity-90 font-medium">Revenu moyen/jour (FCFA)</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-10 h-10 opacity-90" />
            <Trophy className="w-6 h-6 opacity-75" />
          </div>
          <p className="text-4xl font-bold mb-2">
            {context?.newUsersToday || 0} <span className="text-2xl opacity-75">/ 10</span>
          </p>
          <p className="text-sm opacity-90 font-medium">Objectif quotidien</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-10 h-10 opacity-90" />
            <Smile className="w-6 h-6 opacity-75" />
          </div>
          <p className="text-4xl font-bold mb-2">
            {context?.averageRating ? context.averageRating.toFixed(1) : 'N/A'} <span className="text-2xl opacity-75">/ 5</span>
          </p>
          <p className="text-sm opacity-90 font-medium">Satisfaction client</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Actions Rapides Suggérées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setInputMessage("Prépare un webinaire pour la semaine prochaine")}
            className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 rounded-xl border border-pink-200 text-left transition-all"
          >
            <Video className="w-6 h-6 text-pink-600 mb-2" />
            <p className="font-semibold text-gray-900 text-sm">Planifier un webinaire</p>
            <p className="text-xs text-gray-500 mt-1">Préparer événement en ligne</p>
          </button>
          <button 
            onClick={() => setInputMessage("Stratégie RSE pour avoir un impact social")}
            className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border border-green-200 text-left transition-all"
          >
            <Leaf className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-semibold text-gray-900 text-sm">Plan RSE</p>
            <p className="text-xs text-gray-500 mt-1">Impact social & environnemental</p>
          </button>
          <button 
            onClick={() => setInputMessage("Comment lever des fonds pour JobConnect ?")}
            className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 rounded-xl border border-yellow-200 text-left transition-all"
          >
            <DollarSign className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="font-semibold text-gray-900 text-sm">Lever des fonds</p>
            <p className="text-xs text-gray-500 mt-1">Guide investisseurs</p>
          </button>
          <button 
            onClick={() => setInputMessage("Programme de formation pour artisans")}
            className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-xl border border-blue-200 text-left transition-all"
          >
            <GraduationCap className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-gray-900 text-sm">Former les pros</p>
            <p className="text-xs text-gray-500 mt-1">JobConnect Academy</p>
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Propulsé par <span className="font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">JOBCONNECT AI</span> · Votre partenaire stratégique complet
        </p>
      </div>
    </div>
  )
}