//Variables to be populated no matter what

var oneUser = true;
var noTimeConstraints = false;
var noMaxRuntime = false;
var zipCode;
var radius;
var earliestTime;

var onConnect = false;
var eventful = false;
var sports = false;
var interests = [onConnect, eventful, sports];

//If user is interested in sports, populate these variables

var sportAmateur = false;
var sportCollege = false;
var sportProfessional = false;
var levels = [sportAmateur, sportCollege, sportProfessional];

var sportBaseball = false;
var sportFootball = false;
var sportBasketball = false;
var sportSoccer = false;
var sportHockey = false;
var sportAutoRacing = false;
var sportTennis = false;
var sportFighting = false;
var sportOthers = false;
var sports = [sportBaseball, sportFootball, sportBasketball, sportSoccer, sportHockey, sportAutoRacing, sportTennis, sportFighting, sportOthers];

//If user is interested in movies, populate these variables

var genreAction = false;
var genreComedy = false;
var genreRomance = false;
var genreHorror = false;
var genreFamily = false;
var genreDrama = false;
var genreScifi = false;
var genreOthers = false;
var genres = [genreAction, genreComedy, genreRomance, genreHorror, genreFamily, genreDrama, genreScifi, genreOthers];

var ratingG = false;
var ratingPG = false;
var ratingPG13 = false;
var ratingR = false;
var ratingNC17 = false;
var ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17];

var latestTime;
var maxLength;
var noCurfew = false;

//Validate and populate zip code variable
function readZipCode() {
    var x = document.getElementById("zipCode").value;
    var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(x);
    if (isValid) {
        zipCode = x;
        console.log("Zip code = " + zipCode);
        //Display the next question
        $("#questionArea").html('How far are you willing to travel?<br><input type="range" min="1" max="100" value="1" step="1" class="radius" onchange="showRadius(this.value)"/><span id="radiusSlidebar">I\'m willing to travel: 1 mile </span><button class="loadRadiusSlidebar">Submit</button><br><br>')
    }
    else
        $("#questionArea").html('Please enter your zip code:<br><input type="text" id="zipCode"><br><button onclick="readZipCode()">Submit</button><br><br>That ain\'t a valid zip code!  Try again, or let us find your location <br><button class="zip"> Get ZIP </button><br><br>')
}

//Pull zip code with user's location
$(document).on("click", '.zip', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyB5gO1fP3gEusaJcOv3dnIEiVIEIbZKALU";

            $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
                for (var i = 0; i < response.results[0].address_components.length; i++) {
                    if (response.results[0].address_components[i].types[0] === "postal_code") {
                        zipCode = response.results[0].address_components[i].long_name
                        console.log("Zip code = " + zipCode);
                    }
                }
            })
        })
        //Display the next question
        $("#questionArea").html('How far are you willing to travel?<br><input type="range" min="1" max="100" value="1" step="1" class="radius" onchange="showRadius(this.value)"/><span id="radiusSlidebar">I\'m willing to travel: 1 mile </span><button class="loadRadiusSlidebar">Submit</button><br><br>')
    }
})

//Load travel radius from slide bar -> Interests
$(document).on("click", '.loadRadiusSlidebar', function() {
    radius = $(".radius").val();
    console.log("Willing to travel " + radius + " miles");
    //Display the next question
    $("#questionArea").html('Click this button if you don\'t have any time constraints. <button class="noTimeConstraints">I\'m free now!</button><br><br>Not available until later?  When will you be free?<input type="range" min="0" max="23.75" value="0" step="0.25" class="timeEarliest" onchange="showEarliestTime(this.value)"/><span id="earliestTime">Earliest available time: 12:00 AM </span><button class="loadEarliestTime">Submit</button><br><br>')
})

//Load earliest available time -> Interests
$(document).on("click", '.loadEarliestTime', function() {
    earliestTime = $(".timeEarliest").val();
    console.log("Earliest available time = " + convertToTime(earliestTime));
    //Display the next question
    $("#questionArea").html('Which of these can we help you find today?<br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="interests">Submit</button><br><br>')
})

//Sets noTimeConstraints to true -> Interests
$(document).on("click", '.noTimeConstraints', function() {
    noTimeConstraints = true;
    console.log("No time constraints = " + noTimeConstraints);
    //Display the next question
    $("#questionArea").html('Which of these can we help you find today?<br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="interests">Submit</button><br><br>')
})

//Gets checkbox data for interests -> Sports
$(document).on("click", '.interests', function() {
    onConnect = document.getElementById("moviesBox").checked;
    eventful = document.getElementById("concertsBox").checked;
    sports = document.getElementById("sportsBox").checked;
    interests = [onConnect, eventful, sports];
    console.log(interests);

    if (sports) {
        //Display the first sports question
        $("#questionArea").html('Okay.  Let\'s start with some questions about sports.  What sport(s) are you okay with?<br><input type="checkbox" id="baseball" name="sport1" value="Baseball" checked>Baseball<br><input type="checkbox" id="football" name="sport2" value="Football" checked>Football<br><input type="checkbox" id="basketball" name="sport3" value="Basketball" checked>Basketball<br><input type="checkbox" id="soccer" name="sport4" value="Soccer" checked>Soccer<br><input type="checkbox" id="hockey" name="sport5" value="Hockey" checked>Hockey<br><input type="checkbox" id="autoRacing" name="sport6" value="AutoRacing" checked>Auto Racing<br><input type="checkbox" id="tennis" name="sport7" value="Tennis" checked>Tennis<br><input type="checkbox" id="fighting" name="sport7" value="Fighting" checked>Fighting<br><input type="checkbox" id="sportsOthers" name="sport8" value="Others" checked>Others<br><br><button class="sports">Submit</button><br><br>')
    }
    else if(onConnect) {
        //Display the first movies question
        $("#questionArea").html('Okay.  Here are a few questions about movies.  What rating(s) are you okay with?<br><input type="checkbox" id="rating1" value="G" checked>G<br><input type="checkbox" id="rating2" value="PG" checked>PG<br><input type="checkbox" id="rating3" value="PG13" checked>PG-13<br><input type="checkbox" id="rating4" value="R" checked>R<br><input type="checkbox" id="rating5" value="NC17" checked>NC-17<br><br><button class="ratings">Submit</button><br><br>')
        console.log("No info for sports.");
    }
    else {
        //Multiple users?
        $("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<button class="onlyOneUser">Results!  Now!</button><button class="anotherUser">Results!  Now!</button>')
        console.log("No info for movies or sports.");
    }
})

//Gets checkbox data for sports -> Levels
$(document).on("click", '.sports', function() {
    sportBaseball = document.getElementById("baseball").checked;
    sportFootball = document.getElementById("football").checked;
    sportBasketball = document.getElementById("basketball").checked;
    sportSoccer = document.getElementById("soccer").checked;
    sportHockey = document.getElementById("hockey").checked;
    sportAutoRacing = document.getElementById("autoRacing").checked;
    sportTennis = document.getElementById("tennis").checked;
    sportFighting = document.getElementById("fighting").checked;
    sportOthers = document.getElementById("sportsOthers").checked;
    sports = [sportBaseball, sportFootball, sportBasketball, sportSoccer, sportHockey, sportAutoRacing, sportTennis, sportFighting, sportOthers];
    console.log(sports);
    //Display the next question
    $("#questionArea").html('What skill level(s) are you okay with?<br><input type="checkbox" id="level1" value="Amateur" checked>Amateur<br><input type="checkbox" id="level2" value="College" checked>College<br><input type="checkbox" id="level3" value="Professional" checked>Professional<br><br><button class="levels">Submit</button><br><br>')
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

//Ratings -> Runtime
$(document).on("click", '.ratings', function() {
    ratingG = document.getElementById("rating1").checked;
    ratingPG = document.getElementById("rating2").checked;
    ratingPG13 = document.getElementById("rating3").checked;
    ratingR = document.getElementById("rating4").checked;
    ratingNC17 = document.getElementById("rating5").checked;
    ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17];
    console.log(ratings)
    //Display the next question
    $("#questionArea").html('Click this button if you don\'t care how long your movie is. <button class="noMaxRuntime">Any length is fine!</button><br><br>Or, would you like to set a maximum runtime?<br><input type="range" min="90" max="240" value="0" step="5" class="timeRun" onchange="showRunTime(this.value)"/><span id="runTime">Maximum runtime: 90 minutes </span><button class="loadRunTime">Submit</button><br><br>')
})

//Sets noMaxRuntime to true -> Genres
$(document).on("click", '.noMaxRuntime', function() {
    noMaxRuntime = true;
    console.log("No maximum runtime = " + noMaxRuntime);
    //Display the next question
    $("#questionArea").html('What genre(s)? are you okay with?<br><input type="checkbox" id="genre1" value="Action" checked>Action<br><input type="checkbox" id="genre2" value="Comedy" checked>Comedy<br><input type="checkbox" id="genre3" value="Romance" checked>Romance<br><input type="checkbox" id="genre4" value="Horror" checked>Horror<br><input type="checkbox" id="genre5" value="Family" checked>Family<br><input type="checkbox" id="genre6" value="Drama" checked>Drama<br><input type="checkbox" id="genre7" value="Scifi" checked>Sci-Fi<br><input type="checkbox" id="genre8" value="Others" checked>Others<br><br><button class="genres">Submit</button><br><br>')
})

//Runtime -> Genres
$(document).on("click", '.loadRunTime', function() {
    maxLength = $(".timeRun").val();
    console.log("Maximum length = " + maxLength + " minutes ");
    //Display the next question
    $("#questionArea").html('What genre(s)? are you okay with?<br><input type="checkbox" id="genre1" value="Action" checked>Action<br><input type="checkbox" id="genre2" value="Comedy" checked>Comedy<br><input type="checkbox" id="genre3" value="Romance" checked>Romance<br><input type="checkbox" id="genre4" value="Horror" checked>Horror<br><input type="checkbox" id="genre5" value="Family" checked>Family<br><input type="checkbox" id="genre6" value="Drama" checked>Drama<br><input type="checkbox" id="genre7" value="Scifi" checked>Sci-Fi<br><input type="checkbox" id="genre8" value="Others" checked>Others<br><br><button class="genres">Submit</button><br><br>')
})

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

//Sets noMaxRuntime to true -> Multiple users?
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

//Keeps oneUser set to true -> All done
$(document).on("click", '.onlyOneUser', function() {
    console.log("Only one user");
    //Display the next question
    $("#questionArea").html('Done collecting info.  Check the console for results.')
})

//Changes oneUser to false -> All done
$(document).on("click", '.anotherUser', function() {
    oneUser = false;
    console.log("Another user");
    //Display the next question
    $("#questionArea").html('Done collecting info.  Check the console for results.')
})

//Displays current value of slidebars
function showEndTime(newValue) {
    document.getElementById("endTime").innerHTML="Endtime: " + convertToTime(newValue);
}
function showRunTime(newValue) {
    document.getElementById("runTime").innerHTML="Maximum runtime: " + newValue + " minutes ";
}
function showEarliestTime(newValue) {
    document.getElementById("earliestTime").innerHTML="Earliest available time: " + convertToTime(newValue);
}
function showRadius(newValue) {
    document.getElementById("radiusSlidebar").innerHTML="I'm willing to travel: " + newValue + " miles ";
}

//Converts a number with format xx.xx to an AM/PM time.  Returns the time as a string.
function convertToTime(num) {
    if (num % 1 === 0) {
        var x = num - 12;
        var str = "";
        if (x > 0) {
            str = x + ":00 PM ";
        }
        else if (x === -12) {
            str = (x+24) + ":00 AM "
        }
        else if (x === 0) {
            str = (x+12) + ":00 PM "
        }
        else {
            str = (x+12) + ":00 AM "
        }
        return str;
    }
    else if (num % 1 === 0.25) {
        var x = num - 12.25;
        var str = "";
        if (x > 0) {
            str = x + ":15 PM ";
        }
        else if (x === -12) {
            str = (x+24) + ":15 AM "
        }
        else if (x === 0) {
            str = (x+12) + ":15 PM "
        }
        else {
            str = (x+12) + ":15 AM "
        }
        return str;
    }
    else if (num % 1 === 0.5) {
        var x = num - 12.5;
        var str = "";
        if (x > 0) {
            str = x + ":30 PM ";
        }
        else if (x === -12) {
            str = (x+24) + ":30 AM "
        }
        else if (x === 0) {
            str = (x+12) + ":30 PM "
        }
        else {
            str = (x+12) + ":30 AM "
        }
        return str;
    }
    else if (num % 1 === 0.75) {
        var x = num - 12.75;
        var str = "";
        if (x > 0) {
            str = x + ":45 PM ";
        }
        else if (x === -12) {
            str = (x+24) + ":45 AM "
        }
        else if (x === 0) {
            str = (x+12) + ":45 PM "
        }
        else {
            str = (x+12) + ":45 AM "
        }
        return str;
    }
}

//[DO ALL YOUR API/JSON STUFF HERE]
//[DISPLAY ALL RESULTS]