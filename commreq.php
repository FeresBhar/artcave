<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS, PUT");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');




     // getting clientID from jwt
    $headers = apache_request_headers();
    if (isset($headers)) {
        $jwtbear = $headers['Authorization'];
        $jwtbear = explode(' ', $jwtbear);
        $jwt= $jwtbear[1];
}
$decoded = JWT::decode($jwt, new Key("bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1",'HS256'));
$clientID = $decoded ->data->id;

// getting input info from comm request
$json_data = json_decode(file_get_contents('php://input'), true); 
$comID = $json_data['comID'];
$description = $json_data['description'];
$price = $json_data['price'];


// inserting into table com requests
$stmt = $connexion->prepare("INSERT INTO comrequest (clientID, comID, description, price, status) VALUES (:clientID, :comID, :description, :price, 'Hold')");
$stmt->bindParam(':clientID', $clientID);
$stmt->bindParam(':comID', $comID);
$stmt->bindParam(':description', $description);
$stmt->bindParam(':price', $price);
$resultat = $stmt->execute();
$response = [
    'success' => $resultat,
    'message' => $resultat ? "Commission inserted successfully" : "Error inserting commission"
];
?>