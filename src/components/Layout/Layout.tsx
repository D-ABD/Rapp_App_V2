import React from "react";
import Navbar from "./Navbar"; // Importez la Navbar
import Footer from "./Footer";

/**
 * Composant `Layout`
 * -------------------
 * 📌 Encapsule la structure commune de l'application (Navbar, contenu principal, etc.).
 * 🔗 Utilisé pour éviter la duplication de code dans chaque page.
 */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-grow bg-gray-100">
        {children}
      </main>

      {/* Footer (optionnel) */}
      <Footer />
    </div>
  );
};

export default Layout;