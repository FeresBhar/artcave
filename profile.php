<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
    $usernm = $decoded ->data->username;
    $stmt = $connexion->prepare('SELECT ArtistID from artist WHERE username=:username');
    $stmt->bindParam(':username', $usernm);
    $stmt->execute();
    $artistID=$stmt->fetchColumn();

    // getting input info from profile
    $json_data = json_decode(file_get_contents('php://input'), true); 
    $headline = $json_data['Headline'] ?? NULL;
    $description = $json_data['Description'] ?? NULL;
    $pfpURL = $json_data['pfpURL'] ?? NULL;
    $categories = $json_data["categories"] ?? NULL;
    $public = $json_data["public"] ?? 'Y';

    // updating everything but categories
    try {
        $stmt = $connexion->prepare("UPDATE Artist SET Description = :description, Headline = :headline, pfpURL = :pfpURL, public=:public WHERE ArtistId = :artistID");
        $stmt->bindParam(':artistID', $artistID);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':headline', $headline);
        $stmt->bindParam(':pfpURL', $pfpURL);
        $stmt->bindParam(':public', $public);
        $resultat = $stmt->execute();
        echo json_encode(array('success' => true, 'message' => 'Profile updated successfully.'));
    } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'PDO Exception: ' . $e->getMessage()));
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
        $stmt = $connexion->prepare("INSERT INTO artistcategory (artistID, categoryID) VALUES (:artistID, :categoryID)");
        $stmt->bindParam(':artistID', $artistID);
        foreach ($categories as $categoryName) {
            $categoryID = getCategoryID($categoryName);
            $stmt->bindParam(':categoryID', $categoryID);
            $stmt->execute();
        }
        // categ updating
    if ($categories) {
        insertCategoriesForArtist($artistID, $categories);
    }
    }
} else {
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
}
?>
