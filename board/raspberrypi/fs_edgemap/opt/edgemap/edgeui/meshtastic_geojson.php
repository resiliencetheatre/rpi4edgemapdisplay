<?php
/*
 * Sample geojson fetch from sqlite db
 * 
 * 
 * 
 */

// TODO: More sanity check of invalid or empty data !
$db_file="/tmp/radio.db";
$db = new SQLite3($db_file);
// linkline between nodes (0/1)
$LINK_LINE = $_GET['linkline'];
$MY_CALLSIGN = $_GET['myCallSign'];

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
                        // $LINE_TEXT = $ITEM_NAME[$from] ." to ".$ITEM_NAME[$to]." (".$ITEM_RSSI[$to]." dBm)";                     
                        $LINE_TEXT = "".$ITEM_RSSI[$to]." dBm";
                        
    
    
                        if ( $ITEM_NAME[$from] == $MY_CALLSIGN ) {
                            echo '{ "type": "Feature",
                                  "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
                                  "properties": { "color": "#383", "width": 4, "opacity": 0.8, "title": "'.$LINE_TEXT.'", "text-color": "#000","text-size": 12,"text-halo-color": "#EEE","text-halo-width": 4,"text-halo-blur": 2 }
                                  }';
                        } else {
                            echo '{ "type": "Feature",
                                  "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
                                  "properties": { "color": "#383", "width": 1, "opacity": 0, "title": "'.$LINE_TEXT.'", "text-color": "#ffffff00","text-size": 12,"text-halo-color": "#ffffff00","text-halo-width": 4,"text-halo-blur": 2 }
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
