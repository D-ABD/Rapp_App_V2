// src/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Importation des pages
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Dashboard from "./pages/Dashboard";
import TestSupabase from "./testSupabase";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth"; // ✅ Import du hook d'authentification
import Parametres from "./pages/Parametres";

// ✅ Composant qui gère les routes de l'application
const AppRoutes: React.FC = () => {
  const { user } = useAuth(); // ✅ Vérifier si l'utilisateur est connecté

  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<Accueil />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/test-supabase" element={<TestSupabase />} />

      {/* 🔄 Redirection automatique des utilisateurs connectés depuis `/login` */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />

      {/* Pages protégées (nécessitent une connexion) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/parametres" element={<ProtectedRoute><Parametres /></ProtectedRoute>} /> {/* ✅ Route protégée */}


      {/* Redirection des pages inconnues vers l'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
