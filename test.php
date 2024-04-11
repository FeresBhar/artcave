<?php

// Include your database connection file
require_once("connexion.php");

$json_data = json_decode(file_get_contents('php://input'), true); 
    $categories = $json_data['categories'];

// Check if categories were successfully decoded
if ($categories === null) {
    die("Error decoding JSON data");
}

// Prepare SQL statement to insert categories
$sql = "INSERT INTO category (Name) VALUES (:name)";
$stmt = $connexion->prepare($sql);

// Iterate over categories and insert them into the database
foreach ($categories as $category) {
    // Bind category name parameter
    $stmt->bindParam(':name', $category, PDO::PARAM_STR);
    
    // Execute the statement
    if (!$stmt->execute()) {
        die("Error inserting category: " . $stmt->errorInfo()[2]);
    }
}

echo "Categories inserted successfully";

?>
