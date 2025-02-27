// utilsPourTests.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Création d'un QueryClient unique pour les tests
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // Désactive les re-tentatives auto
  },
});

// ✅ Fonction pour envelopper un composant avec QueryClientProvider
export const withQueryClient = (component: React.ReactNode) => (
  <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);
