
//global  variables

var parsedrecord;//parsed JSON file


function getHtml(id) {
  var xhr = new XMLHttpRequest();
  var filename = id + ".html";    
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("display").innerHTML = xhr.responseText;
      pageSetup(id);
    }
  };
  xhr.open("GET", filename, true);
  xhr.send();
}

function pageSetup(id) {
    var xhr = new XMLHttpRequest();	
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
    }
  };
  // switch statement to determine which file to load
  switch (id) {
    case "data1":
      document.getElementById("Case_count").addEventListener("keyup", function (){ searchData1(this.value);},false);
      document.getElementById("Date_of_interest").addEventListener("keyup", function (){ searchData1(this.value);},false);
      xhr.open("GET", "https://data.cityofnewyork.us/resource/rc75-m7u3.json", true);
      break;
    case "data2":
      document.getElementById("eventID").addEventListener("keyup", function (){ searchData2(this.value);},false);
      document.getElementById("zip").addEventListener("keyup", function (){ searchData2(this.value);},false);
      xhr.open("GET", "https://data.cityofnewyork.us/resource/cpcm-i88g.json", true);
      break;
    case "data3":
      document.getElementById("status").addEventListener("keyup", function (){ searchData3(this.value);},false);
      document.getElementById("borough").addEventListener("keyup", function (){ searchData3(this.value);},false);
      xhr.open("GET", "https://data.cityofnewyork.us/resource/h2bn-gu9k.json", true);
      break;
  }

  xhr.send();	
}

function searchData1(input)
{

    var output="<tr><th>Date</th><th>Case_count</th><th>Hospitalized</th><th>Death</th><th>7day_avg</th></tr>";
    var inputValue1;
    var inputValue2; 
    for(var i=0;i<parsedrecord.length;i++)
    {
        var record=parsedrecord[i];
            inputValue1=record.case_count;
            inputValue2=record.date_of_interest;
            if(inputValue1.startsWith(input) || inputValue2.startsWith(input))
            {
                output+="<tr><td>";
                output+=record.date_of_interest.substring(0,10);
                output+="</td><td>";
                output+=record.case_count;
                output+="</td><td>";
                output+=record.hospitalized_count;                
                output+="</td><td>";
                output+=record.death_count;                
                output+="</td><td>";
                output+=record.case_count_7day_avg;                           
                output+="</td></tr>";
            }
    }
    document.getElementById("searchresults1").innerHTML=output;
}

function searchData2(input)
{

    var output="<tr><th>EventID</th><th>ParkID</th><th>Borough</th><th>ZIP</th><th>Name</th><th>Map</th></tr>";
    var inputValue3;
    var inputValue4; 
    var gmap;
    var position="";
    for(var i=0;i<parsedrecord.length;i++)
    {
        var record=parsedrecord[i];
            inputValue3=record.event_id;
            inputValue4=record.zip;
            if(inputValue3.startsWith(input) || inputValue4.startsWith(input))
            {
                output+="<tr><td>";
                output+=record.event_id;
                output+="</td><td>";
                output+=record.park_id;
                output+="</td><td>";
                output+=record.borough;                
                output+="</td><td>";
                output+=record.zip;                
                output+="</td><td>";
                output+=record.name;              
                output+="</td><td>";
                position=record.lat;
                position+=",";
                position+=record.long;
                //create hyperlink gmap
                gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";             
                output+=gmap;                
                output+="</td></tr>";
            }
    }
    document.getElementById("searchresults2").innerHTML=output;
}

function searchData3(input)
{

    var output="<tr><th>status</th><th>featuretype</th><th>propertyname</th><th>borough</th><th>Map</th></tr>";
    var inputValue5;
    var inputValue6; 
    var gmap;
    var position="";
    for(var i=0;i<parsedrecord.length;i++)
    {
        var record=parsedrecord[i];
            inputValue5=record.status;
            inputValue6=record.date_of_interest;
            if(inputValue5.startsWith(input) || inputValue6.startsWith(input))
            {
                output+="<tr><td>";
                output+=record.status;
                output+="</td><td>";
                output+=record.featuretype;
                output+="</td><td>";
                output+=record.propertyname;                
                output+="</td><td>";
                output+=record.borough;                
                output+="</td><td>";
                position=record.x;
                position+=",";
                position+=record.y;
                //create hyperlink gmap
                gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";             
                output+=gmap;                
                output+="</td></tr>";
            }
    }
    document.getElementById("searchresults3").innerHTML=output;
}

