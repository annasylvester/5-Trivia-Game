

    // Variables
    var startScreen;
    var gameHTML;
    var counter = 15;
    var questionArray = ["What is a group of cats called?", "How similar is a cat's brain to a human's brain?", "About how many different sounds can a cat make?", "What would Egyptian family members do when a family cat died? (Other than mummify the cat of course!)", "What percentage of their lives are cats sleeping??", "Black cats are considered bad luck in America. But in what country are they considered good luck?", "What is the oldest cat breed?", "There is an island where the number of cats to humans is 6 to 1. What country is this in?"];
    var answerArray = [["Shrewdness", "Clowder", "Herd", "Gang"], ["15%","60%","90%","99%"], ["10", "50", "100", "500"], ["Shave their eyebrows","Mourn for 7 days","Wear sackcloth and ashes","Sacrifice 12 mice"], ["50%", "60%", "70%", "80%"], ["Austrailia","Nepal","Canada","China"], ["Persian", "Tabby", "Scottish Fold", "Egyptian Mau"], ["Philippines","Japan","Greece","Sweden"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/clowder.jpg'>", "<img class='center-block img-right' src='assets/images/brain.jpg'>", "<img class='center-block img-right' src='assets/images/meow.jpg'>", "<img class='center-block img-right' src='assets/images/eyebrows.jpg'>", "<img class='center-block img-right' src='assets/images/sleeping.jpg'>", "<img class='center-block img-right' src='assets/images/blackcat.png'>", "<img class='center-block img-right' src='assets/images/egyptian.jpeg'>", "<img class='center-block img-right' src='assets/images/island.jpg'>"];
    var correctAnswers = ["B. Clowder", "C. 90%", "C. 100", "A. Shave their eyebrows", "C. 70%", "A. Austrailia", "D. Egyptian Mau", "B. Japan"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("../sound/meow-audio.mp3");
    // ------------------------------

$(document).ready(function() {

    function startScreen () {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-info btn-lg btn-block start-button' href='#' role='button'>Let's see how much!</a></p>";
        $(".mainArea").html(startScreen);
    };

    startScreen();

    $("body").on("click", ".start-button", function(event){
        event.preventDefault(); 
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    });

    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000); //  change to 4000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 15;
        generateHTML();
        timerWrapper();
    }
    

