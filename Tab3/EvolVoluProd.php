<?php
namespace DCS\Tab3\EvolVoluProd;

use PDO;
use PDOException;

class EvolVoluProd{

    public function getevolume1_1(): array
    {
        $bdd = new PDO('mysql:host=localhost;dbname=dcs;charset=utf8',
            'root',
            ''
        );
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = [];
        $query = "SELECT YEAR(mois) AS annee, MONTH(mois) AS mois, SUM(volume) AS total_volume FROM ligne_facturation WHERE produitID = :produitID AND mois between :mois1 and :mois2 GROUP BY YEAR(mois), MONTH(mois) ORDER BY annee, mois;";

        $stmt = $bdd->prepare($query);
        $r = $stmt->execute([
            "produitID" => 20,
            "mois1" => date('Y-m-d', strtotime('2021-01-01')),
            "mois2" => date('Y-m-d',strtotime('2022-04-01'))
        ]);

        if ($r) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            foreach ($stmt as $row) {
                $result[] = $row['annee']."-".$row['mois']."-".$row['total_volume'];
            }
        }
        var_dump($result);
        return $result;
    }
    public function getevolume1_4(): array
    {
        $bdd = new PDO('mysql:host=localhost;dbname=dcs;charset=utf8',
            'root',
            ''
        );
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $result = [];
        $query = "SELECT YEAR(mois) AS annee, MONTH(mois) AS mois, SUM(volume) AS total_volume FROM ligne_facturation WHERE produitID = :produitID AND mois between :mois1 and :mois2 GROUP BY YEAR(mois), MONTH(mois) ORDER BY annee, mois;";

        $stmt = $bdd->prepare($query);
        $r = $stmt->execute([
            "produitID" => 13,
            "mois1" => date('Y-m-d', strtotime('2021-01-01')),
            "mois2" => date('Y-m-d',strtotime('2022-04-01'))
        ]);

        if ($r) {
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            foreach ($stmt as $row) {
                $result[] = $row['annee']."-".$row['mois']."-".$row['total_volume'];
            }
        }
        var_dump($result);
        return $result;
    }
}
$evol = new EvolVoluProd();
$evol->getevolume1_4();
