import type { Locale, Messages } from "../types";
import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ln } from "./ln";
import { sw } from "./sw";
import { wo } from "./wo";
import { zh } from "./zh";

export const messages: Record<Locale, Messages> = {
  fr,
  en,
  es,
  zh,
  ar,
  ln,
  sw,
  wo,
};

export { fr, en, es, zh, ar, ln, sw, wo };
