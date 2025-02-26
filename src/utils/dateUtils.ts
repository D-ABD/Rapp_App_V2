// src/utils/dateUtils.ts
// Utilitaires pour la gestion des dates

export const formatDate = (date: string | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};
  
export const isValidDate = (date: string): boolean => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
};
