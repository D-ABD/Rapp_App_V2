import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

/**
 * 📌 Hook personnalisé pour récupérer les formations depuis Supabase.
 * @param {string} searchQuery - Requête de recherche (nom de la formation).
 * @param {string} statut - Statut de la formation (optionnel).
 * @param {number} page - Numéro de la page (pagination).
 * @returns {Object} - Liste des formations et état du chargement.
 */
export const useFormations = (searchQuery: string = "", statut: string = "", page: number = 1) => {
  return useQuery({
    queryKey: ["formations", searchQuery, statut, page], // ✅ Correction de queryKey sous forme d'objet
    queryFn: async () => {
      let query = supabase
        .from("formations")
        .select("id, nom, statut, prevusCrif, prevusMp, inscritsCrif, inscritsMp, aRecruter")
        .order("created_at", { ascending: false })
        .range((page - 1) * 10, page * 10 - 1); // Pagination : 10 résultats par page

      if (searchQuery) {
        query = query.ilike("nom", `%${searchQuery}%`); // Filtre par nom
      }

      if (statut) {
        query = query.eq("statut", statut); // Filtre par statut
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};
