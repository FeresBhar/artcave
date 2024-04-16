<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS, PUT");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');


// getting ID from jwt
$headers = apache_request_headers();
if (isset($headers)) {
    $jwtbear = $headers['Authorization'];
    $jwtbear = explode(' ', $jwtbear);
    $jwt= $jwtbear[1];
}
$decoded = JWT::decode($jwt, new Key("bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1",'HS256'));
$id = $decoded ->data->id;
$username = $decoded ->data->username;
$stmt = $connexion->prepare("SELECT type FROM user WHERE username = :username");
$stmt->bindParam(':username', $username);
$stmt->execute();
$type = $stmt->fetchColumn();

if ($type === 'A') {
        $sql = "SELECT
            client.username AS client_username,
            comrequest.description,
            comrequest.price,
            comrequest.status
        FROM comrequest
        JOIN comissiona ON comissiona.comID = comrequest.comID
        JOIN artist ON artist.artistID = comissiona.artistID
        JOIN client ON client.clientID = comrequest.clientID
        WHERE artist.artistID = :artistID";
        $stmt = $connexion->prepare($sql);
        $stmt->bindParam(':artistID', $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} elseif ($type === 'C') {
        $sql = "SELECT
            comrequest.description,
            comrequest.price,
            comrequest.status,
            artist.username AS artist_username
        FROM comrequest
        JOIN comissiona ON comissiona.comID = comrequest.comID
        JOIN artist ON artist.artistID = comissiona.artistID
        WHERE comrequest.clientID = :clientID";
        $stmt = $connexion->prepare($sql);
        $stmt->bindParam(':clientID', $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode($result);





?>