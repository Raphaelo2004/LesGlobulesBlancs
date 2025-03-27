document.addEventListener("DOMContentLoaded", function () {
    const tirelire = document.getElementById("tirelire");
    let isDragging = false;
    let offsetX = 0;

    tirelire.addEventListener("touchstart", function (event) {
        isDragging = true;
        offsetX = event.touches[0].clientX - tirelire.offsetLeft;
    });

    document.addEventListener("touchmove", function (event) {
        if (!isDragging) return;
        event.preventDefault(); // Empêche le scrolling sur mobile

        let newX = event.touches[0].clientX - offsetX;
        let maxX = window.innerWidth - tirelire.offsetWidth + 150; // Limite droite
        newX = Math.max(150, Math.min(newX, maxX)); // Reste dans l'écran

        tirelire.style.left = newX + "px";
    });

    document.addEventListener("touchend", function () {
        isDragging = false;
    });
});

let gameInterval;
let score = 0;
let errors = 0;

const maxErrors = 3; // Perte après 3 erreurs
const goodPictos = [
    "/assets/images/jeu2/pictos_bons/AideAuditive.png",
    "/assets/images/jeu2/pictos_bons/Dentiste.png",
    "/assets/images/jeu2/pictos_bons/Hopital.png",
    "/assets/images/jeu2/pictos_bons/Medecin.png",
    "/assets/images/jeu2/pictos_bons/Optique.png",
    "/assets/images/jeu2/pictos_bons/TransportSanitaire.png"
];

const badPictos = [
    "/assets/images/jeu2/pictos_faux/ampoule.png",
    "/assets/images/jeu2/pictos_faux/courrier.png",
    "/assets/images/jeu2/pictos_faux/etude.png",
    "/assets/images/jeu2/pictos_faux/livre.png",
    "/assets/images/jeu2/pictos_faux/maison.png",
    "/assets/images/jeu2/pictos_faux/puzzle.png",
    "/assets/images/jeu2/pictos_faux/telephone.png"
];

const bgMusic = new Audio("/assets/SONS/JEU 2 - RAMASSEUR/Son ambiance - Ramasseur.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5; // Volume réduit pour ne pas être trop intrusif

const goodSound = new Audio("/assets/SONS/JEU 2 - RAMASSEUR/Bruitage dans tirelire cochon.mp3");
const badSound = new Audio("/assets/SONS/JEU 2 - RAMASSEUR/FAUX.mp3");
const applaudissement = new Audio("/assets/SONS/JEU 2 - RAMASSEUR/Applaudissement de fin.mp3");

function createFallingObject(fallSpeed) {
    const object = document.createElement("img");
    const isGood = Math.random() > 0.5; // 50% chance d'être un bon ou mauvais objet
        object.src = isGood ? 
            goodPictos[Math.floor(Math.random() * goodPictos.length)] :
            badPictos[Math.floor(Math.random() * badPictos.length)];
        object.classList.add("falling-object");
        object.dataset.good = isGood; // Attribut pour identifier l'objet

    // Position aléatoire sur l'axe X
    const randomX = Math.random() * (window.innerWidth - 100); // Ajuste en fonction de la taille
    object.style.left = `${randomX}px`;

    document.body.appendChild(object);

    // Animation de la chute
    let positionY = 0;

    function fall() {
        if (positionY < window.innerHeight) {
            positionY += fallSpeed;
            object.style.top = `${positionY}px`;

            // Vérifier collision avec la tirelire
            const tirelireRect = tirelire.getBoundingClientRect();
            const objectRect = object.getBoundingClientRect();

            if (
                objectRect.bottom >= tirelireRect.top &&  // L'objet atteint le haut de la tirelire
                objectRect.top <= tirelireRect.bottom && // L'objet est encore dans la tirelire
                objectRect.left < tirelireRect.right &&
                objectRect.right > tirelireRect.left
            ) {
                document.body.removeChild(object);
                if (object.dataset.good === "true") {
                    goodSound.play();
                    score += 30; // Augmente le score
                    updateScore();
                    console.log("Score:", score);
                } else {
                    badSound.play();
                    errors++;
                    updateErrors();
                    console.log("Erreurs:", errors);
                    if (errors >= maxErrors) {
                        console.log("Perdu !");
                        pauseChrono();
                        pauseCountdown();
                        updatePopupFin("perdu");
                        updatePopupScore();
                        ouvrirPopup(".popup_score");
                        clearInterval(gameInterval);
                    }
                }
            } else {
                requestAnimationFrame(fall);
            }
        } else {
            document.body.removeChild(object);
        }
    }

    fall();
}


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

    // Jouer la musique de fond
    bgMusic.play();

    let fallSpeed;
    let timeBetweenObj;
    
    switch (difficulty) {
        case "easy":
            fallSpeed = 3; // Vitesse lente
            timeBetweenObj = 4000; // temps lent
            break;
        case "medium":
            fallSpeed = 4; // Vitesse moyenne
            timeBetweenObj = 3000; // temps moyen
            break;
        case "hard":
            fallSpeed = 6; // Vitesse rapide
            timeBetweenObj = 1000; // temps rapide
            break;
        default:
            fallSpeed = 4; // Valeur par défaut si aucune difficulté n'est définie
            timeBetweenObj = 3000; // Valeur par défaut si aucune difficulté n'est définie
    }

    // Délai de 3 secondes avant de commencer à faire tomber les objets
    setTimeout(() => {
        gameInterval = setInterval(() => {
            createFallingObject(fallSpeed);
        }, timeBetweenObj);

        // Arrêter le jeu après 60 secondes
        setTimeout(() => {
            clearInterval(gameInterval);
            console.log("Fin du jeu ! Plus aucun objet ne tombe.");
            updatePopupFin("gagne");
            updatePopupScore();
            applaudissement.play();
            ouvrirPopup(".popup_score");
        }, 60000); // 60 secondes
    }, 3000); // 3 secondes de délai avant le démarrage du jeu
}

function updateScore() {
    document.getElementById("score-value").textContent = score;

    const jauge = document.querySelector(".fixed-jauge");

    if (score >= 800) {
        jauge.src = "/assets/images/Jauge-05.png";
    } else if (score >= 600) {
        jauge.src = "/assets/images/Jauge-04.png";
    } else if (score >= 400) {
        jauge.src = "/assets/images/Jauge-03.png";
    } else if (score >= 200) {
        jauge.src = "/assets/images/Jauge-02.png";
    }
}

function updateErrors() {
    const errorContainer = document.getElementById("error-container");
    errorContainer.innerHTML = ""; // On vide pour recréer l'affichage

    for (let i = 0; i < errors; i++) {
        const cross = document.createElement("span");
        cross.textContent = "❌";
        cross.style.margin = "5px";
        cross.style.fontSize = "32px"; // Ajuste la taille de la croix
        errorContainer.appendChild(cross);
    }
}

function updatePopupFin(finPartie) {
    const popupFinContent = document.querySelector('.popup_fin .popup-main p');

    if (finPartie === "perdu") {
        popupFinContent.innerHTML = `Dommage, tu as <strong>perdu</strong> !<br><br>
            La complémentaire santé solidaire (C2S) est une aide pour payer ses dépenses de santé, si tes ressources sont faibles. Avec la C2S tu ne paies pas le médecin, ni tes médicaments en pharmacie. La plupart des lunettes et des soins dentaires sont pris en charge.<br><br>
            Tu peux faire une simulation sur <a href='https://www.ameli.fr' target='_blank'>ameli.fr</a> pour savoir si tu y as droit !`;
    } else if (finPartie === "gagne") {
        popupFinContent.innerHTML = `Bravo, tu as <strong>réussi</strong> !<br><br>
            La complémentaire santé solidaire (C2S) est une aide pour payer ses dépenses de santé, si tes ressources sont faibles. Avec la C2S tu ne paies pas le médecin, ni tes médicaments en pharmacie. La plupart des lunettes et des soins dentaires sont pris en charge.<br><br>
            Tu peux faire une simulation sur <a href='https://www.ameli.fr' target='_blank'>ameli.fr</a> pour savoir si tu y as droit !`;
    }
}


function updatePopupScore() {
    const popupScoreTitle = document.querySelector('.popup_score .popup-header h1');
    popupScoreTitle.innerHTML = `Score : ` + score;
}