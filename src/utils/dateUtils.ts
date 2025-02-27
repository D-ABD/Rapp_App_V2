// src/utils/dateUtils.ts
// Utilitaires pour la gestion des dates
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
