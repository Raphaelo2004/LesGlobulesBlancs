document.addEventListener("DOMContentLoaded", function () {
    function checkSize() {
        if (window.innerWidth > 1024 && isUserLoggedIn) {
            window.location.href = jeuNonDisponibleUrl; // Redirige si trop grand
        }
    }
    if (window.location.pathname !== "/jeu/non/disponible" && window.location.pathname !== "/admin"){
        setInterval(checkSize, 500);
    }
});
