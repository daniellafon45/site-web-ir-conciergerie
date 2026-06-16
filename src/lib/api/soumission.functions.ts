import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendSoumissionEmail, SoumissionEmailError, type SoumissionEmailErrorCode } from "../email.server";
import { getServiceTitle, SERVICES, type ServiceId } from "../soumission.constants";

const serviceIdSchema = z.string().refine(
  (id): id is ServiceId => SERVICES.some((s) => s.id === id),
  { message: "Service invalide" },
);

const soumissionSchema = z.object({
  privacyConsent: z.literal(true),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  services: z.array(serviceIdSchema).min(1),
  arrival: z.string().optional(),
  city: z.string().optional(),
  people: z.string().optional(),
  notes: z.string().optional(),
});

export type SoumissionResult =
  | { success: true }
  | { success: false; code: SoumissionEmailErrorCode | "validation" };

export const submitSoumission = createServerFn({ method: "POST" }).handler(
  async ({ data }): Promise<SoumissionResult> => {
    const parsed = soumissionSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Validation soumission:", parsed.error.flatten());
      return { success: false, code: "validation" };
    }

    try {
      await sendSoumissionEmail({
        ...parsed.data,
        services: parsed.data.services.map(getServiceTitle),
      });

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'envoi de la soumission:", error);

      if (error instanceof SoumissionEmailError) {
        return { success: false, code: error.code };
      }

      return { success: false, code: "smtp_send" };
    }
  },
);
