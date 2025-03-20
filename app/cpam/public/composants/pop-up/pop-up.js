document.addEventListener('DOMContentLoaded', function () {
    function fermerPopup() {
        const popupOverlay = document.querySelector('.popup-overlay');
        const popupContainer = document.querySelector('.popup-container');

        if (popupOverlay && popupContainer) {
            popupOverlay.style.display = 'none';
            popupContainer.style.display = 'none';
        }
    }

    // Rendre la fonction globale pour qu'elle soit utilisable dans `onclick`
    window.fermerPopup = fermerPopup;
});