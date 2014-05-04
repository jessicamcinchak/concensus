// Set up the page
// ---------

var currentLayer;
var map = L.map('map', {
												center: [42.3540, -83.0523],
												zoom: 11,
												layers: []
});

L.tileLayer('http://api.tiles.mapbox.com/v3/rcackerman.h6ofgio1/{z}/{x}/{y}.png', {
            attribution: 'Made pretty by Mapbox'
          }).addTo(map);

// var toggler = L.control.layers().addTo(map);

function style( feature ) {
  return {
    fillColor: '#EA929D',
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
  	style: style,
    onEachFeature: function (feature, layer) {
     layer.bindPopup(feature.properties[options.property]);
   }
  });
  map.addLayer(geolayer, options.name);
  currentLayer = geolayer;
  console.log(+"geolayer"+" "+geolayer);
};

var getData = function( geoURL, options ) {
	var req = $.getJSON( geoURL );
	req.done( function(data) {
		processData(data, options);
	} );
};

var removeData = function() {
  map.removeLayer(currentLayer);
};

// Sidebar
// ---------

$(".radio").click( function() {
  var file = '/data/' + $(this).data("file");
  console.log(file);
  var datasetname = $(this).data("name");
  console.log(datasetname);
  var infoOfImportance = $(this).data("property");

  var alreadyChecked = $(".checked");
  console.log("already checked"+" "+alreadyChecked);
  alreadyChecked.find("input").prop("checked", false);
  alreadyChecked.removeClass("checked");
  if (currentLayer) {
    removeData();
  }

  $(this).addClass("checked");
  $(this).find("input").prop("checked", true);


  getData( file, {name: datasetname, property: infoOfImportance} );
});