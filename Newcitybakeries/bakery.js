//Bakery script

const baseRound = 15;
const baseSheet = 18;
const icing = 5;
const almonds = 7;
const jam = 4;
const extra = 0.02;
const addLayer = 0.5;
const minSheet = 30*30;
const minRound = 15*15*3.14;

function setVisibility(value){
    if (value==1) {
        document.getElementById("sheet-width").style.display="inline";
        document.getElementById("sheet-length").style.display="inline";
        document.getElementById("sheet-width").style.visibility="visible";
        document.getElementById("sheet-length").style.visibility="visible";
        document.getElementById("radius").style.display="none";
    }
    if (value==2) {
        document.getElementById("sheet-width").style.display="none";
        document.getElementById("sheet-length").style.display="none";
        document.getElementById("radius").style.display="inline";
        document.getElementById("radius").style.visibility="visible";
    }
}

function printInfo(){
    var width = document.getElementById("sheet-width").value;
    var height = document.getElementById("sheet-length").value;
    var radius = document.getElementById("radius").value;
    var sheetArea = width*height;
    var roundArea = Math.pow(radius, 2)*3.14;
    var layerNum = document.querySelector('input[name="layers"]:checked').value;
    var cakeMsg = "";
    var sizeMsg = "";
    var cakeCost = 0;
    var total = 0;
    var msg = "";
    var msgPrice = "";
    var msgTotal = "";

    if(document.getElementById('sheetcake').checked){
        cakeMsg = "Sheet cake ";
        sizeMsg =  width + "cm x " + height + "cm";
        cakeCost = (baseSheet + (sheetArea - minSheet)*extra)*(1 + (layerNum - 1)*addLayer);
    }
    else{
        cakeMsg = "Round cake ";
        sizeMsg = radius + "cm";
        cakeCost = (baseRound + (roundArea - minRound)*extra)*(1 + (layerNum - 1)*addLayer);
    }

    var s = "";
    if(layerNum == 1){
        s = " layer";
    }
    else{
        s = " layers";
    }

    var msgWords = cakeMsg + sizeMsg + " with " + layerNum + s + ":";
    total += cakeCost;
    msgPrice = "<span class='notes'><span>"+ msgWords +"</span><span class='price'>$"+ cakeCost.toFixed(2) +"</span></span>";

    var checkbox1 = document.getElementById("icing");
    var checkbox2 = document.getElementById("almonds");
    var checkbox3 = document.getElementById("jam");
    if(checkbox1.checked){
        total += icing;
        msg += "<span class='notes'><span>"+ "Cream Cheese icing" +"</span><span class='price'>$"+ icing +"</span></span>";
    }
    if(checkbox2.checked){
        total += almonds;
        msg += "<span class='notes'><span>"+ "Fruit and Almonds topping" +"</span><span class='price'>$"+ almonds +"</span></span>";
    }
    if(checkbox3.checked){
        total += jam;
        msg += "<span class='notes'><span>"+ "Fruit jam filling" +"</span><span class='price'>$"+ jam +"</span></span>";
    }

    msgTotal = "<span class='notes'><span>"+ "Total: " +"</span><span class='price'>$"+ total.toFixed(2) +"</span></span>";

    document.getElementById("print").innerHTML = 
    "<span>"+ document.getElementById("fname").value + " " + document.getElementById("lname").value + "</span>" +
    "<span>"+ document.getElementById("address").value +"</span>" +
    "<span>"+ document.getElementById("postalcode").value +"</span>" +
    "<span>"+ document.getElementById("phone").value +"</span>" +
    "<span>"+ document.getElementById("email").value +"</span>" +
    "<br><span>"+ "Your order:" +"</span><br>" +
    msgPrice +
    msg +
    msgTotal;    
}




