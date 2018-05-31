<?php

/**
*  Returns elevation in metres from Ordnance Survey Panorama NTF files given eastings & northings
* 
*  Data points are available every 50m
*  Each data file covers a 20Km area
*/

class OSNTFReader {
  
    // public properties    
    /**
    * show messages on error condition, otherwise dies silently
    * 
    * @var bool
    */
    public $showErrors = false;    
    /**
    * default maximum number of multiple locations accepted
    * 
    * @var int
    */
    public $maxPoints = 5000; 
    
    // constants
    const ROWS_COLS = 401;
    const MTRS_PER_TILE = 20000; 
    const DATA_DIST = 50;    
    
    // private properties      
    private $dataDir;              // path to local directory containing the OS data files
    private $filePath;             // name of current OS NTF data directory and file name
    private $fp;                   // file pointer to current data file 
    private $points = Array();     // the supplied eastings & northings
    private $elevations = Array(); // the elevation(s) values found
    
    /**
    * Constructor: assigns data directory
    * 
    * @param mixed $dataDir
    * @return OSNTFReader
    */
    function __construct($dataDir) {
        $this->dataDir = $dataDir;
    }
    
    /**
    * Destructor: clean up resources
    * 
    */
    function __destruct() {
        if ($this->fp) {
            fclose($this->fp);
        } 
     }
       
    /**
    * Returns an array of total ascent & descent
    * 
    */
    public function getAscentDescent() {
        
        $ascent = $descent = 0;
        $numElevations = count($this->elevations);
        if ($numElevations > 1) {
            for ($i = 1; $i < $numElevations; $i++) {
                $thisElev = $this->elevations[$i];              
                $lastElev = $this->elevations[$i-1];
                $diff = abs($lastElev - $thisElev);
                if ($diff > 0) {
                   ($thisElev > $lastElev) ? $ascent += $diff : $descent += $diff; 
                }
            }
        }       
        return array("ascent" => $ascent, "descent" => $descent);         
    }
    
    /**
    * Returns the total distance
    * 
    */
    public function getTotalDistance() {
        
        for ($i = 2; $i < count($this->points); $i += 2) {
            $distance += $this->getDistance(
                $this->points[$i-2], 
                $this->points[$i-1], 
                $this->points[$i], 
                $this->points[$i+1]);        
        }
        return $distance;      
    }    
        
    /**
    * Returns the elevation in metres for a given Easting & Northing
    * 
    * Set optional parameter Sinterpolate to true to return a more accurate but slower calculation
    * 
    * @param float $latitude
    * @param float $longitude
    * @param bool $interpolate
    */
    public function getElevation($easting, $northing, $interpolate = false) {
    
        // work out the data file name
        $filePath = $this->getFilePath($easting, $northing);     
        if ($filePath != $this->filePath) {  
            // it's not the same tile as the last run, so 
            // read the file and jump to the first data address
            $this->getNTFFilePointer($filePath);
        }
                      
        // reduce the easting & northing down to the nearest 20Km tile                             
        $tileEasting = fmod($easting, 20000);
        $tileNorthing = fmod($northing, 20000);        
                      
        if ($interpolate) {                 
            // use more accurate but slower bilinear interpolation method
            $elevation = $this->getInterpolatedElevation($tileEasting, $tileNorthing);                         
        }
        else {
            // use less accurate but faster rounding method           
            $elevation = $this->getRoundedElevation($tileEasting, $tileNorthing);
        } 
                 
        return $elevation;
    }
    
    /**
    * Returns an array of elevations in metres given an array of eastings & northings
    * as {e1, n1, ... en, nn}
    * - can optionally calculate intermediate locations at 50m intervals
    * - can optionally use bilinear interpolation for the elevations 
    * 
    * @param array $points
    * @param bool $addIntermediatelatLons
    * @param bool $interpolate
    */
    public function getMultipleElevations($points, $addIntermediatelatLons = true, $interpolate = false) {
                
        $numPoints = count($points);
        
        if ($numPoints < 4) {
            $this->handleError(__METHOD__ , "need at least two point locations in the latLons array");
        }         
        
        // bale out if limit is reached
        $limit = $this->maxPoints;
        if (($numPoints / 2) > $limit) {
            $this->handleError(__METHOD__ , "maximum number of allowed point locations ($limit) exceeded");
        } 
                
        if (($numPoints % 2) != 0 ) {
            $this->handleError(__METHOD__ , "uneven number of lat and lon params ");
        }
        
        if ($addIntermediatelatLons) {
            // work out intermediate eastings and northings for every 50m 
            for ($i = 2; $i < $numPoints; $i += 2) {

                $startE = $points[$i-2];
                $endE =  $points[$i]; 
                $dE =  $endE - $startE;   
                
                $startN = $points[$i-1]; 
                $endN =  $points[$i+1];                
                $dN = $endN - $startN;
                 
                (abs($dE) >= abs($dN)) ? 
                    $numSteps = floor(abs($dE) / self::DATA_DIST): 
                    $numSteps = floor(abs($dN) / self::DATA_DIST); 
                                  
                // calculate approximate intermediate positions for each 50m 
                // by simple proportion of eastings and northings       
                $totNumSteps += $numSteps;
                if  ($totNumSteps >= $limit) {
                     $this->handleError(__METHOD__ , "maximum number of allowed point locations ($limit) exceeded while calculating intermediate points");  
                }                    
                                                           
                for ($j = 0; $j < $numSteps; $j++) {
                    $midE = $startE + ($j * $dE / $numSteps) ;
                    $midN = $startN + ($j * $dN / $numSteps);
                    $elevations[] = $this->getElevation($midE, $midN, $interpolate);                    
                }            
            }
            $elevations[] = $this->getElevation($endE, $endN, $interpolate);    
        }
          
        else { 
            // just do the provided points, no intermediate positions are calculated 
            for ($k = 0; $k < $numPoints; $k += 2) {
                $elevations[] = $this->getElevation($points[$k], $points[$k+1], $interpolate);         
            }
        }
               
        $this->elevations = $elevations;
        $this->points = $points;
                
        return $elevations;      
    }
    
    /**
    * Returns the elevation value of the single data point which is closest to the parameter point
    *   
    * @param float $easting
    * @param float $northing
    */
    private function getRoundedElevation($tileEasting, $tileNorthing) {
                     
        $gridRecOffset = round($tileEasting  * self::ROWS_COLS / self::MTRS_PER_TILE);  
        $gridDataOffset = round($tileNorthing * self::ROWS_COLS / self::MTRS_PER_TILE);
              
        // get the elevation for the data row & column  
        return $this->getData($gridRecOffset, $gridDataOffset);                                  
    }
    
    /**
    * Returns the elevation of the parameter point by performing a bilinear interpolation
    * of the elevation values of the four data points which surround the parameter point  
    * 
    * @param float $latitude
    * @param float $longitude
    */
    private function getInterpolatedElevation($tileEasting, $tileNorthing) {
        
        // calculate record & data offsets for the data point p0 (above & left of the parameter point)
        $rec[0] = floor($tileEasting * self::ROWS_COLS / self::MTRS_PER_TILE);          
        $data[0] = ceil($tileNorthing * self::ROWS_COLS / self::MTRS_PER_TILE);     
       
        // set row & col for the data point p1 (above & right of the parameter point)
        $rec[1] = $rec[0] + 1; 
        $data[1] = $data[0];
        
        // set row & col for the data point p2 (below & left of the parameter point)
        $rec[2] = $rec[0];   
        $data[2] = $data[0] - 1;
       
        // set row & col for the data point p3 (below & right of the parameter point)
        $rec[3] = $rec[0] + 1;          
        $data[3] = $data[0] - 1;
       
        // get the difference in e & n between the p0 data point and the parameter point
        $de = $rec[0] * self::DATA_DIST - $tileEasting;          
        $dn = $data[0] * self::DATA_DIST - $tileNorthing ;
          
        // express dlat & dlon as a proportion of the side of the square created by p0, p1, p2, p3
        $dEProportion = abs($de / self::DATA_DIST);         
        $dNProportion = abs($dn / self::DATA_DIST);
       
        // get the elevation values for points p0, p1, p2 & p3
        for ($i = 0; $i < 4; $i++) {                   
            $elev = $this->getData($rec[$i], $data[$i]);        
            $points[] = $elev;
        }         
        
        // interpolate between the four elevation values   
        $elevation = self::interpolate ($dEProportion, $dNProportion, $points); 
    
        return $elevation;                        
    }
       
    /**
    * Returns the value for point P located inside the square formed by four data points
    * by performing a bilinear interpolation of the four data values
    * 
    * @param float $x
    * @param float $y
    * @param array $pointData
    */
    private function interpolate ($x, $y, $pointData) {
              
       // NB: x & y are expressed as a proportions of the dimension of the square side
       
       // p0------------p1   
       // |      |
       // |      y
       // |      | 
       // |--x-- .P 
       // |
       // p2------------p3
                    
       // bilinear interpolation formula
       $val = $pointData[0] * (1 - $x) * (1 - $y) + 
              $pointData[1] * $x * (1 - $y) + 
              $pointData[2] * $y * (1 - $x) + 
              $pointData[3] * $x * $y;
                       
       return round($val);       
    }
    
    /**
    * Returns the file path to the 20km file holding the data for the full easting & northing
    * 
    * @param mixed $easting
    * @param mixed $northing
    */
    private function getFilePath($easting, $northing) {
        
/*       
        OS grid layout has four 500Km identifiers (H, N, S & T) 
        each potentially containing 5 * 5 100Km grids from A to Z 
        
        NB: letter 'I' is not used, so A to Z = 25 tiles
        NB: sea area grids are not populated
       
                     HP|
                  HT HU|
        |   HW HX HY HZ|
        |--------------|--      
        |NA NB NC ND   |   
        |NF NG NH NJ NK|          
        |NL NM NN NO   |
        |   NR NS NT NU|        
        |   NW NX NY NZ|
        |--------------|--
        |      SC SD SE|TA
        |      SH SJ SK|TF TG
        |   SM SN SO SP|TL TM
        |SQ SR ST SU SV|TQ TR
        |SV SW SX SY SZ|TV 
           
*/      
        // get the char of the containing 500Km grid and e/n diffs against the origin                                        
        $eDiff = $easting;
        $nDiff = $northing;
                        
        if ($nDiff >= (2 * 500000)) { 
            $firstChar = "h"; 
            $nDiff -= (2 * 500000);
        }
        elseif ($nDiff >= 500000) {
            $firstChar = "n";
            $nDiff -= 500000;
        } 
        else {
            if ($eDiff >= 500000) {       
                $firstChar = "t";
                $eDiff -= 500000; 
            }
            else {
                $firstChar = "s";
            }
        }
         
        // work out the 2nd char to identify the containing 100Km grid 
        // noting that the SW origin tile is always 'V' (ASCII 118)  
        $colOffset = ($eDiff == 500000) ? 0 : floor($eDiff / 100000);        
        $rowOffset = ($nDiff == 500000) ? 0 : floor($nDiff / 100000);        
        $val = 118 + $colOffset - ($rowOffset * 5);
        if ($val < 106) {
            $val--; // correct for missing 'i' for values below 'j'
        }
        $secondChar = chr($val);
        $dirName = $firstChar . $secondChar;
              
        // reduce the diffs down to the nearest 100Km tile (e.g. 'SU') then work out 
        // the 20Km file row and col identifiers. These are named '00' to '88' going E & N.              
        // i.e. they are named as as twice the actual zero-based row/col number 
        // e.g. (zero-based) col 4, row 3 is tile 86
        // e.g. (zero-based) col 2, row 1 is tile 42 etc     
/*
        |--------------|      
        |08 28 48 68 88|   
        |06 26 46 66 86|         
        |04 24 44 64 84| 
        |02 22 42 62 82|           
        |00 20 40 60 80|
        |--------------|
*/        
        $eDiff = fmod($eDiff, 100000);
        $nDiff = fmod($nDiff, 100000);       
        $colName = floor($eDiff / 20000) * 2;
        $rowName = floor($nDiff / 20000) * 2;                            
        $fileName = $dirName . $colName . $rowName . ".ntf";
          
        return $dirName . "/" . $fileName;                                   
    }
       
    /**
    * Read the data file and get a pointer to the first data offset
    * 
    * @param string $fileName
    */
    private function getNTFFilePointer($filePath) {
                       
        // close any previous file pointer
        if ($this->fp) {
            fclose($this->fp);
        }  
        $fullPath = $this->dataDir . "/". $filePath;
        if (!file_exists($fullPath)){
            $this->handleError(__METHOD__ , "the file '$fullPath' does not exist");
        }
        $fp = fopen($fullPath, 'rb');
        if ($fp === false) {
            $this->handleError(__METHOD__ , "could not open the file '$fullPath'");
        } 
                                           
        $this->filePath = $fullPath;   
        $this->fp = $fp;                                    
    }
    
    /**
    * Returns the elevation data at a given zero-based row and column
    * using the current file pointer
    * 
    * @param int $row
    * @param int $col
    */
    private function getData($gridRecOffset, $gridDataOffset) {
        
        // OS NTF constants     
        $DATA_OFFSET = 2850;       // the offset address of the 1st data record in a file             
        $REC_LENGTH = 1829;        // byte length of each data record containing 401 data points
        $LEN_DATA = 4;             // byte length of a single elevation data pont
        $IGNORE_BEFORE = 95;       // header bytes to ignore in a record before the data section
        $NUM_CONTIG_POINTS = 19;   // the number of contigous data points
        $CONTIG_LEN = 76;          // length of contigous data point block ($LEN_DATA * $NUM_CONTIG_POINTS)   
        $DATA_GAP = 6;             // bytes to ignore after every contigous data point block read
        
        /*          
        A data record ('GRIDREC 51' in spec doc) is a block of 1829 bytes.
        It starts with '51' followed by unused header data for 93 bytes followed by 19 blocks of
        contigous 4 byte data points with each block starting with '00' and ending with '1% '  
             
        |00|0031|0045|0066|... |1% |
      
        NB: the '|' is a visual separator to show data breaks, it is NOT in the actual datafile 
        
        There are 21 such blocks, which contain 21 * 19 = 399 data points.   
        
        There is a final data block containing two final data points 
             
        |00|0057|0056|1%  |
        
        where |00| uses 2 bytes and |1%  | uses 4 bytes    
        = 1829 bytes in total containing 401 elevation data points 
        
        There are 401 records in a tile file each holding 401 data points.
        Record 0 corresponds to the SW corner of a tile and holds data for the 1st column
        running S to N to as per diagram
        
        | ..etc
        |3 3 3
        |2 2 2
        |1 1 1   elevation data points
        |0 0 0
        |----------------  
         0 1 2 .. record no
            
        */
        
        // find the location of the required data record 
        $recordOffset = $DATA_OFFSET + ($REC_LENGTH * $gridRecOffset);
                           
        // now work out the required data offset within the data record
        $contigBlocksToJump = floor($gridDataOffset / $NUM_CONTIG_POINTS);
        $remainder =  $gridDataOffset - $contigBlocksToJump * $NUM_CONTIG_POINTS;
        
        $dataOffset = $IGNORE_BEFORE 
                    + ($contigBlocksToJump * ($CONTIG_LEN + $DATA_GAP))
                    + ($LEN_DATA * $remainder);
               
        // combine the two and read the elevation data at that address 
        fseek($this->fp, $recordOffset + $dataOffset);
        $strElevation = fread($this->fp, $LEN_DATA);                  
        $elevation = 0 + $strElevation;       
        return $elevation;
    }

    /**
    * Returns the distance in metres between two locations
    * 
    * @param float $easting1
    * @param float $northing1
    * @param float $easting2
    * @param float $northing2
    * @return float
    */
    private function getDistance($e1, $n1, $e2, $n2){
       
       // Pythagoras for quick'n'dirty distance   
       $dist = sqrt(pow(Abs($e1 - $e2), 2) + pow(Abs($n1 - $n2), 2)) / 1000;
       return $dist;
    }
      
    /**
    * Error handler
    * 
    * @param string $error
    */
    private function handleError($method, $message) {
        
        if ($this->showErrors) { 
            ob_start();
            var_dump($this);
            $dump = ob_get_contents();
            ob_end_clean();        
            die("Died: error in $method: $message <pre>$dump</pre>");
        }
        else {
            die();
        }
    }
}                 
?>