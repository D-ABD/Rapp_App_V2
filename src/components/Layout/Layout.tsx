// src/components/Layout/Layout.tsx
import React from "react";
import Navbar from "./Navbar"; // Import de la Navbar
import Footer from "./Footer"; // Import du Footer
import { useAuth } from "../../hooks/useAuth"; // ✅ Import du hook d'authentification

/**
 * 📌 Composant `Layout`
 * ---------------------
 * 🔹 Encapsule la structure commune (Navbar, contenu principal, Footer).
 * 🔹 Affiche l'utilisateur connecté et un bouton de déconnexion.
 */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth(); // ✅ Récupération de l'utilisateur connecté

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barre de navigation */}
      <Navbar />

      {/* Affichage de l'utilisateur connecté */}
      <header className="bg-blue-500 text-white text-center py-2">
        {user ? (
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <p className="text-lg">👤 Connecté en tant que : {user.email}</p>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <p className="text-lg">🔑 Vous n'êtes pas connecté</p>
        )}
      </header>

      {/* Contenu principal */}
      <main className="flex-grow bg-gray-100 p-6">{children}</main>

      {/* Footer (optionnel) */}
      <Footer />
    </div>
  );
};

export default Layout;
