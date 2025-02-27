import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useLogsUtilisateurs } from "../../hooks/useLogsUtilisateurs";
import { withQueryClient } from "../utilsPourTests";

// Simuler Supabase
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

// Composant Test
const TestComponent = () => {
  const { data, isLoading, error } = useLogsUtilisateurs();
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement</p>;

  return (
    <ul>
      {data?.map((log) => (
        <li key={log.id}>{log.action}</li>
      ))}
    </ul>
  );
};

// Test avec QueryClientProvider inclus
describe("useLogsUtilisateurs", () => {
  it("devrait afficher les logs récupérés", async () => {
    render(withQueryClient(<TestComponent />)); // ✅ Plus besoin de QueryClientProvider ici

    await waitFor(() => expect(screen.getByText("INSERT")).toBeInTheDocument());
  });
});
