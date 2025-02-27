// src/pages/Parametres.tsx
// // 👇 Création du composant Parametres
import { Container, Typography, Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AppLog from "./AppLog";

export default function Parametres() {
  // ✅ Gestion des onglets
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxWidth="md">
      {/* 📌 Titre de la page */}
      <Typography variant="h4" gutterBottom>
        ⚙️ Paramètres de l'application
      </Typography>

      {/* 📌 Onglets pour organiser les paramètres */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} variant="fullWidth">
          <Tab label="Général" />
          <Tab label="Utilisateurs" /> {/* ✅ Ajout d'un onglet pour gérer les utilisateurs */}
          <Tab label="Logs" /> {/* ✅ Onglet pour afficher les logs */}
          <Tab label="Centres" />
        </Tabs>
      </Paper>

      {/* 📌 Affichage du contenu en fonction de l'onglet sélectionné */}
      {tabIndex === 0 && (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 2, textAlign: "center" }}>
          <Typography variant="h6" color="gray">
            🚧 Paramètres généraux en construction.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Ici, vous pourrez modifier les paramètres globaux de l'application.
          </Typography>
        </Paper>
      )}

      {tabIndex === 1 && (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
          <Typography variant="h6">🔐 Gestion des utilisateurs</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Ajoutez, supprimez ou modifiez les utilisateurs.
          </Typography>
          {/* Ici, tu pourras ajouter une table pour gérer les utilisateurs */}
        </Paper>
      )}

      {tabIndex === 2 && <AppLog />} {/* ✅ Affichage des logs */}

      {tabIndex === 3 && (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
          <Typography variant="h6">🏢 Gestion des Centres</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Ajoutez, modifiez et supprimez les centres de formation.
          </Typography>
          {/* Ici, tu pourras ajouter un tableau pour gérer les centres */}
        </Paper>
      )}
    </Container>
  );
}
