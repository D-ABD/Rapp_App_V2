// src/components.ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ Import du hook d'authentification

// ✅ Composant de protection des routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté

  // 🔒 Redirection vers `/login` si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ L'utilisateur est connecté, affichage de la page demandée
  return <>{children}</>;
};

export default ProtectedRoute;
