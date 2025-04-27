<?php
// Database connection
$servername = "localhost";  // Your MySQL server
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password
$dbname = "wheelchairs_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Query to fetch wheelchair data with associated type and user data
$sql = "SELECT f.ID_FAUTEUIL, f.PROPULTION, f.PRIX, f.QT_STOCK, t.NOM_TYPE, u.EMAIL 
        FROM FAUTEUIL f
        INNER JOIN TYPE_FAUTEUIL t ON f.ID_TYPE = t.ID_TYPE
        INNER JOIN UTILISATEUR u ON f.ID_UTILISATUER = u.ID_UTILISATUER";

$result = $conn->query($sql);

$wheelchairs = [];
if ($result->num_rows > 0) {
    // Fetch all the rows and store in the array
    while($row = $result->fetch_assoc()) {
        $wheelchairs[] = $row;
    }
}

// Close the connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($wheelchairs);
?>
