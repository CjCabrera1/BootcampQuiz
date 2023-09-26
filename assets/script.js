var timerCD = document.getElementById("countdown");
var mainEl = document.getElementById('main');
var messageDiv = document.getElementById('message');  // New variable to hold the message element

// NEED a variable to keep track of the question index
var currentQuestionIndex = 0;
var score = 0;  // Initialize score

// Initialize Timer
var timer = 60;

// An array of questions with options and answers
const questions = [
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
    question: "tes1",
    options: ["Appends an HTML element to the end of a selected element",
      "Appends an HTML element to the beginning of a selected element",
      "Adds the element to an Array",
      "Removes the element"],
    answer: "Appends an HTML element to the end of a selected element"
  },
  {
    question: "test2",
    options: ["Appends an HTML element to the end of a selected element",
      "Appends an HTML element to the beginning of a selected element",
      "Adds the element to an Array",
      "Removes the element"],
    answer: "Appends an HTML element to the end of a selected element"
  }
];
// Start quiz function
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;

  // Before the quiz begins shuffle the deck
  shuffler();
  // once the quiz has begun display the questions and start the timer
  displayQuestion();
  timerUpdate();
}

// Display question function with message display logic
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  mainEl.innerText = question.question;

  const optionsDiv = document.createElement('div');
  optionsDiv.id = 'options';

  for (let i = 0; i < question.options.length; i++) {
    const optionButton = document.createElement('button');
    optionButton.innerText = (i + 1) + ". " + question.options[i];

    optionButton.addEventListener('click', function() {
      if (question.options[i] === question.answer) {
        correct();
        showMessage("Correct!", 3000); // Show for 3 seconds
      } else {
        showMessage("Wrong!", 3000); // Show for 3 seconds
        timer -= 10;
        wrong();
      }

      // Display the next question or end the quiz after the message
      setTimeout(function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          mainEl.innerText = "Quiz Over! Your Score: " + score;
        }
      }, 3000); // Wait for 3 seconds after the message
    });

    optionsDiv.appendChild(optionButton);
  }

  mainEl.appendChild(optionsDiv);
}

// Show message function
function showMessage(message, duration) {
  messageDiv.innerText = message;
  messageDiv.style.display = 'block';

  setTimeout(function() {
    messageDiv.innerText = '';
    messageDiv.style.display = 'none';
  }, duration);
}

// Update timer function
function timerUpdate() {
  timerCD.innerText = "Time left: " + timer + " seconds";
  if (timer > 0) {
    timer--;
    setTimeout(function() {
      timerUpdate();
    }, 1000); // a recursive call that will keep calling the timer to update the text
  } else {
    mainEl.innerText = "Game Over!";
  }
}

// Shuffle function
function shuffler() {
  for (var i = 0; i < questions.length; i++) {
    var r = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[r]] = [questions[r], questions[i]];
  }
}

// Score tracker
function correct() {
  score += 10;
}

function wrong() {
  score -= 2;
}
