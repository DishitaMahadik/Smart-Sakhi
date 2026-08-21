// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


// ================= DARK MODE =================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});


// ================= QUIZ =================

const questions = [

    {
        question: "Should you share your OTP with someone who calls you?",
        answers: [
            "Yes",
            "No"
        ],
        correct: 1
    },

    {
        question: "What should you do before sending money using UPI?",
        answers: [
            "Check the receiver's name and amount",
            "Send immediately"
        ],
        correct: 0
    },

    {
        question: "Which password is safer?",
        answers: [
            "123456",
            "MyName123",
            "A long, unique password"
        ],
        correct: 2
    },

    {
        question: "What should you do if you receive a suspicious link?",
        answers: [
            "Click it",
            "Forward it",
            "Do not click it"
        ],
        correct: 2
    },

    {
        question: "Where should you preferably download mobile apps?",
        answers: [
            "Unknown websites",
            "Trusted app stores",
            "Random links"
        ],
        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultElement = document.getElementById("result");
const quizContent = document.getElementById("quizContent");
const scoreElement = document.getElementById("score");


// Display question

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer");

        button.addEventListener("click", () => {
            selectAnswer(button, index);
        });

        answersElement.appendChild(button);

    });

    nextBtn.disabled = true;
}


// Check answer

function selectAnswer(button, selectedIndex) {

    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;

    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach((answer, index) => {

        answer.disabled = true;

        if (index === correctIndex) {
            answer.classList.add("correct");
        }

    });


    if (selectedIndex === correctIndex) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

    }

    nextBtn.disabled = false;
}


// Next question

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Show result

function showResult() {

    quizContent.classList.add("hidden");

    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}.`;

}




function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    resultElement.classList.add("hidden");
    quizContent.classList.remove("hidden");

    showQuestion();

}




showQuestion();