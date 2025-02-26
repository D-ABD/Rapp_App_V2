import React from "react";

const Accueil: React.FC = () => {
  return (
    // Container principal avec Tailwind CSS
    <div className="flex justify-center items-center text-center w-full p-5 bg-gray-50 min-h-[90vh]">
      {/* Bloc de contenu principal avec Tailwind CSS */}
      <div className="bg-white p-10 rounded-lg shadow-md max-w-[600px] w-[80%]">
        {/* Titre principal avec Tailwind CSS */}
        <h1 className="text-3xl text-gray-800 mb-2">
          Bienvenue sur{" "}
          {/* Texte mis en évidence avec Tailwind CSS */}
          <span className="text-blue-600">App-RO</span>
        </h1>
        {/* Message de confirmation avec Tailwind CSS */}
        <p className="text-xl text-gray-600">
          Votre application est bien configurée et centrée horizontalement . Page Accueil!
        </p>
      </div>
    </div>
  );
};

export default Accueil;