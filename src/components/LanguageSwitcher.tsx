import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
  className?: string;
};

export function LanguageSwitcher({ compact = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <label className={cn("inline-flex items-center gap-2 shrink-0", className)}>
      <span
        className={cn(
          "material-symbols-outlined text-muted hidden sm:inline",
          compact ? "text-[18px]" : "text-[16px]",
        )}
      >
        language
      </span>
      <span
        className={cn(
          "relative inline-flex items-center rounded-full border border-line/60 bg-white shadow-sm",
          compact ? "h-11 min-w-[7.5rem] max-w-[13rem] sm:h-12" : "h-10 min-w-[9rem]",
        )}
      >
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label="Choisir la langue"
          className={cn(
            "h-full w-full cursor-pointer appearance-none truncate rounded-full bg-transparent text-text transition focus:outline-none",
            compact
              ? "pl-4 pr-8 text-left text-[10px] font-semibold tracking-wide sm:text-xs"
              : "pl-3 pr-7 text-left text-[11px] font-medium sm:text-sm",
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
            compact ? "right-3 h-3.5 w-3.5 sm:h-4 sm:w-4" : "right-3 h-3.5 w-3.5",
          )}
        />
      </span>
    </label>
  );
}
