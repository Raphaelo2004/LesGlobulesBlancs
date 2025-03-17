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

## 🛠️ Installation

Clonez le dépôt :

```bash
git clone https://github.com/<votre-utilisateur>/serious-game-cpam.git
```

Installez les dépendances :

```bash
composer install
npm install
```

Configurez la base de données :

```bash
cp .env.example .env
```

Créez et migrez la base :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

Lancez le serveur :

```bash
symfony serve
```

## 📂 Structure du projet

```
serious-game-cpam/
├── assets/
├── bin/
├── config/
├── migrations/
├── public/
├── src/
│   ├── Controller/
│   ├── Entity/
│   ├── Repository/
│   └── ...
├── templates/
├── tests/
├── .env
├── composer.json
└── package.json
```

## 👥 Membres de l'équipe

- 👨‍💻 **Rémi**
- 👨‍💻 **Alan**
- 👨‍💻 **Raphael**
- 👨‍💻 **Dorian**

## 📜 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

📧 Pour toute question, contactez l'équipe via le dépôt GitHub.
