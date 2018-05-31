<?php 

/****************************************************************
 Returns a single elevation for a given point location
 (uses POSTed params to avoid values being cached by some browsers )
****************************************************************/
 
require_once 'OSNTFReader.php';

$e = $_POST['e']; // easting
$n = $_POST['n']; // northing

/*
 The constructor requires the path to the OS data file directory which contains
 the 55 sub-directories which in turn contain the actual .ntf data files
 exactly as downloaded from Ordnance Survey      
*/  
$dataReader = new OSNTFReader("OSNTFdata");
echo $dataReader->getElevation($e, $n, $interpolate=false); 
 
?> 
 