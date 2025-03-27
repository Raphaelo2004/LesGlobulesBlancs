document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-container form');
  const submitButton = document.querySelector('.btn-submit');

  if (form && submitButton) {
    form.addEventListener('submit', function() {
      submitButton.disabled = true;
      submitButton.innerText = 'En cours...';
    });
  }

  const countdownOverlay = document.getElementById("countdown-overlay");
    const countdownTimer = document.getElementById("countdown-timer");

    // Date cible : 30 mars 2025 à 00:00:00
    const targetDate = new Date("2025-11-25T00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            countdownOverlay.style.display = "none";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = 
            `<span style="font-size: 36px; font-weight: bold; color: yellow;">${days}j ${hours}h ${minutes}m ${seconds}s</span>`;
    }

    // Mise à jour immédiate + intervalle régulier
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Vérifier si le compte à rebours est déjà expiré
    if (targetDate - new Date().getTime() <= 0) {
        countdownOverlay.style.display = "none";
        clearInterval(countdownInterval);
    }
});
