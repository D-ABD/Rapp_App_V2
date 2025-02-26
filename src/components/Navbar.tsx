// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold">Rap_App</h1>

          {/* Liens de navigation */}
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "border-b-2 border-white pb-1" : "hover:text-blue-300"
                }`
              }
            >
              Accueil
            </NavLink>

            <NavLink
              to="/a-propos"
              className={({ isActive }) =>
                `text-white text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "border-b-2 border-white pb-1" : "hover:text-blue-300"
                }`
              }
            >
              À propos
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
