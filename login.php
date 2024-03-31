<?php
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');

//json data
$json_data = json_decode(file_get_contents('php://input'), true); 

$username = $json_data['username'];
$password = $json_data['password'];

if ($username !== null && $password !== null) {
    // retrieve user data
    $stmt = $connexion->prepare("SELECT * FROM user WHERE Username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // compare passwords
    if ($user) {
        $stored_pw = $user['Password'];
        if ($password === $stored_pw) {
            echo json_encode(array("result" => "true"));
            auth($username, $password);

        } else {
            echo json_encode(array("result" => "Password incorrect"));
        }
    } else {
        echo json_encode(array("result" => "Username is incorrect"));
    }
} else {
    echo json_encode(array("result" => "Missing username or password"));
}
function auth($username, $password)
{                  
       // jwt token generation
    global $connexion;              
    $secret_key = "bc34968d319ad9363f9642f6c567f9b119c979e2431e544421101aa6c9fe95a1"; 
    $issuer_claim = "localhost"; 
    $audience_claim = "localhost"; 
    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 10; 
    $expire_claim = $issuedat_claim + 3600; 

    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "username" => $username,
            "password" => $password,
                        )
                    );
                    $jwt = JWT::encode($token, $secret_key); 
                    echo json_encode(array("result" => true, "jwt" => $jwt));
                } 
            
?>
