let buttonColors = ["red", "green", "blue", "yellow"];
let randomChosenColor = [];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

$(document).one("keydown", nextSequence);
$(document).one("click", nextSequence);
$(".btn").click(handler);



function nextSequence() {
  userClickedPattern = [];
  level ++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function handler(event) {
  let userChosenColor = event.target.id; 
  userClickedPattern.push(userChosenColor);
  
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); 
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("/sounds/wrong.mp3");
    audio.play();
    gameOverFlash();
    
    $("h1").text("Game Over. Press any key to restart.");
    $(document).one("keydown", startOver);

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  nextSequence();
}

function gameOverFlash() {
  $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
}












