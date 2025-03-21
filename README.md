# Serious Game CPAM -LesGlobulesBlancs-

Bienvenue sur le dépôt Git du projet Serious Game CPAM, réalisé par l'équipe composée de **Rémi, Alan, Raphael et Dorian**.

---

## 🚀 Description du Projet

Ce Serious Game vise à sensibiliser les jeunes adultes (18-25 ans) à divers services proposés par la CPAM à travers une série de **5 mini-jeux interactifs**.

## 🎮 Liste des Mini-Jeux

- **Carte Vitale – Taquin express**
- **C2S – Le ramasseur d’aides**
- **RIB – Dino Jump**
- **Examen de prévention – Fruit Santé**
- **M’T Dents – Nettoyage chrono**

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
