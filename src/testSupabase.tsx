// src/testSupabase.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Importation du client Supabase

// Définition de l'interface TypeScript pour typer les données reçues
interface Formation {
  id: number;
  nom: string;
  produit: string;
  centre: string;
}

const TestSupabase: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Gestion des erreurs
  
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données de la table "formations"
    const fetchFormations = async () => {
      setLoading(true); // Activation du chargement
      
      const { data, error } = await supabase.from("formations").select("*");
      console.log("📡 Données reçues de Supabase :", data); // ✅ Ajout du log pour vérifier les données

      if (error) {
        console.error("❌ Erreur Supabase :", error);
        setErrorMessage("Impossible de récupérer les formations. Vérifiez la console.");
      } else {
        setFormations(data || []); // Assurer que data n'est pas `null`
      }

      setLoading(false); // Désactivation du chargement
    };

    fetchFormations();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Test Connexion Supabase</h1>

      {loading ? ( // Affichage d'un message de chargement
        <p>⏳ Chargement des formations...</p>
      ) : errorMessage ? ( // Affichage d'une erreur si présente
        <p className="text-red-500">{errorMessage}</p>
      ) : formations.length === 0 ? ( // Si aucune formation trouvée
        <p>⚠️ Aucune formation trouvée.</p>
      ) : (
        <ul className="list-disc pl-5">
          {formations.map((formation) => (
            <li key={formation.id} className="py-1">
              <strong>{formation.nom}</strong> - {formation.produit} ({formation.centre})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestSupabase;
