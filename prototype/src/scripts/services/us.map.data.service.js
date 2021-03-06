/**
 * US map geo data service.
 * 
 * TODO: some data can be lazy loaded later.
 **/ 
function USMapDataService() {
  console.log('USMapDataService::created');
}


/*-------------------------- USA Geo Data Methods --------------------------------------*/

/**
 * Gets 642Kb USA topology from ../data/us.json topoJSON file
 * with land, state, and counties boundaries
 * for zoom to state counties map display on state click.
 */
USMapDataService.prototype.getUSTopology = function(onDataReady, map) {

  // load US topology with land, state, and counties boundaries
  console.log('USMapDataService::getUSTopology::loading ../data/us.json...');
  d3.json('../data/us.json', function(error, usTopology) {
    if (error) {
      console.error(error);
      throw error;
    }
    // update map comp.
    onDataReady(usTopology, map);
  });
}


/**---------------------- USA States Geo Data Methods ----------------------------------*/

/**
 * Gets light 91Kb ../data/us-states-geo.json geo data
 * for initial USA states map display.
 */
USMapDataService.prototype.getStatesGeoData = function(onDataReady, map) {
  console.log('USMapDataService::getStatesGeoData::loading ../data/us-states-geo.json...');  
  d3.json('../data/us-states-geo.json', function(statesGeoData) {
    console.log('USMapDataService::getStatesGeoData::loaded states geo data: ' + 
      statesGeoData.features.length);   
    // update map comp.
    onDataReady(statesGeoData.features, map);
  });
}



/**
 * Gets state capitals data from ../data/us-state-capitals.csv.
 */
USMapDataService.prototype.getStateCapitals = function(onDataReady, map) {
  // load state capital names and lat/longs; can append more data :)
  console.log('USMapDataService::getStateCapitals::loading ../data/us-state-capitals.csv...');  
  d3.csv('../data/us-state-capitals.csv')
    .row( function(d) { 
      return {state: d.state, capital: d.capital, 
        latitude: +d.latitude, longitude: +d.longitude}; }) // + to convert to numbers :)
    .get( function(error, capitalsData) {
      onDataReady(capitalsData, map);
  });
}


/**-------------------- USA Counties Geo Data Methods -------------------------------- */

/**
 * Gets USA counties FIPS codes and names from ../data/us-counties.json file
 * for zoom to state counties data load and graphs display later.
 */
USMapDataService.prototype.getUSCounties = function(usTopology, onDataReady, map) {

  // load US counties data
  console.log('USMapDataService::getUSACounties::loading ../data/us-counties.json...');
  d3.json('../data/us-counties.json', function(error, usCounties) {
    if (error) {
      console.error(error);
      throw error;
    }
    //console.log(usCounties);
    var state, lastState = '';
    var stateCounties = {};
    var stateCounty;
    var countyCount = 0;
    for (var countyId in usCounties) {
      // get county state
      state = usCounties[countyId].state
      if (state !== lastState) {
        lastState = state;
        // create new state counties data map and 
        // add topology for state counties topojson load later
        stateCounties[state] = {
          counties: {}, 
          topology: {
            type: 'GeometryCollection',
            // copy bounding box from us counties topojson
            bbox: usTopology.objects.counties.bbox,
            geometries: []
          }
        };
        //console.log('USMapDataService::getUSCounties::adding counties for state: ' + state);
      }
      // set county id and add it to the state counties collection
      usCounties[countyId].id = countyId;
      stateCounties[state].counties[Number(countyId)] = usCounties[countyId]; 
      countyCount++;
    }

    console.log('USMapDataService::getUSACounties::loaded counties: ' + countyCount);
    console.log('USMapDataService::getUSACounties::loaded county states: ' + 
      Object.keys(stateCounties).length );
    //console.log(stateCounties);

    // update map comp.
    onDataReady(stateCounties, map);
  });
} // end of getUSCounties()



/**
 * Gets state counties topology from usTopology
 * for plotting state counties paths on state click.
 */
USMapDataService.prototype.getStateCountiesTopology = 
  function(usTopology, stateCounties, stateCode) {
  if (stateCounties[stateCode].topology.geometries.length > 0) {
    // state counties topology already loaded
    return stateCounties[stateCode].topology;
  }

  // create state counties geometry collection
  var countyKeys = Object.keys(stateCounties[stateCode].counties);
  console.log('USMapDataService::getStateCountiesTopology::getting ' + stateCode +
    ' counties topology...'); // for: ' + countyKeys);
  //console.log(stateCounties[stateCode].counties);  
  //console.log(usTopology.objects.counties.geometries);

  // lazy load state counties geometries from us topology geo data
  var county;
  var countyGeo;  
  var countiesGeo = usTopology.objects.counties.geometries; 
  for (var i=0; i < countiesGeo.length; i++) {
    // get county geo data
    countyGeo = countiesGeo[i];
    //console.log(countyGeo.id);

    // look up county info
    county = stateCounties[stateCode].counties[countyGeo.id]; 
    if (county !== null && county !== undefined) {
      // set county geo data properties for tooltip display
      countyGeo.properties = county;
      // add it to the state counties topology geometries
      stateCounties[stateCode].topology.geometries.push(countyGeo); 
      //console.log(countyGeo);
    }
  }

  console.log('USMapDataService::getStateCountiesTopology::got', 
    stateCode, stateCounties[stateCode].topology.geometries.length,
    'counties topology!');
  //console.log(stateCounties[stateCode].topology);

  return stateCounties[stateCode].topology;
}
