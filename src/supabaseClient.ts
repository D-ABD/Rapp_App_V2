// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'; // Importation du client Supabase

// 📌 Chargement des variables d'environnement (stockées dans le fichier `.env`)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // URL de ton projet Supabase
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Clé publique anonyme (anon key)

// ✅ Vérification que les variables d'environnement sont bien définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("⚠️ Les variables d'environnement Supabase ne sont pas définies !");
  // Si ces variables ne sont pas définies, une erreur est levée pour éviter des bugs cachés.
}

/**
 * 📌 Création du client Supabase avec les options recommandées
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // 🔄 Garde la session utilisateur active même après un refresh
    autoRefreshToken: true, // 🔑 Rafraîchit automatiquement le token d'authentification lorsque c'est nécessaire
  },
  global: {
    headers: {
      'Content-Type': 'application/json', // Définit le format des requêtes en JSON
      'Access-Control-Allow-Origin': '*', // Permet les requêtes depuis n'importe quelle origine (⚠️ à restreindre en production)
    },
  },
});
