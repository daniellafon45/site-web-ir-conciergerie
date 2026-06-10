import nodemailer from "nodemailer";

import { getSmtpEnv } from "./env.server";
import { SOUMISSION_RECIPIENT } from "./soumission.constants";

export type SoumissionEmailErrorCode = "smtp_config" | "smtp_send";

export class SoumissionEmailError extends Error {
  readonly code: SoumissionEmailErrorCode;

  constructor(code: SoumissionEmailErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "SoumissionEmailError";
    this.code = code;
  }
}

type SoumissionEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
  arrival?: string;
  city?: string;
  people?: string;
  notes?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatField(label: string, value?: string): string {
  const display = value?.trim() ? escapeHtml(value.trim()) : "—";
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;">${label}</td><td style="padding:8px 12px;">${display}</td></tr>`;
}

function buildSoumissionEmailHtml(data: SoumissionEmailPayload): string {
  const servicesList = data.services.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111;max-width:640px;">
      <h2 style="margin:0 0 16px;">Récapitulatif de soumission</h2>
      <p style="margin:0 0 24px;color:#555;">Demande soumise via le site IR Conciergerie.</p>
      <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;">
        ${formatField("Prénom", data.firstName)}
        ${formatField("Nom", data.lastName)}
        ${formatField("Courriel", data.email)}
        ${formatField("Téléphone", data.phone)}
        ${formatField("Date d'arrivée", data.arrival)}
        ${formatField("Ville d'installation", data.city)}
        ${formatField("Nombre de personnes", data.people)}
      </table>
      <h3 style="margin:24px 0 8px;font-size:16px;">Services demandés</h3>
      <ul style="margin:0 0 24px;padding-left:20px;">${servicesList}</ul>
      <h3 style="margin:0 0 8px;font-size:16px;">Précisions</h3>
      <p style="margin:0;white-space:pre-wrap;">${data.notes?.trim() ? escapeHtml(data.notes.trim()) : "—"}</p>
    </div>
  `.trim();
}

function getSmtpConfig() {
  const smtpEnv = getSmtpEnv();

  const host = smtpEnv.SMTP_HOST;
  const user = smtpEnv.SMTP_USER;
  const pass = smtpEnv.SMTP_PASS?.trim();
  const port = Number(smtpEnv.SMTP_PORT ?? 465);
  const secure = smtpEnv.SMTP_SECURE !== "false";
  const from = smtpEnv.EMAIL_FROM ?? "IR Conciergerie <direction@ir-immigration.com>";

  if (!host || !user || !pass) {
    throw new SoumissionEmailError(
      "smtp_config",
      "Configuration SMTP incomplète. Vérifiez SMTP_HOST, SMTP_USER et SMTP_PASS dans le fichier .env.",
    );
  }

  if (pass === "REMPLACER_PAR_MOT_DE_PASSE") {
    throw new SoumissionEmailError(
      "smtp_config",
      "SMTP_PASS n'a pas été configuré dans le fichier .env.",
    );
  }

  return { host, port, secure, user, pass, from };
}

export async function sendSoumissionEmail(data: SoumissionEmailPayload): Promise<void> {
  const { host, port, secure, user, pass, from } = getSmtpConfig();
  const subject = `Récapitulatif soumission — ${data.firstName} ${data.lastName}`;
  const html = buildSoumissionEmailHtml(data);

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transport.verify();
  } catch (error) {
    console.error("Échec de la vérification SMTP:", error);
    throw new SoumissionEmailError(
      "smtp_send",
      "Connexion au serveur SMTP impossible. Vérifiez les identifiants Hostinger.",
      { cause: error },
    );
  }

  try {
    await transport.sendMail({
      from,
      to: SOUMISSION_RECIPIENT,
      replyTo: data.email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Échec de l'envoi SMTP:", error);
    throw new SoumissionEmailError(
      "smtp_send",
      "Envoi du courriel impossible.",
      { cause: error },
    );
  }
}
