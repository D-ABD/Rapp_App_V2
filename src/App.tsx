// src/App.tsx
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Fournisseur d'authentification
import "./index.css";

function App() {
  return (
    <AuthProvider> {/* ✅ Entoure l'application avec le contexte d'authentification */}
      <ErrorBoundary>
        <div className="bg-gray-100 min-h-screen">
          <Layout>
            <AppRoutes /> {/* ✅ Gestion des routes avec protection */}
          </Layout>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
