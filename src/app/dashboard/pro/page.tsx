// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { 
  Home, Star, Settings, LogOut, CheckCircle, Clock, Upload, 
  Shield, Loader2, Menu, X, Crown, Award, Image as ImageIcon,
  Trash2, Sun, Moon, Heart, CheckCircle2, AlertCircle, 
  Play, Pause, Save, Phone, MessageCircle, ExternalLink, Briefcase,
  Plus, Eye, Zap, FileText, Camera, Globe, Rocket, Edit3, ArrowRight
} from 'lucide-react'

// ✅ LISTE COMPLÈTE DE TOUTES LES CATÉGORIES DE MÉTIERS
const categoriesMetiers = [
  'Maçon', 'Charpentier', 'Menuisier', 'Ébéniste', 'Couvreur', 'Plombier', 'Électricien', 'Peintre en bâtiment', 'Carreleur', 'Plâtrier', 'Plaquiste', 'Serrurier', 'Ferronnier', 'Forgeron', 'Soudeur', 'Vitrier', 'Miroitier', 'Tailleur de pierre', 'Marbrier', 'Façadier', 'Étancheur', 'Constructeur métallique', 'Installateur sanitaire', 'Installateur thermique', 'Ramoneur',
  'Chimiste artisanal', 'Potier', 'Céramiste', 'Sculpteur sur bois', 'Sculpteur sur pierre', 'Tourneur sur bois', 'Graveur', 'Doreur', 'Encadreur', 'Restaurateur de meubles', 'Tapissier', 'Cannage de chaises', 'Vannier', 'Tonnelier', 'Luthier', 'Facteur de piano', 'Fabricant de guitares', 'Fabricant de violons',
  'Horloger', 'Bijoutier', 'Joaillier', 'Orfèvre', 'Sertisseur', 'Graveur sur bijoux', 'Diamantaire',
  'Cordonnier', 'Bottier', 'Sellier', 'Bourrelier', 'Maroquinier', 'Fabricant de sacs', 'Fabricant de ceintures', 'Fabricant de chaussures', 'Chapelier', 'Modiste', 'Couturier', 'Tailleur', 'Brodeur', 'Dentellier', 'Styliste artisanal', 'Tricoteur', 'Tisserand', 'Fileur de laine', 'Teinturier textile', 'Imprimeur textile', 'Fabricant de tapis', 'Fabricant de rideaux', 'Fabricant de linge de maison', 'Fabricant de vêtements traditionnels',
  'Savonnier', 'Parfumeur artisanal', 'Fabricant de bougies', 'Fabricant d\'encens', 'Cosméticien artisanal', 'Fabricant de produits naturels', 'Fabricant de shampoings naturels', 'Fabricant de lotions', 'Fabricant de crèmes artisanales',
  'Apiculteur', 'Chocolatier', 'Confiseur', 'Glacier artisanal', 'Boulanger', 'Pâtissier', 'Viennoisier', 'Biscuitier', 'Traiteur artisanal', 'Charcutier', 'Boucher', 'Poissonnier', 'Fromager', 'Affineur de fromage', 'Torréfacteur', 'Brasseur artisanal', 'Distillateur artisanal', 'Fabricant de jus naturels', 'Fabricant de confitures', 'Fabricant de miel', 'Fabricant de sirops', 'Fabricant de sauces', 'Fabricant d\'épices', 'Fabricant de vinaigre', 'Fabricant d\'huile artisanale', 'Fabricant de pâtes fraîches', 'Fabricant de couscous', 'Fabricant de yaourt', 'Fabricant de beurre', 'Fabricant de glace', 'Fabricant de biscuits', 'Fabricant de gâteaux', 'Fabricant de bonbons', 'Fabricant de nougat', 'Fabricant de pâte d\'arachide', 'Fabricant de farine artisanale', 'Meunier', 'Brasseur de bière locale', 'Vigneron artisanal', 'Fabricant de vin de palme', 'Fabricant de boissons locales', 'Fabricant de fromage artisanal', 'Producteur de beurre de karité', 'Fabricant de savon noir', 'Fabricant d\'huile de coco', 'Fabricant d\'huile de palme', 'Fabricant de produits à base d\'aloès', 'Fabricant de produits bio',
  'Fabricant de paniers', 'Fabricant de nattes', 'Fabricant de balais', 'Fabricant de meubles en bambou', 'Fabricant de meubles en rotin', 'Fabricant de meubles en métal', 'Fabricant de meubles en bois', 'Fabricant de portes', 'Fabricant de fenêtres', 'Fabricant d\'escaliers', 'Fabricant de cuisines', 'Fabricant de placards', 'Fabricant de lits', 'Fabricant de tables', 'Fabricant de chaises', 'Fabricant de canapés', 'Fabricant d\'armoires', 'Fabricant de bureaux', 'Fabricant d\'étagères', 'Fabricant de palettes', 'Fabricant de caisses en bois',
  'Fabricant de jouets en bois', 'Fabricant d\'objets décoratifs', 'Fabricant de sculptures', 'Fabricant de cadres photo', 'Fabricant de lampes artisanales', 'Fabricant de lustres', 'Fabricant de décorations murales', 'Fabricant de miroirs', 'Fabricant de statues', 'Fabricant de fontaines', 'Fabricant de pots de fleurs', 'Fabricant de jardinières',
  'Fleuriste artisanal', 'Paysagiste', 'Jardinier', 'Élagueur', 'Pépiniériste', 'Horticulteur', 'Maraîcher', 'Arboriculteur', 'Producteur de fleurs', 'Producteur de plantes médicinales', 'Producteur de champignons', 'Fabricant de compost', 'Fabricant de terreau', 'Fabricant de clôtures',
  'Constructeur de puits', 'Foreur de puits', 'Constructeur de citernes', 'Installateur de pompes', 'Installateur de panneaux solaires artisanaux', 'Installateur d\'antennes',
  'Réparateur de téléviseurs', 'Réparateur de radios', 'Réparateur d\'ordinateurs', 'Réparateur de téléphones', 'Réparateur d\'imprimantes', 'Réparateur d\'électroménagers', 'Réparateur de climatiseurs', 'Réparateur de réfrigérateurs', 'Réparateur de machines à laver', 'Réparateur de ventilateurs', 'Réparateur de générateurs',
  'Réparateur de motos', 'Réparateur de vélos', 'Réparateur d\'automobiles', 'Carrossier', 'Tôlier automobile', 'Peintre automobile', 'Vulcanisateur', 'Monteur de pneus', 'Mécanicien diesel', 'Mécanicien essence', 'Électricien automobile', 'Climaticien automobile', 'Réparateur de boîtes de vitesses', 'Réparateur de moteurs', 'Réparateur de tracteurs', 'Réparateur de machines agricoles', 'Réparateur de bateaux', 'Constructeur de pirogues', 'Constructeur de remorques',
  'Fabricant de pièces métalliques', 'Fabricant de clôtures métalliques', 'Fabricant de portails', 'Fabricant de grilles', 'Fabricant de rampes', 'Fabricant de citernes métalliques', 'Fabricant de réservoirs', 'Fabricant de silos', 'Fabricant d\'enseignes', 'Fabricant de panneaux publicitaires',
  'Calligraphe', 'Peintre d\'enseignes', 'Décorateur', 'Décorateur d\'intérieur', 'Restaurateur d\'œuvres d\'art', 'Restaurateur de tableaux', 'Restaurateur de sculptures', 'Restaurateur de livres anciens', 'Relieur', 'Imprimeur artisanal', 'Typographe', 'Fabricant de papier artisanal', 'Fabricant de cahiers', 'Fabricant d\'enveloppes', 'Fabricant de cartes artisanales', 'Fabricant de tampons', 'Fabricant de cachets', 'Fabricant de sceaux',
  'Fabricant de trophées', 'Fabricant de médailles', 'Fabricant de plaques signalétiques',
  'Fabricant de tam-tams', 'Fabricant de djembés', 'Fabricant de balafons', 'Fabricant de flûtes', 'Fabricant d\'instruments traditionnels', 'Fabricant de tambours', 'Fabricant de maracas', 'Fabricant de xylophones',
  'Fabricant de bijoux fantaisie', 'Fabricant de perles', 'Fabricant d\'accessoires de mode', 'Fabricant de lunettes artisanales', 'Fabricant de montres artisanales', 'Fabricant de porte-clés', 'Fabricant de porte-monnaie', 'Fabricant de portefeuilles',
  'Fabricant de boîtes cadeaux', 'Fabricant de coffrets', 'Fabricant de jouets artisanaux', 'Fabricant de poupées', 'Fabricant de figurines', 'Fabricant de maquettes', 'Fabricant de cerfs-volants', 'Fabricant de jeux de société artisanaux', 'Fabricant de puzzles',
  'Fabricant d\'articles religieux', 'Fabricant de croix', 'Fabricant de statues religieuses', 'Fabricant de chapelets', 'Fabricant de bougeoirs', 'Fabricant d\'autels', 'Fabricant de masques traditionnels', 'Fabricant d\'objets culturels', 'Fabricant de souvenirs touristiques',
  'Fabricant d\'articles en cuir', 'Fabricant d\'articles en cuivre', 'Fabricant d\'articles en aluminium', 'Fabricant d\'articles en inox', 'Fabricant d\'articles en verre', 'Fabricant d\'articles en pierre', 'Fabricant d\'articles en argile', 'Fabricant d\'articles en bambou', 'Fabricant d\'articles en rotin', 'Fabricant d\'articles en osier', 'Fabricant d\'articles en fibres naturelles', 'Fabricant d\'articles recyclés', 'Artisan recycleur', 'Créateur d\'objets écologiques',
  'Fabricant de mobilier urbain', 'Fabricant de bancs publics', 'Fabricant de pergolas', 'Fabricant d\'abris de jardin', 'Fabricant de kiosques',
  'Constructeur de cases traditionnelles', 'Constructeur de maisons en terre', 'Constructeur de maisons en bois', 'Constructeur de maisons écologiques', 'Constructeur de fours artisanaux',
  'Fabricant de briques', 'Fabricant de tuiles', 'Fabricant de pavés', 'Fabricant de blocs de béton', 'Fabricant de béton décoratif', 'Fabricant de ciment artisanal', 'Fabricant de chaux', 'Fabricant de plâtre',
  'Fabricant de moules artisanaux', 'Fabricant de filets de pêche', 'Fabricant de cannes à pêche', 'Fabricant de cages d\'élevage', 'Fabricant de ruches', 'Fabricant de mangeoires', 'Fabricant d\'abreuvoirs', 'Fabricant d\'équipements agricoles', 'Fabricant de brouettes', 'Fabricant de charrues', 'Fabricant de houes', 'Fabricant de machettes', 'Fabricant de couteaux artisanaux', 'Fabricant de haches', 'Fabricant de pelles', 'Fabricant de râteaux', 'Fabricant d\'outils manuels',
  'Fabricant d\'objets personnalisés', 'Graveur laser artisanal', 'Découpeur CNC artisanal', 'Imprimeur 3D artisanal', 'Artisan numérique',
  'Médecin généraliste', 'Médecin spécialiste', 'Chirurgien', 'Cardiologue', 'Neurologue', 'Dermatologue', 'Pédiatre', 'Gynécologue', 'Obstétricien', 'Psychiatre', 'Psychologue', 'Dentiste', 'Orthodontiste', 'Pharmacien', 'Infirmier', 'Infirmière', 'Sage-femme', 'Kinésithérapeute', 'Ostéopathe', 'Chiropracteur', 'Orthophoniste', 'Ergothérapeute', 'Opticien', 'Ophtalmologue', 'Audioprothésiste', 'Nutritionniste', 'Diététicien', 'Biologiste médical', 'Radiologue', 'Anesthésiste', 'Urgentiste', 'Oncologue', 'Pneumologue', 'Gastro-entérologue', 'Néphrologue', 'Endocrinologue', 'Rhumatologue', 'Urologue', 'Infectiologue', 'Gériatre', 'Vétérinaire', 'Assistant médical', 'Technicien de laboratoire', 'Technicien en radiologie', 'Ambulancier', 'Aide-soignant', 'Responsable hospitalier', 'Directeur d\'hôpital', 'Responsable qualité santé', 'Épidémiologiste',
  'Avocat', 'Notaire', 'Huissier de justice', 'Magistrat', 'Juge', 'Procureur', 'Greffier', 'Juriste', 'Conseiller juridique', 'Fiscaliste', 'Médiateur', 'Arbitre', 'Commissaire de justice', 'Expert judiciaire', 'Consultant juridique', 'Responsable conformité', 'Responsable RGPD', 'Officier de police judiciaire', 'Enquêteur privé', 'Criminologue',
  'Architecte', 'Architecte d\'intérieur', 'Urbaniste', 'Géomètre', 'Géomètre-expert', 'Ingénieur civil', 'Ingénieur en bâtiment', 'Conducteur de travaux', 'Chef de chantier', 'Économiste de la construction', 'Dessinateur industriel', 'Dessinateur bâtiment', 'BIM Manager', 'Topographe', 'Ingénieur structure', 'Ingénieur géotechnique', 'Ingénieur hydraulique', 'Ingénieur environnement', 'Consultant en construction', 'Expert immobilier',
  'Développeur web', 'Développeur Front-End', 'Développeur Back-End', 'Développeur Full Stack', 'Développeur Mobile', 'Développeur Android', 'Développeur iOS', 'Développeur Logiciel', 'Développeur Jeux vidéo', 'Ingénieur logiciel', 'Architecte logiciel', 'Architecte cloud', 'Administrateur système', 'Administrateur réseau', 'Administrateur bases de données', 'DevOps Engineer', 'Site Reliability Engineer', 'Ingénieur cloud', 'Data Scientist', 'Data Analyst', 'Data Engineer', 'Machine Learning Engineer', 'Ingénieur IA', 'Prompt Engineer', 'Chercheur en intelligence artificielle', 'Analyste cybersécurité', 'Pentester', 'Hacker éthique', 'Consultant cybersécurité', 'RSSI', 'Analyste SOC', 'Expert blockchain', 'Développeur blockchain', 'Administrateur Linux', 'Administrateur Windows', 'Testeur logiciel', 'QA Engineer', 'Product Manager', 'Product Owner', 'Scrum Master', 'Chef de projet informatique', 'Consultant ERP', 'Consultant SAP', 'Consultant CRM',
  'UX Designer', 'UI Designer', 'Web Designer', 'Graphiste', 'Motion Designer', 'Animateur 2D', 'Animateur 3D', 'Monteur vidéo', 'Réalisateur', 'Directeur artistique', 'Photographe', 'Vidéaste',
  'Community Manager', 'Social Media Manager', 'Responsable marketing', 'Directeur marketing', 'Responsable communication', 'Directeur communication', 'Chargé de communication', 'Consultant SEO', 'Consultant SEA', 'Consultant SEM', 'Copywriter', 'Rédacteur web', 'Journaliste', 'Reporter', 'Présentateur TV', 'Présentateur radio', 'Attaché de presse', 'Responsable événementiel', 'Organisateur d\'événements', 'Brand Manager', 'Responsable e-commerce', 'Growth Hacker', 'Spécialiste email marketing', 'Responsable acquisition', 'Responsable CRM', 'Analyste marketing', 'Chef de produit',
  'Commercial', 'Ingénieur commercial', 'Directeur commercial', 'Responsable des ventes', 'Account Manager', 'Business Developer', 'Responsable grands comptes', 'Conseiller clientèle', 'Téléconseiller', 'Négociateur immobilier', 'Agent immobilier', 'Courtier immobilier',
  'Gestionnaire de patrimoine', 'Conseiller financier', 'Analyste financier', 'Contrôleur de gestion', 'Comptable', 'Expert-comptable', 'Auditeur', 'Commissaire aux comptes', 'Trésorier', 'Directeur financier', 'Gestionnaire de paie', 'Responsable paie', 'Fiscaliste d\'entreprise', 'Analyste crédit', 'Banquier', 'Conseiller bancaire', 'Gestionnaire de portefeuille', 'Trader', 'Courtier en bourse', 'Gestionnaire d\'actifs', 'Actuaire', 'Économiste', 'Statisticien', 'Analyste économique',
  'Responsable RH', 'Directeur des ressources humaines', 'Chargé de recrutement', 'Talent Acquisition Specialist', 'Responsable formation', 'Coach professionnel', 'Consultant RH', 'Gestionnaire RH', 'Responsable paie RH', 'Psychologue du travail', 'Responsable QVT', 'Responsable diversité',
  'Enseignant', 'Professeur des écoles', 'Professeur de collège', 'Professeur de lycée', 'Professeur d\'université', 'Maître de conférences', 'Formateur', 'Chercheur', 'Scientifique', 'Physicien', 'Chimiste', 'Mathématicien', 'Astronome', 'Géologue', 'Océanographe', 'Climatologue', 'Archéologue', 'Historien', 'Sociologue', 'Anthropologue', 'Linguiste', 'Traducteur', 'Interprète', 'Bibliothécaire', 'Documentaliste', 'Conservateur de musée', 'Archiviste',
  'Ingénieur mécanique', 'Ingénieur électrique', 'Ingénieur électronique', 'Ingénieur industriel', 'Ingénieur automobile', 'Ingénieur aéronautique', 'Ingénieur spatial', 'Ingénieur robotique', 'Ingénieur matériaux', 'Ingénieur énergie', 'Ingénieur nucléaire', 'Ingénieur pétrolier', 'Ingénieur minier', 'Ingénieur chimiste', 'Ingénieur qualité', 'Ingénieur production', 'Responsable maintenance', 'Responsable logistique', 'Supply Chain Manager', 'Logisticien', 'Acheteur', 'Responsable achats', 'Planificateur de production', 'Analyste supply chain',
  'Responsable transport', 'Responsable entrepôt', 'Responsable exploitation', 'Directeur des opérations', 'Pilote de ligne', 'Pilote d\'hélicoptère', 'Contrôleur aérien', 'Hôtesse de l\'air', 'Steward', 'Capitaine de navire', 'Officier de marine marchande', 'Logisticien maritime', 'Douanier', 'Agent de transit', 'Agent portuaire', 'Conducteur de train', 'Régulateur ferroviaire',
  'Officier de police', 'Gendarme', 'Militaire', 'Officier militaire', 'Pompier', 'Sapeur-pompier', 'Garde du corps', 'Agent de sécurité', 'Responsable sécurité', 'Agent pénitentiaire', 'Garde forestier', 'Garde-côte',
  'Diplomate', 'Ambassadeur', 'Consul', 'Fonctionnaire', 'Administrateur territorial', 'Préfet', 'Sous-préfet', 'Inspecteur des impôts', 'Contrôleur fiscal', 'Inspecteur du travail', 'Inspecteur des douanes', 'Inspecteur de police', 'Conseiller municipal', 'Directeur général des services',
  'Consultant en management', 'Consultant en stratégie', 'Consultant en transformation digitale', 'Consultant qualité', 'Consultant environnement', 'Consultant ISO', 'Consultant Lean', 'Consultant Six Sigma', 'Coach agile', 'Chef de projet', 'PMO', 'Directeur de programme', 'Directeur de projet',
  'Entrepreneur', 'Chef d\'entreprise', 'Fondateur de startup', 'Investisseur', 'Business Angel', 'Capital-risqueur', 'Franchiseur', 'Franchisé', 'Expert en innovation',
  'Responsable RSE', 'Responsable développement durable', 'Responsable qualité', 'Responsable HSE', 'Auditeur qualité', 'Analyste risques', 'Risk Manager',
  'Responsable assurance', 'Courtier en assurances', 'Conseiller en assurances', 'Gestionnaire de sinistres', 'Actuaire assurance',
  'Agent de voyage', 'Conseiller en voyages', 'Guide touristique', 'Directeur d\'hôtel', 'Réceptionniste', 'Concierge d\'hôtel', 'Revenue Manager', 'Responsable restauration', 'Chef cuisinier', 'Sommelier', 'Responsable hébergement', 'Responsable tourisme', 'Organisateur de séjours', 'Directeur de centre de loisirs',
  'Éducateur spécialisé', 'Assistant social', 'Conseiller d\'orientation', 'Conseiller en insertion professionnelle', 'Médiateur social', 'Animateur socioculturel', 'Responsable ONG', 'Humanitaire', 'Coordinateur de projet humanitaire', 'Chargé de mission', 'Responsable de programme', 'Expert en développement international', 'Consultant en coopération internationale',
  'Analyste politique', 'Conseiller politique', 'Analyste géopolitique',
  'Écrivain', 'Romancier', 'Scénariste', 'Dramaturge', 'Critique d\'art', 'Critique de cinéma', 'Critique littéraire', 'Compositeur', 'Chef d\'orchestre', 'Producteur musical', 'Producteur audiovisuel', 'Directeur de casting', 'Agent artistique', 'Influence Manager', 'Créateur de contenu', 'Podcasteur', 'Conférencier',
  'Coach de vie', 'Mentor professionnel',
  'Expert en intelligence économique', 'Analyste veille stratégique',
  'Responsable innovation', 'Responsable transformation',
  'Directeur général', 'Directeur exécutif', 'Président-directeur général', 'Secrétaire général',
  'Assistant de direction', 'Office Manager', 'Responsable administratif', 'Directeur administratif et financier', 'Contrôleur interne', 'Responsable audit interne', 'Responsable gouvernance', 'Expert en marchés publics', 'Consultant en appels d\'offres',
  'Analyste ESG', 'Responsable relations investisseurs',
  'Conseiller en propriété intellectuelle', 'Mandataire en brevets',
  'Expert en cybersurveillance', 'Analyste fraude', 'Responsable antifraude',
  'Consultant FinTech', 'Consultant LegalTech', 'Consultant HealthTech', 'Consultant EdTech', 'Consultant GreenTech', 'Consultant GovTech', 'Consultant MarTech', 'Consultant PropTech', 'Consultant InsurTech', 'Consultant AgriTech',
  'Consultant en intelligence d\'affaires', 'Analyste BI', 'Développeur Power BI', 'Développeur Tableau', 'Développeur Qlik',
  'Administrateur Salesforce', 'Développeur Salesforce', 'Consultant Salesforce', 'Administrateur Microsoft 365', 'Administrateur Google Workspace', 'Consultant Microsoft Dynamics', 'Développeur Dynamics 365', 'Consultant Oracle', 'Administrateur Oracle', 'Développeur Oracle', 'Consultant Odoo', 'Développeur Odoo', 'Administrateur Odoo', 'Consultant Zoho', 'Développeur Zoho', 'Consultant HubSpot', 'Administrateur HubSpot', 'Consultant ServiceNow', 'Développeur ServiceNow', 'Consultant Workday', 'Consultant SuccessFactors', 'Consultant Sage', 'Consultant Cegid', 'Consultant EBP',
  'Architecte d\'entreprise', 'Urbaniste des systèmes d\'information', 'Analyste fonctionnel', 'Analyste métier', 'Business Analyst', 'Analyste PMO', 'Coordinateur de projet', 'Responsable portefeuille projets',
  'Consultant en gouvernance IT', 'Responsable transformation numérique', 'Consultant Open Data', 'Data Steward', 'Data Governance Manager', 'Data Protection Officer', 'Responsable confidentialité', 'Responsable sécurité informatique', 'Responsable infrastructure IT', 'Responsable support informatique', 'Technicien support informatique', 'Helpdesk', 'Technicien réseaux', 'Technicien télécom', 'Ingénieur télécommunications', 'Architecte télécom',
  'Consultant IoT', 'Développeur IoT', 'Ingénieur IoT', 'Développeur embarqué', 'Ingénieur systèmes embarqués', 'Ingénieur FPGA', 'Ingénieur microélectronique', 'Ingénieur semi-conducteurs',
  'Ingénieur vision industrielle', 'Ingénieur automatisme', 'Automaticien', 'Roboticien', 'Programmeur PLC', 'Programmeur SCADA', 'Ingénieur instrumentation', 'Ingénieur contrôle-commande',
  'Responsable méthodes', 'Ingénieur procédés', 'Responsable industrialisation', 'Technicien méthodes', 'Responsable amélioration continue', 'Black Belt Lean Six Sigma', 'Green Belt Lean Six Sigma', 'Responsable excellence opérationnelle', 'Responsable planification', 'Ordonnanceur', 'Prévisionniste de la demande',
  'Responsable approvisionnement', 'Gestionnaire de stocks', 'Responsable inventaire', 'Coordinateur logistique', 'Responsable export', 'Responsable import', 'Déclarant en douane', 'Affréteur', 'Responsable flotte', 'Fleet Manager', 'Gestionnaire de parc automobile',
  'Responsable aviation', 'Ingénieur ferroviaire', 'Ingénieur naval', 'Architecte naval', 'Officier mécanicien', 'Expert maritime', 'Responsable portuaire', 'Responsable aéroportuaire', 'Analyste transport', 'Économiste des transports', 'Conseiller en mobilité', 'Expert mobilité urbaine', 'Urbaniste transport',
  'Responsable énergie', 'Energy Manager', 'Auditeur énergétique', 'Conseiller en efficacité énergétique', 'Ingénieur solaire', 'Ingénieur éolien', 'Ingénieur biomasse', 'Ingénieur hydrogène', 'Consultant carbone', 'Auditeur carbone', 'Responsable climat', 'Responsable biodiversité', 'Écologue', 'Hydrologue', 'Ingénieur forestier',
  'Ingénieur agronome', 'Agronome', 'Zootechnicien', 'Ingénieur agroalimentaire', 'Responsable qualité alimentaire', 'Responsable sécurité alimentaire',
  'Microbiologiste', 'Toxicologue', 'Généticien', 'Bioinformaticien', 'Biostatisticien', 'Chercheur en biotechnologie', 'Ingénieur biomédical', 'Physicien médical',
  'Attaché de recherche clinique', 'Coordinateur d\'essais cliniques', 'Responsable pharmacovigilance', 'Affaires réglementaires', 'Responsable affaires médicales', 'Medical Science Liaison', 'Pharmacologue', 'Virologue', 'Immunologiste', 'Parasitologue', 'Entomologiste', 'Botaniste', 'Zoologiste', 'Paléontologue',
  'Géophysicien', 'Sismologue', 'Volcanologue', 'Cartographe', 'Spécialiste SIG', 'Analyste géospatial', 'Télédétection', 'Météorologue', 'Prévisionniste météo', 'Océanologue', 'Hydrogéologue', 'Expert catastrophe naturelle',
  'Conseiller diplomatique', 'Analyste défense', 'Analyste renseignement', 'Officier de renseignement', 'Expert cybersouveraineté', 'Conseiller en sécurité nationale', 'Responsable protection civile', 'Coordinateur gestion de crise',
  'Négociateur international', 'Responsable affaires publiques', 'Lobbyiste', 'Chargé des relations institutionnelles', 'Conseiller parlementaire', 'Administrateur parlementaire', 'Secrétaire de mairie', 'Directeur de cabinet', 'Conseiller ministériel',
  'Responsable marchés publics', 'Gestionnaire des subventions', 'Responsable coopération internationale', 'Consultant ONU', 'Expert Banque mondiale', 'Expert Union africaine', 'Expert Union européenne', 'Consultant développement économique', 'Consultant microfinance',
  'Responsable incubateur', 'Conseiller en entrepreneuriat', 'Consultant innovation sociale',
  'Analyste investissement', 'Gestionnaire de fonds', 'Analyste M&A', 'Responsable fusions-acquisitions', 'Évaluateur d\'entreprises', 'Conseiller en transmission d\'entreprise', 'Responsable capital-investissement', 'Gestionnaire de fortune', 'Family Office Manager',
  'Responsable conformité bancaire', 'Analyste AML', 'Analyste KYC', 'Responsable lutte contre le blanchiment', 'Responsable contrôle permanent', 'Responsable recouvrement', 'Gestionnaire contentieux',
  'Responsable service client', 'Customer Success Manager', 'Customer Experience Manager', 'Responsable fidélisation', 'Responsable relation partenaires', 'Gestionnaire de communauté professionnelle',
  'Responsable développement international', 'Responsable franchise', 'Responsable réseau', 'Directeur régional', 'Directeur de filiale', 'Directeur pays',
  'Directeur innovation', 'Chief Technology Officer (CTO)', 'Chief Information Officer (CIO)', 'Chief Information Security Officer (CISO)', 'Chief Marketing Officer (CMO)', 'Chief Financial Officer (CFO)', 'Chief Operating Officer (COO)', 'Chief Human Resources Officer (CHRO)', 'Chief Data Officer (CDO)', 'Chief Digital Officer (CDO)', 'Chief Product Officer (CPO)', 'Chief Revenue Officer (CRO)', 'Chief Compliance Officer (CCO)', 'Chief Sustainability Officer (CSO)', 'Chief Legal Officer (CLO)',
  'Secrétaire de direction', 'Assistant exécutif', 'Coordinateur administratif', 'Responsable des services généraux', 'Gestionnaire immobilier d\'entreprise', 'Facility Manager', 'Office Coordinator', 'Responsable archives', 'Gestionnaire documentaire', 'Responsable knowledge management'
]

export default function ProDashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState('dashboard')
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [stats, setStats] = useState({
    rating: 0,
    totalReviews: 0
  })

  const [isAvailable, setIsAvailable] = useState(true)

  const [profileData, setProfileData] = useState({
    full_name: '',
    specialty: '',
    city: '',
    phone: '',
    bio: '',
    experience_years: 0
  })

  const [portfolio, setPortfolio] = useState<any[]>([])
  const [portfolioTitle, setPortfolioTitle] = useState('')
  const [portfolioDesc, setPortfolioDesc] = useState('')
  const [portfolioImage, setPortfolioImage] = useState<string | null>(null)

  const [services, setServices] = useState<any[]>([])
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceDesc, setServiceDesc] = useState('')
  const [servicePrice, setServicePrice] = useState('')
  const [serviceCategory, setServiceCategory] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)

  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      loadStats()
      loadPortfolio()
      loadServices()
      loadReviews()
    }
  }, [profile])

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { 
        router.push('/login')
        return 
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error || !profileData) { 
        console.error('Erreur chargement profil:', error)
        router.push('/login')
        return 
      }

      setProfile(profileData)
      setIsAvailable(profileData.is_available !== false)
      setProfileData({
        full_name: profileData.full_name || '',
        specialty: profileData.specialty || '',
        city: profileData.city || '',
        phone: profileData.phone || '',
        bio: profileData.bio || '',
        experience_years: profileData.experience_years || 0
      })
    } catch (error) {
      console.error('Erreur loadProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    if (!profile) return
    try {
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewee_id', profile.id)
      
      const avgRating = reviewsData && reviewsData.length > 0
        ? reviewsData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewsData.length
        : 0

      setStats({
        rating: avgRating,
        totalReviews: reviewsData?.length || 0
      })
    } catch (error) {
      console.error('Erreur stats:', error)
    }
  }

  const loadPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('professional_portfolio')
        .select('*')
        .eq('professional_id', profile.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        setPortfolio([])
        return
      }
      if (data) setPortfolio(data)
    } catch (error) { 
      setPortfolio([])
    }
  }

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('pro_id', profile.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        setServices([])
        return
      }
      if (data) setServices(data)
    } catch (error) { 
      setServices([])
    }
  }

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles:client_id(full_name, avatar_url)')
        .eq('reviewee_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      
      if (data) {
        const formattedReviews = data.map(review => ({
          ...review,
          reviewer_name: review.profiles?.full_name || 'Client',
          reviewer_avatar: review.profiles?.avatar_url || null
        }))
        setReviews(formattedReviews)
      }
    } catch (error) { 
      console.error('Erreur reviews:', error)
    }
  }

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = e.target.files?.[0]
      if (!file || !profile) {
        alert('Aucun fichier sélectionné')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La photo doit faire moins de 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide')
        return
      }

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })
      
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)
      
      if (updateError) throw updateError
      
      setProfile({ ...profile, avatar_url: publicUrl })
      alert('✅ Photo de profil mise à jour')
    } catch (error) { 
      console.error('Erreur upload photo:', error)
      alert('❌ Erreur upload photo de profil') 
    } finally { 
      setUploading(false) 
    }
  }

  const handlePortfolioImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}/${Date.now()}.${fileExt}`
      
      const { error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file)
      
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName)
      
      setPortfolioImage(publicUrl)
    } catch (error) { 
      console.error('Erreur upload portfolio:', error)
      alert('❌ Erreur upload image') 
    } finally { 
      setUploading(false) 
    }
  }

  const handlePortfolioUpload = async () => {
    if (!portfolioTitle || !portfolioImage || !profile) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    try {
      setUploading(true)
      const { error } = await supabase
        .from('professional_portfolio')
        .insert({
          professional_id: profile.id,
          title: portfolioTitle,
          description: portfolioDesc,
          image_url: portfolioImage
        })
      
      if (error) throw error
      
      setPortfolioTitle('')
      setPortfolioDesc('')
      setPortfolioImage(null)
      await loadPortfolio()
      alert('✅ Réalisation ajoutée avec succès')
    } catch (error) { 
      console.error('Erreur ajout portfolio:', error)
      alert('❌ Erreur lors de l\'ajout') 
    } finally { 
      setUploading(false) 
    }
  }

  const handleServicePublish = async () => {
    if (!serviceTitle || !serviceDesc || !servicePrice || !serviceCategory || !profile) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    try {
      setUploading(true)
      const { data, error } = await supabase
        .from('services')
        .insert({
          pro_id: profile.id,
          title: serviceTitle,
          description: serviceDesc,
          price: servicePrice,
          category: serviceCategory,
          city: profile.city || 'Lomé',
          is_active: true
        })
        .select()
      
      if (error) throw error
      
      setServiceTitle('')
      setServiceDesc('')
      setServicePrice('')
      setServiceCategory('')
      await loadServices()
      alert('✅ Service publié avec succès ! Il est maintenant visible sur la marketplace.')
    } catch (error) { 
      console.error('Erreur publication service:', error)
      alert(`❌ Erreur: ${error.message}`)
    } finally { 
      setUploading(false) 
    }
  }

  const handleServiceUpdate = async () => {
    if (!serviceTitle || !serviceDesc || !servicePrice || !serviceCategory || !profile || !editingServiceId) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    try {
      setUploading(true)
      const { error } = await supabase
        .from('services')
        .update({
          title: serviceTitle,
          description: serviceDesc,
          price: servicePrice,
          category: serviceCategory,
          city: profile.city || 'Lomé',
          updated_at: new Date().toISOString()
        })
        .eq('id', editingServiceId)
      
      if (error) throw error
      
      setIsEditing(false)
      setEditingServiceId(null)
      setServiceTitle('')
      setServiceDesc('')
      setServicePrice('')
      setServiceCategory('')
      await loadServices()
      alert('✅ Service mis à jour avec succès !')
    } catch (error) { 
      console.error('Erreur mise à jour service:', error)
      alert(`❌ Erreur lors de la mise à jour: ${error.message}`)
    } finally { 
      setUploading(false) 
    }
  }

  const deletePortfolioItem = async (id: string) => {
    if (!confirm('Supprimer cette réalisation ?')) return
    
    try {
      const { error } = await supabase
        .from('professional_portfolio')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      await loadPortfolio()
      alert('✅ Réalisation supprimée')
    } catch (error) { 
      console.error('Erreur suppression:', error)
      alert('❌ Erreur lors de la suppression') 
    }
  }

  const saveProfile = async () => {
    if (!profile) return
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', profile.id)
      
      if (error) throw error
      
      setProfile({ ...profile, ...profileData })
      alert('✅ Profil sauvegardé avec succès')
    } catch (error) { 
      console.error('Erreur sauvegarde profil:', error)
      alert('❌ Erreur lors de la sauvegarde') 
    }
  }

  const toggleAvailability = async () => {
    if (!profile) return
    
    const newStatus = !isAvailable
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_available: newStatus })
        .eq('id', profile.id)
      
      if (error) throw error
      
      setIsAvailable(newStatus)
      alert(newStatus ? '✅ Vous êtes maintenant disponible' : '⏸️ Mode indisponible activé')
    } catch (error) { 
      console.error('Erreur toggle availability:', error)
      alert('❌ Erreur lors du changement de statut') 
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const bg = darkMode ? 'bg-slate-950' : 'bg-slate-50'
  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
  const textPrimary = darkMode ? 'text-white' : 'text-slate-900'
  const textSecondary = darkMode ? 'text-slate-400' : 'text-slate-600'
  const inputBg = darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className={`text-lg ${textSecondary}`}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* HEADER */}
      <header className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard/pro" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <div>
              <span className="font-bold text-lg text-indigo-600">JOBCONNECT</span>
              <span className={`text-xs ${textSecondary} block`}>Espace Pro</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'} hover:scale-105 transition-all`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} lg:hidden`}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-t lg:hidden`}>
            <nav className="p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: Home },
                { id: 'services', label: 'Mon Service', icon: Briefcase },
                { id: 'profile', label: 'Mon Profil', icon: Settings },
                { id: 'portfolio', label: 'Réalisations', icon: ImageIcon },
                { id: 'reviews', label: 'Avis clients', icon: Star },
                { id: 'verification', label: 'Vérification', icon: Shield },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveView(item.id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeView === item.id
                      ? 'bg-indigo-600 text-white'
                      : darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <Link href="/pricing" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}>
                <Crown className="w-5 h-5" />
                <span className="font-medium">Forfaits</span>
              </Link>
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-600 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="space-y-2 sticky top-24">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: Home },
              { id: 'services', label: 'Mon Service', icon: Briefcase },
              { id: 'profile', label: 'Mon Profil', icon: Settings },
              { id: 'portfolio', label: 'Réalisations', icon: ImageIcon },
              { id: 'reviews', label: 'Avis clients', icon: Star },
              { id: 'verification', label: 'Vérification', icon: Shield },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeView === item.id
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                    : `${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <Link href="/pricing" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${textSecondary} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                <Crown className="w-5 h-5" />
                Forfaits
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2">
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Bonjour, {profile?.full_name || 'Pro'} 👋</h1>
                    <p className="text-indigo-100 text-lg">Boostez votre visibilité et développez votre activité</p>
                  </div>
                  <button
                    onClick={toggleAvailability}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg ${
                      isAvailable 
                        ? 'bg-emerald-500 hover:bg-emerald-600' 
                        : 'bg-slate-500 hover:bg-slate-600'
                    }`}
                  >
                    {isAvailable ? <CheckCircle2 className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    {isAvailable ? 'Disponible' : 'Indisponible'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Note moyenne', value: `${stats.rating.toFixed(1)}/5`, icon: Star, color: 'from-yellow-500 to-amber-600' },
                  { label: 'Total des avis', value: stats.totalReviews, icon: MessageCircle, color: 'from-blue-500 to-indigo-600' },
                ].map((stat, i) => (
                  <div key={i} className={`${cardBg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm font-medium ${textSecondary} mb-1`}>{stat.label}</p>
                    <p className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className={`text-lg font-semibold ${textPrimary}`}>Actions rapides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => setActiveView('services')} className={`${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>{services.length > 0 ? 'Modifier mon service' : 'Publier mon service'}</p>
                      <p className={`text-xs ${textSecondary}`}>{services.length > 0 ? 'Mettre à jour les informations' : 'Apparaître sur la marketplace'}</p>
                    </div>
                  </button>
                  <button onClick={() => setActiveView('portfolio')} className={`${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>Portfolio</p>
                      <p className={`text-xs ${textSecondary}`}>Montrer votre travail</p>
                    </div>
                  </button>
                  <Link href={`/pro/${profile?.id}`} className={`${cardBg} border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}>
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${textPrimary}`}>Profil public</p>
                      <p className={`text-xs ${textSecondary}`}>Voir ce que voient les clients</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeView === 'services' && (
            <div className="space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Service</h1>
                <p className={`text-sm ${textSecondary}`}>
                  {services.length > 0 
                    ? "Vous avez déjà publié votre service unique. Vous pouvez le modifier ci-dessous pour mettre à jour vos informations."
                    : "Publiez votre premier et unique service pour être visible sur la marketplace des clients."}
                </p>
              </div>

              {services.length === 0 ? (
                <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                  <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
                    <Plus className="w-5 h-5 text-indigo-500" />
                    Publier mon service
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Titre du service *</label>
                      <input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder="Ex: Installation électrique complète" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Description détaillée *</label>
                      <textarea value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} placeholder="Décrivez votre service..." rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Prix (FCFA) *</label>
                        <input type="text" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="Ex: 50000" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Catégorie *</label>
                        <input 
                          list="categories-metiers"
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                          placeholder="Tapez ou sélectionnez une catégorie..."
                          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`}
                        />
                        <datalist id="categories-metiers">
                          {[...new Set(categoriesMetiers)].map((cat) => (
                            <option key={cat} value={cat} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <button onClick={handleServicePublish} disabled={uploading || !serviceTitle || !serviceDesc || !servicePrice || !serviceCategory} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5" />}
                      Publier le service
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {!isEditing ? (
                    <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Briefcase className="w-6 h-6 text-indigo-500" />
                            <h3 className={`text-2xl font-bold ${textPrimary}`}>{services[0].title}</h3>
                          </div>
                          <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold capitalize">
                            {services[0].category}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-3xl font-black text-emerald-600`}>{services[0].price} <span className="text-lg font-medium text-slate-500">FCFA</span></span>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-6`}>
                        <p className={`${textSecondary} whitespace-pre-wrap leading-relaxed`}>{services[0].description}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            setIsEditing(true)
                            setServiceTitle(services[0].title)
                            setServiceDesc(services[0].description)
                            setServicePrice(services[0].price)
                            setServiceCategory(services[0].category)
                            setEditingServiceId(services[0].id)
                          }}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Edit3 className="w-5 h-5" /> Modifier le service
                        </button>
                        <span className="px-4 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Service actif et visible
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                      <h2 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
                        <Settings className="w-5 h-5 text-indigo-500" />
                        Modifier mon service
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Titre du service *</label>
                          <input type="text" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Description détaillée *</label>
                          <textarea value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Prix (FCFA) *</label>
                            <input type="text" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Catégorie *</label>
                            <input 
                              list="categories-metiers"
                              value={serviceCategory}
                              onChange={(e) => setServiceCategory(e.target.value)}
                              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`}
                            />
                            <datalist id="categories-metiers">
                              {[...new Set(categoriesMetiers)].map((cat) => (
                                <option key={cat} value={cat} />
                              ))}
                            </datalist>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={handleServiceUpdate} disabled={uploading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Enregistrer les modifications
                          </button>
                          <button onClick={() => {
                            setIsEditing(false)
                            setEditingServiceId(null)
                            setServiceTitle('')
                            setServiceDesc('')
                            setServicePrice('')
                            setServiceCategory('')
                          }} className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all">
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeView === 'profile' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mon Profil</h1>
                <p className={`text-sm ${textSecondary}`}>Gérez vos informations publiques</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Photo de profil</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-200 shadow-lg border-4 border-indigo-100 dark:border-indigo-900 flex-shrink-0">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                        {profile?.full_name?.charAt(0).toUpperCase() || 'P'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className={`text-sm ${textSecondary}`}>
                      💡 <strong>Conseil format :</strong> Pour un rendu professionnel optimal, utilisez une photo <strong>carrée (1:1)</strong> ou en portrait, bien éclairée, où votre visage est clairement visible au centre. Formats acceptés : JPG, PNG (Max 5MB).
                    </p>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer transition-all font-semibold shadow-md hover:shadow-lg">
                      <Upload className="w-5 h-5" />
                      Changer la photo
                      <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" disabled={uploading} />
                    </label>
                    {uploading && (
                      <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Upload en cours...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Informations publiques</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Nom complet', key: 'full_name', type: 'text' },
                    { label: 'Spécialité', key: 'specialty', type: 'text' },
                    { label: 'Ville', key: 'city', type: 'text' },
                    { label: 'Téléphone (WhatsApp)', key: 'phone', type: 'tel' },
                    { label: 'Années d\'expérience', key: 'experience_years', type: 'number' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className={`block text-sm font-medium ${textSecondary} mb-2`}>{field.label}</label>
                      <input type={field.type} value={profileData[field.key as keyof typeof profileData]} onChange={(e) => setProfileData({...profileData, [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value})} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                    </div>
                  ))}
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Bio / Description</label>
                    <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={4} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  </div>
                  <button onClick={saveProfile} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeView === 'portfolio' && (
            <div className="space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Mes Réalisations</h1>
                <p className={`text-sm ${textSecondary}`}>Montrez vos meilleurs travaux</p>
              </div>

              <div className={`${cardBg} border rounded-2xl p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${textPrimary} mb-6`}>Ajouter une réalisation</h2>
                <div className="space-y-4">
                  <input type="text" value={portfolioTitle} onChange={(e) => setPortfolioTitle(e.target.value)} placeholder="Titre du projet" className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  <textarea value={portfolioDesc} onChange={(e) => setPortfolioDesc(e.target.value)} placeholder="Description" rows={3} className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBg}`} />
                  <div>
                    <label className={`block text-sm font-medium ${textSecondary} mb-2`}>Photo</label>
                    {portfolioImage ? (
                      <div className="relative inline-block">
                        <img src={portfolioImage} alt="Portfolio" className="h-40 rounded-xl object-cover shadow-lg" />
                        <button onClick={() => setPortfolioImage(null)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className={`flex items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer ${darkMode ? 'border-slate-700 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-500'} transition-all`}>
                        <div className="text-center">
                          <Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                          <p className={`text-sm ${textSecondary}`}>Cliquez pour uploader</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                  <button onClick={handlePortfolioUpload} disabled={uploading || !portfolioImage || !portfolioTitle} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {uploading ? 'Upload...' : 'Ajouter'}
                  </button>
                </div>
              </div>

              {portfolio.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {portfolio.map(item => (
                    <div key={item.id} className={`${cardBg} border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                      <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className={`font-bold ${textPrimary} mb-2`}>{item.title}</h3>
                        <p className={`text-sm ${textSecondary} mb-3`}>{item.description}</p>
                        <button onClick={() => deletePortfolioItem(item.id)} className="text-red-600 text-sm flex items-center gap-1 hover:underline font-semibold">
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'reviews' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Avis Clients</h1>
                  <p className={`text-sm ${textSecondary}`}>Ce que disent vos clients</p>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-600 px-6 py-3 rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                  <span className="text-2xl font-bold text-white">{stats.rating.toFixed(1)}</span>
                  <span className="text-white/90 font-semibold">({stats.totalReviews} avis)</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className={`${cardBg} border rounded-2xl p-16 text-center shadow-sm`}>
                  <Star className="w-20 h-20 text-slate-300 mx-auto mb-4" />
                  <p className={`text-lg ${textSecondary}`}>Aucun avis pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className={`${cardBg} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
                          {review.reviewer_avatar ? (
                            <img src={review.reviewer_avatar} alt={review.reviewer_name} className="w-full h-full object-cover" />
                          ) : (
                            review.reviewer_name.charAt(0).toUpperCase()
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className={`font-bold ${textPrimary} text-lg`}>
                                {review.reviewer_name}
                              </h3>
                              <p className={`text-xs ${textSecondary}`}>
                                {new Date(review.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className={`${textSecondary} leading-relaxed`}>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ NOUVELLE INTERFACE DE VÉRIFICATION (Bientôt disponible) */}
          {activeView === 'verification' && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Vérification d'identité</h1>
                <p className={`text-sm ${textSecondary}`}>Obtenez le badge "Pro Vérifié" pour gagner la confiance des clients.</p>
              </div>

              <div className={`${cardBg} border rounded-3xl p-8 md:p-12 shadow-sm text-center`}>
                {/* Icône animée */}
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                  <Rocket className="w-12 h-12 text-white" />
                </div>
                
                <h3 className={`text-3xl font-bold ${textPrimary} mb-3`}>
                  Bientôt disponible 🚀
                </h3>
                
                <p className={`${textSecondary} max-w-md mx-auto mb-8 text-lg`}>
                  Nous travaillons actuellement sur cette fonctionnalité pour vous offrir une expérience de vérification simple, rapide et sécurisée.
                </p>

                {/* Badge "En développement" */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold border border-amber-200 dark:border-amber-800 mb-8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                  </span>
                  En cours de développement
                </div>

                {/* Timeline visuelle */}
                <div className={`max-w-lg mx-auto ${darkMode ? 'bg-slate-800/50' : 'bg-slate-50'} rounded-2xl p-6 border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  <h4 className={`font-bold ${textPrimary} mb-4`}>Ce qui arrive bientôt :</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm ${textSecondary}`}>Paiement sécurisé via PayDunya (T-Money, Flooz, Carte)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm ${textSecondary}`}>Upload de documents (CNI, Diplôme)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm ${textSecondary}`}>Validation par notre équipe sous 24-48h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className={`text-sm ${textSecondary}`}>Badge bleu "Vérifié" sur votre profil</span>
                    </div>
                  </div>
                </div>

                {/* Prix indicatif */}
                <p className={`mt-8 text-sm ${textSecondary}`}>
                   Tarif prévu : <strong className="text-indigo-600 dark:text-indigo-400">5 000 FCFA / an</strong>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}