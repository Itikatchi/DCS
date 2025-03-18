const tab2Choice = document.querySelector(".choiceTab2");
const grapeTab2 = document.getElementById("grapheTab2").getContext("2d");
let chartTab2;

const changeGraphe = (id) => {
    fetch("../DCS/Tab2/getData.php?id=" + id)
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
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: "blue",
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Montant (euros)"
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


fetch("../DCS/Tab2/getData.php?affichage")
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