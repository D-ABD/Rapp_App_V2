// src/context/AuthProvider.tsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext"; // ✅ Utilisation correcte du contexte
import { User } from "@supabase/supabase-js";

/**
 * 📌 Fournisseur du contexte d'authentification
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Vérifier si un utilisateur est connecté au chargement de l'application
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    // Écouteur d'événements pour détecter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
