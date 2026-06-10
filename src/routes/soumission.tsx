import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { PhoneCountrySelect } from "@/components/PhoneCountrySelect";
import { submitSoumission, type SoumissionResult } from "@/lib/api/soumission.functions";
import type { SoumissionEmailErrorCode } from "@/lib/email.server";
import { getDialCodeByCountryId } from "@/lib/dial-codes";
import { SERVICES } from "@/lib/soumission.constants";
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

const STEPS = ["Vos services", "Vos informations", "Détails du projet"];

function getSubmitErrorMessage(code: SoumissionEmailErrorCode): string {
  if (code === "smtp_config") {
    return import.meta.env.DEV
      ? "Configuration email incomplète — renseignez SMTP_PASS dans le fichier .env puis redémarrez le serveur."
      : "Impossible d'envoyer votre demande pour le moment. Veuillez nous contacter directement.";
  }

  if (code === "smtp_send" && import.meta.env.DEV) {
    return "Échec de connexion email (identifiants Hostinger). Vérifiez SMTP_USER=direction@ir-immigration.com et port 587.";
  }

  return "Impossible d'envoyer votre demande pour le moment. Veuillez réessayer ou nous contacter directement.";
}

function SoumissionPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phoneCountry: "CA", phone: "",
    arrival: "", city: "", people: "1", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const canNext =
    (step === 0 && selected.length > 0) ||
    (step === 1 && form.firstName && form.lastName && form.email && form.phone) ||
    step === 2;

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const result: SoumissionResult = await submitSoumission({
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: `${getDialCodeByCountryId(form.phoneCountry)} ${form.phone}`.trim(),
          services: selected,
          arrival: form.arrival || undefined,
          city: form.city || undefined,
          people: form.people || undefined,
          notes: form.notes || undefined,
        },
      });

      if (!result.success) {
        setSubmitError(getSubmitErrorMessage(result.code));
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Impossible d'envoyer votre demande pour le moment. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-page-bg text-text">
      {/* Top bar */}
      <header className="border-b border-line/40 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 py-4 sm:py-5">
          <Link to="/" className="flex items-center gap-3 shrink-0 min-w-0">
            <img alt="IR Conciergerie" className="h-8 sm:h-9 w-auto object-contain" src={logoIrConciergerie} />
          </Link>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] text-muted font-semibold truncate">
            Demande de soumission
          </span>
          <span className="text-[10px] sm:text-[11px] text-muted font-medium shrink-0">
            Étape {Math.min(step + 1, 3)} / 3
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-24 sm:pb-32">
        {!submitted && (
          <>
            {/* Stepper */}
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                {STEPS.map((_, i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-line/60 overflow-hidden">
                    <div
                      className="h-full bg-brand-primary transition-all duration-500"
                      style={{ width: i <= step ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto">
                {STEPS.map((label, i) => (
                  <span
                    key={label}
                    className={`text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold transition shrink-0 ${
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
                  Quels services vous intéressent ?
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  Sélectionnez un ou plusieurs services. Nous adaptons notre accompagnement à vos besoins.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((s) => {
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
                            {s.icon}
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
                  Faisons connaissance.
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  Vos coordonnées nous permettent de revenir vers vous avec une proposition personnalisée.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Prénom" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                  <Field label="Nom" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                  <Field label="Courriel" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <PhoneField
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
                  Parlez-nous de votre projet.
                </h1>
                <p className="text-muted text-lg mb-12 max-w-xl">
                  Quelques détails pour préparer au mieux votre arrivée.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <Field label="Date d'arrivée prévue" type="date" value={form.arrival} onChange={(v) => setForm({ ...form, arrival: v })} />
                  <Field label="Ville d'installation" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <Field label="Nombre de personnes" type="number" value={form.people} onChange={(v) => setForm({ ...form, people: v })} />
                </div>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-2 block">
                    Précisions (optionnel)
                  </span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={5}
                    placeholder="Contexte, attentes spécifiques, animaux, enfants..."
                    className="w-full rounded-xl border-2 border-line/60 bg-white px-4 py-3 text-[15px] focus:border-brand-primary focus:outline-none transition resize-none"
                  />
                </label>

                {/* Recap */}
                <div className="mt-10 p-6 rounded-2xl bg-panel-bg border border-line/40">
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-4">
                    Services sélectionnés
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.map((id) => {
                      const s = SERVICES.find((x) => x.id === id)!;
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 bg-white border border-line/60 rounded-full px-3 py-1.5 text-sm font-medium">
                          <span className="material-symbols-outlined text-[16px] text-brand-primary">{s.icon}</span>
                          {s.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
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
                Précédent
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuer
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
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
              Merci, {form.firstName || "à très bientôt"}.
            </h1>
            <p className="text-muted text-lg max-w-md mx-auto mb-10">
              Votre demande a bien été reçue. Notre équipe revient vers vous sous 24 heures avec une proposition sur mesure.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-all px-8 py-3.5 text-[12px] font-bold uppercase tracking-wider shadow-md"
            >
              Retour à l'accueil
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function PhoneField({
  countryId, phone, onCountryChange, onPhoneChange,
}: {
  countryId: string;
  phone: string;
  onCountryChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-muted mb-2 block">
        Téléphone
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
