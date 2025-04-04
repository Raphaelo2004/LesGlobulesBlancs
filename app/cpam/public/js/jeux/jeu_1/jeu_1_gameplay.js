function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let jeuCommence = false;
let jeuTermine = false;
let deplacements = 0;  // Variable pour compter les déplacements

const bgMusic = new Audio("/assets/SONS/JEU 1 - TAQUIN/Son ambiance - taquin.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5; // Volume réduit pour ne pas être trop intrusif

const whooshSound = new Audio("/assets/SONS/JEU 1 - TAQUIN/SWSH_Whoosh 4 (ID 1796)_LS.mp3");
whooshSound.volume = 1.5;
const applaudissement = new Audio("/assets/SONS/JEU 1 - TAQUIN/CRWDApls_Applaudissements 1 (ID 2363)_LS.mp3");

function startGame() {
    let lignes = 3; // Les lignes sont identiques pour normal et difficile
    let colonnes = 4; // Colonnes pour normal
    let difficulty = getQueryParam("difficulty");

    let { grille, vide } = genererGrilleMelangee(lignes, colonnes);
    afficherTaquin(grille, lignes, colonnes, vide, difficulty);
    bgMusic.play();

    // Bloquer les déplacements avant le début du jeu
    jeuCommence = false;
    setTimeout(() => {
        jeuCommence = true; // Autoriser les déplacements après 3 secondes
        lancerMinuteur();
    }, 3000);
}

// Démarrer le minuteur de 180 secondes
function lancerMinuteur() {
    setTimeout(() => {
        if (!jeuTermine) {
            console.log("Temps écoulé ! Vous avez perdu.");
            score = calculeScore("perdu");
            updatePopupFin("perdu");
            updatePopupScore(score);
            sendScoreToDatabase(score,1);
            ouvrirPopup(".popup_score");
        }
    }, 90000);
}

function genererGrilleMelangee(lignes, colonnes) {
    let grille = Array.from({ length: lignes }, (_, i) =>
        Array.from({ length: colonnes }, (_, j) => i * colonnes + j)
    );

    let vide = { row: lignes - 1, col: colonnes - 1 };

    // Mélange en effectuant des déplacements valides
    for (let i = 0; i < 1000; i++) {
        let voisins = [];
        if (vide.row > 0) voisins.push({ row: vide.row - 1, col: vide.col });
        if (vide.row < lignes - 1) voisins.push({ row: vide.row + 1, col: vide.col });
        if (vide.col > 0) voisins.push({ row: vide.row, col: vide.col - 1 });
        if (vide.col < colonnes - 1) voisins.push({ row: vide.row, col: vide.col + 1 });

        let choix = voisins[Math.floor(Math.random() * voisins.length)];
        [grille[vide.row][vide.col], grille[choix.row][choix.col]] =
            [grille[choix.row][choix.col], grille[vide.row][vide.col]];
        vide = choix; // Mise à jour de la position de la case vide
    }

    return { grille, vide };
}

function afficherTaquin(grille, lignes, colonnes, vide, difficulty) {
    const grilleElement = document.getElementById("grille");
    grilleElement.innerHTML = "";
    grilleElement.style.gridTemplateColumns = `repeat(${colonnes}, 1fr)`;
    grilleElement.style.gridTemplateRows = `repeat(${lignes}, 1fr)`;

    grille.forEach((ligne, i) => {
        ligne.forEach((numero, j) => {
            const piece = document.createElement("div");
            piece.classList.add("carte-vitale-item");

            if (i === vide.row && j === vide.col) {
                piece.classList.add("vide"); // Case vide
            } else {
                piece.style.backgroundImage = `url('/assets/images/jeu1/carteVitale_${String(numero + 1).padStart(2, '0')}.jpg')`;
                piece.style.cursor = "pointer";
                
                // Afficher le numéro sur la pièce seulement pour le niveau "normal"
                if (difficulty === "medium") {
                    const numeroDiv = document.createElement("span");
                    numeroDiv.textContent = numero + 1;  // Affichage du numéro de la pièce
                    numeroDiv.classList.add("numero-piece");
                    piece.appendChild(numeroDiv);
                }

                piece.addEventListener("click", () => deplacerPiece(i, j));
            }

            piece.dataset.row = i;
            piece.dataset.col = j;
            grilleElement.appendChild(piece);
        });
    });

    function deplacerPiece(row, col) {
        if (!jeuCommence) return; // Bloquer les déplacements si le jeu n'a pas commencé
        whooshSound.play()
        // Déplacer une ligne entière si la case est à l'extrémité de la ligne
        if (row === vide.row) {
            if (col < vide.col) {  // Déplacer la ligne à gauche
                for (let i = vide.col; i > col; i--) {
                    [grille[row][i], grille[row][i - 1]] = [grille[row][i - 1], grille[row][i]];
                }
            } else if (col > vide.col) {  // Déplacer la ligne à droite
                for (let i = vide.col; i < col; i++) {
                    [grille[row][i], grille[row][i + 1]] = [grille[row][i + 1], grille[row][i]];
                }
            }
            vide = { row, col };  // Mise à jour de la position vide
        } else if (col === vide.col) {
            if (row < vide.row) {  // Déplacer la colonne vers le haut
                for (let i = vide.row; i > row; i--) {
                    [grille[i][col], grille[i - 1][col]] = [grille[i - 1][col], grille[i][col]];
                }
            } else if (row > vide.row) {  // Déplacer la colonne vers le bas
                for (let i = vide.row; i < row; i++) {
                    [grille[i][col], grille[i + 1][col]] = [grille[i + 1][col], grille[i][col]];
                }
            }
            vide = { row, col };  // Mise à jour de la position vide
        }
        
        afficherTaquin(grille, lignes, colonnes, vide, difficulty);
        deplacements++; // Incrémenter le nombre de déplacements
        document.getElementById("score-value").textContent = deplacements;
        if (verifierVictoire()) {
            setTimeout(() => afficherImageComplete(), 200);
            applaudissement.play();
        }
    }
    

    function verifierVictoire() {
        let count = 0;
        return grille.flat().every(num => num === count++);
    }
}

// ✅ Afficher l'image complète quand le taquin est résolu
function afficherImageComplete() {
    jeuTermine = true;
    const grilleElement = document.getElementById("grille");
    grilleElement.innerHTML = ""; // On vide la grille
    grilleElement.style.gridTemplateColumns = `repeat(1, 1fr)`;
    grilleElement.style.gridTemplateRows = `repeat(1, 1fr)`;

    const imageComplete = document.createElement("div");
    imageComplete.classList.add("carte-vitale-complete");
    grilleElement.appendChild(imageComplete);

    // Attendre 3 secondes avant d'afficher la popup
    setTimeout(() => {
        pauseChrono();
        updatePopupFin("gagne");
        score = calculeScore("gagne");
        updatePopupScore(score);
        sendScoreToDatabase(score,1);
        ouvrirPopup(".popup_score");
    }, 2500);
}

function updatePopupFin(finPartie) {
    const popupFinContent = document.querySelector('.popup_fin .popup-main p');

    if (finPartie === "perdu") {
        popupFinContent.innerHTML = `Dommage, tu as <strong>perdu</strong> !<br><br>
            La carte Vitale contient les informations personnelles nécessaires au remboursement de tes frais de santé ou en cas d’hospitalisation. C’est la garantie d'être bien remboursé rapidement.<br><br>
            En cas de perte, tu peux en commander une nouvelle directement depuis ton compte sur <a href='https://www.ameli.fr' target='_blank'>ameli.fr</a> !`;
    } else if (finPartie === "gagne") {
        popupFinContent.innerHTML = `Bravo, tu as <strong>réussi</strong> !<br><br>
            La carte Vitale contient les informations personnelles nécessaires au remboursement de tes frais de santé ou en cas d’hospitalisation. C’est la garantie d'être bien remboursé rapidement.<br><br>
            En cas de perte, tu peux en commander une nouvelle directement depuis ton compte sur <a href='https://www.ameli.fr' target='_blank'>ameli.fr</a> !`;
    }
}

function calculeScore(finPartie) {

    let base_score;
    let score;
    let difficulty = getQueryParam("difficulty");
    if (finPartie === "gagne") {
        if (difficulty == 'medium') {
            base_score = 1250;
        } else {
            base_score = 1500;
        }
        score = Math.max(base_score - (deplacements * 6), 500) 
             + (deplacements <= 50 ? 200 : 0)   // Bonus de 200 pour 50 coups ou moins
             + (deplacements <= 80 ? 100 : 0)   // Bonus de 100 pour 80 coups ou moins
             + (difficulty === "hard" ? 300 : 0); // Bonus de 300 pour niveau "hard"
    } else {
        score = 0;
    }
    return score;
}

// Rendre startGame accessible globalement
window.startGame = startGame;
