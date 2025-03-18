
const graphe3 = document.querySelector(".grapheTab3");
const grapeTab3 = document.getElementById("grapheTab3").getContext("2d");
let chartTab3;

const changeGraphe3 = (produitID) => {
    fetch(`../DCS/Tab3/EvolVoluProd.php?produitID=${produitID}`)
        .then(response => response.json())
        .then(data => {
            let labelsSet = new Set();
            let volume = {};

            // Formater les données en "YYYY-MM"
            data.dataset.forEach(row => {
                let dateLabel = `${row.annee}-${String(row.mois).padStart(2, '0')}`;
                labelsSet.add(dateLabel);
                volume[dateLabel] = row.total_volume;
            });

            let labels = Array.from(labelsSet).sort();
            let volumeData = labels.map(label => volume[label] || null);

            if (chartTab3) {
                chartTab3.destroy();
            }

            chartTab3 = new Chart(grapeTab3, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: `Produit ${produitID}`,
                            data: volumeData,
                            borderColor: "blue",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            borderWidth: 2,
                            pointRadius: 5,
                            pointBackgroundColor: "blue",
                            tension: 0.3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date (Annee-Mois)"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Volume"
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Erreur de chargement des données :", error));
};

// Lorsqu'un changement de produit est sélectionné, on recharge le graphique
document.getElementById("produitSelect").addEventListener("change", (e) => {
    changeGraphe3(e.target.value);
});

// Initialiser le graphique avec le produit 20 par défaut
changeGraphe3(20);

