import type { Locale, Messages } from "../types";
import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { ff } from "./ff";
import { ht } from "./ht";
import { pt } from "./pt";
import { fr } from "./fr";
import { ln } from "./ln";
import { sw } from "./sw";
import { wo } from "./wo";
import { zh } from "./zh";

export const messages: Record<Locale, Messages> = {
  fr,
  en,
  es,
  pt,
  ht,
  zh,
  ar,
  ln,
  sw,
  wo,
  ff,
};

export { fr, en, es, pt, ht, zh, ar, ln, sw, wo, ff };
