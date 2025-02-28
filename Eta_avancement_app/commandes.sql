
-- Fichier commandes.sql : Contient toutes les commandes SQL utilisées

-- 1. Création des tables principales
CREATE TABLE centres (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE
);

CREATE TABLE types_offres (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE
);

CREATE TABLE statuts (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE,
    couleur VARCHAR(10) NOT NULL
);

CREATE TABLE formations (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    centre_id INT REFERENCES centres(id) ON DELETE CASCADE,
    type_offre_id INT REFERENCES types_offres(id) ON DELETE CASCADE,
    statut_id INT REFERENCES statuts(id) ON DELETE CASCADE,
    produit TEXT,
    numProduit TEXT,
    numOffre TEXT,
    numKairos TEXT,
    dateDebut DATE,
    dateFin DATE,
    prevusCrif INT NOT NULL,
    prevusMp INT NOT NULL,
    inscritsCrif INT NOT NULL DEFAULT 0,
    inscritsMp INT NOT NULL DEFAULT 0,
    cap INT,
    totalPlaces INT GENERATED ALWAYS AS (prevusCrif + prevusMp) STORED,
    inscritsTotal INT GENERATED ALWAYS AS (inscritsCrif + inscritsMp) STORED,
    aRecruter INT GENERATED ALWAYS AS (GREATEST((prevusCrif + prevusMp) - (inscritsCrif + inscritsMp), 0)) STORED,
    statut_manuel TEXT,
    statut TEXT GENERATED ALWAYS AS (
        CASE
            WHEN statut_manuel IS NOT NULL THEN statut_manuel
            WHEN inscritsTotal >= totalPlaces THEN 'Complet'
            WHEN inscritsTotal >= (totalPlaces * 0.75) THEN 'Quasi Complet'
            WHEN totalPlaces > inscritsTotal THEN 'À Recruter'
            ELSE 'Annulée'
        END
    ) STORED,
    entresFormation INT,
    convocation_envoie BOOLEAN DEFAULT FALSE,
    assistante TEXT,
    dernier_commentaire TEXT,
    last_updated TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Création des tables relationnelles
CREATE TABLE commentaires (
    id SERIAL PRIMARY KEY,
    formation_id INT REFERENCES formations(id) ON DELETE CASCADE,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rapports (
    id SERIAL PRIMARY KEY,
    formation_id INT REFERENCES formations(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT NOW(),
    utilisateur TEXT NOT NULL
);

CREATE TABLE historique_formations (
    id SERIAL PRIMARY KEY,
    formation_id INT REFERENCES formations(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    utilisateur TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Triggers et Fonctions SQL
-- Mise à jour automatique du dernier commentaire
CREATE OR REPLACE FUNCTION update_dernier_commentaire()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE formations
    SET dernier_commentaire = NEW.contenu
    WHERE id = NEW.formation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_commentaire
AFTER INSERT ON commentaires
FOR EACH ROW
EXECUTE FUNCTION update_dernier_commentaire();

-- Historique des formations
CREATE OR REPLACE FUNCTION log_historique_formation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO historique_formations (formation_id, action, utilisateur, details, created_at)
    VALUES (NEW.id, 'Mise à jour', CURRENT_USER, row_to_json(NEW), NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_historique_formation
AFTER UPDATE ON formations
FOR EACH ROW
EXECUTE FUNCTION log_historique_formation();

-- 4. Opérations CRUD
-- Ajouter un centre
INSERT INTO centres (nom) VALUES ('Centre Test');

-- Ajouter une formation
INSERT INTO formations (nom, prevusCrif, prevusMp, centre_id, type_offre_id, statut_id) 
VALUES ('Formation Test', 10, 5, 1, 1, 1);

-- Ajouter un commentaire
INSERT INTO commentaires (formation_id, contenu, auteur) VALUES (1, 'Très bonne formation', 'Jean Dupont');

-- Modifier une formation
UPDATE formations SET nom = 'Formation Modifiée' WHERE id = 1;

-- Supprimer une formation
DELETE FROM formations WHERE id = 1;

-- 5. Requêtes analytiques
-- Exporter les rapports en CSV
COPY (SELECT * FROM rapports) TO '/tmp/rapports_export.csv' WITH CSV HEADER;

-- Pagination des formations
SELECT * FROM formations ORDER BY created_at DESC LIMIT 10 OFFSET 0;


---------------------------------------------------------------------------------


-- Création de la table des événements liés aux formations
CREATE TABLE evenements (
    id SERIAL PRIMARY KEY,
    formation_id INT REFERENCES formations(id) ON DELETE CASCADE,
    type_evenement TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Création de la table des ressourcessans le champ taux de transformation
DROP TABLE IF EXISTS ressources CASCADE;

CREATE TABLE ressources (
    id SERIAL PRIMARY KEY,
    formation_id INT REFERENCES formations(id) ON DELETE CASCADE,
    nombre_evenements INT DEFAULT 0,
    nombre_candidats INT DEFAULT 0,
    nombre_entretiens INT DEFAULT 0,
    taux_transformation FLOAT,  -- On laisse la colonne vide, elle sera mise à jour par un trigger
    created_at TIMESTAMP DEFAULT NOW()
);

-- Création d'une fonction pour calculer le taux de transformation
CREATE OR REPLACE FUNCTION update_taux_transformation()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ressources
    SET taux_transformation = (
        CASE 
            WHEN (NEW.nombre_candidats + NEW.nombre_entretiens) > 0 
            THEN (
                (SELECT (f.inscritsCrif + f.inscritsMp) 
                 FROM formations f 
                 WHERE f.id = NEW.formation_id)::FLOAT 
                 / (NEW.nombre_candidats + NEW.nombre_entretiens)
            ) * 100 
            ELSE 0 
        END
    )
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour exécuter la mise à jour automatiquement
CREATE TRIGGER trigger_update_taux_transformation
AFTER INSERT OR UPDATE ON ressources
FOR EACH ROW
EXECUTE FUNCTION update_taux_transformation();

-- Fonction pour générer un rapport sur une formation
CREATE OR REPLACE FUNCTION generate_rapport(formation_id INT, utilisateur TEXT, titre TEXT, contenu TEXT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO rapports (formation_id, utilisateur, titre, contenu, date_creation)
    VALUES (formation_id, utilisateur, titre, contenu, NOW());
END;
$$ LANGUAGE plpgsql;

-- Fonction pour enregistrer l'historique des formations lors des mises à jour
CREATE OR REPLACE FUNCTION log_historique_formation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO historique_formations (formation_id, action, utilisateur, details, created_at)
    VALUES (NEW.id, 'Mise à jour', CURRENT_USER, row_to_json(NEW), NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour déclencher l'enregistrement de l'historique des formations
CREATE TRIGGER trigger_historique_formation
AFTER UPDATE ON formations
FOR EACH ROW
EXECUTE FUNCTION log_historique_formation();

-- Requête pour récupérer l'historique des formations spécifiques
SELECT formation_id, action, utilisateur, details, created_at
FROM historique_formations
WHERE formation_id = 1
ORDER BY created_at DESC;

-- Requêtes d'analyse des tendances annuelles, mensuelles et hebdomadaires
SELECT DATE_TRUNC('week', created_at) AS periode, COUNT(*) AS nombre_entrées
FROM formations
GROUP BY periode
ORDER BY periode DESC;

SELECT DATE_TRUNC('month', created_at) AS periode, COUNT(*) AS nombre_entrées
FROM formations
GROUP BY periode
ORDER BY periode DESC;

SELECT DATE_TRUNC('year', created_at) AS periode, COUNT(*) AS nombre_entrées
FROM formations
GROUP BY periode
ORDER BY periode DESC;

-- Requêtes pour paginer les résultats des formations
SELECT * FROM formations
ORDER BY created_at DESC
LIMIT 10 OFFSET 0; -- Page 1 (0-9)

SELECT * FROM formations
ORDER BY created_at DESC
LIMIT 10 OFFSET 10; -- Page 2 (10-19)
