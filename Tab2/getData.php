<?php
function initialiseConnexionBDD(): PDO {
    $bdd = null;
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=dcs;charset=utf8',
            'root',
            ''
        );
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(Exception $e) {
        die('Erreur connexion BDD : '.$e->getMessage());
    }

    return $bdd;
}

function verifOrdre(){
    $query = "select sum(f.prix), c.ClientID, c.NomClient 
            from clients c 
            inner join centresactivite ca on c.CentreActiviteID = ca.CentreActiviteID 
            inner join ligne_facturation f on f.CentreActiviteID = ca.CentreActiviteID 
            group by c.ClientID
            order by sum(f.prix) desc LIMIT 5";
    $bdd = initialiseConnexionBDD();
    $res = [];
    $stmt = $bdd->query($query);
    if($stmt){
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        foreach($stmt as $row){
            $res[] = $row;
        }
    }
    return $res;
}

function findMontant($id){
    $bdd = initialiseConnexionBDD();
    $query = "select sum(f.prix) as somme, c.ClientID, f.mois from clients c 
            inner join centresactivite ca on c.CentreActiviteID = ca.CentreActiviteID 
            inner join ligne_facturation f on f.CentreActiviteID = ca.CentreActiviteID
            where c.ClientID = :id
            group by c.ClientID, f.mois
            order by f.mois";
    $stmt = $bdd->prepare($query);
    $r = $stmt->execute(['id' => $id]);
    $res = [];
    if($r){
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        foreach($stmt as $row){
            $res[] = $row;
        }
    }
    return $res;
}

if(isset($_GET['affichage'])){
    echo(json_encode(verifOrdre()));
}
if(isset($_GET['id'])){
    $id = (int)$_GET['id'];
    echo(json_encode(findMontant($id)));
}