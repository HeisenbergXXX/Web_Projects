function printDetail() {
  const VHAMP = 30;
  const FHAMP = 20;
  const CHK = 7;
  const PORK = 5;

  var msg = "Thank you for using the online ordering form";
  var printout = "";
  var date = document.orderDetail.date.value;
  var name = document.orderDetail.name.value;
  var address = document.orderDetail.address.value;
  var postal = document.orderDetail.postalcode.value;
  var phone = document.orderDetail.phone.value;
  var email = document.orderDetail.email.value;
  var isPickup = document.getElementById("pickup").checked;
  var isDelivery = document.getElementById("deliver").checked;
  var orderMsg = "";
  var vegetableTotal;
  if (Vegetable.value > 0) {
    vegetableTotal =
      parseInt(document.getElementById("Vegetable").value) * VHAMP;
    orderMsg += Vegetable.value + " x Vegetable Hamper<br>";
  } else {
    vegetableTotal = 0;
  }

  var fruitTotal;
  if (Fruit.value > 0) {
    fruitTotal = parseInt(document.getElementById("Fruit").value) * FHAMP;
    orderMsg += Fruit.value + " x Fruit Hamper<br>";
  } else {
    fruitTotal = 0;
  }

  var chickenTotal;
  if (Chicken.value > 0) {
    chickenTotal = parseInt(document.getElementById("Chicken").value) * CHK;
    orderMsg += Chicken.value + " x Fresh Chicken<br>";
  } else {
    chickenTotal = 0;
  }

  var porkTotal;
  if (Pork.value > 0) {
    porkTotal = parseFloat(document.getElementById("Pork").value) * PORK;
    orderMsg += Pork.value + " kg Pork";
  } else {
    porkTotal = 0;
  }

  var total = vegetableTotal + fruitTotal + chickenTotal + porkTotal;
  var method = "";
  if (isPickup) {
    method = "Pick up";
  } else if (isDelivery) {
    method = "Delivery";
  }

  printout =
    "<br>" +
    msg +
    "<br><br>" +
    // date +
    // "<br>" +
    name +
    "<br>" +
    address +
    // postal +
    "<br>" +
    // phone +
    // "<br>" +
    // email +
    method +
    "<br><br>" +
    "Order Details:" +
    "<br><br>" +
    orderMsg +
    "<br><br>" +
    "Total: $" +
    total.toFixed(2) +
    "<br><br>";

  document.getElementById("details").innerHTML = printout;
}
