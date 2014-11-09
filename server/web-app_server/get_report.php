<?php
/*
REPORT JSON
{
	"datetime": {
		"date": STRING,
		"time": STRING
	},
	"title": STRING,
	"description": STRING,
	"bribe": {
		"category": STRING,
		"requested": NUMBER,
		"paid": NUMBER,
		"currency": STRING
	},
	"location": {
		"lat": NUMBER,
		"lng": NUMBER
	},
	"image_url": STRING
}
*/
require('db.php');
$db = new DaylightDB();
$res = $db->get_reports();
$report_arr = [];
$i = 0;
while ($result = $res->fetch_row()) {
	$report_arr[$i] = [];
	//datetime
	$datetime = [];
	$date_arr = explode(" ", $result[1]);
	$datetime["date"] = mysqli_real_escape_string($db->db, $date_arr[0]); //date
	$datetime["time"] = mysqli_real_escape_string($db->db, $date_arr[1]); //time
	$report_arr[$i]["datetime"] = $datetime;
	//title
	$report_arr[$i]["title"] = mysqli_real_escape_string($db->db, $result[2]);
	//description
	$report_arr[$i]["description"] = mysqli_real_escape_string($db->db, $result[3]);
	//bribe
	$report_arr[$i]["bribe"] = array(
		"category" => mysqli_real_escape_string($db->db, $result[4]),
		"requested" => mysqli_real_escape_string($db->db, $result[5]),
		"paid" => mysqli_real_escape_string($db->db, $result[6]),
		"currency" => mysqli_real_escape_string($db->db, $result[7]));
	//location
	$report_arr[$i]["location"] = array(
		"lat" => mysqli_real_escape_string($db->db, $result[8]),
		"lng" => mysqli_real_escape_string($db->db, $result[9]));
	//image
	$report_arr[$i]["image"] = mysqli_real_escape_string($db->db, $result[10]);
	$i++;
}
echo json_encode($report_arr);
?>
