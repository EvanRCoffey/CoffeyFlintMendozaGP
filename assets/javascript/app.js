//General purpose variables

var oneUser = true;

var zipCode;
var radius;

var earliestTime;
var noTimeConstraints = false;

//onConnect variables

var maxLength;
var latestTime;

//sports API variables

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
    	$("#questionArea").html('Please enter the number of miles you\'re willing to travel:<br><input type="text" id="radius"><br><button onclick="readRadius()">Submit</button><br><br>')
    }
    else
        alert("That ain't a valid zip code!  Try again!");
}

//Pull zip code with user's location
$(document).on("click", '.zip', function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log(position);
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			console.log(lat);
			console.log(lon);
			
			var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyB5gO1fP3gEusaJcOv3dnIEiVIEIbZKALU";

	    	$.ajax({ url: queryURL, method: "GET" }).done(function(response) {
	        	//THIS NEXT LINE KEEPS CHANGING!!!
	        	zipCode = response.results["0"].address_components[6].long_name;
	        	console.log(zipCode);
	        	console.log(response);
	    	})
	    })
	    //Display the next question
    	$("#questionArea").html('Please enter the number of miles you\'re willing to travel:<br><input type="text" id="radius"><br><button onclick="readRadius()">Submit</button><br><br>')
    }
})

//Validate and populate radius variable
function readRadius() {
    var x = document.getElementById("radius").value;
    if (x >= 0 && (x % 1 === 0)) {
        radius = x;
        //Display the next question
		$("#questionArea").html('Click this button if you don\'t have any time constraints.<br><button class="noTimeConstraints">Submit</button><br><br>When are you free?<input type="range" min="0" max="24" value="0" step="0.25" class="timeEarliest" onchange="showEarliestTime(this.value)"/><span id="earliestTime">Earliest time:0</span><button class="loadEarliestTime">Submit Value</button><br><br>')
    }
    else
        alert("That ain't a valid radius!  Try again!");
}

//Load earliest available time -> Interests
$(document).on("click", '.loadEarliestTime', function() {
	//Display the next question
	$("#questionArea").html('Which of these are you in the mood for today?<br><input type="checkbox" name="interest1" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" value="Sports" checked>Sports<br><br><button class="interests">Click me!</button><br><br>')
})

//Sets noTimeConstraints to true -> Interests
$(document).on("click", '.noTimeConstraints', function() {
	noTimeConstraints = true;
	console.log(noTimeConstraints);
	//Display the next question
	$("#questionArea").html('Which of these are you in the mood for today?<br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="interests">Click me!</button><br><br>')
})

//Gets checkbox data for interests -> Sports
$(document).on("click", '.interests', function() {
	var onConnect = document.getElementById("moviesBox").checked;
	var eventful = document.getElementById("concertsBox").checked;
	var sports = document.getElementById("sportsBox").checked;
	var interests = [onConnect, eventful, sports];
	console.log(interests);
	//Display the next question
	$("#questionArea").html('What sport(s)?<br><input type="checkbox" id="baseball" name="sport1" value="Baseball" checked>Baseball<br><input type="checkbox" id="football" name="sport2" value="Football" checked>Football<br><input type="checkbox" id="basketball" name="sport3" value="Basketball" checked>Basketball<br><input type="checkbox" id="soccer" name="sport4" value="Soccer" checked>Soccer<br><input type="checkbox" id="hockey" name="sport5" value="Hockey" checked>Hockey<br><input type="checkbox" id="autoRacing" name="sport6" value="AutoRacing" checked>Auto Racing<br><input type="checkbox" id="tennis" name="sport7" value="Tennis" checked>Tennis<br><input type="checkbox" id="fighting" name="sport7" value="Fighting" checked>Fighting<br><input type="checkbox" id="sportsOthers" name="sport8" value="Others" checked>Others<br><button class="sports">Click me!</button><br><br>')
})

//Gets checkbox data for sports -> Levels
$(document).on("click", '.sports', function() {
	var sportBaseball = document.getElementById("baseball").checked;
	var sportFootball = document.getElementById("football").checked;
	var sportBasketball = document.getElementById("basketball").checked;
	var sportSoccer = document.getElementById("soccer").checked;
	var sportHockey = document.getElementById("hockey").checked;
	var sportAutoRacing = document.getElementById("autoRacing").checked;
	var sportTennis = document.getElementById("tennis").checked;
	var sportFighting = document.getElementById("fighting").checked;
	var sportOthers = document.getElementById("sportsOthers").checked;
	var sports = [sportBaseball, sportFootball, sportBasketball, sportSoccer, sportHockey, sportAutoRacing, sportTennis, sportFighting, sportOthers];
	console.log(sports);
	//Display the next question
	$("#questionArea").html('What skill level(s)?<br><input type="checkbox" name="level1" value="Amateur" checked>Amateur<br><input type="checkbox" name="level2" value="College" checked>College<br><input type="checkbox" name="level3" value="Professional" checked>Professional<br><br><button class="levels">Click me!</button><br><br>')
})

//Levels -> Ratings
$(document).on("click", '.levels', function() {
	//Display the next question
	$("#questionArea").html('What rating(s)?<br><input type="checkbox" id="rating1" value="G" checked>G<br><input type="checkbox" id="rating2" value="PG" checked>PG<br><input type="checkbox" id="rating3" value="PG13" checked>PG-13<br><input type="checkbox" id="rating4" value="R" checked>R<br><input type="checkbox" id="rating5" value="NC17" checked>NC-17<br><br><button class="ratings">Click me!</button><br><br>')
})

//Ratings -> Runtime
$(document).on("click", '.ratings', function() {
	var ratingG = document.getElementById("rating1").checked;
	var ratingPG = document.getElementById("rating2").checked;
	var ratingPG13 = document.getElementById("rating3").checked;
	var ratingR = document.getElementById("rating4").checked;
	var ratingNC17 = document.getElementById("rating5").checked;
	var ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17];
	console.log(ratings)
	//Display the next question
	$("#questionArea").html('Maximum runtime?<br><input type="range" min="90" max="240" value="0" step="15" class="timeRun" onchange="showRunTime(this.value)"/><span id="runTime">Maximum runtime:90 minutes</span><button class="loadRunTime">Submit Value</button><br><br>')
})

//Runtime -> Genres
$(document).on("click", '.loadRunTime', function() {
	//Display the next question
	$("#questionArea").html('What genre(s)?<br><input type="checkbox" id="genre1" value="Action" checked>Action<br><input type="checkbox" id="genre2" value="Comedy" checked>Comedy<br><input type="checkbox" id="genre3" value="Romance" checked>Romance<br><input type="checkbox" id="genre4" value="Horror" checked>Horror<br><input type="checkbox" id="genre5" value="Family" checked>Family<br><input type="checkbox" id="genre6" value="Drama" checked>Drama<br><input type="checkbox" id="genre7" value="Scifi" checked>Sci-Fi<br><input type="checkbox" id="genre8" value="Others" checked>Others<br><br><button class="genres">Click me!</button><br><br>')
})

//Genres -> Endtime
$(document).on("click", '.genres', function() {
	var genreAction = document.getElementById("genre1").checked;
	var genreComedy = document.getElementById("genre2").checked;
	var genreRomance = document.getElementById("genre3").checked;
	var genreHorror = document.getElementById("genre4").checked;
	var genreFamily = document.getElementById("genre5").checked;
	var genreDrama = document.getElementById("genre6").checked;
	var genreScifi = document.getElementById("genre7").checked;
	var genreOthers = document.getElementById("genre8").checked;
	var genres = [genreAction, genreComedy, genreRomance, genreHorror, genreFamily, genreDrama, genreScifi];
	console.log(genres);
	//Display the next question
	$("#questionArea").html('Need to be done by a certain time?<input type="range" min="0" max="24" value="0" step="0.25" class="timeEnd" onchange="showEndTime(this.value)"/><span id="endTime">Endtime:0</span><button class="loadEndTime">Submit Value</button><br><br>')
})

//Endtime -> All done
$(document).on("click", '.loadEndTime', function() {
	//All done!
	$("#questionArea").html('Done!')
})

//Displays current value of slidebars
function showEndTime(newValue) {
	document.getElementById("endTime").innerHTML="Endtime: " + newValue;
}
function showRunTime(newValue) {
	document.getElementById("runTime").innerHTML="Maximum runtime: " + newValue + " minutes";
}
function showEarliestTime(newValue) {
	document.getElementById("earliestTime").innerHTML="Earliest time: " + newValue;
}

//[DO ALL YOUR API/JSON STUFF HERE, POPULATE VARIABLES]

//[DISPLAY ALL RESULTS]

/*
<!--Radius entry-->
Please enter the number of miles you're willing to travel:<br>
<input type="text" id="radius"><br>
<button onclick="readRadius()">Submit</button><br><br>

<!--No time constraints entry-->
Click this button if you don't have any time constraints.<br>
<button class="noTimeConstraints">Submit</button><br><br>

<!--Earliest time entry-->
When are you free?
<input type="range" min="0" max="24" value="0" step="0.25" class="timeEarliest" onchange="showEarliestTime(this.value)" />
<span id="earliestTime">Earliest time: 0</span>
<button class="loadEarliestTime">Submit Value</button><br><br>

<!--Interests entry-->
Which of these are you in the mood for today?<br>
<input type="checkbox" name="interest1" value="Movies" checked>Movies<br>
<input type="checkbox" name="interest2" value="Concerts" checked>Concerts<br>
<input type="checkbox" name="interest3" value="Sports" checked>Sports<br><br>
<button class="interests">Click me!</button><br><br>

<!--Ratings entry-->
What rating(s)?<br>
<input type="checkbox" name="rating1" value="G" checked>G<br>
<input type="checkbox" name="rating2" value="PG" checked>PG<br>
<input type="checkbox" name="rating3" value="PG13" checked>PG-13<br>
<input type="checkbox" name="rating4" value="R" checked>R<br>
<input type="checkbox" name="rating5" value="NC17" checked>NC-17<br><br>
<button class="ratings">Click me!</button><br><br>

<!--Maximum runtime entry-->
Maximum runtime?<br>
<input type="range" min="90" max="240" value="0" step="15" class="timeRun" onchange="showRunTime(this.value)" />
<span id="runTime">Maximum runtime: 90 minutes</span>
<button class="loadRunTime">Submit Value</button><br><br>

<!--Endtime entry-->
Need to be done by a certain time? 
<input type="range" min="0" max="24" value="0" step="0.25" class="timeEnd" onchange="showEndTime(this.value)" />
<span id="endTime">Endtime: 0</span>
<button class="loadEndTime">Submit Value</button><br><br>

<!--Genres entry-->
What genre(s)?<br>
<input type="checkbox" name="genre1" value="Action" checked>Action<br>
<input type="checkbox" name="genre2" value="Comedy" checked>Comedy<br>
<input type="checkbox" name="genre3" value="Romance" checked>Romance<br>
<input type="checkbox" name="genre4" value="Horror" checked>Horror<br>
<input type="checkbox" name="genre5" value="Family" checked>Family<br>
<input type="checkbox" name="genre6" value="Drama" checked>Drama<br>
<input type="checkbox" name="genre7" value="Scifi" checked>Sci-Fi<br>
<input type="checkbox" name="genre8" value="Others" checked>Others<br><br>
<button class="genres">Click me!</button><br><br>

<!--Skill levels entry-->
What skill level(s)?<br>
<input type="checkbox" name="level1" value="Amateur" checked>Amateur<br>
<input type="checkbox" name="level2" value="College" checked>College<br>
<input type="checkbox" name="level3" value="Professional" checked>Professional<br><br>
<button class="levels">Click me!</button><br><br>

<!--Sports entry-->
What sport(s)?<br>
<input type="checkbox" id="baseball" name="sport1" value="Baseball" checked>Baseball<br>
<input type="checkbox" id="football" name="sport2" value="Football" checked>Football<br>
<input type="checkbox" id="basketball" name="sport3" value="Basketball" checked>Basketball<br>
<input type="checkbox" id="soccer" name="sport4" value="Soccer" checked>Soccer<br>
<input type="checkbox" id="hockey" name="sport5" value="Hockey" checked>Hockey<br>
<input type="checkbox" id="autoRacing" name="sport6" value="AutoRacing" checked>Auto Racing<br>
<input type="checkbox" id="tennis" name="sport7" value="Tennis" checked>Tennis<br>
<input type="checkbox" id="fighting" name="sport7" value="Fighting" checked>Fighting<br>
<input type="checkbox" id="sportsOthers" name="sport8" value="Others" checked>Others<br>
<button class="sports">Click me!</button><br><br>

*/