<?php
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
require_once("vendor/autoload.php"); 
header('Content-type:application/json');


$json_data = json_decode(file_get_contents('php://input'), true); 
    $username = $json_data['Username'];
    $email = $json_data['Email'];
    $password = $json_data['Password'];
    $type = $json_data['type'];

    if ($username !== null && $email !== null && $password !== null && $type !== null) {
        $stmt_check = $connexion->prepare("SELECT COUNT(*) AS count FROM user WHERE username = :username OR email = :email");
        $stmt_check->bindParam(':username', $username);
        $stmt_check->bindParam(':email', $email);
        $stmt_check->execute();
        $result_check = $stmt_check->fetch(PDO::FETCH_ASSOC);

        if ($result_check['count'] > 0) {
            $msg = ["result" => "Username or email already exists"];
            echo json_encode($msg);
            exit;
        } else {
            insertUser($username, $email, $password, $type);
            auth($username, $email, $password, $type);
            $msg = ["result" => "User added successfully"];
            echo json_encode($msg);
                    
        }
    }
       

   
        
function auth($username, $email, $password, $type)
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
            "email" => $email,
            "password" => $password,
            "type" => $type
                        )
                    );
                    $jwt = JWT::encode($token, $secret_key); 
                    echo json_encode(array("success" => true, "jwt" => $jwt));
                } 
function insertUser($username, $email, $password, $type)
{
    global $connexion;
    $stmt = $connexion->prepare("INSERT INTO user (username, email, password, type) VALUES (:username, :email, :password, :type)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':type', $type);
    $resultat = $stmt->execute();
    if ($resultat) {
        if ($type == 'A') {
            $stmt_artist = $connexion->prepare("INSERT INTO artist (username, Description,  Headline, pfpURL, Rating) VALUES (:username, NULL, NULL, NULL, NULL)");
            $stmt_artist->bindParam(':username', $username);
            $stmt_artist->execute();
        } elseif ($type == 'C') {
            $stmt_client = $connexion->prepare("INSERT INTO client (username) VALUES (:username)");
            $stmt_client->bindParam(':username', $username);
            $stmt_client->execute();
        }
    }

}
?>
