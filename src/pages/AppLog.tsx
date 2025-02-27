// src/pages/AppLog.tsx
import { useState } from "react";
import { useLogsUtilisateurs } from "../hooks/useLogsUtilisateurs";
import { supabase } from "../supabaseClient";
import { saveAs } from "file-saver";

/**
 * 📌 Composant `AppLog` amélioré
 * -----------------------------------------
 * 🔹 Ajout d'une **recherche dynamique** par utilisateur ou action.
 * 🔹 Ajout d'un **bouton pour supprimer un log ou vider l'historique**.
 */
const AppLog = () => {
  const { data: logs, isLoading, error } = useLogsUtilisateurs();

  // ✅ États pour la recherche et la pagination
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Recherche utilisateur/action
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const totalPages = logs ? Math.ceil(logs.length / logsPerPage) : 1;

  // ✅ Filtrage des logs en fonction de la recherche
  const filteredLogs = logs?.filter((log) =>
    log.utilisateur_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Pagination des logs filtrés
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs?.slice(indexOfFirstLog, indexOfLastLog);

// 📌 Fonction pour supprimer un log spécifique
const deleteLog = async (logId: string | number) => {
    const { error } = await supabase.from("logs_utilisateurs").delete().eq("id", logId);
    if (!error) {
      alert("Log supprimé !");
      window.location.reload(); // 🔄 Recharge la page après suppression
    } else {
      alert("Erreur lors de la suppression !");
    }
  };
  

  // 📌 Fonction pour vider tout l'historique des logs
  const clearLogs = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer tous les logs ?");
    if (confirmDelete) {
      const { error } = await supabase.from("logs_utilisateurs").delete();
      if (!error) {
        alert("Tous les logs ont été supprimés !");
        window.location.reload(); // 🔄 Recharge la page après suppression
      } else {
        alert("Erreur lors de la suppression !");
      }
    }
  };

  // 📌 Fonction pour exporter les logs en CSV
  const exportCSV = () => {
    if (!logs) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Utilisateur,Action,Détails,Date"]
        .concat(
          logs.map(
            (log) =>
              `${log.utilisateur_id || "Inconnu"},${log.action},${JSON.stringify(log.details)},${new Date(
                log.created_at
              ).toLocaleString()}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "logs_utilisateurs.csv");
  };

  // 🔄 Affichage des états de chargement et erreurs
  if (isLoading) return <p className="text-center text-gray-600">Chargement des logs...</p>;
  if (error) return <p className="text-center text-red-500">Erreur lors du chargement des logs.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* 📌 Titre et actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📜 Historique des actions des utilisateurs</h2>
        <div className="space-x-2">
          <button onClick={exportCSV} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            📥 Exporter en CSV
          </button>
          <button onClick={clearLogs} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            🗑️ Vider l'historique
          </button>
        </div>
      </div>

      {/* 📌 Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un utilisateur ou une action..."
          className="border rounded-lg p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 📌 Tableau des logs */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Utilisateur</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Détails</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs?.map((log) => (
              <tr key={log.id} className="border">
                <td className="border p-2 text-center">{log.utilisateur_id || "Inconnu"}</td>
                <td className="border p-2 text-center">{log.action}</td>
                <td className="border p-2">
                  <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(log.details, null, 2)}</pre>
                </td>
                <td className="border p-2 text-center">{new Date(log.created_at).toLocaleString()}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          ◀️ Précédent
        </button>
        <span className="text-gray-700">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Suivant ▶️
        </button>
      </div>
    </div>
  );
};

export default AppLog;
