<?php
header('Access-Control-Allow-Origin: *');  
header('Content-Type: application/json');
//checking if querystring parameter was passed in, otherwise default to the root c:\
$dir = isset($_GET['fldr']) ? $_GET['fldr'] : 'c:/';
//Get list of files and directories
$files1 = scandir($dir); 

print_r(json_encode($files1));

?>