let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById("game");
    const bouche = document.getElementById("bouche");
    const brosse = document.getElementById("brosse");
    const dentifrice = document.getElementById("dentifrice");

    const brossage = new Audio("/assets/SONS/JEU 5 - NETTOYAGE/Brosse à dent bruitage.mp3");
    const applaudissement = new Audio("/assets/SONS/JEU 5 - NETTOYAGE/Applaudissement de fin.mp3");

    let touchedBacteria = new Set();
    let hasDentifrice = false;
    let holdingDentifrice = false;
    let holdingBrosse = false;
    let brosseHits = 0;
    score = 0;

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            setTimeout(() => {
                enableEvents();
            }, 4500);
        });
    });

    function enableEvents() {
        eventsEnabled = true;

        brosse.addEventListener("pointerdown", onBrossePointerDown);
        dentifrice.addEventListener("pointerdown", onDentifricePointerDown);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointermove", onPointerMove);
    }

    // Fonction pour gérer l'event "pointerdown" pour la brosse
    function onBrossePointerDown() {
        holdingBrosse = true;
    }

    // Fonction pour gérer l'event "pointerdown" pour le dentifrice
    function onDentifricePointerDown() {
        holdingDentifrice = true;
    }

    // Fonction pour gérer l'event "pointerup"
    function onPointerUp() {
        holdingBrosse = false;
        holdingDentifrice = false;
    }

    // Fonction pour gérer l'event "pointermove"
    function onPointerMove(e) {
        if (holdingBrosse || holdingDentifrice) {
            const element = holdingBrosse ? brosse : dentifrice;

            let gameRect = game.getBoundingClientRect();
            let newLeft = e.clientX - 25; 
            let newTop = e.clientY - 25; 

            // Empêcher l'élément de sortir du cadre du jeu
            if (newLeft < gameRect.left) {
                newLeft = gameRect.left;
            }
            if (newTop < gameRect.top) {
                newTop = gameRect.top;
            }
            if (newLeft + 50 > gameRect.right) {
                newLeft = gameRect.right - 50;
            }
            if (newTop + 50 > gameRect.bottom) {
                newTop = gameRect.bottom - 50;
            }

            // Met à jour la position de l'élément
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;

            if (hasDentifrice) {
                detectTouch();
            }

            if (holdingBrosse && hasDentifrice) {
                createTrailingEffect(newLeft, newTop);
            }

            if (holdingDentifrice) {
                let rectBrosse = brosse.getBoundingClientRect();
                if (
                    e.clientX >= rectBrosse.left && e.clientX <= rectBrosse.right &&
                    e.clientY >= rectBrosse.top && e.clientY <= rectBrosse.bottom
                ) {
                    hasDentifrice = true;
                    brosse.classList.add("avec-dentifrice");
                    updateBrosseImage();
                }
            }
        }
    }

    function createTrailingEffect(left, top) {
        // Nombre de traînées à créer pour un effet plus dense
        const numTrails = 5;
        
        // Crée plusieurs traînées (bulles) de tailles et opacités aléatoires
        for (let i = 0; i < numTrails; i++) {
            let trail = document.createElement('div');
            trail.classList.add('trail'); // On va lui appliquer un style spécifique pour la traînée
        
            // Applique la position à l'élément
            trail.style.position = 'absolute';
            trail.style.left = `${left + Math.random() * 30 - 15}px`;  // Légère variation de la position
            trail.style.top = `${top + Math.random() * 30 - 15}px`;  // Légère variation de la position
            
            // Taille aléatoire de la traînée (taille de la bulle)
            const size = Math.floor(Math.random() * 30) + 20; // Taille entre 20px et 50px
            trail.style.width = `${size}px`;
            trail.style.height = `${size}px`;
            
            // Forme circulaire
            trail.style.borderRadius = '50%';
            
            // Opacité aléatoire (plus transparent pour les traînées plus anciennes)
            const opacity = Math.random() * 0.5 + 0.3;  // Opacité entre 0.3 et 0.8
            trail.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            
            // Effet de disparition avec une animation douce
            trail.style.transition = 'transform 0.3s ease, opacity 0.5s ease-out';
            trail.style.pointerEvents = 'none'; // Ne pas interférer avec les autres événements
        
            // Ajoute la traînée au DOM
            game.appendChild(trail);
            
            // Supprimer la traînée après un délai pour l'effet de disparition
            setTimeout(() => {
                trail.style.transform = 'scale(0)';  // Réduit la taille pour l'effet de disparition
                trail.style.opacity = '0';  // Fait disparaître progressivement
            }, 10); // Ce délai est ajustable pour synchroniser l'effet
        
            setTimeout(() => {
                trail.remove();
            }, 500); // La traînée disparaît après 500ms
        }
    }

    function updateBrosseImage() {
        let img = brosse.querySelector("img"); // Sélectionne l'image à l'intérieur de brosse
    
        if (img) { // Vérifie que l'image existe bien
            if (hasDentifrice) {
                img.src = "/assets/images/brosse_a_dent_fixe_dentifrice.png";
            } else {
                img.src = "/assets/images/bosse a dent_fixe.png";
            }
        }
    }
    
    // Vérification des frottements
    function detectTouch() {
        let newlyTouched = new Set();
    
        bacteriaList.forEach(bacterie => {
            let rect1 = brosse.getBoundingClientRect();
            let rect2 = bacterie.getBoundingClientRect();
    
            if (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            ) {
                if (!touchedBacteria.has(bacterie)) {
                    let hits = parseInt(bacterie.dataset.hits) + 1;
                    bacterie.dataset.hits = hits;
                    brossage.play();
                    setTimeout(() => {
                        brossage.pause();
                    }, 1000);
                    // Vérifier si le nombre de hits a atteint le nombre requis
                    if (hits >= bacterie.dataset.hitsRequired) {
                    // Remplacer la bactérie par une mousse
                    let mousse = document.createElement("img");
                    const randomMousseIndex = Math.floor(Math.random() * 6) + 1; // Choisir une mousse entre mousse_1 et mousse_6
                    mousse.src = `/assets/images/mousse_${randomMousseIndex}.png`; // Charger l'image de mousse

                    // Taille de la mousse (la même taille que la bactérie supprimée)
                    mousse.style.width = "110px";
                    mousse.style.height = "110px";
                    mousse.style.objectFit = "contain";

                    // Placer la mousse à la même position que la bactérie
                    mousse.style.position = "absolute";
                    mousse.style.left = bacterie.style.left;
                    mousse.style.top = bacterie.style.top;

                    // Ajouter la mousse au jeu
                    bouche.appendChild(mousse);

                    // Supprimer la bactérie de la liste et du DOM
                    bacterie.remove();
                    score += 50; // Augmente le score
                    updateScore();
                    bacteriaList = bacteriaList.filter(b => b !== bacterie);
                    bacteriaList = bacteriaList.filter(b => b !== bacterie);

                    if (bacteriaList.length === 0) {
                        endGame();
                    }
                    }

                    brosseHits++;  // Compter les hits effectués par la brosse
                    // Si le nombre de hits atteint 10, réinitialiser l'état de dentifrice
                    if (brosseHits >= 10) {
                        hasDentifrice = false;
                        brosse.classList.remove("avec-dentifrice");
                        updateBrosseImage();
                        brosseHits = 0;
                    }
                }
                newlyTouched.add(bacterie);
            }
        });
    
        touchedBacteria = newlyTouched;
    }
 
    function endGame() {
        let img = bouche.querySelector("img");
        img.style.opacity = 0.7;
    
        setTimeout(() => {
            img.src = "/assets/images/bouche_propre.png";
            img.style.opacity = 1;
            jeuTermine = true;
            pauseChrono();
            updatePopupScore(score);
            sendScoreToDatabase(score,5);
            applaudissement.play();
            setTimeout(() => {
                ouvrirPopup('.popup_score');
            }, 2000);
        }, 1000);   
        
    }


});

let bacteriaList = [];
jeuTermine = false;

const bgMusic = new Audio("/assets/SONS/JEU 5 - NETTOYAGE/Son ambiance - nettoyage.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5; // Volume réduit pour ne pas être trop intrusif

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function startGame() {
    const difficulty = getQueryParam("difficulty");
    if (!difficulty) {
        console.warn("Aucune difficulté sélectionnée !");
        return;
    }

    console.log("Difficulté sélectionnée :", difficulty);
    
    switch (difficulty) {
        case "easy":
            nombre = 5;
            break;
        case "medium":
            nombre = 10;
            break;
        case "hard":
            nombre = 20;
            break;
        default:
            nombre = 10;
    }
bgMusic.play();
spawnBacteria(nombre);   
lancerMinuteur();

}

function lancerMinuteur(){
    setTimeout(() => {
        if (!jeuTermine) {
            console.log("Temps écoulé ! Vous avez perdu.");
            updatePopupScore(score);
            sendScoreToDatabase(score,1);
            ouvrirPopup(".popup_score");
        }
    }, 60000);
}

function spawnBacteria(nombre) {
    const largeur = 580;  // Largeur de l'ovale
    const hauteur = 700;   // Hauteur de l'ovale

    // Centre de l'ovale
    const circleCenterX = 0; // Nous utilisons 0 car la div "bouche" est centrée
    const circleCenterY = 0; // Idem, la div "bouche" est centrée

    // Rayon de l'ovale
    const circleRadiusX = largeur / 2;
    const circleRadiusY = hauteur / 2;

    // Récupère la div "bouche" et lui applique la position relative si nécessaire
    const bouche = document.getElementById('bouche');

    // Liste des positions des bactéries (pour vérifier l'écart)
    let bacteriaPositions = [];

    // Tableau des images de bactéries
    const bacteriaImages = [
        "microbe_7.png",
        "microbe_6.png",
        "microbe_5.png", 
        "microbe_4.png", 
        "microbe_3.png", 
        "microbe_2.png", 
        "microbe_1.png",
        "microbe__1.png", 
        "carie_haut.png", 
        "carie_gauche.png", 
        "carie_droite.png"
    ];

    // Générer les bactéries
    for (let i = 0; i < nombre; i++) {
        let bacterie = document.createElement("img");
        bacterie.classList.add("bacterie");

        // Choisir une image aléatoire
        const randomIndex = Math.floor(Math.random() * bacteriaImages.length);
        bacterie.src = `/assets/images/${bacteriaImages[randomIndex]}`; // Charger l'image aléatoire

        // Taille aléatoire entre 30px et 110px
        const randomSize = Math.floor(Math.random() * (110 - 30 + 1)) + 30; // Taille entre 30 et 110px
        bacterie.style.width = `${randomSize}px`;
        bacterie.style.height = `${randomSize}px`;
        bacterie.style.objectFit = "contain";

        // Calculer le nombre de hits nécessaires en fonction de la taille
        const hitsRequired = Math.ceil(randomSize / 20);  // Par exemple, 1 hit pour 30px, 5 hits pour 110px
        bacterie.dataset.hitsRequired = hitsRequired;  // Stocker le nombre de hits requis

        // Tentatives pour générer une position valide
        let isPositionValid = false;
        let bacterieX, bacterieY;

        while (!isPositionValid) {
            // Calculer un angle aléatoire pour chaque bactérie
            let angle = Math.random() * 2 * Math.PI;

            // Calculer les coordonnées x et y en utilisant les équations paramétriques d'un ovale
            bacterieX = circleCenterX + circleRadiusX * Math.cos(angle);
            bacterieY = circleCenterY + circleRadiusY * Math.sin(angle);

            // Vérifier si la position est suffisamment éloignée des autres bactéries
            isPositionValid = true;
            for (let j = 0; j < bacteriaPositions.length; j++) {
                let existingBacterie = bacteriaPositions[j];
                let distance = Math.sqrt(Math.pow(bacterieX - existingBacterie.x, 2) + Math.pow(bacterieY - existingBacterie.y, 2));

                // Si la distance est trop faible, on rejette la position
                if (distance < 50) {  // 50 pixels de distance minimale
                    isPositionValid = false;
                    break;
                }
            }
        }

        // Placer la bactérie sur le bord de l'ovale
        bacterie.style.position = "absolute";
        bacterie.style.left = `${bacterieX + bouche.offsetWidth / 2 - randomSize / 2}px`;  // Décalage pour centrer la bactérie
        bacterie.style.top = `${bacterieY + bouche.offsetHeight / 2 - randomSize / 2}px`;   // Décalage pour centrer la bactérie
        bacterie.dataset.hits = 0;  // Nombre de hits initial
        bouche.appendChild(bacterie);

        // Ajouter la position de la bactérie à la liste
        bacteriaPositions.push({ x: bacterieX, y: bacterieY });
        bacteriaList.push(bacterie);
    }
}
