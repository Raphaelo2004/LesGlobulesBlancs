document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.querySelector('.settings-icon');
    const closeIcon = document.getElementById('closeIcon');
    const menuContainer = document.querySelector('.menu-container');
    const buttons = document.querySelectorAll('.btn--presentation');

    if (settingsIcon && closeIcon && menuContainer) {
        settingsIcon.addEventListener('click', function () {
            menuContainer.style.display = 'flex';
            settingsIcon.style.display = 'none';
            closeIcon.style.display = 'block';

            let isMuted = false; // État du son

            buttons.forEach(button => {
                const buttonText = button.textContent.trim();

                if (buttonText.includes("Reprendre")) {
                    button.addEventListener('click', function() {
                        menuContainer.style.display = 'none';
                        closeIcon.style.display = 'none';
                        settingsIcon.style.display = 'block';
                    });
                }
                if (buttonText.includes("Recommencer")) {
                    button.addEventListener('click', function() {
                        window.location.href = "/jeu/ramasseur";
                    });
                }
                if (buttonText.includes("Son")) {
                    button.addEventListener('click', function() {
                        isMuted = !isMuted;
                        
                        // Changer l'icône du bouton
                        const icon = button.querySelector('i');
                        if (icon) {
                            icon.classList.toggle('fa-volume-up', !isMuted);
                            icon.classList.toggle('fa-volume-mute', isMuted);
                        }
    
                        // Muter/Démuter le son du jeu
                        const allAudio = document.querySelectorAll('audio');
                        allAudio.forEach(audio => {
                            audio.muted = isMuted;
                        });
                    });
                }
                if (buttonText.includes("Retour à l’accueil")) {
                    button.addEventListener('click', function() {
                        window.location.href = "/accueil";
                    });
                }
            });
        });

        closeIcon.addEventListener('click', function () {
            menuContainer.style.display = 'none';
            settingsIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });

        menuContainer.addEventListener('click', function (event) {
            if (event.target === menuContainer) {
                menuContainer.style.display = 'none';
                settingsIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }
});