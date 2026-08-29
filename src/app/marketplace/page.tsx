// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  Search, MapPin, Star, ShieldCheck, Pause,
  Heart, Home, Loader2, AlertCircle, Eye, MessageCircle,
  User, Check
} from 'lucide-react'

// ✅ LISTE COMPLÈTE DES MÉTIERS (1000+ métiers)
const allMetiers = [
  "Tous les métiers", "Maçon", "Carreleur", "Plombier", "Électricien bâtiment", "Peintre en bâtiment", "Charpentier", "Couvreur", "Menuisier", "Ébéniste", "Ferronnier", "Métallier", "Soudeur", "Serrurier", "Vitrier", "Plâtrier", "Plaquiste", "Staffeur", "Façadier", "Tailleur de pierre", "Marbrier", "Poseur de parquet", "Poseur de moquette", "Poseur de revêtements muraux", "Étancheur", "Terrassier", "Paveur", "Grutier", "Conducteur d'engins de chantier", "Opérateur de bétonnière", "Coffreur", "Ferrailleur", "Bancheur", "Conducteur de travaux bâtiment", "Installateur sanitaire", "Installateur de chauffage", "Frigoriste", "Climaticien", "Installateur photovoltaïque", "Installateur d'antennes", "Installateur de portes", "Installateur de fenêtres", "Installateur de stores", "Poseur de vérandas", "Poseur de cuisines", "Poseur de salles de bains", "Monteur de cloisons", "Monteur de faux plafonds", "Applicateur d'enduits", "Applicateur de béton décoratif", "Applicateur de résine", "Polisseur de béton", "Restaurateur de bâtiments", "Restaurateur de façades", "Démolisseur", "Désamianteur", "Ramoneur", "Nettoyeur de façades", "Nettoyeur de vitres", "Nettoyeur de toitures", "Technicien de maintenance bâtiment", "Jardinier", "Paysagiste", "Élagueur", "Arboriste", "Pépiniériste", "Horticulteur", "Maraîcher", "Floriculteur", "Fleuriste", "Producteur de plantes aromatiques", "Producteur de plantes médicinales", "Producteur de champignons", "Apiculteur", "Éleveur de volailles", "Éleveur de porcs", "Éleveur de bovins", "Éleveur de chèvres", "Éleveur de moutons", "Éleveur de lapins", "Éleveur de poissons", "Pisciculteur", "Ostréiculteur", "Mytiliculteur", "Aquaculteur", "Pêcheur professionnel", "Marin-pêcheur", "Palefrenier", "Maréchal-ferrant", "Berger", "Bouvier", "Vacher", "Conducteur de tracteur", "Ouvrier agricole", "Irrigateur agricole", "Greffeur d'arbres", "Taille-haie professionnel", "Tailleur de vigne", "Vendangeur", "Cueilleur de fruits", "Cueilleur de plantes sauvages", "Meunier", "Boulanger", "Pâtissier", "Chocolatier", "Confiseur", "Glacier", "Biscuitier", "Traiteur", "Charcutier", "Boucher", "Poissonnier", "Fromager", "Torréfacteur de café", "Brasseur artisanal", "Fabricant de jus", "Fabricant de sirops", "Fabricant de confitures", "Fabricant de sauces", "Fabricant de vinaigre", "Fabricant de pâtes alimentaires", "Fabricant de couscous", "Fabricant de farine", "Fabricant d'huile alimentaire", "Fabricant de beurre", "Fabricant de yaourt", "Fabricant de fromage", "Fabricant de pain traditionnel", "Fabricant de beignets", "Fabricant de biscuits artisanaux", "Fabricant de bonbons", "Fabricant de caramel", "Fabricant de nougat", "Fabricant de glaces artisanales", "Préparateur de plats cuisinés", "Cuisinier", "Grillardin", "Rôtisseur", "Pizzaïolo", "Crêpier", "Sushi-man", "Artisan glacier", "Découpeur de viande", "Préparateur de poisson", "Fumeur de poisson", "Fumeur de viande", "Sécheur de fruits", "Sécheur de légumes", "Transformateur de manioc", "Transformateur de maïs", "Transformateur de soja", "Transformateur de cacao", "Transformateur de café", "Transformateur d'arachides", "Transformateur de noix", "Transformateur de céréales", "Tailleur", "Couturier", "Modéliste", "Styliste", "Brodeur", "Tricoteur", "Crocheteur", "Tisserand", "Fileur de laine", "Teinturier textile", "Sérigraphe textile", "Imprimeur textile", "Fabricant de vêtements", "Fabricant de chemises", "Fabricant de pantalons", "Fabricant de robes", "Fabricant de vestes", "Fabricant de costumes", "Fabricant d'uniformes", "Fabricant de vêtements traditionnels", "Fabricant de pagnes", "Fabricant d'écharpes", "Fabricant de foulards", "Fabricant de chapeaux", "Chapelier", "Modiste", "Fabricant de casquettes", "Fabricant de sacs en tissu", "Fabricant de rideaux", "Tapissier", "Garnisseur de meubles", "Matelassier", "Fabricant de matelas", "Fabricant d'oreillers", "Fabricant de couvertures", "Fabricant de chaussures", "Cordonnier", "Bottier", "Maroquinier", "Sellier", "Fabricant de ceintures", "Fabricant de portefeuilles", "Fabricant de bracelets en cuir", "Travailleur du cuir", "Teinturier de cuir", "Potier", "Céramiste", "Faïencier", "Porcelainier", "Modeleur en argile", "Sculpteur sur argile", "Sculpteur sur bois", "Sculpteur sur pierre", "Sculpteur sur métal", "Graveur sur bois", "Graveur sur métal", "Graveur sur verre", "Graveur sur pierre", "Graveur à la main", "Bijoutier", "Joaillier", "Orfèvre", "Lapidaire", "Polisseur de pierres précieuses", "Sertisseur", "Horloger", "Réparateur de montres", "Réparateur de bijoux", "Fabricant de bijoux fantaisie", "Fabricant de perles", "Artisan du bronze", "Artisan du cuivre", "Artisan du laiton", "Artisan de l'aluminium", "Fondeur artisanal", "Forgeron", "Coutelier", "Fabricant d'outils agricoles", "Fabricant de houes", "Fabricant de pioches", "Fabricant de haches", "Affûteur", "Aiguiseur", "Réparateur d'outils", "Tourneur-fraiseur", "Usineur", "Ajusteur-mécanicien", "Mécanicien automobile", "Mécanicien moto", "Mécanicien poids lourds", "Mécanicien agricole", "Mécanicien de machines", "Mécanicien naval", "Mécanicien cycles", "Réparateur de vélos", "Réparateur de motos", "Réparateur de voitures", "Carrossier", "Peintre automobile", "Tôlier automobile", "Dépanneur automobile", "Électricien automobile", "Électromécanicien", "Mécatronicien", "Réparateur de moteurs", "Réparateur de pompes", "Réparateur de groupes électrogènes", "Réparateur de machines agricoles", "Réparateur de machines industrielles", "Réparateur de matériel de chantier", "Réparateur de réfrigérateurs", "Réparateur de climatiseurs", "Réparateur de machines à laver", "Réparateur de fours", "Réparateur de cuisinières", "Réparateur de téléviseurs", "Réparateur de radios", "Réparateur d'appareils électroniques", "Réparateur de téléphones", "Réparateur d'ordinateurs", "Assembleur d'ordinateurs", "Technicien électronique", "Technicien électromécanique", "Bobinier de moteurs", "Installateur électrique", "Monteur de tableaux électriques", "Câbleur électrique", "Électricien industriel", "Électricien naval", "Installateur domotique", "Installateur de systèmes de sécurité", "Installateur de vidéosurveillance", "Installateur d'alarmes", "Installateur de contrôle d'accès", "Technicien de maintenance électrique", "Technicien de maintenance industrielle", "Monteur mécanique", "Assembleur mécanique", "Ajusteur industriel", "Chaudronnier", "Tuyauteur", "Plieur de métal", "Découpeur de métal", "Découpeur plasma", "Opérateur de machine-outil", "Opérateur CNC", "Perceur industriel", "Meuleur", "Polisseur de métal", "Sableur", "Galvaniseur", "Peintre industriel", "Monteur de structures métalliques", "Monteur de charpentes métalliques", "Poseur de garde-corps", "Poseur de grilles", "Poseur de clôtures", "Fabricant de portes métalliques", "Fabricant de fenêtres métalliques", "Fabricant de meubles métalliques", "Fabricant d'étagères métalliques", "Fabricant de chaises métalliques", "Menuisier aluminium", "Menuisier PVC", "Restaurateur de meubles", "Fabricant de meubles", "Fabricant de tables", "Fabricant de chaises", "Fabricant de lits", "Fabricant d'armoires", "Fabricant de bibliothèques", "Fabricant de bureaux", "Fabricant de portes en bois", "Fabricant de fenêtres en bois", "Fabricant d'escaliers", "Fabricant de meubles de cuisine", "Fabricant de meubles de salle de bains", "Fabricant de meubles de jardin", "Fabricant de meubles sur mesure", "Tourneur sur bois", "Marqueteur", "Vernisseur de meubles", "Laqueur de meubles", "Polisseur de bois", "Restaurateur de bois", "Fabricant de jouets en bois", "Fabricant d'objets en bois", "Fabricant d'ustensiles en bois", "Fabricant de cuillères en bois", "Fabricant de planches à découper", "Fabricant de cadres en bois", "Vannier", "Tresseur de fibres végétales", "Tresseur de paniers", "Tresseur de nattes", "Fabricant de paniers", "Fabricant de corbeilles", "Fabricant de meubles en rotin", "Fabricant de meubles en bambou", "Artisan du bambou", "Artisan du raphia", "Artisan du jonc", "Fabricant de nattes traditionnelles", "Fabricant de chapeaux en paille", "Fabricant de sacs en raphia", "Fabricant de sacs en bambou", "Fabricant de paniers en osier", "Fabricant de meubles en osier", "Fabricant de balais artisanaux", "Fabricant de brosses", "Fabricant de cordes", "Cordier", "Fabricant de filets de pêche", "Fabricant de filets agricoles", "Fabricant de hamacs", "Fabricant de tapis artisanaux", "Tisserand de tapis", "Fabricant de tapisseries", "Fabricant de macramé", "Artisan macramé", "Fabricant de décorations végétales", "Fabricant de fleurs artificielles", "Fabricant de décorations en fibres", "Fabricant de paniers décoratifs", "Fabricant de lampes en bambou", "Fabricant de luminaires artisanaux", "Fabricant de bougies", "Cirier", "Fabricant de savons artisanaux", "Savonnier", "Fabricant de parfums artisanaux", "Parfumeur", "Fabricant de cosmétiques artisanaux", "Fabricant de pommades artisanales", "Fabricant d'huiles cosmétiques", "Fabricant de bougies parfumées", "Fabricant d'encens", "Fabricant de désodorisants artisanaux", "Fabricant de produits ménagers artisanaux", "Fabricant de détergents", "Fabricant de lessive artisanale", "Bûcheron", "Scieur de bois", "Scieur de long", "Exploitant forestier", "Débardeur forestier", "Charbonnier", "Producteur de charbon de bois", "Résinier", "Récolteur de miel", "Récolteur de sève", "Récolteur de liège", "Travailleur forestier", "Ouvrier sylvicole", "Planteur d'arbres", "Producteur de bambou", "Producteur de rotin", "Producteur de raphia", "Producteur de bois", "Fabricant de palettes", "Fabricant de caisses en bois", "Fabricant de cageots", "Fabricant de tonneaux", "Tonnelier", "Boisselier", "Sabotier", "Fabricant de sabots", "Fabricant de manches d'outils", "Fabricant de cannes en bois", "Fabricant de bâtons", "Fabricant de flûtes en bois", "Luthier", "Fabricant de guitares", "Fabricant de violons", "Fabricant d'instruments de musique", "Réparateur d'instruments de musique", "Accordeur de pianos", "Facteur d'orgues", "Fabricant de tambours", "Fabricant de djembés", "Fabricant de balafons", "Fabricant de xylophones", "Fabricant de maracas", "Fabricant de percussions", "Fabricant de harpes", "Fabricant de flûtes", "Fabricant de trompettes artisanales", "Fabricant de saxophones", "Réparateur de guitares", "Réparateur de pianos", "Réparateur d'instruments à vent", "Réparateur d'instruments à cordes", "Restaurateur d'instruments anciens", "Sculpteur sur bois décoratif", "Sculpteur de statues", "Sculpteur de masques", "Fabricant de masques traditionnels", "Fabricant de figurines", "Fabricant de poupées", "Fabricant de marionnettes", "Marionnettiste", "Fabricant de jouets artisanaux", "Fabricant de jeux en bois", "Fabricant de puzzles en bois", "Fabricant de dominos artisanaux", "Fabricant d'échecs artisanaux", "Fabricant de jeux de société", "Fabricant de cerfs-volants", "Fabricant de bateaux miniatures", "Modéliste naval", "Fabricant de maquettes", "Maquettiste", "Fabricant de modèles réduits", "Restaurateur de meubles anciens", "Restaurateur de sculptures", "Restaurateur d'objets anciens", "Restaurateur de cadres", "Restaurateur de tableaux", "Encadreur", "Dorure sur bois", "Doreur", "Patineur de meubles", "Décorateur sur bois", "Peintre décorateur", "Peintre muraliste", "Fresquiste", "Mosaïste", "Mosaïste décorateur", "Poseur de mosaïque", "Décorateur de céramique", "Peintre sur porcelaine", "Peintre sur verre", "Peintre sur céramique", "Émailleur", "Émailleur sur métal", "Émailleur sur verre", "Verrier", "Souffleur de verre", "Vitraliste", "Fabricant de vitraux", "Restaurateur de vitraux", "Graveur sur verre", "Sculpteur sur verre", "Miroitier", "Fabricant de miroirs", "Polisseur de verre", "Découpeur de verre", "Tailleur de verre", "Fabricant de bouteilles artisanales", "Fabricant de vases en verre", "Fabricant de lampes en verre", "Fabricant d'objets en verre", "Souffleur de verre décoratif", "Artisan du verre recyclé", "Fabricant de perles en verre", "Bijoutier en verre", "Créateur de mosaïques", "Fabricant de carreaux décoratifs", "Fabricant de carreaux en terre cuite", "Tuilier", "Fabricant de tuiles", "Briquetier", "Fabricant de briques", "Fabricant de blocs en béton", "Fabricant de pavés", "Fabricant de bordures", "Fabricant de béton préfabriqué", "Fabricant de pierres artificielles", "Producteur de chaux", "Fabricant de plâtre", "Producteur de ciment artisanal", "Fabricant de mortier", "Fabricant de peinture artisanale", "Fabricant de pigments", "Fabricant de colorants", "Fabricant d'enduits décoratifs", "Fabricant de résines", "Fabricant de colle artisanale", "Fabricant de cire", "Fabricant de vernis", "Fabricant de produits d'entretien", "Fabricant de cirage", "Fabricant de pâte à polir", "Fabricant d'adhésifs", "Fabricant de mastic", "Fabricant de produits pour bois", "Fabricant de produits pour cuir", "Fabricant de produits pour métal", "Fabricant de produits pour verre", "Fabricant de produits pour carrelage", "Fabricant de produits de construction", "Artisan bétonnier", "Applicateur de stuc", "Stucateur", "Décorateur en stuc", "Staffeur-ornemaniste", "Ornemaniste", "Sculpteur ornemaniste", "Mouleur", "Modeleur", "Fabricant de moules", "Mouliste", "Plâtrier décorateur", "Staffeur décorateur", "Fabricant d'éléments décoratifs", "Fabricant de colonnes décoratives", "Fabricant de corniches", "Fabricant de rosaces", "Fabricant de moulures", "Poseur de moulures", "Poseur de corniches", "Poseur d'ornements", "Décorateur de plafonds", "Décorateur intérieur artisanal", "Installateur de papier peint", "Poseur de papier peint", "Poseur de tissus muraux", "Poseur de lambris", "Poseur de panneaux décoratifs", "Poseur de revêtements de sol", "Poseur de lino", "Poseur de vinyle", "Poseur de stratifié", "Ponçeur de parquet", "Vitrificateur de parquet", "Restaurateur de parquet", "Teinteur de bois", "Décapeur de meubles", "Nettoyeur de meubles", "Nettoyeur industriel", "Nettoyeur de tapis", "Nettoyeur de moquettes", "Nettoyeur de canapés", "Nettoyeur de matelas", "Nettoyeur de façades", "Nettoyeur haute pression", "Agent de nettoyage manuel", "Laveur automobile", "Préparateur esthétique automobile", "Polisseur automobile", "Detailer automobile", "Réparateur de pneus", "Monteur de pneus", "Vulcanisateur", "Réparateur de chambres à air", "Fabricant de pneus reconditionnés", "Réparateur de jantes", "Peintre de jantes", "Débosselage automobile", "Débosseleur", "Installateur de pare-brise", "Réparateur de pare-brise", "Installateur d'accessoires automobiles", "Installateur d'attelages", "Fabricant de carrosseries", "Fabricant de remorques", "Fabricant de charrettes", "Fabricant de brouettes", "Fabricant de vélos", "Fabricant de motos artisanales", "Fabricant de tricycles", "Fabricant de pousse-pousse", "Réparateur de tricycles", "Réparateur de fauteuils roulants", "Réparateur de matériel médical mécanique", "Réparateur de machines à coudre", "Réparateur de balances", "Réparateur de pompes à eau", "Réparateur de compresseurs", "Réparateur de générateurs", "Réparateur de moteurs diesel", "Réparateur de moteurs essence", "Réparateur de transmissions", "Réparateur de boîtes de vitesses", "Réparateur d'embrayages", "Réparateur de freins", "Réparateur de suspensions", "Réparateur de directions", "Réparateur de systèmes hydrauliques", "Hydraulicien", "Pneumaticien industriel", "Installateur hydraulique", "Installateur de pompes", "Installateur de systèmes d'irrigation", "Installateur de forage", "Foreur", "Puitsier", "Constructeur de puits", "Réparateur de puits", "Technicien de forage", "Opérateur de forage", "Carrier", "Extracteur de pierre", "Mineur artisanal", "Tailleur de granit", "Tailleur de marbre", "Polisseur de marbre", "Polisseur de granit", "Graveur de pierre tombale", "Fabricant de monuments funéraires", "Marbrier funéraire", "Sculpteur funéraire", "Poseur de pierres", "Maçon de pierre sèche", "Maçon traditionnel", "Constructeur de murs en pierre", "Constructeur en terre crue", "Constructeur en adobe", "Constructeur en briques de terre", "Fabricant de briques de terre", "Fabricant de blocs de terre comprimée", "Constructeur de maisons en terre", "Constructeur de maisons en bambou", "Constructeur de maisons en bois", "Constructeur de maisons traditionnelles", "Couvreur en chaume", "Chaumier", "Poseur de chaume", "Fabricant de tuiles artisanales", "Fabricant de toiture végétale", "Installateur de toiture végétale", "Étancheur toiture", "Zingueur", "Couvreur-zingueur", "Bardeur", "Poseur de bardage", "Poseur d'isolation", "Isolateur thermique", "Isolateur acoustique", "Souffleur d'isolant", "Installateur de gouttières", "Fabricant de gouttières", "Poseur de gouttières", "Installateur de cheminées", "Fumiste", "Constructeur de cheminées", "Poseur de poêles", "Installateur de poêles", "Ramoneur professionnel", "Technicien en énergie solaire", "Installateur de panneaux solaires", "Installateur de chauffe-eau solaire", "Technicien solaire", "Monteur de structures solaires", "Installateur d'éoliennes", "Technicien éolien", "Installateur de batteries solaires", "Installateur de bornes de recharge", "Technicien de recharge électrique", "Installateur de pompes à chaleur", "Technicien en climatisation", "Technicien frigoriste", "Réparateur de chambres froides", "Installateur de chambres froides", "Fabricant de glacières artisanales", "Fabricant de séchoirs solaires", "Constructeur de fours solaires", "Fabricant de fours artisanaux", "Fabricant de fours à bois", "Fabricant de fours à charbon", "Fabricant de foyers améliorés", "Fabricant de réchauds artisanaux", "Fabricant de cuisinières artisanales", "Fabricant de barbecue artisanal", "Fabricant de grilles de cuisson", "Fabricant de marmites métalliques", "Fabricant de casseroles artisanales", "Fabricant de poêles métalliques", "Fabricant d'ustensiles de cuisine", "Fabricant de couteaux de cuisine", "Fabricant de cuillères métalliques", "Fabricant de fourchettes artisanales", "Fabricant de spatules", "Fabricant de mortiers de cuisine", "Fabricant de pilons", "Fabricant de moulins manuels", "Fabricant de râpes", "Fabricant de tamis", "Fabricant de passoires", "Fabricant de paniers alimentaires", "Fabricant de séchoirs alimentaires", "Fabricant de fumoirs artisanaux", "Fabricant de pressoirs", "Fabricant de moulins à huile", "Fabricant de moulins à céréales", "Fabricant de décortiqueuses artisanales", "Fabricant de broyeurs agricoles", "Fabricant de machines agricoles artisanales", "Fabricant de semoirs", "Fabricant de charrues", "Fabricant de herses", "Fabricant de pulvérisateurs", "Fabricant d'arrosoirs", "Fabricant de brouettes agricoles", "Fabricant d'outils de jardinage", "Fabricant de râteaux", "Fabricant de bêches", "Fabricant de pelles", "Fabricant de fourches agricoles", "Fabricant de serpes", "Fabricant de faucilles", "Fabricant de paniers agricoles", "Fabricant de caisses agricoles", "Fabricant de ruches", "Fabricant de cadres de ruches", "Fabricant d'abreuvoirs", "Fabricant de mangeoires", "Fabricant de cages à volailles", "Fabricant de clapiers", "Fabricant d'enclos", "Fabricant de clôtures en bois", "Fabricant de clôtures végétales", "Poseur de clôtures électriques", "Installateur de clôtures agricoles", "Fabricant de grillages", "Poseur de grillage", "Fabricant de filets agricoles", "Réparateur de filets", "Fabricant de cordages marins", "Cordier maritime", "Constructeur de pirogues", "Constructeur de bateaux en bois", "Charpentier naval", "Calfat", "Peintre naval", "Réparateur de bateaux", "Réparateur de moteurs hors-bord", "Fabricant de pagaies", "Fabricant de rames", "Fabricant de filets de pêche", "Fabricant de casiers de pêche", "Fabricant de nasses", "Fabricant d'hameçons artisanaux", "Fabricant de flotteurs", "Réparateur de matériel de pêche", "Fumoir de poisson artisanal", "Sécheur de poisson", "Transformateur de poisson", "Transformateur de fruits de mer", "Salaisonnier", "Saunier", "Producteur de sel artisanal", "Fabricant de poisson séché", "Fabricant de viande séchée", "Fabricant de viande fumée", "Fabricant de produits carnés", "Fabricant de saucisses", "Fabricant de jambons artisanaux", "Fabricant de pâtés", "Fabricant de terrines", "Fabricant de bouillons artisanaux", "Fabricant d'épices", "Mélangeur d'épices", "Producteur de piments séchés", "Sécheur d'épices", "Producteur de farine de manioc", "Producteur de farine de maïs", "Producteur de farine de mil", "Producteur de farine de sorgho", "Producteur de farine de riz", "Transformateur de patate douce", "Transformateur d'igname", "Transformateur de banane plantain", "Fabricant de chips de banane", "Fabricant de chips de manioc", "Fabricant de farine de banane", "Fabricant de gari", "Fabricant de tapioca", "Fabricant d'amidon", "Fabricant de pâte de tomate", "Fabricant de purée de fruits", "Fabricant de jus de fruits", "Fabricant de nectar de fruits", "Fabricant de boissons artisanales", "Fabricant de boissons non alcoolisées", "Fabricant de thé artisanal", "Mélangeur de thés", "Sécheur de feuilles", "Producteur de tisanes", "Fabricant d'infusions", "Fabricant de café moulu", "Torréfacteur artisanal", "Moudreur de café", "Producteur de cacao", "Chocolatier artisanal", "Fabricant de chocolat", "Fabricant de pâte d'arachide", "Fabricant de beurre d'arachide", "Fabricant de pâte de noix", "Fabricant de noix grillées", "Transformateur de graines", "Fabricant d'huile de palme", "Producteur d'huile de coco", "Fabricant d'huile d'arachide", "Fabricant d'huile de soja", "Fabricant d'huile de sésame", "Fabricant d'huile de neem", "Fabricant de savon noir", "Fabricant de savon liquide", "Fabricant de savon solide", "Fabricant de shampoing artisanal", "Fabricant de crème corporelle", "Fabricant de baumes", "Fabricant de lotions", "Fabricant de pommades", "Fabricant de beurre corporel", "Fabricant d'huiles essentielles", "Distillateur de plantes aromatiques", "Fabricant d'eau florale", "Fabricant de parfums naturels", "Fabricant de bougies décoratives", "Fabricant de bougies artisanales", "Fabricant d'encens naturel", "Fabricant de diffuseurs parfumés", "Fabricant de sachets parfumés", "Fabricant de paniers cadeaux", "Créateur d'objets artisanaux", "Fabricant de sacs en cuir", "Fabricant de chaussures en cuir", "Fabricant de sandales", "Fabricant de tongs", "Fabricant de bottes", "Réparateur de chaussures", "Réparateur de sacs", "Réparateur de ceintures", "Artisan du cuir", "Graveur sur cuir", "Peintre sur cuir", "Embosseur sur cuir", "Découpeur de cuir", "Couturier cuir", "Sellier automobile", "Sellier-harnacheur", "Bourrelier", "Fabricant de selles", "Fabricant de harnais", "Fabricant de brides", "Fabricant de colliers pour animaux", "Fabricant de laisses", "Fabricant de muselières", "Fabricant de sacs à dos", "Fabricant de valises", "Fabricant de mallettes", "Fabricant de pochettes", "Fabricant de porte-monnaie", "Fabricant de trousses", "Fabricant de cartables", "Fabricant de sacs de voyage", "Fabricant de sacs de sport", "Fabricant de sacs à main", "Fabricant de paniers en cuir", "Fabricant de tabliers en cuir", "Fabricant de gants en cuir", "Fabricant de vêtements en cuir", "Fabricant de vestes en cuir", "Fabricant de chapeaux en cuir", "Fabricant de bracelets en cuir", "Fabricant de bijoux en cuir", "Fabricant de porte-clés en cuir", "Fabricant de housses en cuir", "Fabricant de sièges en cuir", "Restaurateur de cuir", "Nettoyeur de cuir", "Teinturier de cuir", "Finisseur de cuir", "Fabricant de tissus artisanaux", "Fabricant de tissus traditionnels", "Fabricant de tissus imprimés", "Fabricant de tissus teints", "Fabricant de tissus brodés", "Fabricant de tissus tissés", "Fabricant de pagnes traditionnels", "Fabricant de foulards traditionnels", "Fabricant de turbans", "Fabricant de bandeaux", "Fabricant de vêtements africains", "Fabricant de vêtements traditionnels", "Fabricant de vêtements cérémoniels", "Fabricant de vêtements de travail", "Fabricant de vêtements scolaires", "Fabricant de vêtements pour enfants", "Fabricant de vêtements pour bébés", "Fabricant de vêtements de sport", "Fabricant de lingerie artisanale", "Fabricant de sous-vêtements", "Fabricant de pyjamas", "Fabricant de chemises traditionnelles", "Fabricant de pantalons traditionnels", "Fabricant de jupes", "Fabricant de robes traditionnelles", "Fabricant de boubous", "Fabricant de caftans", "Fabricant de tenues de cérémonie", "Fabricant de costumes traditionnels", "Fabricant de vêtements de scène", "Costumier", "Habilleur", "Retoucheur", "Réparateur de vêtements", "Brodeur à la main", "Brodeur machine", "Dentellier", "Fabricant de dentelle", "Fabricant de galons", "Fabricant de rubans", "Fabricant de boutons artisanaux", "Fabricant de fermetures artisanales", "Fabricant d'accessoires textiles", "Fabricant de pompons", "Fabricant de franges", "Fabricant de perles textiles", "Fabricant de fleurs en tissu", "Fabricant de nœuds décoratifs", "Fabricant de coussins décoratifs", "Fabricant de housses de coussins", "Fabricant de housses de fauteuils", "Fabricant de housses de sièges", "Fabricant de nappes", "Fabricant de serviettes en tissu", "Fabricant de sets de table", "Fabricant de torchons", "Fabricant de tabliers", "Fabricant de rideaux artisanaux", "Fabricant de stores en tissu", "Fabricant de moustiquaires", "Fabricant de hamacs en tissu", "Fabricant de couvertures artisanales", "Fabricant de dessus-de-lit", "Fabricant de tapis en tissu", "Fabricant de tapis tressés", "Fabricant de tapis noués", "Fabricant de tapisseries murales", "Fabricant de tentures", "Fabricant de décorations textiles", "Fabricant de drapeaux", "Fabricant de fanions", "Fabricant de banderoles", "Fabricant de décorations pour événements", "Décorateur événementiel", "Décorateur de mariage", "Installateur de décorations", "Monteur de stands", "Fabricant de stands", "Fabricant de kiosques", "Fabricant de comptoirs", "Fabricant de présentoirs", "Fabricant d'enseignes artisanales", "Peintre d'enseignes", "Lettrier", "Calligraphe", "Graveur d'enseignes", "Fabricant de panneaux publicitaires", "Fabricant de panneaux en bois", "Fabricant de panneaux métalliques", "Fabricant de lettres en relief", "Fabricant de lettres lumineuses", "Poseur d'enseignes", "Poseur de panneaux", "Fabricant de tampons", "Fabricant de cachets", "Graveur de tampons", "Imprimeur artisanal", "Sérigraphe", "Typographe", "Relieur", "Brocheur", "Fabricant de carnets", "Fabricant de cahiers", "Fabricant d'agendas", "Fabricant d'albums photo", "Fabricant de livres artisanaux", "Restaurateur de livres", "Restaurateur de documents", "Calligraphe décoratif", "Enlumineur", "Fabricant de cartes artisanales", "Fabricant de cartes de vœux", "Fabricant d'invitations", "Fabricant de faire-part", "Fabricant de boîtes cadeaux", "Fabricant de boîtes en carton", "Cartonnier", "Fabricant d'emballages", "Fabricant de sacs en papier", "Fabricant de sachets en papier", "Fabricant d'étiquettes", "Fabricant de papier artisanal", "Papetier", "Fabricant de papier recyclé", "Fabricant de papier décoratif", "Fabricant de papier cadeau", "Fabricant de papier à lettres", "Fabricant d'origami", "Artisan du papier", "Fabricant de fleurs en papier", "Fabricant de décorations en papier", "Fabricant de lanternes en papier", "Fabricant de guirlandes en papier", "Fabricant de pompons en papier", "Fabricant de confettis", "Fabricant de décorations de fête", "Fabricant de décorations de Noël", "Fabricant de décorations de Pâques", "Fabricant de décorations de mariage", "Fabricant de boules décoratives", "Fabricant de couronnes décoratives", "Fabricant de cadres décoratifs", "Fabricant de miroirs décoratifs", "Fabricant d'horloges artisanales", "Fabricant de pendules", "Réparateur d'horloges", "Horloger réparateur", "Fabricant de réveils artisanaux", "Fabricant de sabliers", "Fabricant de thermomètres artisanaux", "Fabricant d'objets décoratifs", "Créateur d'artisanat", "Artisan polyvalent", "Artisan décorateur", "Artisan créateur", "Artisan du recyclage", "Recycleur de plastique", "Transformateur de plastique", "Fabricant d'objets en plastique recyclé", "Fabricant de meubles en plastique recyclé", "Fabricant de pavés en plastique recyclé", "Fabricant de briques recyclées", "Recycleur de verre", "Transformateur de verre recyclé", "Recycleur de métal", "Transformateur de métal recyclé", "Recycleur de papier", "Transformateur de papier recyclé", "Fabricant d'objets recyclés", "Fabricant de meubles recyclés", "Fabricant de décoration recyclée", "Fabricant de bijoux recyclés", "Fabricant de sacs recyclés", "Fabricant de vêtements recyclés", "Fabricant de jouets recyclés", "Fabricant de pots recyclés", "Fabricant de jardinières recyclées", "Fabricant de meubles en palettes", "Fabricant de tables en palettes", "Fabricant de canapés en palettes", "Fabricant de lits en palettes", "Fabricant d'étagères en palettes", "Fabricant de décorations en palettes", "Fabricant de meubles en pneus recyclés", "Fabricant de poufs recyclés", "Fabricant de sièges recyclés", "Fabricant de lampes recyclées", "Fabricant d'abat-jours recyclés", "Fabricant de sculptures recyclées", "Sculpteur d'objets recyclés", "Artisan récupérateur", "Collecteur de matériaux recyclables", "Trieur de déchets recyclables", "Transformateur de déchets organiques", "Composteur", "Producteur de compost", "Fabricant d'engrais organiques", "Producteur d'engrais naturel", "Fabricant de terreau", "Producteur de terreau", "Fabricant de briquettes combustibles", "Fabricant de briquettes de biomasse", "Producteur de biomasse", "Transformateur de déchets agricoles", "Fabricant de charbon écologique", "Fabricant de charbon vert", "Fabricant de biochar", "Producteur de lombricompost", "Éleveur de vers de compost", "Producteur d'aliments pour animaux", "Fabricant d'aliments pour volailles", "Fabricant d'aliments pour poissons", "Fabricant d'aliments pour bétail", "Fabricant de granulés alimentaires", "Fabricant de provende", "Mélangeur d'aliments pour animaux", "Fabricant de mangeoires", "Fabricant d'abreuvoirs", "Fabricant de cages", "Fabricant de poulaillers", "Fabricant de clapiers", "Fabricant d'enclos", "Fabricant de niches pour chiens", "Fabricant de maisons pour animaux", "Fabricant d'aquariums artisanaux", "Fabricant de terrariums", "Fabricant de cages à oiseaux", "Fabricant de perchoirs", "Fabricant de nichoirs", "Fabricant de ruches", "Fabricant d'équipements apicoles", "Fabricant d'enfumoirs apicoles", "Fabricant de cadres apicoles", "Fabricant de cire d'abeille", "Transformateur de cire d'abeille", "Fabricant de bougies en cire d'abeille", "Fabricant de produits à base de miel", "Producteur de miel", "Producteur de cire", "Producteur de propolis", "Fabricant de produits de la ruche", "Transformateur de miel", "Conditionneur de miel", "Fabricant de paniers apicoles", "Fabricant d'équipements agricoles", "Réparateur d'équipements agricoles", "Fabricant d'outils forestiers", "Réparateur d'outils forestiers", "Fabricant d'équipements de pêche", "Réparateur d'équipements de pêche", "Fabricant d'équipements d'élevage", "Réparateur d'équipements d'élevage"
]

// ✅ SYSTÈME DE PRIORITÉ INVISIBLE
const PLAN_PRIORITY: Record<string, number> = {
  'premium': 4,
  'business': 3,
  'starter': 2,
  'gratuit': 1,
}

interface Service {
  id: string
  title: string
  description: string
  category: string
  price: string
  city: string | null
  pro_id: string
  created_at: string
  profiles: {
    id: string
    full_name: string
    phone: string
    avatar_url: string | null
    specialty: string
    rating: number
    total_reviews: number
    plan: string
    is_verified: boolean
    is_available: boolean
    city: string | null
  }
}

export default function MarketplacePage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [citySearchQuery, setCitySearchQuery] = useState('')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  const allCities = [
    'Lomé', 'Adidogomé', 'Agoè-Nyivé', 'Bè', 'Tokoin', 'Akodesséwa', 'Nyékonakpoè', 'Djidjolé', 'Attiégou', 'Kégué', 
    'Tsévié', 'Kpalimé', 'Sokodé', 'Kara', 'Dapaong'
  ]

  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  )

  useEffect(() => {
    checkUserSession()
    loadServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, searchQuery, selectedCity, selectedCategory])

  const checkUserSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setCurrentUser(profileData)
      }
    } catch (error) {
      console.error('Erreur vérification session:', error)
    }
  }

  const loadServices = async () => {
    try {
      setDbError(null)
      const { data: servicesData, error } = await supabase
        .from('services')
        .select(`
          id, title, description, category, price, city, pro_id, created_at, is_active,
          profiles:pro_id (
            id, full_name, phone, avatar_url, specialty, rating, total_reviews, plan, is_verified, is_available, city
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Erreur Supabase:', error.message)
        setDbError(error.message)
        throw error
      }

      if (servicesData) {
        const formatted = servicesData.map(s => ({
          ...s,
          profiles: s.profiles || { 
            id: s.pro_id,
            full_name: 'Professionnel', 
            phone: '', 
            avatar_url: null, 
            specialty: '', 
            rating: 0, 
            total_reviews: 0, 
            plan: 'Gratuit', 
            is_verified: false, 
            is_available: true, 
            city: s.city || ''
          }
        }))
        setServices(formatted)
      }
    } catch (error: any) {
      console.error('❌ Erreur chargement services:', error.message || error)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = [...services]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category?.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.title?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.profiles?.full_name?.toLowerCase().includes(query)
      )
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(service => 
        (service.city || service.profiles?.city)?.toLowerCase() === selectedCity.toLowerCase()
      )
    }

    // ✅ TRI PRIORITAIRE INVISIBLE
    filtered.sort((a, b) => {
      const priorityA = PLAN_PRIORITY[a.profiles?.plan?.toLowerCase() || 'gratuit'] || 1
      const priorityB = PLAN_PRIORITY[b.profiles?.plan?.toLowerCase() || 'gratuit'] || 1
      
      if (priorityB !== priorityA) return priorityB - priorityA
      
      const ratingA = a.profiles?.rating || 0
      const ratingB = b.profiles?.rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    setFilteredServices(filtered)
  }

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId])
  }

  const contactWhatsApp = async (service: Service) => {
    if (!service.profiles?.is_available) {
      alert('Ce professionnel est actuellement en mission. Veuillez réessayer plus tard.')
      return
    }

    const pro = service.profiles
    let phone = pro.phone?.replace(/\s+/g, '') || ''
    if (phone && !phone.startsWith('+')) {
      if (phone.startsWith('228')) phone = '+' + phone
      else if (phone.startsWith('9') || phone.startsWith('7')) phone = '+228' + phone
    }
    const message = encodeURIComponent(`Bonjour ${pro.full_name}, je suis intéressé(e) par votre service "${service.title}" (${service.price} FCFA) sur ProKorb.`)
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank')
  }

  const handleMonEspace = () => {
    if (currentUser) {
      if (currentUser.role === 'pro') {
        router.push('/dashboard/pro')
      } else {
        router.push('/dashboard/client')
      }
    } else {
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mx-auto mb-4" />
        <p className="text-slate-300 font-medium">Chargement de la marketplace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 180s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ✅ HEADER 100% RESPONSIVE (Recherche visible sur mobile) */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          
          {/* LIGNE 1 : Logo + Bouton Mon Espace */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <img src="/logo.png" alt="Logo ProKorb" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
              <span className="font-black text-xl tracking-tight hidden sm:block">
                <span className="text-indigo-400">PRO</span>
                <span className="text-white">KORB</span>
              </span>
            </Link>
            
            <button onClick={handleMonEspace} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0">
              <User className="w-4 h-4" /> <span className="hidden sm:inline">Mon Espace</span>
            </button>
          </div>

          {/* LIGNE 2 : Barre de recherche principale (visible sur TOUS les écrans) */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un service ou professionnel..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 text-sm" 
            />
          </div>

          {/* LIGNE 3 : Filtre par localité (visible sur TOUS les écrans) */}
          <div className="relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Localité..." 
                value={citySearchQuery}
                onChange={(e) => { setCitySearchQuery(e.target.value); setShowCityDropdown(true); setSelectedCity('all') }}
                onFocus={() => setShowCityDropdown(true)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500 text-sm" 
              />
            </div>
            {showCityDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                  <button onClick={() => { setSelectedCity('all'); setShowCityDropdown(false); setCitySearchQuery('') }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-emerald-400 font-semibold sticky top-0 bg-slate-900">
                    <MapPin className="w-4 h-4 inline mr-2" /> Toutes les localités
                  </button>
                  {filteredCities.map((city) => (
                    <button key={city} onClick={() => { setSelectedCity(city); setShowCityDropdown(false); setCitySearchQuery(city) }} className="w-full px-4 py-3 text-left text-sm hover:bg-emerald-900/30 text-slate-300">
                      <MapPin className="w-4 h-4 inline mr-2 text-slate-500" /> {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ✅ MARQUEE CATÉGORIES - BOUCLE INFINIE PARFAITE */}
        <div className="border-t border-slate-800/60 bg-slate-900/50 overflow-hidden py-3">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-3 px-4 shrink-0">
              {allMetiers.map((metier, index) => (
                <button 
                  key={`set1-${index}`} 
                  onClick={() => setSelectedCategory(metier === 'Tous les métiers' ? 'all' : metier)} 
                  className="px-5 py-2 rounded-full text-sm font-medium border border-slate-700 bg-slate-800/80 text-slate-300 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 shrink-0 whitespace-nowrap"
                >
                  {metier}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 px-4 shrink-0">
              {allMetiers.map((metier, index) => (
                <button 
                  key={`set2-${index}`} 
                  onClick={() => setSelectedCategory(metier === 'Tous les métiers' ? 'all' : metier)} 
                  className="px-5 py-2 rounded-full text-sm font-medium border border-slate-700 bg-slate-800/80 text-slate-300 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400 transition-all duration-200 shrink-0 whitespace-nowrap"
                >
                  {metier}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ERREUR BDD */}
        {dbError && (
          <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-red-400 mb-2">Erreur de connexion</h3>
            <p className="text-slate-400">{dbError}</p>
          </div>
        )}

        {/* GRILLE DE SERVICES */}
        {!dbError && filteredServices.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-16 text-center">
            <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-white font-bold text-lg">Aucun service trouvé</p>
            <p className="text-slate-400 mt-2">Essayez de modifier vos critères</p>
          </div>
        ) : !dbError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => {
              const isAvailable = service.profiles?.is_available !== false
              const isPremium = service.profiles?.plan === 'Premium' || service.profiles?.plan === 'Business'
              const displayCity = service.city || service.profiles?.city

              return (
                <div 
                  key={service.id} 
                  className={`bg-slate-900 rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
                    isPremium ? 'border-amber-500/30 hover:border-amber-500/60' : 'border-slate-800 hover:border-indigo-500/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-800">
                    {service.profiles?.avatar_url ? (
                      <img 
                        src={service.profiles.avatar_url} 
                        alt={service.profiles.full_name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
                        <User className="w-20 h-20 text-white/50" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      {isAvailable ? (
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                          Disponible
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                          <Pause className="w-3 h-3" />
                          En mission
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={() => toggleFavorite(service.id)} 
                      className="absolute top-3 right-3 w-8 h-8 bg-slate-900/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-slate-900/80 transition-all"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(service.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      {service.profiles?.rating > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-slate-900">{service.profiles.rating.toFixed(1)}</span>
                          {service.profiles.total_reviews > 0 && (
                            <span className="text-xs text-slate-600">({service.profiles.total_reviews})</span>
                          )}
                        </div>
                      )}
                      
                      {service.profiles?.is_verified && (
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {service.profiles?.full_name}
                        </h3>
                        {service.profiles?.is_verified && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{service.profiles?.specialty || service.category}</p>
                    </div>

                    {displayCity && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>{displayCity}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800">
                      <p className={`font-bold text-lg ${isAvailable ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {service.price}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Link 
                        href={`/pro/${service.pro_id}`} 
                        className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-slate-700"
                      >
                        <Eye className="w-4 h-4" />
                        Voir le profil
                      </Link>
                      
                      {isAvailable ? (
                        <button 
                          onClick={() => contactWhatsApp(service)}
                          className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contacter
                        </button>
                      ) : (
                        <button 
                          disabled
                          className="flex-1 px-4 py-3 bg-slate-700 text-slate-400 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-600"
                          title="Professionnel actuellement en mission"
                        >
                          <Pause className="w-4 h-4" />
                          Indisponible
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo ProKorb" className="h-8 w-auto object-contain" />
              <span className="font-black text-lg text-white">PRO<span className="text-indigo-400">KORB</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="/terms" className="hover:text-indigo-400 transition-colors">Conditions</a>
              <a href="/privacy" className="hover:text-indigo-400 transition-colors">Confidentialité</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors">Support</a>
            </div>
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} ProKorb Togo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}