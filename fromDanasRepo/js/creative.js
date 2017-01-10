//VARIABLES START HERE_______________________________________________________

//Variables to be populated no matter what

var zipCode;
var radius;

var onConnect = false;
var eventful = false;
var sportsAPI = false;
var interests = [onConnect, eventful, sportsAPI];

var oneUser = true;

//If user is interested in sports, populate these variables

var sportBaseball = [false, "Baseball"];
var sportFootball = [false, "Football"];
var sportBasketball = [false, "Basketball"];
var sportSoccer = [false, "Soccer"];
var sportHockey = [false, "Hockey"];
var sports = [sportBaseball, sportFootball, sportBasketball, sportSoccer, sportHockey];

//If user is interested in movies, populate these variables

var ratingG = false;
var ratingPG = false;
var ratingPG13 = false;
var ratingR = false;
var ratingNC17 = false;
var ratingUnrated = false;
var ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17, ratingUnrated];

var noMaxRuntime = false;
var maxLength;

//Dummy variables for second user

var dummyonConnect;
var dummyeventful;
var dummysportsAPI;
var dummysportBaseball;
var dummysportFootball;
var dummysportBasketball;
var dummysportSoccer;
var dummysportHockey;
var dummyratingG;
var dummyratingPG;
var dummyratingPG13;
var dummyratingR;
var dummyratingNC17;
var dummyratingUnrated;
var dummynoMaxRuntime;
var dummymaxLength;



//QUESTIONNAIRE FUNCTIONS START HERE_______________________________________________________

//Validate and populate zip code variable
function readZipCode() {
    var x = document.getElementById("zipCode").value;
    var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(x);
    if (isValid) {
        zipCode = x;
        console.log("Zip code = " + zipCode);
        //Display the next question
        $("#questionArea").html('How far are you willing to travel?<br><input type="range" min="1" max="50" value="20" step="1" class="radius" onchange="showRadius(this.value)"/><span id="radiusSlidebar">I\'m willing to travel: 20 miles </span><button class="btn btn-danger loadRadiusSlidebar">Submit</button><br><br>')
    }
    else
        $("#questionArea").html('Please enter your zip code:<br><input type="text" id="zipCode" class="textBox"><br><button onclick="readZipCode()" class="btn btn-danger">Submit</button><br><br>That ain\'t a valid zip code!  Try again, or let us find your location <br><button id="zip"  class="btn btn-danger">Get ZIP </button><br><br>')
}

//Pull zip code with user's location
$(document).on("click", '#zip', function() {
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
        $("#questionArea").html('How far are you willing to travel?<br><input type="range" min="1" max="50" value="20" step="1" class="radius" onchange="showRadius(this.value)"/><span id="radiusSlidebar">I\'m willing to travel: 20 miles </span><button class="btn btn-danger loadRadiusSlidebar">Submit</button><br><br>')
    }
})

//Load travel radius from slide bar -> Interests
$(document).on("click", '.loadRadiusSlidebar', function() {
    radius = $(".radius").val();
    console.log("Willing to travel " + radius + " miles");
    //Display the next question
    $("#questionArea").html('Which of these can we help you find today?<br><br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="btn btn-danger interests">Submit</button><br><br>')
})

//Sets noTimeConstraints to true -> Interests
$(document).on("click", '.noTimeConstraints', function() {
    noTimeConstraints = true;
    console.log("No time constraints = " + noTimeConstraints);
    //Display the next question
    $("#questionArea").html('Which of these can we help you find today?<br><br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="btn btn-danger interests">Submit</button><br><br>')
})

//Gets checkbox data for interests -> Sports
$(document).on("click", '.interests', function() {
    onConnect = document.getElementById("moviesBox").checked;
    eventful = document.getElementById("concertsBox").checked;
    sportsAPI = document.getElementById("sportsBox").checked;
    interests = [onConnect, eventful, sportsAPI];
    console.log(interests);

    if (sportsAPI) {
        //Display the first sports question
        $("#questionArea").html('Okay.  What sport(s) are you okay with?<br><br><input type="checkbox" id="baseball" name="sport1" value="Baseball" checked>Baseball<br><input type="checkbox" id="football" name="sport2" value="Football" checked>Football<br><input type="checkbox" id="basketball" name="sport3" value="Basketball" checked>Basketball<br><input type="checkbox" id="soccer" name="sport4" value="Soccer" checked>Soccer<br><input type="checkbox" id="hockey" name="sport5" value="Hockey" checked>Hockey<br><br><button class="btn btn-danger sports">Submit</button><br><br>')
    }
    else if(onConnect) {
        //Display the first movies question
        $("#questionArea").html('Okay.  What rating(s) are you okay with?<br><br><input type="checkbox" id="rating1" value="G" checked>G<br><input type="checkbox" id="rating2" value="PG" checked>PG<br><input type="checkbox" id="rating3" value="PG13" checked>PG-13<br><input type="checkbox" id="rating4" value="R" checked>R<br><input type="checkbox" id="rating5" value="NC17" checked>NC-17<br><input type="checkbox" id="rating6" value="Unrated" checked>Unrated<br><br><button class="btn btn-danger ratings">Submit</button><br><br>')
        console.log("No info for sports.");
    }
    else {
        //Multiple users?
        $("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="btn btn-danger onlyOneUser">Results!  Now!</button><br><br><button class="btn btn-danger anotherUser">Another user</button>')
        console.log("No info for movies or sports.");
    }
})

//Gets checkbox data for sports -> Ratings/multiple users?
$(document).on("click", '.sports', function() {
    sportBaseball = document.getElementById("baseball").checked;
    sportFootball = document.getElementById("football").checked;
    sportBasketball = document.getElementById("basketball").checked;
    sportSoccer = document.getElementById("soccer").checked;
    sportHockey = document.getElementById("hockey").checked;
    console.log(sports);

    //Either move on to movies, or go to multiple users?
    if(onConnect) {
        //Display the first movies question
        $("#questionArea").html('Okay.  Now for movies.  What rating(s) are you okay with?<br><br><input type="checkbox" id="rating1" value="G" checked>G<br><input type="checkbox" id="rating2" value="PG" checked>PG<br><input type="checkbox" id="rating3" value="PG13" checked>PG-13<br><input type="checkbox" id="rating4" value="R" checked>R<br><input type="checkbox" id="rating5" value="NC17" checked>NC-17<br><input type="checkbox" id="rating6" value="Unrated" checked>Unrated<br><br><button class="btn btn-danger ratings">Submit</button><br><br>')
    }
    else {
        //Multiple users?
        $("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="btn btn-danger onlyOneUser">Results!  Now!</button><br><br><button class="btn btn-danger anotherUser">Another user</button>')
        console.log("No info for movies.")
    }})

//Ratings -> Runtime
$(document).on("click", '.ratings', function() {
    ratingG = document.getElementById("rating1").checked;
    ratingPG = document.getElementById("rating2").checked;
    ratingPG13 = document.getElementById("rating3").checked;
    ratingR = document.getElementById("rating4").checked;
    ratingNC17 = document.getElementById("rating5").checked;
    ratingUnrated = document.getElementById("rating6").checked;
    ratings = [ratingG, ratingPG, ratingPG13, ratingR, ratingNC17, ratingUnrated];
    console.log(ratings)
    //Display the next question
    $("#questionArea").html('Click this button if you don\'t care how long your movie is. <button class="btn btn-danger noMaxRuntime">Any length is fine!</button><br><br>Or, would you like to set a maximum runtime?<br><input type="range" min="90" max="240" value="120" step="5" class="timeRun" onchange="showRunTime(this.value)"/><span id="runTime">Maximum runtime: 120 minutes </span><button class="btn btn-danger loadRunTime">Submit</button><br><br>')
})

//Sets noMaxRuntime to true -> Multiple users?
$(document).on("click", '.noMaxRuntime', function() {
    noMaxRuntime = true;
    console.log("No maximum runtime = " + noMaxRuntime);
    if (oneUser === false) {
        onConnect = booleanTest(dummyonConnect,onConnect);
        eventful = booleanTest(dummyeventful,eventful);
        sportsAPI = booleanTest(dummysportsAPI,sportsAPI);
        sportBaseball = booleanTest(dummysportBaseball,sportBaseball);
        sportFootball = booleanTest(dummysportFootball,sportFootball);
        sportBasketball = booleanTest(dummysportBasketball,sportBasketball);
        sportSoccer = booleanTest(dummysportSoccer,sportSoccer);
        sportHockey = booleanTest(dummysportHockey,sportHockey);
        ratingG = booleanTest(dummyratingG,ratingG);
        ratingPG = booleanTest(dummyratingPG,ratingPG);
        ratingPG13 = booleanTest(dummyratingPG13,ratingPG13);
        ratingR = booleanTest(dummyratingR,ratingR);
        ratingNC17 = booleanTest(dummyratingNC17,ratingNC17);
        ratingUnrated = booleanTest(dummyratingUnrated,ratingUnrated);
        noMaxRuntime = booleanTest(dummynoMaxRuntime,noMaxRuntime);

        if (dummymaxLength < maxLength) {
            maxLength = dummymaxLength;
        }

        console.log("two users!!!!!!");
        $("#questionArea").html('<h3>Done collecting info.</h3>');
        performAPICalls();
    }
    else {
        //Display the next question
        $("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="btn btn-danger onlyOneUser">Results!  Now!</button><br><br><button class="btn btn-danger anotherUser">Another user</button>')
    }
})

//Runtime -> Multiple users?
$(document).on("click", '.loadRunTime', function() {
    maxLength = $(".timeRun").val();
    console.log("Maximum length = " + maxLength + " minutes ");
    //Display the next question
    $("#questionArea").html('One last thing.  Do you want your results now, or would you like to see if your preferences match up with a friend, first?<br><br><button class="btn btn-danger onlyOneUser">Results!  Now!</button><br><br><button class="btn btn-danger anotherUser">Another user</button>')
})

//Keeps oneUser set to true -> All done
$(document).on("click", '.onlyOneUser', function() {
    console.log("Only one user");
    //Display the next question
    $("#questionArea").html('<h3>Done collecting info.</h3>')
    performAPICalls();
})

//Changes oneUser to false -> All done
$(document).on("click", '.anotherUser', function() {
    oneUser = false;
    console.log("Another user.");
    //Initialize Firebase - get this info from Firebase
    // var config = {
    //     apiKey: "AIzaSyD0PAm14WZvU0EwiknLFgyer4_lvliCrF0",
    //     authDomain: "coffeyflintmendozagp.firebaseapp.com",
    //     databaseURL: "https://coffeyflintmendozagp.firebaseio.com",
    //     storageBucket: "coffeyflintmendozagp.appspot.com",
    //     messagingSenderId: "1000692103308"
    // };
    // firebase.initializeApp(config);

    // // Get a reference to the database service
    // var database = firebase.database().ref();

    // //Store all data on firebase database
    // database.set({
    //     FBonConnect: onConnect,
    //     FBeventful: eventful,
    //     FBsportsAPI: sportsAPI,
    //     FBsportBaseball: sportBaseball,
    //     FBsportFootball: sportFootball,
    //     FBsportBasketball: sportBasketball,
    //     FBsportSoccer: sportSoccer,
    //     FBsportHockey: sportHockey,
    //     FBratingG: ratingG,
    //     FBratingPG: ratingPG,
    //     FBratingPG13: ratingPG13,
    //     FBratingR: ratingR,
    //     FBratingNC17: ratingNC17,
    //     FBratingUnrated: ratingUnrated,
    //     FBnoMaxRuntime: noMaxRuntime,
    //     FBmaxLength: maxLength,
    // });

    //Currently using dummy variables until firebase is working correctly
    dummyonConnect = onConnect;
    dummyeventful = eventful;
    dummysportsAPI = sportsAPI;
    dummysportBaseball = sportBaseball;
    dummysportFootball = sportFootball;
    dummysportBasketball = sportBasketball;
    dummysportSoccer = sportSoccer;
    dummysportHockey = sportHockey;
    dummyratingG = ratingG;
    dummyratingPG = ratingPG;
    dummyratingPG13 = ratingPG13;
    dummyratingR = ratingR;
    dummyratingNC17 = ratingNC17;
    dummyratingUnrated = ratingUnrated;
    dummynoMaxRuntime = noMaxRuntime;
    dummymaxLength = maxLength;

    //Back to the beginning
    $("#questionArea").html('Alright, User #2.  Which of these can we help YOU find today?<br><br><input type="checkbox" name="interest1" id="moviesBox" value="Movies" checked>Movies<br><input type="checkbox" name="interest2" id="concertsBox" value="Concerts" checked>Concerts<br><input type="checkbox" name="interest3" id="sportsBox" value="Sports" checked>Sports<br><br><button class="btn btn-danger interests">Submit</button><br><br>')
})



//RESULTS FUNCTIONS START HERE_______________________________________________________

function performAPICalls() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var Fdd = dd + 5
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd;
    console.log("Today is " + today);

    var queryURLC = "http://api.jambase.com/events?zipCode=" + zipCode + "&radius=" + radius + "&page=0&api_key=rm4t3ad3hchkapjq28uv75u6";
    var queryURLM = "https://data.tmsapi.com/v1.1/movies/showings?startDate="+today+"&zip=" + zipCode + "&radius=" + radius + "&api_key=9spw93n6wf2ug5mtd6pzphcm";

    //Eventful API Call
    if (eventful) { 
        $.ajax({ url: queryURLC, method: "GET" }).done(function(response) {

            for (i = 0 ; i < ((response.Events.length + 10) - (response.Events.length) ) ; i ++ ) {
                //console.log("Concerts: " + response.Events[i].Artists[0].Name + " At: " + response.Events[i].Venue.Name + " " + response.Events[i].Venue.Address);
                $("#questionArea").append("<br><br>Concerts: " + response.Events[i].Artists[0].Name + " At: " + response.Events[i].Venue.Name + " " + response.Events[i].Venue.Address);
            }
        });
    }

    //onConnect API Call
    if (onConnect) {
        $.ajax({url: queryURLM , method: "GET"}).done(function(response) {

            var jsonObj = response;
            console.log(jsonObj);

            //Appends appropriate parsed movie info
            for (i = 0; i < jsonObj.length; i++) {
                var titleString = "Title: " + jsonObj[i].title;

                if ('ratings' in jsonObj[i]) {
                    var ratingString = "Rating: " + jsonObj[i].ratings[0].code;
                }
                else {
                    var ratingString = "Rating: Unrated";
                }

                var runtimeString = "Runtime: " + jsonObj[i].runTime;
                var genresString = "Genres: " + jsonObj[i].genres;
                var releaseDateString = "Release date: " + jsonObj[i].releaseDate;
                var directorsString = "Director(s): " + jsonObj[i].directors;
                var starsString = "Starring: " + jsonObj[i].topCast;
                var plotSummaryString = "Plot summary: " + jsonObj[i].shortDescription;

                var ratingMatch = false;
                var runtimeMatch = false;

                //IF THE MOVIE MATCHES RATING, RATINGMATCH=TRUE
                if ('ratings' in jsonObj[i]) {
                    if (jsonObj[i].ratings[0].code === "G") {
                        if (ratingG) {
                            ratingMatch = true;
                        }
                    }
                    else if (jsonObj[i].ratings[0].code === "PG") {
                        if (ratingPG) {
                            ratingMatch = true;
                        }
                    }
                    else if (jsonObj[i].ratings[0].code === "PG-13") {
                        if (ratingPG13) {
                            ratingMatch = true;
                        }
                    }
                    else if (jsonObj[i].ratings[0].code === "R") {
                        if (ratingR) {
                            ratingMatch = true;
                        }
                    }
                    else if (jsonObj[i].ratings[0].code === "NC-17") {
                        if (ratingNC17) {
                            ratingMatch = true;
                        }
                    }
                }
                else {
                    if (ratingUnrated) {
                        ratingMatch = true;
                    }
                }


                //IF THE RUNTIME IS LOWER THAN USER'S MAXLENGTH, OR IF NOTIMECONSTRAINTS IS TRUE, RUNTIMEMATCH=TRUE
                if ('runTime' in jsonObj[i]) {
                    if (noMaxRuntime === false) {
                        var runtimeArray = [];
                        runtimeArray = jsonObj[i].runTime;
                        runtimeArray.split('');
                        var runtimeMinutes = 0;
                        if (runtimeArray[5] === '0') {
                            runtimeMinutes += parseInt(runtimeArray[6]);
                        }
                        if (runtimeArray[5] === '1') {
                            runtimeMinutes += (10 + parseInt(runtimeArray[6]));
                        }
                        if (runtimeArray[5] === '2') {
                            runtimeMinutes += (20 + parseInt(runtimeArray[6]));
                        }
                        if (runtimeArray[5] === '3') {
                            runtimeMinutes += (30 + parseInt(runtimeArray[6]));
                        }
                        if (runtimeArray[5] === '4') {
                            runtimeMinutes += (40 + parseInt(runtimeArray[6]));
                        }
                        if (runtimeArray[5] === '5') {
                            runtimeMinutes += (50 + parseInt(runtimeArray[6]));
                        }
                        if (runtimeArray[3] === '4') {
                            runtimeMinutes += 240;
                        }
                        if (runtimeArray[3] === '3') {
                            runtimeMinutes += 180;
                        }
                        if (runtimeArray[3] === '2') {
                            runtimeMinutes += 120;
                        }
                        if (runtimeArray[3] === '1') {
                            runtimeMinutes += 60;
                        }
                        if (runtimeMinutes <= maxLength) {
                            runtimeMatch = true;
                        }
                    }
                    else {
                        if (noMaxRuntime) {
                            runtimeMatch = true;
                        }
                    }
                }
                else {
                    if (noMaxRuntime) {
                        runtimeMatch = true;
                    }
                }

                if (runtimeMatch) {
                    if (ratingMatch) {
                        $("#questionArea").append("<br><br>" + titleString);
                        $("#questionArea").append("<br>" + ratingString);
                        $("#questionArea").append("<br>" + runtimeString);
                        $("#questionArea").append("<br>" + genresString);
                        $("#questionArea").append("<br>" + releaseDateString);
                        $("#questionArea").append("<br>" + directorsString);
                        $("#questionArea").append("<br>" + starsString);
                        $("#questionArea").append("<br>" + plotSummaryString);

                        var showtimesString = "";
                        for (j = 0; j < jsonObj[i].showtimes.length; j++) {
                            showtimesString = "Theater: " + jsonObj[i].showtimes[j].theatre.name + " | " + jsonObj[i].showtimes[j].dateTime;
                            $("#questionArea").append("<br>" + showtimesString);                    
                        }
                    }
                    else {
                        console.log("Ratings did not match, but runtimes did");
                    }
                }
                else {
                    if (ratingMatch) {
                        console.log("Runtimes did not match, but ratings did");
                    }
                    else {
                        console.log("Neither runtimes nor ratings matched");
                    }   
                }
            }
        });
    }

    //Sports API Call
    if (sportsAPI) {
        var nottoday = new Date();
        var dd = nottoday.getDate()+1;
        var mm = nottoday.getMonth()+1; //January is 0!
        var Fdd = dd + 5
        var yyyy = nottoday.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} nottoday = yyyy+'-'+mm+'-'+dd;
        var sportname = ["baseball", "football", "basketball", "soccer","hockey"]
        for (i = 0 ; i < sports.length ; i++){
            if (sports[i]) {
                var queryURLS = "https://app.ticketmaster.com/discovery/v2/events.json?endDateTime"+nottoday +"&classificationName="+ sportname[i]+"&dmaId=222&apikey=K1k9u4pDAt3XxPN91bxupADV2fxpDDGA"
                $.ajax({url: queryURLS, method: "GET"}).done(function(response) {
                     for (i = 0 ; i < 1 ; i++) {
                         if (response.page.totalPages === 0){
                             $("#questionArea").append("<br><br>no showtimes available for " + sportname[i]);
                         }
                       else {
                           $("#questionArea").append("<br><br>" + response._embedded.events[i].name);
                       }
                       }
                     
                });    
            }
            else {
                $("#questionArea").append("<br><br>user doesn't want " + sportname[i]);
            }
        }
    }
}



//UTILITY FUNCTIONS START HERE_______________________________________________________

//Takes two booleans.  Returns true if they're both true, false otherwise.
function booleanTest(booleanOne,booleanTwo) {
    if (booleanOne && booleanTwo) {
        return true;
    }
    else {
        return false;
    }
}

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