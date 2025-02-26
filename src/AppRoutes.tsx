// src/AppRoutes.tsx
import React from "react"; // Importation de React
import { Routes, Route, Navigate } from "react-router-dom"; // Importation des outils de gestion des routes

// Importation des composants de pages
import Accueil from "./pages/Accueil"; // Page d'accueil
import APropos from "./pages/APropos"; // Page "À propos"
import TestSupabase from "./testSupabase";

// Définition du composant `AppRoutes` qui gère la navigation dans l'application
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Route pour la page d'accueil */}
      <Route path="/" element={<Accueil />} />

      {/* Route pour la page "À propos" */}
      <Route path="/a-propos" element={<APropos />} />

      {/* Redirection des pages inconnues vers l'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Route pour le test supabase */}
      <Route path="/test-supabase" element={<TestSupabase />} /> {/* ✅ Ajout de la route */}

    </Routes>
  );
};

// Exportation du composant pour l'utiliser dans `App.tsx`
export default AppRoutes;
