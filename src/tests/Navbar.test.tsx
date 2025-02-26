// src/tests/Navbar.test.tsx
// 📌 Importation des outils nécessaires pour les tests
import { describe, test, expect } from "vitest"; // ✅ Importation de Vitest (framework de test)
import { render, screen } from "@testing-library/react"; // ✅ Importation des outils de test React
import { MemoryRouter } from "react-router-dom"; // ✅ Importation de MemoryRouter pour simuler un routeur en test
import Navbar from "../components/Navbar"; // ✅ Importation du composant à tester

// 📌 `describe()` permet de regrouper plusieurs tests sous un même bloc
describe("Navbar", () => {
  // 📌 `test()` définit un test unitaire (cas de test)
  test("affiche le bon texte", () => {
    // 📌 `render()` sert à afficher le composant en mémoire pour le tester
    render(
      <MemoryRouter> {/* ✅ Simulation d'un Router pour éviter l'erreur `useLocation()` */}
        <Navbar />
      </MemoryRouter>
    );

    // 📌 `screen.getByText()` cherche un élément qui contient le texte "Rap_App"
    //    Si l'élément est trouvé, `expect().toBeInTheDocument()` valide le test
    expect(screen.getByText("Rap_App")).toBeInTheDocument();
  });
});
