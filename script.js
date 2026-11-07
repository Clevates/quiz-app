const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which language is used to add interactivity to web pages?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: 2,
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    answers: ["const", "let", "static", "final"],
    correctAnswer: 1,
  },
  {
    question: "Which method adds an item to the end of an array?",
    answers: ["shift()", "pop()", "push()", "slice()"],
    correctAnswer: 2,
  },
  {
    question: "What does === compare in JavaScript?",
    answers: [
      "Only the values",
      "Only the types",
      "The values and their types",
      "Whether two variables have the same name",
    ],
    correctAnswer: 2,
  },
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumberElement = document.querySelector(".question-number");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;
  nextButton.textContent = "Next";
  nextButton.disabled = true;
  hasAnswered = false;

  answersElement.replaceChildren();
  currentQuestion.answers.forEach((answer, answerIndex) => {
    const answerButton = document.createElement("button");
    answerButton.className = "answer";
    answerButton.type = "button";
    answerButton.textContent = answer;
    answerButton.setAttribute("aria-pressed", "false");
    answerButton.addEventListener("click", () => selectAnswer(answerButton, answerIndex));
    answersElement.appendChild(answerButton);
  });
}

function selectAnswer(selectedButton, answerIndex) {
  if (hasAnswered) {
    return;
  }

  hasAnswered = true;
  selectedButton.classList.add("selected");
  selectedButton.setAttribute("aria-pressed", "true");

  if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
  }

  answersElement.querySelectorAll(".answer").forEach((answerButton) => {
    answerButton.disabled = true;
  });
  nextButton.disabled = false;
}

function showResults() {
  questionElement.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;
  questionNumberElement.textContent = "Quiz complete";
  answersElement.replaceChildren();
  nextButton.textContent = "Restart";
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex === questions.length) {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
    return;
  }

  if (!hasAnswered) {
    return;
  }

  currentQuestionIndex += 1;
  if (currentQuestionIndex === questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

renderQuestion();