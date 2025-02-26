// src/App.tsx
import AppRoutes from "./AppRoutes"; // Importation du composant qui gère la navigation (routes de l'application)
import ErrorBoundary from "./components/ErrorBoundary"; // Importation du gestionnaire d'erreurs global
import Layout from "./components/Layout/Layout";
import "./index.css"; // Importation du fichier CSS global

// Définition du composant principal `App`
function App() {
  return (
    // `ErrorBoundary` est un composant qui capture et gère les erreurs pour éviter que l'application ne plante brutalement
    <ErrorBoundary>
      {/* Conteneur principal de l'application avec un fond gris clair et une hauteur minimale sur toute la page */}
      <div className="bg-gray-100 min-h-screen">


        {/* Conteneur des routes (Affichage dynamique en fonction de l'URL) */}
        {/* Layout avec navabar, footer.. */}

        <Layout>
      <AppRoutes />
    </Layout>

    
        
      </div>
    </ErrorBoundary>
  );
}

// Exportation du composant `App` pour l'utiliser dans `main.tsx`
export default App;
