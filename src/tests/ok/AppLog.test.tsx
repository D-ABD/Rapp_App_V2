// src/tests/tests_Pages/AppLog.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppLog from "../../pages/AppLog";
import { withQueryClient } from "../utilsPourTests";

// ✅ Simulation de Supabase
vi.mock("../../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          data: [
            { id: 1, utilisateur_id: "user1", action: "INSERT", created_at: "2024-01-15" },
          ],
          error: null,
        }),
      }),
    }),
  },
}));

// ✅ Test avec `withQueryClient`
describe("AppLog", () => {
  it("devrait afficher le titre de la page après chargement", async () => {
    render(withQueryClient(<AppLog />));

    // ✅ Attendre que le titre apparaisse après le chargement des logs
    await waitFor(() => expect(screen.getByText("📜 Historique des actions des utilisateurs")).toBeInTheDocument());
  });
});
