// Get HTML elements by their IDs
var timerCD = document.getElementById("countdown");
var mainEl = document.getElementById('main');
var messageDiv = document.getElementById('message');
var startButton = document.getElementById('start-button');
var isGameOver = false; // Variable to check if the game is over

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

// Event listener for the start button
startButton.addEventListener('click', startQuiz);
// Start quiz function
function startQuiz() {
  // Reset game state
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 60; // absolute timer
  isGameOver = false;
  shuffler(); // Shuffle the questions

  let runningTime = setInterval(function(){
    timer--;
    if (timer<=0){
      isGameOver=true;
      clearInterval(runningTime);
    }
    timerCD.innerText = "Time left: " + timer + " seconds";
  },1000);

  // Display Questions
  let optionsDiv = document.getElementById('options');
  let scoreTag = document.getElementById('userScore');
  questions.forEach(function(currentValue,index){
    mainEl.innerText = currentValue.question;

    // creating buttons for each option
    currentValue.options.forEach(function(choice){
      let optionButton = document.createElement('button');
      optionButton.innerText = (index + 1) + ". " + choice;
      optionsDiv.appendChild(optionButton);
      // check if button was clicked and if it was the right/wrong answer
      optionButton.addEventListener('click', function () {
        if (choice === currentValue.answer) {
          score+=10;
          scoreTag.innerText = score + " Points";
        }else{
          timer-=5;
        }
      });


    })
  });
  startButton.disabled = true; // Disable the start button
}

// Display question function with message display logic
function displayQuestion() {
    // optionButton.addEventListener('click', function () {
    //   if (question.options[i] === question.answer) {
    //     correct();
    //     showMessage("Correct!", 1000);
    //   } else {
    //     showMessage("Wrong!", 1000);
    //     wrong();
    //   }

  //     setTimeout(function () {
  //       currentQuestionIndex++;
  //       if (currentQuestionIndex < questions.length) {
  //         displayQuestion();
  //       } else {
  //         displayScoreInput();
  //       }
  //     }, 1000);
  //   });

  //   optionsDiv.appendChild(optionButton);
  // }
  // mainEl.appendChild(optionsDiv);
}

// Show message function
function showMessage(message, duration) {
  messageDiv.innerText = message;
  messageDiv.style.display = 'block';

  setTimeout(function () {
    messageDiv.innerText = '';
    messageDiv.style.display = 'none';
  }, duration);
}

// Update timer function
  // if (timer >= 0) {
  //   timerCD.innerText = "Time left: " + timer + " seconds";
  //   timer--;
  //   setTimeout(updateTimer, 1000);
  // } else {
  //   // If time runs out for a question, proceed to the next question or end the quiz
  //   currentQuestionIndex++;
  //   if (currentQuestionIndex < questions.length) {
  //     displayQuestion();
  //   } else {
  //     displayScoreInput();
  //   }
  // }
// }
// Shuffle function
function shuffler() {
  for (var i = 0; i < questions.length; i++) {
    var r = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[r]] = [questions[r], questions[i]];
  }
}

function wrong() {
  score -= 1;
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

  var submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', function () {
  var playerName = playerNameInput.value;
  saveScore(playerName, score);
  displayScores();
  });
  mainEl.appendChild(submitButton);
}

// Display top 5 scores
function displayScores() {
  var scores = JSON.parse(localStorage.getItem('scores'));
  var scoresDiv = document.getElementById('scores');

  scoresDiv.innerHTML = ''; // Clear existing content

  if (scores && scores.length > 0) {
    // Sort scores in descending order
    scores.sort(function(a,b){
      b.score - a.score;
    });

    // Display the top 5 scores
    var heading = document.createElement('p');
    heading.textContent = 'HIGH SCORES:';
    scoresDiv.appendChild(heading);

    var maxDisplay = Math.min(scores.length, 5);
    for (var i = 0; i < maxDisplay; i++) {
      if (scores[i].playerName && scores[i].score) {
        var scoreElement = document.createElement('p');
        scoreElement.textContent = scores[i].playerName + ': ' + scores[i].score;
        scoresDiv.appendChild(scoreElement);
      }
    }
  } else {
    // Display a message when no scores are available
    var noScoresElement = document.createElement('p');
    noScoresElement.textContent = 'No scores available.';
    scoresDiv.appendChild(noScoresElement);
  }
}




