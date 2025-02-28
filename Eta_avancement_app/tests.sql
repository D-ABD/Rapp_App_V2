
-- 📌 Vérification des tables existantes
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 📌 Vérification des clés étrangères et relations
SELECT conname, conrelid::regclass AS table, confrelid::regclass AS referenced_table
FROM pg_constraint
WHERE contype = 'f';

-- 📌 Vérification des données manquantes (clés étrangères non valides)
SELECT * FROM formations WHERE centre_id NOT IN (SELECT id FROM centres);
SELECT * FROM formations WHERE type_offre_id NOT IN (SELECT id FROM types_offres);
SELECT * FROM formations WHERE statut_id NOT IN (SELECT id FROM statuts);

-- 📌 Vérification du trigger "update_dernier_commentaire"
INSERT INTO commentaires (formation_id, contenu, auteur) 
VALUES ((SELECT id FROM formations LIMIT 1), 'Test de commentaire', 'Admin');
SELECT id, dernier_commentaire FROM formations WHERE id = (SELECT id FROM formations LIMIT 1);

-- 📌 Vérification des calculs automatiques (totalPlaces, inscritsTotal, aRecruter)
INSERT INTO formations (nom, prevusCrif, prevusMp, centre_id, type_offre_id, statut_id) 
VALUES ('Formation Test', 10, 5, 
        (SELECT id FROM centres LIMIT 1), 
        (SELECT id FROM types_offres LIMIT 1),
        (SELECT id FROM statuts LIMIT 1));
SELECT id, prevusCrif, prevusMp, totalPlaces, inscritsTotal, aRecruter 
FROM formations 
ORDER BY id DESC 
LIMIT 5;

-- 📌 Vérification de l'historique des formations
UPDATE formations SET nom = 'Formation Modifiée' WHERE id = (SELECT id FROM formations LIMIT 1);
SELECT * FROM historique_formations WHERE formation_id = (SELECT id FROM formations LIMIT 1);

-- 📌 Vérification de l'export des rapports en CSV
COPY (SELECT * FROM rapports) TO '/tmp/rapports_export.csv' WITH CSV HEADER;

-- 📌 Vérification des tendances annuelles, mensuelles et hebdomadaires
SELECT DATE_TRUNC('week', created_at) AS periode, COUNT(*) AS nombre_entrées FROM formations GROUP BY periode ORDER BY periode DESC;
SELECT DATE_TRUNC('month', created_at) AS periode, COUNT(*) AS nombre_entrées FROM formations GROUP BY periode ORDER BY periode DESC;
SELECT DATE_TRUNC('year', created_at) AS periode, COUNT(*) AS nombre_entrées FROM formations GROUP BY periode ORDER BY periode DESC;

-- 📌 Vérification de la pagination des formations
SELECT * FROM formations ORDER BY created_at DESC LIMIT 10 OFFSET 0; -- Page 1 (0-9)
SELECT * FROM formations ORDER BY created_at DESC LIMIT 10 OFFSET 10; -- Page 2 (10-19);

-- 📌 Vérification de la pagination des commentaires
SELECT * FROM commentaires WHERE formation_id = (SELECT id FROM formations LIMIT 1) ORDER BY created_at DESC LIMIT 5 OFFSET 0; -- Page 1 (0-4)
SELECT * FROM commentaires WHERE formation_id = (SELECT id FROM formations LIMIT 1) ORDER BY created_at DESC LIMIT 5 OFFSET 5; -- Page 2 (5-9);
