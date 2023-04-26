var r;

// onload open the first tab
window.onload = function() {
    document.getElementById("defaultOpen").click();    
}


function openPage(pageName,elmnt,color) {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "inherit";
    elmnt.style.backgroundColor = color;

    var xhr = new XMLHttpRequest();
    var fileName = pageName + ".html"; 
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById(pageName).innerHTML = xhr.responseText;
        loadData(pageName);
      }
    };
    xhr.open("GET", fileName, true);
    xhr.send();
        
}

function loadData(page){
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            r=JSON.parse(xhr2.responseText);            
        }
      };
    //   switch statement to determine which data set to load
    switch(page){
        case "Incidents":
            document.getElementById("quadrant1").addEventListener("keyup", function (){ searchDataSet1(this.value, "quadrant");},false);
            document.getElementById("start_dt").addEventListener("keyup", function (){ searchDataSet1(this.value, "start_dt");},false);
            document.getElementById("incident_info").addEventListener("keyup", function (){ searchDataSet1(this.value, "incident_info");},false);
            xhr2.open("GET", "https://data.calgary.ca/resource/35ra-9556.json", true);
            break;
        case "Cameras":
            document.getElementById("quadrant2").addEventListener("keyup", function (){ searchDataSet2(this.value, "quadrant");},false);
            document.getElementById("description").addEventListener("keyup", function (){ searchDataSet2(this.value, "description");},false);
            document.getElementById("camera_location").addEventListener("keyup", function (){ searchDataSet2(this.value, "camera_location");},false);
            xhr2.open("GET", "https://data.calgary.ca/resource/k7p9-kppz.json", true);
            break;
        case "Crime":
            document.getElementById("sector").addEventListener("change", function (){ searchDataSet3(this.value, "sector");},false);
            document.getElementById("date").addEventListener("keyup", function (){ searchDataSet3(this.value, "date");},false);
            document.getElementById("community_name").addEventListener("keyup", function (){ searchDataSet3(this.value, "community_name");},false);
            document.getElementById("category").addEventListener("keyup", function (){ searchDataSet3(this.value, "category");},false);
            xhr2.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json", true);
            break;
        case "Permits":
            document.getElementById("business_licence_number").addEventListener("keyup", function (){ searchDataSet4(this.value, "business_licence_number");},false);
            document.getElementById("business_id").addEventListener("keyup", function (){ searchDataSet4(this.value, "business_id");},false);
            document.getElementById("status_description").addEventListener("change", function (){ searchDataSet4(this.value, "status_description");},false);
            document.getElementById("business_licence_type").addEventListener("keyup", function (){ searchDataSet4(this.value, "business_licence_type");},false);
            xhr2.open("GET", "https://data.calgary.ca/resource/gzkz-5k9a.json", true);
            break;
    }

      xhr2.send();
}
  
function searchDataSet1(input, fieldID){   
    
	document.getElementById("searchvalue1").innerHTML="Search by "+ fieldID.toUpperCase() +"<br>";
	//structure table
	var output="<tr><th>Date</th><th>Quadrant</th><th>Count</th><th>Location</th><th>Description</th><th>Map</th></tr>";
	var searchStr1;
    var searchStr2;
    var searchStr3;
    var gmap;
    var position="";
	for(var i=0; i<r.length; i++)
	{
		var rec=r[i];
		searchStr1=rec.quadrant;
        searchStr2=rec.start_dt;
        searchStr3=rec.incident_info.toLowerCase();
		if(searchStr1.startsWith(input.toUpperCase()) || searchStr2.startsWith(input) || searchStr3.startsWith(input.toLowerCase(),1))
		{					
			output+="<tr><td>";
                output+=rec.start_dt.substring(0,10);
                output+="</td><td>";
                output+=rec.quadrant;
                output+="</td><td>";
                output+=rec.count;              
                output+="</td><td>";
                output+=rec.incident_info;                
                output+="</td><td>";
                output+=rec.description;
                output+="</td><td>";
                //add latitude to postition
                position=rec.latitude;
                position+=",";
                //add longitude to position
                position+=rec.longitude;

                //create hyperlink gmap
                gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";              
              
                output+=gmap;
                
                output+="</td></tr>";
		}				
	}
document.getElementById("searchresults1").innerHTML=output;
}

function searchDataSet2(input, fieldID) {    
    
	document.getElementById("searchvalue2").innerHTML="Search by "+ fieldID.toUpperCase() +"<br>";
	//structure table
	var output="<tr><th>Cam</th><th>Live Feed URL</th><th>Location</th><th>Quadrant</th><th>Map</th></tr>";
	var searchStr1;
    var searchStr2;
    var searchStr3;
    var gmap;
    var position="";
	for(var i=0; i<r.length; i++)
	{
		var rec=r[i];
		searchStr1=rec.quadrant;
        searchStr2=rec.camera_url.description;
        searchStr3=rec.camera_location.toLowerCase();
		if( searchStr1.startsWith(input.toUpperCase()) || 
            searchStr2.startsWith(input) || 
            searchStr3.startsWith(input.toLowerCase()))
		{					
			output+="<tr><td>";
            output+=rec.camera_url.description;                             
            output+="</td><td>";
            output+="<a href="+rec.camera_url.url+" target=_blank>"+rec.camera_url.url+"</a>";
            output+="</td><td>";
            output+=rec.camera_location;
            output+="</td><td>";
            output+=rec.quadrant;
            output+="</td><td>";
            //add latitude to postition
            position=rec.point.coordinates[1];
            position+=",";
            //add longitude to position
            position+=rec.point.coordinates[0];
            //create hyperlink gmap
            gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";              
            
            output+=gmap;
            
            output+="</td></tr>";
		}				
	}
document.getElementById("searchresults2").innerHTML=output;
}

function searchDataSet3(input, fieldID) {    
    
	document.getElementById("searchvalue3").innerHTML="Search by "+ fieldID.toUpperCase() +"<br>";
	//structure table
	var output="<tr><th>Event</th><th>Community</th><th>Population</th><th>Category</th><th>Sector</th><th>Map</th></tr>";
	var searchStr1;
    var searchStr2;
    var searchStr3;
    var searchStr4;
    var gmap;
    var position="";
	for(var i=0; i<r.length; i++)
	{
		var rec=r[i];
		searchStr1=rec.sector;
        searchStr2=rec.date;
        searchStr3=rec.community_name;
        searchStr4=rec.category.toLowerCase();
		if( searchStr1.startsWith(input) || 
            searchStr2.startsWith(input) || 
            searchStr3.startsWith(input.toUpperCase()) || 
            searchStr4.startsWith(input.toLowerCase()))
		{					
			output+="<tr><td>";
            output+=rec.id;                             
            output+="</td><td>";
            output+=rec.community_name;                             
            output+="</td><td>";
            output+=rec.resident_count;
            output+="</td><td>";
            output+=rec.category;
            output+="</td><td>";
            output+=rec.sector;
            output+="</td><td>";
            //add latitude to postition
            position=rec.geocoded_column.latitude;
            position+=",";
            //add longitude to position
            position+=rec.geocoded_column.longitude;
            //create hyperlink gmap
            gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";              
            
            output+=gmap;
            
            output+="</td></tr>";
		}				
	}
document.getElementById("searchresults3").innerHTML=output;
}

function searchDataSet4(input, fieldID) {    
    
	document.getElementById("searchvalue4").innerHTML="Search by "+ fieldID.toUpperCase() +"<br>";
	//structure table
	var output="<tr><th>Licence No.</th><th>ID</th><th>Status</th><th>Address</th><th>Type</th><th>Residence Type</th><th>Map</th></tr>";
	var searchStr1;
    var searchStr2;
    var searchStr3;
    var searchStr4;
    var gmap;
    var position="";
	for(var i=0; i<r.length; i++)
	{
		var rec=r[i];
		searchStr1=rec.business_licence_number;
        searchStr2=rec.business_id;
        searchStr3=rec.status_description;
        searchStr4=rec.business_licence_type;
		if( searchStr1.startsWith(input) || 
            searchStr2.startsWith(input) || 
            searchStr3.toLowerCase().startsWith(input.toLowerCase()) || 
            searchStr4.toLowerCase().startsWith(input.toLowerCase()))
		{					
			output+="<tr><td>";
            output+=rec.business_licence_number;                             
            output+="</td><td>";
            output+=rec.business_id;                             
            output+="</td><td>";
            output+=rec.status_description;
            output+="</td><td>";
            output+=rec.address;
            output+="</td><td>";
            output+=rec.business_licence_type;
            output+="</td><td>";
            output+=rec.type_of_residence;
            output+="</td><td>";
            //add latitude to postition
            position=rec.latitude;
            position+=",";
            //add longitude to position
            position+=rec.longitude;
            //create hyperlink gmap
            gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";              
            
            output+=gmap;
            
            output+="</td></tr>";
		}				
	}
document.getElementById("searchresults4").innerHTML=output;
}

