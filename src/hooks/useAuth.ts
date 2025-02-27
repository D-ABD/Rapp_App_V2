// src/hooks/useAuth.tsxxxxxxxxxx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * 📌 Hook personnalisé pour accéder à l'utilisateur connecté et aux actions d'authentification
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider.");
  }
  return context;
}
