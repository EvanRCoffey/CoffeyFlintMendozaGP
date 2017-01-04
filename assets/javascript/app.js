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

//Validate and populate zip code variable
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

//Validate and populate radius variable
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

//Displays current value of endTime slidebar
function showEndTime(newValue) {
	document.getElementById("endTime").innerHTML="Endtime: " + newValue;
}

//Displays current value of runTime slidebar
function showRunTime(newValue) {
	document.getElementById("runTime").innerHTML="Maximum runtime: " + newValue + " minutes";
}

//Displays current value of earliestTime slidebar
function showEarliestTime(newValue) {
	document.getElementById("earliestTime").innerHTML="Earliest time: " + newValue;
}



//[DO ALL YOUR API/JSON STUFF HERE, POPULATE VARIABLES]

//[DISPLAY ALL RESULTS]



//[vvv---jQuery for Questions---vvv]

//Zip code manual entry AND button to pull zip
//$("#questionArea").html('Please enter your zip code:<br><input type="text" id="zipCode"><br><button onclick="readZipCode()">Submit</button><br><br>OR let us find your location by clicking this button:<br><button class="zip">Get ZIP</button><br><br><script type="text/javascript">')

//Radius entry
//$("#questionArea").html('Please enter the number of miles you\'re willing to travel:<br><input type="text" id="radius"><br><button onclick="readRadius()">Submit</button><br><br>')

//No time constraints entry AND earliest time entry
//$("#questionArea").html('<p id="noTimeConstraints">Click this text if you don\'t have any time constraints.<br><br></p>When are you free?<input type="range" min="0" max="24" value="0" step="0.25" onchange="showEarliestTime(this.value)"/><span id="earliestTime">Earliest time:0</span><button onclick="loadValue(this.value)">Submit Value</button><br><br>')

//Interests entry
//$("#questionArea").html('Which of these are you in the mood for,today?<br><input type="checkbox" name="interest1" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" value="Sports" checked>Sports<br><br>')

//Ratings entry
//$("#questionArea").html('What rating(s)?<br><input type="checkbox" name="rating1" value="G" checked>G<br><input type="checkbox" name="rating2" value="PG" checked>PG<br><input type="checkbox" name="rating3" value="PG13" checked>PG-13<br><input type="checkbox" name="rating4" value="R" checked>R<br><input type="checkbox" name="rating5" value="NC17" checked>NC-17<br><br>')

//Maximum runtime entry
//$("#questionArea").html('Maximum runtime?<br><input type="range" min="90" max="240" value="0" step="15" onchange="showRunTime(this.value)"/><span id="runTime">Maximum runtime:90 minutes</span><button onclick="loadValue(this.value)">Submit Value</button><br><br>')

//Endtime entry
//$("#questionArea").html('Need to be done by a certain time?<input type="range" min="0" max="24" value="0" step="0.25" onchange="showEndTime(this.value)"/><span id="endTime">Endtime:0</span><button onclick="loadValue(this.value)">Submit Value</button><br><br>')

//Genres entry
//$("#questionArea").html('What genre(s)?<br><input type="checkbox" name="genre1" value="Action" checked>Action<br><input type="checkbox" name="genre2" value="Comedy" checked>Comedy<br><input type="checkbox" name="genre3" value="Romance" checked>Romance<br><input type="checkbox" name="genre4" value="Horror" checked>Horror<br><input type="checkbox" name="genre5" value="Family" checked>Family<br><input type="checkbox" name="genre6" value="Drama" checked>Drama<br><input type="checkbox" name="genre7" value="Scifi" checked>Sci-Fi<br><input type="checkbox" name="genre8" value="Others" checked>Others<br><br>')

//Skill levels entry
//$("#questionArea").html('What skill level(s)?<br><input type="checkbox" name="level1" value="Amateur" checked>Amateur<br><input type="checkbox" name="level2" value="College" checked>College<br><input type="checkbox" name="level3" value="Professional" checked>Professional<br><br>')

//Sports entry entry
//$("#questionArea").html('What sport(s)?<br><input type="checkbox" name="sport1" value="Baseball" checked>Baseball<br><input type="checkbox" name="sport2" value="Football" checked>Football<br><input type="checkbox" name="sport3" value="Basketball" checked>Basketball<br><input type="checkbox" name="sport4" value="Soccer" checked>Soccer<br><input type="checkbox" name="sport5" value="Hockey" checked>Hockey<br><input type="checkbox" name="sport6" value="AutoRacing" checked>Auto Racing<br><input type="checkbox" name="sport7" value="Tennis" checked>Tennis<br><input type="checkbox" name="sport7" value="Fighting" checked>Fighting<br><input type="checkbox" name="sport8" value="Others" checked>Others<br>')