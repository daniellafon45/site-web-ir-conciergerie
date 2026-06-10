import fs from "node:fs";
import path from "node:path";

const SMTP_KEYS = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_PORT",
  "SMTP_SECURE",
  "EMAIL_FROM",
] as const;

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseEnvFile(envPath: string): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    const rawValue = trimmed.slice(eq + 1).trim();
    if (!key) continue;

    parsed[key] = unquote(rawValue);
  }

  return parsed;
}

function findEnvFilePath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "creative-showcase-app-main", ".env"),
  ];

  return candidates.find((envPath) => fs.existsSync(envPath)) ?? null;
}

/** Lit la config SMTP en priorisant le fichier .env local sur process.env. */
export function getSmtpEnv(): Record<string, string> {
  const env: Record<string, string> = {};

  for (const key of SMTP_KEYS) {
    if (process.env[key]) env[key] = process.env[key]!;
  }

  const envPath = findEnvFilePath();
  if (envPath) {
    const fileEnv = parseEnvFile(envPath);
    for (const key of SMTP_KEYS) {
      if (fileEnv[key]) env[key] = fileEnv[key];
    }
  }

  return env;
}

/** @deprecated Utiliser getSmtpEnv() */
export function ensureEnvLoaded(): void {
  const smtpEnv = getSmtpEnv();
  for (const [key, value] of Object.entries(smtpEnv)) {
    process.env[key] = value;
  }
}
