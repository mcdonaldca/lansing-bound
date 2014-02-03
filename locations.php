<?php

require("assets/config.php");

$db = new PDO("mysql:dbname=$dbname;host=localhost", $dbuser, $dbpass);

// Function to gather locations of a certain type

function findLocations( $db, $type ) {
	$q_type = $db->quote($type);
	$query = 'SELECT * FROM locations WHERE type = ' . $q_type;
	$rows = $db->query($query);
	echo '<div id="'. $type .'-locs">';
	foreach( $rows as $row) {
		$lat = $row["latitude"];
		$long = $row["longitude"];
		$id = $row["video_id"];
		echo '<div class="loc" lat="' . $lat . '" long="' . $long . '" id="' . $id . '"></div>';
	}
	echo '</div>';
};

findLocations($db, "music");
findLocations($db, "food");
findLocations($db, "art");
findLocations($db, "events");
findLocations($db, "festivals");
findLocations($db, "parks");

?>