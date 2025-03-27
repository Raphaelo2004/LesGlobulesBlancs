function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let jeuCommence = false;
let jeuTermine = false;

function startGame() {
    // Bloquer le lancement des objets avant le début du jeu
    jeuCommence = false;
    setTimeout(() => {
        jeuCommence = true; // Autoriser le lancement des objets après 3 secondes
        lancerMinuteur();
    }, 3000);
}

// Démarrer le minuteur de 60 secondes
function lancerMinuteur() {
    setTimeout(() => {
        if (!jeuTermine) {
            console.log("Temps écoulé ! Vous avez perdu.");
            updatePopupFin("gagne");
            updatePopupScore();
            ouvrirPopup(".popup_score");
        }
    }, 60000);
}

function updateScore() {
    document.getElementById("score-value").textContent = score;

    //TODO calcul des points en fonction de l'objet
}