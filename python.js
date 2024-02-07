let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;



const quizArray = [
    {
        id: "0",
        question: "Who developed Python Programming Language?",
        options: ["John", "Guido van Rossum", "Lord henry", "Mayank Joshi"],
        correct: "Guido van Rossum",
    },
    {
        id: "1",
        question: "Which of the following is the correct extension of the Python file?",
        options: [".py", ".pp", ".a", ".c"],
        correct: ".py",
    },
    {
        id: "2",
        question: "Which of the following character is used to give single-line comments in Python?",
        options: ["*", "$", "//", "#"],
        correct: "#",
    },
    {
        id: "3",
        question: " Which of the following is the truncation division operator in Python?",
        options: ["//", "/", "%", "*"],
        correct: "//",
    },
    {
        id: "4",
        question: "Which of the following is not a core data type in Python programming?",
        options: ["list", "Class", "tuple", "dictionary"],
        correct: "Class",
    },
    {
        id: "5",
        question: "The main computer that stores the files that can be sent to computers that are networked together is:",
        options: ["Clip art", "Mother board", "Peripheral", "File server"],
        correct: "File server",
    }, {
        id: "6",
        question: "Which of the following statements is used to create an empty set in Python?",
        options: ["set()", "{}", "()", "[]"],
        correct: "set()",
    },
    {
        id: "7",
        question: "What is the maximum possible length of an identifier in Python?",
        options: ["34", "54", "45", "None"],
        correct: "None",
    },
    {
        id: "8",
        question: "Python is interpreted language?",
        options: ["yes", "no", "cant say", "not a language"],
        correct: "yes",
    },
    {
        id: "9",
        question: "Python developed in?",
        options: ["1991", "1800", "2000", "1900"],
        correct: "1991",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
       
        questionCount += 1;
       
        if (questionCount == quizArray.length) {
          
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
           
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
         
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
           
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};


const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
      
        i.options.sort(() => Math.random() - 0.5);
       
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
   
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
   
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}


function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

   
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    
    clearInterval(countdown);
    
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};