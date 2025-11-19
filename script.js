// সাধারণ জ্ঞানের প্রশ্নগুলো একটি অ্যারেতে রাখা হলো
const quizData = [
    {
        question: "বাংলাদেশের রাজধানী কী?",
        options: ["চট্টগ্রাম", "ঢাকা", "খুলনা", "সিলেট"],
        answer: "ঢাকা"
    },
    {
        question: "সূর্য কোন দিক থেকে উদিত হয়?",
        options: ["পশ্চিম", "উত্তর", "পূর্ব", "দক্ষিণ"],
        answer: "পূর্ব"
    },
    {
        question: "জাতীয় ফল কী?",
        options: ["আম", "কাঁঠাল", "পেঁপে", "কলা"],
        answer: "কাঁঠাল"
    }
];

// DOM উপাদানগুলো নির্বাচন করা
const quizElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const retryButton = document.getElementById('retry-button');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// প্রশ্ন লোড করার ফাংশন
function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = ''; // পুরোনো অপশনগুলো মুছে ফেলা
    nextButton.style.display = 'none'; // নেক্সট বাটন লুকানো

    currentQuiz.options.forEach(option => {
        const optionButton = document.createElement('div');
        optionButton.classList.add('option');
        optionButton.textContent = option;
        optionsElement.appendChild(optionButton);

        // অপশন ক্লিক ইভেন্ট
        optionButton.addEventListener('click', () => selectOption(optionButton, option, currentQuiz.answer));
    });
}

// অপশন নির্বাচন করার ফাংশন
function selectOption(button, selectedAnswer, correctAnswer) {
    // যদি আগে থেকেই কোনো অপশন নির্বাচিত থাকে, তাহলে কোনো কাজ হবে না
    if (selectedOption !== null) return;

    selectedOption = selectedAnswer;

    // সব অপশন থেকে 'selected' ক্লাস মুছে ফেলা
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // বর্তমান অপশনকে নির্বাচিত হিসেবে দেখানো
    button.classList.add('selected');

    // সঠিক/ভুল উত্তর পরীক্ষা করা
    if (selectedAnswer === correctAnswer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // সঠিক উত্তরটিও হাইলাইট করা
        document.querySelectorAll('.option').forEach(opt => {
            if (opt.textContent === correctAnswer) {
                opt.classList.add('correct');
            }
        });
    }

    // উত্তর দেওয়ার পর অন্য অপশনগুলোর ক্লিক বন্ধ করা
    document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
    
    // নেক্সট বাটন দেখানো
    nextButton.style.display = 'block';
}

// পরবর্তী প্রশ্নে যাওয়ার ফাংশন
function nextQuestion() {
    currentQuestionIndex++;
    selectedOption = null; // নির্বাচিত অপশন রিসেট করা

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// ফলাফল দেখানোর ফাংশন
function showResult() {
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
}

// কুইজ আবার শুরু করার ফাংশন
function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    resultElement.style.display = 'none';
    quizElement.style.display = 'block';
    loadQuestion();
}

// ইভেন্ট লিসেনার সেট করা
nextButton.addEventListener('click', nextQuestion);
retryButton.addEventListener('click', retryQuiz);

// কুইজ শুরু করা
loadQuestion();
