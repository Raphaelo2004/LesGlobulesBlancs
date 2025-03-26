// admin.js

// S'assurer que le DOM est complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les données passées par Twig
    var gameStatsData = JSON.parse(document.getElementById('gameStatsData').textContent);

    // Extraire les labels et les données pour le graphique
    var labels = gameStatsData.map(function (stat) {
        return stat.jeu;
    });

    var partiesJouees = gameStatsData.map(function (stat) {
        return stat.partiesJouees;
    });

    var joueursUnqiues = gameStatsData.map(function (stat) {
        return stat.joueursUnqiues;
    });

    // Créer le graphique avec Chart.js
    var ctx = document.getElementById('gameStatsChart').getContext('2d');
    var gameStatsChart = new Chart(ctx, {
        type: 'bar', // Type de graphique : en barres
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre de parties jouées',
                data: partiesJouees,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Nombre de joueurs uniques',
                data: joueursUnqiues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
