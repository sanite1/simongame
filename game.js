
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var lvl = 0;

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  for (var i = 0; i < 4; i++) {
    if (document.querySelectorAll(".btn")[i].getAttribute("id") === randomChosenColour) {
      setTimeout(function () {
        $("#" + randomChosenColour).fadeOut();
        $("#" + randomChosenColour).fadeIn();
      }, 100);

    }
  }
  playSound(randomChosenColour);

  lvl++;
  $("#level-title").text("Level " + lvl);
}



for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
  });
}
 // jQuery for button click event.
// $("btn").click( function () {
//   var userChosenColor = $(".btn").attr("id");
//
//   userClickedPattern.push(userChosenColor);
// });

document.addEventListener("keydown", function () {
  if (!started){
    $("#level-title").text("Level " + lvl);
    nextSequence();
    started = true;
  }
  started++;
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === (gamePattern[currentLevel])) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
  else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout( function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    $("h1").text("Game over, press any key to restart.")
  }
}

function startOver() {
  lvl = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
