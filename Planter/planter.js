//planter script

//cents per cm^3
const cubePrice = 1;
const cylinderPrice = 12;
const spherePrice = 15;
const conePrice = 2;

function getConeHtml() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("display").innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "cone.html", true);
    xhr.send();
}

function getCylinderHtml() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("display").innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "cylinders.html", true);
    xhr.send();
}

function getSphereHtml() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("display").innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "spherical.html", true);
    xhr.send();
}

function getCubeHtml() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("display").innerHTML = xhr.responseText;
      }
    };
    xhr.open("GET", "square.html", true);
    xhr.send();
}

function printInfo(type){
    var V = 0;
    var typeOfPlt = "";
    var DnV = "";
    var cost = "";
switch(type){
    case "cone":
        var r1 = document.getElementById("r1").value;
        var r2 = document.getElementById("r2").value;
        var height = document.getElementById("cone-h").value;
        V = (Math.PI*(Math.pow(r1, 2)+r1*r2+Math.pow(r2, 2))*height/3).toFixed(2);
        typeOfPlt = "Truncated Cone (r1 x r2 x h)" + " at $" + conePrice + " / cm^3";
        DnV = r1 + "x" + r2 + "x"+ height + "cm, " + V + "cm^3";
        cost = (V*conePrice/1000).toFixed(2);
        break;
    case "cylinder":
        var r = document.getElementById("r").value;
        var height = document.getElementById("cylinder-h").value;
        V = (Math.PI*Math.pow(r, 2)*height).toFixed(2);
        typeOfPlt = "Flat Btm Cylinder (r x h)" + " at $" + cylinderPrice + " / cm^3";
        DnV = r + "x"+ height + "cm, " +  V + "cm^3";
        cost = (V*cylinderPrice/1000).toFixed(2);
        break;
    case "sphere":
        var r = document.getElementById("sphere-r").value;
        V = (2/3*Math.PI*Math.pow(r, 3)).toFixed(2);
        typeOfPlt = "Half Sphere (r)" + " at $" + spherePrice + " / cm^3";
        DnV = r + "cm, " + V + "cm^3";
        cost = (V*spherePrice/1000).toFixed(2);
        break;
    case "cube":
        var l = document.getElementById("l").value;
        var w = document.getElementById("w").value;
        var h = document.getElementById("h").value;
        V = (l*w*h).toFixed(2);
        typeOfPlt = "Cube (L x w x h)" + " at $" + cubePrice + " / cm^3";
        DnV = l + "x" + w + "x"+ h + "cm, " +  V + "cm^3";
        cost = (V*cubePrice/1000).toFixed(2);
        break;
}

    document.getElementById("print").innerHTML = 
    "<span>Customer Name: "+ document.getElementById("name").value + "</span><br>" +
    "<span>Address: "+ document.getElementById("address").value +"</span><br>" +
    "<span>Postal Code: "+ document.getElementById("postal").value +"</span>" +
    "<br><br>" +
    "Type of Planter: " + typeOfPlt +
    "<br>Dimensions and Volume: " + DnV +
    "<br>Total Cost: $" + cost; 
}