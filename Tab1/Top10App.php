    <?php

function initalisatiseConnexionBDD(): PDO {
    $bdd = null;
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=dcs',
         'dcs',
         '1234'
         );
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('Erreur connexion BDD :'.$e->getMessage());
    }

    return $bdd;
}

function topApp($GrandClientID) {
    $bdd = initalisatiseConnexionBDD();
    $query = "SELECT gc.NomGrandClient, sum(lf.prix) as prix, app.IRT, app.nomAppli FROM grandclients gc 
            INNER JOIN clients c ON c.GrandClientID = gc.GrandClientID 
            INNER JOIN centresactivite ca ON ca.CentreActiviteID = c.CentreActiviteID INNER JOIN ligne_facturation lf ON lf.CentreActiviteID = ca.CentreActiviteID INNER JOIN application app ON app.IRT = lf.IRT 
            WHERE gc.GrandClientID = ? 
            GROUP BY app.IRT
            ORDER BY prix DESC 
            LIMIT 10";

    $stmt = $bdd->prepare($query);
    $stmt->execute([$GrandClientID]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

if(isset($_GET['idClient'])) {
    $idClient = $_GET['idClient'];
    echo(json_encode(topApp($idClient)));
}