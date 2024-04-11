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
            a.public,
            u.email,
            GROUP_CONCAT(i.imageURL) AS images,
            GROUP_CONCAT(c.Name) AS categories
        FROM artist a 
        LEFT JOIN image i ON a.ArtistId = i.artistid
        LEFT JOIN artistcategory ac ON a.artistid = ac.artistid
        LEFT JOIN category c ON ac.categoryid = c.categoryid
        LEFT JOIN user u ON a.Username = u.Username
        WHERE a.Username = :username
        GROUP BY a.ArtistID";
$stmt = $connexion->prepare($sql);
$stmt->bindParam(':username', $username);
$stmt->execute();
$artist = $stmt->fetch(PDO::FETCH_ASSOC);
if (empty($artist['images'])) {
    $artist['images'] = null;
} else {
    $artist['images'] = explode(',', $artist['images']);
}
if (empty($artist['categories'])) {
    $artist['categories'] = null;
} else {
    $artist['categories'] = explode(',', $artist['categories']);
}

echo json_encode($artist);

?>
