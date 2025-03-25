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

function createFallingObject(fallSpeed) {
    const object = document.createElement("img");
    object.src = "/assets/images/jeu2/pictos_bons/AideAuditive.png"; // Remplace par tes images
    object.classList.add("falling-object");

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
            requestAnimationFrame(fall);
        } else {
            document.body.removeChild(object); // Supprime l'objet en bas de l'écran
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

    console.log("Difficulté sélectionnée :", difficulty);

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
        }, 60000); // 60 secondes
    }, 3000); // 3 secondes de délai avant le démarrage du jeu
}
