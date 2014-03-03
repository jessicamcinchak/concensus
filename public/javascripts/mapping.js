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


// Data Getting
// ---------

var processData = function( data, options ) {
  var geolayer = L.geoJson(data, {
  	style: style
  });
  map.addLayer(geolayer, options.name);
};

var getData = function( geoURL, options ) {
	console.log(geoURL);
	var req = $.getJSON( geoURL );
	req.done( function(data) {
		processData(data, options);
	} );
};

// Sidebar
// ---------

// TODO
// id: name of file
$(".radio").click( function() {
  var file = '/data/' + $(this).data("file");
  var datasetname = $(this).data("name");

  getData( file, {name: datasetname} );
});