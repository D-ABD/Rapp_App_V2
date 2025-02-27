// src/context/AutgContext.tsx
import { createContext } from "react";
import { User } from "@supabase/supabase-js";

// Interface pour définir le contexte de l'utilisateur
export interface AuthContextType {
  user: User | null;
  logout: () => void;
}

// Création du contexte d'authentification
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
