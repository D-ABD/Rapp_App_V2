// src/hooks/useLogUtilisateurs.ts
import { useQuery } from "@tanstack/react-query"; // ✅ Importation du hook React Query pour gérer les requêtes et le cache
import { supabase } from "../supabaseClient"; // ✅ Importation du client Supabase

/**
 * 📌 Hook personnalisé `useLogsUtilisateurs`
 * -----------------------------------------
 * 🔹 Permet de récupérer les logs des actions des utilisateurs depuis Supabase.
 * 🔹 Utilise `react-query` pour gérer la requête et optimiser les performances.
 * 🔹 Retourne `data` (les logs), `isLoading` (chargement), et `error` (en cas de problème).
 */
export const useLogsUtilisateurs = () => {
  return useQuery({
    queryKey: ["logs_utilisateurs"], // ✅ Clé unique pour le cache React Query (évite les requêtes inutiles)
    queryFn: async () => {
      // 📌 Exécution de la requête pour récupérer les logs
      const { data, error } = await supabase
        .from("logs_utilisateurs") // ✅ Sélection de la table `logs_utilisateurs`
        .select("id, utilisateur_id, action, details, created_at") // ✅ Sélection des colonnes pertinentes
        .order("created_at", { ascending: false }); // ✅ Tri par date (du plus récent au plus ancien)

      if (error) throw error; // ❌ En cas d'erreur, on lève une exception

      return data; // ✅ Retourne les logs récupérés depuis Supabase
    },
  });
};
