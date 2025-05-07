var buttonColor  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var random = Math.floor(Math.random()*4);
    var randomChosenColor ;
    randomChosenColor = buttonColor[random];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor)
    animatePress(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
        
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart();
    }
}

function restart(){
    level = 0;
    gamePattern = [];
    started = false;
}