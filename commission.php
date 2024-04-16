<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS, PUT");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');



// Check the request method
$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method !== 'GET') {


    // getting artistID from jwt
$headers = apache_request_headers();
if (isset($headers)) {
    $jwtbear = $headers['Authorization'];
    $jwtbear = explode(' ', $jwtbear);
    $jwt= $jwtbear[1];
}
$decoded = JWT::decode($jwt, new Key("bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1",'HS256'));
$artistID = $decoded ->data->id;


    // getting input info from comm
    $json_data = json_decode(file_get_contents('php://input'), true); 
    $title = $json_data['title'] ?? NULL;
    $cominfo = $json_data['cominfo'] ?? NULL;
    $cominstru = $json_data['cominstru'] ?? NULL;
    $minprice = $json_data["minprice"] ?? NULL;
    $imageURL = $json_data["imageURL"] ?? NULL;

    // inserting into table comissiona
    $stmt = $connexion->prepare("INSERT INTO comissiona (artistID, title, cominfo, cominstru, minprice, imageURL) VALUES (:artistID, :title, :cominfo, :cominstru, :minprice, :imageURL)");
    $stmt->bindParam(':artistID', $artistID);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':cominfo', $cominfo);
    $stmt->bindParam(':cominstru', $cominstru);
    $stmt->bindParam(':minprice', $minprice);
    $stmt->bindParam(':imageURL', $imageURL);
    $resultat = $stmt->execute();
    $response = [
        'success' => $resultat,
        'message' => $resultat ? "Commission inserted successfully" : "Error inserting commission"
    ];
    echo json_encode($response);
} else {
    $username = $_GET['username'];
    $stmt = $connexion->prepare('SELECT ArtistID from artist WHERE username=:username');
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $artistID=$stmt->fetchColumn();

    $stmtwo = $connexion->prepare("
        SELECT *
        FROM comissiona
        WHERE artistID = :artistID
    ");
    $stmtwo->bindParam(':artistID', $artistID);
    $stmtwo->execute();
$result = $stmtwo->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);


}
?>
