const main = document.getElementsByTagName("main");
const startButton = document.getElementById("startButton");
const startDisplay = document.getElementById("startDisplay");
const questionDisplay = document.getElementById("questionDisplay");
let answerCheck = document.createElement("p");

let score = 0;
let userName = "";
let user = [];
let highscore = [];
//array of questions
const questions = [
  {
    q: "What is the HTML tag under which one can write the JavaScript code?",
    answers: ["<javascript>", "scripted", "<script>", "<js>"],
    correctAnswer: "<script>",
  },
  {
    q: "Why so JavaScript and Java have similar name?",
    answers: [
      "JavaScript is a stripped-down version of Java",
      "JavaScript's syntax is loosely based on Java's",
      "They both originated on the island of Java",
      "None of the above",
    ],
    correctAnswer: "Javascript's syntax is loosely based on Java's",
  },
  {
    q:
      "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    answers: [
      "The User's machine running a Web browser",
      "The Web server",
      "A central machine deep within Netscape's corporate offices",
      "None of the above",
    ],
    correctAnswer: "The User's machine running a Web browser",
  },
  {
    q: "______ JavaScript is also called client-side JavaScript.",
    answers: ["Microsoft", "Navigator", "LiveWire", "Native"],
    correctAnswer: "Navigator",
  },
  {
    q: "__________ JavaScript is also called server-side JavaScript.",
    answers: ["Microsoft", "Navigator", "LiveWire", "Native"],
    correctAnswer: "LiveWire",
  },
  {
    q: "What are variables used for in JavaScript Programs?",
    answers: [
      "Storing numbers, dates, or other values",
      "Varying randomly",
      "Causing high-school algebra flashbacks",
      "None of the above",
    ],
    correctAnswer: "Storing numbers, dates, or other values",
  },
  {
    q:
      "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
    answers: ["Client-side", "Server-side", "Local", "Native"],
    correctAnswer: "Client-side",
  },
  {
    q: "Which of the following can't be done with client-side JavaScript?",
    answers: [
      "Validating a form",
      "Sending a form's contents by email",
      "Storing the form's contents to a database file on the server",
      "None of the above",
    ],
    correctAnswer:
      "Storing the form's contents to a database file on the server",
  },
];
//once the start button is clicked, the following function will run
function quiz() {
  //places the question as the ui of a list
  const ul = document.getElementById("q");
  const currentQ = questions[Math.floor(Math.random() * questions.length)];
  ul.textContent = currentQ.q;
  console.log(currentQ);
  //creates a list item for each possible answer with a button to select it
  for (let i = 0; i < currentQ.answers.length; i++) {
    let answerChoices = currentQ.answers[i];
    const li = document.createElement("li");
    const selectButton = document.createElement("button");
    selectButton.setAttribute("value", answerChoices);
    selectButton.textContent = answerChoices;
    //the button checks if the answer is correct and adds or subtracts from the score
    selectButton.onclick = function () {
      if (currentQ.correctAnswer.includes(currentQ.answers[i])) {
        score++;
        answerCheck.textContent = "Correct!";
        answerCheckDiv.appendChild(answerCheck);

        console.log(score);
        quiz();
      } else {
        secondsLeft = secondsLeft - 10;
        answerCheck.textContent = "Boooooo, wrong!!!!";
        answerCheckDiv.appendChild(answerCheck);
        console.log(score);
        quiz();
      }
    };
    ul.appendChild(li);
    li.appendChild(selectButton);
  }
}
//the start button starts the timer and cues the main quiz to run
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  setTime();
  startDisplay.style.display = "none";
  quiz();
});

let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");

let secondsLeft = 60;
//creates the countdown
function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    //when you run out of time, timer stops
    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      timeEl.textContent = " Out of Time";
      endScreen();
    }
  }, 1000);
}
//creates a post quiz screen that tells you your score and allows you to input your name for highscore
function endScreen() {
  startDisplay.style.display = "none";
  q.style.display = "none";
  answerCheckDiv.style.display = "none";
  secondsLeft = 0;
  const inputBox = document.createElement("INPUT");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("value", "Your name here");
  const submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  const scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = "Your score: " + score;

  submitButton.onclick = function (event) {
    event.preventDefault;
    let userName = inputBox.value;
    console.log(userName);
    //the following two functions save the username and score
    function storeHighscore() {
      localStorage.setItem("highscore", JSON.stringify(score));
    }
    function storeUser() {
      localStorage.setItem("user", JSON.stringify(userName));
    }
    //the username and score get stored IF the current score is higher than the previous stored highscore
    if (score > JSON.parse(localStorage.getItem("highscore"))) {
      storeHighscore();
      storeUser();
    }
    inputBox.style.display = "none";
    submitButton.style.display = "none";
    scoreDisplay.style.display = "none";
    highscoreDisplay();
  };
  document.body.appendChild(inputBox);
  document.body.appendChild(submitButton);
  document.body.appendChild(scoreDisplay);
}

//this creates a on click event that displays the locally saved highscore
const highscoreButton = document.getElementById("highscorebtn");
highscoreButton.onclick = function () {
  event.preventDefault;
  highscoreDisplay();
};

function highscoreDisplay() {
  startDisplay.style.display = "none";
  q.style.display = "none";

  secondsLeft = 0;
  const highscoreHeader = document.createElement("h1");
  const hsText = document.createTextNode("High score: ");
  const latestHighscore = document.createElement("h2");
  const latestHighscoreText = document.createTextNode(
    JSON.parse(localStorage.getItem("user")) +
      ": " +
      JSON.parse(localStorage.getItem("highscore")) +
      " points"
  );
  const backToQuiz = document.createElement("button");
  backToQuiz.innerHTML = "Retry Quiz";
  backToQuiz.onclick = function (event) {
    event.preventDefault;
    window.location.reload();
  };
  const clearHighscore = document.createElement("button");
  clearHighscore.innerHTML = "Clear Highscore";
  clearHighscore.onclick = function (event) {
    event.preventDefault;
    window.localStorage.clear();
  };
  highscoreHeader.appendChild(hsText);
  document.body.appendChild(highscoreHeader);
  latestHighscore.appendChild(latestHighscoreText);
  document.body.appendChild(latestHighscore);
  document.body.appendChild(backToQuiz);
  document.body.appendChild(clearHighscore);
}
