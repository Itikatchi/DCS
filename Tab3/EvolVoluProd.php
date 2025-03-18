<?php
namespace DCS\Tab3\EvolVoluProd;

use PDO;
use PDOException;

function connectDB() {
    return new PDO('mysql:host=localhost;dbname=dcs;charset=utf8', 'dcs', '1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
}

function getVolumeData($idProduit) {
    $bdd = connectDB();

    $query = "SELECT YEAR(mois) AS annee, MONTH(mois) AS mois, SUM(volume) AS total_volume 
              FROM ligne_facturation 
              WHERE produitID = :produitID AND mois BETWEEN :mois1 AND :mois2 
              GROUP BY annee, mois ORDER BY annee, mois;";

    $stmt = $bdd->prepare($query);
    $stmt->execute([
        "produitID" => $idProduit,
        "mois1" => '2021-01-01',
        "mois2" => '2022-04-01'
    ]);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

header('Content-Type: application/json');
$produitID = isset($_GET['produitID']) ? $_GET['produitID'] : 20; // Par défaut produit 20
echo json_encode([
    "dataset" => getVolumeData($produitID)
]);