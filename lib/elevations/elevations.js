/* 
Displays maps and elevations
Bob Osola http://www.osola.org.uk
*/

var dataType; // either SRTM or OS

$(document).ready(function(){
    
    var OSpoints = [];
    var SRTMpoints = [];     
    var elevation = 0;    // holds elevation data returned from PHP class
    var interpolate = 0;  
    var lineStyle = {strokeColor: "#FF0000", strokeOpacity: 1, strokeWidth: 2};
	
	SyntaxHighlighter.defaults['gutter'] = false;
	SyntaxHighlighter.all();
    
    // radio button selects either SRTM or OS data source
    dataType = $('input[name=dataType]:radio').val(); 
    $('input[name=dataType]:radio').bind( "click", setDataType ); 
    
    // display map centred on Mount Snowdon      
    var osMap = new OpenSpace.Map('map');  
    var gridProjection = new OpenSpace.GridProjection();
    var lonlat = new OpenLayers.LonLat(-4.076, 53.068);
    var mapPoint = gridProjection.getMapPointFromLonLat(lonlat);                    
    osMap.setCenter(mapPoint, 8);
     
    // get elevation at mouse position                        
    osMap.events.register("mousemove", osMap, getCursorPosition);
   
    // add markers by mouse clicking or tapping a screen
    osMap.events.register("click", osMap, addMarker);
    osMap.events.register("touchend", osMap, addMarker);

    function addMarker(e) {
   
        var markerLayer = osMap.getMarkerLayer(); 
        var vectorLayer = osMap.getVectorLayer();
        
        // reset everything on 3rd click to start the process over again    
        if (OSpoints.length >= 2) {
            $('#E1').html('');
            $('#N1').html(''); 
            OSpoints.length = 0; 
            SRTMpoints.length = 0;
			
			// clear markers
            numMarkers = markerLayer.markers.length;
            for (i = numMarkers; i > 0 ; i--){
                markerLayer.removeMarker(markerLayer.markers[0])
            }
            vectorLayer.destroyFeatures();
        }
       
        // save the 1st mouse click coordinates to an array
        var lonLat = osMap.getLonLatFromViewPortPx(e.xy);
        var point = new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat);
        OSpoints.push(point);  
            
        if (dataType == 'SRTM') {
            // convert OS grid units to lat & lon
            var SRTMlonlat = gridProjection.getLonLatFromMapPoint(lonLat);
            SRTMpoints.push(SRTMlonlat);
        }
      
        // show a marker for each clicked location
        markerLayer.addMarker(new OpenLayers.Marker(lonLat)) 
        
        // display the 1st click coordinates in the table cell
        if (OSpoints.length == 1) { 
            if (dataType == 'SRTM') {
                $('#E0').html(SRTMpoints[0].lon.toFixed(6));
                $('#N0').html(SRTMpoints[0].lat.toFixed(6)); 
            }
            if (dataType == 'OS') {
                $('#E0').html(Math.round(OSpoints[0].x));
                $('#N0').html(Math.round(OSpoints[0].y)); 
            }

        } 
        
        // display the 2nd click coordinates in the table cell                           
        if (OSpoints.length == 2) {
            if (dataType == 'SRTM') {
                $('#E1').html(SRTMpoints[1].lon.toFixed(6));
                $('#N1').html(SRTMpoints[1].lat.toFixed(6)); 
            }
            if (dataType == 'OS') {
                $('#E1').html(Math.round(OSpoints[1].x));
                $('#N1').html(Math.round(OSpoints[1].y)); 
            }
                    
            // draw a line between the two markers          
            var lineString = new OpenLayers.Geometry.LineString(OSpoints);
            var lineFeature = new OpenLayers.Feature.Vector(lineString, null, lineStyle); 
            vectorLayer.addFeatures([lineFeature]);
            
            // set up the parameters to pass to the PHP class which draws the chart
            // - this acts as the 'src' parameter of an <image>
            
            if (dataType == 'SRTM') {
                var imageSrc = "getSRTMChartDemo.php"
                    + "?lat0=" + SRTMpoints[0].lat + "&lon0=" +  SRTMpoints[0].lon 
                    + "&lat1=" + SRTMpoints[1].lat + "&lon1=" +  SRTMpoints[1].lon; 
            }
            
            if (dataType == 'OS') {
                var imageSrc = "getOSChartDemo.php"
                    + "?e0=" + OSpoints[0].x + "&n0=" +  OSpoints[0].y 
                    + "&e1=" + OSpoints[1].x + "&n1=" +  OSpoints[1].y;    
            }  
                                   
            $('#chart').attr('src', imageSrc);
            $('#chart').show();
        }                                
    }

    function getCursorPosition (e) {
                    
        // NB: this next contains map units which are easting & northings for an OS map      
        var point = osMap.getLonLatFromViewPortPx(e.xy);
        
        if (dataType == 'SRTM') {
            // convert OS units to lat & lon
            var lonlat = gridProjection.getLonLatFromMapPoint(point);
            
		    // send lat & long to PHP class to get elevation data
            var ajaxparams = "lat=" + lonlat.lat + "&lon=" +  lonlat.lon   
            $.post("getSRTMElevationDemo.php", ajaxparams, 
                function(returnedData){
                    elevation = returnedData;
                }, 'text');
        }
         
        if (dataType == 'OS') {
		    // send easting & northing to PHP class to get elevation data
            var ajaxparams = "e=" + point.lon + "&n=" +  point.lat;    
            $.post("getOSElevationDemo.php", ajaxparams, 
                function(returnedData){
                    elevation = returnedData;
                }, 'text'); 
         }                                                
                                          
        // display the returned elevation in the table cell
        $('#Elev').html(dataType + ": " + elevation);      
    }
});

function setDataType(){
	// gets value of data selection radio buttom
    dataType = $(this).val();
}

