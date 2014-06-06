// Set up the page
// ---------

var currentLayer;
var currentData;
var currentFileName;
var radioLayerInput=new Array();
var shape="shape";
var line="line";
var point="point";

var dataPriortyRecorder={
  shape:0,
  line:0,
  point:0
}

var dataPriorityChecker=function(fileName)
{
  var thisFileType=fileType[fileName];
  var canAdd=false;
  var numOfShape=dataPriortyRecorder[shape];
  var numOfLine=dataPriortyRecorder[line];
  var numOfPoint=dataPriortyRecorder[point];
  if(thisFileType==shape)
  {
    if(numOfShape>0)
    {
      canAdd=false;
      return canAdd;
    }

  }
  else if(thisFileType==line)
  {
    if(numOfLine>0)
    {
      canAdd=false;
      return canAdd;
    }

  }
  else if(thisFileType==point)
  {
    if(numOfPoint>3)
    {
      canAdd=false;
      return canAdd;
    }
  }
  canAdd=true;
  return canAdd;

}

var changeDataPriortyRecorder=function(fileName,checked)
{
  var thisFileType=fileType[fileName];
  console.log("in change"+" "+thisFileType);
  console.log("in change"+" "+checked);
  if(checked==true)
  {
    if(dataPriortyRecorder[thisFileType]>=0)
    {
       console.log("in change"+" "+"--");
       dataPriortyRecorder[thisFileType]--;
    }
  }
  else if(checked==false)
  {
      console.log("in change"+" "+"++");
      dataPriortyRecorder[thisFileType]++;
    
  }
}



var input = { 
    "pink": ["#F9E6E0","#F5D3C9","#ECA793", "#E37B5D", "#DA5027"],
    "yellow": ['#FFF5E5','#FFE3B2','#FFD17F','#FFBF4C','#FFA400'],
    "darkBlue": ['#DFE9EE','#C7D9E2','#90B4C5','#588FA8','#216A8B'],
    "lightBlue": ['#EBF1F9','#D3E1F1','#B2CAE7','#8BB0DB','#6596CF'],
    "lightGreen": ['#F0F5E6','#DCE8C7','#C3D79E','#A5C36E','#87AF3E'],
    "darkGreen": ['#E3EAE4','#BFCFC2','#8FAC95','#578260','#20592C']
}

var fileType={
  "census_track.geojson":"line",
  "council_district.geojson":"line",
  "employment_labor_Total_Unemployed.geojson":"shape",
  "employment_labor_Total_LaborForce.geojson":"shape",
  "grocery_stores.geojson":"point",
  "Housing_Tenure_OccHH_FreeandClear.geojson":"shape",
  "Housing_Tenure_RenterOccHH.geojson":"shape",
  "median_family.geojson":"shape",
  "minority_family_Total_HH.geojson":"shape",
  "minority_family_Total_MinHH.geojson":"shape",
  "parks_landmark.geojson":"point",
  "zipcodes.geojson":"line"
}

var squareFileQueryParameter={

  "employment_labor_Total_Unemployed.geojson":"Total_Unemployed",
  "employment_labor_Total_LaborForce.geojson":"Total_LaborForce",
  "Housing_Tenure_OccHH_FreeandClear.geojson":"OwnOccHU_FreeandClear",
  "Housing_Tenure_RenterOccHH.geojson":"RenterOccHU",
  "median_family.geojson":"MedHHInc_2011Adj",
  "minority_family_Total_HH.geojson":"Tot_HH",
  "minority_family_Total_MinHH.geojson":"Tot_MinHH",
}



var map = L.map('map', {
                        center: [42.3540, -83.0523],
                        zoom: 11,
                        layers: []
                        }
                );

var layerArray=new Array();

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
    fillColor:"#000000",
    weight: 2,
    opacity: 1,
    color: 'red',
    dashArray: '3',
    fillOpacity: 0
  };
}



var resetLineColor=function(newColor)
{
  var newStyle = {
    "weight": 2,
    "opacity": 1,
    "color": newColor,
    "dashArray": '3',
    "fillOpacity": 0
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
  var color='#da5027';
   rulesForLinePopUp(color,currentFileName);
  });

 $(".yellowCircle").click(function() {  
   var color='#f6a91c';
   rulesForLinePopUp(color,currentFileName);
  });

 $(".darkBlueCircle").click(function() {  
   var color='#216a8b';
   rulesForLinePopUp(color,currentFileName);
  });

  $(".lightBlueCircle").click(function() {  
    var color='#6596cf';
   rulesForLinePopUp(color,currentFileName);
  });

   $(".lightGreenCircle").click(function() {  
   var color='#87af3e';
   rulesForLinePopUp(color,currentFileName);
  });

   $(".darkGreenCircle").click(function() { 
   var color='#20592c';
   rulesForLinePopUp(color,currentFileName);
  });
///////////////////////////////////////////////////////////////
    $(".pinkSquare").click(function() { 

      var colorGradientArr=input.pink;
     changeColorGradient(colorGradientArr);
     rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
  
  });

 $(".yellowSquare").click(function() {  
    
     var colorGradientArr=input.yellow;
     changeColorGradient(colorGradientArr);
     rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
  
  });

 $(".darkBlueSquare").click(function() {  
  
   var colorGradientArr=input.darkBlue;
   changeColorGradient(colorGradientArr);
   rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
 
  });

  $(".lightBlueSquare").click(function() {  
   
   var colorGradientArr=input.lightBlue;
   changeColorGradient(colorGradientArr);
   rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
  });

   $(".lightGreenSquare").click(function() {  
   
   var colorGradientArr=input.lightGreen;
   changeColorGradient(colorGradientArr);
   rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
  

  });

   $(".darkGreenSquare ").click(function() { 
   
   var colorGradientArr=input.darkGreen;
   changeColorGradient(colorGradientArr);
   rulesForSquarePopUp(currentFileName,currentData,colorGradientArr);
  });


var processLineData=function(data)
{

var features=data['features'];

  var layer=L.geoJson(features, {
    style: style
      
    }).addTo(map);

layerArray.push(layer);
  currentData=data;
  //currentLayer = geolayer;

}

var processPointData=function(data)
{

var features=data['features'];
var color=input.yellow[4];
var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#ff7800",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var layer=L.geoJson(features, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
layerArray.push(layer);

}

var getData = function( geoURL, options,fileName ) {
  console.log(layerArray.length);


  var req = $.getJSON( geoURL );

  req.done( function(data) {

    rulesForFiles(fileName,data);
  });
};

var removeData = function(layer) {
  map.removeLayer(layer);
};

var clearAllLayers=function()
{
  for (var i=0;i<layerArray.length;i++)
  {
    var layer=layerArray[i];
    removeData(layer);
  }
}


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
  if(fileType[fileName]==shape)
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;
    
    var features= data['features'];
    var mainMappingData=squareFileQueryParameter[fileName];
    var colorGradientArr=input.lightBlue;
    gradientValues(mainMappingData,features,colorGradientArr); 
  }
  else if(fileName=='census_track.geojson')
  {
    var property='City';
    var selectingProperty='Detroit';
    var newFeatures=queryData(data, property, selectingProperty);
    data['features']=newFeatures;
    currentData=data;
    processLineData(data);
  }
  else if(fileType[fileName]==line  && fileType[fileName]!='census_track.geojson')
  {
    processLineData(data);
  }
  else if(fileType[fileName]==point)
  {
    processPointData(data);
  }
  
};


var rulesForSquarePopUp=function(fileName,data,colorGradientArr,type)
{
      if(fileType[fileName]==shape){
      var features= data['features'];
      var mainMappingData=squareFileQueryParameter[fileName];
      gradientValues(mainMappingData,features,colorGradientArr);
    }
}
var rulesForLinePopUp=function(color,fileName)
{
  if(fileType[fileName]==line){
      resetLineColor(color);
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

    var layer=L.geoJson(features, {
    style: function(feature)
    {
      var color;
        var prop=feature.properties[mainMappingData];
        if(prop>=min && prop<sectionNum)
        {
            color=colorGradientArr[0];
        }
        if(prop>=sectionNum && prop<(sectionNum*2))
        {
            color=colorGradientArr[1];
        }
        if(prop>=(sectionNum*2) && prop<(sectionNum*3))
        {
            color=colorGradientArr[2];
        }
        if(prop>=(sectionNum*3) && prop<(sectionNum*4))
        {
            color=colorGradientArr[3];
        }
        if(prop>=(sectionNum*4) && prop<=max)
        {
            color=colorGradientArr[4];
        }

      var newStyle = {
          "fillColor":color,
          "weight": 2,
          "opacity": 1,
          "color": "#ffffff",
          "dashArray": '3',
          "fillOpacity": 0.7
         };
      
      return newStyle;
    }
    
    }).addTo(map);
  
  layerArray.push(layer);
  
  currentData=data;

}





// Sidebar
// ---------

$(".radio").click( function() {

 //$( "#table_dialog" ).dialog( "open" );
 $( "#table_dialog" ).css('display','block');

  var fileName=$(this).data("file");
  var file = '/data/' + fileName;
  var datasetname = $(this).data("name");
  var infoOfImportance = $(this).data("property");
  //var alreadyChecked = $(".checked");
  var input=$(this);
  var index;

  var checked=false;
  currentFileName=fileName;

  //test if input checked
  var checked=false;
  for(var i=0;i<radioLayerInput.length;i++)
  {
    var thisInput=radioLayerInput[i];
    thisFileName=thisInput.data("file");
    if(thisFileName==fileName)
    {
      checked=true;
      index=i;
    }
  }

  if(checked==true)
  {
    console.log("checked"+" "+checked);

    
    //var input=$(this);

    // make checkmark false
    input.find("input").prop("checked", false);
    input.removeClass("checked");

    //remove input from checkbox datastructure
    radioLayerInput.splice(index,1);

    //remove mark from priority algorthm recorder
    changeDataPriortyRecorder(fileName,checked);

    //make new layers reflecting the changes
     clearAllLayers();
           for(var i=0;i<radioLayerInput.length;i++)
            {
              var thisInput=radioLayerInput[i]
              var fileName=thisInput.data("file");
              var file = '/data/' + fileName;
              var datasetname = thisInput.data("name");
              var infoOfImportance = thisInput.data("property");

                getData( file, {name: datasetname, property: infoOfImportance},fileName );
            }
  }
  else if(checked==false)
  {
    console.log("checked"+" "+checked);

    var canAddFileToLayer=dataPriorityChecker(fileName);
    if(canAddFileToLayer==true)
    {
        //var input=$(this);

      //add new value to list of inputs
        radioLayerInput.push(input);

        //add checks to all inputs in checked link
        for(var i=0;i<radioLayerInput.length;i++)
        {
          var thisInput=radioLayerInput[i];
          thisFileName=thisInput.data("file");
          thisInput.addClass("checked");
          thisInput.find("input").prop("checked", true);
        }
        //change priority recorder
        changeDataPriortyRecorder(fileName,checked);

        //need to turn on layers
                clearAllLayers();
               for(var i=0;i<radioLayerInput.length;i++)
                {
                  var thisInput=radioLayerInput[i]
                  var fileName=thisInput.data("file");
                  var file = '/data/' + fileName;
                  var datasetname = thisInput.data("name");
                  var infoOfImportance = thisInput.data("property");

                    getData( file, {name: datasetname, property: infoOfImportance},fileName );
               }

    }//end of canAddfile=-true
    else if(canAddFileToLayer==false)
    {
      //uncheck no layers should change
       input.find("input").prop("checked", false);
    }

  } //end of checked ==false




});


