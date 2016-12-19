$(document).ready(function () {


//---------------------------Setting up global variables--------------------------------------------//
    var random;
    var sequenceArray = [];
    var round = 0;
    var i = 0;
    var time = 1000;
    var clickBox = false;
    var score = 0;
    var highestScores = [];
    var selectLevel = false;

    console.log(sequenceArray);

//-------------------------------check which level the user selected-------------------------------//

    $('.level').click(function () {
        selectLevel = true;
        if ($(this).attr("id") == "easy") {
            animateDifficultyMode(1000, this);
        } else if ($(this).attr("id") == "medium") {
            animateDifficultyMode(600, this);
        } else if ($(this).attr("id") == "hard") {
            animateDifficultyMode(400, this);
        }
    });

//---------------------------Display Msg to user with round level----------------------------------//
    var displayMsg = function (round) {
        $('#round').text(round)
    };

//----------------------------generating a random number btw 1 and 4-------------------------------//
    var generateRandomNumber = function () {
        random = Math.floor(Math.random() * (4)) + 1;
        return random;
    };

//-----------------------------------animating box-------------------------------------------------//
    var animateBox = function (value) {
        $('[data-value=' + (value) + ']').fadeOut().fadeIn();
    };

//--------------------------------Playing the sequence---------------------------------------------//
    var playSequence = function (x) {
        sequenceArray.forEach(function (box, index) {
            setTimeout(function () {
                animateBox(box);
            }, (x * index));
        });
        activateClickOnSquare()
    };

//------------------------------------Moving to next round-----------------------------------------//
    var newRound = function () {
        playSound();
        round += 1;
        score += 1;
        generateRandomNumber();
        sequenceArray.push(random);
        setTimeout(function () {
            playSequence(time);
        }, time / 3);
        displayMsg(round);
    };

//-------------------------Staring the game with a click event on the start game button------------//
    $('#start').click(function () {
        if (selectLevel) {
            sequenceArray = [];
            round = 0;
            score = 0;
            i = 0;
            clickBox = false;
            $('#displayScore').addClass('hide');
            $("#wrapper").removeClass('gameOver');
            $('div.dragon').hide();
            $("#round").css("opacity", "1");
            showSquares();
            playSound();
            generateRandomNumber();
            sequenceArray.push(random);
            console.log(sequenceArray);
            $('#start').hide();
            displayMsg(round);
            playSequence(time);
        } else {
            sweetAlert("Oops...", "Select a level and click start", "error");
        }
    });

//---------------------------------Click event on the animated boxes-------------------------------//
    $(".box").click(function () {
            if (clickBox) {
                playSoundSquareClicked();
                wobbleSquares(this);
                if (sequenceArray[i] == $(this).attr("data-value")) {
                    i += 1;
                    checkEndOfSequence();
                } else {
                    gameOver();
                }
            }
    });

//-----------------------------------------Rest the Game------------------------------------------//
    var resetGame = function () {
        displayHighScore();
        displayMsg(round);
    };

//-----------------------------------Hiding the four box when game is over-------------------------//
    var hideSquares = function () {
        $(".box").css("opacity", "0");
    };

//-----------------------------------Showing the four box when game starts-------------------------//
    var showSquares = function () {
        $(".box").css("opacity", "1");
    };

//-----------------------------------checking end of sequence--------------------------------------//
    var checkEndOfSequence = function () {
        if (i == sequenceArray.length) {
            clickBox = false;
            i = 0;
            setTimeout(function () {
                playSoundCorrectSequence();
                newRound();
            }, time);
        }
    };

//----------------------------------------Game over------------------------------------------------//
    var gameOver = function () {
        playGameOverSound();
        selectLevel = false;
        $('#select').removeClass('animated rotateOutUpRight');
        $('h1').removeClass('animated rotateIn');
        $("#round").css("opacity", "0");
        $('div.dragon').show();
        resetGame();
        hideSquares();
        console.log(i);
        clickBox = false;
        $('#start').show();
        $("#wrapper").addClass('gameOver');
    };

//-------------Setting up the squares to non non-clickable while sequence is playing---------------//
    var activateClickOnSquare = function () {
        setTimeout(function () {
            clickBox = true;
        }, (1000 * (sequenceArray.length)));
    };

//-------------------------Play sound while user is playing----------------------------------------//
    var playSound = function () {
        $("#hartBeat")[0].play();
    };

//-------------------------Play sound when Game is Over-------------------------------------------//
    var playGameOverSound = function () {
        $("#game_over")[0].play();
    };

//-------------------------Play sound when user clicks on a square--------------------------------//
    var playSoundSquareClicked = function () {
        $("#blue_sound")[0].play();
    };


//-------------------------Play sound if user guesses sequence correctly -------------------------//
    var playSoundCorrectSequence = function () {
        $("#yellow_sound")[0].play();
    };

//----------------------------------------Shuffle squares ----------------------------------------//
//
//     var shuffleSquares = function () {
//         var parent = $("#wraper");
//         var divs = parent.children();
//         while (divs.length) {
//             parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
//         }
//
//     }

//-------------------------------Animate h1 and difficulty level button----------------------------//
    var animateDifficultyMode = function (timer, element) {
        time = timer;
        $('#select').addClass('animated rotateOutUpRight');
        $('h1').text($(element).text() + " Mode").addClass('animated rotateIn');
    };

//-------------------------------wobble squares when clicked----------------------------//
    var wobbleSquares = function (square) {
        $(square).addClass('animated wobble');
        $(square).one('oanimationend animationend', function () {
            $(square).removeClass('animated wobble');
        });
    };

//-------------------------------Display user's highest score--------------------------------------//
    var displayHighScore = function () {
        highestScores.push(score);
        highestScores.sort();
        score = highestScores.pop();
        highestScores.push(score);
        $('#displayScore').removeClass('hide').text('Highest Score: ' + score).addClass('animated flip').one('oanimationend animationend', function () {
            $('#displayScore').removeClass('animated wobble');
        });

    };
//-----------------------------


});