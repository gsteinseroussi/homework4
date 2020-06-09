const main = document.getElementsByTagName("main");
const startButton = document.getElementById("startButton");
const startDisplay = document.getElementById("startDisplay");
const questionDisplay = document.getElementById("questionDisplay");
let score = 0;
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

function quiz() {
  const ui = document.getElementById("q");
  const currentQ = questions[Math.floor(Math.random() * questions.length)];
  ui.textContent = currentQ.q;
  console.log(currentQ);
  for (let i = 0; i < currentQ.answers.length; i++) {
    const li = document.createElement("li");
    li.textContent = currentQ.answers[i];
    const selectButton = document.createElement("button");
    selectButton.textContent = "Select";
    selectButton.onclick = function () {
      if (currentQ.correctAnswer.includes(currentQ.answers[i])) {
        alert("Correct");
        score++;
        secondsLeft = secondsLeft + 10;
        quiz();
      } else {
        alert("False");
        score--;
        secondsLeft = secondsLeft - 10;
        quiz();
      }
    };
    ui.appendChild(li);
    li.appendChild(selectButton);
  }
}

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  setTime();
  startDisplay.style.display = "none";
  quiz();
});

let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");

let secondsLeft = 60;

function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      timeEl.textContent = " Out of Time";
      let userName = prompt("Enter your name for the scoreboard");
      alert("You scored " + score + " points.");
      if (localStorage) {
        if (score > localStorage.getItem("score")) {
          localStorage.setItem("user", userName);
          localStorage.setItem("score", score);
          console.log("user");
          console.log("score");
        }
      } else {
        localStorage.setItem("user", userName);
        localStorage.setItem("score", score);
        console.log("user");
        console.log("score");
      }
    }
  }, 1000);
}

const highscoreButton = document.getElementById("highscorebtn");
highscoreButton.onclick = function () {
  const highscoreHeader = document.createElement("h1");
  const highscoreText = document.createTextNode("High score:");
  highscoreHeader.appendChild(highscoreText);
  const highscoreDisplay = document.createElement("p");
  highscoreDisplay.textContent =
    localStorage.getItem("user") + " : " + localStorage.getItem("score");
};
