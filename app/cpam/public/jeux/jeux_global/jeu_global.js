function updatePopupScore(score) {
    let userId = document.querySelector('.current_user_score').getAttribute('data-user-id')

    let items = document.querySelectorAll('.classement_item');

    let popupScoreTitle = document.querySelector('.popup_score .popup-header h1');
    let popupScoreOwnScore = document.querySelector('.popup_score .current_user_score .classement_score p');
    let popupScoreOwnPosition = document.querySelector('.popup_score .current_user_score .classement_position p');

    ancienscore = 0;
    // Parcourir les éléments pour trouver celui qui a un data-item_id correspondant à userId
    items.forEach(function(item) {
        if (item.getAttribute('data-item-id') == userId) {
            ancienscore = item.querySelector(".classement_score p").innerHTML
            itemancienscore = item;
            
        }
    });

    if(ancienscore && score > ancienscore){
        popupScoreTitle.innerHTML = `Nouveau meilleur score : ` + score;
        popupScoreOwnScore.innerHTML = score;
        if(ancienscore > 0){
            itemancienscore.remove();
        }
    }else{
        popupScoreTitle.innerHTML = `Score : ` + score;
        popupScoreOwnScore.innerHTML = score;
    }


    // Récupérer tous les éléments du classement
    let classementItems = Array.from(document.querySelectorAll('.classement_item'));

    // Extraire les scores et les trier par ordre décroissant
    let scores = classementItems.map((item, index) => {
        return {
            element: item,
            score: parseInt(item.querySelector('.classement_score p').textContent.trim()) || 0,
            originalIndex: index
        };
    });


    // Trier les scores par ordre décroissant
    scores.sort((a, b) => b.score - a.score);
    // Mettre à jour les positions dans le DOM
    scores.forEach((user, index) => {
        let positionContainer = user.element.querySelector('.classement_position');
        positionContainer.innerHTML = ''; // Efface le contenu précédent

        if (index === 0) {
            positionContainer.innerHTML = `<img src="${medailleOr}" alt="Médaille Or" />`;
        } else if (index === 1) {
            positionContainer.innerHTML = `<img src="${medailleArgent}" alt="Médaille Argent" />`;
        } else if (index === 2) {
            positionContainer.innerHTML = `<img src="${medailleBronze}" alt="Médaille Bronze" />`;
        } else {
            positionContainer.innerHTML = `<p class="para--black para--extralarge">${index + 1}</p>`;
        }
    });

    // Met à jour la position affichée pour l'utilisateur actuel
    let userPosition = scores.findIndex(user => user.element.classList.contains('current_user_score'));
    popupScoreOwnPosition.innerHTML = (userPosition !== -1) ? userPosition + 1 : '-';

    

    let classementContainer = document.querySelector('.classement_container');

    classementContainer.innerHTML = ''; 
    scores.forEach((user, index) => {
        classementContainer.appendChild(user.element);
    });

    let popupScoreOwnUser= document.querySelector('.popup_score .current_user_score');

    if (popupScoreOwnUser && classementContainer) {
        let popupScoreLatest = popupScoreOwnUser.cloneNode(true);
        popupScoreLatest.classList.remove('current_user_score');
        popupScoreLatest.classList.add('item_fixe');
        classementContainer.appendChild(popupScoreLatest);
    }
}

function sendScoreToDatabase(score,gameId) {
    let timeSpent = chronoTimeLeft; 

    fetch('/score/save_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            score: score,
            timeSpent: timeSpent,
            gameId: gameId
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Score enregistré:', data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'enregistrement du score:', error);
    });
}

function updateScore() {
    document.getElementById("score-value").textContent = score;
}

