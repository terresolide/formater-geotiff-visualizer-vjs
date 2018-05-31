<?php 

/****************************************************************
 Displays a graph of elevations between two OS points
****************************************************************/
 
require_once 'OSNTFReader.php';        // the OS elevation reader class  
require_once ('jpgraph/jpgraph.php');  // the graphing tool 
require_once ('jpgraph/jpgraph_line.php');

$e0 = $_GET['e0']; // easting & northing of 1st position  
$n0 = $_GET['n0']; 
 
$e1 = $_GET['e1']; // easting & northing of 2nd position
$n1 = $_GET['n1'];

$locations = array($e0, $n0, $e1, $n1);  // put the two location pairs into an array 

/*
 The constructor requires the path to the OS data file directory which contains
 the 55 sub-directories which in turn contain the actual .ntf data files
 exactly as downloaded from Ordnance Survey  	
*/  
$dataReader = new OSNTFReader("OSNTFdata");

/*
 - can optionally show verbose errors for debugging purposes (default: false)
 - can optionally change the max number of allowed input locations (default: 5000)	
*/
$dataReader->showErrors = true;
$dataReader->maxPoints = 6000;


/*
 getMultipleElevations($locations [, $addIntermediateLatLons [, $interpolate]])
 
 Returns an array of elevations in metres given an array of eastings & northings
 as {e1, n1, ... en, nn}
 
 - can optionally calculate intermediate locations at 50m intervals
 - can optionally use bilinear interpolation for the elevations 
*/

$elevations = $dataReader->getMultipleElevations($locations, $addIntermediateLatLons = true, $interpolate = false);

// get the number of elevations returned
$numElevations = count($elevations);

// get the total distance between the points
$distance = $dataReader->getTotalDistance();

// setup the graph
$graph = new Graph(700,250);
$graph->SetMargin(40,40,20,30); 
$graph->SetBox();
$graph->SetMarginColor('darkgreen@0.8');
$graph->SetBackgroundGradient('cyan','yellow',GRAD_HOR,BGRAD_PLOT);

$graph->title->SetFont(FF_VERDANA,FS_BOLD,10);
$graph->title->Set('Elevation Profile: height (m) against distance (Km)');

// ensure graph exactly fills the x axis with no gaps   
$graph->SetScale("intlin", 0, 0, 0, $numElevations -1 );

// uncomment this to start the y axis at zero
//$graph->yscale->SetAutoMin(0);

// custom scale callback function for x axis
$graph->xaxis->SetLabelFormatCallback('labelScaler');

// create the line using the elevations array
$plot = new LinePlot($elevations);
$plot->SetFillGradient('white','darkgreen');
$graph->Add($plot);

// output to browser
$graph->Stroke();

/*
 custom graph scale function
 - sets the x axis to kilometres with appropriate rounding 
 (by default the graph will show the number of elevations)
 
*/
function labelScaler($currentValue) {     
    if ($currentValue == 0) {
        return 0;
    }    
    global $distance;
    global $numElevations;
    
    // show greater precision for distances under 1 Km
    ($distance < 1) ? $precision = 2 : $precision = 1;
                                    
    return round($distance * $currentValue / $numElevations, $precision);
}
 
?> 
 