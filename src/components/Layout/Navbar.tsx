// src/components/Layout.Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_Rapp_App.png"; // Chemin relatif mis à jour
/**
 * Composant `Navbar`
 * -------------------
 * 📌 Barre de navigation de l'application.
 * 🔗 Contient des liens vers les différentes pages (Accueil, Formations, Dashboard...).
 * 🎨 Utilise Tailwind CSS pour le style.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-blue-600 p-4 flex items-center justify-between shadow-lg">
      {/* Logo et nom de l'application */}
      <div className="flex items-center gap-2">
        <img
          src={logo} // Utilisez le logo importé
          alt="Logo Rapp App"
          className="h-10 w-10" // Taille du logo
        />
        <span className="text-white text-xl font-bold">Rapp App</span>
      </div>

      {/* Liens de navigation */}
      <div className="flex items-center gap-5">
        <Link to="/" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Accueil
        </Link>
        <Link to="/formations" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Formations
        </Link>
        <Link to="/dashboard" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Dashboard
        </Link>
        <Link to="/mgo" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          MGO
        </Link>
        
        <Link to="/centres" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Centres
        </Link>
        <Link to="/revue-hebdo" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          📆 Revue Hebdo
        </Link>
        <Link to="/parametres" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Paramètres
        </Link>

        <Link to="/a-propos" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          A propos
        </Link>

        <Link to="/test-supabase" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Test Supabase
        </Link>

        <Link to="/login" className="text-white text-lg font-bold no-underline hover:text-blue-200">
          Login
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;