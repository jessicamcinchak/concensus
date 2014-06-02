// Set up the page
// ---------

var currentLayer;
var currentData;
var map = L.map('map', {
                        center: [42.3540, -83.0523],
                        zoom: 11,
                        layers: []
                        }
                );

var baseMap=L.tileLayer('http://api.tiles.mapbox.com/v3/rcackerman.h6ofgio1/{z}/{x}/{y}.png', {
            attribution: 'Made pretty by Mapbox'
          }).addTo(map);

var accordion_d3=$(".accordion_d3" ).accordion();

var accordion_user=$(".accordion_user" ).accordion();

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
      $( "#dialog1" ).dialog( "open" )
      .position({
       my: 'left',
       at: 'right',
       of: '#dialog'
      });
    });


function style( feature ) {
  return {
    fillColor: '#000000',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

var resetColor=function(newColor)
{
  var newStyle = {
    "fillColor": newColor,
    "weight": 2,
    "opacity": 1,
    "color": 'white',
    "dashArray": '3',
    "fillOpacity": 0.7
  }

var features=currentData['features'];

  L.geoJson(features, {
    style: newStyle
  }).addTo(map);
}

 $(".rectangle1").click(function() {  
   resetColor('#da5027');
  });

 $(".rectangle2").click(function() {  
   resetColor('#f6a91c');
  });

 $(".rectangle3").click(function() {  
   resetColor('#216a8b');
  });

  $(".rectangle4").click(function() {  
   resetColor('#6596cf');
  });

   $(".rectangle5").click(function() {  
   resetColor('#87af3e');
  });

   $(".rectangle6").click(function() { 
   resetColor('#20592c');
  });


var processData = function( data, options ) {
  var geolayer = L.geoJson(data, {
    style: style,
    onEachFeature: function (feature, layer) {
     layer.bindPopup(feature.properties[options.property]);
   }
  });

  
  map.addLayer(geolayer, options.name);

//Global Variables
  currentData=data;
  currentLayer = geolayer;
};

var getData = function( geoURL, options,fileName ) {
  var req = $.getJSON( geoURL );

  req.done( function(data) {

    if(fileName=='median_family.geojson')
  {
    var newFeatures=queryData(data, 'City', 'Detroit');
    data['features']=newFeatures;
  }
    processData(data, options);
  } );
};

var removeData = function() {
  map.removeLayer(currentLayer);
};

var queryData=function(data, property, selectingProperty){
  var features=data['features'];
  var newFeatures=new Array();
    for (var i = 0; i < features.length ;i++) {
        var prop=features[i].properties[property]
        if(prop==selectingProperty)
        {
          newFeatures.push(features[i]);
        }
    }

    return newFeatures;
};



// Sidebar
// ---------

$(".radio").click( function() {

 $( "#dialog" ).dialog( "open" );

  var fileName=$(this).data("file");
  var file = '/data/' + fileName;
  var datasetname = $(this).data("name");
  var infoOfImportance = $(this).data("property");
  var alreadyChecked = $(".checked");
  alreadyChecked.find("input").prop("checked", false);
  alreadyChecked.removeClass("checked");
 
  if (currentLayer) {
    removeData();
  }

  $(this).addClass("checked");
  $(this).find("input").prop("checked", true);

  getData( file, {name: datasetname, property: infoOfImportance},fileName );
});



