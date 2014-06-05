// Set up the page
// ---------

var currentLayer;
var currentData;
var currentFileName;

var input = { 
    "pink": ["#F9E6E0","#F5D3C9","#ECA793", "#E37B5D", "#DA5027"],
    "yellow": ['#FFF5E5','#FFE3B2','#FFD17F','#FFBF4C','#FFA400'],
    "darkBlue": ['#FFFFFF','#C7D9E2','#90B4C5','#588FA8','#216A8B'],
    "lightBlue": ['#FFFFFF','#D8E4F3','#B2CAE7','#8BB0DB','#6596CF'],
    "lightGreen": ['#FFFFFF','#E1EBCE', '#C3D79E','#A5C36E','#87AF3E'],
    "darkGreen": ['#FFFFFF', '#C7D5CA','#8FAC95','#578260','#20592C']
}

console.log(input);
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

    $('.circle').click(function (evt) {
      console.log("in circle");
      $( "#circle_table" ).css('display','block');

    });

     $('.rectangle').click(function (evt) {
      console.log("in circle");
      $( "#square_table" ).css('display','block');
      
    });

  function changeColorGradient(colorGradArr)
  {
       $( ".gradient1" ).css('background-color',colorGradArr[0]);
       $( ".gradient2" ).css('background-color',colorGradArr[1]);
       $( ".gradient3" ).css('background-color',colorGradArr[2]);
       $( ".gradient4" ).css('background-color',colorGradArr[3]);
       $( ".gradient5" ).css('background-color',colorGradArr[4]);
  }


function style( feature) {
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
var min=100;
  L.geoJson(features, {
    style: function(feature)
    {
      return newStyle;
    }
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
///////////////////////////////////////////////////////////////
    $(".pinkSquare").click(function() { 

      var colorGradientArr=input.pink;
     changeColorGradient(colorGradientArr);
     rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
  
  });

 $(".yellowSquare").click(function() {  
    
     var colorGradientArr=input.yellow;
     changeColorGradient(colorGradientArr);
     rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
  
  });

 $(".darkBlueSquare").click(function() {  
  
   var colorGradientArr=input.darkBlue;
   changeColorGradient(colorGradientArr);
   rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
 
  });

  $(".lightBlueSquare").click(function() {  
   
   var colorGradientArr=input.lightBlue;
   changeColorGradient(colorGradientArr);
   rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
  

  });

   $(".lightGreenSquare").click(function() {  
   
   var colorGradientArr=input.lightGreen;
   changeColorGradient(colorGradientArr);
   rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
  

  });

   $(".darkGreenSquare ").click(function() { 
   
   var colorGradientArr=input.darkGreen;
   changeColorGradient(colorGradientArr);
   rulesForFilesPopUp(currentFileName,currentData,colorGradientArr);
  

  });


var processLineData=function(data)
{

var features=data['features'];

  L.geoJson(features, {
    style: style
      
    }).addTo(map);

  currentData=data;
  //currentLayer = geolayer;

}


var getData = function( geoURL, options,fileName ) {
  var req = $.getJSON( geoURL );

  req.done( function(data) {

    rulesForFiles(fileName,data);
    //processData(data, options);
    //rulesForFiles(fileName,data);

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

var sortNum=function(arrayOfNum)
{
  var max=0;
  var min=arrayOfNum[0];
  var resultArr=new Array();
  for(var i=0;i<arrayOfNum.length;i++)
  {
    var currentNum=arrayOfNum[i]
    if(currentNum<min)
    {
      min=currentNum
    }
    else if(currentNum>max)
    {
      max=currentNum;
    }
  }
  resultArr.push(min);
  resultArr.push(max);
  return resultArr;
}

var getValueRange=function(numRangeArr)
{
  var min=numRangeArr[0];
  var max=numRangeArr[1];
  var rangeNum=max-min;
  return rangeNum;
}

var getSectionNum=function(rangeNum)
{
  var sectionNum=rangeNum/5;
  return sectionNum;
}


var rulesForFiles=function(fileName,data)
{
  //processLineData
  if(fileName=='employment_labor_Total_LaborForce.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;
    
    var features= data['features'];
    var mainMappingData='Total_LaborForce';
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);
  }
  else if(fileName=='employment_labor_Total_Unemployed.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;
    var features= data['features'];

    var mainMappingData='Total_Unemployed';
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);
  }
  else if(fileName=='minority_family _Total_HH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;
    
    var features= data['features'];
    var mainMappingData='Tot_HH';
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);
  }
  else if(fileName=='minority_family_Total_MinHH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;

    var mainMappingData='Tot_MinHH';
    var features= data['features'];
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);

  }
   else if(fileName=='Housing_Tenure_OccHH_FreeandClear.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';

    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;

    var mainMappingData='OwnOccHU_FreeandClear';
    var features= data['features'];
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);

  }
   else if(fileName=='Housing_Tenure_RenterOccHH.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;

    //RenterOccHH
    var mainMappingData='RenterOccHU';
    var features= data['features'];
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);

  }
   else if(fileName=='median_family.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;

    var mainMappingData='MedHHInc_2011Adj';
    var features= data['features'];
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr);
  }
  else if(fileName=='census_track.geojson')
  {
    processLineData(data);
  }
  else if(fileName=='council_district.geojson')
  {
    processLineData(data);
  }
  else if(fileName=='grocery_stores.geojson')
  {
    processLineData(data);
  }
  else if(fileName=='grocery_stores.geojson')
  {
    processLineData(data);
  }

};


var rulesForFilesPopUp=function(fileName,data,colorGradientArr)
{
  //processLineData
    if(fileName=='employment_labor_Total_LaborForce.geojson')
    {

      var features= data['features'];
      var mainMappingData='Total_LaborForce';
      gradientValues(mainMappingData,features,colorGradientArr);
    }
    else if(fileName=='employment_labor_Total_Unemployed.geojson')
    {
      var features= data['features'];
      var mainMappingData='Total_Unemployed';
      gradientValues(mainMappingData,features,colorGradientArr);
    }
    else if(fileName=='minority_family _Total_HH.geojson')
    {
      var features= data['features'];
      var mainMappingData='Tot_HH';
      gradientValues(mainMappingData,features,colorGradientArr);
    }
    else if(fileName=='minority_family_Total_MinHH.geojson')
    {
      var mainMappingData='Tot_MinHH';
      var features= data['features'];
      gradientValues(mainMappingData,features,colorGradientArr);
    }
     else if(fileName=='Housing_Tenure_OccHH_FreeandClear.geojson')
    {
      var mainMappingData='OwnOccHU_FreeandClear';
      var features= data['features'];
      gradientValues(mainMappingData,features,colorGradientArr);

    }
     else if(fileName=='Housing_Tenure_RenterOccHH.geojson')
    {
      var mainMappingData='RenterOccHU';
      var features= data['features'];
      gradientValues(mainMappingData,features,colorGradientArr);
    }
     else if(fileName=='median_family.geojson')
    {
      var mainMappingData='MedHHInc_2011Adj';
      var features= data['features'];
      gradientValues(mainMappingData,features,colorGradientArr);
    }
}




var gradientValues=function(mainMappingData,features,colorGradientArr)
{
   var valueArr=new Array();


    for (var i = 0; i < features.length ;i++) {
        var prop=features[i].properties[mainMappingData];
        if(prop!=null)
        valueArr.push(prop);
        //console.log(prop);
      }
      var numRangeArr=sortNum(valueArr);
      console.log(numRangeArr);

      var rangeNum=getValueRange(numRangeArr);

      var sectionNum=getSectionNum(rangeNum);

      var min=numRangeArr[0];
      var max=numRangeArr[1];
      //$("#minimum").text(min);
     // $("#maximum").text(max);

    L.geoJson(features, {
    style: function(feature)
    {
      var color;
        var prop=feature.properties[mainMappingData];
        if(prop>=min && prop<sectionNum)
        {
            console.log("section 1"+" "+prop);
            color=colorGradientArr[0];
        }
        if(prop>=sectionNum && prop<(sectionNum*2))
        {
            console.log("section 2"+" "+prop);
            color=colorGradientArr[1];
        }
        if(prop>=(sectionNum*2) && prop<(sectionNum*3))
        {
            console.log("section 3"+" "+prop);
            color=colorGradientArr[2];
        }
        if(prop>=(sectionNum*3) && prop<(sectionNum*4))
        {
            console.log("section 4"+" "+prop);
            color=colorGradientArr[3];
        }
        if(prop>=(sectionNum*4) && prop<=max)
        {
            console.log("section 5"+" "+prop);
            color=colorGradientArr[4];
        }

      var newStyle = {
          "fillColor": color,
          "weight": 2,
          "opacity": 1,
          "color": 'white',
          "dashArray": '3',
          "fillOpacity": 0.7
         };
      
      return newStyle;
    }
    
    }).addTo(map);
  
  currentData=data;

}





// Sidebar
// ---------

$(".radio").click( function() {

 //$( "#table_dialog" ).dialog( "open" );
 $( "#table_dialog" ).css('display','block');

  var fileName=$(this).data("file");
  currentFileName=fileName;

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



