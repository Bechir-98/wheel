<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $profession = $_POST['profession'];

    try {
        // Insert into users table
        $stmt = $pdo->prepare("INSERT INTO users (email, password, profession) VALUES (?, ?, ?)");
        $stmt->execute([$email, $password, $profession]);
        $userId = $pdo->lastInsertId();

        // Based on profession, insert into corresponding table
        switch ($profession) {
            case '1': // Patient
                $stmt = $pdo->prepare("INSERT INTO patients (user_id) VALUES (?)");
                break;
            case '2': // Clinician
                $stmt = $pdo->prepare("INSERT INTO clinicians (user_id) VALUES (?)");
                break;
            case '4': // Vendor
                $stmt = $pdo->prepare("INSERT INTO vendors (user_id) VALUES (?)");
                break;
        }
        
        $stmt->execute([$userId]);

        // Return success response
        echo json_encode(['success' => true, 'profession' => $profession]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?> 