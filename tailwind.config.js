/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Inclut tous les fichiers JS/TS/JSX/TSX dans le dossier src
    ],
    theme: {
      extend: {
        colors: {
          'custom-blue': '#007bff', // Ajoute une couleur personnalisée
        },
      },
    },
    plugins: [],
  };