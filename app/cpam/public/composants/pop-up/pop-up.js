document.addEventListener('DOMContentLoaded', function () {
    let chronoInterval; 
    window.chronoTimeLeft = 60;
    let isPaused = false;
    
    let countdown = 3; 
    let countdownInterval; 
    let isCountdownPaused = false;

    fermerPopupAvecNom(".popup_score");
    fermerPopupAvecNom(".popup_fin");

    function fermerPopupAvecNom(nom_popup) {
        const popups = document.querySelectorAll(nom_popup);

        popups.forEach(popup => {
            popup.style.display = 'none';
        });
    }

    function fermerPopup() {
        const popupOverlay = document.querySelector('.popup-overlay');
        const popupContainer = document.querySelector('.popup-container');

        if (popupOverlay && popupContainer) {
            popupOverlay.style.display = 'none';
            popupContainer.style.display = 'none';
        }

        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get("difficulty")){
            startGame();
        }
    }

    function pauseChrono() {
        isPaused = true;
        clearInterval(chronoInterval); // Stopper complètement le chronomètre
        const chronoNeedle = document.querySelector('.needle');
        chronoNeedle.style.animationPlayState = "paused";
    }

    function ouvrirPopup(nom_popup) {
        const popups = document.querySelectorAll(nom_popup);
        // Parcourt chaque popup et l'affiche en modifiant son style
        popups.forEach(popup => {
            popup.style.display = 'block';
        });
    }

    function gererDepart() {
        const countdownContainer = document.getElementById('countdown');
        if (!countdownContainer) return;

        countdown = 3;
        isCountdownPaused = false;
        countdownContainer.style.display = "block";

        clearInterval(countdownInterval); // Nettoyage des anciens intervalles
        clearInterval(chronoInterval); // Stopper le chrono avant de relancer le décompte

        countdownInterval = setInterval(() => {
            if (countdown > 0) {
                countdownContainer.textContent = countdown;
            } else {
                countdownContainer.textContent = "GO!";
                clearInterval(countdownInterval);

                setTimeout(() => {
                    countdownContainer.style.display = "none";
                    lancerChrono(); // Ne démarre le chrono qu'après le GO
                }, 500);
            }
            countdown--;
        }, 1000);
    }

    function pauseCountdown() {
        countdown = 3; 
        isCountdownPaused = true;
        const countdownContainer = document.getElementById('countdown');
        countdownContainer.textContent = "";
    }

    function lancerChrono() {
        const chronoCheckbox = document.getElementById('run');
        const chronoNeedle = document.querySelector('.needle');

        if (!chronoCheckbox || !chronoNeedle) return;

        isPaused = false;
        chronoCheckbox.checked = true;

        clearInterval(chronoInterval); // Nettoyage des anciens intervalles
        chronoInterval = setInterval(() => {
            if (!isPaused) {
                chronoTimeLeft--;
                if (chronoTimeLeft <= 0) {
                    clearInterval(chronoInterval);
                    chronoCheckbox.checked = false;

                    // afficher popup score
                    ouvrirPopup(".popup_score");
                }
            }
            // console.log("chronoInterval:", chronoInterval);
            // console.log("chronoTimeLeft:", chronoTimeLeft);
            // console.log("isPaused:", isPaused);
            // console.log("countdownInterval:", countdownInterval);
            // console.log("countdown:", countdown);
            // console.log("isCountdownPaused:", isCountdownPaused);
        }, 1000);

        chronoNeedle.style.animation = `run ${chronoTimeLeft}s linear`;
        chronoNeedle.style.animationPlayState = "running";
    }



    function reprendreChrono() {
        gererDepart(); // Relancer le décompte avant de reprendre
    }

    function fermerPopupLvlFacile() {
        const params = new URLSearchParams(window.location.search);
        params.set('difficulty', 'easy');
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        fermerPopup();
        gererDepart();
    }

    function fermerPopupLvlNormal() {
        const params = new URLSearchParams(window.location.search);
        params.set('difficulty', 'medium');
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        fermerPopup();
        gererDepart();
    }

    function fermerPopupLvlDifficile() {
        const params = new URLSearchParams(window.location.search);
        params.set('difficulty', 'hard');
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        fermerPopup();
        gererDepart();
    }

    function clickContinuer() {
        fermerPopupAvecNom(".popup_score");
        ouvrirPopup(".popup_fin");
    }

    function clickPartager() {

    }

    window.fermerPopup = fermerPopup;
    window.ouvrirPopup = ouvrirPopup;
    window.fermerPopupLvlFacile = fermerPopupLvlFacile;
    window.fermerPopupLvlNormal = fermerPopupLvlNormal;
    window.fermerPopupLvlDifficile = fermerPopupLvlDifficile;
    window.gererDepart = gererDepart;
    window.pauseChrono = pauseChrono;
    window.reprendreChrono = reprendreChrono;
    window.pauseCountdown = pauseCountdown;
    window.clickContinuer = clickContinuer;
    window.clickPartager = clickPartager;
});
