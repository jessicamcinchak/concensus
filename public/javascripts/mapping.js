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

//$("#accordion_d3" ).accordion();
var accordion_d3=$(".accordion_d3" ).accordion();
//.parent().find(".ui-accordion-header").css({'background-color':'#e4eef3'});
console.log(accordion_d3);

var accordion_user=$(".accordion_user" ).accordion();
//.parent().find(".ui-accordion-header").css({'background-color':'#dde9c3'});
console.log(accordion_user);

 $( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      },
      position: { 
        my: "top", 
        at: "left", 
        of: window } 

});

$( "#dialog1" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

    $('#dialog').click(function (evt) {
      console.log("in begin");
      $( "#dialog1" ).dialog( "open" )
      .position({
       my: 'left',
       at: 'right',
       of: '#dialog'
      });
    });




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
};

var getData = function( geoURL, options ) {
  var req = $.getJSON( geoURL );
  req.done( function(data) {
    console.log(data);
    processData(data, options);
  } );
};

var removeData = function() {
  map.removeLayer(currentLayer);
};

// Sidebar
// ---------

$(".radio").click( function() {

 $( "#dialog" ).dialog( "open" );

  var file = '/data/' + $(this).data("file");
  var datasetname = $(this).data("name");
  var infoOfImportance = $(this).data("property");
  var alreadyChecked = $(".checked");
  console.log(alreadyChecked.find("input"));
  alreadyChecked.find("input").prop("checked", false);
  alreadyChecked.removeClass("checked");
 
  if (currentLayer) {
    removeData();
  }

  $(this).addClass("checked");
  $(this).find("input").prop("checked", true);

  getData( file, {name: datasetname, property: infoOfImportance} );
});