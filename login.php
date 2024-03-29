<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once("connexion.php");
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
        } else {
            echo json_encode(array("result" => "Password incorrect"));
        }
    } else {
        echo json_encode(array("result" => "Username is incorrect"));
    }
} else {
    echo json_encode(array("result" => "Missing username or password"));
}
?>
