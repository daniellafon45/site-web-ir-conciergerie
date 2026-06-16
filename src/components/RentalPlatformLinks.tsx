import type { RentalPlatformLocale } from "@/lib/rental-platforms";
import { parseRentalPlatformLinks } from "@/lib/rental-platforms";

type RentalPlatformLinksProps = {
  text: string;
  locale?: RentalPlatformLocale;
  className?: string;
};

const linkClassName =
  "font-medium text-brand-primary underline underline-offset-2 hover:text-brand-primary/80 transition-colors";

export function RentalPlatformLinks({ text, locale = "fr", className }: RentalPlatformLinksProps) {
  const parts = parseRentalPlatformLinks(text, locale);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.type === "link" ? (
          <a
            key={`${part.label}-${index}`}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {part.label}
          </a>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </span>
  );
}
