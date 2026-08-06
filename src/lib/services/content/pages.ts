import type { ServicePage } from "../types";

const sharedComparisonRowsFr = [
  {
    aspect: "Recherche de logement",
    alone: "Annonces dispersées, visites impossibles depuis l'étranger, risque d'arnaques.",
    concierge: "Filtrage ciblé, visites sur place, rapports d'inspection avant signature.",
  },
  {
    aspect: "Arrivée à l'aéroport",
    alone: "Transport incertain, pas d'adresse fixe, fatigue après un long vol.",
    concierge: "Accueil personnalisé et trajet direct vers votre logement ou hébergement.",
  },
  {
    aspect: "Temps investi",
    alone: "Semaines perdues en démarches dispersées pendant les premières semaines.",
    concierge: "Étapes coordonnées avant l'arrivée ; vous vous concentrez sur l'essentiel.",
  },
  {
    aspect: "Coût réel",
    alone: "Hôtels prolongés, erreurs de bail, courses d'urgence, stress.",
    concierge: "Services à la carte dès 80 $ CAD + taxes ; forfait adapté à votre situation.",
  },
  {
    aspect: "Réseau local",
    alone: "Aucun contact de confiance sur place pour valider les choix.",
    concierge: "Équipe locale à Montréal, Toronto et Vancouver, expérience vécue d'installation.",
  },
];

const sharedComparisonRowsEn = [
  {
    aspect: "Housing search",
    alone: "Scattered listings, no viewings from abroad, scam risk.",
    concierge: "Targeted filtering, on-site visits, inspection reports before signing.",
  },
  {
    aspect: "Airport arrival",
    alone: "Uncertain transport, no fixed address, exhaustion after a long flight.",
    concierge: "Personal welcome and direct ride to your home or temporary stay.",
  },
  {
    aspect: "Time invested",
    alone: "Weeks lost on scattered errands during your first weeks.",
    concierge: "Steps coordinated before arrival; you focus on what matters.",
  },
  {
    aspect: "True cost",
    alone: "Extended hotels, lease mistakes, emergency shopping, stress.",
    concierge: "À la carte services from $80 CAD + tax; package tailored to you.",
  },
  {
    aspect: "Local network",
    alone: "No trusted contact on the ground to validate choices.",
    concierge: "Local team in Montreal, Toronto and Vancouver with lived settlement experience.",
  },
];

export const SERVICE_PAGES: ServicePage[] = [
  // —— Transfert aéroport ——
  {
    slug: "transfert-aeroport",
    locale: "fr",
    alternateSlug: "airport-transfer",
    serviceId: "transfert",
    pageType: "service",
    title: "Transfert aéroport pour nouveaux arrivants au Canada",
    metaDescription:
      "Accueil et transfert aéroport à Montréal, Toronto et Vancouver pour nouveaux arrivants. Trajet direct vers votre logement. IR Conciergerie.",
    heroIcon: "flight_land",
    primaryKeyword: "transfert aéroport nouveaux arrivants",
    lead:
      "Votre premier contact avec le Canada se joue souvent à l'aéroport : fatigue du vol, bagages, nouvelle ville. Un transfert organisé à l'avance élimine une source majeure de stress dès l'atterrissage.",
    sections: [
      {
        heading: "Pourquoi réserver un transfert avant l'arrivée ?",
        paragraphs: [
          "Sans adresse fixe ni repères locaux, trouver un taxi ou un VTC à l'aéroport peut coûter cher et prendre du temps — surtout en heure de pointe ou avec des enfants.",
          "IR Conciergerie vous accueille à la sortie des bagages et vous conduit directement vers votre logement, hôtel ou Airbnb, avec un véhicule adapté à votre groupe et vos bagages.",
        ],
      },
      {
        heading: "Villes desservies",
        paragraphs: [
          "Nous opérons principalement sur les aéroports de Montréal (YUL), Toronto (YYZ, YTZ) et Vancouver (YVR), ainsi que les gares et terminaux de bus selon votre itinéraire.",
        ],
      },
      {
        heading: "Ce qui est inclus",
        list: [
          "Suivi de votre vol et ajustement en cas de retard.",
          "Accueil personnalisé à l'aéroport.",
          "Trajet direct vers votre adresse.",
          "Aide pour les bagages et premières indications sur place.",
        ],
      },
    ],
    faq: [
      {
        question: "Puis-je réserver un transfert si je n'ai pas encore d'adresse fixe ?",
        answer:
          "Oui. Nous pouvons vous conduire vers un hôtel, un Airbnb ou une résidence temporaire. Indiquez-nous votre hébergement lors de la soumission.",
      },
      {
        question: "Combien coûte un transfert aéroport ?",
        answer:
          "Le tarif dépend de la ville, de la distance et du nombre de passagers. Demandez une soumission : nos services débutent à 80 $ CAD + taxes.",
      },
    ],
    relatedSlugs: ["recherche-logement", "assistance-logistique"],
    relatedBlogSlugs: ["guide-installation-nouveaux-arrivants-canada", "demenager-installer-montreal"],
  },
  {
    slug: "airport-transfer",
    locale: "en",
    alternateSlug: "transfert-aeroport",
    serviceId: "transfert",
    pageType: "service",
    title: "Airport Transfer for Newcomers to Canada",
    metaDescription:
      "Airport pickup and transfer in Montreal, Toronto and Vancouver for newcomers. Direct ride to your home. IR Conciergerie.",
    heroIcon: "flight_land",
    primaryKeyword: "Montreal airport transfer newcomers",
    lead:
      "Your first contact with Canada often happens at the airport: jet lag, luggage, a new city. A transfer booked in advance removes a major source of stress on landing.",
    sections: [
      {
        heading: "Why book a transfer before you arrive?",
        paragraphs: [
          "Without a fixed address or local bearings, finding a taxi or rideshare at the airport can be expensive and time-consuming — especially at peak hours or with children.",
          "IR Conciergerie meets you at baggage claim and drives you directly to your home, hotel or Airbnb in a vehicle suited to your group and luggage.",
        ],
      },
      {
        heading: "Cities we serve",
        paragraphs: [
          "We primarily serve Montreal (YUL), Toronto (YYZ, YTZ) and Vancouver (YVR) airports, plus train and bus terminals depending on your itinerary.",
        ],
      },
      {
        heading: "What's included",
        list: [
          "Flight tracking and adjustments for delays.",
          "Personal welcome at the airport.",
          "Direct ride to your address.",
          "Luggage help and first on-the-ground tips.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I book a transfer without a fixed address yet?",
        answer:
          "Yes. We can take you to a hotel, Airbnb or temporary residence. Share your accommodation details when requesting a quote.",
      },
      {
        question: "How much does an airport transfer cost?",
        answer:
          "Pricing depends on city, distance and passengers. Request a quote — services start at $80 CAD + tax.",
      },
    ],
    relatedSlugs: ["housing-search", "full-settlement-assistance"],
    relatedBlogSlugs: ["moving-to-canada-newcomer-guide", "moving-to-montreal-guide"],
  },

  // —— Recherche logement ——
  {
    slug: "recherche-logement",
    locale: "fr",
    alternateSlug: "housing-search",
    serviceId: "recherche",
    pageType: "service",
    title: "Recherche de logement au Canada pour nouveaux arrivants",
    metaDescription:
      "Recherche active de logement à Montréal, Toronto et Vancouver : filtrage, visites et négociation pour nouveaux arrivants. IR Conciergerie.",
    heroIcon: "home_work",
    primaryKeyword: "recherche logement Canada",
    lead:
      "Le marché locatif canadien est tendu : annonces qui disparaissent en heures, visites obligatoires, références exigées. Chercher depuis l'étranger sans aide locale est l'un des défis les plus coûteux pour un nouvel arrivant.",
    sections: [
      {
        heading: "Notre approche",
        paragraphs: [
          "Nous définissons avec vous budget, quartiers cibles et date d'arrivée, puis filtrons les annonces pertinentes sur les plateformes locales.",
          "Nos équipes visitent les logements, documentent l'état des lieux et vous présentent une shortlist avec photos et commentaires — pour que vous signiez en connaissance de cause, même à distance.",
        ],
      },
      {
        heading: "Pour qui ?",
        list: [
          "Familles et couples qui arrivent sans réseau local.",
          "Professionnels en relocalisation avec délai serré.",
          "Étudiants internationaux cherchant un logement fiable.",
          "Entreprises qui installent des collaborateurs au Canada.",
        ],
      },
      {
        heading: "Recherche de logement à Montréal",
        paragraphs: [
          "Montréal est souvent la première ville d'installation des nouveaux arrivants francophones et anglophones. Le taux d'inoccupation était d'environ 2,9 % en 2025 (SCHL) : les bonnes annonces partent en jours, pas en semaines.",
          "Les plateformes les plus actives sont Kijiji, Kangalou et Centris. Le 1er juillet concentre la majorité des baux — si vous arrivez de l'étranger autour de cette date, anticipez dès avril.",
          "Notre équipe montréalaise filtre les annonces selon votre profil (famille, étudiant, couple), visite sur place et produit un rapport avant signature — essentiel quand vous signez à distance depuis l'étranger.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps avant l'arrivée commencer la recherche ?",
        answer:
          "Idéalement 6 à 8 semaines pour Montréal et Toronto. Vancouver peut nécessiter encore plus de flexibilité sur le budget ou le quartier.",
      },
      {
        question: "Puis-je signer un bail depuis l'étranger ?",
        answer:
          "Oui, mais une inspection par une tierce partie de confiance est fortement recommandée. Nous proposons ce service en complément.",
      },
      {
        question: "Comment trouver un logement à Montréal en arrivant de l'étranger ?",
        answer:
          "Commencez tôt sur Kijiji et Kangalou, définissez vos quartiers cibles et faites inspecter tout logement avant signature. IR Conciergerie peut visiter et documenter les unités à votre place — consultez notre guide dédié sur le blogue.",
      },
      {
        question: "Quels quartiers montréalais pour une première installation ?",
        answer:
          "Côte-des-Neiges et le Plateau pour les étudiants ; Verdun et Ahuntsic pour les familles ; Westmount et NDG pour un environnement anglophone. Nous adaptons la recherche à votre budget et profil.",
      },
    ],
    relatedSlugs: ["inspection-logement", "transfert-aeroport"],
    relatedBlogSlugs: [
      "trouver-logement-montreal-etranger",
      "comparatif-services-logement-montreal",
      "demenager-installer-montreal",
    ],
  },
  {
    slug: "housing-search",
    locale: "en",
    alternateSlug: "recherche-logement",
    serviceId: "recherche",
    pageType: "service",
    title: "Housing Search in Canada for Newcomers",
    metaDescription:
      "Active housing search in Montreal, Toronto and Vancouver: filtering, viewings and negotiation for newcomers. IR Conciergerie.",
    heroIcon: "home_work",
    primaryKeyword: "housing search Canada",
    lead:
      "Canada's rental market is tight: listings vanish within hours, viewings are mandatory and references are required. Searching from abroad without local help is one of the costliest challenges for a newcomer.",
    sections: [
      {
        heading: "Our approach",
        paragraphs: [
          "We define budget, target neighbourhoods and arrival date with you, then filter relevant listings on local platforms.",
          "Our team visits properties, documents condition and presents a shortlist with photos and notes — so you sign with full knowledge, even remotely.",
        ],
      },
      {
        heading: "Who is this for?",
        list: [
          "Families and couples arriving without a local network.",
          "Relocating professionals on tight timelines.",
          "International students seeking reliable housing.",
          "Companies placing employees in Canada.",
        ],
      },
      {
        heading: "Housing search in Montreal",
        paragraphs: [
          "Montreal is often the first settlement city for Francophone and Anglophone newcomers. The vacancy rate was around 2.9% in 2025 (CMHC): good listings disappear in days, not weeks.",
          "The most active platforms are Kijiji, Kangalou and Centris. July 1st concentrates most leases — if you arrive from abroad around that date, plan from April.",
          "Our Montreal team filters listings to your profile (family, student, couple), visits on site and produces a report before signing — essential when you sign remotely from overseas.",
        ],
      },
    ],
    faq: [
      {
        question: "How far in advance should I start searching?",
        answer:
          "Ideally 6–8 weeks for Montreal and Toronto. Vancouver may require more flexibility on budget or neighbourhood.",
      },
      {
        question: "Can I sign a lease from abroad?",
        answer:
          "Yes, but a trusted third-party inspection is strongly recommended. We offer this as a complementary service.",
      },
      {
        question: "How do I find housing in Montreal when arriving from abroad?",
        answer:
          "Start early on Kijiji and Kangalou, define your target neighbourhoods and have every unit inspected before signing. IR Conciergerie can visit and document units on your behalf — see our dedicated blog guide.",
      },
      {
        question: "Which Montreal neighbourhoods for a first move?",
        answer:
          "Côte-des-Neiges and the Plateau for students; Verdun and Ahuntsic for families; Westmount and NDG for an English-friendly environment. We tailor search to your budget and profile.",
      },
    ],
    relatedSlugs: ["housing-inspection", "airport-transfer"],
    relatedBlogSlugs: [
      "find-housing-montreal-from-abroad",
      "montreal-housing-services-comparison",
      "moving-to-montreal-guide",
    ],
  },

  // —— Inspection ——
  {
    slug: "inspection-logement",
    locale: "fr",
    alternateSlug: "housing-inspection",
    serviceId: "inspection",
    pageType: "service",
    title: "Inspection de logement avant signature au Canada",
    metaDescription:
      "Visite et rapport d'inspection détaillé avant de signer votre bail au Canada. Évitez les mauvaises surprises. IR Conciergerie.",
    heroIcon: "fact_check",
    primaryKeyword: "inspection logement avant signature",
    lead:
      "Signer un bail à distance sans avoir vu le logement expose à des surprises coûteuses : humidité, chauffage défectueux, quartier bruyant. Une inspection professionnelle avant engagement sécurise votre décision.",
    sections: [
      {
        heading: "Ce que couvre notre inspection",
        list: [
          "État général : murs, sols, plafonds, fenêtres.",
          "Plomberie, chauffage et climatisation.",
          "Électricité et éclairage.",
          "Sécurité : serrures, détecteurs, accès.",
          "Environnement : bruit, luminosité, commerces à proximité.",
        ],
      },
      {
        heading: "Livrable",
        paragraphs: [
          "Vous recevez un rapport détaillé avec photos et recommandations. Ce document vous aide à négocier ou à refuser un logement qui ne correspond pas à vos attentes.",
        ],
      },
    ],
    faq: [
      {
        question: "L'inspection remplace-t-elle une inspection réglementée ?",
        answer:
          "Non. Notre rapport est un avis terrain pour vous aider à décider avant signature, pas une certification légale de conformité au bâtiment.",
      },
    ],
    relatedSlugs: ["recherche-logement", "assistance-logistique"],
    relatedBlogSlugs: ["demenager-installer-montreal"],
  },
  {
    slug: "housing-inspection",
    locale: "en",
    alternateSlug: "inspection-logement",
    serviceId: "inspection",
    pageType: "service",
    title: "Housing Inspection Before Signing in Canada",
    metaDescription:
      "On-site visit and detailed inspection report before you sign your lease in Canada. Avoid costly surprises. IR Conciergerie.",
    heroIcon: "fact_check",
    primaryKeyword: "housing inspection before signing Canada",
    lead:
      "Signing a lease remotely without seeing the unit exposes you to costly surprises: moisture, faulty heating, noisy neighbourhood. A professional inspection before you commit secures your decision.",
    sections: [
      {
        heading: "What our inspection covers",
        list: [
          "General condition: walls, floors, ceilings, windows.",
          "Plumbing, heating and cooling.",
          "Electrical and lighting.",
          "Safety: locks, detectors, access.",
          "Environment: noise, light, nearby amenities.",
        ],
      },
      {
        heading: "Deliverable",
        paragraphs: [
          "You receive a detailed report with photos and recommendations. This helps you negotiate or walk away from a unit that doesn't meet your expectations.",
        ],
      },
    ],
    faq: [
      {
        question: "Does this replace a regulated building inspection?",
        answer:
          "No. Our report is practical field advice to help you decide before signing, not a legal building compliance certification.",
      },
    ],
    relatedSlugs: ["housing-search", "full-settlement-assistance"],
    relatedBlogSlugs: ["moving-to-montreal-guide"],
  },

  // —— Premières courses ——
  {
    slug: "premieres-courses",
    locale: "fr",
    alternateSlug: "first-groceries",
    serviceId: "courses",
    pageType: "service",
    title: "Premières courses pour nouveaux arrivants au Canada",
    metaDescription:
      "Approvisionnement de votre logement avant l'arrivée : courses essentielles et produits de base. IR Conciergerie, Montréal, Toronto, Vancouver.",
    heroIcon: "shopping_basket",
    primaryKeyword: "premières courses arrivée Canada",
    lead:
      "Après un long voyage, la dernière chose que vous voulez faire est une file d'attente au supermarché sans connaître les marques ni les rayons. Nous approvisionnons votre logement avant votre arrivée.",
    sections: [
      {
        heading: "Produits essentiels",
        list: [
          "Alimentation de base et boissons.",
          "Produits d'hygiène et de ménage.",
          "Linge de lit et serviettes si nécessaire.",
          "Articles adaptés à votre liste personnalisée.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il déjà avoir les clés du logement ?",
        answer:
          "Oui, ou un accès coordonné avec le propriétaire ou notre service de réception de clés.",
      },
    ],
    relatedSlugs: ["reception-cles-colis", "transfert-aeroport"],
  },
  {
    slug: "first-groceries",
    locale: "en",
    alternateSlug: "premieres-courses",
    serviceId: "courses",
    pageType: "service",
    title: "First Groceries for Newcomers to Canada",
    metaDescription:
      "Stock your home before arrival: essential groceries and basics. IR Conciergerie, Montreal, Toronto, Vancouver.",
    heroIcon: "shopping_basket",
    primaryKeyword: "first groceries arrival Canada",
    lead:
      "After a long trip, the last thing you want is a supermarket queue without knowing brands or aisles. We stock your home before you arrive.",
    sections: [
      {
        heading: "Essential items",
        list: [
          "Basic food and drinks.",
          "Hygiene and cleaning products.",
          "Bedding and towels if needed.",
          "Items from your custom list.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need keys to the unit already?",
        answer:
          "Yes, or coordinated access with the landlord or our key reception service.",
      },
    ],
    relatedSlugs: ["keys-packages", "airport-transfer"],
  },

  // —— Réception clés ——
  {
    slug: "reception-cles-colis",
    locale: "fr",
    alternateSlug: "keys-packages",
    serviceId: "cles",
    pageType: "service",
    title: "Réception de clés et colis pour nouveaux arrivants",
    metaDescription:
      "Réception sécurisée de vos clés, colis et livraisons en votre absence à Montréal, Toronto et Vancouver. IR Conciergerie.",
    heroIcon: "key",
    primaryKeyword: "réception clés colis nouveaux arrivants",
    lead:
      "Vous signez un bail ou commandez du mobilier avant d'arriver ? Quelqu'un doit être sur place pour récupérer les clés et les livraisons. Nous assurons cette réception en toute sécurité.",
    sections: [
      {
        heading: "Cas d'usage fréquents",
        list: [
          "Récupération de clés chez le propriétaire ou l'agent.",
          "Réception de colis Amazon, IKEA ou déménageur.",
          "Remise des clés à votre arrivée.",
          "Inventaire photo des livraisons reçues.",
        ],
      },
    ],
    faq: [
      {
        question: "Êtes-vous disponibles si mon vol est retardé ?",
        answer:
          "Oui, nous coordonnons la remise des clés selon votre heure d'arrivée réelle, en lien avec le transfert aéroport si combiné.",
      },
    ],
    relatedSlugs: ["premieres-courses", "transfert-aeroport"],
  },
  {
    slug: "keys-packages",
    locale: "en",
    alternateSlug: "reception-cles-colis",
    serviceId: "cles",
    pageType: "service",
    title: "Key and Package Reception for Newcomers",
    metaDescription:
      "Secure reception of keys, packages and deliveries in your absence in Montreal, Toronto and Vancouver. IR Conciergerie.",
    heroIcon: "key",
    primaryKeyword: "key package reception newcomers Canada",
    lead:
      "Signing a lease or ordering furniture before you land? Someone must be on site to collect keys and deliveries. We handle secure reception for you.",
    sections: [
      {
        heading: "Common use cases",
        list: [
          "Key pickup from landlord or agent.",
          "Receiving Amazon, IKEA or mover deliveries.",
          "Handing over keys on your arrival.",
          "Photo inventory of received items.",
        ],
      },
    ],
    faq: [
      {
        question: "Are you available if my flight is delayed?",
        answer:
          "Yes. We coordinate key handover based on your actual arrival time, often combined with airport transfer.",
      },
    ],
    relatedSlugs: ["first-groceries", "airport-transfer"],
  },

  // —— Assistance logistique ——
  {
    slug: "assistance-logistique",
    locale: "fr",
    alternateSlug: "full-settlement-assistance",
    serviceId: "logistique",
    pageType: "service",
    title: "Assistance logistique complète pour votre installation au Canada",
    metaDescription:
      "Accompagnement de bout en bout : logement, transfert, inspection, courses et démarches. Forfait installation nouveaux arrivants. IR Conciergerie.",
    heroIcon: "support_agent",
    primaryKeyword: "assistance logistique installation Canada",
    lead:
      "Vous préférez un interlocuteur unique qui coordonne toutes les étapes de votre installation ? Notre assistance logistique complète regroupe les services essentiels dans un parcours structuré, de l'atterrissage à l'emménagement.",
    sections: [
      {
        heading: "Un parcours coordonné",
        paragraphs: [
          "Plutôt que de jongler avec plusieurs prestataires, vous bénéficiez d'un plan d'action unique : dates, priorités et livrables clairs à chaque étape.",
        ],
        list: [
          "Transfert aéroport et accueil.",
          "Recherche et inspection de logement.",
          "Réception clés, courses et logistique du quotidien.",
          "Réservations hébergement temporaire si nécessaire.",
        ],
      },
      {
        heading: "Idéal pour",
        paragraphs: [
          "Familles avec enfants, cadres en relocalisation ou toute personne qui veut déléguer la coordination pour se concentrer sur le travail et l'intégration.",
        ],
      },
    ],
    faq: [
      {
        question: "Puis-je combiner seulement certains services ?",
        answer:
          "Oui. Tous nos services sont modulaires. L'assistance complète est une option pour ceux qui veulent tout centraliser.",
      },
    ],
    relatedSlugs: ["transfert-aeroport", "recherche-logement", "conciergerie-vs-seul"],
    relatedBlogSlugs: ["services-immigration-conciergerie-canada"],
  },
  {
    slug: "full-settlement-assistance",
    locale: "en",
    alternateSlug: "assistance-logistique",
    serviceId: "logistique",
    pageType: "service",
    title: "Full Settlement Logistics Assistance in Canada",
    metaDescription:
      "End-to-end support: housing, transfer, inspection, groceries and errands. Newcomer settlement package. IR Conciergerie.",
    heroIcon: "support_agent",
    primaryKeyword: "full settlement assistance Canada",
    lead:
      "Prefer a single point of contact to coordinate every step of your settlement? Our full logistics assistance bundles essential services into one structured journey, from landing to move-in.",
    sections: [
      {
        heading: "A coordinated journey",
        paragraphs: [
          "Instead of juggling multiple providers, you get one action plan: clear dates, priorities and deliverables at each step.",
        ],
        list: [
          "Airport transfer and welcome.",
          "Housing search and inspection.",
          "Key reception, groceries and daily logistics.",
          "Temporary accommodation bookings if needed.",
        ],
      },
      {
        heading: "Ideal for",
        paragraphs: [
          "Families with children, relocating executives or anyone who wants to delegate coordination and focus on work and integration.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I combine only some services?",
        answer:
          "Yes. All services are modular. Full assistance is an option for those who want everything centralized.",
      },
    ],
    relatedSlugs: ["airport-transfer", "housing-search", "concierge-vs-diy"],
    relatedBlogSlugs: ["canada-immigration-settlement-services"],
  },

  // —— Comparaison ——
  {
    slug: "conciergerie-vs-seul",
    locale: "fr",
    alternateSlug: "concierge-vs-diy",
    pageType: "comparison",
    title: "Conciergerie d'installation vs tout faire seul au Canada",
    metaDescription:
      "Comparer l'accompagnement IR Conciergerie et une installation en autonomie : temps, coût, risques et sérénité pour nouveaux arrivants.",
    heroIcon: "compare",
    primaryKeyword: "conciergerie immigration Canada",
    lead:
      "Beaucoup de nouveaux arrivants tentent de tout gérer seuls pour économiser. En pratique, les semaines perdues, les erreurs de logement et le stress ont un coût réel — souvent supérieur à un accompagnement modulaire.",
    sections: [
      {
        heading: "Deux approches, deux trajectoires",
        paragraphs: [
          "L'installation en autonomie peut fonctionner si vous avez déjà un réseau local, parlez couramment le français ou l'anglais et disposez de plusieurs semaines sans contrainte professionnelle.",
          "Sans ces atouts, une conciergerie d'installation vous fait gagner du temps, réduit les risques et vous permet d'arriver avec un plan — pas une improvisation.",
        ],
      },
    ],
    comparisonRows: sharedComparisonRowsFr,
    faq: [
      {
        question: "Une conciergerie remplace-t-elle un consultant en immigration ?",
        answer:
          "Non. IR Conciergerie gère la vie concrète sur place (logement, transport, logistique). Pour votre statut légal, consultez un représentant réglementé ou IR Immigration.",
      },
      {
        question: "Puis-je commencer par un seul service ?",
        answer:
          "Oui. Nos services sont à la carte dès 80 $ CAD + taxes. Beaucoup de clients commencent par le transfert aéroport ou l'inspection, puis élargissent.",
      },
    ],
    relatedSlugs: ["assistance-logistique", "recherche-logement"],
    relatedBlogSlugs: ["services-immigration-conciergerie-canada", "guide-installation-nouveaux-arrivants-canada"],
  },
  {
    slug: "concierge-vs-diy",
    locale: "en",
    alternateSlug: "conciergerie-vs-seul",
    pageType: "comparison",
    title: "Settlement Concierge vs Doing It Yourself in Canada",
    metaDescription:
      "Compare IR Conciergerie support vs settling on your own: time, cost, risks and peace of mind for newcomers.",
    heroIcon: "compare",
    primaryKeyword: "Canada immigration settlement services",
    lead:
      "Many newcomers try to handle everything alone to save money. In practice, lost weeks, housing mistakes and stress have a real cost — often higher than modular support.",
    sections: [
      {
        heading: "Two approaches, two trajectories",
        paragraphs: [
          "DIY settlement can work if you already have a local network, are fluent in French or English and have several flexible weeks without work pressure.",
          "Without those advantages, a settlement concierge saves time, reduces risk and lets you arrive with a plan — not improvisation.",
        ],
      },
    ],
    comparisonRows: sharedComparisonRowsEn,
    faq: [
      {
        question: "Does a concierge replace an immigration consultant?",
        answer:
          "No. IR Conciergerie handles on-the-ground life (housing, transport, logistics). For legal status, consult a regulated representative or IR Immigration.",
      },
      {
        question: "Can I start with just one service?",
        answer:
          "Yes. Services are à la carte from $80 CAD + tax. Many clients start with airport transfer or inspection, then expand.",
      },
    ],
    relatedSlugs: ["full-settlement-assistance", "housing-search"],
    relatedBlogSlugs: ["canada-immigration-settlement-services", "moving-to-canada-newcomer-guide"],
  },
];
