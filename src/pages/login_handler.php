<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is empty
$dbname = "wheel";

// Function to send JSON response
function sendResponse($success, $message, $redirect = null, $debug = null) {
    $response = [
        'success' => $success, 
        'error' => $message,
        'debug' => $debug
    ];
    if ($redirect) {
        $response['redirect'] = $redirect;
    }
    echo json_encode($response);
    exit();
}

// Test database connection first
try {
    // First try to connect to MySQL server without database
    $pdo = new PDO("mysql:host=$servername", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if database exists
    $stmt = $pdo->query("SHOW DATABASES LIKE '$dbname'");
    if ($stmt->rowCount() == 0) {
        // Create database if it doesn't exist
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname`");
        $pdo->exec("USE `$dbname`");
    } else {
        $pdo->exec("USE `$dbname`");
    }
    
    // Check if required tables exist
    $requiredTables = ['UTILISATEUR', 'CLINICIEN', 'COMERCANT', 'PATIENT'];
    $missingTables = [];
    foreach ($requiredTables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() == 0) {
            $missingTables[] = $table;
        }
    }
    
    if (!empty($missingTables)) {
        sendResponse(false, "Missing required tables: " . implode(', ', $missingTables), null, [
            'error' => 'Tables not found',
            'missing_tables' => $missingTables,
            'available_tables' => $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN)
        ]);
    }
    
} catch(PDOException $e) {
    sendResponse(false, "Database Error: " . $e->getMessage(), null, [
        'error' => $e->getMessage(),
        'connection_details' => [
            'host' => $servername,
            'username' => $username,
            'database' => $dbname
        ]
    ]);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debug information
    $debug = [
        'post_data' => $_POST,
        'server' => $_SERVER,
        'session' => $_SESSION
    ];

    // Get and sanitize form data
    $email = isset($_POST['mail']) ? trim($_POST['mail']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($email) || empty($password)) {
        sendResponse(false, 'Email and password are required', null, $debug);
    }

    try {
        // Create PDO connection
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // First check if user exists and get their ID
        $stmt = $pdo->prepare("SELECT ID_UTILISATEUR, PASSWORD FROM UTILISATEUR WHERE EMAIL = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $debug['user_query'] = [
            'email' => $email,
            'row_count' => $stmt->rowCount()
        ];

        if ($stmt->rowCount() == 1) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $debug['user_data'] = $user;
            
            // Verify password
            if ($password === $user['PASSWORD']) {
                $userId = $user['ID_UTILISATEUR'];
                
                // Check which type of user they are
                $userType = null;
                
                // Check if they are a CLINICIEN
                $stmt = $pdo->prepare("SELECT ID_UTILISATEUR FROM CLINICIEN WHERE ID_UTILISATEUR = :id");
                $stmt->bindParam(':id', $userId);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    $userType = 'clinician';
                }
                
                // Check if they are a COMERCANT
                if (!$userType) {
                    $stmt = $pdo->prepare("SELECT ID_UTILISATEUR FROM COMERCANT WHERE ID_UTILISATEUR = :id");
                    $stmt->bindParam(':id', $userId);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        $userType = 'vendor';
                    }
                }
                
                // Check if they are a PATIENT
                if (!$userType) {
                    $stmt = $pdo->prepare("SELECT ID_UTILISATEUR FROM PATIENT WHERE ID_UTILISATEUR = :id");
                    $stmt->bindParam(':id', $userId);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        $userType = 'patient';
                    }
                }
                
                $debug['user_type_check'] = [
                    'user_id' => $userId,
                    'found_type' => $userType
                ];

                if ($userType) {
                    // Store session data
                    $_SESSION['user_id'] = $userId;
                    $_SESSION['email'] = $email;
                    $_SESSION['user_type'] = $userType;
                    
                    // Map user types to their correct dashboard paths
                    $dashboardPaths = [
                        'clinician' => '/clinician-dashboard',
                        'vendor' => '/vendor-dashboard',
                        'patient' => '/patient-dashboard'
                    ];
                    
                    sendResponse(true, 'Login successful', $dashboardPaths[$userType], $debug);
                } else {
                    sendResponse(false, 'User type not found', null, $debug);
                }
            } else {
                sendResponse(false, 'Invalid email or password', null, $debug);
            }
        } else {
            sendResponse(false, 'Invalid email or password', null, $debug);
        }
    } catch(PDOException $e) {
        // Log the error for debugging
        error_log("Database Error: " . $e->getMessage());
        $debug['database_error'] = $e->getMessage();
        sendResponse(false, 'Database error: ' . $e->getMessage(), null, $debug);
    }
} else {
    sendResponse(false, 'Invalid request method', null, $debug);
}
?> 