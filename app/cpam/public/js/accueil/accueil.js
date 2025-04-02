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


    const tableauLink = document.querySelector(".tableau_acceuil");

    if (tableauLink) {
        tableauLink.addEventListener("click", function(event) {
            event.preventDefault(); // Empêche la redirection immédiate

            // Ajoute l'effet de zoom sur le body
            document.body.classList.add("zoom-transition");

            // Attends 1 seconde (durée de l'animation) avant de rediriger
            setTimeout(() => {
                window.location.href = tableauLink.href;
            }, 1000);
        });
    }
});