<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wheel";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("
        SELECT f.ID_FAUTEUIL, f.PRIX, f.QT_STOCK, f.PROPULTION, 
               t.NOM_TYPE, t.ID_TYPE
        FROM FAUTEUIL f
        JOIN TYPE_FAUTEUIL t ON f.ID_TYPE = t.ID_TYPE
        ORDER BY f.ID_FAUTEUIL
    ");
    $stmt->execute();
    
    $wheelchairs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add calculated fields for frontend
    foreach ($wheelchairs as &$wheelchair) {
        $wheelchair['PROPULTION_TEXT'] = $wheelchair['PROPULTION'] ? 'With propulsion' : 'Manual';
        $wheelchair['NEW'] = $wheelchair['ID_FAUTEUIL'] > 103; // Mark new entries
    }
    
    echo json_encode($wheelchairs);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>