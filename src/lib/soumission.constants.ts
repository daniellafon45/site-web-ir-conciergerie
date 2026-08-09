/** Destinataire principal des soumissions (site IR Conciergerie). */
export const SOUMISSION_RECIPIENT = "info@ir-conciergerie.com";

export const SERVICE_ICONS = {
  transfert: "flight_land",
  inspection: "fact_check",
  recherche: "home_work",
  courses: "shopping_basket",
  accompagnement: "directions_car",
  cles: "key",
  mandat: "luggage",
  logistique: "support_agent",
} as const;

export const SERVICES = [
  { id: "transfert", title: "Transfert aéroport", desc: "Accueil et transfert privé dès votre atterrissage.", icon: "flight_land" },
  { id: "inspection", title: "Inspection de logement", desc: "Visite et rapport détaillé avant signature ou aménagement.", icon: "fact_check" },
  { id: "recherche", title: "Recherche de logement", desc: "Sélection sur mesure de logements selon vos critères.", icon: "home_work" },
  { id: "courses", title: "Premières courses", desc: "Approvisionnement de votre logement avant l'arrivée.", icon: "shopping_basket" },
  { id: "accompagnement", title: "Accompagnement courses", desc: "Un chauffeur-assistant pour vos déplacements et achats.", icon: "directions_car" },
  { id: "cles", title: "Réception clés & colis", desc: "Réception sécurisée de vos clés ou colis en votre absence.", icon: "key" },
  { id: "mandat", title: "Mandat hôtels / vols / Airbnb", desc: "Recherche et réservation de vos séjours et déplacements.", icon: "luggage" },
  { id: "logistique", title: "Assistance logistique complète", desc: "Gestion de bout en bout de votre installation.", icon: "support_agent" },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];

export function getServiceTitle(id: string): string {
  return SERVICES.find((s) => s.id === id)?.title ?? id;
}
