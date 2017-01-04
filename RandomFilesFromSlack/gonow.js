
//  This code will run as soon as the page loads.
$(document).ready(function() {

    //  Click events for the stopwatch
 $("#start").click(countdown.start);
   $(".start").on ("click",function() { 
    $(".row").removeClass("hidden-test");
   });




//  Variable that will hold our setInterval that runs the stopwatch
function countdown() {
  var i = document.getElementById('counter');
  i.innerHTML = parseInt(i.innerHTML) -1;
  if (parseInt(i.innerHTML)==0) {
    clearInterval(timerId);
     getCheckedValue(radioName);
    }
  }

var timerId = setInterval(function() { countdown (); },1000);


var answers = ["a", "c"], 
    tot = answers.length;

    function getCheckedValue(radioName){
    var radios = document.getElementsByName(question0); // Get radio group by-name
    for(var y=0; y<radios.length; y++)
      if(radios[y].checked) return radios[y].value; // return the checked value
  };

// when the clock gets to 0, run function getCheckedValue


  function getCheckedValue(radioName){
    var radios = document.getElementsByName(question1); // Get radio group by-name
    for(var y=0; y<radios.length; y++)
      if(radios[y].checked) return radios[y].value; // return the checked value
        $("question1").click(getScore);
   $("question").on ("click",function(getScore) { 
    

     });
  };
  

function getScore(){
  var score = 0;
  for (var i=0; i<tot; i++)
    if(getCheckedValue("question"+i)===answers[i]) score += 1; // increment only
  return score;
}

function returnScore(){
  alert("Your score is "+ getScore() +"/"+ tot);
}


// // Starts the Game by running the startGame() function
startGame();
});


