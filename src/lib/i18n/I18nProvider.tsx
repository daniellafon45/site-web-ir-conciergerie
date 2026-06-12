import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { messages } from "./locales";
import { LOCALE_HTML_LANG, type Locale, type Messages } from "./types";

const STORAGE_KEY = "ir-conciergerie-locale";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored in messages) return stored as Locale;
  const browser = navigator.language.slice(0, 2);
  if (browser in messages) return browser as Locale;
  return "fr";
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const htmlLang = LOCALE_HTML_LANG[next];
    document.documentElement.lang = htmlLang;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang && lang in messages) {
      setLocale(lang as Locale);
    } else {
      document.documentElement.lang = LOCALE_HTML_LANG[locale];
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: messages[locale],
      dir: locale === "ar" ? "rtl" : "ltr",
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
