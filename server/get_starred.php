<?php

// Handy debugging statements:
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

require_once('db.php');

// This data is consumed in app/StarredController.doInBackground



$db = new DaylightDB();
/*
$result = $db->query('SELECT *,' .
                     'category is not null,             category,' .
                     'description is not null,          description ' .
                     'FROM corruption_reports ' .
			'WHERE id=122' .
                     'ORDER BY date DESC LIMIT 100');
print_r($result);
*/

$size = $_GET['size'];
$where = "WHERE ";
for ($i = 0; $i < $size; $i++) {
	if ($i != 0) {
		$where .= ' OR ';
	}
	$where .= 'id=' . $_GET['id_' . $i];
}
$result = $db->query('SELECT * FROM corruption_reports ' . $where . ' ORDER BY date DESC LIMIT 100');

while ($row = $result->fetch_row()) {
	for ($j = 0; $j < count($row); $j++) {
		$raw = $row[$j];
		// Get rid of any tabs in the input.
		$raw = str_replace("\t", " ", $raw);
		// Get rid of any newlines in the input.
		$raw = str_replace("\n", " ", $raw);
		// We use tab delimeters between fields.
		echo $raw . "\t";
	}
	echo "\n";        // "<br>" can be helpful when debugging in a browser.
}

?>
