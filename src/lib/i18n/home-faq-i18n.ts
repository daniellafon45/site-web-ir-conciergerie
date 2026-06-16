export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type HomeFaqStrings = {
  title: string;
  subtitle: string;
  guideLink: string;
  items: HomeFaqItem[];
};

export const HOME_FAQ_FR: HomeFaqStrings = {
  title: "Questions fréquentes sur l'installation à Montréal",
  subtitle:
    "Familles et étudiants internationaux : réponses concrètes pour trouver un logement et s'installer sans stress.",
  guideLink: "Lire le guide complet : trouver un logement à Montréal depuis l'étranger",
  items: [
    {
      question: "Comment trouver un logement à Montréal depuis l'étranger ?",
      answer:
        "Commencez 6 à 8 semaines avant l'arrivée sur Kijiji, Kangalou et Centris. Définissez budget et quartiers, exigez une visite vidéo ou une inspection sur place avant signature, et évitez tout dépôt illégal au Québec.",
    },
    {
      question: "Combien de temps avant l'arrivée faut-il commencer ?",
      answer:
        "Idéalement 6 à 8 semaines. Si vous visez le 1er juillet (date majeure des baux montréalais), commencez en avril. Les étudiants doivent aussi contacter le logement universitaire dès l'admission.",
    },
    {
      question: "Peut-on signer un bail montréalais à distance ?",
      answer:
        "Oui, si le propriétaire accepte. Exigez une visite vidéo en direct, un rapport d'inspection et la lecture complète du bail. Ne versez aucun paiement avant signature d'un contrat légal.",
    },
    {
      question: "Quels pièges éviter en cherchant depuis l'étranger ?",
      answer:
        "Dépôt de garantie (illégal au Québec), annonces trop belles pour être vraies, refus de visite, virement avant contrat. Vérifiez l'adresse sur Google Street View.",
    },
    {
      question: "Une conciergerie vaut-elle le coût pour une famille ou un étudiant ?",
      answer:
        "Si vous n'avez pas de réseau local, oui — surtout pour visiter et inspecter avant signature. IR Conciergerie propose des services à la carte dès 80 $ CAD + taxes, sans forfait corporate obligatoire.",
    },
    {
      question: "Quels services propose IR Conciergerie à Montréal ?",
      answer:
        "Transfert aéroport YUL, recherche active de logement, inspection avant signature, premières courses, réception de clés et assistance logistique complète. Services modulaires à Montréal, Toronto et Vancouver.",
    },
  ],
};

export const HOME_FAQ_EN: HomeFaqStrings = {
  title: "Frequently asked questions about settling in Montreal",
  subtitle:
    "Families and international students: practical answers to find housing and settle without stress.",
  guideLink: "Read the full guide: finding housing in Montreal from abroad",
  items: [
    {
      question: "How do I find housing in Montreal from abroad?",
      answer:
        "Start 6 to 8 weeks before arrival on Kijiji, Kangalou and Centris. Set your budget and neighbourhoods, require a video tour or on-site inspection before signing, and avoid illegal deposits in Quebec.",
    },
    {
      question: "How far in advance should I start?",
      answer:
        "Ideally 6 to 8 weeks. If you are targeting July 1st (major Montreal lease date), start in April. Students should also contact university housing as soon as they are admitted.",
    },
    {
      question: "Can I sign a Montreal lease remotely?",
      answer:
        "Yes, if the landlord agrees. Require a live video tour, an inspection report and a full lease review. Do not send any payment before signing a legal contract.",
    },
    {
      question: "What pitfalls should I avoid when searching from abroad?",
      answer:
        "Security deposits (illegal in Quebec), listings too good to be true, refusal of viewings, transfers before contract. Verify the address on Google Street View.",
    },
    {
      question: "Is a concierge worth it for a family or student?",
      answer:
        "If you have no local network, yes — especially to visit and inspect before signing. IR Conciergerie offers à la carte services from $80 CAD + tax, with no mandatory corporate package.",
    },
    {
      question: "What services does IR Conciergerie offer in Montreal?",
      answer:
        "YUL airport transfer, active housing search, pre-signing inspection, first groceries, key reception and full logistics support. Modular services in Montreal, Toronto and Vancouver.",
    },
  ],
};

export function getHomeFaqForLocale(locale: string): HomeFaqStrings {
  return locale === "en" ? HOME_FAQ_EN : HOME_FAQ_FR;
}
