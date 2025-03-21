document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.querySelector('.settings-icon');
    const closeIcon = document.getElementById('closeIcon');
    const menuContainer = document.querySelector('.menu-container');
    const menu = document.querySelector('.menu');
    const buttons = document.querySelectorAll('.btn--presentation');

    if (settingsIcon && closeIcon && menuContainer) {
        settingsIcon.addEventListener('click', function () {
            menuContainer.style.display = 'flex';
            settingsIcon.style.display = 'none';
            closeIcon.style.display = 'block';
          
            if (typeof pauseChrono === 'function' && typeof pauseCountdown === 'function') {
                pauseChrono();
                pauseCountdown();
            }
        });

        closeIcon.addEventListener('click', function () {
            menuContainer.style.display = 'none';
            settingsIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            
            if (typeof reprendreChrono === 'function') {
                reprendreChrono();
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
                });
            }
            if (buttonText.includes("Recommencer")) {
                button.addEventListener('click', function() {
                    window.location.href = "/jeu/ramasseur";
                });
            }
            if (buttonText.includes("Son")) {
                let isMuted = false;
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
                });
            }
        });
    }
});
