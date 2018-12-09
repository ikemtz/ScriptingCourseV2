<?php
header('Access-Control-Allow-Origin: *');  
// Giving me access to fulfill requests for files up to a gig
ini_set('memory_limit', '1G');
// ensuring that file query string parameter is passed in
header("HTTP/1.1 401 Unauthorized");
exit;

//$file = isset($_GET['file']) ? $_GET['file'] : die("You must specify a file")
//echo readfile();
?>