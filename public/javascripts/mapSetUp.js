
var getSomeElements=function(initialMapArr){

  //console.log(initialMapArr);
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

    console.log("color and uri");

    var getDataItems=new Array();
      _.each(valuesForMapArr,function(valuesForMap, index){

        var thisUri_Para=valuesForMap[0];
        var color=valuesForMap[1];

        var dataItem=_.where(dataArr, {uri_para: thisUri_Para});
        dataItem.currentColor=color;
        getDataItems.push(dataItem);
      });

    var divrad=$("div.radio");

    _.each(getDataItems,function(dataI){

     var fName=dataI[0].fileName;

      var filterInputList = _.filter(divrad, function(input){ 
          var testInputFileName=$(input).attr("data-file");
         
            if(testInputFileName==fName){
              return input;
            }
        });// filterList
      console.log (filterInputList);
    
   }); //each

}

getSomeElements(initialMapArr);