<?php
date_default_timezone_set('Asia/Bangkok');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://garudajitu.net/load_hasil_lengkap.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$curlResponse = curl_exec($ch);
curl_close($ch);
if ($curlResponse === false) {
    echo 'Error executing cURL request: ' . curl_error($ch);
} else {
    $dataArray = json_decode($curlResponse, true);

    // Check if json_decode was successful
    if ($dataArray === null && json_last_error() !== JSON_ERROR_NONE) {
        // Handle JSON decoding error
        echo 'Error decoding JSON: ' . json_last_error_msg();
    } else {
        // Convert all string values to lowercase
        array_walk_recursive($dataArray, function (&$value) {
            if (is_string($value)) {
                $value = strtolower($value);
            }
        });

        // Add 20 minutes to each array element's date
        foreach ($dataArray as &$ress) {
            $timestamp = $ress['tanggal'] + (20 * 60); // Add 20 minutes in seconds
            $ress['tanggal'] = date('H:i:s', $timestamp);
        }

        // Filter data for city equals 'sydney'
        $fixData = array_filter($dataArray, function ($ress) {
            return $ress['jenis'] != 'minigame';
        });

        // Sort the filtered array by date in descending order (newest to oldest)
        usort($fixData, function ($a, $b) {
            return strtotime($b['tanggal']) - strtotime($a['tanggal']);
        });

        // Find the data with name equals 'john'
        $dParam = isset($_GET['d']) ? $_GET['d'] : ''; // Get the 'name' parameter from the URL
        $ajaxParam = isset($_GET['ajax']) ? $_GET['ajax'] : ''; // Get the 'name' parameter from the URL

        if (!empty($dParam)) {
            $filteredData = array_filter($dataArray, function ($ress) use ($dParam) {
                return $ress['pasar'] === $dParam;
            });

            // If data with the provided name parameter is found, display information for each element
            if (!empty($filteredData)) {
                foreach ($filteredData as $ress) {
                    $pasaran = $ress['pasar'];
                    $angka = $ress['angka'];
                    $jam = $ress['tanggal'];
                    echo '["'.$pasaran.'","'.$angka.'","'.$jam.'"]';
                }
            } else {
                echo 'No data found for value"' . $dParam . '".';
            }
        } elseif (!empty($ajaxParam) && $ajaxParam == "yes"){
            

            echo "HK :  SDY :  SGP : ";
        }elseif( $ajaxParam == "full"){
            echo json_encode($fixData);
        }else {
            // Process the filtered array and print the table
            //printTable($fixData);
            echo "[]";
        }

        
    }
}

// Your function to print the array in a table
function printTable($dataArray) {
    echo '<table border="1">';
    echo '<tr><th>Name</th><th>Last Res</th><th>Time</th></tr>';

    foreach ($dataArray as $ress) {
        echo '<tr>';
        echo '<td>' . $ress['pasar'] . '</td>';
        echo '<td>' . $ress['angka'] . '</td>';
        echo '<td>' . $ress['tanggal'] . '</td>';
        echo '</tr>';
    }

    echo '</table>';
}

// Show data
?>
