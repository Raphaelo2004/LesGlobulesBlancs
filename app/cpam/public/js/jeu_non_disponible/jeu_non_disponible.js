document.addEventListener("DOMContentLoaded", function () {
    function checkScreenSize() {
        if (window.innerWidth <= 1024) {
            if (isUserLoggedIn) {
                window.location.href = accueilUrl;
            } else {
                window.location.href = connexionUrl; // Correction ici
            }
        }
    }

    setInterval(checkScreenSize, 500);
});
