<?php
// Handy debugging statements:
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);

require('db.php');

$db = new DaylightDB();
$result = $db->get_local();
while ($row = $result->fetch_row()) {
      for ($j = 0; $j < count($row); $j++) {
      	  $raw = $row[$j];
	  // replace spaces with '+' because it messes with the javascript
	  $raw = str_replace(" ", "+", $raw);
      	  echo $raw . " ";
	}
      echo "<br>";
}

?>
