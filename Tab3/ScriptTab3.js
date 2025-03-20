
const graphe3 = document.querySelector(".grapheTab3");
const grapeTab3 = document.getElementById("grapheTab3").getContext("2d");
let chartTab3;

const changeGraphe3 = (produitID) => {
    fetch(`https://dcs.greffetjules.fr/Tab3/EvolVoluProd.php?produitID=${produitID}`)
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

                            borderColor: "#ffef00",
                            backgroundColor: "rgba(255, 225, 1, 0.6)",
                            color: "rgba(255, 255, 255, 0.9)",
                            fill: true,
                            borderWidth: 2,
                            pointRadius: 5,
                            pointBackgroundColor: "#ffef00",
                            tension: 0.4,
                        }
                    ]
                },
                options: {
                    plugins: {
                      legend:{
                          labels:{
                              color: "rgba(255, 255, 255, 0.9)",
                          },
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                color: "rgba(255, 255, 255, 0.9)",
                            },
                            title: {

                                display: true,
                                grid: { display: false },
                                color: "rgba(255, 255, 255, 0.9)",
                                text: "Date (Annee-Mois)"
                            }
                        },
                        y: {
                            ticks: {
                                color: "rgba(255, 255, 255, 0.9)",
                            },
                            title: {
                                display: true,
                                color: "rgba(255, 255, 255, 0.9)",
                                text: "Volume"
                            }
                        }
                    },
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

