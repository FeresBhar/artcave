<?php
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');



$jwt_token = $_SERVER['HTTP_AUTHORIZATION'];
echo "JWT token before decoding: ".$jwt_token ;

$json_data = json_decode(file_get_contents('php://input'), true);
    $username = $json_data['Username'];
    $title = $json_data['title'];
    $description = $json_data['description'];
    $imageURL = $json_data['imageURL'];
    insertImage($jwt_token,$title,$description,$imageURL);    
        

function insertImage($jwt_token,$title,$description,$imageURL){
    global $connexion;
    $decoded = JWT::decode($jwt_token, "bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1", array('HS256'));
    var_dump($decoded);
    $usernm = $decoded ->data->username;
    $stmt = $connexion->prepare('SELECT ArtistID from artist WHERE username=:usernm');
    $stmt->bindParam(':username', $usernm);
    $stmt->execute();
    $artistID=$stmt->fetchColumn();

    $stmt = $connexion->prepare("INSERT INTO image (ArtistID, title, description, imageURL) VALUES (:artistID,:title, :description, :imageURL)");
    $stmt->bindParam(':artistID', $artistID);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':imageURL', $imageURL);
    $resultat = $stmt->execute();
    echo json_encode($resultat);

}
?>
    