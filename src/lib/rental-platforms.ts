/** Official rental platform URLs (verified 2026-06). */
export const RENTAL_PLATFORM_URLS = {
  kijiji: {
    fr: "https://www.kijiji.ca/b-apartments-condos/montreal/c37l1700281",
    en: "https://www.kijiji.ca/b-apartments-condos/montreal/c37l1700281",
    label: "Kijiji",
  },
  kangalou: {
    fr: "https://www.kangalou.com",
    en: "https://www.kangalou.com",
    label: "Kangalou",
  },
  centris: {
    fr: "https://www.centris.ca/fr/propriete~a-louer",
    en: "https://www.centris.ca/en/properties~for-rent",
    label: "Centris",
  },
} as const;

export type RentalPlatformLocale = "fr" | "en";

const PLATFORM_NAMES = ["Kijiji", "Kangalou", "Centris"] as const;

const PLATFORM_REGEX = new RegExp(`(${PLATFORM_NAMES.join("|")})`, "g");

function platformUrl(name: string, locale: RentalPlatformLocale): string | undefined {
  switch (name) {
    case "Kijiji":
      return RENTAL_PLATFORM_URLS.kijiji[locale];
    case "Kangalou":
      return RENTAL_PLATFORM_URLS.kangalou[locale];
    case "Centris":
      return RENTAL_PLATFORM_URLS.centris[locale];
    default:
      return undefined;
  }
}

export type RentalPlatformTextPart =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

/** Split plain text into segments, linking Kijiji, Kangalou and Centris when mentioned. */
export function parseRentalPlatformLinks(
  text: string,
  locale: RentalPlatformLocale = "fr",
): RentalPlatformTextPart[] {
  const parts = text.split(PLATFORM_REGEX);
  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const href = platformUrl(part, locale);
      if (href) {
        return { type: "link" as const, label: part, href };
      }
      return { type: "text" as const, value: part };
    });
}
