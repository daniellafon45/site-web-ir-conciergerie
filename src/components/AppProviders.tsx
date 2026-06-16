import { QueryClientProvider } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { I18nProvider } from "@/lib/i18n/I18nProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  const { queryClient } = useRouteContext({ from: "__root__" });

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>{children}</I18nProvider>
    </QueryClientProvider>
  );
}
