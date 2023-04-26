// Lab7 script file

//global variables

var customerlist = []; //array
var indexvalue = 0; //used as global for modifyItem

function addToArray() {
  //read items from form and create client object
  var customer = {
    lname,
    fname,
    address,
    postalcodes,
    phone,
    email
  };
  //input variables into clientobject
  customer.lname = document.getElementById("lname").value;
  customer.fname = document.getElementById("fname").value;
  customer.address = document.getElementById("address").value;
  customer.postalcodes = document.getElementById("postalcodes").value;
  customer.phone = document.getElementById("phone").value;
  customer.email = document.getElementById("email").value;
  
  customerlist.push(customer);

  displayList(); //display object array
  document.getElementById("Application").reset();
}

function displayList() {
  //variables
  var clientlist = "&nbsp;"; //this will be the list of elements in the array list
  var displayRadiobuttons = ""; //display elements as a list of radio buttons

  for (var i = 0; i < customerlist.length; i++)
  {
    //local instance of clientobject
    var customer = {
      lname,
      fname,
      address,
      postalcodes,
        phone,
        email
    };
    customer = customerlist[i];
    clientlist = "      " +
      customer.lname +
      ", " +
      customer.fname +
      ", " +
      customer.address +
      ", " +
      customer.postalcodes +
        ", " +
        customer.phone +
        ", " +
        customer.email;
    //create radio button tags and elements
    displayRadiobuttons += "<input type=radio class=listitem ";
    displayRadiobuttons += " value=" + i + " ";
    displayRadiobuttons += " onChange=deleteCustomer(this.value)>";
    displayRadiobuttons += clientlist + "<br>";
  }
  //display list
  document.getElementById("print").innerHTML = displayRadiobuttons;
}

function deleteCustomer() {
  //delete customer from array
  customerlist.splice(indexvalue, 1);
  displayList(); //display object array
}


