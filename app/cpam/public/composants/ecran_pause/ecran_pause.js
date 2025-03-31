document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.querySelector('.settings-icon');
    const closeIcon = document.getElementById('closeIcon');
    const menuContainer = document.querySelector('.menu-container');
    const menu = document.querySelector('.menu');
    const buttons = document.querySelectorAll('.btn--presentation');

    let isMuted = false;

    if (settingsIcon && closeIcon && menuContainer) {
        settingsIcon.addEventListener('click', function () {
            menuContainer.style.display = 'flex';
            settingsIcon.style.display = 'none';
            closeIcon.style.display = 'block';
          
            if (typeof pauseChrono === 'function' && typeof pauseCountdown === 'function') {
                pauseChrono();
                pauseCountdown();
            }
            if (typeof pauseSpecificGame === "function"){
                pauseSpecificGame();
            }
        });

        closeIcon.addEventListener('click', function () {
            menuContainer.style.display = 'none';
            settingsIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            
            if (typeof reprendreChrono === 'function') {
                reprendreChrono();
            }

            if (typeof reprendreSpecificGame === "function"){
                reprendreSpecificGame();
            }
        });

        menuContainer.addEventListener('click', function (event) {
            if (event.target === menu) {
                menuContainer.style.display = 'none';
                settingsIcon.style.display = 'block';
                closeIcon.style.display = 'none';

                if (typeof reprendreChrono === 'function') {
                    reprendreChrono();
                }

                if (typeof reprendreSpecificGame === "function"){
                    reprendreSpecificGame();
                }
            }
        });

        buttons.forEach(button => {
            const buttonText = button.textContent.trim();

            if (buttonText.includes("Reprendre")) {
                button.addEventListener('click', function() {
                    menuContainer.style.display = 'none';
                    closeIcon.style.display = 'none';
                    settingsIcon.style.display = 'block';

                    if (typeof reprendreChrono === 'function') {
                        reprendreChrono();
                    }

                    if (typeof reprendreSpecificGame === "function"){
                        reprendreSpecificGame();
                    }
                });
            }
            if (buttonText.includes("Son")) {
                button.addEventListener('click', function() {
                    isMuted = !isMuted;

                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-volume-up', !isMuted);
                        icon.classList.toggle('fa-volume-mute', isMuted);
                    }

                    document.querySelectorAll('audio').forEach(audio => {
                        audio.muted = isMuted;
                    });
                    if (typeof bgMusic !== 'undefined') {
                        bgMusic.muted = isMuted;
                    }
                });
            }
        });
    }
});
