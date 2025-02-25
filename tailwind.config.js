/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Ajoutez une couleur personnalisée
          'custom-blue': '#007bff',
        },
      },
    },
    plugins: [],
  };