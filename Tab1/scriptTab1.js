const client1 = document.getElementById("690");
const client2 = document.getElementById("689");
const client3 = document.getElementById("691");

const classement = document.getElementById("classement");

const grapheTab1 = document.getElementById("grapheTab1").getContext("2d");
let chart1;

function createGraphe(id) {
    fetch("https://dcs.greffetjules.fr/Tab1/Top10App.php?idClient=" + id)
        .then(response => response.json())
        .then(data => {
            classement.innerHTML = "";
            data.forEach((row, index) => {
                classement.innerHTML += `
                <div class="top-item">
                    <span class="rank">${index + 1}.</span> 
                    <span class="app-name">${row.nomAppli}</span>
                </div>
                `;
            })

            const labels = data.map(app => app.nomAppli);
            const prix = data.map(app => app.prix);


            if (chart1) {
                chart1.destroy();
            }

            chart1 = new Chart(grapheTab1, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{

                        label: 'Montant en euros',
                        data: prix,
                        fill: true,
                        backgroundColor: "rgba(255, 225, 1, 0.6)",
                        color: "rgba(255, 255, 255, 0.9)",
                        borderColor: "#ffef00",
                        borderWidth: 1
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
                    scales: {
                        x: {
                            ticks: {
                                color: "rgba(255, 255, 255, 0.9)",
                            },
                        },
                        y: {

                            beginAtZero: true,
                            ticks: {
                                color: "rgba(255, 255, 255, 0.9)",
                                callback: function(value) {
                                    return value;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données : ", error);
        })
}


client1.addEventListener("click", ()=> {
    createGraphe(client1.id);
})

client2.addEventListener("click", ()=> {
    createGraphe(client2.id);
})

client3.addEventListener("click", ()=> {
    createGraphe(client3.id);
})