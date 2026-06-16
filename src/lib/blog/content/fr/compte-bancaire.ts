import type { BlogPost } from "../types";

export const compteBancaire: BlogPost = {
  slug: "compte-bancaire-nouveaux-arrivants-canada",
  locale: "fr",
  alternateSlug: "bank-account-newcomers-canada",
  title: "Ouvrir un compte bancaire au Canada quand on est nouvel arrivant",
  metaDescription:
    "Compte bancaire pour nouveaux arrivants au Canada : banques, documents, délais et cartes de crédit. Guide pratique IR Conciergerie.",
  excerpt:
    "Un compte bancaire canadien est indispensable dès les premiers jours. Voici comment l'ouvrir, quels documents préparer et quelles offres existent pour les nouveaux arrivants.",
  category: "Finances",
  readingMinutes: 7,
  publishedAt: "2026-06-09",
  imageKey: "bank-account",
  heroImageAlt: "Nouvel arrivant ouvrant un compte bancaire avec un conseiller au Canada",
  primaryKeyword: "compte bancaire nouveaux arrivants Canada",
  relatedSlugs: [
    "recherche-logement-nouveaux-arrivants-canada",
    "guide-installation-nouveaux-arrivants-canada",
    "demenager-installer-toronto",
  ],
  lead:
    "Ouvrir un compte bancaire au Canada est l'une des premières démarches des nouveaux arrivants : sans compte local, difficile de recevoir un salaire, payer le loyer ou souscrire des services. Les banques canadiennes proposent des programmes dédiés, à condition d'arriver avec les bons documents.",
  sections: [
    {
      heading: "Pourquoi ouvrir un compte rapidement",
      paragraphs: [
        "Dès votre arrivée, vous aurez besoin d'un compte pour : recevoir votre paie, payer le loyer par virement, effectuer des achats quotidiens et constituer un historique de crédit au Canada.",
        "Sans numéro d'assurance sociale (NAS), certaines banques acceptent tout de même l'ouverture avec passeport et permis d'immigration. Le NAS peut être ajouté ultérieurement.",
      ],
    },
    {
      heading: "Documents généralement requis",
      paragraphs: [
        "Préparez les originaux et des copies numériques avant votre rendez-vous en succursale ou votre demande en ligne.",
      ],
      list: [
        "Passeport valide.",
        "Permis de résidence permanente, permis de travail ou permis d'études.",
        "Preuve d'adresse canadienne (bail, lettre d'accueil, facture) — parfois exigible dans les 30 jours.",
        "Numéro d'assurance sociale (NAS) si déjà obtenu.",
        "Coordonnées et preuve de statut d'immigration (Confirmation de résidence permanente, etc.).",
      ],
    },
    {
      heading: "Banques et programmes nouveaux arrivants",
      paragraphs: [
        "Les cinq grandes banques — RBC, TD, BMO, Scotiabank et CIBC — proposent des forfaits « Newcomer » ou équivalent : frais mensuels gratuits pendant 12 mois, carte de crédit sans historique canadien, taux préférentiels sur transferts internationaux.",
        "Des néobanques (Tangerine, Simplii Financial) offrent des comptes sans frais avec ouverture en ligne. Elles conviennent bien en complément d'une banque traditionnelle.",
        "Comparez les frais de virement international si vous devez transférer des économies depuis votre pays d'origine — les taux et commissions varient significativement.",
      ],
    },
    {
      heading: "Carte de crédit et cote de crédit",
      paragraphs: [
        "La cote de crédit canadienne (Equifax, TransUnion) démarre à zéro à l'arrivée. Les programmes nouveaux arrivants facilitent l'obtention d'une première carte de crédit, souvent avec limite modeste.",
        "Utiliser la carte et payer le solde à temps construit votre historique — essentiel pour louer un logement, souscrire un forfait mobile ou financer un véhicule plus tard.",
        "Évitez d'accumuler plusieurs demandes de crédit simultanées : chaque vérification peut temporairement affecter votre dossier.",
      ],
    },
    {
      heading: "Conseils pratiques avant et après l'ouverture",
      paragraphs: [
        "Si possible, prenez rendez-vous en succursale dès votre première semaine. Les délais peuvent être longs en période de forte affluence (rentrée universitaire, été).",
        "IR Conciergerie peut vous accompagner dans vos premiers déplacements et démarches logistiques pendant que vous finalisez l'installation — y compris l'orientation vers les services bancaires de votre quartier.",
      ],
    },
  ],
  faq: [
    {
      question: "Puis-je ouvrir un compte avant d'arriver au Canada ?",
      answer:
        "Certaines banques permettent une pré-ouverture en ligne depuis l'étranger. Vérifiez les conditions sur le site de la banque choisie selon votre statut d'immigration.",
    },
    {
      question: "Combien de temps pour obtenir une carte de débit ?",
      answer:
        "La carte de débit est souvent émise le jour même en succursale ou envoyée par courrier sous 5 à 10 jours ouvrables.",
    },
    {
      question: "IR Conciergerie ouvre-t-elle un compte pour moi ?",
      answer:
        "Non. L'ouverture bancaire reste personnelle. Nous facilitons votre installation et vos déplacements pour vous concentrer sur ces démarches.",
    },
  ],
};
