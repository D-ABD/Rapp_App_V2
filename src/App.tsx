// src/App.tsx
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Fournisseur d'authentification
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Importation de React Query
import "./index.css";

// ✅ Création d'un client React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* ✅ Fournit React Query à toute l'application */}
      <AuthProvider> {/* ✅ Fournisseur d'authentification */}
        <ErrorBoundary>
          <div className="bg-gray-100 min-h-screen">
            <Layout>
              <AppRoutes /> {/* ✅ Gestion des routes avec protection */}
            </Layout>
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
