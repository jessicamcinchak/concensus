// Set up the page
// ---------

var map = L.map('map', {
												center: [42.3540, -83.0523],
												zoom: 11,
												layers: []
});

L.tileLayer('http://api.tiles.mapbox.com/v3/rcackerman.h6ofgio1/{z}/{x}/{y}.png', {
            attribution: 'Made pretty by Mapbox'
          }).addTo(map);

var toggler = L.control.layers().addTo(map);

function style( feature ) {
  return {
    fillColor: '#BF6FA0',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

// Sidebar
// ---------

// TODO
// data-attribute: name of file
// call getData


// Data Getting
// ---------

var processData = function( data, options ) {
	console.log("callback");
  var geolayer = L.geoJson(data, {
  	style: style
  });
  toggler.addBaseLayer(geolayer, options.name);
};

var getData = function( geoURL, options ) {
	console.log(geoURL);
	var req = $.getJSON( geoURL );
	req.done( function(data) {
		processData(data, options);
	} );
};

// Data sources

// Right now the data sources are hardcoded, since there are only 4
// TODO: - add data sources dynamically as users select layers
console.log("Starting data...");


getData("/data/DetroitBG_qgis.geojson", {name: "Block Group"});


// L.control.layers({
// 		"Block Groups": getData("/data/DetroitBG_qgis.geojson"),
// 		"Tracts": getData("/data/DetroitTract2010.geojson")
// 	},
// 	{}).addTo(map);