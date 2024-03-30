<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
header('Content-type: application/json');

    $sql = "SELECT 
        a.Username,
        a.Description,
        a.Headline,
        a.pfpURL,
        GROUP_CONCAT(DISTINCT i.imageURL) AS images,
        GROUP_CONCAT(DISTINCT c.Name) AS categories
    FROM artist a 
    LEFT JOIN image i ON a.ArtistId = i.artistid
    LEFT JOIN artistcategory ac ON a.artistid = ac.artistid
    LEFT JOIN category c ON ac.categoryid = c.categoryid
    WHERE a.public = 'Y'
    GROUP BY a.ArtistId";
    $stmt = $connexion->prepare($sql);

    $stmt->execute();

    $artists = $stmt->fetchAll(PDO::FETCH_ASSOC);
    

    if ($artists) {

        foreach ($artists as &$artist) {
            $artist['images'] = explode(',', $artist['images']);
            $artist['categories'] = explode(',', $artist['categories']);
        }
        echo json_encode($artists);
    } else {
        echo json_encode(array("message" => "No artists found"));
    }


?>
