// currency script

// const BTC = 1;
// const EURO = 19183.24;
// const US = 20043.53;
// const CAD = 25822.11;
// const ETH = 1042506.18;

function convert() {
//declare conversion rates
const CURRENCY = ["BTC", "EUR", "USD", "CAD", "ETH"];
const RATE = [1.0, 19183.24, 20043.53, 25822.11, 1042506.18];

//get value from input
var onHand = document.getElementById("onHand").value;
var onHandAmount = parseFloat(document.getElementById("currencyInput").value);
var changeTo = document.getElementById("convertTo").value;

//find the index of currency to find rates
var indexOnHand = CURRENCY.indexOf(onHand);
var indexChangeTo = CURRENCY.indexOf(changeTo);

//calculate out put
var ratio = RATE.at(indexOnHand) / RATE.at(indexChangeTo);
var amount = onHandAmount / ratio;
var unit = CURRENCY.at(indexChangeTo);    

//print out and format
document.getElementById("print").innerHTML = amount.toFixed(2) + unit + "(" + ratio.toFixed(3) + ":1)";    
}


