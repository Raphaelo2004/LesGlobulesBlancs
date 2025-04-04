// Variables globales du jeu
const goodObjects = [
    "/assets/images/jeu4/good/Banane.png",
    "/assets/images/jeu4/good/Brocoli.png",
    "/assets/images/jeu4/good/Carotte.png",
    "/assets/images/jeu4/good/Pomme1.png",
    "/assets/images/jeu4/good/Pomme2.png"
];

const badObjects = [
    "/assets/images/jeu4/bad/Frites.png",
    "/assets/images/jeu4/bad/Hamburger.png",
    "/assets/images/jeu4/bad/Kebab.png",
    "/assets/images/jeu4/bad/Pizza.png",
    "/assets/images/jeu4/bad/Soda1.png",
    "/assets/images/jeu4/bad/Soda2.png"
];

let jeuCommence = false;
let jeuTermine = false;
let score = 0;
let errors = 0;
const maxErrors = 3;
let gameInterval = null;

// Variables pour l'effet de ligne et la détection de toucher
let lastX = 0;
let lastY = 0;
let isDrawing = false;
let currentLine = null;
let lines = [];
let isPointerDown = false; // Nouvelle variable pour suivre l'état de pression

const applaudissement = new Audio("/assets/SONS/JEU 5 - NETTOYAGE/Applaudissement de fin.mp3");
const bgMusic = new Audio("/assets/SONS/JEU 4 - FRUIT NINJA/Son-ambiance.mp3");
const epee = new Audio("/assets/SONS/JEU 4 - FRUIT NINJA/Epée.mp3");
const splash = new Audio("/assets/SONS/JEU 4 - FRUIT NINJA/Splash.mp3");

// Initialisation de l'effet de ligne
function initTouchEffect() {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer) {
        return;
    }

    const touchContainer = document.createElement('div');
    touchContainer.id = 'touch-lines-container';
    gameContainer.appendChild(touchContainer);

    setupTouchEventListeners();
}

// Configuration des événements tactiles
function setupTouchEventListeners() {
    // Événements pour le suivi de l'état de pression
    document.addEventListener('mousedown', () => { isPointerDown = true; });
    document.addEventListener('mouseup', () => { isPointerDown = false; });
    document.addEventListener('mouseleave', () => { isPointerDown = false; });
    
    document.addEventListener('touchstart', () => { isPointerDown = true; }, { passive: false });
    document.addEventListener('touchend', () => { isPointerDown = false; });
    
    // Événements existants pour le dessin des lignes
    document.addEventListener('mousedown', handleTouchStart);
    document.addEventListener('mousemove', handleTouchMove);
    document.addEventListener('mouseup', handleTouchEnd);
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

// Gestion du début du toucher
function handleTouchStart(e) {
    const gameContainer = document.getElementById("game-container");
    if (!gameContainer.contains(e.target)) return;

    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (x && y) {
        isDrawing = true;
        createNewLine(x, y);
    }
}

// Gestion du mouvement
function handleTouchMove(e) {
    if (!isDrawing) return;
    epee.play();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (x && y) {
        lastX = x;
        lastY = y;
        updateCurrentLine(x, y);
        
        // Détection des boîtes survolées pendant le mouvement
        if (isPointerDown) {
            const elements = document.elementsFromPoint(x, y);
            const box = elements.find(el => el.classList.contains('box'));
            if (box && box.dataset.sliced === "false") {
                handleBoxSlice(box);
            }
        }
    }
}

// Gestion de la fin du toucher
function handleTouchEnd() {
    isDrawing = false;
    currentLine = null;
}

// Création d'une nouvelle ligne
function createNewLine(x, y) {
    const touchContainer = document.getElementById('touch-lines-container');
    if (!touchContainer) return;
    
    const rect = touchContainer.getBoundingClientRect();
    
    currentLine = document.createElement('div');
    currentLine.className = 'touch-line';
    currentLine.style.left = (x - rect.left) + 'px';
    currentLine.style.top = (y - rect.top) + 'px';
    currentLine.style.width = '0px';
    
    touchContainer.appendChild(currentLine);
    lines.push(currentLine);
    
    cleanOldLines();
}

// Mise à jour de la ligne courante
function updateCurrentLine(x, y) {
    if (!currentLine) return;
    
    const touchContainer = document.getElementById('touch-lines-container');
    if (!touchContainer) return;
    
    const rect = touchContainer.getBoundingClientRect();
    
    const lineX = x - rect.left;
    const lineY = y - rect.top;
    const startX = parseFloat(currentLine.style.left);
    const startY = parseFloat(currentLine.style.top);
    
    const distance = Math.sqrt(Math.pow(lineX - startX, 2) + Math.pow(lineY - startY, 2));
    const angle = Math.atan2(lineY - startY, lineX - startX) * 180 / Math.PI;
    
    currentLine.style.width = distance + 'px';
    currentLine.style.transform = `rotate(${angle}deg)`;
    
    createNewLine(x, y);
}

// Nettoyage des anciennes lignes
function cleanOldLines() {
    const maxLines = 15;
    if (lines.length > maxLines) {
        const oldLine = lines.shift();
        if (oldLine) {
            oldLine.style.opacity = '0';
            setTimeout(() => {
                if (oldLine.parentNode) {
                    oldLine.parentNode.removeChild(oldLine);
                }
            }, 300);
        }
    }
}

// Fonction pour lancer le minuteur
function lancerMinuteur() {
    gameInterval = setInterval(spawnBox, 1000);
    
    setTimeout(() => {
        clearInterval(gameInterval);
        gameInterval = null;
        sendScoreToDatabase(score,4);
        updatePopupScore(score);
        updatePopupFin("gagne");
        applaudissement.play();
        ouvrirPopup(".popup_score");
    }, 60000);
}

// Fonction pour faire apparaître les objets
function spawnBox() {
    const gameArea = document.getElementById("game-container");
    if (!gameArea) return;

    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.sliced = "false";

    // Déterminer si c'est un bon ou mauvais objet
    const isGood = Math.random() > 0.5;
    const objectArray = isGood ? goodObjects : badObjects;
    const randomIndex = Math.floor(Math.random() * objectArray.length);
    const objectSrc = objectArray[randomIndex];

    // Créer l'image
    const img = document.createElement('img');
    img.src = objectSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    box.appendChild(img);

    // Position de départ
    const startX = Math.random() * (window.innerWidth - 200) + 100;
    const startY = window.innerHeight * 0.8 - 100;

    // Physique de chute
    const gravity = 2000;
    const hMax = window.innerHeight * 0.5;
    const minVelocityY = Math.sqrt(2 * gravity * hMax);
    const angle = (Math.random() * 10 + 85) * (Math.PI / 180);
    const velocityY = Math.random() * 450 + minVelocityY;
    const velocityX = Math.cos(angle) * (velocityY * 0.4);
    const rotationSpeed = (Math.random() * 200 - 100);
    let rotationAngle = 0;

    const startTime = performance.now();

    box.style.left = `${startX}px`;
    box.style.top = `${startY}px`;
    box.style.position = "absolute";

    gameArea.appendChild(box);

    // Animation de chute
    function animate(time) {
        const t = (time - startTime) / 1000;
        const newX = startX + velocityX * t;
        const newY = startY - (velocityY * t - 0.5 * gravity * t * t);

        box.style.left = `${newX}px`;
        box.style.top = `${newY}px`;
        rotationAngle += rotationSpeed * (1 / 60);
        box.style.transform = `rotate(${rotationAngle}deg)`;

        if (newY > window.innerHeight || newX < -50 || newX > window.innerWidth + 50) {
            box.remove();
            if (!isGood && box.dataset.sliced === "false") {
                // Malus quand un mauvais objet tombe sans être coupé
                score = Math.max(0, score - 20);
                updateScore(score);
            }
            // Rien ne se passe quand un bon objet tombe
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    box.addEventListener("click", () => handleBoxSlice(box));
    box.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleBoxSlice(box);
    }, { passive: false });

    requestAnimationFrame(animate);
}

// Fonction pour gérer la découpe d'une boîte
function handleBoxSlice(box) {
    if (box.dataset.sliced === "false") {
        box.dataset.sliced = "true";
        const imgSrc = box.querySelector('img').src;
        const isGood = goodObjects.some(goodImg => imgSrc.includes(goodImg.split('/').pop()));
        sliceBox(box, isGood);
    }
}

// Fonction pour découper un objet
function sliceBox(box, isGood) {
    const gameArea = document.getElementById("game-container");
    if (!gameArea) return;
    splash.play();
    // Mise à jour du score
    if (isGood) {
        errors++;
        updateErrors();
        if (errors == maxErrors) {
            sendScoreToDatabase(score,4)
            console.log("Perdu !");
            pauseChrono();
            pauseCountdown();
            updatePopupFin("perdu");
            updatePopupScore(score);
            ouvrirPopup(".popup_score");
            clearInterval(gameInterval);
            applaudissement.play();
        }
    } else {
        // Bonus quand un mauvais objet est coupé
        score += 50;
    }
    updateScore(score);

    // Animation simplifiée
    box.classList.add('slice-effect');
    createBurstEffect(box, isGood);

    // Suppression après animation
    setTimeout(() => box.remove(), 300);
}

function createBurstEffect(box, isGood) {
    const rect = box.getBoundingClientRect();
    const burst = document.createElement('div');
    burst.className = 'slice-burst';
    
    // Couleur différente selon le type d'objet
    burst.style.background = isGood 
        ? 'radial-gradient(circle, rgba(255,100,100,0.8) 0%, rgba(255,100,100,0) 70%)' 
        : 'radial-gradient(circle, rgba(100,255,100,0.8) 0%, rgba(100,255,100,0) 70%)';

    burst.style.left = `${rect.left + rect.width/2 - 15}px`;
    burst.style.top = `${rect.top + rect.height/2 - 15}px`;
    
    document.body.appendChild(burst);
    
    // Animation et suppression
    burst.animate([
        { transform: 'scale(0.5)', opacity: 1 },
        { transform: 'scale(1.5)', opacity: 0 }
    ], {
        duration: 400,
        easing: 'ease-out'
    }).onfinish = () => burst.remove();
}

// Mise à jour du score
function updateScore(value) {
    score = value;
    document.getElementById("score-value").textContent = score;
}

// Mise à jour des erreurs
function updateErrors() {
    const errorContainer = document.getElementById("error-container");
    if (!errorContainer) return;
    
    errorContainer.innerHTML = "";
    for (let i = 0; i < errors; i++) {
        const cross = document.createElement("span");
        cross.textContent = "❌";
        cross.style.margin = "5px";
        cross.style.fontSize = "32px";
        errorContainer.appendChild(cross);
    }
}

// Mise à jour du popup de fin
function updatePopupFin(finPartie) {
    const popupFinContent = document.querySelector('.popup_fin .popup-main p');
    if (!popupFinContent) return;

    if (finPartie === "perdu") {
        popupFinContent.innerHTML = `Dommage, tu as <strong>perdu</strong> !<br><br>
            L'Assurance Maladie offre aux jeunes de 16 à 25 ans un examen de prévention santé. Il peut être réalisé dans un centre d'examens de santé.<br><br>
            Objectif : faire le point sur sa santé et aborder les sujets de son choix avec des professionnels de santé, y compris sur l'alimentation !`;
    } else if (finPartie === "gagne") {
        popupFinContent.innerHTML = `Bravo, tu as <strong>réussi</strong> !<br><br>
            L'Assurance Maladie offre aux jeunes de 16 à 25 ans un examen de prévention santé. Il peut être réalisé dans un centre d'examens de santé.<br><br>
            Objectif : faire le point sur sa santé et aborder les sujets de son choix avec des professionnels de santé, y compris sur l'alimentation !`;
    }
}

// Initialisation du jeu
function startGame() {
    initTouchEffect();
        bgMusic.loop = true;
        bgMusic.volume = 0.5; // Volume réduit pour ne pas être trop intrusif
        bgMusic.play();
    jeuCommence = false;
    setTimeout(() => {
        jeuCommence = true;
        
        lancerMinuteur();
    }, 3000);
}

// Démarrer le jeu
window.startGame = startGame;