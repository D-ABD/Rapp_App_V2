// src/components/Layout.Footer.tsx

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Ajout de LinkedIn

/**
 * Composant `Footer`
 * -------------------
 * 📌 Affiche le pied de page avec des liens utiles et des icônes de réseaux sociaux.
 * 🎨 Utilise Tailwind CSS pour le style.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-700 text-white p-6 mt-10 shadow-inner">
      <div className="container mx-auto text-center space-y-4">
        {/* Liens utiles */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <a href="/a-propos" className="hover:text-blue-300 transition-colors">
            À propos
          </a>
          <a href="/contact" className="hover:text-blue-300 transition-colors">
            Contact
          </a>
          <a href="/politique-de-confidentialite" className="hover:text-blue-300 transition-colors">
            Politique de confidentialité
          </a>
          <a href="/conditions-utilisation" className="hover:text-blue-300 transition-colors">
            Conditions d'utilisation
          </a>
        </div>

        {/* Séparateur */}
        <div className="border-t border-blue-500 w-2/3 mx-auto"></div>

        {/* Icônes de réseaux sociaux */}
        <div className="flex justify-center gap-6 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-transform transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-transform transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Texte de copyright */}
        <p className="text-xs md:text-sm text-gray-300">
          © {new Date().getFullYear()} Rapp App. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

