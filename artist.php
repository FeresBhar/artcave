<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
header('Content-type: application/json');

    $username = $_GET['Username'];
    $sql = "SELECT 
                a.Username,
                a.Description,
                a.Headline,
                a.pfpURL,
                a.Rating,
                GROUP_CONCAT(DISTINCT i.imageURL) AS images,
                GROUP_CONCAT(DISTINCT c.Name) AS categories
            FROM artist a 
            LEFT JOIN image i ON a.ArtistId = i.artistid
            LEFT JOIN artistcategory ac ON a.artistid = ac.artistid
            LEFT JOIN category c ON ac.categoryid = c.categoryid
            WHERE a.Username = :username
            GROUP BY a.ArtistID";
    $stmt = $connexion->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $artist = $stmt->fetch(PDO::FETCH_ASSOC);
    $artist['images'] = explode(',', $artist['images']);
    $artist['categories'] = explode(',', $artist['categories']);
    echo json_encode($artist);
   

?>