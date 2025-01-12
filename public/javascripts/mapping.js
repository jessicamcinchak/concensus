// Set up the page
// ---------

var contentLegendRowCounter=0;
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

var LayerId=new Array();


var dataPriorityChecker=function(dataItem)
{
  var thisFileType=dataItem.type;
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

var changeDataPriortyRecorder=function(dataItem,checked)
{
  var thisFileType=dataItem.type;
  if(checked==true)
  {
    if(dataPriortyRecorder[thisFileType]>=0)
    {
       dataPriortyRecorder[thisFileType]--;
    }
  }
  else if(checked==false)
  {
      dataPriortyRecorder[thisFileType]++;
    
  }
}


var handleInitialMap=function()
{
var initial_url=location.href;
var typeValueGroupArr=new Array();

var results=URI.parse(initial_url);
  if(results.query!=null){
      var queryResults=results.query;
      var splitQuery=queryResults.split('&');
      
      var count=0;
      
      var typeValueArr=new Array();
      for(var i=0;i<splitQuery.length;i++)
      {
        getCount=count;
         
          if(getCount<1)
          {
              count++;
              var thisSplitQuery=splitQuery[i];
              typeValueArr.push(thisSplitQuery);
          }
          else if(getCount==1){
            var thisSplitQuery=splitQuery[i];
            typeValueArr.push(thisSplitQuery);

            var thisTypeValueArr=typeValueArr;
            typeValueGroupArr.push(thisTypeValueArr);
            typeValueArr=new Array();
            count=0;
          }
       }

  }
  else
  {
    console.log("is null");
  }

  return typeValueGroupArr;

}

var initialMapArr=handleInitialMap();

window.history.pushState("object or string", "Title","/map");

var input = { 
    "pink": ["#F9E6E0","#F5D3C9","#ECA793", "#E37B5D", "#DA5027"],
    "yellow": ['#FFF5E5','#FFE3B2','#FFD17F','#FFBF4C','#FFA400'],
    "darkBlue": ['#DFE9EE','#C7D9E2','#90B4C5','#588FA8','#216A8B'],
    "lightBlue": ['#EBF1F9','#D3E1F1','#B2CAE7','#8BB0DB','#6596CF'],
    "lightGreen": ['#F0F5E6','#DCE8C7','#C3D79E','#A5C36E','#87AF3E'],
    "darkGreen": ['#E3EAE4','#BFCFC2','#8FAC95','#578260','#20592C']
}
var maxColorIndex=4;

var findColorKey=function(color)
{
  var keyColor;
   _.each(input,function(colorArr,key){
      var bool=_.contains(colorArr,color);
      if(bool==true){
      keyColor=key;
      }
  });
    return keyColor;
}

var relative_URI=new URI("");


var addToUrl=function(url,key,value)
{
  url.addSearch( key,value);
}

var pushStateToUrl=function(url)
{
  window.history.pushState("object or string", "Title",relative_URI);
}

var removeFromUrl=function(url,key,value)
{
  url.removeSearch(key, value);
}

var dataArr=createDataArr();

var divrad=$("div.radio");
var getValuesForMap=function(initialMapArr)
{
    var valuesForMapArr=new Array();
      for(var i=0;i<initialMapArr.length;i++)
      {

        var valuesForMap=new Array();

        var thisInitialMappVar=initialMapArr[i];
        var uri_para_arr=thisInitialMappVar[0];
        var uri_para_split=uri_para_arr.split('=');
        var uri_para=uri_para_split[1];

        var color_arr=thisInitialMappVar[1];
        var color_split=color_arr.split('=');
        var color=color_split[1];

        valuesForMap.push(uri_para);
        valuesForMap.push(color);
        valuesForMapArr.push(valuesForMap);
      }

      return valuesForMapArr;
}

var getDataItemsForMap=function(valuesForMapArr)
{
   var getDataItems=new Array();
      _.each(valuesForMapArr,function(valuesForMap, index){

        var thisUri_Para=valuesForMap[0];
        var thisColorKey=valuesForMap[1];
        var colorArr=input[thisColorKey];
        var colorValue=colorArr[maxColorIndex]

        dataItem=_.findWhere(dataArr, {uri_para: thisUri_Para});
        dataItem.currentColor=colorValue;
        getDataItems.push(dataItem);
      });

      return getDataItems;
}

var getInputItems=function(dataItem)
{
    var fName=dataItem.fileName;

      var filterInputList = _.filter(divrad, function(input){ 
          var testInputFileName=$(input).attr("data-file");
         
            if(testInputFileName==fName){
              return input;
            }
        });// filterList
      return filterInputList[0];
}


var setUpInitialMap=function(initialMapArr){

   

    var valuesForMapArr=getValuesForMap(initialMapArr);

    var getDataItems=getDataItemsForMap(valuesForMapArr);
    console.log(getDataItems);
    
    var inputList=new Array();
    _.each(getDataItems,function(dataItem){
      var filteredInput = getInputItems(dataItem);
      inputList.push(filteredInput);
     }); //each

    for(var i=0;i<getDataItems.length;i++)
    {
      var dataItem=getDataItems[i];
      var currentColor=dataItem.currentColor
      var typeOfFile=dataItem.type;
      var uri_parameter=dataItem.uri_para;
      var inputName="input#"+uri_parameter;
      $(inputName).attr('checked',true)

      addPopUp(dataItem);
       $("."+typeOfFile).css({"background-color": currentColor});
      var checked=true;
      changeDataPriortyRecorder(dataItem,checked);
      getData(dataItem);
    }
}

var map = L.map('map', {
                        center: [42.3540, -83.0523],
                        zoom: 11,
                        layers: []
                        }
                );

var baseMap=L.tileLayer('http://api.tiles.mapbox.com/v3/rcackerman.h6ofgio1/{z}/{x}/{y}.png', {
            attribution: 'Made pretty by Mapbox'
          }).addTo(map);
var overLayLayerGroup=new L.layerGroup;
overLayLayerGroup.addTo(map);



var accordion_d3=$(".accordion_d3" ).accordion();

var accordion_user=$(".accordion_user" ).accordion();

    $('.circle').click(function (evt) {
      $( "#circle_table" ).css('display','block');

    });

     $('.rectangle').click(function (evt) {
      $( "#square_table" ).css('display','block');
      
    });

  
  var currentColorPopup=null;

  function changeColorGradient(colorGradArr)
  {
       $( ".gradient1" ).css('background-color',colorGradArr[0]);
       $( ".gradient2" ).css('background-color',colorGradArr[1]);
       $( ".gradient3" ).css('background-color',colorGradArr[2]);
       $( ".gradient4" ).css('background-color',colorGradArr[3]);
       $( ".gradient5" ).css('background-color',colorGradArr[4]);
  }

  var addLayerInfo=function(dataItem,layer)
  {
    var fileName=dataItem.fileName;
    var id=layer._leaflet_id;
    var keyValue={"fileName":fileName,"id":id};

    LayerId.push(keyValue);
  }

  var removeLayer=function(dataItem)
  {

    var fileName=dataItem.fileName;
    var arrIndex=_.findWhere(LayerId, {"fileName":fileName});
    var removeId=arrIndex.id;

    var index=_.indexOf(LayerId, arrIndex);

    LayerId.splice(index,1);
  }


var setLineColor=function(dataItem,color)
{
  
  var fileName=dataItem.fileName;
  var file="/data/"+fileName;

  if(dataItem.layer_data==null){
    var req = $.getJSON( file );
      req.done( function(data) {
        if(fileName=='census_track.geojson')
        {
          var property='City';
          var selectingProperty='Detroit';
          var newFeatures=queryData(data, property, selectingProperty);
          data['features']=newFeatures;
        }
        dataItem.layer_data=data;
        processLineData(dataItem,data,color);
      });
   }
   else{
       var data=dataItem.layer_data;
      processLineData(dataItem,data,color);
  }
 }

 


var processLineData=function(dataItem,data,color)
{

var popup_para=dataItem.popup_value;
 

var features=data['features'];
 var newStyle = {
    "weight": 2,
    "opacity": 1,
    "color": color,
    "dashArray": '3',
    "z-index":4,
    "fillOpacity": 0
  };

  var layer=L.geoJson(features, {
    style: newStyle,
    onEachFeature: function (feature, myLayer) {
      var popup_value=feature.properties[popup_para];
      if(popup_value!=null){
       myLayer.bindPopup(popup_value.toString());
      }
  }});

  overLayLayerGroup.addLayer(layer);
  addLayerInfo(dataItem,layer);
}

var setPointColor= function(dataItem,color) {
     var fileName=dataItem.fileName;
     var file="/data/"+fileName;
   if(dataItem.layer_data==null){
     var req = $.getJSON( file );
       req.done( function(data) {
         dataItem.layer_data=data;
         processPointData(dataItem,data,color);
       });
   }
   else{
       var data=dataItem.layer_data;
       processPointData(dataItem,data,color);
   }
};

var processPointData=function(dataItem,data,color)
{

var popup_para=dataItem.popup_value;
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
    },
    onEachFeature: function (feature, myLayer) {
      var popup_value=feature.properties[popup_para];
     myLayer.bindPopup(popup_value);
  }
});

overLayLayerGroup.addLayer(layer);
addLayerInfo(dataItem,layer);

}


var setShapeColors=function(dataItem,colorGradientArr)
{
      var fileName=dataItem.fileName;
      var file="/data/"+fileName;
      var property='City';
      var selectingProperty='Detroit';

      if(dataItem.layer_data==null){
      var req = $.getJSON( file );
            req.done( function(data) {
        
          var newFeatures=queryData(data, property, selectingProperty);
          data['features']=newFeatures;

           dataItem.layer_data=data;
          processShapeData(dataItem,data,colorGradientArr);
       });
   }
   else{
       var data=dataItem.layer_data;
       processShapeData(dataItem,data,colorGradientArr);
   }
}
var processShapeData=function(dataItem,data,colorGradientArr)
{
      var features= data['features'];
      var query_parameter=dataItem.query_parameter;
      var mainMappingData=query_parameter;
      if(mainMappingData==null)
      {
        
      }
      gradientValues(dataItem,mainMappingData,features,colorGradientArr);
}

var gradientValues=function(dataItem,mainMappingData,features,colorGradientArr)
{

   var valueArr=new Array();
   var popup_para=dataItem.popup_value;


    for (var i = 0; i < features.length ;i++) {
        var prop=features[i].properties[mainMappingData];
        if(prop!=null)
        valueArr.push(prop);

      }
      var numRangeArr=sortNum(valueArr);


      var rangeNum=getValueRange(numRangeArr);

      var sectionNum=getSectionNum(rangeNum);

      var min=numRangeArr[0];
      var max=numRangeArr[1];
      dataItem.min_max=numRangeArr;

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
          "fillOpacity":1
         }
      
      return newStyle;
    },
  onEachFeature: function (feature, myLayer) {
      var popup_value=feature.properties[popup_para];
      if(popup_value!=null){
       myLayer.bindPopup(popup_value.toString());
      }
      else{
        console.log("yo null");
      }
    }
  }).addTo(map);

  overLayLayerGroup.addLayer(layer);
  addLayerInfo(dataItem,layer);
  
  
}

    
var getData = function(dataItem) {

  var fileName=dataItem.fileName;
  var geoURL="/data/"+fileName;

  var req = $.getJSON( geoURL );

  req.done( function(data) {
    rulesForFiles(dataItem,data);
  });
};


var removeData = function(layer) {
  map.removeLayer(layer);
};


var queryData=function(data, property, selectingProperty){
  var features=data['features'];
  var newFeatures=new Array();
    for (var i = 0; i < features.length ;i++) {
        var prop=features[i].properties[property];
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

var rulesForFiles=function(dataItem)
{
  var type=dataItem.type;
  var dataItemCurrentColor=dataItem.currentColor;
  if(type==shape)
  {
    var colorGradientArr;

    if(dataItemCurrentColor==null){
        colorGradientArr=input.lightBlue;
        changeColorGradient(colorGradientArr);
    }
    else{
        var currentColor=dataItem.currentColor;
        colorGradientArr=getColorGradient(currentColor);
    }

    setShapeColors(dataItem,colorGradientArr);
  }

  else if(type==line)
  {
    var color;
    if(dataItemCurrentColor==null){
      var color=input.lightBlue[maxColorIndex];
    }
    else{
      var color=dataItem.currentColor;
    }

    dataItem.currentColor=color;
    setLineColor(dataItem,color);
    
  }
  else if(type==point)
  {
    var color;

    if(dataItem.currentColor==null){
      var color=input.lightBlue[maxColorIndex];
        
    }
    else{
      var color=dataItem.currentColor;
    }
     console.log("in point"+" "+color);
    dataItem.currentColor=color;
    setPointColor(dataItem,color);
  }
     
};

var addSquarePopUp=function(dataItem)
{
  var numRangeArr=dataItem.min_max;
  var min=numRangeArr[0];
       min=min.toFixed(1);
  var max=numRangeArr[1];
       max=max.toFixed(1);
  var square_table=('<div class="shape_popup">'+
    '<table id="gradientTable">'+
     '<tr>'+
          '<td> <div class="minValue">'+min+'</div></td>'+
          '<td></td>'+
          '<td></td>'+
          '<td></td>'+
          '<td><div class="minValue">'+max+'</div></td>'+  
      '</tr>'+
        '<tr>'+
          '<td> <div class="gradient1" /> </td>'+
          '<td> <div class="gradient2" /> </td>'+
          '<td> <div class="gradient3" /> </td>'+
          '<td> <div class="gradient4" /> </td>'+
          '<td><div class="gradient5" /></div></td>'+  
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

var addLinePopUp=function()
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

addPointPopup=function()
{
  var point_table=('<div class="point_table">'+
    '<table>'+
            '<tr>'+
              '<td>'+ 
                '<div class="pinkCircle"></div>'+
              '</td>'+
              '<td>'+
                '<div class="yellowCircle"></div>'+
              '</td>'+
              '<td>'+
                '<div class="darkBlueCircle"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightBlueCircle"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="lightGreenCircle"></div>'+
              '</td>'+ 
              '<td>'+
                '<div class="darkGreenCircle"></div>'+
              '</td>'+  
            '</tr>'+
        '</table>'+
        '</div>');

         return point_table;
}

$("img#bull_horn").click( function() {


_.each(LayerId,function(layerEle){
  var afileName=layerEle.fileName;
  var dataItem=getItem(dataArr,{fileName:afileName});
  var type=dataItem.type;
  var colorValue=dataItem.currentColor;
  var colorKey=findColorKey(colorValue);
  var uri_para=dataItem.uri_para
  addToUrl(relative_URI,type,uri_para);
  addToUrl(relative_URI,type,colorKey);
});

var currentUrl=window.location.href;
var newUrl=currentUrl+relative_URI;

if(LayerId.length>0){
    
    var html=('<h4>Share url</h4><p>'+newUrl+'</p>');

    $("img#bull_horn").popover({
      height:"1000px",
      width:"1000px",
      content:html,
      placement: "top", 
      html:true
    });
}

});

$("img#save_disk").click( function() {
  _.each(LayerId,function(layerEle){
    var afileName=layerEle.fileName;
    var file='/data/'+afileName; 
    $.fileDownload(file);
  });
 
});

addLegendRow=function(dataItem)
{
  var typeOfFile=dataItem.type;
  var fileName=dataItem.fileName;
  var name=dataItem.name;
  var rowName="row"+fileName;
  
  var row=('<tr class="legend_row" id="'+rowName+'"><th> <div class="side_header">D3 Data</div></th><td class="fileName">'+name+'</td><td><div class="'+typeOfFile+'"/></td></tr>');
  return row;
}


var addColorSelectionPopup=function(dataItem)
{
 var typeOfFile=dataItem.type;
 var popup;
   if(typeOfFile==line)
    {
        popup=addLinePopUp();
    }
    else if(typeOfFile==shape)
    {
        popup=addSquarePopUp(dataItem);
    }
    else if(typeOfFile==point)
    {
        popup=addPointPopup();
    }
    
    return popup;
}

var addEventsToColorPointPopUp=function(popup,dataItem)
{
    popup.parent().on('click', 'div.pinkCircle', function() {
           var color=input.pink[maxColorIndex];
           dataItem.currentColor=color;
            var typeOfFile=dataItem.type;
             removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
        });

    popup.parent().on('click', 'div.yellowCircle', function() {
           var color=input.yellow[maxColorIndex];
           dataItem.currentColor=color;
            var typeOfFile=dataItem.type;
             removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
      });

    popup.parent().on('click', 'div.darkBlueCircle', function() {
           var color=input.darkBlue[maxColorIndex];
           dataItem.currentColor=color;
            var typeOfFile=dataItem.type;
             removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
      });

    popup.parent().on('click', 'div.lightBlueCircle', function() {
           var color=input.lightBlue[maxColorIndex];
           dataItem.currentColor=color;
            var typeOfFile=fileType[fileName];
             removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
      });

    popup.parent().on('click', 'div.lightGreenCircle', function() {
           var color=input.lightGreen[maxColorIndex];
           dataItem.currentColor=color;
            var typeOfFile=dataItem.type;
             removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
      });

    popup.parent().on('click', 'div.darkGreenCircle', function() {
           var color=input.darkGreen[maxColorIndex];
           dataItem.currentColor=color;
          var typeOfFile=dataItem.type;
           removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setPointColor(dataItem,color);
      });

}

var addEventsToColorLinePopUp=function(popup,dataItem)
{ 
  popup.parent().on('click', 'div.pinkLine', function() {
           var color=input.pink[maxColorIndex];
           dataItem.currentColor=color;
           var typeOfFile=dataItem.type;
           removeLayer(dataItem);
            $("."+typeOfFile).css({"background-color": color});
           setLineColor(dataItem,color);
        });

    popup.parent().on('click', 'div.yellowLine', function() {
        var color=input.yellow[maxColorIndex];
        dataItem.currentColor=color;
        removeLayer(dataItem);
        var typeOfFile=dataItem.type;
        $("."+typeOfFile).css({"background-color": color});
          setLineColor(dataItem,color);
            
        });

     popup.parent().on('click', 'div.darkBlueLine', function() {
        var color=input.darkBlue[maxColorIndex];
        dataItem.currentColor=color;
        var typeOfFile=dataItem.type;
         removeLayer(dataItem);
        $("."+typeOfFile).css({"background-color": color});
        setLineColor(dataItem,color);
           
        });

     popup.parent().on('click', 'div.lightBlueLine', function() {
          var color=input.lightBlue[maxColorIndex];
          dataItem.currentColor=color;
          var typeOfFile=dataItem.type;
           removeLayer(dataItem);
          $("."+typeOfFile).css({"background-color": color});
          setLineColor(dataItem,color);
        });

     popup.parent().on('click', 'div.lightGreenLine', function() {
          var color=input.lightGreen[maxColorIndex];
         dataItem.currentColor=color;
         var typeOfFile=dataItem.type;
          removeLayer(dataItem);
          $("."+typeOfFile).css({"background-color": color});
          setLineColor(dataItem,color);
        });

     popup.parent().on('click', 'div.darkGreenLine', function() {
      var color=input.darkGreen[maxColorIndex];
      dataItem.currentColor=color;
      var typeOfFile=dataItem.type;
       removeLayer(dataItem);
      $("."+typeOfFile).css({"background-color": color});
      setLineColor(dataItem,color);
      });
}
var addEventsToColorShapePopUp=function(popup,dataItem)
{ 
  popup.parent().on('click', 'div.pinkSquare', function() {
          var colorGradientArr=input.pink;
          changeColorGradient(colorGradientArr);
         
           var color=input.pink[maxColorIndex];
          dataItem.currentColor=color;

           var typeOfFile=dataItem.type;
            removeLayer(dataItem);
          $("."+typeOfFile).css({"background-color": color});
          setShapeColors(dataItem,colorGradientArr);
        });

    popup.parent().on('click', 'div.yellowSquare', function() {
         var colorGradientArr=input.yellow;
          changeColorGradient(colorGradientArr);

           var color=input.yellow[maxColorIndex];
          dataItem.currentColor=color;
           
          var typeOfFile=dataItem.type;
           removeLayer(dataItem);
        $("."+typeOfFile).css({"background-color": color});
           setShapeColors(dataItem,colorGradientArr); 
        });

     popup.parent().on('click', 'div.darkBlueSquare', function() {
          var colorGradientArr=input.darkBlue;
          changeColorGradient(colorGradientArr);
          
           var color=input.darkBlue[maxColorIndex];
          dataItem.currentColor=color;
          
           var typeOfFile=dataItem.type;
            removeLayer(dataItem);
          $("."+typeOfFile).css({"background-color": color});
           setShapeColors(dataItem,colorGradientArr);
        });

     popup.parent().on('click', 'div.lightBlueSquare', function() {
         var colorGradientArr=input.lightBlue;
          changeColorGradient(colorGradientArr);
          
         var color=input.lightBlue[maxColorIndex];
         dataItem.currentColor=color;
         
        var typeOfFile=dataItem.type;
         removeLayer(dataItem);
        $("."+typeOfFile).css({"background-color": color});  
        setShapeColors(dataItem,colorGradientArr);
        });

     popup.parent().on('click', 'div.lightGreenSquare', function() {
          var colorGradientArr=input.lightGreen;
          changeColorGradient(colorGradientArr);
          
          var color=input.lightGreen[maxColorIndex];
         dataItem.currentColor=color;


          var typeOfFile=dataItem.type;
           removeLayer(dataItem);
          $("."+typeOfFile).css({"background-color": color});
          setShapeColors(dataItem,colorGradientArr);
        });

     popup.parent().on('click', 'div.darkGreenSquare', function() {
          var colorGradientArr=input.darkGreen;
          changeColorGradient(colorGradientArr);
          
          var color=input.darkGreen[maxColorIndex];
         dataItem.currentColor=color;
          
           var typeOfFile=dataItem.type;
            removeLayer(dataItem);
      $("."+typeOfFile).css({"background-color": color});
          setShapeColors(dataItem,colorGradientArr);
           
      });
}

var getItem=function(dataArr,selector)
{
  var dataItemArr=_.where(dataArr,selector);
  var dataItem=dataItemArr[0];
  return dataItem;
}

 var addResetColorPopUpEvents=function(popup,dataItem)
 {    var typeOfFile=dataItem.type;
      if(typeOfFile==shape)
      {
        addEventsToColorShapePopUp(popup,dataItem);
      }
      else if(typeOfFile==line)
      {
        addEventsToColorLinePopUp(popup,dataItem);
      }
      else if(typeOfFile==point)
      {
        addEventsToColorPointPopUp(popup,dataItem);
      }

 }

var addPopUp=function(dataItem)
{
  var numOfSelectedItems=totalCheckedItems();
  var typeOfFile=dataItem.type;
  var fileName=dataItem.fileName;
  if(numOfSelectedItems==0)
  {
    
    $("#legend_intro").remove();
     var table = $("<table id='legendTable'><col/><col id='colName'/><col/></table>");

    var header_row=('<tr class="row1"><th>View as</th><th>Indicator Name</th> <th>Data Type</th> </tr>');
    table_dialog=$("#table_dialog");
    table_dialog.css("width","215px");
    table_dialog.css("height","90px");
    $("#table_dialog").append(table);
    table.append(header_row);
  }
   var currentHeight = $("#table_dialog").css("height");
   var currentHeightValue = currentHeight.replace('px', '');
   var currentHeightInt=parseInt(currentHeightValue);
   var newHeight=currentHeightInt+70;
   $("#table_dialog").css("height",newHeight+"px");
   

      contentLegendRowCounter++;

      var row=addLegendRow(dataItem);

      $("#legendTable").append(row);

      $("."+typeOfFile).click(function(){

        if(currentColorPopup!=null)
        {
          $(currentColorPopup).popover('destroy');
        }

        var name="popover"+fileName;
          var popup=$("."+typeOfFile).popover({
            id:name,
            height:"70px",
            placement: "right", 
            content:addColorSelectionPopup(dataItem),
            html: true
        })
          currentColorPopup=popup;

        addResetColorPopUpEvents(popup,dataItem);
        
     }); //end of click
} //add popup



var removePopUp=function(dataItem)
{

  var fileName=dataItem.fileName;
  var table_dia_childArr=$("#table_dialog").children();
  var name="row"+fileName;
  var table=$("table#legendTable");
  var tbody=table.children();
  var list=tbody.find('.legend_row');
  for(var i=0;i<list.length;i++)
  {
    var item=list[i];
    var id=item.id;
    if(id==name){
      item.remove();
      break;
    }
  }
  if(list.length==1){
    table.remove();
  }

  contentLegendRowCounter--;
   var currentHeight = $("#table_dialog").css("height");
   var currentHeightValue = currentHeight.replace('px', '');
   var currentHeightInt=parseInt(currentHeightValue);
   var newHeight=currentHeightInt-70;
   $("#table_dialog").css("height",newHeight+"px");
  table_dialog.css("height","150px");

}

var html=('<h4>Under Construction</h4><p>This site is still under construction and we apologize'+
  'for any bugs you may experience, we’re working to develop solutions.</p>');

$(".map-footer-column-main#hints").popover({
  height:"1000px",
  width:"1000px",
  content:html,
  placement: "top", 
  html:true
});

$(".map-footer-column-main#community").popover({
  height:"1000px",
  width:"1000px",
  content:html,
  placement: "top",
  html:true
});



var getColorGradient=function(currentColor){
    for(var color in input) {
      var thisColorGradArr=input[color];
      if(currentColor==thisColorGradArr[maxColorIndex]){
        return thisColorGradArr;
      }
      
    }
    return null;
}  

setUpInitialMap(initialMapArr);

$(".radio").click( function() {

 

  var fileName=$(this).data("file");
  var file = '/data/' + fileName;
  var datasetname = $(this).data("name");
  var infoOfImportance = $(this).data("property");

  var dataItem=getItem(dataArr,{fileName:fileName});

 
  var input=$(this);
  
  var checked=false;


    for(var i=0;i<LayerId.length;i++)
    {
    var result=_.findWhere(LayerId, {"fileName":fileName});
    
      if(result!=undefined)
      {
        checked=true;
        
      }//if
  }//for

  if(checked==true)
  {

    // make checkmark false
  
    input.find("input").prop("checked", false);
    input.removeClass("checked");

    var type=dataItem.type;
    var currentColor=dataItem.currentColor;
    var colorKey=findColorKey(currentColor);
    var uri_para=dataItem.uri_para;


    removeLayer(dataItem);

    //remove mark from priority algorthm recorder
    changeDataPriortyRecorder(dataItem,checked);

    removePopUp(dataItem);

  }
  else if(checked==false)
  {
 
    var canAddFileToLayer=dataPriorityChecker(dataItem);
    if(canAddFileToLayer==true)
    {
      addPopUp(dataItem);


    changeDataPriortyRecorder(dataItem,checked);
    getData(dataItem);

    }//end of canAddfile=-true
    else if(canAddFileToLayer==false)
    {
      //uncheck no layers should change
       input.find("input").prop("checked", false);
    }

  } //end of checked ==false

});


