// Simule d'anciennes variables Vite qui causaient l'erreur 535
process.env.SMTP_HOST = "smtp.hostinger.com";
process.env.SMTP_USER = "info@ir-conciergerie.com";
process.env.SMTP_PASS = "wrong-password";
process.env.SMTP_PORT = "465";
process.env.SMTP_SECURE = "true";

const { sendSoumissionEmail } = await import("../src/lib/email.server.ts");

await sendSoumissionEmail({
  firstName: "Test",
  lastName: "Formulaire",
  email: "test@example.com",
  phone: "+1 514 555 1234",
  services: ["Transfert aéroport", "Inspection de logement"],
  arrival: "2026-06-26",
  city: "Montreal",
  people: "1",
  notes: "Test avec stale process.env",
});

console.log("EMAIL_SENT_OK");
