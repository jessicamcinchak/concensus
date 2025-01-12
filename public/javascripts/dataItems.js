
function DataItem () {
    this.name
    this.min_max
    this.type
    this.uri_para
    this.currentColor
    this.popup_value
    this.fileName
    this.data_source
    this.layer_data
    this.bucket
}

var createDataArr=function()
{
  var dataArr=new Array();
   var dataItem2=new DataItem();
   dataItem2.name="Total Number of Minority Households";
   dataItem2.type="shape";
   dataItem2.query_parameter="Tot_MinHH";
   dataItem2.layer_data=null;
   dataItem2.popup_value="Tot_MinHH";
   dataItem2.uri_para="totalMinHH";
   dataItem2.fileName="minority_family_Total_MinHH.geojson";
   dataItem2.bucket="demographics";
   dataItem2.data_source="d3";

  var dataItem3=new DataItem();
   dataItem3.name="Total Number of Households";
   dataItem3.type="shape";
   dataItem3.query_parameter="Tot_HH"
   dataItem3.currentColor=null;
   dataItem3.popup_value="Tot_HH";
   dataItem3.layer_data=null;
   dataItem3.uri_para="totalHH";
   dataItem3.fileName="minority_family_Total_HH.geojson";
   dataItem3.bucket="demographics";
   dataItem3.data_source="d3";

  var dataItem4=new DataItem();
   dataItem4.name="Housing Tenure, Number of Renter Occupied Households";
   dataItem4.type="shape";
   dataItem4.query_parameter="RenterOccHU";
   dataItem4.currentColor=null;
   dataItem4.popup_value="RenterOccHU";
   dataItem4.layer_data=null;
   dataItem4.uri_para="RenterOccHH";
   dataItem4.fileName="Housing_Tenure_RenterOccHH.geojson";
   dataItem4.bucket="demographics";
   dataItem4.data_source="d3";

var dataItem5=new DataItem();
   dataItem5.name="Municipal Parks and Landmarks";
   dataItem5.type="shape";
   dataItem5.query_parameter="parks";
   dataItem5.currentColor=null;
   dataItem5.popup_value="FULLNAME";
   dataItem5.layer_data=null;
   dataItem5.uri_para="parks";
   dataItem5.fileName="parks_landmark.geojson";
   dataItem5.bucket="city systems";
   dataItem5.data_source="d3";


var dataItem6=new DataItem();
   dataItem6.name="Labor Force Participation, Number of People 16+";
   dataItem6.type="shape";
   dataItem6.query_parameter="Total_LaborForce";
   dataItem6.currentColor=null;
   dataItem6.layer_data=null;
   dataItem6.popup_value="Total_LaborForce";
   dataItem6.uri_para="totalLaborForce";
   dataItem6.fileName="employment_labor_Total_LaborForce.geojson";
   dataItem6.bucket="Economy";
   dataItem6.data_source="d3";

var dataItem7=new DataItem();
   dataItem7.name="Unemployed, Number of People in Labor Force 16+";
   dataItem7.type="shape";
   dataItem7.query_parameter="Total_Unemployed";
   dataItem7.currentColor=null;
   dataItem7.layer_data=null;
   dataItem7.popup_value="Total_Unemployed"
   dataItem7.uri_para="totalUemployed";
   dataItem7.fileName="employment_labor_Total_Unemployed.geojson";
   dataItem7.bucket="Economy";
   dataItem7.data_source="d3";

var dataItem8=new DataItem();
   dataItem8.name="Housing Tenure, Number of Owner Occupied Households without a Mortgage, Free and Clear";
   dataItem8.type="shape";
   dataItem8.query_parameter="OwnOccHU_FreeandClear";
   dataItem8.currentColor=null;
   dataItem8.layer_data=null;
   dataItem8.popup_value="OwnOccHU_FreeandClear";
   dataItem8.uri_para="OccHHFreeandClear";
   dataItem8.fileName="Housing_Tenure_OccHH_FreeandClear.geojson";
   dataItem8.bucket="demographics";
   dataItem8.data_source="d3";

var dataItem9=new DataItem();
   dataItem9.name="Census Tracts";
   dataItem9.type="line";
   dataItem9.query_parameter;
   dataItem9.currentColor=null;
   dataItem9.layer_data=null;
   dataItem9.popup_value="NAMELSAD10";
   dataItem9.uri_para="censustracks";
   dataItem9.fileName="census_track.geojson";
   dataItem9.bucket="Geographies";
   dataItem9.data_source="d3";

var dataItem10=new DataItem();
   dataItem10.name="Zip Codes";
   dataItem10.type="line";
   dataItem10.query_parameter="zipcodes";
   dataItem10.uri_para="zipcodes";
   dataItem10.currentColor=null;
   dataItem10.layer_data=null;
   dataItem10.popup_value="ZIPCODE";
   dataItem10.fileName="zipcodes.geojson";
   dataItem10.bucket="Geographies";
   dataItem10.data_source="d3";

var dataItem11=new DataItem();
   dataItem11.name="Detroit Council Districts";
   dataItem11.type="line";
   dataItem11.uri_para="councildistrict";
   dataItem11.currentColor=null;
   dataItem11.popup_value="DistrictNu";
   dataItem11.layer_data=null;
   dataItem11.fileName="council_district.geojson";
   dataItem11.bucket="Geographies";
   dataItem11.data_source="d3";


var dataItem12=new DataItem();
   dataItem12.name="Bus Routes, Detroit Department of Transportation";
   dataItem12.type="line";
   dataItem12.uri_para="busroutes";
   dataItem12.popup_value=null;
   dataItem12.currentColor=null;
   dataItem12.layer_data=null;
   dataItem12.fileName="bus_routes.geojson";
   dataItem12.bucket="demographics";
   dataItem12.data_source="d3";

var dataItem13=new DataItem();
   dataItem13.name="Bus Stops, Detroit Department of Transportation";
   dataItem13.type="point";
   dataItem13.uri_para="busstop";
   dataItem13.popup_value="F_STOPNAME";
   dataItem13.currentColor=null;
   dataItem13.layer_data=null;
   dataItem13.fileName="bus_stops.geojson";
   dataItem13.bucket="demographics";
   dataItem13.data_source="d3";

var dataItem14=new DataItem();
   dataItem14.name="Grocery Stores";
   dataItem14.type="point";
   dataItem14.currentColor=null;
   dataItem14.popup_value="Company";
   dataItem14.uri_para="grocerystore";
   dataItem14.layer_data=null;
   dataItem14.fileName="grocery_stores.geojson";
   dataItem14.bucket="Economy";
   dataItem14.data_source="d3";

var dataItem15=new DataItem();
   dataItem15.name="Median Household Income (Adjusted 2011 Dollars)";
   dataItem15.type="shape";
   dataItem15.uri_para="medianincome";
   dataItem15.currentColor=null;
   dataItem15.popup_value="MedHHInc_2011Adj";
   dataItem15.fileName="median_family.geojson";
   dataItem15.layer_data=null;
   dataItem15.bucket="Economy";
   dataItem15.data_source="d3";
   dataItem15.query_parameter="MedHHInc_2011Adj"

 dataArr.push(dataItem2);
 dataArr.push(dataItem3);
 dataArr.push(dataItem4);
 dataArr.push(dataItem5);
 dataArr.push(dataItem6);
 dataArr.push(dataItem7); 
 dataArr.push(dataItem8);
 dataArr.push(dataItem9);
 dataArr.push(dataItem10);
 dataArr.push(dataItem11); 
 dataArr.push(dataItem12);
 dataArr.push(dataItem13);
 dataArr.push(dataItem14);
 dataArr.push(dataItem15);

 return dataArr;

}