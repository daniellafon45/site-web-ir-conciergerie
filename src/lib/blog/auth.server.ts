import fs from "node:fs";
import path from "node:path";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "ir_blog_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const ADMIN_KEYS = ["ADMIN_BLOG_USER", "ADMIN_BLOG_PASSWORD", "ADMIN_BLOG_SESSION_SECRET"] as const;

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

function readEnvFile(): Record<string, string> {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return {};
    const parsed: Record<string, string> = {};
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      parsed[trimmed.slice(0, eq).trim()] = unquote(trimmed.slice(eq + 1));
    }
    return parsed;
  } catch {
    return {};
  }
}

async function readCloudflareAdminEnv(): Promise<Record<string, string>> {
  const env: Record<string, string> = {};
  try {
    // @ts-expect-error Cloudflare Workers runtime module
    const { env: cfEnv } = await import("cloudflare:workers");
    for (const key of ADMIN_KEYS) {
      const value = cfEnv[key as keyof typeof cfEnv];
      if (typeof value === "string" && value.trim()) env[key] = value.trim();
    }
  } catch {
    // hors Workers
  }
  return env;
}

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(signature);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function getAdminAuthConfig(): Promise<{
  user: string;
  password: string;
  sessionSecret: string;
}> {
  const fileEnv = readEnvFile();
  const cfEnv = await readCloudflareAdminEnv();
  const fromProcess: Record<string, string> = {};
  for (const key of ADMIN_KEYS) {
    if (process.env[key]) fromProcess[key] = process.env[key]!;
  }
  const merged = { ...fileEnv, ...fromProcess, ...cfEnv };

  const user = (merged.ADMIN_BLOG_USER ?? "").trim();
  const password = (merged.ADMIN_BLOG_PASSWORD ?? "").trim();
  const sessionSecret =
    (merged.ADMIN_BLOG_SESSION_SECRET ?? "").trim() || `ir-blog-${user}-${password}`.slice(0, 64);

  return { user, password, sessionSecret };
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const config = await getAdminAuthConfig();
  if (!config.user || !config.password) return false;
  return safeEqual(username.trim(), config.user) && safeEqual(password, config.password);
}

export async function createAdminSession(): Promise<void> {
  const { user, sessionSecret } = await getAdminAuthConfig();
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${user}|${exp}`;
  const token = `${payload}.${await sign(payload, sessionSecret)}`;
  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession(): Promise<void> {
  deleteCookie(COOKIE_NAME, { path: "/" });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = getCookie(COOKIE_NAME);
  if (!token) return false;
  const { user, sessionSecret } = await getAdminAuthConfig();
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = await sign(payload, sessionSecret);
  if (!safeEqual(signature, expected)) return false;
  const [sessionUser, expRaw] = payload.split("|");
  const exp = Number(expRaw);
  if (!sessionUser || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(sessionUser, user);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("UNAUTHORIZED");
  }
}
