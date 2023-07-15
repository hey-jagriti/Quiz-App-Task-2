// questions for the quiz --------------------------------------------
const questions = [
  
  {
    question: "Which city is known as the Pink City of India?",
    choices:["Delhi", "Jaipur", "Mumbai", "Kolkata"],
    correct: 1,
    
  },
  {
    question: "Who was the first Prime Minister of India?",
    choices: ["Mahatma Gandhi", "Jawaharlal Nehru", "Rajendra Prasad", "Indira Gandhi"],
    correct: 1,
   
  },
  {
    question: "In which year did India gain independence from British rule?",
    choices: ["1947", "1950", "1945", "1939"],
    correct: 0,
  },
  

  {
    question: "What is the highest civilian award in India called?",
    choices: ["Bharat Ratna", "Padma Vibhushan", "Padma Bhushan", "Padma Shri"],
    correct: 0,
  },
  {
    question: "Who is known as the Father of the Indian Constitution?",
    choices: ["B. R. Ambedkar", "Jawaharlal Nehru", "Mahatma Gandhi", "Rahul Gandhi"],
    correct: 0,
  },
];
//////////////////////////////////////////////////////////////////////

// html elements
const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector(".quiz-container>h2");
const radios = document.querySelectorAll("input[type='radio']");
const labels = document.querySelectorAll("label");
const submitBtn = document.querySelector("button.submit");
const resultContainer = document.querySelector(".result-container");
const resultHeading = document.querySelector(".result-container h2");

// reload button is created
const reloadButton = document.createElement("button");
reloadButton.classList.add("reload");
reloadButton.innerHTML = "Reload";
reloadButton.addEventListener("click", () => {
  location.reload();
});
//////////////////////////////////////////////////////////////////////

// global variables
// the user answers will be stored here
const userAnswers = [];

// index used to iterate on the questions
let questionIndex = 0;
//////////////////////////////////////////////////////////////////////

function loadNextQuestion() {
  // updating question
  questionElement.innerHTML = `${questionIndex + 1}/${questions.length}: ${
    questions[questionIndex].question
  }`;
  // updating choices
  labels.forEach((label, idx) => {
    label.innerHTML = questions[questionIndex].choices[idx];
  });
  // clearing radio inputs
  radios.forEach((radio) => {
    radio.checked = false;
  });
  // incrementing the global question index
  questionIndex++;
}

//////////////////////////////////////////////////////////////////////

// event listener for submit button in quiz container
submitBtn.addEventListener("click", () => {
  // find the selected answer
  let selectedAnswer = -1;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked === true) {
      selectedAnswer = i;
      break;
    }
  }

  // store the selected answer
  userAnswers.push(selectedAnswer);

  // load new questions if available
  if (questionIndex < questions.length) {
    loadNextQuestion();
  }
  // else load the result
  else {
    // counting the number of correct answers
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === questions[i].correct) {
        numberOfCorrectAnswers++;
      }
    }

    // making the quiz-container invisible
    // and making the result-container visible
    quizContainer.classList.add("invisible");
    resultContainer.classList.remove("invisible");

    // "x/y questions correct"
    resultHeading.innerHTML = `You answered ${numberOfCorrectAnswers}/${questions.length} questions correctly!`;

    // display all the questions along with their correct answers
    questions.forEach((element) => {
      // create a new div to store the question and answer
      const questionAnswerDiv = document.createElement("div");
      questionAnswerDiv.innerHTML = `<h4>${element.question}</h4>
      <p>Correct Answer: ${element.choices[element.correct]}</p>`;
      questionAnswerDiv.classList.add("question-answer");
      // append this div into result container
      resultContainer.appendChild(questionAnswerDiv);
    });
    // append the reload button
    resultContainer.appendChild(reloadButton);
  }
});

// load the first question
loadNextQuestion();
