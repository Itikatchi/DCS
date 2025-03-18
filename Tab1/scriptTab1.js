const client1 = document.getElementById(690");
const client2 = document.getElementById("689");
const client3 = document.getElementById("691");

const grapheTab1 = document.getElementById("grapheTab1").getContext("2d");

function createGraphe(id) {
    fetch("../DCS/Tab1/Top10App.php?idClient=" + id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données : ", error);
    })
}

client1.addEventListener("click", ()=> {
    console.log('aaaaaaaaaaaaaaaaaaa');
    createGraphe(client1.id);
})

client2.addEventListener("click", ()=> {
    createGraphe(client2.id);
})

client3.addEventListener("click", ()=> {
    createGraphe(client3.id);
})