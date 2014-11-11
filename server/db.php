<?php

class DaylightDB
{
	// HOST has two possible values:
	// From inside AWS: 172.31.18.213
	// From outside: daylight.crovmzzhtgje.us-west-1.rds.amazonaws.com:3306
	const HOST = '172.31.18.213';
	const USER = 'daylight';
	const PASS = 'h8corruption';
	const DB_NAME = 'daylight_db';
	
	function __construct()
	{
		$this->db = new mysqli(DaylightDB::HOST, DaylightDB::USER, DaylightDB::PASS, DaylightDB::DB_NAME);
		if ($this->db->connect_error) {
		    die('Connect Error (' . $this->db->connect_errno . ') ' . $this->db->connect_error);
		}
	}
	
	function __destruct()
	{
		$this->db->close();
	}

	function query($query)
	{
		$result = $this->db->query($query);
		if (! $result) {
		   echo "Query failed: $query, {$this->db->error}";
		}
		return $result;
	}
	
	function get_reports()
	{
		$query = 'SELECT * FROM corruption_reports ' .
		       'ORDER BY date DESC LIMIT 100';
		return $this->query($query);
	}

	function get_local()
	{
		$query = 'SELECT * FROM corruption_reports ' .
		       'ORDER BY date DESC LIMIT 100';
		return $this->query($query);
	}
}

?>
