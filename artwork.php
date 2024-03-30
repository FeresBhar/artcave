<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');

$headers = apache_request_headers();
if (isset($headers)) {
    $jwtbear = $headers['Authorization'];
    $jwtbear = explode(' ', $jwtbear);
    $jwt = $jwtbear[1];
}

$json_data = json_decode(file_get_contents('php://input'), true);
$title = $json_data['title'];
$description = $json_data['description'];
$imageURL = $json_data['imageURL'];

if (!empty($jwt) && !empty($title) && !empty($description) && !empty($imageURL)) {
    insertImage($jwt, $title, $description, $imageURL);
} else {
    echo json_encode(array('resultat' => false, 'message' => 'Missing required data'));
}

function insertImage($jwt, $title, $description, $imageURL) {
    global $connexion;
    $decoded = JWT::decode($jwt, new Key("bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1",'HS256'));
    $usernm = $decoded->data->username;

    $stmt_first = $connexion->prepare('SELECT ArtistID from artist WHERE username=:username');
    $stmt_first->bindParam(':username', $usernm);
    $stmt_first->execute();
    $artistID = $stmt_first->fetchColumn();
    // inserting into table images
        $stmt = $connexion->prepare("INSERT INTO image (ArtistID, title, description, imageURL) VALUES (:artistID, :title, :description, :imageURL)");
        $stmt->bindParam(':artistID', $artistID);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':imageURL', $imageURL);
        $resultat = $stmt->execute();
        echo json_encode($resultat);
        
}
?>
