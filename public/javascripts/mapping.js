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

 $( "#table_dialog" ).dialog({
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

$( "#square_table" ).dialog({
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

$( "#circle_table" ).dialog({
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

    $('.circle').click(function (evt) {
      
     $( "#circle_table" ).dialog( "open" )
      .position({
       my: 'left',
       at: 'right',
       of: '#table_dialog'
      });

    });

     $('.rectangle').click(function (evt) {
      
      $( "#square_table" ).dialog( "open" )
      .position({
       my: 'left',
       at: 'right',
       of: '#table_dialog'
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

 $(".pinkCircle").click(function() {  
   resetColor('#da5027');
  });

 $(".yellowCircle").click(function() {  
   resetColor('#f6a91c');
  });

 $(".darkBlueCircle").click(function() {  
   resetColor('#216a8b');
  });

  $(".lightBlueCircle").click(function() {  
   resetColor('#6596cf');
  });

   $(".lightGreenCircle").click(function() {  
   resetColor('#87af3e');
  });

   $(".darkGreenCircle").click(function() { 
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

    rulesForFiles(fileName,data);
    processData(data, options);

  });
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

var rulesForFiles=function(fileName,data)
{
  if(fileName=='employment_labor_Total_LaborForce.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
  else if(fileName=='employment_labor_Total_Unemployed.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
  else if(fileName=='minority_family _Total_HH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
  else if(fileName=='minority_family_Total_MinHH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
   else if(fileName=='Housing_Tenure_OccHH_FreeandClear.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
   else if(fileName=='Housing_Tenure_RenterOccHH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
   else if(fileName=='Housing_Tenure_RenterOccHH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }
   else if(fileName=='median_family.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;

  }

};

// Sidebar
// ---------

$(".radio").click( function() {

 $( "#table_dialog" ).dialog( "open" );

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



