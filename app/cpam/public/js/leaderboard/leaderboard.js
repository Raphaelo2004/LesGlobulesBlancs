document.addEventListener('DOMContentLoaded', function() {
    var gameSelect = document.querySelector('.game_name');
    if (gameSelect) {
        gameSelect.addEventListener('change', function() {
            var jeuId = this.value; 
            var currentUrl = window.location.href.split('?')[0]; 
            if (jeuId === "0") {
                window.location.href = currentUrl;
            } else {
                window.location.href = currentUrl + '?jeu_id=' + jeuId;
            }
        });
    }
    const searchInput = document.querySelector(".search_player");
    const classementItems = document.querySelectorAll(".classement_item"); // Sélectionne tous les items du classement

    searchInput.addEventListener("input", function() {
        const searchValue = this.value.toLowerCase(); // Récupère la valeur de l'input en minuscule

        classementItems.forEach(item => {
            const userNameElement = item.querySelector(".classement_utilisateur p"); // Récupère le nom du joueur
            if (userNameElement) {
                const identifiant = userNameElement.textContent.toLowerCase(); // Récupère le texte et met en minuscule
                
                // Vérifie si l'élément doit être filtré
                if (identifiant.includes(searchValue) || item.classList.contains("item_fixe")) {
                    item.style.display = ""; // Garde visible si l'identifiant correspond ou si c'est un item fixe
                } else {
                    item.style.display = "none"; // Cache uniquement les éléments non fixés qui ne correspondent pas
                }
            }
        });
    });
});
