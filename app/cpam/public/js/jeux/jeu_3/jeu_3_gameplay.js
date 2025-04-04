document.addEventListener("DOMContentLoaded", () => {
    // --- Création d'un élément factice "needle" s'il n'existe pas (pour éviter l'erreur dans pauseChrono) ---
    if (!document.querySelector('.needle')) {
        const dummyNeedle = document.createElement("div");
        dummyNeedle.className = "needle";
        dummyNeedle.style.position = "absolute";
        dummyNeedle.style.top = "0";
        dummyNeedle.style.left = "0";
        dummyNeedle.style.width = "0";
        dummyNeedle.style.height = "0";
        document.body.appendChild(dummyNeedle);
    }

    // ===> NOUS N’UTILISONS PLUS DE #collision-container DISTINCT
    // ===> TOUT PASSE PAR #error-container.

    // Récupération du div #error-container
    // On va y créer nos 2 sous-conteneurs :
    const errorContainer = document.getElementById("error-container");

    // Sous-conteneur pour afficher les croix de collision
    const collisionCrossesContainer = document.createElement("div");
    collisionCrossesContainer.id = "collision-crosses";
    collisionCrossesContainer.style.marginBottom = "15px";
    // On le place en haut de #error-container
    errorContainer.appendChild(collisionCrossesContainer);

    // Sous-conteneur pour l’IBAN
    const ibanDigitsContainer = document.createElement("div");
    ibanDigitsContainer.id = "iban-digits";
    errorContainer.appendChild(ibanDigitsContainer);

    // --- Récupération initiale du niveau via l'URL ---
    let urlParams = new URLSearchParams(window.location.search);
    let difficulty = urlParams.get("difficulty") || "medium";
    console.log("Initial difficulty:", difficulty);

    // Compteur de collisions (mode hard)
    let collisionCount = 0; 

    // --- Fonction pour afficher les croix rouges en mode hard ---
    function updateCollisionCrosses() {
        // On vide le conteneur de croix puis on insère 'collisionCount' croix rouges
        collisionCrossesContainer.innerHTML = "";
        for (let i = 0; i < collisionCount; i++) {
            const cross = document.createElement("span");
            cross.textContent = "❌";
            cross.style.margin = "5px";
            cross.style.fontSize = "32px";
            collisionCrossesContainer.appendChild(cross);
        }
    }

    // --- Sons ---
    const bgMusic = new Audio("/assets/SONS/JEU 3 - DINO/Son ambiance DINO.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    const jumpSound = new Audio("/assets/SONS/JEU 3 - DINO/Saut.mp3");
    const badSound = new Audio("/assets/SONS/JEU 3 - DINO/FAUX.mp3");
    const applauseSound = new Audio("/assets/SONS/JEU 3 - DINO/Applaudissement de fin.mp3");

    // --- Variables globales de pause ---
    window.isPaused = false;
    function isGamePaused() {
        return window.isPaused;
    }
    let canJump = false;  // Empêche le saut pendant la pause, etc.

    // --- Création du Dino ---
    const dino = document.createElement("img");
    dino.src = "/assets/images/Jeu3/dinosaure_1.png";
    dino.classList.add("dino");
    dino.style.transformOrigin = "center bottom";
    document.body.appendChild(dino);

    let isJumping = false;
    let score = 0;
    let gameEnded = false;
    let collectedIban = [];
    const ibanParts = ["FR", "14", "11", "56", "12", "13", "9", "34", "12_1", "78"];

    // --- Zone de score ---
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");
    scoreContainer.style.display = "none";
    scoreContainer.innerHTML = `<h1 style="display: none;">Score : ${score}</h1>`;
    document.body.appendChild(scoreContainer);

    function updateScore() {
        scoreContainer.querySelector("h1").textContent = `Score : ${score}`;
    }

    // --- Mise à jour de l'affichage de l'IBAN ---
    function updateIbanDisplay() {
        // On vide UNIQUEMENT la zone IBAN, PAS la zone des croix
        ibanDigitsContainer.innerHTML = "";
        ibanParts.forEach(part => {
            const digitZone = document.createElement("div");
            digitZone.classList.add("iban-digit-zone");
            digitZone.style.display = "inline-block";
            digitZone.style.width = "80px";
            digitZone.style.height = "80px";
            digitZone.style.margin = "0 5px";

            if (collectedIban.includes(part)) {
                const img = document.createElement("img");
                img.src = `/assets/images/jeu3/${part}.png`;
                img.alt = part;
                img.classList.add("iban-digit");
                if (part === "9") {
                    img.style.height = "100%"; 
                } else {
                    img.style.width = "100%";
                    img.style.height = "100%";
                }
                digitZone.appendChild(img);
            }
            ibanDigitsContainer.appendChild(digitZone);
        });
    }

    // --- Fonction de saut du Dino ---
    function jump() {
        if (!canJump) return;
        if (isJumping) return;
        isJumping = true;
        if (difficulty !== "hard") {
            jumpSound.currentTime = 0;
            jumpSound.play();
        }
        let count = 0;
        const jumpHeight = 10;
        const jumpStep = 2.5;
        const intervalDelay = 30;
        const maxAngle = -25;
        const upInterval = setInterval(() => {
            if (isGamePaused()) return;
            if (count >= jumpHeight) {
                clearInterval(upInterval);
                setTimeout(() => {
                    const downInterval = setInterval(() => {
                        if (isGamePaused()) return;
                        if (count <= 0) {
                            clearInterval(downInterval);
                            isJumping = false;
                            dino.style.bottom = "27%";
                            dino.style.transform = "translateX(-50%) rotate(0deg)";
                            dino.style.filter = "";
                            return;
                        }
                        count--;
                        dino.style.bottom = `${27 + count * jumpStep}%`;
                        dino.style.transform = `translateX(-50%) rotate(${maxAngle * (count / jumpHeight)}deg)`;
                        dino.style.filter = `drop-shadow(0px ${(jumpHeight - count) * 2}px ${(jumpHeight - count) * 2}px rgba(0,0,0,0.5))`;
                    }, intervalDelay);
                }, 200);
            } else {
                count++;
                dino.style.bottom = `${27 + count * jumpStep}%`;
                dino.style.transform = `translateX(-50%) rotate(${maxAngle * (count / jumpHeight)}deg)`;
                dino.style.filter = `drop-shadow(0px ${(jumpHeight - count) * 2}px ${(jumpHeight - count) * 2}px rgba(0,0,0,0.5))`;
            }
        }, intervalDelay);
    }

    // --- Scheduling pour les cactus et les chiffres IBAN ---
    function scheduleCactus() {
        let delay = Math.random() * 1500 + 1000;
        setTimeout(() => {
            if (isGamePaused()) {
                scheduleCactus();
            } else {
                createCactus();
            }
        }, delay);
    }

    function scheduleIbanDigit() {
        let delay = Math.random() * 3000 + 2000;
        setTimeout(() => {
            if (isGamePaused()) {
                scheduleIbanDigit();
            } else {
                createIbanDigit();
            }
        }, delay);
    }

    // --- Création & animation des cactus ---
    function createCactus() {
        if (gameEnded) return;
        const cactus = document.createElement("img");
        const type = Math.floor(Math.random() * 3) + 1;
        cactus.src = `/assets/images/Jeu3/cactus_${type}.png`;
        cactus.classList.add("falling-object");
        let left = window.innerWidth;
        cactus.style.transform = `translateX(${left}px)`;
        cactus.style.position = "fixed";
        cactus.style.bottom = "27%";
        cactus.style.width = "90px";
        cactus.style.height = "auto";
        cactus.style.zIndex = "800";
        document.body.appendChild(cactus);
        const speed = 25;

        function animate() {
            if (gameEnded) return;
            if (isGamePaused()) {
                requestAnimationFrame(animate);
                return;
            }
            left -= speed;
            cactus.style.transform = `translateX(${left}px)`;
            if (left < -cactus.offsetWidth) {
                cactus.remove();
            } else if (checkCollision(dino, cactus)) {
                cactus.remove();
                badSound.currentTime = 0;
                badSound.play();

                // ===> AFFICHE LES CROIX SI ON EST EN "hard"
                if (difficulty === "hard") {
                    collisionCount++;
                    updateCollisionCrosses();  // Mise à jour de l’affichage des ❌
                    
                    console.log("Collision count:", collisionCount);
                    if (collisionCount >= 3) {
                        gameEnded = true;
                        canJump = false;
                        updatePopupFin("perdu");
                        updatePopupScore(score);
                        ouvrirPopup(".popup_score");
                        bgMusic.pause();
                    } else {
                        score -= 100;
                        updateScore();
                    }
                } else {
                    score -= 100;
                    updateScore();
                }
            } else {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
        scheduleCactus();
    }

    // --- Création & animation des chiffres IBAN ---
    function createIbanDigit() {
        if (gameEnded) return;
        if (collectedIban.length === ibanParts.length) return;
        const remainingParts = ibanParts.filter(part => !collectedIban.includes(part));
        const part = remainingParts[Math.floor(Math.random() * remainingParts.length)];
        const digit = document.createElement("img");
        digit.src = `/assets/images/jeu3/${part}.png`;
        digit.classList.add("iban-digit");
        let left = window.innerWidth;
        digit.style.transform = `translateX(${left}px)`;
        digit.style.position = "fixed";
        digit.style.bottom = "50%";
        digit.style.width = "80px";
        digit.style.height = "80px";
        digit.style.zIndex = "900";
        document.body.appendChild(digit);
        const speed = 8;
        function animateDigit() {
            if (gameEnded) return;
            if (isGamePaused()) {
                requestAnimationFrame(animateDigit);
                return;
            }
            left -= speed;
            digit.style.transform = `translateX(${left}px)`;
            if (left < -digit.offsetWidth) {
                digit.remove();
            } else if (checkCollision(dino, digit)) {
                digit.remove();
                if (!collectedIban.includes(part)) {
                    collectedIban.push(part);
                }
                score += 100;
                updateScore();
                updateIbanDisplay();
                if (collectedIban.length === ibanParts.length) {
                    gameEnded = true;
                    canJump = false;
                    sendScoreToDatabase(score, 3);
                    updatePopupFin("gagne");
                    updatePopupScore(score);
                    ouvrirPopup(".popup_score");
                    applauseSound.currentTime = 0;
                    applauseSound.play();
                    bgMusic.pause();
                }
            } else {
                requestAnimationFrame(animateDigit);
            }
        }
        requestAnimationFrame(animateDigit);
        scheduleIbanDigit();
    }

    // --- Détection de collision ---
    function checkCollision(dino, element) {
        const dinoRect = dino.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        return !(
            dinoRect.top > elementRect.bottom ||
            dinoRect.bottom < elementRect.top ||
            dinoRect.right < elementRect.left ||
            dinoRect.left > elementRect.right
        );
    }

    // --- Contrôles (clic et touch) ---
    document.addEventListener("click", jump);
    document.addEventListener("touchstart", jump);

    // --- Lancement global du jeu ---
    window.startGame = function() {
        urlParams = new URLSearchParams(window.location.search);
        difficulty = urlParams.get("difficulty") || "medium";
        console.log("Starting game with difficulty:", difficulty);
        collisionCount = 0;
        updateCollisionCrosses(); // On remet à zéro l’affichage des ❌
        
        setTimeout(function() {
            score = 0;
            gameEnded = false;
            collectedIban = [];
            updateScore();
            updateIbanDisplay();
            dino.style.display = "block";
            scoreContainer.style.display = "block";
            bgMusic.currentTime = 0;
            bgMusic.play();
            setTimeout(() => {
                scheduleCactus();
                scheduleIbanDigit();
            }, 2500);
            // Autoriser le saut après 2s de jeu effectif
            setTimeout(() => {
                if (!gameEnded && !window.isPaused) {
                    canJump = true;
                }
            }, 2000);
        }, 4000);
    };

    function updatePopupFin(finPartie) {
        const popupFinContent = document.querySelector('.popup_fin .popup-main p');
        if (popupFinContent) {
            if (finPartie === "perdu") {
                popupFinContent.innerHTML = `Dommage, tu as <strong>perdu</strong> !<br>
                    Les remboursements de l’Assurance Maladie se font par virement bancaire. <br>
                    Depuis ton compte ameli, enregistrer ton RIB c’est être sûr de recevoir les remboursements sur ton propre compte bancaire ! `;
            } else if (finPartie === "gagne") {
                popupFinContent.innerHTML = `Bravo, tu as <strong>réussi</strong> !<br><br>
                    Les remboursements de l’Assurance Maladie se font par virement bancaire. <br><br>
                    Depuis ton compte ameli, enregistrer ton RIB c’est être sûr de recevoir les remboursements sur ton propre compte bancaire !`;
            }
        }
    }

    // --- Gestion de la pause via l'écran de pause ---
    window.pauseSpecificGame = function () {
        window.isPaused = true;
        canJump = false;
        console.log("Jeu en pause");
    };

    window.reprendreSpecificGame = function () {
        window.isPaused = false;
        if (!gameEnded) {
            canJump = true;
        }
        console.log("Jeu repris");
    };

    // Les fonctions sendScoreToDatabase, updatePopupScore et ouvrirPopup
    // doivent être définies dans votre code global.
});
