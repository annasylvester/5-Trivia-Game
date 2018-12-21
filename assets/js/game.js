

    // Variables
    var startScreen;
    var generateText;
    var counter = 15;
    var questionArray = [
        "What is a group of cats called?", 
        "How similar is a cat's brain to a human's brain?", 
        "About how many different sounds can a cat make?", 
        "What would Egyptian family members do when a family cat died? (Other than mummify the cat of course!)", 
        "What percentage of their lives are cats sleeping??", 
        "Black cats are considered bad luck in America. But in what country are they considered good luck?", 
        "What is the oldest cat breed?", 
        "There is an island where the number of cats to humans is 6 to 1. What country is this in?"
    ];
    var answerArray = [
        ["Shrewdness", "Clowder", "Herd", "Gang"], 
        ["15%","60%","90%","99%"], 
        ["10", "50", "100", "500"], 
        ["Shave their eyebrows","Mourn for 7 days","Wear sackcloth and ashes","Sacrifice 12 mice"], 
        ["50%", "60%", "70%", "80%"], 
        ["Austrailia","Nepal","Canada","China"], 
        ["Persian", "Tabby", "Scottish Fold", "Egyptian Mau"], 
        ["Philippines","Japan","Greece","Sweden"]
    ];
    var imageArray = [
        "<img class='cat-images' src='assets/images/clowder.jpg'>", 
        "<img class='cat-images' src='assets/images/brain.jpg'>", 
        "<img class='cat-images' src='assets/images/meow.jpg'>", 
        "<img class='cat-images' src='assets/images/eyebrows.jpg'>", 
        "<img class='cat-images' src='assets/images/sleeping.jpg'>", 
        "<img class='cat-images' src='assets/images/blackcat.png'>", 
        "<img class='cat-images' src='assets/images/egyptian.jpeg'>", 
        "<img class='cat-images' src='assets/images/island.jpg'>"
    ];
    var correctAnswers = [
        "B. Clowder", 
        "C. 90%", 
        "C. 100", 
        "A. Shave their eyebrows", 
        "C. 70%", "A. Austrailia", 
        "D. Egyptian Mau", 
        "B. Japan"];
    var questionCounter = 0;
    var selecterAnswer;
    var timer;
    var winCounter = 0;
    var lossCounter = 0;
    var unansweredCounter = 0;
    var clickSound = new Audio("assets/sound/meow-audio.mp3");
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
    
        timerWait();
    });

    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(timer);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(timer);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredCounter++;
        generateText = "<p class='timer'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>Oops! Out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(generateText);
        setTimeout(wait, 4000); 
    }
    
    function generateWin() {
        winCounter++;
        generateText = "<p class='timer'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(generateText);
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        lossCounter++;
        generateText = "<p class='timer'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p> Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(generateText);
        setTimeout(wait, 4000);
    }
    
    function generateHTML() {
        generateText = "<p class='timer'>Time Remaining: <span class='timer'>15</span></p> <p>" + questionArray[questionCounter] + "</p> <p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(generateText);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 15;
        timerWait();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWait() {
        timer = setInterval(fifteenSeconds, 1000);
        function fifteenSeconds() {
            if (counter === 0) {
                clearInterval(timer);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        generateText = "<p class='timer'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p>Annnnddddd here's your results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + winCounter + "</p>" + "<p>Wrong Answers: " + lossCounter + "</p>" + "<p>Unanswered: " + unansweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(generateText);
    }
    
    function resetGame() {
        questionCounter = 0;
        winCounter = 0;
        lossCounter = 0;
        unansweredCounter = 0;
        counter = 15;
        generateHTML();
        timerWait();
    }
    

