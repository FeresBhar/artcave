<?php
//authentification
// pfp,Headline,headline,description,categs,rating
// pfp,Headline, categs, images
// categs how do
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');

$jwt_token = $_SERVER['HTTP_AUTHORIZATION'];
    $stmt = $connexion->prepare('SELECT ArtistID from artist WHERE username=:usernm');
    $stmt->bindParam(':username', $usernm);
    $stmt->execute();
    $artistID=$stmt->fetchColumn();

$json_data = json_decode(file_get_contents('php://input'), true); 
    $headline = $json_data['Headline'] ?? NULL;
    $description = $json_data['Description'] ?? NULL;
    $pfpURL = $json_data['pfpURL'] ?? NULL;
    $categories = $json_data["categories"] ?? NULL;

$stmt = $connexion->prepare("UPDATE Artist SET Description = :description, Headline = :headline, pfpURL = :pfpURL WHERE ArtistId = :artistID");
    $stmt->bindParam(':artistID', $artistID);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':headline', $headline);
    $stmt->bindParam(':pfpURL', $pfpURL);
$resultat = $stmt->execute();

if ($categories) {
    insertCategoriesForArtist($artistID, $categories);
}

function getCategoryID($categoryName) {
    global $connexion;
    $stmt = $connexion->prepare("SELECT CategoryID FROM Category WHERE Name = :categoryname");
    $stmt->bindParam(':categoryname', $categoryName);
    $stmt->execute();
    $categoryID = $stmt->fetchColumn();
    return $categoryID;
}

function insertCategoriesForArtist($artistID, $categories) {
    global $connexion;

    foreach ($categories as $categoryName) {
        $categoryID = getCategoryID($categoryName);
        $stmt = $connexion->prepare("INSERT INTO artistcategory (artistID, categoryID) VALUES (:artistID, :categoryID)");
        $stmt->bindParam(':artistID', $artistID);
        $stmt->bindParam(':categoryID', $categoryID);
        $stmt->execute();
    }
}




?>