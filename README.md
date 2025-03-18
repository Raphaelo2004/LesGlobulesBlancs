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
│   │── /build
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
   git clone git@github.com:votre-repo/mon_projet_symfony.git
   cd mon_projet_symfony
   ```

2. **Installer les dépendances** :
   ```sh
   composer install
   ```

3. **Configurer les variables d’environnement** :
   ```sh
   cp .env.example .env
   ```
   Modifier les variables selon votre configuration.

4. **Créer la base de données** :
   ```sh
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   ```

5. **Lancer le serveur Symfony** :
   ```sh
   symfony server:start
   ```

---

## Contribution

1. **Créer une branche** :
   ```sh
   git checkout -b feature/nom-de-la-fonctionnalité
   ```
2. **Faire vos modifications**.
3. **Commit et push** :
   ```sh
   git add .
   git commit -m "Ajout de la fonctionnalité X"
   git push origin feature/nom-de-la-fonctionnalité
   ```
4. **Ouvrir une pull request** sur GitHub.

---

## Contact

Équipe de développement :
- Rémi
- Alan
- Raphaël
- Dorian

Pour toute question, contactez-nous à `support@votreprojet.com`.


## 👥 Membres de l'équipe

- 👨‍💻 **Rémi**
- 👨‍💻 **Alan**
- 👨‍💻 **Raphael**
- 👨‍💻 **Dorian**


---

📧 Pour toute question, contactez l'équipe via le dépôt GitHub.
