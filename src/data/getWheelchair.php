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
    
    $id = $_GET['id'] ?? null;
    $type = $_GET['type'] ?? null;
    $exclude = $_GET['exclude'] ?? null;
    
    if ($id) {
        // Get wheelchair details
        $stmt = $conn->prepare("
            SELECT f.*, t.NOM_TYPE 
            FROM FAUTEUIL f
            JOIN TYPE_FAUTEUIL t ON f.ID_TYPE = t.ID_TYPE
            WHERE f.ID_FAUTEUIL = :id
        ");
        $stmt->execute([':id' => $id]);
        $wheelchair = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$wheelchair) {
            http_response_code(404);
            echo json_encode(["error" => "Wheelchair not found"]);
            exit;
        }
        
        // Get options
        $stmt = $conn->prepare("
            SELECT o.* 
            FROM AVOIR__OPTION ao
            JOIN `OPTION` o ON ao.ID_OPTION = o.ID_OPTION
            WHERE ao.ID_FAUTEUIL = :id
        ");
        $stmt->execute([':id' => $id]);
        $options = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $wheelchair['options'] = $options;
        
        // Get components
        $stmt = $conn->prepare("
            SELECT c.* 
            FROM COMPOSER_DE cd
            JOIN COMPOSANT c ON cd.ID_COMPOSANT = c.ID_COMPOSANT
            WHERE cd.ID_FAUTEUIL = :id
        ");
        $stmt->execute([':id' => $id]);
        $components = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $wheelchair['components'] = $components;
        
        // Get recommended pathologies
        $stmt = $conn->prepare("
            SELECT p.* 
            FROM EST_ASSOCIE ea
            JOIN PATHOLOGIE p ON ea.ID_PATHOLOGIE = p.ID_PATHOLOGIE
            WHERE ea.ID_FAUTEUIL = :id
        ");
        $stmt->execute([':id' => $id]);
        $pathologies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $wheelchair['pathologies'] = $pathologies;
        
        echo json_encode($wheelchair);
    } elseif ($type) {
        // Get related wheelchairs
        $sql = "
            SELECT f.*, t.NOM_TYPE 
            FROM FAUTEUIL f
            JOIN TYPE_FAUTEUIL t ON f.ID_TYPE = t.ID_TYPE
            WHERE f.ID_TYPE = :type
        ";
        
        $params = [':type' => $type];
        
        if ($exclude) {
            $sql .= " AND f.ID_FAUTEUIL != :exclude";
            $params[':exclude'] = $exclude;
        }
        
        $sql .= " LIMIT 4";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        $wheelchairs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($wheelchairs);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid request"]);
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>