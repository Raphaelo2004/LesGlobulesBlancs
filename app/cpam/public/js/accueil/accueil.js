document.addEventListener("DOMContentLoaded", function() {
    // Vérifie si la popup a déjà été vue
    if (localStorage.getItem("popupWelcomeSeen")) {
        document.getElementById("popup-welcome").style.display = "none";
    } else {
        // Marquer la popup comme vue lorsqu'on clique sur "Continuer"
        document.querySelector(".btn").addEventListener("click", function() {
            localStorage.setItem("popupWelcomeSeen", "true");
        });
    }
});