//Part B java script

var xhr = new XMLHttpRequest();

function getXMLFile() {
	//show the content div
    document.getElementById("content").style.display = "block";

    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      processXML(xhr);
    }
  };
  xhr.open("GET", "FinalQuiz.xml", true);
  xhr.send();

//   set startquiz button invisible
    document.getElementById("startquiz").style.display = "none";
}

function processXML(xhr) {
    var i;
    var output = "";
    var xmldoc = xhr.responseXML;
    var x = xmldoc.getElementsByTagName("question");
    for (i = 0; i <x.length; i++) { 
        output += "<br>" +
        x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue +
        ". " +
        x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue +
        "<br>" + 
        // add a radio button for each answer
        "<br><input type='radio' name='" + i + "' value='a'id='a"+i+"'><label for='a"+i+"'>A) " + x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue + "</label>" +
        "<br><input type='radio' name='" + i + "' value='b'id='b"+i+"'><label for='b"+i+"'>B) " + x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue + "</label>" +
        "<br><input type='radio' name='" + i + "' value='c'id='c"+i+"'><label for='c"+i+"'>C) " + x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue + "</label>" +
        "<br><input type='radio' name='" + i + "' value='d'id='d"+i+"'><label for='d"+i+"'>D) " + x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "</label>" +
        "<br>";
    }
      
  document.getElementById("parsedxml").innerHTML = output;
//   add a submit button to call gradeQuiz()
    document.getElementById("parsedxml").innerHTML += "<br><input type='button' id= 'submitB' value='Grade Quiz' onclick='gradeQuiz()'>";

}

function gradeQuiz() {
    var score = 0;
    var xmldoc = xhr.responseXML;
    var x = xmldoc.getElementsByTagName("rightanswers");
    // break the right answers into an array
    var rightAnswer = x[0].childNodes[0].nodeValue.split(",");
    var selectedAnswer = [];
    // get the user inputs
    var userAnswer = document.getElementsByTagName("input");
    // loop through the user answers
    for (var i = 0; i < userAnswer.length; i++) {
        //if the user select a button
        if (userAnswer[i].checked) {
            selectedAnswer.push(userAnswer[i].value);          
            }        
        }
    // if the user answer is correct
    if (selectedAnswer.length == rightAnswer.length) {
        for (i = 0; i < rightAnswer.length; i++) {
            if (selectedAnswer[i] == rightAnswer[i]) {
                score++;
            }
        }
        // display the score
        document.getElementById("grade").style.display = "block";
        document.getElementById("grade").innerHTML = "Grade: " + score + " / " + rightAnswer.length;
        // scroll to the grade div
        document.getElementById("grade").scrollIntoView();
    } else{
        alert("You didn't answer all the questions");
    }   

}


