document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".share_score").addEventListener("click", async () => {
        // Récupère le texte du score dans l'élément <p> à l'intérieur de .classement_score
        const scoreElement = document.querySelector(".item_fixe .classement_score p");
        const score = scoreElement ? scoreElement.textContent : '0';
    
        let gameText = "Tous les jeux";
        const gameSelect = document.querySelector(".game_name");

        if (gameSelect) {
            const selectedGame = gameSelect.value;
            const gameName = gameSelect.options[gameSelect.selectedIndex].textContent;
            gameText = selectedGame === "0" ? "Tous les jeux" : gameName;
        } else {
            const match = window.location.pathname.match(/\/([^\/]+)_gameplay/);
            if (match) {
                gameText = match[1].replace(/-/g, ' '); 
            }
        }
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Mon score dans ${gameText}!`,
                    text: `J'ai obtenu un score de ${score} points dans le jeu ${gameText}. Peux-tu faire mieux ?`
                });
                console.log("Partage réussi !");
            } catch (error) {
                console.error("Erreur de partage :", error);
            }
        } else {
            alert("Le partage n'est pas supporté sur ce navigateur.");
        }
    });
});