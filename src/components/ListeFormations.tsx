import { useState } from "react";
import { useFormations } from "../hooks/useFormations";

/**
 * 📌 Composant pour afficher la liste des formations avec filtres et pagination.
 */
const ListeFormations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statut, setStatut] = useState("");
  const [page, setPage] = useState(1);

  const { data: formations, isLoading, error } = useFormations(searchQuery, statut, page);

  if (isLoading) return <p>Chargement des formations...</p>;
  if (error) return <p>Erreur lors du chargement des formations.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📚 Liste des formations</h2>

      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher une formation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* 🔽 Filtre par statut */}
      <select
        value={statut}
        onChange={(e) => setStatut(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">Tous les statuts</option>
        <option value="Complet">Complet</option>
        <option value="Quasi Complet">Quasi Complet</option>
        <option value="À Recruter">À Recruter</option>
      </select>

      {/* 📋 Tableau des formations */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Statut</th>
            <th className="p-2 border">Prévu CRIF</th>
            <th className="p-2 border">Prévu MP</th>
            <th className="p-2 border">Inscrits CRIF</th>
            <th className="p-2 border">Inscrits MP</th>
            <th className="p-2 border">À Recruter</th>
          </tr>
        </thead>
        <tbody>
          {formations?.map((formation) => (
            <tr key={formation.id} className="border">
              <td className="p-2 border">{formation.nom}</td>
              <td className="p-2 border">{formation.statut}</td>
              <td className="p-2 border">{formation.prevusCrif}</td>
              <td className="p-2 border">{formation.prevusMp}</td>
              <td className="p-2 border">{formation.inscritsCrif}</td>
              <td className="p-2 border">{formation.inscritsMp}</td>
              <td className="p-2 border">{formation.aRecruter}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔄 Pagination */}
      <div className="mt-4 flex justify-between">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-500 text-white px-4 py-2 rounded">
          ⬅️ Précédent
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} className="bg-gray-500 text-white px-4 py-2 rounded">
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

export default ListeFormations;
