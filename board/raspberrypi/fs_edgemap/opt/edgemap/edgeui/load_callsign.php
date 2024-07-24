<?php
// load_callsign.php
// Check if the file exists
if (file_exists('/opt/edgemap-persist/callsign.txt')) {
    // Read the data from the file
    $data = file_get_contents('/opt/edgemap-persist/callsign.txt');
    // Return the data as JSON
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['data' => 'Alpha']);
}
?>
