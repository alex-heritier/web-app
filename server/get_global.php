<?php

// Handy debugging statements:
// ini_set('display_errors', 'On');
// error_reporting(E_ALL | E_STRICT);

require('db.php');

// This data is consumed in app/GlobalController.doInBackground

$db = new DaylightDB();
$result = $db->query('SELECT id,' .
                     'category is not null,             category,' .
                     'description is not null,          description, ' .
                     'currency_requested is not null,   currency_requested, ' .
                     'currency_paid is not null,        currency_paid, ' .
                     'bribe_requested is not null,      bribe_requested, ' .
                     'bribe_paid is not null,           bribe_paid, ' .
                     'latitude is not null,             latitude, ' .
                     'longitude is not null,            longitude, ' .
                     'altitude is not null,             altitude, ' .
                     'accuracy is not null,             accuracy, ' .
                     'official is not null,             official ' .
                     'FROM corruption_reports ' .
                     'ORDER BY date DESC LIMIT 100');

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
