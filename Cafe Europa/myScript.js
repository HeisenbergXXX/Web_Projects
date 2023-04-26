onload=getDnT;

function getDnT(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("dtfield").innerHTML = today.toDateString();
    document.getElementById('timefield').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(getDnT, 1000);
}

function checkTime(i) {
if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
return i;
}

function printDetail(){
    const RATES = [12, 12.5, 13, 8.5, 9.5, 10, 2, 2.5, 1.75];

    var printout = "";
    var nameF = document.orderform.fname.value;
    var nameL = document.orderform.lname.value;
    var phoneNum = document.orderform.phone.value;
    var pickTime = document.orderform.uptime.value;
    var msg = "Thank you " + nameF +" for using our online ordering form<br>Here's your order detail:";
    var orderMsg ="";
    var total = 0;    
    var i;
    for(i=0; i<9; i++){
      var input = parseInt(document.getElementById(i).value);
      var item = document.getElementById(i+10).textContent;
      if(input > 0){
        total += input * RATES[i];  
        orderMsg += "<span class='purchase-item'><span>" + input + "x   " + item + "</span><span class='price'>$" + (input * RATES[i]).toFixed(2) + "</span></span>";  
      }
    }
  
    printout = 
      "<br>" +
      msg +
      "<br><br>" +
      nameF +" "+ nameL +
      "<br>" +
      phoneNum +
      "<br>Pickup: " +
      pickTime +
      "<br><br>" +
      orderMsg +
      "<br>" +
      "Total Cost:  $" +
      total;

  
    document.getElementById("out").innerHTML = printout; 
    
}
    
