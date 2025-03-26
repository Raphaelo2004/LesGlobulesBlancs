function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let jeuCommence = false;
let jeuTermine = false;

function startGame() {
    const difficulty = getQueryParam("difficulty");

    if (!difficulty) {
        console.warn("Aucune difficulté sélectionnée !");
        return;
    }

    console.log("Difficulté sélectionnée :", difficulty);

    let lignes = 3; // Les lignes sont identiques pour normal et difficile
    let colonnes = 4; // Colonnes pour normal
    if (difficulty === "difficile") {
        colonnes = 6; // Colonnes pour difficile
    }

    let { grille, vide } = genererGrilleMelangee(lignes, colonnes);
    afficherTaquin(grille, lignes, colonnes, vide, difficulty);

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
            updatePopupFin("perdu");
            updatePopupScore();
            ouvrirPopup(".popup_score");
        }
    }, 180000); // 180 secondes = 3 minutes
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
        if ((Math.abs(row - vide.row) === 1 && col === vide.col) ||
            (Math.abs(col - vide.col) === 1 && row === vide.row)) {
            [grille[vide.row][vide.col], grille[row][col]] = [grille[row][col], grille[vide.row][vide.col]];
            vide = { row, col };
            afficherTaquin(grille, lignes, colonnes, vide, difficulty);
            if (verifierVictoire()) {
                setTimeout(() => afficherImageComplete(), 200);
            }
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

    updatePopupFin("gagne");
    updatePopupScore();
    ouvrirPopup(".popup_score");
}

// Rendre startGame accessible globalement
window.startGame = startGame;
