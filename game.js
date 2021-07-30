//ButtonColours array
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

//Press any key to start the Game
var startGameBoolean = true;
var gameLevel = 0;
$(document).on("keypress",function(e){
    while(startGameBoolean){
        nextSequence();
        startGameBoolean = false;
    }
});

$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(gameLevel);
});

//function generate random number
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColour = buttonColours[randomNumber];
    gamePattern.push(randomChooseColour);
    $("#"+ randomChooseColour).fadeOut(500).fadeIn(500);
    playSound(randomChooseColour);
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(gameLevel){
    if((gamePattern[gameLevel-1] === userClickedPattern[gameLevel-1]) && userClickedPattern[gameLevel-1] != null ){
        console.log("success");
        userClickedPattern = [];
        setTimeout(nextSequence(),1000);
    }
    if((gamePattern[gameLevel-1] !== userClickedPattern[gameLevel-1]) && userClickedPattern[gameLevel-1] != null ){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    
}

function startOver(){
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
    startGameBoolean = true;
}

