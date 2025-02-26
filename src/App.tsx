// src/App.tsx
import AppRoutes from "./AppRoutes"; // Importation du composant qui gère la navigation (routes de l'application)
import ErrorBoundary from "./components/ErrorBoundary"; // Importation du gestionnaire d'erreurs global
import Navbar from "./components/Navbar"; // Importation de la barre de navigation
import "./index.css"; // Importation du fichier CSS global
import TestSupabase from "./testSupabase";

// Définition du composant principal `App`
function App() {
  return (
    // `ErrorBoundary` est un composant qui capture et gère les erreurs pour éviter que l'application ne plante brutalement
    <ErrorBoundary>
      {/* Conteneur principal de l'application avec un fond gris clair et une hauteur minimale sur toute la page */}
      <div className="bg-gray-100 min-h-screen">

        {/* Barre de navigation présente sur toutes les pages */}
        <Navbar />

        {/* Conteneur des routes (Affichage dynamique en fonction de l'URL) */}
        <AppRoutes />

      <TestSupabase /> {/* Composant temporaire pour tester Supabase */}
        
      </div>
    </ErrorBoundary>
  );
}

// Exportation du composant `App` pour l'utiliser dans `main.tsx`
export default App;
