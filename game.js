var buttonColors = ["red" ,"blue" ,"green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var score = 0;
$(document).on("keypress",function() {
  nextSequence();
});

$(".btn").on("click",function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playsound(userChosenColor);
  console.log("User Pattern: "+userClickedPattern);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoseColor = buttonColors[randomNumber];
  gamePattern.push(randomChoseColor);
  animatePress(randomChoseColor);
  playsound(randomChoseColor);
  console.log("Game pattern: "+gamePattern);
  $("h1").html("Level "+level)
  level++;
}

function playsound(name) {
  var color = new Audio("sounds/"+name+".mp3");
  color.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {$("#"+currentColor).removeClass("pressed")},100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {nextSequence();}, 1000);
    }
  } else {
    console.log("WRONG");
    score = level - 1;
    $("h1").html("Game Over Score: "+score);
    gamePattern = [];
    level = 0;
    var gameover = new Audio("sounds/wrong.mp3");
    gameover.play();
    $("body").addClass("game-over")
    setTimeout(function() {$("body").removeClass("game-over")},200);

  }
}
