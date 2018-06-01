<?php
/**
*  A partir d'une requete va chercher la valeur en un point du geotiff
*  $_GET['filename'] nom du fichier
*  $_GET['lat'] la latitude
*  $_GET['lng'] la longitude
*  On fera la même, en javascript pour comparer
*  
*  
*  
*  */
require_once 'lib/elevations/GeoTIFFReader.php';

/* test 
* filename: geo_TOT_20170818.unw.tiff
* position{
*  "lat": 19.39268618643092,
*  "lng": -99.07470703125001
* }
* avec javascript value = 30.672475814819336
*/

$latlng = array(
		"lat" => 19.39268618643092,
	    "lng" => -99.07470703125001
);

$reader = new GeoTIFFReader(__DIR__. "/geo_TOT_20170818.unw.tiff");
echo "js value = 30.672475814819336<br />\r\n";
echo "php value = ". $reader->getElevation( $latlng["lat"], $latlng["lng"], false);


/** tests gdal
 * ------------
 * commande gdalinfo
 * commande gdallocationinfo (http://www.gdal.org/gdallocationinfo.html)
 * 
 * 
 * epointal@PCFORMATER:/var/www/geotiff.test$ gdallocationinfo geo_TOT_20170818.unw.tiff 900 1900
Report:
  Location: (900P,1900L)
  Band 1:
    Value: 5.6932544708252
  Band 2:
    Value: 0.71247136592865
epointal@PCFORMATER:/var/www/geotiff.test$ gdallocationinfo geo_TOT_20170818.unw.tiff 1200 500
Report:
  Location: (1200P,500L)
  Band 1:
    Value: -8.5189151763916
  Band 2:
    Value: 0.725419163703918

Avec geolocalisation
----------------------------------------------
epointal@PCFORMATER:/var/www/geotiff.test$ gdallocationinfo -wgs84 geo_TOT_20170818.unw.tiff -99.07470703125001 19.39268618643092
ERROR 6: No translation for an empty SRS to PROJ.4 format is known.

Mais avec -geoloc impeccable, même valeur qu'avec javascript
epointal@PCFORMATER:/var/www/geotiff.test$ gdallocationinfo -geoloc geo_TOT_20170818.unw.tiff -99.07470703125001 19.39268618643092 | tee result.txt
Report:
  Location: (817P,1026L)
  Band 1:
    Value: 30.6724758148193
  Band 2:
    Value: 0.753684520721436

*/
