<?php

function initalisatiseConnexionBDD(): PDO {
    $bdd = null;
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=dcs',
         'root',
         ''
         );
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('Erreur connexion BDD :'.$e->getMessage());
    }

    return $bdd;
}

function topApp($GrandClientID) {
    $bdd = initalisatiseConnexionBDD();
    $query = "SELECT gc.GrandClientID, gc.NomGrandClient, lf.prix, app.IRT, app.nomAppli FROM grandclients gc 
            INNER JOIN clients c ON c.GrandClientID = gc.GrandClientID 
            INNER JOIN centresactivite ca ON ca.CentreActiviteID = c.CentreActiviteID INNER JOIN ligne_facturation lf ON lf.CentreActiviteID = ca.CentreActiviteID INNER JOIN application app ON app.IRT = lf.IRT 
            WHERE gc.GrandClientID = ? 
            ORDER BY lf.prix DESC 
            LIMIT 10";

    $stmt = $bdd->prepare($query);

    $result = $stmt->fetchAll();
    if($result) {
        $stmt->setFetchMode(PDO::FETCH_NUM);
        foreach ($result as $row) {
            $result[] = $row;
        }
    }

    return $result;
}

if(isset($_GET['idClient'])) {
    $idClient = $_GET['idClient'];
    echo(json_encode(topApp($idClient)));
}