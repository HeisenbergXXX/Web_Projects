// Part C car rental system script
var r;
// define constants
const compactRate = 15;
const midsizeRate = 20;
const luxuryRate = 35;
const vanRate = 40;
const racRate = 5;
const GPSRate = 10;
const childSeatRate = 0;
window.onload=loaddata;

function loaddata(){
    // load date and time function
    getDnT(); 
    // make search result invisible
    document.getElementById("search_result").style.display="none";
    // make stage2 invisible
    document.getElementById("stage2").style.display="none";
    var xhr = new XMLHttpRequest();
    document.getElementById("search").addEventListener("keyup", function (){ searchLastName(this.value);},false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            r=JSON.parse(xhr.responseText);            
        }
      };
    xhr.open("GET", "rentalclients.json", true);
    xhr.send();
}

function searchLastName(lastname) {
	var output="";
	var searchname;
	for(var i=0; i< r.length; i++)
	{
        var obj=r[i];
        searchname=obj.last_name.toLowerCase();
        if(searchname.startsWith(lastname.toLowerCase()))
        {   
            output+="<span class='result_name' onClick='chooseName("+i+")'>"+obj.last_name+" "+obj.first_name+"</span><br>";
        }
	}
    // message if no match found
    if(output=="")
    {
        output="No match found";
    }
    // display search result
    document.getElementById("search_result").style.display="block";
    document.getElementById("search_result").innerHTML=output;
}

function getDnT(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("date").innerHTML = today.toDateString();
    document.getElementById("time").innerHTML =  h + ":" + m + ":" + s;
    setTimeout(getDnT, 1000);

}
function checkTime(i) {
    if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
    }

// function to open page rental.html
function openRental(){
    window.open("rental.html", "_self");
}

function chooseName(index){
    console.log(index);
    // display name in search field
    document.getElementById("search").value=r[index].last_name+" "+r[index].first_name;
    // make serach result invisible
    document.getElementById("search_result").style.display="none";
    // display stage2
    document.getElementById("stage2").style.display="block";
    // display information in stage2
    document.getElementById("fname").value=r[index].first_name;
    document.getElementById("lname").value=r[index].last_name;
    document.getElementById("address").value=r[index].address;
    document.getElementById("state").value=r[index].state_prov;
    document.getElementById("email").value=r[index].email;
    document.getElementById("phone").value=r[index].phone;

}
// gather information from stage2 and display in print
function displayInfo(){
    var carSize="";
    var duration="";
    var fname=document.getElementById("fname").value;
    var lname=document.getElementById("lname").value;
    var address=document.getElementById("address").value;
    var state=document.getElementById("state").value;
    var email=document.getElementById("email").value;
    var phone=document.getElementById("phone").value;
    try{
        carSize=document.querySelector('input[name="cardSize"]:checked').id;
    }catch{
        alert("Please select a car size");
        return;
    }
    var addon1=document.getElementById("RRB").checked;
    var addon2=document.getElementById("GPS").checked;
    var addon3=document.getElementById("CS").checked;
    try{
        duration=document.getElementById("duration").value;
        if(duration=="" || duration > 30 || duration < 1) throw "Rental duration must be between 1 and 30 days";
    }catch(err){
        alert(err);
        return;
    }
    var rateMsg="";
    var carCost=0;
    var addonsCost = 0;
    switch(carSize){
        case "Compact":
            carCost = compactRate*duration;
            rateMsg = "$"+compactRate+"/Day";
            break;
        case "Mid-size":
            carCost = midsizeRate*duration;
            rateMsg = "$"+midsizeRate+"/Day";
            break;
        case "Luxury":
            carCost = luxuryRate*duration;
            rateMsg = "$"+luxuryRate+"/Day";
            break;
        case "Van":
            carCost = vanRate*duration;
            rateMsg = "$"+vanRate+"/Day";
            break;
        case "Truck":
            carCost = vanRate*duration;
            rateMsg = "$"+vanRate+"/Day";
            break;
        default:
            carCost = 0;
            rateMsg = "Something went wrong!";
            break;
    }
    
    var output="<span class='result_name3'>Client Information:</span><br>";
    output+="<span class='result_name2'><span class='result_name4'>Full Name: </span><span>"+fname+" "+lname+"</span></span>";
    output+="<span class='result_name2'><span class='result_name4'>Address: </span><span>"+address+", "+state+"</span></span>";
    output+="<span class='result_name2'><span class='result_name4'>Email: </span><span>"+email+"</span></span>";
    output+="<span class='result_name2'><span class='result_name4'>Phone: </span><span>"+phone+"</span></span>";
    output+="<span class='result_name3'>Rental Information:</span>";
    output+="<span class='result_name2'><span class='result_name4'>"+carSize+"</span><span>"+rateMsg+"</span></span>";

    if(addon1){
        addonsCost += racRate*duration;
        output += "<span class='result_name2'><span class='result_name4'>Rack</span><span>Extra $"+racRate+"/Day</span></span>";
    }
    if(addon2){
        addonsCost += GPSRate;
        output += "<span class='result_name2'><span class='result_name4'>GPS</span><span>Extra $"+GPSRate+"</span></span>";
    }
    if(addon3){
        addonsCost += childSeatRate;
        output += "<span class='result_name2'><span class='result_name4'>Child Seat</span><span>Free</span></span>";
    }
    var totalCost = carCost + addonsCost;
    output+="<span class='result_name2'><span class='result_name4'>Duration: </span><span>"+duration+" day(s)</span></span>";
    output+="<span class='result_name2'><span class='result_name3'>Total Cost: $"+totalCost+"</span></span><br>";
    document.getElementById("print").style.display="block";
    document.getElementById("print").innerHTML=output;
    // jump to bottom of page
    window.scrollTo(0,document.body.scrollHeight);
}
