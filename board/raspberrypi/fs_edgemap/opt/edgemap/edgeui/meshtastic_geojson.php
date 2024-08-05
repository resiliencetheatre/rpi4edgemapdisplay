<?php
/*
 * Sample geojson fetch from sqlite db
 * 
 * 
 * 
 */

// TODO: More sanity check of invalid or empty data !
$db_file="/tmp/radio.db";
// Check if sqlite3 DB is available
if ( file_exists($db_file) && is_readable($db_file) ) {
} else {
    exit;
}

$db = new SQLite3($db_file);
// linkline between nodes (0/1)
$LINK_LINE = $_GET['linkline'];
$MY_CALLSIGN = $_GET['myCallSign'];

// Color code
function getSignalColor($dBm) {
    // Define thresholds and colors
    // $thresholds = [-100, -70, -50, -30];
    $thresholds = [-100, -50, -30, -20];
    $colors = [
        ['r' => 255, 'g' => 0, 'b' => 0],    // Red (poor signal)
        ['r' => 255, 'g' => 255, 'b' => 0],  // Yellow (medium signal)
        ['r' => 0, 'g' => 255, 'b' => 0],    // Green (good signal)
    ];

    // Clamp dBm to be within the thresholds
    if ($dBm <= $thresholds[0]) {
        return sprintf("rgb(%d, %d, %d)", $colors[0]['r'], $colors[0]['g'], $colors[0]['b']);
    }
    if ($dBm >= $thresholds[3]) {
        return sprintf("rgb(%d, %d, %d)", $colors[2]['r'], $colors[2]['g'], $colors[2]['b']);
    }

    // Find which threshold range the dBm value falls into
    for ($i = 0; $i < count($thresholds) - 1; $i++) {
        if ($dBm >= $thresholds[$i] && $dBm < $thresholds[$i + 1]) {
            $ratio = ($dBm - $thresholds[$i]) / ($thresholds[$i + 1] - $thresholds[$i]);
            $r = round($colors[$i]['r'] + $ratio * ($colors[$i + 1]['r'] - $colors[$i]['r']));
            $g = round($colors[$i]['g'] + $ratio * ($colors[$i + 1]['g'] - $colors[$i]['g']));
            $b = round($colors[$i]['b'] + $ratio * ($colors[$i + 1]['b'] - $colors[$i]['b']));
            return sprintf("rgb(%d, %d, %d)", $r, $g, $b);
        }
    }

    // Fallback color (should never reach here)
    return "rgb(0, 0, 0)";
}


//
// Query NAME's first
//
$res = $db->query('SELECT DISTINCT callsign FROM meshradio order by ID DESC');
$x=1;
while ($row = $res->fetchArray()) {
	// echo "{$row['id']} {$row['callsign']} {$row['time']} {$row['lat']} {$row['lon']} \n";
	if ( $row['callsign'] != "" ) {
		$NAME[$x] = "{$row['callsign']}";
		$x++;
	}
}  

//
// Count of items in DB
//
$ITEM_COUNT = $x-1;

// 
// Query each target: name, time, lat and lon (latest position)
// 
for ($loop = 1; $loop < $x; $loop++)  {
	$db = new SQLite3($db_file);
	$res = $db->query('SELECT * FROM meshradio WHERE callsign like "'.$NAME[$loop].'" order by ID DESC LIMIT 1 ');
	while ($row = $res->fetchArray()) {
		if ( $row['callsign'] != "" && $row['lat'] != "" && $row['lon'] != ""  ) {
			$ITEM_NAME[$loop] = "{$row['callsign']}";
			$ITEM_TIME[$loop] = "{$row['time']}";
			$ITEM_LAT[$loop] = "{$row['lat']}";
			$ITEM_LON[$loop] = "{$row['lon']}";
            $ITEM_SNR[$loop] = "{$row['snr']}";
            $ITEM_RSSI[$loop] = "{$row['rssi']}";
		}
	} 
}



// 
// Output geojson of targets 
//
$loop = $ITEM_COUNT;
$count = $ITEM_COUNT;
echo '
{ "type": "FeatureCollection", 
  "features": [';
  
    if ( 0 ) {
        for ($x = 1; $x <= $loop; $x++)
        {
            
                echo ' 
                      { "type": "Feature",
                      "geometry": {"type": "Point", "coordinates": ['.$ITEM_LON[$x] .','.$ITEM_LAT[$x].']},
                      "properties": { "targetName": "'.$ITEM_NAME[$x].'",
                      "time-stamp": "'.$ITEM_TIME[$x].'" }
                      }
                ';
            
                if ($x < $loop) {
                    echo ",";
                }
            
        }
        echo ",";
    }

	/* 
	 * Draw line strings between every node
     * This is just a demo, get this data from MESH nodes
     * in real life.
     * 
     * See: doc/link-line-debug-though.excalidraw
     * 
	 */
     
     $innerstart=1;
     if ( $LINK_LINE == "1" ) {
         
        for ($outer = 1; $outer < $count; $outer++)
        {
                $innerstart=$innerstart+1;
                for ($inner = $innerstart; $inner <= $count; $inner++)
                {
                    // if ( $ITEM_NAME[$from] == $MY_CALLSIGN ) {
                        $from=$outer;
                        $to=$inner;
                        $LON = $ITEM_LON[$from];
                        $LAT = $ITEM_LAT[$from];
                        $LON_2 = $ITEM_LON[$to];
                        $LAT_2 = $ITEM_LAT[$to];
                        // $LINE_TEXT = $ITEM_NAME[$from] ."->".$ITEM_NAME[$to].": ".$ITEM_SNR[$to] ." (". $ITEM_RSSI[$to].")";
                        // $LINE_TEXT = $ITEM_NAME[$from] ." (".$ITEM_RSSI[$from]." dBm)" ." to ".$ITEM_NAME[$to]." (".$ITEM_RSSI[$to]." dBm)";
                        // $LINE_TEXT = "".$ITEM_RSSI[$to]." dBm";
                        
                        $LINE_COLOR = "#6F6";
                        $LINE_WIDTH = 16;
                        
                        if ( $ITEM_RSSI[$from] == "0" ) {
                            $LINE_TEXT = $ITEM_RSSI[$to]." dBm";
                            $LINE_COLOR = getSignalColor($ITEM_RSSI[$to]); // "#6F6";
                        }
                        if ( $ITEM_RSSI[$to] == "0" ) {
                            $LINE_TEXT = $ITEM_RSSI[$from]." dBm";
                            $LINE_COLOR = getSignalColor($ITEM_RSSI[$from]); // "#6F6";
                        }
                        


                        
                        
                        if ( $ITEM_NAME[$from] == $MY_CALLSIGN || $ITEM_NAME[$to] == $MY_CALLSIGN ) {
                            echo '{ "type": "Feature",
                                  "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
                                  "properties": { "color": "'.$LINE_COLOR.'", "width": '.$LINE_WIDTH.', "opacity": 0.8, "title": "'.$LINE_TEXT.'", "text-color": "#000","text-size": 16,"text-halo-color": "#fff","text-halo-width": 3,"text-halo-blur": 2 }
                                  }';
                        } else {
                            echo '{ "type": "Feature",
                                  "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
                                  "properties": { "color": "'.$LINE_COLOR.'", "width": 1, "opacity": 0, "title": "'.$LINE_TEXT.'", "text-color": "#ffffff00","text-size": 12,"text-halo-color": "#ffffff00","text-halo-width": 4,"text-halo-blur": 2 }
                                  }';
                        }
                    
                        if ($outer+1 == $count) {
                            
                        } else {
                            echo ",";
                        }
                    

                }
        }
        
	}
  
   
echo "]
	  }";
      
?>
