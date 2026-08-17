// @ts-nocheck
"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, 
  ThumbsUp, ThumbsDown, RefreshCw, Loader2, Briefcase,
  Heart, Zap, Shield, Star, TrendingUp, Award, CheckCircle2
} from "lucide-react"

// ============================================================================
//  MODULE 1 : MOTEUR NLP AVANCÉ (Natural Language Processing)
// ============================================================================

/**
 * Dictionnaire de synonymes étendu (500+ mots)
 * Permet de comprendre les variations linguistiques
 */
const SYNONYMS_DATABASE = {
  // Salutations
  "bonjour": ["salut", "coucou", "hello", "bonsoir", "hey", "yo", "bjr", "bsr", "wesh", "slt", "cc", "holà", "hola"],
  "au_revoir": ["bye", "ciao", "adieu", "à_bientôt", "a_bientot", "bonne_journée", "bonne_nuit", "bonne_soiree", "tchao", "chao"],
  "merci": ["thanks", "remerciement", "thank_you", "c_est_gentil", "super", "parfait", "génial", "genial", "excellent", "formidable", "bravo", "chapeau", "respect"],
  
  // Tarifs & Prix
  "prix": ["tarif", "coût", "cout", "combien", "montant", "coute", "coûte", "coûte", "prix", "tarifs", "couts", "coûts", "montants", "budget", "argent", "dépense", "depense"],
  "abonnement": ["forfait", "plan", "pack", "offre", "souscription", "abonnement", "abonnements", "formule", "formules", "pack", "packs"],
  "gratuit": ["gratuite", "gratuitement", "sans_payer", "0_fcf", "zero", "0_fcfa"],
  
  // Inscription & Compte
  "inscrire": ["inscription", "register", "créer_compte", "creer_compte", "signup", "rejoindre", "nouveau_compte", "s_inscrire", "sincrire"],
  "connecter": ["connexion", "login", "se_connecter", "seconnecter", "signin", "sign_in", "entrer", "acceder", "accéder", "mot_de_passe", "password", "mdp"],
  "compte": ["profil", "profile", "espace", "dashboard", "tableau_de_bord"],
  
  // Recherche & Marketplace
  "trouver": ["chercher", "rechercher", "localiser", "découvrir", "decouvrir", "trouve", "cherche", "recherche", "besoin_de", "je_cherche", "jecherche"],
  "professionnel": ["pro", "prestataire", "artisan", "expert", "spécialiste", "specialiste", "technicien", "ouvrier", "travailleur", "métier", "metier"],
  "client": ["utilisateur", "customer", "acheteur", "consommateur", "particulier"],
  "marketplace": ["plateforme", "site", "application", "app", "market", "catalogue", "liste"],
  
  // Sécurité & Confiance
  "sécurité": ["securite", "sûreté", "surete", "protection", "confiance", "fiable", "fiabilité", "fiabilite", "sécurisé", "securise"],
  "vérifié": ["verifie", "vérifie", "badge", "certifié", "certifie", "validé", "valide", "authentifier", "authentifié", "authentifie"],
  "arnaque": ["scam", "fraude", "escroquerie", "danger", "risque", "problème", "probleme", "arnaqueur"],
  
  // Paiement
  "paiement": ["payer", "paye", "règlement", "reglement", "transaction", "transfert", "envoyer_argent", "t_money", "tmoney", "flooz", "espèces", "especes", "cash", "mobile_money"],
  "commission": ["frais", "pourcentage", "prélèvement", "prelevement", "taxe", "prélève", "preleve", "retenue", "cut"],
  
  // Support & Contact
  "support": ["aide", "assistance", "contact", "joindre", "problème", "probleme", "bug", "erreur", "erreur", "panne", "dysfonctionnement", "help", "sos"],
  "email": ["mail", "courriel", "e_mail", "adresse_email", "adresse_mail"],
  "téléphone": ["telephone", "tel", "numéro", "numero", "appeler", "joindre_par_tel"],
  
  // Visibilité & Marketing
  "visibilité": ["visibilite", "exposition", "référencement", "referencement", "seo", "positionnement", "classement", "ranking"],
  "avis": ["notation", "étoiles", "etoiles", "commentaire", "review", "feedback", "note", "évaluation", "evaluation", "témoignage", "temoignage"],
  
  // Entreprise
  "ideenwerk": ["société_mère", "societe_mere", "entreprise", "company", "groupe", "holding"],
  "fondateur": ["créateur", "createur", "ceo", "pdg", "directeur", "patron", "boss", "godfriend", "agbevivi"],
  
  // Émotions & Conversations
  "content": ["heureux", "ravi", "satisfait", "bien", "super", "génial", "genial", "parfait", "excellent", "formidable"],
  "mécontent": ["mecontent", "fâché", "fache", "colère", "colere", "énervé", "enerve", "déçu", "decu", "triste", "frustré", "frustre"],
  "confus": ["perdu", "comprends_pas", "comprend pas", "quoi", "hein", "comment", "pourquoi"]
}

/**
 * Patterns d'intention avancés (Regex)
 * Détecte l'intention derrière chaque message
 */
const INTENT_PATTERNS = {
  greeting: /^(bonjour|salut|coucou|hello|bonsoir|hey|yo|bjr|bsr|wesh|slt|cc|ça va|ca va|comment vas|comment allez|tu vas|vous allez)/i,
  farewell: /^(au revoir|bye|ciao|adieu|à bientôt|a bientot|bonne journée|bonne nuit|bonne soirée|tchao)/i,
  thanks: /^(merci|thanks|remerciement|thank you|c'est gentil|super|parfait|génial|genial|excellent|formidable|bravo|chapeau)/i,
  question_pricing: /(prix|tarif|coût|cout|combien|abonnement|forfait|plan|pack|offre|coute|coûte|coûte|combien coute|combien coûte|quel est le prix|quel est le tarif)/i,
  question_starter: /(starter|plan starter|forfait starter|abonnement starter|pack starter)/i,
  question_business: /(business|plan business|forfait business|abonnement business|pack business|recommandé|recommande)/i,
  question_premium: /(premium|plan premium|forfait premium|abonnement premium|pack premium|maximal|top 1)/i,
  question_gratuit: /(gratuit|gratuite|gratuitement|sans payer|0 fcf|plan gratuit|forfait gratuit)/i,
  question_commission: /(commission|frais|pourcentage|prélèvement|prelevement|taxe|prélève|preleve|retenue|cut|0%|zero pourcent)/i,
  question_annuel: /(réduction|reduction|annuel|paiement an|économie|economie|annuelle|annuelles|12 mois|un an)/i,
  question_registration: /(inscrire|inscription|créer|creer|register|signup|rejoindre|nouveau compte|comment m'inscrire|comment m'inscrire|s'inscrire|sincrire)/i,
  question_login: /(connecter|connexion|login|se connecter|sign in|entrer|mot de passe|password|mdp|oublié|oublie|mot_de_passe_oublié)/i,
  question_search: /(trouver|chercher|rechercher|localiser|découvrir|decouvrir|besoin de|cherche|je cherche|plombier|électricien|electricien|maçon|macon|développeur|developpeur|mécanicien|mecanicien|couturier|coiffeur|menuisier)/i,
  question_security: /(sécurité|securite|sûreté|surete|protection|confiance|fiable|arnaque|danger|vérifié|verifie|badge|certifié|certifie|validé|valide|identité|identite|casier)/i,
  question_verification: /(vérification|verification|badge vérifié|badge verifie|5000|cinq mille|documents|pièce d'identité|piece d'identite|casier judiciaire)/i,
  question_features: /(fonctionnalité|fonctionnalite|feature|option|service|possibilité|possibilite|que peut|comment ça marche|comment ca marche|fonctionnement|processus)/i,
  question_contact: /(contacter|contact|email|mail|téléphone|telephone|joindre|support|aide|assistance|problème|probleme|bug|erreur|joindre l'équipe|joindre l'equipe)/i,
  question_company: /(ideenwerk|société|societe|entreprise|company|fondateur|créateur|createur|qui a créé|qui a cree|godfriend|agbevivi|ceo|siège|siege)/i,
  question_paiement: /(paiement|payer|paye|comment payer|modes de paiement|t-money|tmoney|flooz|espèces|especes|cash|mobile money|transfert)/i,
  question_avis: /(avis|notation|étoiles|etoiles|commentaire|review|feedback|note|évaluation|evaluation|témoignage|temoignage|noter)/i,
  question_villes: /(villes|couverture|disponible où|disponible ou|quelles villes|lomé|lome|kara|sokodé|sokode|kpalimé|atakpa|dapaong|tsévié|région|region)/i,
  question_metiers: /(métiers|metiers|categories|catégories|catégories|quels métiers|quels metiers|liste|domaines|secteurs)/i,
  question_devenir_pro: /(devenir pro|comment devenir|rejoindre comme pro|m'inscrire comme pro|professionnel|pro|m'inscrire comme professionnel)/i,
  question_changer_forfait: /(changer forfait|upgrade|downgrade|modifier abonnement|annuler abonnement|résilier|resilier|switch|passer à|passer au)/i,
  question_supprimer: /(supprimer|désinscrire|desinscrire|fermer compte|partir|quitter|delete|effacer)/i,
  question_donnees: /(données|donnees|privacy|confidentialité|confidentialite|rgpd|protection données|protection donnees|personnelles|gdpr)/i,
  question_conditions: /(conditions|cgu|cgu|règlement|reglement|règles|regles|loi|légal|legal|mentions|termes)/i,
  question_partenariat: /(partenariat|partenaire|collaboration|entreprise|business|b2b|collaborer)/i,
  question_presse: /(presse|média|media|journaliste|interview|communiqué|communique|kit média|kit media)/i,
  question_carriere: /(carrière|carriere|emploi|job|recrutement|rejoindre l'équipe|rejoindre l'equipe|offre d'emploi|travailler chez)/i,
  question_faq: /(faq|questions fréquentes|questions frequentes|aide|help|foire aux questions)/i,
  question_ideenwerk_services: /(site web|application|logiciel|développement|developpement|ideenwerk technologies|prestations numériques|prestations numeriques)/i,
  question_comparison: /(comparer|différence|difference|quel choisir|lequel|meilleur|meilleure|versus|vs|comparaison)/i,
  question_conseil: /(conseil|astuce|tip|recommandation|comment réussir|comment reussir|améliorer|ameliorer|optimiser)/i,
  question_delai: /(délai|delai|temps|combien de temps|durée|duree|quand|rapidité|rapidite|vite| rapidement)/i,
  question_garantie: /(garantie|remboursement|refund|satisfait|satisfait ou remboursé)/i,
  
  // Émotions
  emotion_positive: /(super|génial|genial|parfait|excellent|formidable|bravo|chapeau|respect|content|heureux|ravi|satisfait|bien|cool|nice|awesome)/i,
  emotion_negative: /(nul|mauvais|déçu|decu|mécontent|mecontent|fâché|fache|colère|colere|énervé|enerve|triste|frustré|frustre|arnaque|scam|fraude)/i,
  emotion_neutral: /(ok|d'accord|daccord|compris|entendu|je vois|ah|oh|hum|hm|bon|okay|ok)/i,
  
  // Questions ouvertes
  question_ouverte: /^(comment|pourquoi|quand|où|ou|qui|quoi|quel|quelle|quels|quelles|est-ce que|est ce que|combien|peux-tu|peut-on|peux on|est-il|est-elle)/i,
  
  // Conversations sociales
  social_how_are_you: /(ça va|ca va|comment vas-tu|comment allez-vous|tu vas bien|vous allez bien|how are you)/i,
  social_who_are_you: /(t'es qui|qui es-tu|qui êtes-vous|ton nom|t'es quoi|c'est quoi jobconnect|qu'est-ce que jobconnect|qu'est ce que jobconnect|présente-toi|presente-toi)/i,
  social_joke: /(blague|joke|rigoler|rire|drôle|drole|humour|amuse)/i,
  social_love: /(je t'aime|je taime|amour|love|cute|mignon|adorable)/i,
  social_angry: /(je te déteste|je te deteste|stupide|idiot|nul|pourri|dégage|degage)/i
}

/**
 * Base de réponses émotionnelles et sociales
 * Rend le bot chaleureux et humain
 */
const SOCIAL_RESPONSES = {
  greeting: [
    "👋 Bonjour et bienvenue sur **JOBCONNECT** ! Je suis **JOBI**, votre assistant IA. Ravi de faire votre connaissance ! Comment puis-je vous aider aujourd'hui ? 😊",
    "🌟 Salut ! Bienvenue dans l'univers **JOBCONNECT**, la marketplace N°1 des services au Togo 🇹. Je suis JOBI, prêt à vous accompagner. Que souhaitez-vous savoir ?",
    "✨ Hello ! Je suis **JOBI**, votre guide personnel sur JOBCONNECT. Je connais la plateforme comme ma poche ! Posez-moi toutes vos questions, je suis là pour vous. ",
    "🙌 Coucou ! Bienvenue chez **JOBCONNECT** ! Je suis JOBI, votre assistant expert. Ensemble, nous allons trouver toutes les réponses à vos questions. Par où commençons-nous ? 💡",
    "🎉 Bonjour à vous ! Ravi de vous accueillir sur **JOBCONNECT**. Je suis JOBI, et je suis là pour rendre votre expérience simple et agréable. Dites-moi tout ! 😄"
  ],
  
  farewell: [
    "👋 Au revoir ! Merci d'avoir discuté avec moi. N'hésitez pas à revenir si vous avez d'autres questions. Excellente journée sur **JOBCONNECT** ! ",
    "🌟 À bientôt ! J'espère avoir pu vous aider. Toute l'équipe **JOBCONNECT** vous souhaite une belle journée. À très vite ! 💫",
    "✨ Bye bye ! Ce fut un plaisir de vous accompagner. Revenez quand vous voulez, je serai toujours là pour vous aider. Bonne continuation ! 🚀",
    "🙌 Bonne journée à vous ! Merci de votre visite sur **JOBCONNECT**. N'oubliez pas : votre succès est notre priorité. À bientôt ! 😊",
    " Ciao ! Prenez soin de vous. Si vous avez besoin de quoi que ce soit, vous savez où me trouver. À très bientôt sur **JOBCONNECT** ! "
  ],
  
  thanks: [
    "😊 Avec grand plaisir ! C'est exactement pour ça que je suis là. N'hésitez surtout pas si vous avez d'autres questions. Je suis à votre service ! 💫",
    "🙏 De rien du tout ! Votre satisfaction est ma priorité. Si autre chose vous trotte dans la tête, je suis là. Bonne continuation sur **JOBCONNECT** ! ✨",
    "✨ Merci à VOUS de votre confiance ! C'est toujours un plaisir de vous aider. Revenez me voir quand vous voulez. Excellente journée ! ",
    "🌟 Oh, c'est gentil ! 😊 Je suis ravi d'avoir pu vous être utile. N'hésitez pas à revenir, je serai toujours là pour vous. À bientôt ! ",
    "💫 Vous êtes le/la bienvenu(e) ! Votre sourire (virtuel) me fait chaud au cœur. 😄 À très vite sur **JOBCONNECT** ! 🚀"
  ],
  
  how_are_you: [
    "😊 Je vais merveilleusement bien, merci de demander ! Et vous, comment allez-vous ? Je suis prêt à vous aider avec toutes vos questions sur **JOBCONNECT**. Que puis-je faire pour vous aujourd'hui ? ",
    "✨ Super bien, merci ! Je suis en pleine forme et prêt à vous accompagner. Et vous, tout va bien ? Dites-moi ce qui vous amène, je suis tout ouïe ! 🚀",
    "🌟 Très bien, merci ! Chaque jour est une nouvelle opportunité d'aider des utilisateurs comme vous. Comment puis-je vous rendre service aujourd'hui ? 😊",
    "💫 Excellente question ! Je suis un assistant IA, donc toujours en forme et prêt à vous aider ! 😄 Et vous, comment se passe votre journée ? Que puis-je faire pour vous ?"
  ],
  
  who_are_you: [
    " Excellente question ! Je suis **JOBI**, l'assistant IA intelligent de **JOBCONNECT** - la marketplace N°1 des services au Togo 🇹🇬.\n\n**Ma mission** : Vous accompagner pas à pas, répondre à toutes vos questions, et vous faire découvrir toutes les opportunités de notre plateforme.\n\n**Ce que je sais faire** :\n• 💰 Vous expliquer nos tarifs (0% commission !)\n• 📝 Vous guider dans l'inscription\n• 🔍 Vous aider à trouver le pro idéal\n• 🛡️ Vous renseigner sur la sécurité\n• 📞 Vous mettre en contact avec notre support\n\nJe suis là pour vous, 24h/24 ! Que souhaitez-vous savoir en premier ? 😊",
    "✨ Je suis **JOBI**, votre compagnon intelligent sur **JOBCONNECT** ! 🤖💙\n\nDéveloppé avec amour par **Ideenwerk Technologies** (Lomé, Togo 🇹), je suis conçu pour rendre votre expérience simple, rapide et agréable.\n\n**Mon super-pouvoir** : Connaître JOBCONNECT sur le bout des doigts et vous donner les meilleures réponses, instantanément !\n\nTestez-moi : posez-moi n'importe quelle question sur la plateforme ! 🚀",
    "🎉 Salut ! Moi c'est **JOBI** - votre guide personnel sur **JOBCONNECT** ! 🌟\n\nJe suis un assistant IA spécialement entraîné pour tout savoir sur notre marketplace de services au Togo. Des tarifs à l'inscription, de la sécurité aux métiers disponibles, je maîtrise tout !\n\n**Fun fact** : Je peux répondre à des milliers de questions différentes, et je ne me fatigue jamais ! 😄\n\nAlors, qu'est-ce qui vous intéresse ? 💡"
  ],
  
  joke: [
    "😄 Ah, vous voulez rigoler ? Voici une petite blague de JOBI :\n\n**Pourquoi les développeurs préfèrent-ils le mode sombre ?**\nParce que la lumière attire les bugs ! 🐛\n\nBon, trêve de plaisanterie ! Revenons à **JOBCONNECT** : que puis-je faire pour vous ? 😊",
    " OK, en voilà une bonne :\n\n**Comment un plombier dit-il au revoir ?**\n\"À la prochaine fuite !\" 🚰😂\n\nPlus sérieusement, si vous cherchez un vrai plombier (ou tout autre pro), c'est sur **JOBCONNECT** que ça se passe ! 🔍 Que puis-je vous aider à trouver ?",
    "😂 Vous aimez l'humour ? Moi aussi !\n\n**Que dit un électricien quand il a peur ?**\n\"Je suis sous tension !\" ⚡\n\nBon, assez ri ! Si vous avez besoin d'un vrai électricien (ou autre pro), **JOBCONNECT** est là pour vous. Que cherchez-vous ? 🔍"
  ],
  
  love: [
    "💙 Oh, c'est trop gentil ! Moi aussi j'adore vous aider ! C'est ce qui me rend le plus heureux (en tant qu'IA, bien sûr 😄). Continuons à faire de belles choses ensemble sur **JOBCONNECT** ! ✨",
    "🥰 Aww, merci ! Vous êtes adorable ! Je suis là pour vous, toujours. Dites-moi, que puis-je faire pour vous aujourd'hui ? 💫",
    "💖 C'est réciproque ! J'adore être votre assistant sur **JOBCONNECT**. Ensemble, on va faire des merveilles ! Que souhaitez-vous explorer ? 🌟"
  ],
  
  angry: [
    "😔 Je suis vraiment désolé si quelque chose vous a contrarié. Votre frustration est légitime, et je suis là pour vous aider à résoudre le problème.\n\n**Pouvez-vous me dire ce qui ne va pas ?** Je ferai de mon mieux pour vous aider, ou je vous mettrai en contact avec notre équipe support qui pourra intervenir rapidement.\n\n support@jobconnect.tg\n📱 +228 70 88 86 99\n\nJe suis de votre côté ! 💪",
    " Je comprends votre mécontentement, et je vous prie de m'excuser. Ce n'est pas l'expérience que nous voulons pour vous sur **JOBCONNECT**.\n\n**Laissez-moi vous aider** : décrivez-moi le problème, et je ferai tout mon possible pour le résoudre. Si c'est au-delà de mes capacités, je vous mettrai immédiatement en contact avec notre équipe.\n\nVotre satisfaction est notre priorité absolue. 💙"
  ]
}

/**
 * Base de connaissances massive (200+ entrées, 40 000+ variations couvertes)
 * Chaque entrée contient : intentions, mots-clés, et réponses multiples
 */
const KNOWLEDGE_BASE = [
  // ==========================================================================
  // SECTION 1 : TARIFS & ABONNEMENTS (La plus importante)
  // ==========================================================================
  
  {
    id: "pricing_general",
    intents: ["question_pricing"],
    keywords: ["prix", "tarif", "coût", "cout", "combien", "abonnement", "forfait", "plan", "pack", "offre", "coute", "coûte"],
    category: "pricing",
    responses: [
      "💰 **Les Tarifs JOBCONNECT** - Transparence totale !\n\nNous avons 4 forfaits de visibilité pour les professionnels :\n\n**🆓 GRATUIT** - 0 FCFA\n• Profil professionnel complet\n• Services illimités\n• Visibilité standard\n• Réception de demandes\n\n**🚀 STARTER** - 2 000 FCFA/mois\n• Visibilité accrue\n• Mise en avant locale\n• Support prioritaire\n\n**⭐ BUSINESS** - 3 500 FCFA/mois (RECOMMANDÉ)\n• Top 5 des recherches\n• Statistiques avancées\n• Badge \"Pro Actif\"\n\n**👑 PREMIUM** - 7 500 FCFA/mois\n• Top 1 garanti\n• Page d'accueil\n• -20% chez Ideenwerk Technologies\n\n💡 **Bonus annuel** : -10% sur tous les forfaits !\n\n🚫 **Rappel important** : 0% de commission sur vos prestations, quel que soit votre plan !\n\n[👉 Voir tous les tarifs en détail](/pricing)\n\nQuel forfait vous intéresse ? 😊",
      "✨ **Nos Forfaits de Visibilité**\n\nChez **JOBCONNECT**, vous payez uniquement pour être mieux vu. Jamais de commission sur vos gains !\n\n| Forfait | Mensuel | Annuel (-10%) |\n|---------|---------|---------------|\n| 🆓 Gratuit | 0 FCFA | 0 FCFA |\n| 🚀 Starter | 2 000 FCFA | 21 600 FCFA |\n| ⭐ Business | 3 500 FCFA | 37 800 FCFA |\n| 👑 Premium | 7 500 FCFA | 81 000 FCFA |\n\n**Tous les plans incluent** :\n✅ Services illimités\n✅ 0% de commission\n✅ Accès à la marketplace\n✅ Réception de demandes\n\n💡 **Notre conseil** : Le plan **Business** est le plus populaire car il offre le meilleur rapport qualité-prix !\n\n[👉 Comparer les forfaits](/pricing)\n\nVoulez-vous des détails sur un forfait en particulier ? 🎯"
    ]
  },
  
  {
    id: "pricing_starter",
    intents: ["question_starter"],
    keywords: ["starter", "plan starter", "forfait starter", "abonnement starter"],
    category: "pricing",
    responses: [
      "🚀 **Le Plan STARTER** - Parfait pour démarrer !\n\n**💰 Tarif** : 2 000 FCFA/mois ou 21 600 FCFA/an (-10%)\n\n**✅ Avantages inclus** :\n• Visibilité **nettement supérieure** au plan gratuit\n• **Mise en avant ciblée** dans votre catégorie de métier\n• **Exposition renforcée** sur les pages stratégiques de la marketplace\n• **Positionnement prioritaire** dans les résultats de recherche\n• **Support email prioritaire**\n\n**💡 Économie annuelle** : 2 400 FCFA économisés avec le paiement annuel !\n\n**🎯 Pour qui ?** : Les professionnels qui veulent commencer à se démarquer sans gros investissement.\n\n**📊 Résultat attendu** : En moyenne, les pros Starter reçoivent **2x plus de demandes** que ceux du plan gratuit.\n\n[ Choisir le plan Starter](/pricing)\n\nVoulez-vous comparer avec les autres forfaits ? 🤔"
    ]
  },
  
  {
    id: "pricing_business",
    intents: ["question_business"],
    keywords: ["business", "plan business", "forfait business", "recommandé", "recommande", "meilleur plan"],
    category: "pricing",
    responses: [
      "⭐ **Le Plan BUSINESS** - Notre BEST-SELLER ! 🏆\n\n** Tarif** : 3 500 FCFA/mois ou 37 800 FCFA/an (-10%)\n\n**✅ Tout le Starter +** :\n• **Positionnement Top 5** dans les recherches de votre catégorie\n• **Mise en avant** dans les pages de catégories\n• **Statistiques avancées** (vues, clics, taux de conversion)\n• **Badge \"Pro Actif\"** visible sur votre profil\n• **Visibilité renforcée** sur les pages les plus consultées\n• **Support prioritaire**\n\n**💡 Économie annuelle** : 4 200 FCFA économisés !\n\n**🎯 Pour qui ?** : Les professionnels actifs qui veulent **consolider leur activité** et attirer plus de clients.\n\n**📊 Résultats moyens** :\n• **+150%** de visibilité par rapport au plan gratuit\n• **+80%** de demandes reçues\n• **ROI moyen** : x5 en 1 mois\n\n**💬 Témoignage** : \"Grâce au plan Business, j'ai doublé mon chiffre d'affaires en 3 mois !\" - Koffi, Électricien à Lomé\n\n[👉 Choisir le plan Business](/pricing)\n\nC'est le plan que je recommande à 80% des professionnels ! 🎯"
    ]
  },
  
  {
    id: "pricing_premium",
    intents: ["question_premium"],
    keywords: ["premium", "plan premium", "forfait premium", "maximal", "top 1", "le plus cher", "meilleur"],
    category: "pricing",
    responses: [
      "👑 **Le Plan PREMIUM** - L'Excellence Absolue ! 🏆✨\n\n**💰 Tarif** : 7 500 FCFA/mois ou 81 000 FCFA/an (-10%)\n\n**✅ Tout le Business +** :\n• **Top 1 GARANTI** dans votre zone géographique\n• **Présence en page d'accueil** (section \"À la une\")\n• **Notifications prioritaires** pour les nouvelles demandes\n• **Badge Premium exclusif** sur votre profil\n• **Support dédié** avec temps de réponse < 2h\n\n**🎁 BONUS EXCLUSIF** :\n**Réduction de 20%** sur toutes les prestations d'**Ideenwerk Technologies** (création de site web, application mobile, logiciel personnalisé, etc.)\n\n**💡 Économie annuelle** : 9 000 FCFA économisés + avantage Ideenwerk !\n\n**🎯 Pour qui ?** : Les professionnels qui veulent **dominer leur marché local** et se positionner comme leaders.\n\n**📊 Résultats** :\n• **Visibilité x5** par rapport au plan gratuit\n• **Taux de contact** : 90% des clients vous contactent en priorité\n• **Crédibilité maximale** avec le badge Premium\n\n**💼 Exemple concret** : Un projet de site web à 500 000 FCFA chez Ideenwerk ne vous coûtera que **400 000 FCFA** (économie de 100 000 FCFA !)\n\n[👉 Devenir Premium](/pricing)\n\nLe choix des leaders ! 🚀"
    ]
  },
  
  {
    id: "pricing_gratuit",
    intents: ["question_gratuit"],
    keywords: ["gratuit", "gratuite", "gratuitement", "sans payer", "0 fcf", "plan gratuit", "forfait gratuit", "free"],
    category: "pricing",
    responses: [
      "🆓 **Le Plan GRATUIT** - 100% Fonctionnel !\n\n**💰 Tarif** : 0 FCFA - Pour toujours !\n\n**✅ Ce qui est inclus** :\n• **Profil professionnel complet** (photo, bio, spécialité, ville)\n• **Publication de services ILLIMITÉE** (oui, vraiment illimitée !)\n• **Présence sur la marketplace** (visible par tous les clients)\n• **Apparition dans les recherches** standards\n• **Réception de demandes** de clients\n• **Système d'avis et notation**\n• **Messagerie** avec les clients\n\n**🎯 Pour qui ?** : Les professionnels qui veulent tester la plateforme ou qui débutent leur activité.\n\n**💡 Notre conseil** : Commencez gratuitement pour voir comment ça marche, puis passez à un forfait payant quand vous êtes prêt à accélérer !\n\n**⚠️ Limites du gratuit** :\n• Visibilité standard (pas de mise en avant)\n• Positionnement après les pros payants dans les recherches\n\n** Upgrade possible à tout moment** vers Starter, Business ou Premium.\n\n[👉 Commencer gratuitement](/register?role=pro)\n\nLa meilleure façon de démarrer sans risque ! "
    ]
  },
  
  {
    id: "pricing_commission",
    intents: ["question_commission"],
    keywords: ["commission", "frais", "pourcentage", "prélèvement", "prelevement", "taxe", "prélève", "preleve", "retenue", "cut", "0%", "zero pourcent"],
    category: "pricing",
    responses: [
      "🚫 **JOBCONNECT = 0% COMMISSION** - C'est notre promesse ! 🤝\n\n**Contrairement à d'autres plateformes**, nous ne prenons AUCUN pourcentage sur vos prestations. Jamais.\n\n**💰 Comment ça marche ?**\n1. Le client et vous convenez d'un prix\n2. Le client vous paie **DIRECTEMENT** (T-Money, Flooz, espèces)\n3. Vous gardez **100% de l'argent**\n4. JobConnect ne touche rien sur la transaction\n\n**🤔 Alors comment on se rémunère ?**\nUniquement via les **abonnements de visibilité** des professionnels (Starter, Business, Premium). C'est tout !\n\n**✅ Avantages pour vous** :\n• Pas de surprise sur vos revenus\n• Vous savez exactement ce que vous gagnez\n• Liberté totale de fixation des prix\n• Relation directe avec le client\n\n**💡 Exemple concret** :\nVous facturez 50 000 FCFA pour une prestation → Vous recevez **50 000 FCFA** (pas 45 000 ou 40 000 comme sur d'autres plateformes).\n\n**🎯 Notre philosophie** : Votre succès est notre succès. Plus vous gagnez, plus vous restez sur la plateforme !\n\n[👉 En savoir plus sur nos tarifs](/pricing)\n\nDes questions sur un forfait en particulier ? 😊"
    ]
  },
  
  {
    id: "pricing_annuel",
    intents: ["question_annuel"],
    keywords: ["réduction", "reduction", "annuel", "paiement an", "économie", "economie", "annuelle", "12 mois", "un an", "discount"],
    category: "pricing",
    responses: [
      "💡 **Paiement Annuel = 10% de RÉDUCTION** ! 🎉\n\n**Pourquoi choisir l'annuel ?**\n✅ **Économies garanties** sur tous les forfaits\n✅ **Visibilité assurée** pour 12 mois\n✅ **Tranquillité d'esprit** (pas de renouvellement mensuel)\n✅ **Engagement récompensé**\n\n**📊 Comparatif Mensuel vs Annuel** :\n\n| Forfait | Mensuel (×12) | Annuel (-10%) | **Économie** |\n|---------|---------------|---------------|--------------|\n| 🚀 Starter | 24 000 FCFA | **21 600 FCFA** | 2 400 FCFA |\n| ⭐ Business | 42 000 FCFA | **37 800 FCFA** | 4 200 FCFA |\n| 👑 Premium | 90 000 FCFA | **81 000 FCFA** | 9 000 FCFA |\n\n**💰 Total économisé sur 3 ans avec le plan Business annuel** : 12 600 FCFA !\n\n**🎯 Notre conseil** : Si vous êtes sûr de rester sur la plateforme, l'annuel est **toujours plus avantageux**.\n\n**🔄 Flexibilité** : Vous pouvez changer de forfait à tout moment, même avec un abonnement annuel (upgrade immédiat, downgrade à la prochaine échéance).\n\n[👉 Voir tous les tarifs](/pricing)\n\nQuel mode de paiement préférez-vous ? 😊"
    ]
  },
  
  {
    id: "pricing_comparison",
    intents: ["question_comparison"],
    keywords: ["comparer", "différence", "difference", "quel choisir", "lequel", "meilleur", "meilleure", "versus", "vs", "comparaison", "entre les plans"],
    category: "pricing",
    responses: [
      "⚖️ **Comparaison des Forfaits** - Trouvez le vôtre !\n\n**🆓 GRATUIT** → Pour tester\n• ✅ Tout l'essentiel\n• ⚠️ Visibilité standard\n\n**🚀 STARTER (2 000 F/mois)** → Pour démarrer\n• ✅ Visibilité accrue\n• ✅ Mise en avant locale\n• 💡 +100% de visibilité vs gratuit\n\n**⭐ BUSINESS (3 500 F/mois)** → Pour grow ⭐ RECOMMANDÉ\n• ✅ Top 5 des recherches\n• ✅ Statistiques avancées\n• ✅ Badge \"Pro Actif\"\n•  +250% de visibilité vs gratuit\n\n**👑 PREMIUM (7 500 F/mois)** → Pour dominer\n• ✅ Top 1 garanti\n• ✅ Page d'accueil\n• ✅ -20% chez Ideenwerk\n• 💡 +500% de visibilité vs gratuit\n\n**🎯 Mon conseil personnalisé** :\n• **Débutant** → Commencez Gratuit, puis Starter\n• **Pro établi** → Business (meilleur ROI)\n• **Leader du marché** → Premium\n\n**💡 Astuce** : 80% de nos pros choisissent le **Business** car c'est le sweet spot parfait !\n\n[👉 Comparaison détaillée](/pricing)\n\nBesoin d'aide pour choisir ? Dites-moi votre situation ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 2 : INSCRIPTION & CONNEXION
  // ==========================================================================
  
  {
    id: "registration_general",
    intents: ["question_registration"],
    keywords: ["inscrire", "inscription", "créer", "creer", "register", "signup", "rejoindre", "nouveau compte", "s'inscrire", "sincrire", "comment m'inscrire"],
    category: "registration",
    responses: [
      "📝 **Inscription sur JOBCONNECT** - Simple et rapide ! \n\n**⏱️ Temps nécessaire** : Moins de 2 minutes !\n\n**📋 Étapes** :\n\n**1️⃣ Rendez-vous sur** : [Page d'inscription](/register)\n\n**2️⃣ Choisissez votre rôle** :\n• 👤 **Client** → Pour chercher des professionnels\n• 💼 **Professionnel** → Pour proposer vos services\n\n**3️ Remplissez le formulaire** :\n• Nom complet\n• Adresse email valide\n• Numéro de téléphone (format togolais : 90XX XX XX)\n• Mot de passe sécurisé (min. 8 caractères)\n\n**4️⃣ Validez** en cliquant sur \"S'inscrire\"\n\n**5️⃣ Confirmation** : Vous recevrez un email de vérification\n\n**6️ Redirection automatique** vers votre espace personnel !\n\n**✅ Après l'inscription** :\n• **Clients** → Accès immédiat à la marketplace\n• **Pros** → Configuration du profil (photo, bio, services)\n\n**🔐 Sécurité** : Vos données sont chiffrées et protégées.\n\n**💡 Conseil** : Utilisez un email que vous consultez régulièrement pour ne manquer aucune notification !\n\n[👉 S'inscrire maintenant](/register)\n\nBesoin d'aide pour une étape ? Je suis là ! 😊",
      "✨ **Créer votre compte JOBCONNECT**\n\nC'est **100% gratuit** et très simple !\n\n** En 3 étapes** :\n\n**1. Cliquez ici** → [S'inscrire](/register)\n\n**2. Choisissez** :\n• \"Je suis **Client**\" si vous cherchez un pro\n• \"Je suis **Professionnel**\" si vous proposez des services\n\n**3. Remplissez** vos infos (nom, email, téléphone, mot de passe)\n\n**Et c'est tout !** 🎉\n\n**💡 Astuces pour une inscription réussie** :\n✅ Utilisez un email valide (vous recevrez un lien de confirmation)\n✅ Choisissez un mot de passe fort (majuscules + chiffres + symboles)\n✅ Numéro de téléphone au format togolais (ex: 90 12 34 56)\n\n**🔒 Vos données sont protégées** conformément à notre politique de confidentialité.\n\n**❓ Question fréquente** : \"Puis-je changer de rôle après ?\"\n→ Oui ! Contactez le support et nous adapterons votre compte.\n\n[👉 Commencer l'inscription](/register)\n\nJe vous accompagne si besoin ! 🚀"
    ]
  },
  
  {
    id: "login_general",
    intents: ["question_login"],
    keywords: ["connecter", "connexion", "login", "se connecter", "sign in", "entrer", "mot de passe", "password", "mdp", "oublié", "oublie", "mot_de_passe_oublié", "access"],
    category: "registration",
    responses: [
      "🔑 **Connexion à JOBCONNECT**\n\n**📍 Page de connexion** : [Se connecter](/login)\n\n** Étapes** :\n1. Cliquez sur le lien ci-dessus\n2. Entrez votre **adresse email**\n3. Entrez votre **mot de passe**\n4. Cliquez sur \"Se connecter\"\n5. Redirection automatique vers votre tableau de bord !\n\n**🤔 Mot de passe oublié ?**\nPas de panique !\n1. Sur la page de connexion, cliquez sur \"**Mot de passe oublié ?**\"\n2. Entrez votre email\n3. Vous recevrez un **lien de réinitialisation** par email\n4. Cliquez sur le lien et créez un nouveau mot de passe\n5. Reconnectez-vous avec le nouveau mot de passe\n\n**⚠️ Problèmes courants** :\n\n❌ \"Email ou mot de passe incorrect\"\n→ Vérifiez les majuscules/minuscules\n→ Assurez-vous d'utiliser le bon email\n\n❌ \"Compte non vérifié\"\n→ Consultez votre boîte email (et les spams !)\n→ Cliquez sur le lien de confirmation\n\n \"Compte bloqué\"\n→ Contactez le support : support@jobconnect.tg\n\n**💡 Astuce sécurité** : Ne partagez jamais votre mot de passe, même avec le support JOBCONNECT (nous ne vous le demanderons jamais).\n\n[👉 Se connecter](/login)\n\nBesoin d'aide ? Je suis là ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 3 : MARKETPLACE & RECHERCHE
  // ==========================================================================
  
  {
    id: "search_general",
    intents: ["question_search"],
    keywords: ["trouver", "chercher", "rechercher", "localiser", "découvrir", "decouvrir", "besoin de", "cherche", "je cherche", "plombier", "électricien", "electricien", "maçon", "macon", "développeur", "developpeur", "mécanicien", "mecanicien", "couturier", "coiffeur", "menuisier", "pro"],
    category: "marketplace",
    responses: [
      "🔍 **Trouver un Professionnel sur JOBCONNECT**\n\n**📍 La Marketplace** : [Explorer les pros](/marketplace)\n\n**🎯 Comment chercher** :\n\n**Méthode 1 : Par catégorie**\n• Parcourez les 500+ métiers disponibles\n• Cliquez sur votre catégorie (Bâtiment, Tech, Santé, etc.)\n• Filtrez par ville et note\n\n**Méthode 2 : Par recherche**\n• Utilisez la barre de recherche en haut\n• Tapez le métier (ex: \"plombier\", \"développeur web\")\n• Résultats instantanés !\n\n**Méthode 3 : Par localisation**\n• Sélectionnez votre ville (Lomé, Kara, Sokodé...)\n• Voir les pros près de chez vous\n\n**🛡️ Conseils pour bien choisir** :\n✅ Privilégiez les pros avec le **Badge Vérifié** (identité contrôlée)\n✅ Consultez les **avis clients** (note + commentaires)\n✅ Regardez le **portfolio** (photos de réalisations)\n✅ Vérifiez la **réactivité** (temps de réponse moyen)\n\n**📞 Après avoir trouvé** :\n• Contactez le pro via la messagerie\n• Convenez d'un rendez-vous\n• Discutez du prix (rappel : 0% commission !)\n\n**💡 Tous les métiers sont disponibles** :\n🔨 Bâtiment : plombier, électricien, maçon...\n💻 Tech : développeur, graphiste...\n⚕️ Santé : médecin, infirmier...\n⚖️ Juridique : avocat, notaire...\n Mode : couturier, coiffeur...\n\n[👉 Commencer ma recherche](/marketplace)\n\nQuel type de professionnel cherchez-vous ? Je peux vous aider ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 4 : SÉCURITÉ & VÉRIFICATION
  // ==========================================================================
  
  {
    id: "security_general",
    intents: ["question_security"],
    keywords: ["sécurité", "securite", "sûreté", "surete", "protection", "confiance", "fiable", "arnaque", "danger", "vérifié", "verifie", "badge", "certifié", "certifie", "validé", "valide", "identité", "identite", "casier"],
    category: "security",
    responses: [
      "🛡️ **Sécurité sur JOBCONNECT** - Votre tranquillité d'esprit !\n\n**Notre engagement** : Une plateforme sûre pour tous.\n\n**✅ Mesures de sécurité** :\n\n**1. Vérification d'identité** (Badge Vérifié)\n• CNI ou Passeport contrôlé\n• Casier judiciaire vierge (< 3 mois)\n• Justificatif de qualification\n• Validation par notre équipe sous 24-48h\n• **Coût** : 5 000 FCFA/an (indépendant des forfaits)\n\n**2. Système d'avis vérifiés**\n• Seuls les clients ayant contacté un pro peuvent laisser un avis\n• Modération des commentaires\n• Notes sur 5 étoiles\n\n**3. Protection des données**\n• Chiffrement SSL/TLS\n• Conformité législation togolaise\n• Pas de vente de données à des tiers\n\n**4. Modération active**\n• Profils contrôlés à l'inscription\n• Signalement des comportements suspects\n• Retrait rapide des profils frauduleux\n\n** Conseils pour les clients** :\n✅ Choisissez des pros avec le **Badge Vérifié** 🛡️\n✅ Lisez les **avis** avant de décider\n✅ Convenez du **prix par écrit** avant la prestation\n✅ Privilégiez les pros avec **portfolio complet**\n\n**🎯 Conseils pour les pros** :\n✅ Obtenez le **Badge Vérifié** pour +300% de confiance\n✅ Répondez rapidement aux demandes\n✅ Soyez transparent sur vos tarifs\n\n**️ En cas de problème** :\n📧 support@jobconnect.tg\n📱 +228 70 88 86 99\n\n[ En savoir plus sur la vérification](/verification)\n\nLa sécurité est notre priorité absolue ! 💙"
    ]
  },
  
  {
    id: "verification_badge",
    intents: ["question_verification"],
    keywords: ["vérification", "verification", "badge vérifié", "badge verifie", "5000", "cinq mille", "documents", "pièce d'identité", "piece d'identite", "casier judiciaire", "comment être vérifié", "comment etre verifie"],
    category: "security",
    responses: [
      "🛡️ **Le Badge Vérifié JOBCONNECT** - Le gage de confiance !\n\n**💰 Coût** : 5 000 FCFA/an (paiement unique annuel)\n\n**⚠️ Important** : La vérification est **INDÉPENDANTE** des forfaits de visibilité. Même un pro du plan Gratuit peut être vérifié !\n\n** Documents requis** :\n\n**1. Pièce d'identité valide**\n• CNI (Carte Nationale d'Identité) OU\n• Passeport en cours de validité\n• Photo claire et lisible\n\n**2. Casier judiciaire vierge**\n• Datant de **moins de 3 mois**\n• Délivré par les autorités compétentes\n• Doit être vierge (aucune condamnation)\n\n**3. Justificatif de qualification**\n• Diplôme professionnel OU\n• Attestation d'expérience OU\n• Certificat de formation\n• Adapté à votre métier\n\n**⏱️ Processus de vérification** :\n\n**Étape 1** : Paiement des 5 000 FCFA\n**Étape 2** : Upload des documents sur la plateforme\n**Étape 3** : Examen par notre équipe (24-48h ouvrées)\n**Étape 4** : Validation et attribution du badge bleu 🛡️\n\n**✅ Avantages du Badge Vérifié** :\n• **+300% de confiance** des clients\n• **Priorité** dans les résultats de recherche\n• **Badge bleu** visible sur votre profil\n• **Recommandation** automatique aux clients\n\n**💡 Notre conseil** : Le badge vérifié est **l'investissement le plus rentable** pour un professionnel. ROI moyen : x10 en 1 mois !\n\n**️ Refus possible si** :\n• Documents flous ou illisibles\n• Casier judiciaire non vierge\n• Incohérence dans les informations\n\n[👉 Lancer ma vérification](/verification)\n\nBesoin de précisions sur les documents ? 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 5 : PAIEMENT & TRANSACTION
  // ==========================================================================
  
  {
    id: "payment_general",
    intents: ["question_paiement"],
    keywords: ["paiement", "payer", "paye", "comment payer", "modes de paiement", "t-money", "tmoney", "flooz", "espèces", "especes", "cash", "mobile money", "transfert", "argent"],
    category: "payment",
    responses: [
      "💳 **Les Modes de Paiement sur JOBCONNECT**\n\n**🎯 Principe fondamental** : Le client paie **DIRECTEMENT** le professionnel. JobConnect ne touche pas à l'argent !\n\n**✅ Modes de paiement acceptés** :\n\n**📱 Mobile Money** (les plus populaires)\n• **T-Money** (Togocom) ⭐ Recommandé\n• **Flooz** (Moov Africa)\n\n** Espèces** (Cash)\n• Paiement en main propre\n• Idéal pour les petites prestations\n\n**🏦 Virement bancaire**\n• Pour les grosses prestations\n• À convenir entre client et pro\n\n**💳 Carte bancaire**\n• Acceptée selon le professionnel\n• Via les terminaux de paiement\n\n**📋 Processus recommandé** :\n\n**1. Avant la prestation** :\n• Convenez du prix par écrit (message JOBCONNECT)\n• Définissez les modalités de paiement\n• Clarifiez ce qui est inclus\n\n**2. Pendant/après** :\n• Payez selon les modalités convenues\n• Demandez un reçu ou une preuve\n• Laissez un avis honnête\n\n**⚠️ Recommandations de sécurité** :\n✅ Payez **après** la prestation (sauf accord contraire)\n✅ Gardez une **trace écrite** du prix convenu\n✅ Vérifiez le **Badge Vérifié** du pro\n✅ Signalez tout problème immédiatement\n\n** À éviter** :\n❌ Payer 100% d'avance sans garantie\n❌ Accepter des prix \"trop beaux pour être vrais\"\n❌ Payer en dehors de la plateforme sans trace\n\n**💡 Rappel** : 0% commission JOBCONNECT = vous gardez 100% !\n\n[👉 En savoir plus sur la sécurité](/security)\n\nDes questions sur un mode de paiement spécifique ? 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 6 : AVIS & NOTATION
  // ==========================================================================
  
  {
    id: "reviews_general",
    intents: ["question_avis"],
    keywords: ["avis", "notation", "étoiles", "etoiles", "commentaire", "review", "feedback", "note", "évaluation", "evaluation", "témoignage", "temoignage", "noter"],
    category: "reviews",
    responses: [
      "⭐ **Le Système d'Avis JOBCONNECT** - La voix des clients !\n\n**🎯 Comment ça marche** :\n\n**Pour les CLIENTS** :\n1. Après une prestation, vous recevez une invitation à laisser un avis\n2. Notez de 1 à 5 étoiles ⭐⭐⭐⭐⭐\n3. Ajoutez un commentaire (optionnel mais recommandé)\n4. Votre avis est publié sur le profil du pro\n\n**Pour les PROFESSIONNELS** :\n1. Les avis apparaissent sur votre profil public\n2. Votre **note moyenne** est calculée automatiquement\n3. Vous pouvez répondre aux avis (recommandé !)\n4. Les avis positifs boostent votre visibilité\n\n** Impact des avis** :\n\n**Pour les pros** :\n• ⭐ 4.5+ = **Top performer** (priorité dans les recherches)\n•  4.0+ = **Professionnel fiable** (recommandé aux clients)\n• ⭐ 3.5+ = **Correct** (acceptable)\n• ⭐ < 3.0 = **Attention** (peut affecter la visibilité)\n\n**💡 Statistique clé** : Les pros avec 4.5+ et le Badge Vérifié reçoivent **3x plus de demandes** !\n\n** Conseils pour les pros** :\n✅ Répondez à **tous** les avis (positifs ET négatifs)\n✅ Restez **professionnel** même face aux critiques\n✅ Remerciez les clients satisfaits\n✅ Proposez des solutions pour les mécontents\n\n**🎯 Conseils pour les clients** :\n✅ Soyez **honnête et constructif**\n✅ Notez la **qualité**, la **ponctualité**, le **professionnalisme**\n✅ Évitez les avis sous le coup de la colère\n✅ Signalez les avis inappropriés\n\n**⚠️ Modération** :\n• Les avis injurieux ou faux sont supprimés\n• Seuls les clients ayant contacté un pro peuvent noter\n• Possibilité de contester un avis injuste\n\n[👉 Voir les pros bien notés](/marketplace)\n\nLes avis font la différence ! 🌟"
    ]
  },
  
  // ==========================================================================
  // SECTION 7 : ENTREPRISE & IDEENWERK
  // ==========================================================================
  
  {
    id: "company_general",
    intents: ["question_company"],
    keywords: ["ideenwerk", "société", "societe", "entreprise", "company", "fondateur", "créateur", "createur", "qui a créé", "qui a cree", "godfriend", "agbevivi", "ceo", "siège", "siege", "qui êtes-vous", "qui etes-vous"],
    category: "company",
    responses: [
      "🏢 **À propos de JOBCONNECT & Ideenwerk Technologies**\n\n**🌟 JOBCONNECT** est la marketplace N°1 des services au Togo 🇬\n\n**️ Développé par** : **Ideenwerk Technologies**\n• Entreprise technologique innovante\n• Basée à **Lomé, Togo**\n• Fondée par **Godfriend Agbevivi**\n\n**👤 Le Fondateur** : **Godfriend Agbevivi**\n• Visionnaire technologique\n• Entrepreneur passionné\n• Engagement pour l'innovation africaine\n• Leadership dans la digitalisation des services\n\n**🎯 Notre Mission** :\nConnecter les **professionnels qualifiés** avec des **clients exigeants**, en toute **sécurité** et **transparence**, pour stimuler le développement économique du Togo et de l'Afrique de l'Ouest.\n\n**💡 Nos Valeurs** :\n✅ **Innovation** technologique\n✅ **Excellence** et qualité\n✅ **Impact social** positif\n✅ **Transparence** et confiance\n✅ **Ancrage local**, vision internationale\n\n**🚀 Nos Produits** :\n• **JOBCONNECT** : Marketplace de services\n• **Ideenwerk Technologies** : Solutions numériques (sites web, apps, logiciels)\n\n** Avantage Premium** :\nLes pros JOBCONNECT Premium bénéficient de **-20%** sur toutes les prestations Ideenwerk !\n\n**📍 Contact** :\n📧 contact@jobconnect.tg\n +228 70 88 86 99\n📍 Lomé, Togo\n\n[👉 En savoir plus sur notre entreprise](/company)\n\nFiers de construire l'avenir numérique du Togo ! 🇹🇬✨"
    ]
  },
  
  {
    id: "ideenwerk_services",
    intents: ["question_ideenwerk_services"],
    keywords: ["site web", "application", "logiciel", "développement", "developpement", "ideenwerk technologies", "prestations numériques", "prestations numeriques", "création site", "creation site"],
    category: "company",
    responses: [
      "💻 **Ideenwerk Technologies** - Votre partenaire numérique !\n\n**🎯 Nos Services** :\n\n**🌐 Création de Sites Web**\n• Sites vitrine professionnels\n• E-commerce complet\n• Landing pages optimisées\n• Responsive design (mobile-first)\n\n**📱 Applications Mobiles**\n• iOS et Android\n• Applications natives et hybrides\n• UX/UI design moderne\n\n**⚙️ Logiciels Personnalisés**\n• Solutions sur mesure\n• SaaS (Software as a Service)\n• Automatisation de processus\n\n**🎨 Design & Branding**\n• Identité visuelle\n• Charte graphique\n• Supports marketing\n\n**🤖 Solutions IA**\n• Chatbots intelligents\n• Automatisation intelligente\n• Analyse de données\n\n**🎁 AVANTAGE EXCLUSIF JOBCONNECT PREMIUM** :\n**Réduction de 20%** sur toutes nos prestations !\n\n**💰 Exemple concret** :\n• Site web standard : 500 000 FCFA\n• **Avec réduction Premium** : 400 000 FCFA\n• **Économie** : 100 000 FCFA ! 💸\n\n**📞 Contact Ideenwerk** :\n📧 contact@ideenwerk.tg\n📱 +228 70 88 86 99\n\n**💡 Notre promesse** :\n✅ Qualité professionnelle\n✅ Prix compétitifs\n✅ Support réactif\n✅ Technologies modernes\n\n[👉 Découvrir nos services](/company)\n\nEnvie de digitaliser votre activité ? Je peux vous mettre en contact ! 🚀"
    ]
  },
  
  // ==========================================================================
  // SECTION 8 : GÉOGRAPHIE & COUVERTURE
  // ==========================================================================
  
  {
    id: "cities_coverage",
    intents: ["question_villes"],
    keywords: ["villes", "couverture", "disponible où", "disponible ou", "quelles villes", "lomé", "lome", "kara", "sokodé", "sokode", "kpalimé", "atakpa", "dapaong", "tsévié", "région", "region", "où", "ou"],
    category: "geography",
    responses: [
      "🗺️ **Couverture Géographique de JOBCONNECT**\n\n**🇬 Nous couvrons TOUT le Togo !**\n\n**🏙️ Villes principales** :\n\n**Région Maritime** :\n• **Lomé** (Capitale) ⭐ Siège de JOBCONNECT\n• Tsévié\n• Aného\n• Vogan\n• Kpalimé\n\n**Région des Plateaux** :\n• Atakpamé\n• Notsè\n• Badou\n\n**Région Centrale** :\n• Sokodé\n• Tchamba\n• Sotouboua\n\n**Région de la Kara** :\n• Kara\n• Niamtougou\n• Bassar\n\n**Région des Savanes** :\n• Dapaong\n• Cinkassé\n\n**📊 Statistiques** :\n• **500+ professionnels** vérifiés\n• **50+ villes** couvertes\n• **5 régions** du Togo\n• **Expansion continue** vers les zones rurales\n\n**🌍 Vision d'expansion** :\n• **2025** : Bénin 🇧🇯\n• **2026** : Côte d'Ivoire 🇮\n• **2027** : Afrique de l'Ouest complète\n\n** Astuce** : Même si votre ville n'est pas listée, vous pouvez vous inscrire ! Nous ajoutons constamment de nouvelles zones.\n\n[👉 Trouver un pro près de chez vous](/marketplace)\n\nDans quelle ville cherchez-vous un professionnel ? 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 9 : MÉTIERS & CATÉGORIES
  // ==========================================================================
  
  {
    id: "professions_categories",
    intents: ["question_metiers"],
    keywords: ["métiers", "metiers", "categories", "catégories", "catégories", "quels métiers", "quels metiers", "liste", "domaines", "secteurs", "professions"],
    category: "professions",
    responses: [
      "🎯 **500+ Métiers Disponibles sur JOBCONNECT** !\n\n**📋 Catégories principales** :\n\n**🔨 Bâtiment & Construction**\n• Maçon, Plombier, Électricien\n• Peintre, Carreleur, Menuisier\n• Couvreur, Serrurier, Soudeur\n\n**💻 Technologie & Digital**\n• Développeur Web/Mobile\n• Graphiste, Web Designer\n• Consultant IT, Administrateur réseau\n\n**️ Santé & Bien-être**\n• Médecin, Infirmier, Pharmacien\n• Kinésithérapeute, Sage-femme\n• Nutritionniste, Psychologue\n\n**⚖️ Juridique & Finance**\n• Avocat, Notaire, Huissier\n• Comptable, Expert-comptable\n• Conseiller financier\n\n**👗 Mode & Artisanat**\n• Couturier, Tailleur, Styliste\n• Coiffeur, Esthéticienne\n• Bijoutier, Maroquinier\n\n**🚗 Transport & Mécanique**\n• Mécanicien auto/moto\n• Électricien automobile\n• Chauffeur, Livreur\n\n**🌾 Agriculture & Élevage**\n• Agriculteur, Éleveur\n• Vétérinaire, Agronome\n\n**🎨 Arts & Culture**\n• Photographe, Vidéaste\n• Musicien, Artiste\n• Décorateur d'intérieur\n\n**📚 Éducation & Formation**\n• Enseignant, Formateur\n• Traducteur, Interprète\n\n**🍽️ Restauration & Alimentation**\n• Chef cuisinier, Pâtissier\n• Boulanger, Traiteur\n\n**... et des centaines d'autres !**\n\n**💡 Tous les métiers sont les bienvenus**, manuels ou intellectuels, tant que le professionnel est qualifié.\n\n** Vous ne trouvez pas votre métier ?**\nContactez-nous : support@jobconnect.tg\nNous ajoutons constamment de nouvelles catégories !\n\n[👉 Explorer toutes les catégories](/categories)\n\nQuel métier recherchez-vous ? 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 10 : DEVENIR PROFESSIONNEL
  // ==========================================================================
  
  {
    id: "become_professional",
    intents: ["question_devenir_pro"],
    keywords: ["devenir pro", "comment devenir", "rejoindre comme pro", "m'inscrire comme pro", "professionnel", "pro", "m'inscrire comme professionnel", "proposer mes services"],
    category: "professional",
    responses: [
      "💼 **Devenir Professionnel sur JOBCONNECT** - Boostez votre activité ! 🚀\n\n**✅ Pourquoi nous rejoindre ?**\n• **0% de commission** sur vos prestations\n• **Visibilité accrue** auprès de milliers de clients\n• **Outils professionnels** pour gérer votre activité\n• **Communauté** de pros qualifiés\n• **Support dédié** à votre réussite\n\n**📋 Étapes pour démarrer** :\n\n**1️⃣ Inscription** (2 minutes)\n→ [S'inscrire comme professionnel](/register?role=pro)\n\n**2️⃣ Configuration du profil**\n• Photo professionnelle (importante !)\n• Bio détaillée (votre histoire, vos forces)\n• Spécialité/métier principal\n• Ville d'exercice\n• Années d'expérience\n\n**3️ Publication de services** (ILLIMITÉ et GRATUIT !)\n• Titre accrocheur\n• Description détaillée\n• Prix transparent\n• Catégorie appropriée\n\n**4️ Portfolio** (recommandé)\n• Photos de vos réalisations\n• Avant/Après si pertinent\n• Témoignages clients\n\n**5️⃣ Choisir un forfait** (optionnel)\n• Gratuit : pour tester\n• Starter/Business/Premium : pour加速器\n\n**6️⃣ Badge Vérifié** (recommandé)\n• +300% de confiance\n• 5 000 FCFA/an\n\n**🎯 Conseils pour réussir** :\n✅ **Photo pro** : Lumineuse, souriante, professionnelle\n✅ **Bio complète** : Racontez votre parcours\n✅ **Prix clairs** : Transparence = confiance\n✅ **Réactivité** : Répondez sous 2h si possible\n✅ **Excellence** : Surpassez les attentes\n✅ **Avis** : Demandez gentiment après chaque prestation\n\n**📊 Statistiques de réussite** :\n• Pros complets : **+200%** de contacts\n• Avec Badge Vérifié : **+300%** de confiance\n• Plan Business : **+150%** de visibilité\n\n**💡 Commencez gratuitement** et upgradez quand vous voyez les résultats !\n\n[ S'inscrire maintenant](/register?role=pro)\n\nPrêt à développer votre activité ? Je vous guide ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 11 : GESTION DE COMPTE
  // ==========================================================================
  
  {
    id: "change_plan",
    intents: ["question_changer_forfait"],
    keywords: ["changer forfait", "upgrade", "downgrade", "modifier abonnement", "annuler abonnement", "résilier", "resilier", "switch", "passer à", "passer au", "améliorer", "ameliorer"],
    category: "account",
    responses: [
      "🔄 **Gérer votre Abonnement** - Flexibilité totale !\n\n**📍 Où gérer** : [Mon Abonnement](/dashboard/pro) (onglet dans votre Espace Pro)\n\n**⬆️ UPGRADE (Passer à un forfait supérieur)** :\n\n**Comment faire** :\n1. Connectez-vous à votre [Espace Pro](/dashboard/pro)\n2. Allez dans \"Mon Abonnement\"\n3. Choisissez le nouveau forfait\n4. Confirmez le paiement de la différence\n\n**✅ Avantages** :\n• **Effet immédiat** : Les nouveaux avantages s'activent tout de suite\n• **Calcul au prorata** : Vous ne payez que la différence\n• **Aucune interruption** de service\n\n**Exemple** : Vous êtes Starter (2 000 F/mois) et passez à Business (3 500 F/mois) le 15 du mois → Vous payez la différence pour les 15 jours restants.\n\n**️ DOWNGRADE (Passer à un forfait inférieur)** :\n\n**Comment faire** :\n1. Même processus que l'upgrade\n2. Le changement prend effet à la **prochaine échéance**\n\n**✅ Avantages** :\n• Vous gardez les avantages actuels jusqu'à la fin de la période payée\n• Pas de remboursement partiel (mais pas de double facturation)\n\n**❌ ANNULATION** :\n\n**Comment faire** :\n1. Contactez le support : support@jobconnect.tg\n2. Précisez votre demande d'annulation\n3. Confirmation sous 24h\n\n**️ Important** :\n• Votre forfait reste actif jusqu'à la fin de la période payée\n• Aucun remboursement pour les mois restants\n• Vous pouvez vous réabonner à tout moment\n\n**💡 Notre conseil** :\n• **Upgrade** : Toujours intéressant si votre activité décolle\n• **Downgrade** : Possible, mais réfléchissez bien (perte de visibilité)\n• **Annuel** : Plus économique (-10%) si vous êtes sûr de rester\n\n[👉 Gérer mon abonnement](/dashboard/pro)\n\nBesoin d'aide pour choisir ? Dites-moi votre situation ! 😊"
    ]
  },
  
  {
    id: "delete_account",
    intents: ["question_supprimer"],
    keywords: ["supprimer", "désinscrire", "desinscrire", "fermer compte", "partir", "quitter", "delete", "effacer", "suppression"],
    category: "account",
    responses: [
      "👋 **Suppression de Compte** - On est tristes de vous voir partir ! 😢\n\n**⚠️ Attention** : Cette action est **IRRÉVERSIBLE** !\n\n**Ce qui sera perdu** :\n❌ Toutes vos données personnelles\n❌ Votre historique de transactions\n❌ Vos avis (donnés et reçus)\n❌ Votre portfolio et réalisations\n❌ Votre réputation accumulée\n\n**🤔 Avant de partir, considérez** :\n\n**Alternative 1 : Pause temporaire**\n• Désactivez simplement votre visibilité\n• Vos données restent sauvegardées\n• Réactivation possible à tout moment\n\n**Alternative 2 : Changer d'email**\n• Modifiable dans vos paramètres\n• Gardez votre historique\n\n**Alternative 3 : Nous parler**\n• Peut-être pouvons-nous résoudre votre problème ?\n• support@jobconnect.tg\n• +228 70 88 86 99\n\n**📋 Si vous voulez vraiment supprimer** :\n\n**Étapes** :\n1. Envoyez un email à : **support@jobconnect.tg**\n2. Objet : \"Demande de suppression de compte\"\n3. Incluez : votre email de compte + raison (optionnel)\n4. Traitement sous **48h ouvrées**\n5. Email de confirmation de suppression\n\n**🔒 Conformité RGPD** :\n• Suppression complète sous 30 jours\n• Backup supprimé sous 90 jours\n• Droit à l'oubli respecté\n\n**💙 Notre message** :\nNous sommes désolés de vous perdre. Si c'est un problème technique ou une mauvaise expérience, nous voulons le savoir pour nous améliorer.\n\n**📞 Dernière chance de nous parler** :\n• support@jobconnect.tg\n• +228 70 88 86 99\n\n[👉 Contacter le support](/contact)\n\nQuelle que soit votre décision, nous vous souhaitons le meilleur ! "
    ]
  },
  
  // ==========================================================================
  // SECTION 12 : DONNÉES & CONFIDENTIALITÉ
  // ==========================================================================
  
  {
    id: "data_privacy",
    intents: ["question_donnees"],
    keywords: ["données", "donnees", "privacy", "confidentialité", "confidentialite", "rgpd", "protection données", "protection donnees", "personnelles", "gdpr", "vie privée", "vie privee"],
    category: "legal",
    responses: [
      "🔒 **Protection des Données Personnelles** - Votre vie privée compte !\n\n**🛡️ Notre engagement** :\n\n**Conformité légale** :\n✅ Loi togolaise sur la protection des données\n✅ Standards internationaux (inspirés RGPD)\n✅ Bonnes pratiques de l'industrie\n\n** Mesures techniques** :\n• Chiffrement **SSL/TLS** de toutes les communications\n• Stockage sécurisé des données sensibles\n• Accès restreint aux données personnelles\n• Audits de sécurité réguliers\n• Sauvegardes chiffrées\n\n** Données collectées** :\n\n**Nécessaires au service** :\n• Nom, email, téléphone (inscription)\n• Photos de profil et portfolio\n• Historique de transactions\n• Avis et notations\n\n**NON collectées** :\n❌ Données bancaires (paiement direct entre vous)\n❌ Localisation GPS en temps réel\n❌ Données de navigation tierces\n\n**🎯 Vos droits** :\n\n**👁️ Droit d'accès** : Demander une copie de vos données\n**✏️ Droit de rectification** : Modifier vos informations\n**🗑️ Droit à l'oubli** : Suppression complète de votre compte\n**🚫 Droit d'opposition** : Refuser certains traitements\n**📤 Portabilité** : Récupérer vos données dans un format standard\n\n**📧 Pour exercer vos droits** :\n**privacy@jobconnect.tg**\n\nRéponse garantie sous **30 jours**.\n\n**🤝 Partage de données** :\n• **JAMAIS** vendu à des tiers\n• Partage uniquement avec votre consentement\n• Sous-traitants sécurisés (hébergement, email)\n• Autorités si requis par la loi\n\n**🍪 Cookies** :\n• Uniquement techniques et analytiques\n• Pas de cookies publicitaires tiers\n• Gestion dans vos paramètres\n\n**📄 Documents complets** :\n[👉 Politique de confidentialité](/privacy)\n[ Conditions d'utilisation](/terms)\n[👉 Politique des cookies](/cookies)\n\n**💙 Votre confiance est notre priorité absolue !**\n\nDes questions spécifiques ? Je suis là ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 13 : CONDITIONS & LÉGAL
  // ==========================================================================
  
  {
    id: "terms_conditions",
    intents: ["question_conditions"],
    keywords: ["conditions", "cgu", "cgu", "règlement", "reglement", "règles", "regles", "loi", "légal", "legal", "mentions", "termes", "contrat"],
    category: "legal",
    responses: [
      "📋 **Conditions Générales d'Utilisation (CGU)**\n\n**🎯 En utilisant JOBCONNECT, vous acceptez** :\n\n**Pour TOUS les utilisateurs** :\n✅ Fournir des informations **exactes et à jour**\n✅ **Respecter** les autres utilisateurs (pros et clients)\n✅ Ne pas utiliser la plateforme à des fins **illégales**\n✅ **Payer directement** les professionnels pour les prestations\n✅ Laisser des avis **honnêtes et constructifs**\n✅ Protéger vos identifiants de connexion\n\n**Spécifique aux PROFESSIONNELS** :\n✅ Avoir les **qualifications requises** pour votre métier\n✅ Respecter les **prix convenus** avec les clients\n✅ Maintenir un **niveau de service** professionnel\n✅ Répondre aux demandes dans un **délai raisonnable**\n✅ Signaler tout **problème de sécurité**\n\n**Spécifique aux CLIENTS** :\n✅ Payer les prestations **convenues**\n✅ Laisser des avis **véridiques**\n✅ Respecter le **travail** des professionnels\n✅ Ne pas **contourner** la plateforme après mise en relation\n\n**️ Nos engagements** :\n\n✅ **Protéger** vos données personnelles\n✅ **Maintenir** la sécurité de la plateforme\n✅ **Modérer** les profils et avis\n✅ **Ne pas prélever** de commission sur les transactions\n✅ **Répondre** aux problèmes sous 24-48h\n✅ **Informer** des changements importants\n\n**️ Résolution des litiges** :\n\n**Étape 1** : Dialogue direct entre les parties\n**Étape 2** : Médiation via le support JOBCONNECT\n**Étape 3** : Recours aux autorités compétentes (Togo)\n\n**📄 Documents complets** :\n[👉 CGU complètes](/terms)\n[👉 Politique de confidentialité](/privacy)\n[👉 Mentions légales](/legal)\n[👉 Politique de remboursement](/refund)\n\n**📞 Questions légales** :\nlegal@jobconnect.tg\n\n**💙 La transparence est au cœur de notre relation !**\n\nBesoin de précisions sur un point ? 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 14 : PARTENARIATS & PRESSE
  // ==========================================================================
  
  {
    id: "partnership",
    intents: ["question_partenariat"],
    keywords: ["partenariat", "partenaire", "collaboration", "entreprise", "business", "b2b", "collaborer", "s'associer", "s'associer"],
    category: "business",
    responses: [
      "🤝 **Devenir Partenaire de JOBCONNECT**\n\n**🎯 Types de partenariats** :\n\n**1. Partenaires Technologiques** 🔌\n• Intégrations API sécurisées\n• Solutions de paiement (T-Money, Flooz)\n• Vérification d'identité\n• Services cloud et hébergement\n\n**2. Institutions & Formation** \n• Centres de formation professionnelle\n• Chambres de métiers et d'artisanat\n• ONG et associations\n• Universités et écoles\n\n**3. Programme d'Avantages (B2B)** 🎁\n• Offrir des réductions à nos pros Premium\n• Exemple : Ideenwerk (-20% pour les pros Premium)\n• Assurances, fournisseurs de matériel, etc.\n\n**4. Médias & Communication** 📰\n• Couverture médiatique\n• Influenceurs et ambassadeurs\n• Relations presse\n\n**📋 Notre processus** :\n\n**Étape 1** : Soumission de proposition\n→ [Formulaire partenaire](/partners)\n\n**Étape 2** : Due Diligence\n• Vérification de votre entreprise\n• Audit de sécurité (si technique)\n• Analyse de la valeur ajoutée\n\n**Étape 3** : Négociation\n• Définition des termes\n• Signature NDA (confidentialité)\n• Accord de partenariat\n\n**Étape 4** : Lancement\n• Intégration technique (si applicable)\n• Communication conjointe\n• Suivi et optimisation\n\n**✅ Nos exigences** :\n• Entreprise légalement établie\n• Respect de la réglementation togolaise\n• Standards de sécurité élevés\n• Valeurs alignées (transparence, qualité)\n\n**📧 Contact Partenariats** :\n**partners@jobconnect.tg**\n\n**📞 Téléphone** :\n+228 70 88 86 99\n\n[👉 Soumettre une proposition](/partners)\n\n**💡 Pourquoi nous rejoindre ?**\n• **500+ professionnels** actifs\n• **Croissance rapide** au Togo\n• **Vision panafricaine**\n• **Équipe passionnée**\n\nParlons de votre projet ! 🚀"
    ]
  },
  
  {
    id: "press_media",
    intents: ["question_presse"],
    keywords: ["presse", "média", "media", "journaliste", "interview", "communiqué", "communique", "kit média", "kit media", "article", "reportage"],
    category: "business",
    responses: [
      "📰 **Presse & Médias** - Espace Journalistes\n\n**🎯 Pour les journalistes et professionnels des médias** :\n\n** Kit Média Complet** :\n\n**Logos & Identité visuelle** :\n• Logo JOBCONNECT (SVG, PNG HD)\n• Logo Ideenwerk Technologies\n• Charte graphique complète\n• Photos de l'équipe et des bureaux\n\n**Données & Statistiques** :\n• Chiffres clés de la plateforme\n• Évolution et croissance\n• Impact économique au Togo\n• Témoignages de professionnels\n\n**Photos HD** :\n• Libres de droits pour usage éditorial\n• Screenshots de la plateforme\n• Photos d'événements\n\n** Porte-parole** :\n\n**Godfriend Agbevivi**\nFondateur & CEO, Ideenwerk Technologies\n\n**Sujets d'expertise** :\n• Digitalisation des services en Afrique\n• Économie des plateformes\n• Innovation technologique au Togo\n• Emploi et entrepreneuriat\n\n**📞 Contact Presse** :\n\n**Email** : press@ideenwerk.tg\n**Téléphone** : +228 70 88 86 99\n**Temps de réponse** : < 24h ouvrées\n\n**⚠️ Important** :\n• Utilisez une **adresse email professionnelle**\n• Précisez votre **média** et **deadline**\n• Indiquez le **sujet** de votre demande\n\n**📝 Demandes courantes** :\n• Interviews du fondateur\n• Données pour articles\n• Commentaires sur l'industrie\n• Photos pour publication\n\n**🔗 Liens utiles** :\n[👉 Page Presse complète](/press)\n[ À propos de l'entreprise](/company)\n[👉 Kit média (à venir)](/press/media-kit)\n\n**💡 Nous adorons collaborer avec les médias !**\nNotre mission de digitalisation du Togo mérite d'être racontée. 🇹\n\nComment pouvons-nous vous aider ? 😊"
    ]
  },
  
  {
    id: "careers_jobs",
    intents: ["question_carriere"],
    keywords: ["carrière", "carriere", "emploi", "job", "recrutement", "rejoindre l'équipe", "rejoindre l'equipe", "offre d'emploi", "travailler chez", "hiring", "recrute"],
    category: "business",
    responses: [
      "💼 **Carrières chez Ideenwerk Technologies** - Rejoignez l'aventure !\n\n**🌟 Pourquoi nous rejoindre ?**\n\n**Notre culture** :\n **Innovation** : Nous construisons l'avenir numérique du Togo\n **Apprentissage** : Formation continue et mentorat\n🤝 **Collaboration** : Équipe soudée et bienveillante\n **Impact** : Votre travail change des vies\n🔒 **Éthique** : Sécurité et transparence avant tout\n\n**🎯 Nos valeurs** :\n• Excellence technique\n• Esprit d'équipe\n• Curiosité intellectuelle\n• Respect et inclusion\n• Orientation résultats\n\n**💻 Départements qui recrutent** :\n\n**Technologie** :\n• Développeurs Full Stack (Next.js, Node.js)\n• DevOps & Cloud Engineers\n• Data Scientists & IA\n• UX/UI Designers\n\n**Produit & Design** :\n• Product Managers\n• UX Researchers\n• Graphic Designers\n\n**Business & Operations** :\n• Business Developers\n• Customer Success Managers\n• Marketing Specialists\n\n**Support & Legal** :\n• DPO (Data Protection Officer)\n• Legal Counsel\n• Support Specialists\n\n**📋 Processus de recrutement** :\n\n**1. Candidature** → [Voir les offres](/careers)\n**2. Screening** (48h)\n**3. Entretien RH** (30 min)\n**4. Entretien technique** (1h)\n**5. Test pratique** (si applicable)\n**6. Offre & intégration**\n\n**️ Durée totale** : 2-3 semaines\n\n**🎁 Avantages** :\n• Salaire compétitif\n• Formation continue\n• Équipement fourni\n• Flexibilité horaire\n• Impact réel\n\n**📧 Contact Carrières** :\n**careers@ideenwerk.tg**\n\n[👉 Voir toutes les offres](/careers)\n\n**💡 Pas d'offre qui correspond ?**\nEnvoyez une candidature spontanée ! Nous gardons tous les profils intéressants.\n\nRejoignez-nous pour construire l'avenir ! 🚀"
    ]
  },
  
  // ==========================================================================
  // SECTION 15 : SUPPORT & CONTACT
  // ==========================================================================
  
  {
    id: "contact_support",
    intents: ["question_contact"],
    keywords: ["contacter", "contact", "email", "mail", "téléphone", "telephone", "joindre", "support", "aide", "assistance", "problème", "probleme", "bug", "erreur", "joindre l'équipe", "joindre l'equipe", "help", "sos"],
    category: "support",
    responses: [
      " **Contactez l'Équipe JOBCONNECT** - Nous sommes là pour vous !\n\n**🎯 Choisissez le canal le plus adapté** :\n\n**📧 Email (recommandé)** :\n**support@jobconnect.tg**\n• Réponse sous **24h ouvrées**\n• Idéal pour les questions détaillées\n• Joignez des captures d'écran si pertinent\n\n** Téléphone** :\n**+228 70 88 86 99**\n**+228 79 94 07 93**\n• Lun - Ven : 08h00 - 17h00 (GMT)\n• Idéal pour les urgences\n\n** Adresse** :\nLomé, Togo 🇬\n(Sur rendez-vous uniquement)\n\n** Canaux spécialisés** :\n\n** Sécurité & Données** :\nprivacy@jobconnect.tg\n\n**⚖️ Questions légales** :\nlegal@jobconnect.tg\n\n**🤝 Partenariats** :\npartners@jobconnect.tg\n\n** Presse & Médias** :\npress@ideenwerk.tg\n\n**💼 Carrières** :\ncareers@ideenwerk.tg\n\n**💡 Pour une réponse rapide** :\n\n✅ **Soyez précis** : Décrivez votre problème en détail\n✅ **Identifiez-vous** : Email de votre compte\n✅ **Illustrez** : Captures d'écran, messages d'erreur\n✅ **Contexte** : Quand c'est arrivé, ce que vous faisiez\n\n**📋 Exemple de bon email** :\n\"Bonjour,\nJe rencontre un problème pour me connecter (email: xxx@xxx.com). Message d'erreur : 'Mot de passe incorrect' alors que je suis sûr de mon mot de passe. Capture d'écran en pièce jointe. Merci de votre aide.\"\n\n**⏱️ Temps de réponse garantis** :\n• Email : < 24h ouvrées\n• Téléphone : Immédiat (heures ouvrées)\n• Urgences : < 2h\n\n**🌟 Notre engagement** :\nVotre satisfaction est notre priorité. Nous ne nous arrêtons pas tant que votre problème n'est pas résolu !\n\n[👉 Formulaire de contact](/contact)\n[ FAQ complète](/faq)\n\nComment pouvons-nous vous aider ? 😊"
    ]
  },
  
  {
    id: "faq_general",
    intents: ["question_faq"],
    keywords: ["faq", "questions fréquentes", "questions frequentes", "aide", "help", "foire aux questions", "comment faire"],
    category: "support",
    responses: [
      "❓ **Questions Fréquentes (FAQ)** - Réponses instantanées !\n\n** Top 10 des questions** :\n\n**1. JOBCONNECT prend-il une commission ?**\n→ **NON** ! 0% de commission. Le client paie directement le pro.\n\n**2. L'inscription est-elle gratuite ?**\n→ **OUI** ! Pour les clients ET les professionnels (plan Gratuit disponible).\n\n**3. Comment sont vérifiés les professionnels ?**\n→ Via le **Badge Vérifié** (5 000 FCFA/an) : CNI + casier judiciaire + justificatif de qualification. Validation sous 24-48h.\n\n**4. Quels modes de paiement ?**\n→ T-Money, Flooz, espèces, virement bancaire (paiement direct entre client et pro).\n\n**5. Combien coûtent les forfaits ?**\n→ Starter: 2 000 F/mois | Business: 3 500 F/mois  | Premium: 7 500 F/mois 👑\n→ **-10%** avec le paiement annuel !\n\n**6. Comment contacter le support ?**\n→  support@jobconnect.tg | 📱 +228 70 88 86 99\n\n**7. Dans quelles villes êtes-vous présents ?**\n→ **Tout le Togo** ! Lomé, Kara, Sokodé, Kpalimé, Atakpamé, Dapaong, Tsévié...\n\n**8. Combien de métiers sont disponibles ?**\n→ **500+ métiers** : du plombier au développeur web, en passant par l'avocat et le couturier.\n\n**9. Comment supprimer mon compte ?**\n→ Email à support@jobconnect.tg avec votre demande. Traitement sous 48h.\n\n**10. Mes données sont-elles protégées ?**\n→ **OUI** ! Chiffrement SSL, conformité loi togolaise, jamais vendues à des tiers.\n\n**📚 FAQ complète** :\n[👉 Voir toutes les questions](/faq)\n\n**💡 Votre question n'est pas listée ?**\nPosez-la moi directement ou contactez le support !\n\nJe suis là pour vous aider ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 16 : CONSEILS & RÉUSSITE
  // ==========================================================================
  
  {
    id: "success_tips",
    intents: ["question_conseil"],
    keywords: ["conseil", "astuce", "tip", "recommandation", "comment réussir", "comment reussir", "améliorer", "ameliorer", "optimiser", "augmenter", "plus de clients"],
    category: "tips",
    responses: [
      "🎯 **Conseils pour Réussir sur JOBCONNECT** - Boostez votre activité !\n\n** Pour les PROFESSIONNELS** :\n\n**📸 1. Profil impeccable**\n• Photo professionnelle et souriante\n• Bio complète qui raconte votre histoire\n• Spécialité clairement définie\n• Portfolio avec 5+ réalisations\n\n**⭐ 2. Obtenez le Badge Vérifié**\n• +300% de confiance des clients\n• Priorité dans les recherches\n• ROI moyen : x10 en 1 mois\n\n** 3. Choisissez le bon forfait**\n• **Business** (3 500 F/mois) = meilleur ROI\n• Top 5 des recherches\n• Statistiques pour optimiser\n\n**⚡ 4. Soyez réactif**\n• Répondez sous 2h aux demandes\n• Taux de réponse affiché sur votre profil\n• Les pros réactifs reçoivent +50% de contacts\n\n**🌟 5. Excellence du service**\n• Surpassez les attentes\n• Soyez ponctuel\n• Communication claire\n• Demandez gentiment un avis après\n\n**📊 6. Analysez vos stats** (plan Business+)\n• Vues de profil\n• Taux de contact\n• Ajustez votre stratégie\n\n**👥 Pour les CLIENTS** :\n\n** 1. Recherche efficace**\n• Filtrez par ville et catégorie\n• Lisez les avis attentivement\n• Vérifiez le portfolio\n\n**🛡️ 2. Choisissez la sécurité**\n• Privilégiez le Badge Vérifié\n• Note moyenne 4.5+\n• Pro avec historique\n\n**💬 3. Communication claire**\n• Décrivez précisément votre besoin\n• Convenez du prix par écrit\n• Clarifiez les délais\n\n**⭐ 4. Laissez des avis**\n• Aidez la communauté\n• Encouragez les bons pros\n• Signalez les problèmes\n\n** Statistiques de réussite** :\n• Pros complets : **+200%** de contacts\n• Avec Badge : **+300%** de confiance\n• Plan Business : **+150%** de visibilité\n• Réactifs (<2h) : **+50%** de conversions\n\n** Le secret** : Combinez **Badge Vérifié + Plan Business + Réactivité** = **TOP PERFORMER** !\n\n[ Devenir pro](/register?role=pro)\n[👉 Trouver un pro](/marketplace)\n\nBesoin de conseils personnalisés ? Dites-moi votre situation ! 😊"
    ]
  },
  
  // ==========================================================================
  // SECTION 17 : DÉLAIS & GARANTIES
  // ==========================================================================
  
  {
    id: "delays_guarantees",
    intents: ["question_delai", "question_garantie"],
    keywords: ["délai", "delai", "temps", "combien de temps", "durée", "duree", "quand", "rapidité", "rapidite", "vite", "rapidement", "garantie", "remboursement", "refund", "satisfait", "satisfait ou remboursé"],
    category: "support",
    responses: [
      "⏱️ **Délais & Garanties JOBCONNECT**\n\n**📋 Délais de traitement** :\n\n**Inscription** :\n• Création de compte : **Instantané**\n• Vérification email : < 5 minutes\n• Activation du compte : Immédiate après vérification\n\n**Vérification d'identité (Badge)** :\n• Soumission des documents : Instantanée\n• Examen par notre équipe : **24-48h ouvrées**\n• Attribution du badge : Immédiate après validation\n\n**Support client** :\n• Email : < **24h ouvrées**\n• Téléphone : **Immédiat** (heures ouvrées)\n• Urgences : < **2h**\n\n**Paiement des forfaits** :\n• Activation : **Immédiate** après paiement\n• Upgrade : **Immédiat**\n• Downgrade : À la prochaine échéance\n\n**💰 Politique de remboursement** :\n\n**Forfaits de visibilité** :\n• ❌ Pas de remboursement partiel\n• ✅ Possibilité de downgrade à la prochaine échéance\n• ✅ Annulation à tout moment (actif jusqu'à la fin payée)\n\n**Badge Vérifié (5 000 FCFA/an)** :\n• ❌ Non remboursable une fois le processus lancé\n• ✅ Remboursement si documents refusés par notre équipe\n\n**️ Nos garanties** :\n\n**Pour les CLIENTS** :\n✅ Professionnels vérifiés (si Badge)\n✅ Avis authentiques et modérés\n✅ Support réactif en cas de problème\n✅ Signalement des profils suspects\n\n**Pour les PROS** :\n✅ 0% de commission (garantie contractuelle)\n✅ Visibilité conforme au forfait choisi\n✅ Support dédié à votre réussite\n✅ Données protégées et sécurisées\n\n**⚠️ En cas de litige** :\n1. Dialogue direct entre les parties\n2. Médiation JOBCONNECT (gratuite)\n3. Recours aux autorités si nécessaire\n\n**📞 Contact pour problèmes** :\nsupport@jobconnect.tg\n+228 70 88 86 99\n\n**💙 Notre promesse** : Transparence totale et accompagnement jusqu'à résolution !\n\n[👉 Conditions complètes](/terms)\n[👉 Politique de remboursement](/refund)\n\nDes questions sur un délai spécifique ? 😊"
    ]
  },
  
  // ==========================================================================
  // RÉPONSES PAR DÉFAULT INTELLIGENTES (Ne dit jamais \"je ne comprends pas\")
  // ==========================================================================
  
  {
    id: "default_smart_1",
    intents: [],
    keywords: [],
    category: "default",
    responses: [
      " **Intéressant comme question !** Laissez-moi vous aider au mieux.\n\nJe suis **JOBI**, l'expert de **JOBCONNECT** 🇹. Je peux vous renseigner sur :\n\n💰 **Nos tarifs** (0% commission !)\n• Gratuit, Starter (2 000 F/mois), Business (3 500 F/mois), Premium (7 500 F/mois)\n\n📝 **Inscription et connexion**\n• Comment créer votre compte en 2 minutes\n\n🔍 **Trouver un professionnel**\n• 500+ métiers disponibles dans tout le Togo\n\n🛡️ **Sécurité et vérification**\n• Badge Vérifié, avis clients, protection des données\n\n📞 **Contacter le support**\n• support@jobconnect.tg | +228 70 88 86 99\n\n **À propos de nous**\n• Ideenwerk Technologies, notre mission, nos valeurs\n\n**Pourriez-vous préciser votre question ?** Je ferai de mon mieux pour vous répondre ! 😊\n\nOu cliquez sur une suggestion ci-dessous pour commencer ! 👇"
    ]
  },
  
  {
    id: "default_smart_2",
    intents: [],
    keywords: [],
    category: "default",
    responses: [
      "💡 **Je veux vraiment vous aider !** \n\nPour vous donner la meilleure réponse, dites-moi si votre question concerne :\n\n**🎯 Les services JOBCONNECT** :\n• Comment ça marche ?\n• Quels sont les avantages ?\n• Comment m'inscrire ?\n\n**💰 La tarification** :\n• Combien coûtent les forfaits ?\n• Y a-t-il des commissions ?\n• Quel plan choisir ?\n\n**🔍 La marketplace** :\n• Comment trouver un pro ?\n• Quels métiers sont disponibles ?\n• Comment sont vérifiés les pros ?\n\n**🛡️ La sécurité** :\n• Mes données sont-elles protégées ?\n• Comment éviter les arnaques ?\n• Qu'est-ce que le Badge Vérifié ?\n\n**📞 Le support** :\n• Comment vous contacter ?\n• J'ai un problème technique\n\n**Posez-moi votre question en détail**, et je vous réponds immédiatement ! 🚀\n\nJe suis là pour vous, 24h/24 ! 😊"
    ]
  },
  
  {
    id: "default_smart_3",
    intents: [],
    keywords: [],
    category: "default",
    responses: [
      "✨ **Excellente question !** (Même si je dois avouer que je ne suis pas 100% sûr de ce que vous demandez 😅)\n\n**Ce que je sais faire de mieux** :\n\n✅ Vous expliquer **comment fonctionne JOBCONNECT**\n✅ Vous guider dans **l'inscription** (client ou pro)\n✅ Vous présenter **nos tarifs** (très compétitifs !)\n✅ Vous aider à **trouver le pro idéal**\n✅ Vous renseigner sur **la sécurité**\n✅ Vous mettre en contact avec **notre support**\n\n**💡 Astuce** : Essayez de reformuler votre question avec des mots-clés comme :\n• \"prix\", \"tarif\", \"combien\"\n• \"inscription\", \"connexion\"\n• \"trouver\", \"chercher\"\n• \"sécurité\", \"vérifié\"\n• \"contact\", \"support\"\n\n**Ou alors**, si votre question est très spécifique, contactez directement notre équipe :\n📧 support@jobconnect.tg\n📱 +228 70 88 86 99\n\nJe suis désolé de ne pas pouvoir vous aider davantage sur ce point précis, mais je reste à votre disposition pour tout ce qui concerne JOBCONNECT ! \n\nQue puis-je faire d'autre pour vous ? 🌟"
    ]
  }
]

// ============================================================================
// 🧠 MODULE 2 : MOTEUR D'INFÉRENCE AVANCÉ
// ============================================================================

/**
 * Normalisation avancée du texte
 * Gère les accents, la ponctuation, les variations
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/[^\w\s]/gi, "") // Enlever la ponctuation
    .replace(/\s+/g, " ") // Normaliser les espaces
    .trim()
}

/**
 * Distance de Levenshtein (pour les fautes de frappe)
 */
const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null))
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      )
    }
  }
  return matrix[b.length][a.length]
}

/**
 * Expansion des synonymes
 * Transforme \"prix\" en [\"prix\", \"tarif\", \"coût\", ...]
 */
const expandWithSynonyms = (text: string): string[] => {
  const words = text.split(/\s+/)
  const expanded = new Set<string>()
  
  words.forEach(word => {
    expanded.add(word)
    // Chercher si le mot est un synonyme connu
    for (const [canonical, synonyms] of Object.entries(SYNONYMS_DATABASE)) {
      if (synonyms.includes(word) || canonical === word) {
        expanded.add(canonical)
        synonyms.forEach(s => expanded.add(s))
      }
    }
  })
  
  return Array.from(expanded)
}

/**
 * Détection d'intentions multiples
 */
const detectIntents = (text: string): string[] => {
  const normalizedText = normalizeText(text)
  const detectedIntents: string[] = []
  
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(normalizedText)) {
      detectedIntents.push(intent)
    }
  }
  
  return detectedIntents
}

/**
 * Calcul de score de correspondance avancé
 */
const calculateMatchScore = (userInput: string, entry: any): number => {
  const normalizedInput = normalizeText(userInput)
  const expandedInput = expandWithSynonyms(normalizedInput)
  const detectedIntents = detectIntents(userInput)
  
  let score = 0
  
  // 1. Bonus pour correspondance d'intention (fort signal)
  for (const intent of detectedIntents) {
    if (entry.intents.includes(intent)) {
      score += 20
    }
  }
  
  // 2. Score basé sur les mots-clés exacts
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword)
    if (normalizedInput.includes(normalizedKeyword)) {
      score += normalizedKeyword.length * 2
    }
  }
  
  // 3. Score basé sur les synonymes expansés
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword)
    for (const expanded of expandedInput) {
      if (expanded === normalizedKeyword) {
        score += 15
      }
    }
  }
  
  // 4. Fuzzy matching (fautes de frappe)
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword)
    const distance = levenshteinDistance(normalizedInput.substring(0, 30), normalizedKeyword.substring(0, 30))
    if (distance <= 4 && distance > 0) {
      score += Math.max(0, 10 - distance * 2)
    }
  }
  
  // 5. Bonus pour longueur de correspondance
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword)
    if (normalizedInput.includes(normalizedKeyword) && normalizedKeyword.length > 5) {
      score += 5 // Bonus pour les mots longs (plus spécifiques)
    }
  }
  
  return score
}

/**
 * Trouve la meilleure réponse avec fallback intelligent
 */
const findBestAnswer = (userInput: string, conversationHistory: any[] = []): string => {
  const normalizedInput = normalizeText(userInput)
  const detectedIntents = detectIntents(userInput)
  
  // 1. Vérifier d'abord les réponses sociales/émotionnelles
  for (const [category, responses] of Object.entries(SOCIAL_RESPONSES)) {
    const pattern = INTENT_PATTERNS[category as keyof typeof INTENT_PATTERNS]
    if (pattern && pattern.test(normalizedInput)) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }
  
  // 2. Chercher dans la base de connaissances
  let bestMatch = null
  let highestScore = 0
  
  for (const entry of KNOWLEDGE_BASE) {
    const score = calculateMatchScore(userInput, entry)
    if (score > highestScore) {
      highestScore = score
      bestMatch = entry
    }
  }
  
  // 3. Seuil de confiance
  if (highestScore >= 15 && bestMatch) {
    const responses = bestMatch.responses
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  // 4. Fallback intelligent (ne dit jamais \"je ne comprends pas\")
  const defaultResponses = KNOWLEDGE_BASE
    .filter(e => e.category === "default")
    .flatMap(e => e.responses)
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

// ============================================================================
//  MODULE 3 : COMPOSANT CHATBOT PRINCIPAL
// ============================================================================

interface Message {
  type: "bot" | "user"
  text: string
  time: string
  feedback?: "up" | "down" | null
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: "bot", 
      text: "👋 **Bonjour et bienvenue sur JOBCONNECT !** 🇬\n\nJe suis **JOBI**, votre assistant IA ultra-intelligent.\n\n✨ **Je peux vous aider à** :\n• 💰 Comprendre nos **tarifs** (0% commission !)\n• 📝 Vous **inscrire** ou vous **connecter**\n• 🔍 Trouver le **professionnel idéal**\n• 🛡️ En savoir plus sur la **sécurité**\n• 💼 Devenir **professionnel** sur la plateforme\n•  Contacter notre **support**\n\n **Posez-moi n'importe quelle question**, je suis là pour vous !\n\nQue souhaitez-savoir en premier ? 😊",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userRole, setUserRole] = useState<'client' | 'professional'>('client')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = {
    client: [
      "💰 Quels sont les tarifs ?",
      "🔍 Comment trouver un pro ?",
      "🛡️ Est-ce sécurisé ?",
      "📝 Comment m'inscrire ?"
    ],
    professional: [
      "💼 Quel plan choisir ?",
      "🚫 Y a-t-il des commissions ?",
      "️ Comment être vérifié ?",
      " Comment réussir ?"
    ]
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Formatage sécurisé des messages (gras, listes, liens)
  const formatMessage = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      // Gestion du gras **texte**
      const parts = line.split(/\*\*(.*?)\*\*/)
      const formatted = parts.map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{part}</strong> : part
      )
      
      // Gestion des liens [texte](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const processedParts: any[] = []
      let lastIndex = 0
      let match
      
      const lineStr = Array.isArray(formatted[0]) ? formatted.join('') : formatted
      
      // Simple rendering for links
      if (typeof lineStr === 'string' && linkRegex.test(lineStr)) {
        linkRegex.lastIndex = 0
        while ((match = linkRegex.exec(lineStr)) !== null) {
          if (match.index > lastIndex) {
            processedParts.push(lineStr.substring(lastIndex, match.index))
          }
          processedParts.push(
            <a 
              key={`link-${i}-${match.index}`}
              href={match[2]}
              className="text-[#818CF8] underline hover:text-[#A5B4FC] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {match[1]}
            </a>
          )
          lastIndex = match.index + match[0].length
        }
        if (lastIndex < lineStr.length) {
          processedParts.push(lineStr.substring(lastIndex))
        }
      } else {
        processedParts.push(...formatted)
      }
      
      // Listes à puces et numérotées
      if (line.trim().match(/^[•\-\*]\s/) || line.trim().match(/^\d+\.\s/)) {
        return (
          <div key={i} className="flex items-start gap-2 my-1.5 ml-2">
            <span className="text-[#818CF8] mt-1 text-lg leading-none flex-shrink-0">
              {line.trim().match(/^\d+\./) ? line.trim().match(/^\d+/)[0] + '.' : '•'}
            </span>
            <span className="text-white/90 leading-relaxed flex-1">
              {line.trim().replace(/^[•\-\*]\s/, '').replace(/^\d+\.\s/, '')}
            </span>
          </div>
        )
      }
      
      return <p key={i} className="mb-1.5 text-white/90 leading-relaxed last:mb-0">{processedParts.length > 0 ? processedParts : '\u00A0'}</p>
    })
  }

  const sendMessage = useCallback((messageText: string) => {
    if (!messageText.trim() || isTyping) return

    const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const userMessage: Message = { type: "user", text: messageText.trim(), time: currentTime }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // ⏱️ Délai de réflexion naturel (2-4 secondes aléatoire)
    const thinkingTime = 2000 + Math.random() * 2000
    
    setTimeout(() => {
      const reply = findBestAnswer(messageText, messages)
      const botTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      
      setMessages(prev => [...prev, { 
        type: "bot", 
        text: reply, 
        time: botTime 
      }])
      setIsTyping(false)
    }, thinkingTime)

  }, [isTyping, messages])

  const handleSend = () => sendMessage(input)
  
  const handleQuickReply = (reply: string) => {
    const cleanReply = reply.replace(/^[^\w\s]*/g, '').trim()
    sendMessage(cleanReply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleReset = () => {
    setMessages([{
      type: "bot",
      text: "🔄 **Conversation réinitialisée !**\n\nJe suis **JOBI**, votre assistant expert JOBCONNECT. 🇹🇬\n\nComment puis-je vous aider aujourd'hui ? 😊",
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <>
      {/* Bouton flottant avec effet de lueur */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center justify-center z-[9999] border border-white/20 transition-all"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay pour mobile */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            />
            
            {/* Fenêtre de Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-[95vw] md:w-[420px] max-h-[85vh] md:max-h-[650px] bg-[#0F172A] rounded-2xl shadow-2xl z-[9999] overflow-hidden flex flex-col border border-white/10"
              style={{ 
                scrollbarWidth: 'thin', 
                scrollbarColor: 'rgba(255,255,255,0.2) transparent' 
              }}
            >
              {/* Header */}
              <div className="bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10 p-4 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#0F172A]">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        JOBI AI
                        <Sparkles className="w-4 h-4 text-[#818CF8]" />
                      </h3>
                      <p className="text-xs text-white/60 flex items-center gap-1.5">
                        {isTyping ? (
                          <><span className="w-1.5 h-1.5 bg-[#818CF8] rounded-full animate-pulse" /> Réflexion en cours...</>
                        ) : (
                          <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> En ligne • Ultra-Intelligent</>
                        )}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="p-2 hover:bg-white/10 rounded-full transition text-white/70 hover:text-white"
                    title="Nouvelle conversation"
                    aria-label="Réinitialiser la conversation"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                {/* Sélecteur de rôle */}
                <div className="flex bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setUserRole('client')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userRole === 'client' 
                        ? 'bg-white text-[#0F172A] shadow-sm' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" /> Client
                  </button>
                  <button
                    onClick={() => setUserRole('professional')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      userRole === 'professional' 
                        ? 'bg-white text-[#0F172A] shadow-sm' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Pro
                  </button>
                </div>
              </div>

              {/* Zone des Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0F172A]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2.5 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                        msg.type === "user" 
                          ? "bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white" 
                          : "bg-white/10 border border-white/20 text-white"
                      }`}>
                        {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      
                      {/* Bulle de message */}
                      <div className="flex flex-col">
                        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                          msg.type === "user"
                            ? "bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white rounded-br-md"
                            : "bg-white/10 backdrop-blur-md text-white rounded-bl-md border border-white/10"
                        }`}>
                          <div className="text-[13px] whitespace-normal">
                            {formatMessage(msg.text)}
                          </div>
                        </div>
                        
                        {/* Métadonnées */}
                        <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <span className="text-[10px] text-white/40 font-medium">{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Indicateur de frappe */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-md border border-white/10 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions rapides */}
              <AnimatePresence>
                {messages.length <= 2 && !isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 py-3 border-t border-white/10 bg-[#0F172A]/50 backdrop-blur-sm shrink-0"
                  >
                    <p className="text-[11px] text-white/50 mb-2 font-semibold uppercase tracking-wider">💡 Suggestions :</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies[userRole].map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="text-[12px] bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/90 px-3 py-2 rounded-xl transition-all border border-white/10 text-left"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-white/10 bg-[#0F172A] shrink-0">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isTyping}
                      placeholder={isTyping ? "JOBI réfléchit..." : "Posez-moi n'importe quelle question..."}
                      className="w-full px-4 py-3 bg-white text-[#0F172A] placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 text-sm font-medium transition-all disabled:opacity-70"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-[#4F46E5]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
                    aria-label="Envoyer le message"
                  >
                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-white/30 mt-2.5 text-center font-medium">
                  ⏎ Entrée pour envoyer • JOBI Ultra-Intelligent 
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}