document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------
    // Helper pour vérifier si le jeu est en pause en se basant sur l'animation de l'élément .needle
    function isGamePaused() {
        const needle = document.querySelector('.needle');
        if (needle) {
            return needle.style.animationPlayState === "paused";
        }
        return false;
    }
    
    // ------------------------------------------------------------------
    // Création du Dino (initialement caché)
    const dino = document.createElement("img");
    dino.src = "/assets/images/Jeu3/dinosaure_1.png";
    dino.classList.add("dino");
    dino.style.transformOrigin = "center bottom";
    document.body.appendChild(dino);
    
    let isJumping = false;
    let score = 0;
    let gameEnded = false;
    let collectedIban = [];
    
    // IBAN dans l'ordre souhaité
    const ibanParts = ["FR", "14", "11", "56", "12", "13", "9", "34", "12_1", "78"];
    
    // ------------------------------------------------------------------
    // Création de la zone de score (initialement cachée)
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");
    scoreContainer.style.display = "none"; // Masqué jusqu'au lancement du jeu
    scoreContainer.innerHTML = `<h1>Score : ${score}</h1>`;
    document.body.appendChild(scoreContainer);
    
    // ------------------------------------------------------------------
    // Mise à jour de l'affichage du score
    function updateScore() {
        scoreContainer.querySelector("h1").textContent = `Score : ${score}`;
    }
    
    // ------------------------------------------------------------------
    // Mise à jour de l'affichage de l'IBAN (chaque zone fait exactement 80×80)
    function updateIbanDisplay() {
        const ibanDisplay = document.getElementById("error-container");
        ibanDisplay.innerHTML = "";
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
                img.style.width = "100%";
                img.style.height = "100%";
                digitZone.appendChild(img);
            }
            ibanDisplay.appendChild(digitZone);
        });
    }
    
    // ------------------------------------------------------------------
    // Fonction de saut du Dino
    function jump() {
        if (isJumping) return;
        isJumping = true;
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
                        let newBottom = 27 + count * jumpStep;
                        dino.style.bottom = `${newBottom}%`;
                        let angle = maxAngle * (count / jumpHeight);
                        dino.style.transform = `translateX(-50%) rotate(${angle}deg)`;
                        let shadowOffset = (jumpHeight - count) * 2;
                        dino.style.filter = `drop-shadow(0px ${shadowOffset}px ${shadowOffset}px rgba(0,0,0,0.5))`;
                    }, intervalDelay);
                }, 200);
            } else {
                count++;
                let newBottom = 27 + count * jumpStep;
                dino.style.bottom = `${newBottom}%`;
                let angle = maxAngle * (count / jumpHeight);
                dino.style.transform = `translateX(-50%) rotate(${angle}deg)`;
                let shadowOffset = (jumpHeight - count) * 2;
                dino.style.filter = `drop-shadow(0px ${shadowOffset}px ${shadowOffset}px rgba(0,0,0,0.5))`;
            }
        }, intervalDelay);
    }
    
    // ------------------------------------------------------------------
    // Fonctions de scheduling pour lancer les cactus et les chiffres IBAN
    function scheduleCactus() {
        let delay = Math.random() * 1500 + 1000; // entre 1000 et 2500 ms
        setTimeout(() => {
            if (isGamePaused()) {
                scheduleCactus();
            } else {
                createCactus();
            }
        }, delay);
    }
    function scheduleIbanDigit() {
        let delay = Math.random() * 3000 + 2000; // entre 2000 et 5000 ms
        setTimeout(() => {
            if (isGamePaused()) {
                scheduleIbanDigit();
            } else {
                createIbanDigit();
            }
        }, delay);
    }
    
    // ------------------------------------------------------------------
    // Création et animation des cactus
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
                score -= 100;
                updateScore();
                updatePopupFin("perdu");
                updatePopupScore(score);
                ouvrirPopup(".popup_score");
                gameEnded = true;
                return;
            } else {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
        scheduleCactus(); // Planifie le prochain cactus
    }
    
    // ------------------------------------------------------------------
    // Création et animation des chiffres IBAN
    function createIbanDigit() {
        if (gameEnded) return;
        if (collectedIban.length === ibanParts.length) {
            gameEnded = true;
            sendScoreToDatabase(score, 2);
            updatePopupFin("gagne");
            updatePopupScore(score);
            ouvrirPopup(".popup_score");
            return;
        }
        const remainingParts = ibanParts.filter(part => !collectedIban.includes(part));
        const randomIndex = Math.floor(Math.random() * remainingParts.length);
        const part = remainingParts[randomIndex];
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
                    sendScoreToDatabase(score, 2);
                    updatePopupFin("gagne");
                    updatePopupScore(score);
                    ouvrirPopup(".popup_score");
                    return;
                }
                return;
            } else {
                requestAnimationFrame(animateDigit);
            }
        }
        requestAnimationFrame(animateDigit);
        scheduleIbanDigit(); // Planifie le prochain chiffre
    }
    
    // ------------------------------------------------------------------
    // Détection de collision entre le Dino et un élément
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
    
    // ------------------------------------------------------------------
    // Contrôles de saut (clic / toucher)
    document.addEventListener("click", jump);
    document.addEventListener("touchstart", jump);
    
    // ------------------------------------------------------------------
    // Fonction globale de lancement du jeu, appelée après le clic sur le bouton
    // Le jeu se lance 4 secondes après le clic, puis 2,5 secondes plus tard les éléments commencent à apparaître
    window.startGame = function() {
        setTimeout(function() {
            // Réinitialisation des variables du jeu
            score = 0;
            gameEnded = false;
            collectedIban = [];
            updateScore();
            updateIbanDisplay();
            // Affiche le Dino et la zone de score
            dino.style.display = "block";
            scoreContainer.style.display = "block";
            // Lancement différé des éléments du jeu après 2,5 secondes supplémentaires
            setTimeout(() => {
                scheduleCactus();
                scheduleIbanDigit();
            }, 2500);
        }, 4000);
    };
    
    // ------------------------------------------------------------------
    // Fonction pour mettre à jour la pop-up de fin de partie
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
});
