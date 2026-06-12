import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
  className?: string;
};

export function LanguageSwitcher({ compact = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <label className={`inline-flex items-center gap-1.5 shrink-0 ${className}`}>
      <span className="material-symbols-outlined text-[16px] text-muted hidden sm:inline">language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label="Choisir la langue"
        className={`rounded-full border border-line/60 bg-white text-text font-medium cursor-pointer focus:border-brand-primary focus:outline-none transition ${
          compact ? "text-[10px] px-2 py-1 max-w-[5.5rem]" : "text-[11px] px-2.5 py-1.5 sm:px-3 sm:max-w-none"
        }`}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {compact ? code.toUpperCase() : LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
