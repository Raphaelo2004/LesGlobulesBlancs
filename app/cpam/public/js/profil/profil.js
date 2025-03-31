// Fonction pour supprimer la clé lorsque l'utilisateur se déconnecte
function logoutAndResetPopup() {
    localStorage.removeItem("popupWelcomeSeen");
}