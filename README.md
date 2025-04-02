# Serious Game CPAM -LesGlobulesBlancs-

Bienvenue sur le dépôt Git du projet Serious Game CPAM, réalisé par l'équipe composée de **Rémi, Alan, Raphael et Dorian**.

---

## 🚀 Description du Projet

Ce Serious Game vise à sensibiliser les jeunes adultes (18-25 ans) à divers services proposés par la CPAM à travers une série de **5 mini-jeux interactifs**.
Chaque jeu aborde une thématique clé de la santé et des services administratifs d'Ameli de manière ludique et engageante.

## 🎮 Liste des Mini-Jeux et Explications

### Carte Vitale – Taquin express
Remets les morceaux mélangés de ta carte Vitale dans le bon ordre avant la fin du temps imparti ! Un jeu de puzzle simple et rapide pour sensibiliser à l'importance de la carte Vitale.

### C2S – Le ramasseur d’aides
Déplace ton personnage pour collecter les aides de la Complémentaire Santé Solidaire (C2S) tout en évitant les obstacles !

### RIB – Dino Jump
Un jeu inspiré du Chrome Dino Game : saute au bon moment pour éviter les obstacles et assure-toi que ton RIB soit bien enregistré dans ton compte Ameli.

### Examen de prévention – Fruit Santé
Fais tomber les bons fruits dans le panier pour maintenir une bonne santé ! Un jeu pour rappeler l'importance de l'examen de prévention en santé et des bonnes habitudes alimentaires.

### M’T Dents – Nettoyage chrono
Brosse les dents rapidement et efficacement avant que le temps ne s’écoule pour apprendre l'importance du programme M’T Dents et des soins dentaires réguliers.

## Parcours Utilisateur

L'expérience utilisateur se déroule en plusieurs étapes :

1. **Connexion / Inscription**
   - L'utilisateur arrive sur une page de connexion où il peut s'inscrire s'il n'a pas encore de compte.
   - Lors de la première connexion, un message de bienvenue apparaît pour expliquer l'objectif du jeu. (Ce message ne s'affichera plus par la suite, sauf après une déconnexion et reconnexion.)

2. **Accueil**
   - L'utilisateur est redirigé vers la page d’accueil, où il peut explorer les différentes fonctionnalités.
   - Il peut accéder à un tableau interactif pour choisir parmi les 5 mini-jeux proposés.

3. **Expérience de Jeu**
   - L'utilisateur joue aux différents jeux pour apprendre sur les services de la CPAM de manière ludique.
   - Un système de score permet d'évaluer ses performances.

4. **Tableau des Scores & Partage**
   - Les meilleurs scores sont affichés sur un leaderboard, encourageant les utilisateurs à améliorer leurs performances.
   - Un système de partage SMS permet aux joueurs de partager leurs résultats avec leurs amis.

5. **Profil & Déconnexion**
   - L'utilisateur peut consulter ses informations, voir ses statistiques de jeu et se déconnecter.
   - Lors de la déconnexion, la clé `popupWelcomeSeen` est supprimée, réactivant le message de bienvenue lors de la prochaine connexion.

6. **Accès Admin (si administrateur)**
   - Les administrateurs peuvent gérer les utilisateurs et consulter des statistiques avancées sur les parties jouées.

## Description des Pages

### Page d'accueil
Présente le projet avec un fond dynamique et un message de bienvenue pour les nouveaux utilisateurs. Permet d’accéder au tableau des jeux.

### Connexion / Inscription
Interface simple pour se connecter ou créer un compte.

### Tableau des Jeux
Permet de choisir un des 5 mini-jeux disponibles.

### Pages des Mini-Jeux
Chaque mini-jeu possède sa propre interface et ses mécaniques interactives.

### Profil Utilisateur
Affiche les informations de l’utilisateur, ses statistiques et son meilleur score. Inclut un bouton "Se déconnecter".

### Administration (Admin)
Permet aux administrateurs de gérer les utilisateurs, voir les statistiques des jeux, et consulter les scores des joueurs.


## ⚙️ Technologies utilisées

- PHP (Symfony)
- MySQL
- HTML, CSS, JavaScript
- Git

## 📝 Règles de codage

Afin d'assurer un code propre, lisible et maintenable, nous suivons les conventions suivantes :

# 🔹 Nommage des variables et fonctions
Utiliser le camelCase pour les variables et fonctions en PHP et JavaScript (exempleVariable).
Utiliser le PascalCase pour les classes (ExempleClasse).
Les constantes doivent être en UPPER_SNAKE_CASE (NOMBRE_MAX).
Éviter les abréviations peu claires (nbr ❌ → nombre ✅).

## 📂 Structure du projet

# Projet Symfony

## Arborescence du projet


```
/cpam
│── /bin
│── /config
│   │── /packages
│   │── /routes
│   │── /security
│   │── bundles.php
│   │── services.yaml
│── /migrations
│── /public
│   │── /assets
│   │── /autres (js, scss)
│   │── index.php
│── /src
│   │── /Controller
│   │── /Entity
│   │── /Repository
│   │── /Service
│   │── Kernel.php
│── /templates
│   │── /base.html.twig
│   │── /jeu
│   │   │── dino_jump.html.twig
│── /translations
│── /var
│   │── /cache
│   │── /logs
│── /vendor
│── .env
│── .gitignore
│── composer.json
│── composer.lock
│── symfony.lock
│── README.md
```

## Description des dossiers principaux

- **`bin/`** : Contient le fichier `console` pour les commandes CLI Symfony.
- **`config/`** : Contient la configuration de l’application (services, routes, sécurité).
- **`migrations/`** : Fichiers de migration pour la base de données (Doctrine).
- **`public/`** : Contient les fichiers accessibles publiquement (CSS, JS, images, index.php).
- **`src/`** :
  - **`Controller/`** : Contient les contrôleurs Symfony.
  - **`Entity/`** : Contient les entités Doctrine (modèles de la base de données).
  - **`Repository/`** : Contient les classes permettant d’interagir avec la base de données.
  - **`Service/`** : Contient des classes métiers pour la logique applicative.
  - **`Kernel.php`** : Point d’entrée principal de Symfony.
- **`templates/`** : Contient les fichiers Twig pour l’affichage (frontend).
- **`translations/`** : Stocke les fichiers de traduction pour l’internationalisation.
- **`var/`** : Contient le cache et les logs de l’application.
- **`vendor/`** : Contient toutes les dépendances installées via Composer.
- **`.env`** : Fichier de configuration des variables d’environnement.
- **`composer.json`** : Liste les dépendances PHP requises.

---

## Installation du projet

1. **Cloner le projet** :
   ```sh
   git clone https://github.com/Raphaelo2004/LesGlobulesBlancs.git
   cd LesGlobulesBlancs
   ```

2. **Installer les dépendances** :
   # si besoin
  ```sh
   composer install
   ```

3. **Configurer les variables d’environnement** :
   ```sh
   récupérer le .env du projet et celui de symfony

4. **Lancer le serveur Symfony** :
   ```sh
   dans le dossier LesGlobulesBlancs

   docker compose down
   docker compose up --build
   ```
   
5. **Créer la base de données** :
   ```sh
   docker exec -it symfony_web bash  

   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate

   se rendre sur "localhost:8060"
   se connecter avec les informations du .env
   executer le script de peuplement de la base de données
   ```

6. **Acceder à l'application** :
   entrez "localhost:8000" dans votre navigateur

---

## 👥 Membres de l'équipe

- 👨‍💻 **Rémi**
- 👨‍💻 **Alan**
- 👨‍💻 **Raphael**
- 👨‍💻 **Dorian**


---

📧 Pour toute question, contactez l'équipe via le dépôt GitHub.
