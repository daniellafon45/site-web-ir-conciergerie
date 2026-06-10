import { getEmailEnvAsync } from "./env.server";
import { isCloudflareWorkersRuntime } from "./runtime.server";
import { SOUMISSION_CC, SOUMISSION_RECIPIENT } from "./soumission.constants";

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

type ResendFrom = { email: string; name: string };

const DEFAULT_FROM: ResendFrom = {
  email: "conciergerie@ir-immigration.com",
  name: "IR Conciergerie",
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

function parseFromAddress(emailEnv: Record<string, string>): ResendFrom {
  const raw = emailEnv.EMAIL_FROM?.trim();
  if (!raw) return DEFAULT_FROM;

  const match = raw.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    return { name: match[1].trim(), email: match[2].trim() };
  }

  if (raw.includes("@")) {
    return { ...DEFAULT_FROM, email: raw };
  }

  return DEFAULT_FROM;
}

function getFromAddressString(from: ResendFrom): string {
  return `${from.name} <${from.email}>`;
}

function shouldUseResend(emailEnv: Record<string, string>): boolean {
  return isCloudflareWorkersRuntime() || Boolean(emailEnv.RESEND_API_KEY?.trim());
}

function mapResendError(status: number, details: string): SoumissionEmailError {
  if (status === 401) {
    return new SoumissionEmailError(
      "smtp_config",
      "Clé API Resend invalide. Regénérez-la sur resend.com et mettez à jour Cloudflare.",
    );
  }

  if (status === 403) {
    return new SoumissionEmailError(
      "smtp_config",
      "Domaine non autorisé sur Resend. Vérifiez ir-immigration.com dans Resend → Domains.",
    );
  }

  if (status === 422) {
    return new SoumissionEmailError(
      "smtp_send",
      `Paramètres email invalides (Resend 422). ${details.slice(0, 200)}`,
    );
  }

  if (status === 429) {
    return new SoumissionEmailError(
      "smtp_send",
      "Quota Resend dépassé. Réessayez dans quelques minutes.",
    );
  }

  return new SoumissionEmailError(
    "smtp_send",
    "Envoi du courriel impossible via Resend.",
    { cause: new Error(details) },
  );
}

async function sendViaResend(
  data: SoumissionEmailPayload,
  emailEnv: Record<string, string>,
): Promise<void> {
  const apiKey = emailEnv.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new SoumissionEmailError(
      "smtp_config",
      "RESEND_API_KEY manquant. Ajoutez-le dans Cloudflare Pages → Environment variables (Production).",
    );
  }

  const subject = `Récapitulatif soumission — ${data.firstName} ${data.lastName}`;
  const html = buildSoumissionEmailHtml(data);
  const from = parseFromAddress(emailEnv);
  const replyTo = data.email.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [SOUMISSION_RECIPIENT],
      cc: [SOUMISSION_CC],
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Échec Resend:", response.status, details);
    throw mapResendError(response.status, details);
  }
}

async function sendViaSmtp(data: SoumissionEmailPayload, emailEnv: Record<string, string>): Promise<void> {
  const nodemailer = (await import("nodemailer")).default;

  const host = emailEnv.SMTP_HOST;
  const user = emailEnv.SMTP_USER;
  const pass = emailEnv.SMTP_PASS?.trim();
  const port = Number(emailEnv.SMTP_PORT ?? 465);
  const secure = emailEnv.SMTP_SECURE !== "false";
  const from = getFromAddressString(parseFromAddress(emailEnv));

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
      cc: SOUMISSION_CC,
      replyTo: data.email.trim(),
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

export async function sendSoumissionEmail(data: SoumissionEmailPayload): Promise<void> {
  const emailEnv = await getEmailEnvAsync();

  if (shouldUseResend(emailEnv)) {
    await sendViaResend(data, emailEnv);
    return;
  }

  await sendViaSmtp(data, emailEnv);
}
