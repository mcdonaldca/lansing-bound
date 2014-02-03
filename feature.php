<?php

require("assets/config.php");

$db = new PDO("mysql:dbname=$dbname;host=localhost", $dbuser, $dbpass);
$q_videoid = $db->quote($_GET["q"]);
$query = 'SELECT * FROM locations WHERE video_id =' . $q_videoid ;
$rows = $db->query($query);

echo '<div class="x"><a>x</a></div>';
 
foreach( $rows as $row) {
	$title = $row["title"];
	$details = $row["details"];
	$type = $row["type"];
	$video = $row["video"];
	$video_id = $row["video_id"];

	echo '<h1 class="'. $type .'">' . $title . '</h1>';
	echo '<div id="video-frame">';

	if( $video == "vimeo" ) {
  	echo '<iframe id="video" src="//player.vimeo.com/video/' . $video_id . '" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
  } else if ( $video == "youtube") {
  	echo '<iframe id="video" width="560" height="315" src="//www.youtube.com/embed/' . $video_id .'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
  }

  echo '</div><p>' . $details . '</p>';

} ?>