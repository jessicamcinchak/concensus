// Set up the page
// ---------

var currentLayer;
var currentData;
var currentFileName;
var contentRowCounter=1;
var radioLayerInput=new Array();
var shape="shape";
var line="line";
var point="point";

var dataPriortyRecorder={
  shape:0,
  line:0,
  point:0
}

var totalCheckedItems=function()
{
  var lineNum=dataPriortyRecorder[line];
  var shapeNum=dataPriortyRecorder[shape];
  var pointNum=dataPriortyRecorder[point];
  var totalItems=lineNum+shapeNum+pointNum;

  return totalItems;
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

var currentColorArr={
   "census_track.geojson":null,
  "council_district.geojson":null,
  "employment_labor_Total_Unemployed.geojson":null,
  "employment_labor_Total_LaborForce.geojson":null,
  "grocery_stores.geojson":null,
  "Housing_Tenure_OccHH_FreeandClear.geojson":null,
  "Housing_Tenure_RenterOccHH.geojson":null,
  "median_family.geojson":null,
  "minority_family_Total_HH.geojson":null,
  "minority_family_Total_MinHH.geojson":null,
  "parks_landmark.geojson":null,
  "zipcodes.geojson":null,
  "bus_stops.geojson":null,
  "bus_routes.geojson":null,
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
  "zipcodes.geojson":"line",
  "bus_stops.geojson":"point",
  "bus_routes.geojson":"line",
  "detroit_historic.geojson":"shape",
}
var fileDataFeaturesForMap={
  "census_track.geojson":null,
  "council_district.geojson":null,
  "employment_labor_Total_Unemployed.geojson":null,
  "employment_labor_Total_LaborForce.geojson":null,
  "grocery_stores.geojson":null,
  "Housing_Tenure_OccHH_FreeandClear.geojson":null,
  "Housing_Tenure_RenterOccHH.geojson":null,
  "median_family.geojson":null,
  "minority_family_Total_HH.geojson":null,
  "minority_family_Total_MinHH.geojson":null,
  "parks_landmark.geojson":null,
  "zipcodes.geojson":null,
  "bus_stops.geojson":null,
  "bus_routes.geojson":null
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

  var maxColorIndex=4;
  var currentColorPopup=null;

  function changeColorGradient(colorGradArr)
  {
       $( ".gradient1" ).css('background-color',colorGradArr[0]);
       $( ".gradient2" ).css('background-color',colorGradArr[1]);
       $( ".gradient3" ).css('background-color',colorGradArr[2]);
       $( ".gradient4" ).css('background-color',colorGradArr[3]);
       $( ".gradient5" ).css('background-color',colorGradArr[4]);
  }


var setLineColor=function(fileName,color)
{

  var file="/data/"+fileName;
  if(fileDataFeaturesForMap[fileName]==null){
    var req = $.getJSON( file );
      req.done( function(data) {
        if(fileName=='census_track.geojson')
        {
          var property='City';
          var selectingProperty='Detroit';
          var newFeatures=queryData(data, property, selectingProperty);
          data['features']=newFeatures;
        }
        console.log("dont have data");
        fileDataFeaturesForMap[fileName]=data;
        processLineData(fileName,data,color);
      });
  }
  else{
    console.log("already have data");
      var data=fileDataFeaturesForMap[fileName];
      processLineData(fileName,data,color);
  }
}


var processLineData=function(fileName,data,color)
{
  
var features=data['features'];
 var newStyle = {
    "weight": 2,
    "opacity": 1,
    "color": color,
    "dashArray": '3',
    "fillOpacity": 0
  };

  var layer=L.geoJson(features, {
    style: newStyle
      
    }).addTo(map);

layerArray.push(layer);

}

var setPointColor= function( fileName,color ) {
     var file="/data/"+fileName;
   if(fileDataFeaturesForMap[fileName]==null){
     var req = $.getJSON( file );
       req.done( function(data) {
         fileDataFeaturesForMap[fileName]=data;
         processPointData(data,color);
       });
   }
   else{
       var data=fileDataFeaturesForMap[fileName];
       processPointData(data,color);
   }
};

var processPointData=function(data,color)
{

var features=data['features'];
var geojsonMarkerOptions = {
    radius: 3,
    fillColor: color,
    color: color,
    weight: 3,
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

var setShapeColors=function(fileName,colorGradientArr)
{
      var file="/data/"+fileName;
      var property='City';
      var selectingProperty='Detroit';

      if(fileDataFeaturesForMap[fileName]==null){
      var req = $.getJSON( file );
            req.done( function(data) {
        
          var newFeatures=queryData(data, property, selectingProperty);
          data['features']=newFeatures;

            fileDataFeaturesForMap[fileName]=data;
          processShapeData(fileName,data,colorGradientArr);
       });
   }
   else{
       var data=fileDataFeaturesForMap[fileName];
       processShapeData(fileName,data,colorGradientArr);
   }
}
var processShapeData=function(fileName,data,colorGradientArr)
{

      var features= data['features'];
      var mainMappingData=squareFileQueryParameter[fileName];
      gradientValues(mainMappingData,features,colorGradientArr);
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
          "weight": 1,
          "opacity": 1,
          "color": "#ffffff",
          "dashArray": '3',
          "fillOpacity": 0.7
         };
      
      return newStyle;
    }
    
    }).addTo(map);
    //layer.bringToBack();
  
  layerArray.push(layer);
  


}

var getData = function( geoURL, options,fileName ) {
  
  var req = $.getJSON( geoURL );
  console.log(fileName);

  req.done( function(data) {
    console.log(data);
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

var rulesForFiles=function(fileName)
{
  if(fileType[fileName]==shape)
  {
    var colorGradientArr;

    if(currentColorArr[fileName]==null){
        colorGradientArr=input.lightBlue;
    }
    else{
        var currentColor=currentColorArr[fileName];
        colorGradientArr=getColorGradient(currentColor)
    }

    currentColorArr[fileName]=colorGradientArr[maxColorIndex];
    setShapeColors(fileName,colorGradientArr);
  }

  else if(fileType[fileName]==line)
  {
    var color;
    console.log(currentColorArr);
    if(currentColorArr[fileName]==null){
      var color=input.lightBlue[maxColorIndex];
        
    }
    else{
      var color=currentColorArr[fileName]
    }

    currentColorArr[fileName]=color;
    setLineColor(fileName,color);
    
  }
  else if(fileType[fileName]==point)
  {
    var color;
    if(currentColorArr[fileName]==null){
      var color=input.lightBlue[maxColorIndex];
        
    }
    else{
      var color=currentColorArr[fileName]
    }
    currentColorArr[fileName]=color;
    setPointColor(fileName,color);
  }
  
};

var addSquarePopUp=function(fileName)
{
  var square_table=('<div class="shape_popup">'+
    '<table id="gradientTable">'+
        '<tr>'+
          '<td> <div class="gradient1" /> </td>'+
          '<td> <div class="gradient2" /> </td>'+
          '<td> <div class="gradient3" /> </td>'+
          '<td> <div class="gradient4" /> </td>'+
          '<td> <div class="gradient5" /> </td>'+  
      '</tr>'+
    '</table>'+
    '<table id="squareTable">'+
      '<tr>'+
          '<td> <div class="pinkSquare" /> </td>'+
          '<td> <div class="yellowSquare" /> </td>'+
          '<td> <div class="darkBlueSquare" /> </td>'+
          '<td> <div class="lightBlueSquare" /> </td>'+
          '<td> <div class="lightGreenSquare" /> </td>'+
          '<td> <div class="darkGreenSquare" /> </td>'+
      '</tr>'+
    '</table>'+
    '</div>');

   return square_table;
    
}

var addLinePopUp=function(fileName)
{
  var line_table=('<div class="line_table">'+
    '<table>'+
            '<tr>'+
              '<td>'+
                '<div class="pinkLine"></div>'+
              '</td>'+
              '<td>'+
                '<div class="yellowLine"></div>'+
              '</td>'+
              '<td>'+
                '<div class="darkBlueLine"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightBlueLine"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightGreenLine"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="darkGreenLine"></div>'+
              '</td>'+  
            '</tr>'+
        '</table>'+
        '</div>');
        
         return line_table;
}

addPointPopup=function(fileName)
{
  var point_table=('<div class="point_table">'+
    '<table>'+
            '<tr>'+
              '<td>'+ 
                '<div class="pinkCircle" id="pinkLine'+fileName+'"></div>'+
              '</td>'+
              '<td>'+
                '<div class="yellowCircle" id="yellowLine'+fileName+'"></div>'+
              '</td>'+
              '<td>'+
                '<div class="darkBlueCircle" id="darkBlueLine'+fileName+'"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightBlueCircle" id="lightBlueLine'+fileName+'"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightGreenCircle" id="lightGreenLine'+fileName+'"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="darkGreenCircle" id="darkGreenLine'+fileName+'"></div>'+
              '</td>'+  
            '</tr>'+
        '</table>'+
        '</div>');

         return point_table;
}


addLegendRow=function(fileName)
{
  var typeOfFile=fileType[fileName];
  var rowName="row"+fileName;
  
  var row=('<tr class="legend_row" id="'+rowName+'"><th> <div class="side_header">D3 Data</div></th><td>'+fileName+'</td><td><div class="'+typeOfFile+'"/></td></tr>');
  return row;
}


var addColorSelectionPopup=function(fileName)
{
 var typeOfFile=fileType[fileName];
 var popup;
   if(typeOfFile==line)
    {
        popup=addLinePopUp(fileName);
    }
    else if(typeOfFile==shape)
    {
        popup=addSquarePopUp(fileName);
    }
    else if(typeOfFile==point)
    {
        popup=addPointPopup(fileName);
    }
    return popup;
}

var addEventsToColorPointPopUp=function(popup,fileName)
{
    popup.parent().on('click', 'div.pinkCircle', function() {
           var color=input.pink[maxColorIndex];
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
        });

    popup.parent().on('click', 'div.yellowCircle', function() {
      console.log("in yellowCircle")
           var color=input.yellow[maxColorIndex];
           console.log(color);
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
      });

    popup.parent().on('click', 'div.darkBlueCircle', function() {
           var color=input.darkBlue[maxColorIndex];
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
      });

    popup.parent().on('click', 'div.lightBlueCircle', function() {
           var color=input.lightBlue[maxColorIndex];
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
      });

    popup.parent().on('click', 'div.lightGreenCircle', function() {
           var color=input.lightGreen[maxColorIndex];
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
      });

    popup.parent().on('click', 'div.darkGreenCircle', function() {
           var color=input.darkGreen[maxColorIndex];
           currentColorArr[fileName]=color;
           setPointColor(fileName,color);
      });

}

var addEventsToColorLinePopUp=function(popup,fileName)
{ 
  popup.parent().on('click', 'div.pinkLine', function() {
           var color=input.pink[maxColorIndex];
           currentColorArr[fileName]=color;
           setLineColor(fileName,color);
        });

    popup.parent().on('click', 'div.yellowLine', function() {
        var color=input.yellow[maxColorIndex];
        currentColorArr[fileName]=color;
          setLineColor(fileName,color);
            
        });

     popup.parent().on('click', 'div.darkBlueLine', function() {
        var color=input.darkBlue[maxColorIndex];
        currentColorArr[fileName]=color;
        setLineColor(fileName,color);
           
        });

     popup.parent().on('click', 'div.lightBlueLine', function() {
          var color=input.lightBlue[maxColorIndex];
          currentColorArr[fileName]=color;
          setLineColor(fileName,color);
        });

     popup.parent().on('click', 'div.lightGreenLine', function() {
          var color=input.lightGreen[maxColorIndex];
         currentColorArr[fileName]=color;
          setLineColor(fileName,color);
        });

     popup.parent().on('click', 'div.darkGreenLine', function() {
      var color=input.darkGreen[maxColorIndex];
      currentColorArr[fileName]=color;
      setLineColor(fileName,color);
      });
}
var addEventsToColorShapePopUp=function(popup,fileName)
{ 
  popup.parent().on('click', 'div.pinkSquare', function() {
          var colorGradientArr=input.pink;
          changeColorGradient(colorGradientArr);
         
           var color=input.pink[maxColorIndex];
          currentColorArr[fileName]=color;
          setShapeColors(fileName,colorGradientArr);
        });

    popup.parent().on('click', 'div.yellowSquare', function() {
         var colorGradientArr=input.yellow;
          changeColorGradient(colorGradientArr);

           var color=input.yellow[maxColorIndex];
          currentColorArr[fileName]=color;
           
           setShapeColors(fileName,colorGradientArr); 
        });

     popup.parent().on('click', 'div.darkBlueSquare', function() {
          var colorGradientArr=input.darkBlue;
          changeColorGradient(colorGradientArr);
          
           var color=input.darkBlue[maxColorIndex];
          currentColorArr[fileName]=color;
          
           setShapeColors(fileName,colorGradientArr);
        });

     popup.parent().on('click', 'div.lightBlueSquare', function() {
         var colorGradientArr=input.lightBlue;
          changeColorGradient(colorGradientArr);
          
         var color=input.lightBlue[maxColorIndex];
         currentColorArr[fileName]=color;
           
        setShapeColors(fileName,colorGradientArr);
        });

     popup.parent().on('click', 'div.lightGreenSquare', function() {
          var colorGradientArr=input.lightGreen;
          changeColorGradient(colorGradientArr);
          
          var color=input.lightGreen[maxColorIndex];
         currentColorArr[fileName]=color;
         
          setShapeColors(fileName,colorGradientArr);
        });

     popup.parent().on('click', 'div.darkGreenSquare', function() {
          var colorGradientArr=input.darkGreen;
          changeColorGradient(colorGradientArr);
          
           var color=input.darkGreen[maxColorIndex];
         currentColorArr[fileName]=color;
          
          setShapeColors(fileName,colorGradientArr);
           
      });
}

 var addResetColorPopUpEvents=function(popup,fileName)
 {    var typeOfFile=fileType[fileName];
      if(typeOfFile==shape)
      {
        addEventsToColorShapePopUp(popup,fileName);
      }
      else if(typeOfFile==line)
      {
        addEventsToColorLinePopUp(popup,fileName);
      }
      else if(typeOfFile==point)
      {
        addEventsToColorPointPopUp(popup,fileName);
      }

 }

var addPopUp=function(fileName)
{
  var numOfSelectedItems=totalCheckedItems();
  console.log("num"+" "+numOfSelectedItems);
  var typeOfFile=fileType[fileName];
  if(numOfSelectedItems==0)
  {
    
    $("#legend_intro").remove();
     var table = $("<table id='legendTable'></table>");

    var header_row=('<tr class="row1"><th>View as</th><th>Indicator Name</th> <th>Data Type</th> </tr>');
    table_dialog=$("#table_dialog");
    table_dialog.css("width","230px");
    table_dialog.css("height","150px");
    $("#table_dialog").append(table);
    table.append(header_row);
  }
       contentRowCounter++;
      var row=addLegendRow(fileName);
      $("#legendTable").append(row);

      $("."+typeOfFile).click(function(){

        if(currentColorPopup!=null)
        {
          $(currentColorPopup).popover('hide');
        }

        var name="popover"+fileName;
          var popup=$("."+typeOfFile).popover({
            id:name,
            placement: "right", 
            content:addColorSelectionPopup(fileName),
            html: true
        })
          currentColorPopup=popup;
        addResetColorPopUpEvents(popup,fileName);
     }); //end of click
} //add popup



var removePopUp=function(fileName)
{

var table_dia_childArr=$("#table_dialog").children();
var name="row"+fileName;
var table=$("table#legendTable");
var tbody=table.children();
var list=tbody.find('.legend_row');
var num= list.length;
console.log(num);
for(var i=0;i<list.length;i++)
{
  var item=list[i];
  var id=item.id;
  if(id==name){
    console.log("is a match");
    item.remove();
    break;
  }
}
if(list.length==1){
  table.remove();
}

}


var getColorGradient=function(currentColor){
    for(var color in input) {
      var thisColorGradArr=input[color];
      if(currentColor==thisColorGradArr[maxColorIndex]){
        return thisColorGradArr;
      }
      
    }
    return null;
}

// Sidebar
// ---------

$(".radio").click( function() {

  var fileName=$(this).data("file");
  var file = '/data/' + fileName;
  var datasetname = $(this).data("name");
  var infoOfImportance = $(this).data("property");
  
  console.log("fileName"+fileName);
  console.log("file"+file);
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
    }//if
  }//for

  if(checked==true)
  {
    console.log("checked"+" "+checked);

    // make checkmark false
    input.find("input").prop("checked", false);
    input.removeClass("checked");

    //remove input from checkbox datastructure
    radioLayerInput.splice(index,1);

    //remove mark from priority algorthm recorder
    changeDataPriortyRecorder(fileName,checked);

    removePopUp(fileName);

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
      addPopUp(fileName);
      console.log("yes");
      console.log(input);

      //add new value to list of inputs
        radioLayerInput.push(input);

        //add checks to all inputs in checked link
        for(var i=0;i<radioLayerInput.length;i++)
        {
          var thisInput=radioLayerInput[i];
          thisFileName=thisInput.data("file");
          thisInput.addClass("checked");
          thisInput.find("input").prop("checked", true);
        }//for
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
               }//fpr

    }//end of canAddfile=-true
    else if(canAddFileToLayer==false)
    {
      //uncheck no layers should change
       input.find("input").prop("checked", false);
    }

  } //end of checked ==false




});


