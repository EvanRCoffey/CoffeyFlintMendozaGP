var noTimeConstraints = false;
var earliestTime;

//ALL GENRE STUFF

var genreAction = false;
var genreComedy = false;
var genreRomance = false;
var genreHorror = false;
var genreFamily = false;
var genreDrama = false;
var genreScifi = false;
var genreOthers = false;
var genres = [genreAction, genreComedy, genreRomance, genreHorror, genreFamily, genreDrama, genreScifi, genreOthers];

//ALL ENDTIME STUFF

var latestTime;
var noCurfew = false;


//ALL LEVELS STUFF

var sportAmateur = false;
var sportCollege = false;
var sportProfessional = false;
var levels = [sportAmateur, sportCollege, sportProfessional];



//Genres -> Endtime
$(document).on("click", '.genres', function() {
	genreAction = document.getElementById("genre1").checked;
	genreComedy = document.getElementById("genre2").checked;
	genreRomance = document.getElementById("genre3").checked;
	genreHorror = document.getElementById("genre4").checked;
	genreFamily = document.getElementById("genre5").checked;
	genreDrama = document.getElementById("genre6").checked;
	genreScifi = document.getElementById("genre7").checked;
	genreOthers = document.getElementById("genre8").checked;
	genres = [genreAction, genreComedy, genreRomance, genreHorror, genreFamily, genreDrama, genreScifi, genreOthers];
	console.log(genres);
	//Display the next question
	$("#questionArea").html('Click this button if you don\'t care how late you\'ll be at the theater. <button class="noCurfew">No curfew for me!</button><br><br>Need to be done by a certain time?<input type="range" min="0" max="23.75" value="0" step="0.25" class="timeEnd" onchange="showEndTime(this.value)"/><span id="endTime">Endtime: 12:00 AM </span><button class="loadEndTime">Submit</button><br><br>')
})

//Sets noCurfew to true -> Multiple users?
$(document).on("click", '.noCurfew', function() {
	noCurfew = true;
	console.log("No curfew = " + noCurfew);
	//Display the next question
	$("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="onlyOneUser">Results!  Now!</button><br><br><button class="anotherUser">Another user</button>')
})

//Endtime -> Multiple users?
$(document).on("click", '.loadEndTime', function() {
	latestTime = $(".timeEnd").val();
	console.log("Latest time = " + convertToTime(latestTime));
	//Results
	$("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="onlyOneUser">Results!  Now!</button><br><br><button class="anotherUser">Another user</button>')
})









//Levels -> Ratings
$(document).on("click", '.levels', function() {
	sportAmateur = document.getElementById("level1").checked;
	sportCollege = document.getElementById("level2").checked;
	sportProfessional = document.getElementById("level3").checked;
	levels = [sportAmateur, sportCollege, sportProfessional];
	console.log(levels);

	//Either move on to movies, or go to multiple users
	if(onConnect) {
		//Display the first movies question
		$("#questionArea").html('Okay.  Here are a few questions about movies.  What rating(s) are you okay with?<br><input type="checkbox" id="rating1" value="G" checked>G<br><input type="checkbox" id="rating2" value="PG" checked>PG<br><input type="checkbox" id="rating3" value="PG13" checked>PG-13<br><input type="checkbox" id="rating4" value="R" checked>R<br><input type="checkbox" id="rating5" value="NC17" checked>NC-17<br><br><button class="ratings">Submit</button><br><br>')
	}
	else {
		//Multiple users?
		$("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<button class="onlyOneUser">Results!  Now!</button><button class="anotherUser">Results!  Now!</button>')
		console.log("No info for movies.")
	}
})







//Load earliest available time -> Interests
$(document).on("click", '.loadEarliestTime', function() {
	earliestTime = $(".timeEarliest").val();
	console.log("Earliest available time = " + convertToTime(earliestTime));
	//Display the next question
	$("#questionArea").html('Which of these can we help you find today?<br><br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="interests">Submit</button><br><br>')
})