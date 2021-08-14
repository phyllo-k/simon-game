var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { 
        $("#" + currentColor).removeClass("pressed"), 100
     })
}

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
}

function nextSequence() {
    userClickPattern = [];
    level++;
    var randomNum = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNum];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(100).fadeIn(100);
    playAudio(chosenColor);
    $("#level-title").text("Level " + level);
}

function playAudio(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function (e) {
    userClickPattern.push(e.target.id);
    playAudio(e.target.id)
    animatePress(e.target.id);
    checkAnswer(userClickPattern.length - 1);
});

$(document).keydown(function (e) { 
    if (gamePattern.length === 0) {
        nextSequence();
    }
});