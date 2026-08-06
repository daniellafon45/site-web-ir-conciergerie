import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
  /** Pleine largeur pour le menu mobile */
  menu?: boolean;
  className?: string;
};

export function LanguageSwitcher({ compact = false, menu = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const label = LOCALE_LABELS[locale];

  return (
    <label className={cn(menu ? "flex w-full items-center gap-3" : "inline-flex items-center gap-2 shrink-0", className)}>
      <span
        className={cn(
          "material-symbols-outlined text-muted shrink-0",
          menu ? "inline text-[20px]" : "hidden sm:inline",
          compact && !menu ? "text-[18px]" : !menu ? "text-[16px]" : "",
        )}
      >
        language
      </span>
      <span
        className={cn(
          "relative inline-flex items-center rounded-full border border-line/60 bg-white shadow-sm",
          menu
            ? "h-12 w-full min-w-0"
            : cn(
                "w-auto max-w-[42vw] sm:max-w-[16rem]",
                compact ? "h-10 sm:h-12" : "h-10",
              ),
        )}
      >
        {/* Hidden sizer so the closed select hugs the current label width */}
        {!menu && (
          <span
            aria-hidden
            className={cn(
              "invisible pointer-events-none whitespace-nowrap px-3 pr-7",
              compact
                ? "text-[9px] font-semibold tracking-wide sm:px-4 sm:pr-8 sm:text-xs"
                : "text-[10px] font-medium sm:text-sm",
            )}
          >
            {label}
          </span>
        )}
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label="Choisir la langue"
          className={cn(
            "cursor-pointer appearance-none truncate rounded-full bg-transparent text-text transition focus:outline-none",
            menu
              ? "h-full w-full min-w-0 pl-4 pr-9 text-left text-sm font-semibold"
              : cn(
                  "absolute inset-0 h-full w-full",
                  compact
                    ? "pl-3 pr-7 text-left text-[9px] font-semibold tracking-wide sm:pl-4 sm:pr-8 sm:text-xs"
                    : "pl-3 pr-7 text-left text-[10px] font-medium sm:text-sm",
                ),
          )}
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted",
            compact ? "right-2.5 h-3.5 w-3.5 sm:right-3 sm:h-4 sm:w-4" : "right-2.5 h-3.5 w-3.5",
          )}
        />
      </span>
    </label>
  );
}
