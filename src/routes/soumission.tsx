import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PhoneCountrySelect } from "@/components/PhoneCountrySelect";
import { SeoHead } from "@/components/SeoHead";
import { submitSoumission, type SoumissionResult } from "@/lib/api/soumission.functions";
import type { SoumissionEmailErrorCode } from "@/lib/email.server";
import { getDialCodeByCountryId } from "@/lib/dial-codes";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { SERVICE_ICONS } from "@/lib/soumission.constants";
import logoIrConciergerie from "@/assets/logo-ir-conciergerie.png";

export const Route = createFileRoute("/soumission")({
  head: () => ({
    meta: [
      { title: "Demander une soumission — IR Conciergerie" },
      { name: "description", content: "Obtenez une soumission personnalisée pour votre installation au Canada en trois étapes simples." },
    ],
  }),
  component: SoumissionPage,
});

function SoumissionPage() {
  const { t } = useI18n();

  const getSubmitErrorMessage = (code: SoumissionEmailErrorCode | "validation"): string => {
    if (code === "validation") return t.soumission.errors.validation;
    if (code === "smtp_config") {
      return import.meta.env.DEV
        ? t.soumission.errors.smtpSendDev
        : t.soumission.errors.smtpConfig;
    }
    if (code === "smtp_send" && import.meta.env.DEV) return t.soumission.errors.smtpSendDev;
    return t.soumission.errors.generic;
  };

  const getClientSubmitErrorMessage = (error: unknown): string => {
    const message = error instanceof Error ? error.message : String(error);
    if (/invalid email|Invalid email|validation.*email/i.test(message)) return t.soumission.errors.email;
    if (/fetch|network|failed to fetch|NetworkError|ECONNREFUSED/i.test(message)) return t.soumission.errors.network;
    if (import.meta.env.DEV) return `Erreur lors de l'envoi : ${message}`;
    return t.soumission.errors.generic;
  };

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phoneCountry: "CA", phone: "",
    arrival: "", city: "", people: "1", notes: "",
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const canNext =
    (step === 0 && selected.length > 0) ||
    (step === 1 && form.firstName && form.lastName && form.email && form.phone) ||
    (step === 2 && privacyConsent);

  const submit = async () => {
    if (!privacyConsent) {
      setSubmitError(t.soumission.consentRequired);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const result: SoumissionResult = await submitSoumission({
        data: {
          privacyConsent: true,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: `${getDialCodeByCountryId(form.phoneCountry)} ${form.phone}`.trim(),
          services: selected,
          arrival: form.arrival || undefined,
          city: form.city?.trim() || undefined,
          people: form.people || undefined,
          notes: form.notes?.trim() || undefined,
        },
      });

      if (!result.success) {
        setSubmitError(getSubmitErrorMessage(result.code));
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Erreur soumission formulaire:", error);
      setSubmitError(getClientSubmitErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-text">
      <SeoHead page="soumission" />
      {/* Top bar */}
      <header className="border-b border-line/40 bg-white/95 backdrop-blur-xl sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-5">
          <Link to="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <img
              alt="IR Conciergerie"
              className="h-8 w-auto max-w-[6.75rem] object-contain object-left sm:max-w-[8rem] sm:h-9 md:max-w-none"
              src={logoIrConciergerie}
            />
          </Link>
          <span className="hidden lg:inline text-[11px] uppercase tracking-[0.18em] text-muted font-semibold truncate max-w-[12rem] xl:max-w-none">
            {t.soumission.pageTitle}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher compact />
            </div>
            <span className="text-[10px] sm:text-[11px] text-muted font-medium whitespace-nowrap rounded-full border border-line/50 px-2.5 py-1.5 sm:border-0 sm:px-0 sm:py-0">
              {t.soumission.stepOf} {Math.min(step + 1, 3)}/3
            </span>
          </div>
        </div>
        <div className="sm:hidden border-t border-line/30 px-3 py-2.5">
          <LanguageSwitcher menu />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-24 sm:pb-32">
        {!submitted && (
          <>
            {/* Stepper */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                {t.soumission.steps.map((_, i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-line/60 overflow-hidden">
                    <div
                      className="h-full bg-brand-primary transition-all duration-500"
                      style={{ width: i <= step ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                {t.soumission.steps.map((label, i) => (
                  <span
                    key={label}
                    className={`flex-1 min-w-0 text-center text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold transition leading-snug ${
                      i <= step ? "text-brand-primary" : "text-muted"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Step content */}
            {step === 0 && (
              <section>
                <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-bold tracking-tighter leading-[1.05] mb-4">
                  {t.soumission.step0Title}
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  {t.soumission.step0Desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.soumission.services.map((s) => {
                    const icon = SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS];
                    const active = selected.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        className={`text-left p-6 rounded-2xl border-2 transition-all group ${
                          active
                            ? "border-brand-primary bg-brand-primary/5 shadow-md"
                            : "border-line/60 bg-white hover:border-brand-primary/40 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span
                            className={`material-symbols-outlined text-[28px] transition ${
                              active ? "text-brand-primary" : "text-text/70"
                            }`}
                          >
                            {icon}
                          </span>
                          <span
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                              active
                                ? "border-brand-primary bg-brand-primary text-white"
                                : "border-line/80 bg-transparent"
                            }`}
                          >
                            {active && (
                              <span className="material-symbols-outlined text-[16px]">check</span>
                            )}
                          </span>
                        </div>
                        <h3 className="font-bold text-[17px] mb-1.5 tracking-tight">{s.title}</h3>
                        <p className="text-sm text-muted leading-snug">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {step === 1 && (
              <section>
                <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-bold tracking-tighter leading-[1.05] mb-4">
                  {t.soumission.step1Title}
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  {t.soumission.step1Desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={t.soumission.firstName} value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                  <Field label={t.soumission.lastName} value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                  <Field label={t.soumission.email} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <PhoneField
                    label={t.soumission.phone}
                    countryId={form.phoneCountry}
                    phone={form.phone}
                    onCountryChange={(v) => setForm({ ...form, phoneCountry: v })}
                    onPhoneChange={(v) => setForm({ ...form, phone: v })}
                  />
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-bold tracking-tighter leading-[1.05] mb-4">
                  {t.soumission.step2Title}
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  {t.soumission.step2Desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <Field label={t.soumission.arrival} type="date" value={form.arrival} onChange={(v) => setForm({ ...form, arrival: v })} />
                  <Field label={t.soumission.city} value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <Field label={t.soumission.people} type="number" value={form.people} onChange={(v) => setForm({ ...form, people: v })} />
                </div>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-2 block">
                    {t.soumission.notes}
                  </span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={5}
                    placeholder={t.soumission.notesPlaceholder}
                    className="w-full rounded-xl border-2 border-line/60 bg-white px-4 py-3 text-[15px] focus:border-brand-primary focus:outline-none transition resize-none"
                  />
                </label>

                {/* Recap */}
                <div className="mt-10 p-6 rounded-2xl bg-white border border-line/40">
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-4">
                    {t.soumission.selectedServices}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((id) => {
                      const s = t.soumission.services.find((x) => x.id === id)!;
                      const icon = SERVICE_ICONS[id as keyof typeof SERVICE_ICONS];
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 bg-white border border-line/60 rounded-full px-3 py-1.5 text-sm font-medium">
                          <span className="material-symbols-outlined text-[16px] text-brand-primary">{icon}</span>
                          {s.title}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <label className="mt-8 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => {
                      setPrivacyConsent(e.target.checked);
                      if (e.target.checked) setSubmitError(null);
                    }}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-line/60 text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="text-sm text-muted leading-relaxed">
                    {t.soumission.consentLabel}{" "}
                    <Link to="/confidentialite" className="text-brand-primary hover:text-brand-primary/80 underline underline-offset-2">
                      {t.privacy.learnMore}
                    </Link>
                  </span>
                </label>
              </section>
            )}

            {submitError && (
              <p className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            {/* Nav buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-line/40">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm font-semibold text-text/70 hover:text-brand-primary transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center sm:justify-start gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                {t.soumission.previous}
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.soumission.continue}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting || !canNext}
                  className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? t.soumission.submitting : t.soumission.submit}
                  <span className="material-symbols-outlined text-[18px]">
                    {submitting ? "hourglass_top" : "send"}
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        {submitted && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-[40px] text-brand-primary">check</span>
            </div>
            <h1 className="text-[32px] sm:text-[44px] md:text-[56px] font-bold tracking-tighter leading-[1.05] mb-4">
              {t.soumission.thankYou}, {form.firstName || "…"}.
            </h1>
            <p className="text-muted text-lg max-w-md mx-auto mb-10">
              {t.soumission.thankYouBody}{" "}
              <strong className="text-text">{form.email}</strong>.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md"
            >
              {t.soumission.backHome}
            </Link>
          </div>
        )}
      </main>

      <footer className="border-t border-line/40 py-6 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
        <Link
          to="/services"
          className="text-sm text-muted hover:text-brand-primary transition-colors underline underline-offset-2"
        >
          {t.footer.services}
        </Link>
        <Link
          to="/blog"
          className="text-sm text-muted hover:text-brand-primary transition-colors underline underline-offset-2"
        >
          {t.footer.links.blog}
        </Link>
        <Link
          to="/confidentialite"
          className="text-sm text-muted hover:text-brand-primary transition-colors underline underline-offset-2"
        >
          {t.footer.links.privacy}
        </Link>
        <Link
          to="/conditions-utilisation"
          className="text-sm text-muted hover:text-brand-primary transition-colors underline underline-offset-2"
        >
          {t.footer.links.terms}
        </Link>
      </footer>
    </div>
  );
}

function PhoneField({
  label, countryId, phone, onCountryChange, onPhoneChange,
}: {
  label: string;
  countryId: string;
  phone: string;
  onCountryChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-2 block">
        {label}
      </span>
      <div className="flex gap-2">
        <PhoneCountrySelect
          value={countryId}
          onChange={onCountryChange}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="514 555 1234"
          className="min-w-0 flex-1 rounded-xl border-2 border-line/60 bg-white px-4 py-3 text-[15px] focus:border-brand-primary focus:outline-none transition"
        />
      </div>
    </label>
  );
}

function Field({
  label, value, onChange, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-2 block">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-line/60 bg-white px-4 py-3 text-[15px] focus:border-brand-primary focus:outline-none transition"
      />
    </label>
  );
}
