
📌 1. Ordre recommandé pour créer les tables
1- centres -
2 types_offres- 
3 statuts - 
4 commentaires
5 Ressources 
6 evenements
7 historique_formations
8 Rapports
9 formations 
10 Tets des relations
11- Création des Fonctions CRUD



        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------
------------------------------
1. Création la table "centres"
-------------------------------
-- Créer table
CREATE TABLE centres (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE,
    adresse TEXT,
    ville TEXT,
    code_postal TEXT,
    telephone TEXT,
    email TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
-- Ajout d'un champs par défaut pour centres:
ALTER TABLE centres ADD COLUMN is_default BOOLEAN DEFAULT FALSE;

-- Vérifier que le champ "non défini est bien ajouté"
SELECT * FROM centres WHERE is_default = TRUE;

-- Insérer le champ "non défini" à centres:
INSERT INTO centres (nom, is_default) VALUES ('Non Défini', TRUE);

-- Ajouter des données de test:
INSERT INTO centres (nom, adresse, ville, code_postal, telephone, email)
VALUES 
    ('Centre de Paris', '12 rue de la République', 'Paris', '75001', '01 23 45 67 89', 'contact@centreparis.fr'),
    ('Centre de Lyon', '34 avenue des Alpes', 'Lyon', '69002', '04 56 78 90 12', 'contact@centrelyon.fr'),
    ('Centre de Marseille', '56 boulevard Saint-Michel', 'Marseille', '13001', '09 87 65 43 21', 'contact@centremarseille.fr');

-- optimiser les requêtes futures, on peut ajouter des index sur nom et ville:
CREATE INDEX idx_centres_nom ON centres(nom);
CREATE INDEX idx_centres_ville ON centres(ville);

-- verifier la creation de l'index:
SELECT * FROM pg_indexes WHERE tablename = 'centres';
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
2. Création la table "statuts"
-------------------------------
-- Créer table:
CREATE TABLE statuts (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE,
    couleur VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajout des statuts par défaut:
INSERT INTO statuts (nom, couleur) VALUES
('Complet', '#008000'),
('Quasi Complet', '#FFA500'),
('À Recruter', '#FF0000'),
('Annulée', '#808080'),
('En Cours', '#0000FF'),
('Terminée', '#A9A9A9');

-- Modification de la table statuts pour ajouter une valeur par défaut:
ALTER TABLE statuts ADD COLUMN is_default BOOLEAN DEFAULT FALSE;

-- Insérer le statut par défaut: 
INSERT INTO statuts (nom, couleur, is_default) VALUES
('Non Défini', '#D3D3D3', TRUE);

-- Tester la table:
SELECT * FROM statuts;

-- Verifier le statut par défaut:
SELECT * FROM types_offres WHERE is_default = TRUE;

-- optimiser les requêtes futures, on peut ajouter des index sur nom et ville:
CREATE INDEX idx_statuts_nom ON statuts(nom);

-- Vérifier l'index:
SELECT * FROM pg_indexes WHERE tablename = 'statuts';
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

-----------------------------------
3. Création la table "types_offres"
-----------------------------------
-- Créer table:
CREATE TABLE types_offres (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des types d'offres :
INSERT INTO types_offres (nom, description) VALUES
('CRIF', 'Conseil Régional'),
('Alternance', 'Marché privé'),
('POEI', 'Préparation Opérationnelle à l’Emploi Individuelle'),
('POEC', 'Préparation Opérationnelle à l’Emploi Collective'),
('Autre', 'Autre type d''offre');

-- Ajouter une valeur par défaut
ALTER TABLE types_offres ADD COLUMN is_default BOOLEAN DEFAULT FALSE;

-- Insrer un type d’offre "Non Défini" :
INSERT INTO types_offres (nom, description, is_default) 
VALUES ('Non Défini', 'Type non spécifié', TRUE);

-- Vérification:
SELECT * FROM types_offres;

-- verifier le type d'offre nonn défini:
SELECT * FROM types_offres WHERE is_default = TRUE;


-- optimiser les requêtes futures, on peut ajouter des index sur nom et ville:
CREATE INDEX idx_types_offres_nom ON types_offres(nom);

-- Vérifier l'index:
SELECT * FROM pg_indexes WHERE tablename = 'types_offres';
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
4. Création la table "commentaires"
-------------------------------
-- Créer table:
CREATE TABLE commentaires (
    id SERIAL PRIMARY KEY,
    formation_id INT,  -- On ajoutera plus tard une clé étrangère vers `formations`
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des données de test:
INSERT INTO commentaires (formation_id, contenu, auteur) 
VALUES 
    (NULL, 'Super formation !', 'Jean Dupont'),
    (NULL, 'À améliorer...', 'Marie Curie'),
    (NULL, 'Très bien expliqué.', 'Albert Einstein');

-- Tester la table:
SELECT * FROM commentaires;

-- optimiser les requêtes futures, on peut ajouter des index sur nom et ville:
CREATE INDEX idx_commentaires_formation_id ON commentaires(formation_id);
CREATE INDEX idx_commentaires_auteur ON commentaires(auteur);

-- Tetser l'index:
SELECT * FROM pg_indexes WHERE tablename = 'commentaires';
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
10. Création la table "Ressources"
-------------------------------

-- Créer table avec calcul du taux de transformation:
CREATE TABLE ressources (
    id SERIAL PRIMARY KEY,
    formation_id INT,  -- On ajoutera plus tard une clé étrangère vers `formations`
    nombre_evenements INT DEFAULT 0,
    nombre_candidats INT DEFAULT 0,
    nombre_entretiens INT DEFAULT 0,
    taux_transformation FLOAT GENERATED ALWAYS AS (
        CASE 
            WHEN (nombre_candidats + nombre_entretiens) > 0 
            THEN ((nombre_candidats)::FLOAT / (nombre_candidats + nombre_entretiens)) * 100 
            ELSE 0 
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des données de test:
INSERT INTO ressources (formation_id, nombre_evenements, nombre_candidats, nombre_entretiens) 
VALUES 
    (NULL, 5, 20, 10),
    (NULL, 3, 15, 5),
    (NULL, 7, 30, 15);

-- Tester la table:
SELECT * FROM ressources;

-- optimiser les requêtes futures, on peut ajouter des index sur nom et ville:
CREATE INDEX idx_ressources_formation_id ON ressources(formation_id);

-- Tester l'index:
SELECT * FROM pg_indexes WHERE tablename = 'ressources';
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
6. Création la table "evenements"
-------------------------------

-- Créer table:
CREATE TABLE evenements (
    id SERIAL PRIMARY KEY,
    type_evenement TEXT NOT NULL,
    details TEXT,
    date_evenement TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Liste de valeurs prédéfinies, tout en laissant la possibilité d’ajouter un événement personnalisé
ALTER TABLE evenements DROP COLUMN type_evenement;  -- Supprimer l'ancienne colonne
-- Nouvelle colonne
ALTER TABLE evenements ADD COLUMN type_evenement TEXT CHECK (
    type_evenement IN (
        'ICP', 'ICD', 'EE', 'Forum', 'Job Dating', 'JPO', 'Autre'
    )
) NOT NULL;

-- colonne pour le personnalisé:
ALTER TABLE evenements ADD COLUMN nom_personnalise TEXT;

-- Ajout de type personnalisés:
CREATE TABLE types_evenements (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL UNIQUE
);

-- Insertion d'évenements: 
INSERT INTO types_evenements (nom) VALUES
    ('ICP'),  -- Informations collectives présentiel
    ('ICD'),  -- Informations collectives distanciel
    ('EE'),   -- Événement emploi
    ('Forum'),
    ('Job Dating'),
    ('JPO'),  -- Journée Portes Ouvertes
    ('Autre'); -- Option pour un événement personnalisé

-- Evenements de test:
INSERT INTO evenements (type_evenement, details, date_evenement, nom_personnalise) 
VALUES 
    ('ICP', 'Présentation des formations en présentiel', '2025-03-01 10:00:00', NULL),
    ('ICD', 'Présentation des formations en visioconférence', '2025-03-02 14:00:00', NULL),
    ('EE', 'Événement emploi pour développeurs', '2025-03-05 09:00:00', NULL),
    ('Forum', 'Forum sur les métiers du numérique', '2025-03-10 15:00:00', NULL),
    ('Autre', 'Autre événement personnalisé', '2025-03-15 10:00:00', 'Hackathon 2025');

-- Tester la table:
SELECT * FROM evenements;

-- optimiser les requêtes futures avec des index:
CREATE INDEX idx_evenements_type ON evenements(type_evenement);
CREATE INDEX idx_evenements_date ON evenements(date_evenement);

-- Vérifier les index:
SELECT * FROM pg_indexes WHERE tablename = 'evenements';


        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
7. Création la table "historique_formations"
-------------------------------

-- Créer table:
CREATE TABLE historique_formations (
    id SERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    utilisateur TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des données de test:
INSERT INTO historique_formations (action, utilisateur, details) 
VALUES 
    ('Création', 'Admin', '{"nom": "Formation Test", "statut": "En cours"}'),
    ('Mise à jour', 'Jean Dupont', '{"changement": "Statut modifié en Complet"}');

-- Tester la table:
SELECT * FROM historique_formations;

-- Ajout de l'index utilisateurs:
CREATE INDEX idx_historique_utilisateur ON historique_formations(utilisateur);

-- Vérifier l'index:
SELECT * FROM pg_indexes WHERE tablename = 'historique_formations';


        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
8. Création la table "rapports"
-------------------------------

-- Créer table:
CREATE TABLE rapports (
    id SERIAL PRIMARY KEY,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    utilisateur TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT NOW()
);

-- Ajouter des données de test:
INSERT INTO rapports (titre, contenu, utilisateur) 
VALUES 
    ('Rapport 1', 'Contenu du rapport 1', 'Jean Dupont'),
    ('Rapport 2', 'Analyse des résultats', 'Marie Curie');

-- Tester la table:
SELECT * FROM rapports;

-- Ajout d’un index sur utilisateur:
CREATE INDEX idx_rapports_utilisateur ON rapports(utilisateur);

-- Vérifier l'index:
SELECT * FROM pg_indexes WHERE tablename = 'rapports';

        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------
9. Création la table "formations"
-------------------------------
-- Créer table:
CREATE TABLE formations (
    id SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    centre_id INT,  -- Référence vers `centres`
    type_offre_id INT,  -- Référence vers `types_offres`
    statut_id INT,  -- Référence vers `statuts`
    produit TEXT,
    numProduit TEXT,
    numOffre TEXT,
    dateDebut DATE,
    dateFin DATE,
    totalPlaces INT GENERATED ALWAYS AS (prevusCrif + prevusMp) STORED,
    cap INT,
    prevusCrif INT NOT NULL,
    prevusMp INT NOT NULL,
    inscritsCrif INT NOT NULL DEFAULT 0,
    inscritsMp INT NOT NULL DEFAULT 0,
    aRecruter INT GENERATED ALWAYS AS (GREATEST((prevusCrif + prevusMp) - (inscritsCrif + inscritsMp), 0)) STORED,
    numKairos TEXT,
    entresFormation INT,
    convocation_envoie BOOLEAN DEFAULT FALSE,
    assistante TEXT,
    dernier_commentaire TEXT,
    last_updated TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter des données de test:
INSERT INTO formations (nom, prevusCrif, prevusMp, centre_id, type_offre_id, statut_id)
VALUES ('Formation Développement Web', 10, 5, NULL, NULL, NULL);

-- Tester la table:
SELECT * FROM formations;

-- optimiser les requêtes futures avec des index:
CREATE INDEX idx_formations_nom ON formations(nom);
CREATE INDEX idx_formations_statut ON formations(statut_id);
CREATE INDEX idx_formations_centre ON formations(centre_id);
CREATE INDEX idx_formations_type_offre ON formations(type_offre_id);
CREATE INDEX idx_formations_dateDebut ON formations(dateDebut);

-- Verifier les index:
SELECT * FROM pg_indexes WHERE tablename = 'formations';

-- Ajout des foreign Key : cente, type_offre, statut:
ALTER TABLE formations ADD CONSTRAINT fk_formations_centre FOREIGN KEY (centre_id) REFERENCES centres(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_type_offre FOREIGN KEY (type_offre_id) REFERENCES types_offres(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_statut FOREIGN KEY (statut_id) REFERENCES statuts(id) ON DELETE SET NULL;

-- Vérifier que les key sont bien ajoutées:
SELECT conname, conrelid::regclass, confrelid::regclass 
FROM pg_constraint 
WHERE conrelid = 'formations'::regclass;

-- Ajout de formation_id dans les tables: commentaires, ressources, evenements,rapports, historique_formations: 
ALTER TABLE centres ADD COLUMN formation_id INT;
ALTER TABLE type_offre ADD COLUMN formation_id INT;
ALTER TABLE statut ADD COLUMN formation_id INT;
ALTER TABLE commentaires ADD COLUMN formation_id INT;
ALTER TABLE ressources ADD COLUMN formation_id INT;
ALTER TABLE evenements ADD COLUMN formation_id INT;
ALTER TABLE rapports ADD COLUMN formation_id INT;
ALTER TABLE historique_formations ADD COLUMN formation_id INT;


-- Ajout des autres key:
ALTER TABLE formations ADD CONSTRAINT fk_formations_ressource FOREIGN KEY (ressource_id) REFERENCES ressources(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_evenement FOREIGN KEY (evenement_id) REFERENCES evenements(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_commentaire FOREIGN KEY (dernier_commentaire_id) REFERENCES commentaires(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_rapport FOREIGN KEY (dernier_rapport_id) REFERENCES rapports(id) ON DELETE SET NULL;
ALTER TABLE formations ADD CONSTRAINT fk_formations_historique FOREIGN KEY (dernier_historique_id) REFERENCES historique_formations(id) ON DELETE SET NULL;



-- supression de formation°id dans centre, statut et type_offre, car les key sont dans formation:
-- exemple. formation.centre au lieu de centre.formation_id
ALTER TABLE centres DROP COLUMN IF EXISTS formation_id;
ALTER TABLE types_offres DROP COLUMN IF EXISTS formation_id;
ALTER TABLE statuts DROP COLUMN IF EXISTS formation_id;

-- verifier la supression dans centres, statut et type_offre:
SELECT column_name, table_name 
FROM information_schema.columns 
WHERE column_name = 'formation_id'
AND table_name IN ('centres', 'types_offres', 'statuts');

-- supression des foreign key inutiles:
ALTER TABLE formations DROP CONSTRAINT IF EXISTS fk_formations_ressource;
ALTER TABLE formations DROP CONSTRAINT IF EXISTS fk_formations_evenement;
ALTER TABLE formations DROP CONSTRAINT IF EXISTS fk_formations_commentaire;
ALTER TABLE formations DROP CONSTRAINT IF EXISTS fk_formations_rapport;
ALTER TABLE formations DROP CONSTRAINT IF EXISTS fk_formations_historique;

-- remplaement des keys:
ALTER TABLE commentaires ADD CONSTRAINT fk_commentaires_formation FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE;
ALTER TABLE ressources ADD CONSTRAINT fk_ressources_formation FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE;
ALTER TABLE evenements ADD CONSTRAINT fk_evenements_formation FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE;
ALTER TABLE rapports ADD CONSTRAINT fk_rapports_formation FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE;
ALTER TABLE historique_formations ADD CONSTRAINT fk_historique_formation FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE;
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

------------------------------
1O. Tests des relations
-------------------------------
-- insertion de données:
INSERT INTO formations (nom, centre_id, type_offre_id, statut_id, prevusCrif, prevusMp)
VALUES ('Formation Développement Web', 1, 1, 1, 10, 5);

-- Vérifier les données:
SELECT * FROM formations WHERE nom = 'Formation Développement Web';

-- test inserer des commentaires:
INSERT INTO commentaires (formation_id, contenu, auteur) 
VALUES (1, 'Très bonne formation sur le développement web', 'Jean Dupont');

-- verif des commentaires:
SELECT * FROM commentaires WHERE formation_id = 1;

-- test iserer ressources: 
INSERT INTO ressources (formation_id, nombre_evenements, nombre_candidats, nombre_entretiens) 
VALUES (1, 3, 20, 10);

-- Vérifier ressources:
SELECT * FROM ressources WHERE formation_id = 1;

-- test inserer evenement:
INSERT INTO evenements (formation_id, type_evenement, details, date_evenement) 
VALUES (1, 'Job Dating', 'Événement de recrutement pour les développeurs', '2025-03-10 14:00:00');

-- Verifier evenement:
SELECT * FROM evenements WHERE formation_id = 1;

-- test suppression de formation:
DELETE FROM formations WHERE id = 1;

-- Vérifier suppression:
SELECT * FROM formations WHERE id = 1;
SELECT * FROM commentaires WHERE formation_id = 1;
SELECT * FROM ressources WHERE formation_id = 1;
SELECT * FROM evenements WHERE formation_id = 1;

-- Test rapport et historique:
INSERT INTO formations (nom, centre_id, type_offre_id, statut_id, prevusCrif, prevusMp) 
VALUES ('Formation Data Science', 2, 2, 2, 15, 10);

INSERT INTO rapports (formation_id, titre, contenu, utilisateur) 
VALUES (2, 'Rapport d’évaluation', 'Analyse de la formation Data Science', 'Admin');

INSERT INTO historique_formations (formation_id, action, utilisateur, details) 
VALUES (2, 'Création', 'Admin', '{"nom": "Formation Data Science", "statut": "En cours"}');

-- Vérifier rapport et historique:
SELECT * FROM rapports WHERE formation_id = 2;
SELECT * FROM historique_formations WHERE formation_id = 2;
        -----------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------

----------------------------------
11- Création des Fonctions CRUD
----------------------------------
-- CRUD centres:
--Ajout
CREATE OR REPLACE FUNCTION add_centre(nom TEXT) RETURNS VOID AS $$
BEGIN
    INSERT INTO centres (nom) VALUES (nom);
END;
$$ LANGUAGE plpgsql;

-- récupératio de tous les centres:
CREATE OR REPLACE FUNCTION get_centres() RETURNS TABLE (id INT, nom TEXT) AS $$
BEGIN
    RETURN QUERY SELECT centres.id, centres.nom FROM centres;
END;
$$ LANGUAGE plpgsql;

-- MAJ d'un centre:
CREATE OR REPLACE FUNCTION update_centre(centre_id INT, new_nom TEXT) RETURNS VOID AS $$
BEGIN
    UPDATE centres SET nom = new_nom WHERE id = centre_id;
END;
$$ LANGUAGE plpgsql;

-- supression d'un centre:
CREATE OR REPLACE FUNCTION delete_centre(centre_id INT) RETURNS VOID AS $$
BEGIN
    DELETE FROM centres WHERE id = centre_id;
END;
$$ LANGUAGE plpgsql;
----------------------------------------------

-- CRUD pour types_offres

-- Ajout
CREATE OR REPLACE FUNCTION add_type_offre(nom TEXT, description TEXT) RETURNS VOID AS $$
BEGIN
    INSERT INTO types_offres (nom, description) VALUES (nom, description);
END;
$$ LANGUAGE plpgsql;

-- MAJ
CREATE OR REPLACE FUNCTION update_type_offre(type_id INT, new_nom TEXT, new_description TEXT) RETURNS VOID AS $$
BEGIN
    UPDATE types_offres SET nom = new_nom, description = new_description WHERE id = type_id;
END;
$$ LANGUAGE plpgsql;

-- Suppression
CREATE OR REPLACE FUNCTION delete_type_offre(type_id INT) RETURNS VOID AS $$
BEGIN
    DELETE FROM types_offres WHERE id = type_id;
END;
$$ LANGUAGE plpgsql;



----------------------------------------------

-- CRUD pour stattuts

-- Ajout
CREATE OR REPLACE FUNCTION add_statut(nom TEXT, couleur TEXT) RETURNS VOID AS $$
BEGIN
    INSERT INTO statuts (nom, couleur) VALUES (nom, couleur);
END;
$$ LANGUAGE plpgsql;

-- MAJ
CREATE OR REPLACE FUNCTION update_statut(stat_id INT, new_nom TEXT, new_couleur TEXT) RETURNS VOID AS $$
BEGIN
    UPDATE statuts SET nom = new_nom, couleur = new_couleur WHERE id = stat_id;
END;
$$ LANGUAGE plpgsql;

-- Suppression
CREATE OR REPLACE FUNCTION delete_statut(stat_id INT) RETURNS VOID AS $$
BEGIN
    DELETE FROM statuts WHERE id = stat_id;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------

-- CRUD pour formations:

-- Ajout
CREATE OR REPLACE FUNCTION add_formation(nom TEXT, centre INT, type_offre INT, statut INT, prevusCrif INT, prevusMp INT) RETURNS VOID AS $$
BEGIN
    INSERT INTO formations (nom, centre_id, type_offre_id, statut_id, prevusCrif, prevusMp)
    VALUES (nom, centre, type_offre, statut, prevusCrif, prevusMp);
END;
$$ LANGUAGE plpgsql;

-- MAJ
CREATE OR REPLACE FUNCTION update_formation(formation_id INT, new_nom TEXT, new_centre INT, new_type_offre INT, new_statut INT) RETURNS VOID AS $$
BEGIN
    UPDATE formations 
    SET nom = new_nom, centre_id = new_centre, type_offre_id = new_type_offre, statut_id = new_statut
    WHERE id = formation_id;
END;
$$ LANGUAGE plpgsql;

-- Suppression
CREATE OR REPLACE FUNCTION delete_formation(formation_id INT) RETURNS VOID AS $$
BEGIN
    DELETE FROM formations WHERE id = formation_id;
END;
$$ LANGUAGE plpgsql;


----------------------------------------------

-- Fonctions CRUD pour les Tables Dépendantes

-- Commentaires:
CREATE OR REPLACE FUNCTION add_commentaire(formation INT, contenu TEXT, auteur TEXT) RETURNS VOID AS $$
BEGIN
    INSERT INTO commentaires (formation_id, contenu, auteur) VALUES (formation, contenu, auteur);
END;
$$ LANGUAGE plpgsql;

-- Ressources:
CREATE OR REPLACE FUNCTION add_ressource(formation INT, nombre_evenements INT, nombre_candidats INT, nombre_entretiens INT) RETURNS VOID AS $$
BEGIN
    INSERT INTO ressources (formation_id, nombre_evenements, nombre_candidats, nombre_entretiens) 
    VALUES (formation, nombre_evenements, nombre_candidats, nombre_entretiens);
END;
$$ LANGUAGE plpgsql;

-- Evenements:
CREATE OR REPLACE FUNCTION add_evenement(formation INT, type_evenement TEXT, details TEXT, date_evenement TIMESTAMP) RETURNS VOID AS $$
BEGIN
    INSERT INTO evenements (formation_id, type_evenement, details, date_evenement) 
    VALUES (formation, type_evenement, details, date_evenement);
END;
$$ LANGUAGE plpgsql;

-- Rapports:
CREATE OR REPLACE FUNCTION add_rapport(formation INT, titre TEXT, contenu TEXT, utilisateur TEXT) RETURNS VOID AS $$
BEGIN
    INSERT INTO rapports (formation_id, titre, contenu, utilisateur) 
    VALUES (formation, titre, contenu, utilisateur);
END;
$$ LANGUAGE plpgsql;

-- Historique de formation:
CREATE OR REPLACE FUNCTION add_historique(formation INT, action TEXT, utilisateur TEXT, details JSONB) RETURNS VOID AS $$
BEGIN
    INSERT INTO historique_formations (formation_id, action, utilisateur, details) 
    VALUES (formation, action, utilisateur, details);
END;
$$ LANGUAGE plpgsql;


----------------------------------------------

-- Tests CRUD pour

-- Centres
SELECT add_centre('Centre de Formation Paris');
SELECT add_centre('Centre de Lyon');
SELECT * FROM centres;
SELECT update_centre(1, 'Centre de Formation Paris - Modifié');
SELECT * FROM centres WHERE id = 1;
SELECT delete_centre(2);
SELECT * FROM centres WHERE id = 2;




-- Type offres:
SELECT add_type_offre('Apprentissage', 'Formation en alternance');
SELECT add_type_offre('Certifiante', 'Formation avec diplôme');
SELECT * FROM types_offres;
SELECT update_type_offre(1, 'Apprentissage - Modifié', 'Nouvelle description');
SELECT * FROM types_offres WHERE id = 1;
SELECT delete_type_offre(2);
SELECT * FROM types_offres WHERE id = 2;

-- Stattuts:
SELECT add_statut('Ouverte', '#00FF00');
SELECT add_statut('Fermée', '#FF0000');
SELECT update_statut(1, 'Ouverte - Modifiée', '#008000');
SELECT * FROM statuts WHERE id = 1;
SELECT delete_statut(2);
SELECT * FROM statuts WHERE id = 2;

-- formations:
SELECT add_formation('Formation Web', 1, 1, 1, 15, 10);
SELECT * FROM formations;
SELECT update_formation(1, 'Formation Web - Mise à jour', 1, 1, 1);
SELECT update_formation(1, 'Formation Web - Mise à jour', 1, 1, 1);
SELECT delete_formation(1);
SELECT * FROM formations WHERE id = 1;
SELECT * FROM formations WHERE id = 1;

-- Commentaires:
SELECT add_commentaire(1, 'Super formation !', 'Jean Dupont');
SELECT * FROM commentaires;
DELETE FROM commentaires WHERE formation_id = 1;
SELECT * FROM commentaires WHERE formation_id = 1;

-- ressources:
SELECT add_ressource(1, 3, 10, 5);
SELECT * FROM ressources;
DELETE FROM ressources WHERE formation_id = 1;
SELECT * FROM ressources WHERE formation_id = 1;

-- evenements:
SELECT add_evenement(1, 'Job Dating', 'Événement spécial', '2025-05-15 10:00:00');
SELECT * FROM evenements;
DELETE FROM evenements WHERE formation_id = 1;
SELECT * FROM evenements WHERE formation_id = 1;

-- rapports:
SELECT add_rapport(1, 'Rapport Formation', 'Détails du rapport', 'Admin');
SELECT * FROM rapports;
DELETE FROM rapports WHERE formation_id = 1;
SELECT * FROM rapports WHERE formation_id = 1;

-- historique_formations:
SELECT add_historique(1, 'Création', 'Admin', '{"nom": "Formation Web"}');
SELECT * FROM historique_formations;
DELETE FROM historique_formations WHERE formation_id = 1;
SELECT * FROM historique_formations WHERE formation_id = 1;

----------------------------------------------

-- CRUD pour types_offres

-- Ajout
-- MAJ
-- Suppression
