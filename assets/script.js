var timerCD = document.getElementById("countdown");
var mainEl = document.getElementById('main');
var messageDiv = document.getElementById('message');
var startButton = document.getElementById('start-button');
var clearScoreBtn = document.getElementById('clear-scores');
var viewScoresEl = document.getElementById('viewScores');
var currentQuestionIndex = 0; // Variable to keep track of the current question
var score = 0;  // Initialize score

var isGameOver = false; // Variable to check if the game is over
var timer = 60;
var questions = [
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["padding", "background-color", "bgcolor", "background"],
    answer: "background-color"
  },
  {
    question: "In JavaScript, what does the '.append()' method do?",
    options: ["Appends an HTML element to the end of a selected element",
      "Appends an HTML element to the beginning of a selected element",
      "Adds the element to an Array",
      "Removes the element"],
    answer: "Appends an HTML element to the end of a selected element"
  },
  {
    question: "Javascript is a(n) _______ language?",
    options: ["Object-Based",
      "Procedural",
      "Functional",
      "None of the above"],
    answer: "Functional"
  },
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    options: ["var",
      "let",
      "Both 1 & 2",
      "None of the above"],
    answer: "Both 1 & 2"
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    options: ["getElementbyid()",
      "getElementsByClassName()",
      "Both 1 & 2",
      "None of the above"],
    answer: "Both 1 & 2"
  }
];
var displayedScores = false;
viewScoresEl.addEventListener('click',function(){
  if (!displayedScores){
    displayScores();
    viewPlayerScores();
    displayedScores = true;
  }else{
    goBack();
    viewScoresEl.innerText = "View High Scores";
    displayedScores = false;
  }
})

// Event listener for the start button
startButton.addEventListener('click', startQuiz);
// Start quiz function
function startQuiz() {
  // Reset game state
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;
  isGameOver = false;
  shuffler(); // Shuffle the questions
  displayQuestion(); // Display the first question
  let runningTime = setInterval(function(){
    timer--;
    timerCD.innerText = "Time left: " + timer + " seconds";
    if (timer<=0){
      isGameOver=true;
      timer=0;
      displayScoreInput();
      timerCD.innerText = "Time left: " + timer + " seconds";
      clearInterval(runningTime);
    }else{
        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          displayScoreInput();
        }
    }
  },1000);
  startButton.disabled = false;
  startButton.disabled = true;
}

// Display question function with message display logic
function displayQuestion() {
  if (!isGameOver){
    if (currentQuestionIndex===questions.length){
      isGameOver=true;
      timer=0;
      return;
    }
    const question = questions[currentQuestionIndex];
    mainEl.innerText = question.question;

    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'options';

    for (let i = 0; i < question.options.length; i++) {
      const optionButton = document.createElement('button');
      optionButton.innerText = (i + 1) + ". " + question.options[i];

      optionButton.addEventListener('click', function () {
        if (question.options[i] === question.answer) {
          correct();
          showMessage("Correct!");
        } else {
          showMessage("Wrong! The correct answer was: " + question.answer);
          timer -= 5;
          wrong();
        }
        currentQuestionIndex++;
        displayQuestion();
      });

      optionsDiv.appendChild(optionButton);
    } 
    mainEl.appendChild(optionsDiv);
  }else{
    displayScoreInput();
  }
}

// Show message function
function showMessage(message) {
  messageDiv.innerText = message;
  messageDiv.style.display = 'block';

  setTimeout(function () {
    messageDiv.innerText = '';
    messageDiv.style.display = 'none';
  }, 2000);
}

// Shuffle function
function shuffler() {
  for (var i = 0; i < questions.length; i++) {
    var r = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[r]] = [questions[r], questions[i]];
  }
}

// Functions to update the score
function correct() {
  score += 10;
}

function wrong() {
  score -= 5;
}

// Save player's name and score to local storage
function saveScore(playerName, score) {
  var scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ playerName, score });
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Display score input form
function displayScoreInput() {
  mainEl.innerHTML = ''; // Clear any existing content

  var heading = document.createElement('h2');
  heading.textContent = "Quiz Over! Your Score: " + score;
  mainEl.appendChild(heading);

  var nameLabel = document.createElement('label');
  nameLabel.textContent = "Enter your name: ";
  mainEl.appendChild(nameLabel);

  var playerNameInput = document.createElement('input');
  playerNameInput.setAttribute('type', 'text');
  playerNameInput.setAttribute('id', 'playerName');
  playerNameInput.setAttribute('placeholder', 'Your name');
  mainEl.appendChild(playerNameInput);

  var playAgainButton = document.createElement('button');
  playAgainButton.id = 'play-again-button';
  playAgainButton.textContent = 'Play Again';
  playAgainButton.addEventListener('click', playAgain);

  var submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', function () {
    var playerName = playerNameInput.value;
    saveScore(playerName, score);
    displayScores();
  });
  mainEl.appendChild(submitButton);
  mainEl.appendChild(playAgainButton); // Add the play again button to the display
}

// Display top 5 scores
function displayScores() {
  var players = JSON.parse(localStorage.getItem('scores'));
  players.sort(function(a,b){// Sort scores in descending order
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });
  var scoresDiv = document.getElementById('scores');

  scoresDiv.innerHTML = ''; // Clear existing content

  if (players.length) {
    // Display the top 5 players
    var heading = document.createElement('p');
    heading.textContent = 'HIGH SCORES:';
    scoresDiv.appendChild(heading);

    var maxDisplay = Math.min(players.length, 5);
    for (var i = 0; i < maxDisplay; i++) {
      if (players[i].playerName && players[i].score) {
        var scoreElement = document.createElement('p');
        scoreElement.textContent = players[i].playerName + ': ' + players[i].score;
        scoresDiv.appendChild(scoreElement);
      }
    }
  } else {
    // Display a message when no players are available
    var noplayersElement = document.createElement('p');
    noplayersElement.textContent = 'No scores available.';
    scoresDiv.appendChild(noplayersElement);
  }
  scoresDiv.style.display = 'block';
}

function goBack(){
  var scoresDiv = document.getElementById('scores');
  scoresDiv.style.display = 'none';
  startButton.style.display= 'block';
  timerCD.style.display='block';
  clearScoreBtn.style.display='none';
}

function viewPlayerScores(){
  startButton.style.display= 'none';
  timerCD.style.display='none';
  clearScoreBtn.style.display='block';
  viewScoresEl.innerText = "Go Back";
}

function clearScores() {
  localStorage.removeItem('scores');
  displayScores();
}

function playAgain(){
  // Reset game state
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;
  isGameOver = false;
  startButton.disabled = false;
  // Clear displayed content
  mainEl.innerHTML = '';
  messageDiv.innerText = '';

  // Display the start button and timer
  startButton.style.display = 'block';
  timerCD.style.display = 'block';

  // Hide the clear scores button if it's visible
  if (clearScoreBtn.style.display === 'block') {
    clearScoreBtn.style.display = 'none';
  }
}
