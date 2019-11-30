<?php
define('DB_HOST','localhost');
define('DB_USERNAME','root');
define('DB_PASSWORD','');
define('DB_NAME','gitw18_inet_fms5.0'); 
// 

$link = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD,DB_NAME)or die('Could not connect');

?>