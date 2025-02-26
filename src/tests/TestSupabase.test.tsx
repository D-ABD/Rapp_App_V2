// src/tests/TestSupabase.test.tsx
// 📌 Importation des outils nécessaires pour les tests
import { describe, test, expect } from "vitest"; // ✅ Importation de Vitest (framework de test)
import { render, screen } from "@testing-library/react"; // ✅ Importation des outils de test React
import TestSupabase from "../testSupabase"; // ✅ Importation du composant à tester

// 📌 `describe()` permet de regrouper plusieurs tests sous un même bloc
describe("TestSupabase", () => {
  // 📌 `test()` définit un test unitaire (cas de test)
  test("affiche le titre correctement", () => {
    // 📌 `render()` sert à afficher le composant en mémoire pour le tester
    render(<TestSupabase />);

    // 📌 `screen.getByText(/Test Connexion Supabase/i)` recherche un texte
    //    - L'expression `/Test Connexion Supabase/i` est une regex qui ignore la casse
    //    - Cela signifie que `test connexion supabase` ou `TEST CONNEXION SUPABASE` fonctionneraient aussi
    const titleElement = screen.getByText(/Test Connexion Supabase/i);

    // 📌 Vérifie que le texte a bien été trouvé dans le composant
    expect(titleElement).toBeInTheDocument();
  });
});

