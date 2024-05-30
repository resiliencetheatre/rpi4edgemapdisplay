<?php
/*
 * Sample geojson fetch from sqlite db
 * 
 * - Reads sqlite database where CoT receiver stores target information
 * - This is just a simulation DB currently
 * 
 * 
 */

// TODO: More sanity check of invalid or empty data !
$db = new SQLite3('test.db');
// linkline between nodes (0/1)
$LINK_LINE = $_GET['linkline'];

//
// Query NAME's first
//
$res = $db->query('SELECT DISTINCT NAME FROM COT_DATA order by ID DESC');
$x=1;
while ($row = $res->fetchArray()) {
	// echo "{$row['ID']} {$row['NAME']} {$row['TIME']} {$row['LAT']} {$row['LON']} \n";
	if ( $row['NAME'] != "" ) {
		$NAME[$x] = "{$row['NAME']}";
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
	$db = new SQLite3('test.db');
	$res = $db->query('SELECT * FROM COT_DATA WHERE NAME like "'.$NAME[$loop].'" order by ID DESC LIMIT 1 ');
	while ($row = $res->fetchArray()) {
		if ( $row['NAME'] != "" && $row['LAT'] != "" && $row['LON'] != ""  ) {
			$ITEM_NAME[$loop] = "{$row['NAME']}";
			$ITEM_TIME[$loop] = "{$row['TIME']}";
			$ITEM_LAT[$loop] = "{$row['LAT']}";
			$ITEM_LON[$loop] = "{$row['LON']}";
		}
	} 
}

//
// Tail query 
//
for ($loop = 1; $loop < $x; $loop++)  {
	
	$TAIL_LEN=15;
	$TAIL_NAME= $NAME[$loop]; // "2106";
	$db = new SQLite3('test.db');
	$res = $db->query('SELECT * FROM COT_DATA WHERE NAME like "'.$TAIL_NAME.'" order by ID DESC LIMIT '.$TAIL_LEN );
	$count=1;
	while ($row = $res->fetchArray()) {
		if ( $row['LAT'] != "" && $row['LON'] != ""  ) {
			$TAIL_LAT[$loop][$count] = "{$row['LAT']}";
			$TAIL_LON[$loop][$count] = "{$row['LON']}";
			$count++;
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
                    $from=$outer;
                    $to=$inner;
                    $LON = $ITEM_LON[$from];
                    $LAT = $ITEM_LAT[$from];
                    $LON_2 = $ITEM_LON[$to];
                    $LAT_2 = $ITEM_LAT[$to];
                    $LINE_TEXT ="2 dBi";
                    echo '{ "type": "Feature",
                          "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
                          "properties": { "color": "#383", "width": 8, "opacity": 0.8, "title": "'.$LINE_TEXT.'", "text-color": "#000","text-size": 18,"text-halo-color": "#EEE","text-halo-width": 4,"text-halo-blur": 2 }
                          }
                    ';
                    echo ",";
                    
                }
        }
        
	}
  
    // Reference, with static 1 - 2 relation
	if ( $LINK_LINE == "2" ) {
		$from=1;
		$to=2;
		$LON = $ITEM_LON[$from];
		$LAT = $ITEM_LAT[$from];
		$LON_2 = $ITEM_LON[$to];
		$LAT_2 = $ITEM_LAT[$to];
		echo '{ "type": "Feature",
			  "geometry": {"type": "LineString", "coordinates": [ ['.$LON .','.$LAT.'],['.$LON_2 .','.$LAT_2.'] ]},
			  "properties": { "color": "green", "width": 5, "opacity": 0.5 }
			  }
		';
		echo ",";
	}

    //
    // Tail test 
    //
	 for ($outer_loop = 1; $outer_loop < $x; $outer_loop++)  {
		 
		// start of one tail
		echo '{ "type": "Feature",
				  "geometry": {"type": "LineString",
				  "coordinates": [ ';
		
		for ($loop = 1; $loop < $TAIL_LEN-4 ; $loop++)  {
			if ( $TAIL_LON[$outer_loop][$loop] != "" && $TAIL_LAT[$outer_loop][$loop] != "" && $TAIL_LON[$outer_loop][$loop+1] != "" && $TAIL_LAT[$outer_loop][$loop+1] != "" ) {
				echo '  ['.$TAIL_LON[$outer_loop][$loop]  .','.$TAIL_LAT[$outer_loop][$loop].'],['.$TAIL_LON[$outer_loop][$loop+1] .','.$TAIL_LAT[$outer_loop][$loop+1].']  ';
				if ($loop < $TAIL_LEN-5) {
					if ( $TAIL_LON[$outer_loop][$loop+1] != "" && $TAIL_LAT[$outer_loop][$loop+1] != "" && $TAIL_LON[$outer_loop][$loop+2] != "" && $TAIL_LAT[$outer_loop][$loop+2] != "" ) {
						echo ",";
					}
				}
			}
		}	
		echo '] },
		  "properties": {"color": "#44E", "width": 4 , "opacity": 0.9 }
		  }';
		if ($outer_loop < $x -1) {
			echo ",";
		}
		// end of one tail	
	}
	
echo "]
	  }";
      
?>
