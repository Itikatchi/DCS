const tab2Choice = document.querySelector(".choiceTab2");
const grapeTab2 = document.getElementById("grapheTab2").getContext("2d");
let chartTab2;

const changeGraphe = (id) => {
    fetch("https://dcs.greffetjules.fr/Tab2/getData.php?id=" + id)
        .then(response => response.json())
        .then(data => {
            let montant = [];
            let mois = [];

            data.forEach((row) => {
                montant.push(row.somme);
                mois.push(row.mois);
            });

            let minMontant = Math.min(...montant);
            let maxMontant = Math.max(...montant);

            let marge = (maxMontant - minMontant) * 0.1;
            minMontant -= marge;
            maxMontant += marge;

            if (chartTab2) {
                chartTab2.destroy();
            }

            chartTab2 = new Chart(grapeTab2, {
                type: "line",
                data: {
                    labels: mois,
                    datasets: [{
                        label: "Montant (euros)",
                        data: montant,
                        borderColor: "#ffef00",
                        backgroundColor: "rgba(255, 225, 1, 0.6)",
                        color: "rgba(255, 255, 255, 0.9)",
                        fill: true,
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: "#ffef00",
                        tension: 0.3
                    }]
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
                                text: "Date",
                                color: "rgba(255, 255, 255, 0.9)",
                            }
                        },
                        y: {
                            ticks: {
                                color: "rgba(255, 255, 255, 0.9)",
                            },
                            title: {
                                display: true,
                                text: "Montant (euros)",
                                color: "rgba(255, 255, 255, 0.9)",
                            },
                            suggestedMin: minMontant,
                            suggestedMax: maxMontant,
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
};


fetch("https://dcs.greffetjules.fr/Tab2/getData.php?affichage")
    .then(response => response.json())
    .then(data => {
        tab2Choice.innerHTML = "";
        data.forEach((row) => {
            const p = document.createElement("p");
            p.className = "choiceText";
            p.textContent = row.NomClient;

            p.addEventListener("click", () => {
                changeGraphe(row.ClientID);
            });

            tab2Choice.appendChild(p);
        });
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });