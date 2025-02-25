import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";

const router = createBrowserRouter([
  { path: "/", element: <Accueil /> },
  { path: "/a-propos", element: <APropos /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
