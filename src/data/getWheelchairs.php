<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// OR establish connection directly:
 $conn = new mysqli("localhost", "root", "", "wheel");

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// SQL Query to fetch wheelchairs and their associated data
$query = "
    SELECT 
        f.ID_FAUTEUIL, 
        f.PRIX, 
        f.QT_STOCK, 
        t.NOM_TYPE, 
        f.PROPULTION
        /* Removed f.DESCRIPTION as it doesn't exist in your schema */
    FROM FAUTEUIL f
    JOIN TYPE_FAUTEUIL t ON f.ID_TYPE = t.ID_TYPE
    WHERE f.QT_STOCK > 0";

$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

$wheelchairs = [];
while ($row = $result->fetch_assoc()) {
    // Convert PROPULTION (0/1) to boolean for better JSON representation
    $row['PROPULTION'] = (bool)$row['PROPULTION'];
    $wheelchairs[] = $row;
}

// Return the data as JSON
echo json_encode($wheelchairs);

// Close connection
$conn->close();
?>