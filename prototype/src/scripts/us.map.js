/**
 * US map d3.
 **/ 
var _map;
function USMap(window) {

  // save window ref for map sizing
  this.window = window;

  // data panel margin for map resize
  this.margin = 264;

  // size to window - data panel margin
  this.width = window.innerWidth - this.margin; // 720

  // Note: width/3*2 - approximate usa map size ratio
  this.height = this.width / 3 * 2; // 480 

  // map scale for default 720x480 usa map size
  this.scale = 800;

  // US topology TopoJSON with land, states, and all counties
  this.usTopology = {};

  // simple states Geo JSON data loaded first
  // since we will be loading zips, counties, and districts
  // on state click from us.json and others later 
  this.statesGeoData = [];

  // us population data
  this.usPopulation = []

  // state capitals names and coordinates
  this.stateCapitals = [];

  // state capitals display toggle
  this.showStateCapitals = false;

  // number format for display
  this.numberFormat = d3.format(',');

  // add window resize event handler
  this.window.addEventListener('resize', this.onWindowResize);

  // TODO: get rid of this hack with callbacks later
  _map = this;

  // active region ref. for zoom in/out
  this.active = d3.select(null);

  // add map tooltip div for map regions mouseovers
  this.tooltip = d3.select("body")
		  .append("div")   
    	.attr("class", "tooltip")               
    	.style("opacity", 0);

  // app status message ref
  this.message = d3.select('#message');

  // region name section title ref 
  this.regionTitle = d3.select('#region');

  // region data section ref 
  this.regionData = d3.select('#regionData');

  // create Albers USA map projection
  this.projection = d3.geoAlbersUsa()
    .scale(this.scale)
    .translate([this.width / 2, this.height / 2]); // center

  // create geo path for map projection
  this.geoPath = d3.geoPath()
      .projection(this.projection);

  // create quantize scale for pop data map choropleth
  this.quantize = d3.scaleQuantize()
    .domain([0, 322000000]) // usa pop max for now
    .range( d3.range(9).map( 
      function(i) { return 'q' + i; }
      ));

  // create map tiles layer
  this.tile = d3.tile()
    .size([this.width, this.height]);

  // create map svg
  this.svg = d3.select('#map').append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('click', this.onSvgClick, true);

  // create map bg rect 
  this.svg.append('rect')
      .attr('class', 'background')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('mouseover', function(d) {
        // hide map tooltip on bg rect mouse over
        _map.tooltip.style("opacity", 0)
      })
      .on('click', function (d) {
        // reset to zoom out on map bg rect click
        _map.reset();
      });

  // create map tiles raster layer svg group
  this.raster = this.svg.append('g');

  // create us states map svg group
  this.g = this.svg.append('g');

  // create d3 map zoom behavior
  this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [this.width, this.height]])
      .on('zoom', function() {
        _map.onZoom();
      });

  // add d3 svg map zoom behavior
  this.svg.call(this.zoom);

  // show loading data message
  this.message.text('loading USA map data...');

  // load us data async with d3 queue
  var q = d3.queue();
  q.defer(this.loadUSTopology, this);    
  q.defer(this.loadUSPopulationData, this);  
  q.defer(this.loadStatesGeoData, this);
  // TODO: merge with states geo data ???  
  q.defer(this.loadStateCapitals, this);    
  q.awaitAll( function(error) {
    if (error) {
      console.error(error);
      throw error;
    }
    // draw map
    console.log('USMap::drawing map...');
    //_map.redraw(_map);
  });

} // end of USMap() constructor


/**
 * Loads US topology from ../data/us.json topoJSON file
 * with land, state, and counties boundaries
 * for zoom to state counties data load and graphs display later.
 */
USMap.prototype.loadUSTopology = function(map) {
  console.log('USMap::loadUSTopology::loading ../data/us.json...');

  // load US topology with land, state, and counties boundaries
  d3.json('../data/us.json', function(error, usTopology) {

    if (error) {
      console.error(error);
      // TODO: show error message
      throw error;
    }

    // save it for counties boundaries and data display later
    map.usTopology = usTopology;

    console.log('USMap::loadUSTopology::us.json topology loaded!');
  });
}


/**
 * Loads US population data from ../data/us-population.json.
 */
USMap.prototype.loadUSPopulationData = function(map) {
  console.log('USMap::loadUSPopulationData::loading ../data/us-population.json...');
  d3.json('../data/us-population.json', function(usPopulation) {
    // save us population data
    map.usPopulation = usPopulation;

    // update app message
    map.message.html('USA population: <span class="data-text">' + 
      map.numberFormat(usPopulation.total) + '</span>');

    // update app data panel
    map.regionTitle.text('USA');
    map.regionData.html('population: <span class="data-text">' +
      map.numberFormat( map.usPopulation.total) + '</span>');

    console.log('USMap::loadUSPopulationData::loaded states population data: ' + 
      map.usPopulation.states.length);   
  });
}


/**
 * Loads light 86kb ../data/us-states.json geo data
 * for initial usa map display.
 */
USMap.prototype.loadStatesGeoData = function(map) {
  console.log('USMap::loadStatesGeoData::loading ../data/us-states.json...');
  
  d3.json('../data/us-states.json', function(statesGeoData) {
    map.statesGeoData = statesGeoData.features;
    console.log('USMap::loadStatesGeoData::loaded states geo data: ' + map.statesGeoData.length);   

    // show states
    map.drawStates(map);   
  });
}


/**
 * Loads state capitals data from ../data/us-state-capitals.csv.
 */
USMap.prototype.loadStateCapitals = function(map) {
  console.log('USMap::loadStateCapitals::loading ../data/us-state-capitals.csv...');

  // load state capital names and lat/longs; can append more data :)
  d3.csv('../data/us-state-capitals.csv')
    .row( function(d) { 
      return {state: d.state, capital: d.capital, 
        latitude: +d.latitude, longitude: +d.longitude}; })
    .get( function(error, capitalsData) {
      map.stateCapitals = capitalsData;
      console.log('USMap::loadStateCapitals::loaded state capitals: ' + map.stateCapitals.length);      
  });
}


/**
 * Updates map svg width on window resize.
 */
USMap.prototype.onWindowResize = function() {
  console.log('USMap::onWindowResize:width: ' + this.window.innerWidth);

  // update map containter width
  this.width = this.window.innerWidth;
  // TODO: update constructor and redraw to make this work properly
  drawStates(this);
}


/**
 * Draws US map with interactive states
 * using loaded states geo data.
 */
USMap.prototype.drawStates = function (map){  

  // create states paths
  console.log('USMap::drawStates::creating state paths...');  
  this.g.selectAll('path')
        .data( map.statesGeoData )
        .enter().append('path')
        .attr('d', this.geoPath)
        .attr('class', 'feature')
        .attr('id', function(d) {
          return 'state-' + d.id
        }) /*
        .attr("class", function(d, i) {
          if ( i < map.usPopulation.states.length) {
            return map.quantize( map.getPopulationCount(d.id) );
          }
          return ''; 
        })*/
        .on('mouseover', function(d) {
          // show map tooltip
          map.tooltip.transition()
              .duration(200)      
              .style("opacity", .9);

          // display state name in tooltip
          map.tooltip.html('<img height="18" src="../images/flags/' +
                d.properties.name.split(' ').join('_') + '.svg.png" /> ' + 
                '<span class="state-tooltip">' + d.properties.name + 
                '</span><br /><span class="label">population:</span><span class="data-text">' + 
                map.numberFormat( map.getPopulationCount(d.id) ) + 
                "</span>" 
              )
              .style("left", (d3.event.pageX) + "px")     
              .style("top", (d3.event.pageY - 28) + "px");            
        })
        .on('click', function(d) {
          if (map.active.node() === this) {
            // reset to zoom out on active region click
            return map.reset();
          }
          map.onClick(d, this); // selected region
        });

  // create state labels
  console.log('USMap::drawStates::creating state labels...');
  this.g.selectAll(".state-label")
        .data( map.statesGeoData )
        .enter().append("text")
        .attr("class", function(d) { return "state-label " + d.properties.code; }) // state code
        .attr("transform", function(d) { return "translate(" + map.geoPath.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text( function(d, i) {
          return map.statesGeoData[i].properties.code;
        });

  this.drawStateCapitals(this);

  console.log('USMap::drawStates::state paths and labels added to DOM!');

} // end of redraw ()


/**
 * Draws state capital bubbles.
 */
USMap.prototype.drawStateCapitals = function(map) {
  if (!this.showStateCapitals)
    return;

  console.log('USMap::drawStateCapitals::creating state capitals...');  
  this.g.selectAll('circle')
        .data( map.stateCapitals )
        .enter().append('circle')
        .attr('cx', function (d) { 
          return map.projection( [d.longitude, d.latitude] )[0]; 
        })
        .attr('cy', function (d) { 
          return map.projection( [d.longitude, d.latitude] )[1]; 
        })
        .attr('r', 4)
        .attr('class', 'city')
        .attr('id', function(d) {
          return 'city-' + d.capital
        })
        .on('mouseover', function(d) {
          // show map tooltip
          map.tooltip.transition()
              .duration(200)      
              .style("opacity", .9);

          // display state capital name in tooltip
          map.tooltip.text(d.capital)
              .style("left", (d3.event.pageX) + "px")     
              .style("top", (d3.event.pageY - 28) + "px");  
        }) /*
        .on('click', function(d) {
          if (map.active.node() === this) {
            // reset to zoom out on active region click
            return map.reset();
          }
          map.onClick(d, this); // selected region
        });*/        
} // end of drawStateCapitals()


/**
 * d3 path click event handler.
 */
USMap.prototype.onClick = function (d, region) {

  // toggle active region selection
  this.active.classed('active', false);
  this.active = d3.select(region).classed('active', true);

  // get selected state region id
  var regionId = region.id.replace('state-', '');

  // show state population data for now
  this.regionData.html('population: <span class="data-text">' +
    this.numberFormat( this.getPopulationCount(regionId) ) +
    '</span>');

  // update region data panel
  this.regionTitle.text(d.properties.name);

  // get selected region bounds
  var bounds = this.geoPath.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2;

  // calculate new viewport scale based on region bounds
  var scale = Math.max(1, 
    Math.min(8, 0.9 / Math.max(dx / this.width, dy / this.height)));

  // determine translate coordinates for zoom
  var translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

  // zoom in
  // transform states group for zoom
  this.scaleSvg(scale);
  this.transform(translate, scale);

  /*this.svg.transition()
      .duration(750)
      .call(this.zoom.translate(translate).scale(scale).event);*/
}


/**
 * Gets population count for the specified state.
 */
USMap.prototype.getPopulationCount = function(stateId) {
  var stateIndex = Number(stateId);
  if ( stateIndex < this.usPopulation.states.length) {
    try {
      return this.usPopulation.states[stateId][0];
    } catch (error) {
      // TODO: need to look into this occasioanl 'unable to get property '0'' error
      console.error(error);
      console.log('getPopulationCount::stateIndex: ' + stateIndex);
      return 0;
    }
  }
  return 0;
} 


/**
 * Resets active map feature and zooms out.
 */
USMap.prototype.reset = function() {

  console.log('reset');

  // clear active region selection
  this.active.classed('active', false);
  this.active = d3.select(null);

  // reset state labels font size
  this.g.selectAll(".state-label")
        .style('font-size', '12px');

  // update app data panel
  this.regionTitle.text('USA');
  this.regionData.html('population: <span class="data-text">' +
      this.numberFormat( this.usPopulation.total) + '</span>');

  // zoom out
  this.svg.transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
}


/**
 * Map zoom behaviour event handler.
 */
USMap.prototype.onZoom = function() {

  // get zoom transform vars
  var transform = d3.event.transform;

  // scale svg strokes and labels  
  this.scaleSvg(transform.k);

  // transform states group for zoom
  this.transform([transform.x, transform.y], transform.k); // scale

  // load map tiles
  //this.loadTiles(transform);
}


/**
 * Scales region paths stroke width and labels on zoom in/out.
 */
USMap.prototype.scaleSvg = function(zoomLevel) {
  // scale regions group stoke width on zoom
  this.g.style('stroke-width', 1.5 / zoomLevel + 'px');

  // scale city bubbles
  this.g.selectAll(".city")
        .attr('r', 4 / zoomLevel + 'px');

  // scale state labels font size
  this.g.selectAll(".state-label")
        .style('font-size', 12 / zoomLevel + 'px');

  if (zoomLevel > 3) {
    // show state names
    this.g.selectAll(".state-label")
        .data( this.statesGeoData )
        .text( function(d, i) {
          return d.properties.name;
        });    
  } else {
    // show state abbreviations
    var map = this; 
    this.g.selectAll(".state-label")
        .data( this.statesGeoData )
        .text( function(d, i) {
          return d.properties.code;
        });    
  }
}


/**
 * Transforms map geometry to the specified 
 * transform x,y and scale.
 */
USMap.prototype.transform = function(transform, scale) {
  // transform states group for zoom
  this.g.attr('transform', 
    'translate(' + transform[0] + ',' + transform[1] + ')scale(' + scale + ')');  
}



/**
 * Loads map tiles on zoom.
 */
USMap.prototype.loadTiles = function(transform) {
  var tiles = this.tile
      .scale(transform.k)
      .translate([transform.x, transform.y])
      ();

  var image = this.raster.attr("transform", 
      this.getTilesTransform(tiles.scale, tiles.translate))
    .selectAll("image")
    .data(tiles, function(d) { return d; });

  image.exit().remove();

  image.enter().append("image")
      .attr("xlink:href", function(d) { 
        return "http://" + "abc"[d[1] % 3] + ".tile.openstreetmap.org/" + 
          d[2] + "/" + d[0] + "/" + d[1] + ".png"; 
      })
      .attr("x", function(d) { return d[0] * 256; })
      .attr("y", function(d) { return d[1] * 256; })
      .attr("width", 256)
      .attr("height", 256);
}


/**
 * Gets tiles layer transform.
 */
USMap.prototype.getTilesTransform = function(scale, translate) {
  var k = scale / 256;
  var r = scale % 1 ? Number : Math.round;
  return "translate(" + r(translate[0] * scale) + "," + 
    r(translate[1] * scale) + ") scale(" + k + ")";
}


/**
 * Svg click stop handler for smooth dragging.
 */
USMap.prototype.onSvgClick = function() {
  // If the drag behavior prevents the default click,
  // also stop propagation so we don’t click-to-zoom  
  if (d3.event.defaultPrevented) {
    d3.event.stopPropagation();
  }
}

