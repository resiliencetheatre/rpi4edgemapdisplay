<?php


$file_name="/opt/edgemap-persist/sensor-".$_GET["id"].".txt";

if (file_exists($file_name)) {
    // Read the data from the file
    $data = file_get_contents($file_name);
    // Return the data as JSON
    echo json_encode(['data' => $data]);
} else {
    echo json_encode(['data' => 'No data found']);
}
?>
