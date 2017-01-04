//General purpose variables

var oneUser = true;

var zipCode;
var radius;

var earliestTime;
var noTimeConstraints = false;

var sports = false;
var onConnect = false;
var eventful = false;

//onConnect variables

var maxLength;
var latestTime;

var ratingG = false;
var ratingPG = false;
var ratingPG13 = false;
var ratingR = false;
var ratingNC17 = false;
var ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17];

var genreAction = false;
var genreComedy = false;
var genreRomance = false;
var genreHorror = false;
var genreFamily = false;
var genreDrama = false;
var genreScifi = false;
var genreOthers = false;
var genres = [genreAction, genreComedy, genreRomance, genreHorror, genreFamily, genreDrama, genreScifi];

//sports API variables

var sportBaseball = false;
var sportFootball = false;
var sportBasketball = false;
var sportSoccer = false;
var sportHockey = false;
var sportAutoRacing = false;
var sportTennis = false;
var sportFighting = false;
var sportOthers = false;
var sports = [sportBaseball, sportFootball, sportBasketball, sportSoccer, sportHockey, sportAutoRacing, sportTennis, sportFighting];

var sportAmateur = false;
var sportCollege = false;
var sportProfessional = false;
var levels = [sportAmateur, sportCollege, sportProfessional];

//Functions

function readZipCode() {
    var x = document.getElementById("zipCode").value;
	var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(x);
    if (isValid) {
        zipCode = x;
        //Display the next question
    	//$("#questionArea").html('Next question goes here.')
    }
    else
        alert("That ain't a valid zip code!  Try again!");
}

function readRadius() {
    var x = document.getElementById("radius").value;
    if (x >= 0 && (x % 1 === 0)) {
        radius = x;
        //Display the next question
    	//$("#questionArea").html('Next question goes here.')
    }
    else
        alert("That ain't a valid radius!  Try again!");
}

//Displays current value of slidebar
function showEndTime(newValue) {
	document.getElementById("endTime").innerHTML=newValue;
}

//Displays current value of slidebar
function showRunTime(newValue) {
	document.getElementById("runTime").innerHTML=newValue;
}

//Displays current value of slidebar
function showEarliestTime(newValue) {
	document.getElementById("earliestTime").innerHTML=newValue;
}

function noTimeConstraints() {
	noTimeConstraints=true;
}

/*

[DO ALL YOUR API/JSON STUFF HERE, POPULATE VARIABLES]

[DISPLAY ALL RESULTS]

*/