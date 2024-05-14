var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var currentLevel = 0

$('.btn').click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  currentLevel++;
  $('h1').text(`Level ${currentLevel}`);
  userClickedPattern = [];
}

function checkAnswer(currenLevel) {
  if (userClickedPattern[currenLevel] === gamePattern[currenLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000)
    }

  } else {

    $('body').addClass('game-over');

    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    playSound('wrong');

    $('h1').text(`Game Over!
    Press Any Key to Restart`);

    startOver();
  }
}

function startOver() {

  currentLevel = 0;
  gamePattern = [];
  $(document).one("keypress", nextSequence);
}

function playSound(color) {

  var audio = new Audio('./sounds/' + color + '.mp3');
  audio.play();
}

function animatePress(currentColour) {

  $('#' + currentColour).addClass('pressed');
  
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

$(document).one("keypress", nextSequence);









