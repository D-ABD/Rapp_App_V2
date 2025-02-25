import React from "react";
import { Link } from "react-router-dom";

/**
 * Composant `Navbar`
 * -------------------
 * 📌 Barre de navigation de l'application.
 * 🔗 Contient des liens vers les différentes pages (Accueil, Formations, Dashboard...).
 * 🎨 Utilise des styles en ligne pour la personnalisation.
 */
const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      {/* 🏠 Lien vers la page d'accueil */}
      <Link to="/" style={styles.navLink}>Accueil</Link>

      {/* 📚 Lien vers la page des formations */}
      <Link to="/formations" style={styles.navLink}>Formations</Link>

      {/* 📊 Lien vers le dashboard */}
      <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>

      {/* 🆕 Lien vers la section MGO */}
      <Link to="/mgo" style={styles.navLink}>MGO</Link>

      {/* 🔐 Lien vers la page de connexion */}
      <Link to="/login" style={styles.navLink}>Login</Link>

      {/* 🏫 Lien vers la gestion des centres */}
      <Link to="/centres" style={styles.navLink}>Centres</Link>

      {/* 📆 Lien vers la revue hebdomadaire (ajouté récemment) */}
      <Link to="/revue-hebdo" style={{ color: "white" }}>📆 Revue Hebdo</Link>

      {/* 📚 Lien vers la page des parametres */}
      <Link to="/parametres" style={styles.navLink}>Parametres</Link>
    </nav>
  );
};

/**
 * 🎨 Styles CSS en ligne
 * 📌 Définition des styles pour la navbar et les liens de navigation.
 */
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    width: "100%", // 📏 Prend toute la largeur
    backgroundColor: "#007bff", // 🎨 Couleur bleue
    padding: "10px", // 📏 Espace intérieur pour mieux séparer les liens
    display: "flex", // 🔄 Affichage en ligne des liens
    justifyContent: "center", // 📌 Centrage des liens
    gap: "20px", // 🔄 Espacement entre les liens
  },
  navLink: {
    color: "white", // 🎨 Texte blanc pour un bon contraste
    textDecoration: "none", // ❌ Supprime le soulignement par défaut des liens
    fontSize: "18px", // 🔠 Taille du texte augmentée pour la lisibilité
    fontWeight: "bold", // 🏋️‍♂️ Texte en gras pour plus de visibilité
  },
};

export default Navbar;
