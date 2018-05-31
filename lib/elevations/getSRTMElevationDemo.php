<?php 
 
/****************************************************************
 Returns a single elevation for a given point location
 (uses POSTed params to avoid values being cached by some browsers )
****************************************************************/
require_once 'SRTMGeoTIFFReader.php';

$lat = $_POST['lat'];
$lon = $_POST['lon'];
$interpolate = $_POST['interpolate'];  

$dataReader = new SRTMGeoTIFFReader("GeoData"); // directory containing SRTM data files
echo $dataReader->getElevation($lat, $lon, $interpolate=false);
?> 
 