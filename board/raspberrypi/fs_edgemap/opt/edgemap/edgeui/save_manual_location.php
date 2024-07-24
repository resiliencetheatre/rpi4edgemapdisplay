<?php
// save_manual_location.php
// $ID=$_GET['id'];

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);
// Check if the data key exists
if (isset($data['data'])) {
    // Save the data to a file
    file_put_contents('/opt/edgemap-persist/location.txt', $data['data']);
} else {
    echo 'No data received';
}
?>
