module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true, // ✅ Assure qu'ESLint comprend JSX
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    rules: {
      "react/react-in-jsx-scope": "off", // ✅ Plus nécessaire depuis React 17+
      "react/jsx-uses-react": "off", // ✅ Corrige des erreurs liées à JSX
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  };
  