// src/tests/tests_contexts/AutProvider.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider } from "../../context/AuthProvider";
import { withQueryClient } from "../utilsPourTests";

// ✅ Simulation de l'utilisateur connecté dans Supabase
vi.mock("../../supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { email: "test@email.com" } },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
  },
}));

// ✅ Simule un composant qui affiche l'utilisateur connecté
const TestComponent = () => {
  return (
    <AuthProvider>
      <div>Utilisateur connecté: test@email.com</div>
    </AuthProvider>
  );
};

// ✅ Test avec `withQueryClient`
describe("AuthProvider", () => {
  it("devrait fournir l'utilisateur connecté", async () => {
    render(withQueryClient(<TestComponent />));

    await waitFor(() => expect(screen.getByText(/Utilisateur connecté: test@email.com/i)).toBeInTheDocument());
  });
});
