// src/main.tsx
import React from 'react'; // Importation de React
import ReactDOM from 'react-dom/client'; // Importation de ReactDOM pour le rendu dans le DOM
import { BrowserRouter } from 'react-router-dom'; // Importation du routeur principal pour gérer la navigation
import App from './App'; // Importation du composant principal de l'application
import './index.css'; // Importation du fichier CSS global

// Création du point d'ancrage React et rendu de l'application dans l'élément HTML avec l'ID "root"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    {/* StrictMode permet de détecter les erreurs et avertissements en mode développement */}
    <BrowserRouter> 
      {/* BrowserRouter permet d'activer la navigation entre les pages avec React Router */}
      <App /> {/* App est le composant principal qui contient toute l'application */}
    </BrowserRouter>
  </React.StrictMode>
);
