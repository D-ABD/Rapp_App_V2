// src/components/Layout.Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo_Rapp_App.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Nom */}
          <div className="flex items-center">
            <img src={logo} alt="Logo Rapp App" className="h-10 w-10 mr-2" />
            <span className="text-white text-xl font-bold">Rapp App</span>
          </div>

          {/* Menu Desktop (Horizontal) */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </div>

          {/* Menu Mobile (Burger) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Seul affiché sur mobile) */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-blue-700 shadow-md`}>
        <div className="flex flex-col space-y-2 p-4">
          {navLinks.map((link) => (
            <NavLink key={link.path} {...link} onClick={() => setIsOpen(false)} />
          ))}
        </div>
      </div>
    </nav>
  );
};

// Composant pour un lien de navigation
const NavLink: React.FC<{ path: string; label: string; onClick?: () => void }> = ({
  path,
  label,
  onClick,
}) => (
  <Link
    to={path}
    className="text-white text-lg font-medium px-3 py-2 rounded-lg hover:bg-blue-400 transition-all duration-300"
    onClick={onClick}
  >
    {label}
  </Link>
);

// Liste des liens de navigation
const navLinks = [
  { path: "/", label: "🏠 Accueil" },
  { path: "/formations", label: "📚 Formations" },
  { path: "/dashboard", label: "📊 Dashboard" },
  { path: "/mgo", label: "⚙️ MGO" },
  { path: "/login", label: "🔐 Login" },
  { path: "/centres", label: "🏢 Centres" },
  { path: "/revue-hebdo", label: "📆 Revue Hebdo" },
  { path: "/parametres", label: "⚙️ Paramètres" },
  { path: "/a-propos", label: "ℹ️ À propos" },
  { path: "/test-supabase", label: "🧪 Test Supabase" },
];

export default Navbar;
