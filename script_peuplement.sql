-- Peupler la table difficulte
INSERT INTO public.difficulte (id, nom_difficulte) VALUES
(1, 'Facile'),
(2, 'Normal'),
(3, 'Difficile'),
(4, 'Niveau 1'),
(5, 'Niveau 2');

-- Peupler la table zone_geographique
INSERT INTO public.zone_geographique (id, nom_zone) VALUES
(1, 'St-Brieuc'),
(2, 'Dinan'),
(3, 'Lannion'),
(4, 'Guingamp');

-- Peupler la table utilisateur
-- INSERT INTO public.utilisateur (id, utilisateur_zone_geographique_id, identifiant, email, date_derniere_connexion, nb_partage_sms, is_admin) VALUES
-- (1, 1, 'user1', 'user1@example.com', '2024-03-18 14:00:00', 5, FALSE),
-- (2, 2, 'user2', 'user2@example.com', '2024-03-17 10:30:00', 3, FALSE),
-- (3, 3, 'user3', 'user3@example.com', '2024-03-16 18:45:00', 8, FALSE),
-- (4, 4, 'user4', 'user4@example.com', '2024-03-15 12:20:00', 0, FALSE),
-- (5, 1, 'user5', 'user5@example.com', '2024-03-14 09:15:00', 4, FALSE),
-- (6, 2, 'user6', 'user6@example.com', '2024-03-13 20:30:00', 7, FALSE),
-- (7, 3, 'admin1', 'admin1@example.com', '2024-03-11 20:30:00', 1, TRUE),
-- (8, 2, 'admin2', 'admin2@example.com', '2024-03-17 20:30:00', 4, TRUE);

-- Peupler la table jeu
INSERT INTO public.jeu (id, nom_jeu, duree_max) VALUES
(1, 'Taquin', 60),
(2, 'Ramasseur', 60),
(3, 'Dino', 60),
(4, 'Fruit Santé', 60),
(5, 'Nettoyage', 60);

-- Peupler la table jeu_difficulte
INSERT INTO public.jeu_difficulte (jeu_id, difficulte_id) VALUES
(1, 2), -- Carte Vitale / Taquin - Facile
(1, 3), -- Carte Vitale / Taquin - Normal
(2, 1), -- C2S / Jeu du Ramasseur - Facile
(2, 2), -- C2S / Jeu du Ramasseur - Normal
(2, 3), -- C2S / Jeu du Ramasseur - Difficile
(3, 4), -- RIB / Dino - Niv 1
(3, 5), -- RIB / Dino - Niv 2
(5, 1), -- M’T Dents / Nettoyage - Facile
(5, 2), -- M’T Dents / Nettoyage - Normal
(5, 3); -- M’T Dents / Nettoyage - Difficile

-- Peupler la table score
-- INSERT INTO public.score (id, score_utilisateur_id, score_jeu_id, valeur, temps_realise, date_score) VALUES
-- (1, 1, 1, 1040, 35, '2024-03-18 14:15:00'),
-- (2, 2, 2, 600, 54, '2024-03-17 11:00:00'),
-- (3, 3, 3, 540, 60, '2024-03-16 19:00:00'),
-- (4, 1, 4, 720, 37, '2024-03-18 15:00:00'),
-- (5, 2, 5, 721, 60, '2024-03-17 16:30:00'),
-- (6, 4, 1, 850, 40, '2024-03-15 13:00:00'),
-- (7, 5, 2, 920, 55, '2024-03-14 10:45:00'),
-- (8, 6, 3, 1100, 58, '2024-03-13 21:15:00'),
-- (9, 3, 4, 980, 48, '2024-03-16 20:30:00'),
-- (10, 4, 5, 1050, 53, '2024-03-15 14:10:00');