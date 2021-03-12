//Elements DOM
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");


var question = "";
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


//Start Timer ???
var secondsLeft = 75;
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft);
        timerEl.textContent = + secondsLeft;

        if (secondsLeft === 0) {

            clearInterval(timerInterval); // Stops execution interval

        } else if (runningQuestion === 3) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
setTime();

//Start Button
startBtn.addEventListener("click", startQuiz);

// Start Quiz
function startQuiz() {
    setTime();
    getQuestion();
}

//Start Questions
function getQuestion() {
    var currentQuestion = question[currentQuestion.index];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";  // Clear previous question

    //Current Question choices
    currentQuestion.choices.forEach(function (choice, i) {

        var choiceNode = document.createElement("button");//button for each choice
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice; // choice event
        choiceNode.onclick = questionClick; // click event to each choice
        choicesEl.appendChild(choiceNode); //show choice on the page
    });
}

//Answers
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {

        time -= 3; // penalize time

        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;//show updated time on the page
        feedbackEl.textContent = "Wrong! (-3 sec)";
        feedbackEl.setAttribute("style", "color: red, font-weight: bolder; font-size: 20px");
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.setAttribute("style", "color: green, font-weight: bolder; font-size: 20px");

    }

    //
    currentQuestionIndex++; //next question

    //Quiz ended check time
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

//End Quiz
function quizEnd() {
    clearInterval(timerId);  //timer stop
}

// show end screen
var endScreenEl = document.getElementById("end-screen");
endScreenEl.removeAttribute("class");

// show final score
var finalScoreEl = document.getElementById("final-score");
finalScoreEl.textContent = time;

// hide questions section
questionsEl.setAttribute("class", "hide");

// Update time
function clockTick() {
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

//Highscore
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
    //empty field > click submit
    if (initials !== "") {
        alert("Please enter your initials");
        saveHighscore();

        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "score.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore; // submit initials
startBtn.onclick = startQuiz; // start quiz
initialsEl.onkeyup = checkForEnter; //enterinitials