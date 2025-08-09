function showSection(sectionId) {
            const sections = document.querySelectorAll('.feature-section');
            sections.forEach(section => section.style.display = 'none');
            document.getElementById(sectionId).style.display = 'block';
        }

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});


//Custom Worksheet Generator
        

       let customQuestions = []; // Store all added questions

function addWorksheetQuestion(event) {
    if (event) event.preventDefault();

    const questionInput = document.getElementById('worksheetQuestion');
    const question = questionInput.value.trim();


        customQuestions.push(question);

        const list = document.getElementById('worksheetQuestionsList');
        const li = document.createElement('li');
        li.textContent = question;
        list.appendChild(li);

        questionInput.value = '';
   
    
}

const API_KEY = "AIzaSyCqyhUunDCLm2mKeGqnpUseALkZI-rcqIw";

async function downloadWorksheet() {
    const subject = document.getElementById("subject").value;
    const standard = document.getElementById("class").value;
    const board = document.getElementById("cbse").value;
    const numQuestions = document.getElementById("numQuestions").value;
    const difficulty = document.getElementById("difficulty").value;

    const prompt = `Generate ${numQuestions} ${difficulty} ${subject} questions for Class ${standard} (${board} board). Only provide questions in numbered list format, no answers.`;

    try {
        // 1. Call Gemini API
        const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                { parts: [{ text: prompt }] }
            ]
        })
    }
);

        const data = await response.json();
const aiText = data.candidates[0].content.parts[0].text;



        // 2. Create PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("AI Worksheet by Edu Platform", 105, 15, { align: "center" });

        // Subtitle info
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)}`, 20, 25);
        doc.text(`Class: ${standard}`, 105, 25);
        doc.text(`Board: ${board}`, 170, 25);

        // Divider line
        doc.setDrawColor(0, 0, 0);
        doc.line(20, 28, 190, 28);

        // 3. Format questions
        let y = 40;
        const questions = aiText.split("\n").filter(q => q.trim() !== "");
        questions.forEach((q, index) => {
            const questionText = `${index + 1}. ${q.replace(/^\d+\.\s*/, "")}`;
            const splitText = doc.splitTextToSize(questionText, 170);

            if (y + splitText.length * 7 > 280) { // New page if space is low
                doc.addPage();
                y = 20;
            }

            doc.text(splitText, 20, y);
            y += splitText.length * 7;
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Made with AI via EduPlatform", 105, 290, { align: "center" });

        // 4. Save PDF
        doc.save(`worksheet_${subject}.pdf`);

    } catch (err) {
        console.error("Error:", err);
        alert("Failed to generate worksheet. Check API key or network.");
    }
}

function downloadCustomWorksheet() {
    if (customQuestions.length === 0) {
        alert("Add at least one question before downloading.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Custom Worksheet", 105, 20, { align: "center" });

    // Subtitle
    doc.setFontSize(12);
    doc.text("Made with AI via Edu-Platform", 105, 28, { align: "center" });

    // Questions
    doc.setFontSize(14);
    let y = 40;
    customQuestions.forEach((q, i) => {
        let questionText = `${i + 1}. ${q}`;
        let splitText = doc.splitTextToSize(questionText, 170);
        doc.text(splitText, 20, y);
        y += (splitText.length * 7) + 15; // Space + room for answers

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    // Save PDF
    doc.save("custom_worksheet.pdf");
}


        function updateQuestionFields() {
            const questionType = document.getElementById('questionType').value;
            const mcqOptions = document.getElementById('mcqOptions');
            const trueFalseOptions = document.getElementById('trueFalseOptions');
            const fillInTheBlankOptions = document.getElementById('fillInTheBlankOptions');

            // Hide all options initially
            mcqOptions.style.display = 'none';
            trueFalseOptions.style.display = 'none';
            fillInTheBlankOptions.style.display = 'none';

            // Show fields based on selected question type
            if (questionType === 'multipleChoice') {
                mcqOptions.style.display = 'block';
            } else if (questionType === 'trueFalse') {
                trueFalseOptions.style.display = 'block';
            } else if (questionType === 'fillInTheBlank') {
                fillInTheBlankOptions.style.display = 'block';
            }
        }

        //Close Pop Up
        function closePopUp() {
            document.getElementById('resultModal').style.display = 'none'; // Hide the modal
        }

        //Tic Tac Toe With Player    
        let currentPlayer = 'X'; // Start with player X
        let board = ['', '', '', '', '', '', '', '', '']; // Initialize the board
        let gameActive = true; // To check if the game is still ongoing

        function makeMove(index) {
            if (board[index] !== '' || !gameActive) return; // Ignore if cell is taken or game is over

            board[index] = currentPlayer; // Mark the cell
            document.getElementById('ticTacToeBoard').children[index].innerText = currentPlayer; // Update UI
            document.getElementById('ticTacToeBoard').children[index].classList.add('taken'); // Add taken class
            checkWinner(); // Check for a winner
        }

        function checkWinner() {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    const winnerMessage = `Player ${currentPlayer} wins!`;
                    document.getElementById('resultMessage').innerText = winnerMessage;
                    document.getElementById('resultModal').style.display = 'flex'; // Show modal
                    gameActive = false; // End the game
                    return;
                }
            }

            if (!board.includes('')) {
                document.getElementById('resultMessage').innerText = "It's a draw!";
                document.getElementById('resultModal').style.display = 'flex'; // Show modal
                gameActive = false; // End the game
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', '']; // Reset the board
            gameActive = true; // Reset game status
            currentPlayer = 'X'; // Reset to player X
            document.getElementById('gameStatus').innerText = ''; // Clear the status message

            const cells = document.getElementById('ticTacToeBoard').children;
            for (let cell of cells) {
                cell.innerText = ''; // Clear the UI
                cell.classList.remove('taken'); // Remove taken class
            }

            closePopUp();

        }




       
        

       

        // ================================
        // Worksheet Generator Functions
        // ================================
        const questionBank = {
            math: {
                easy: [
                    "What is 2 + 2?",
                    "What is 5 - 3?",
                    "What is 3 × 4?",
                    "What is 10 ÷ 2?",
                    "What is the square of 3?"
                ],
                medium: [
                    "Solve for x: 2x + 5 = 13.",
                    "What is the area of a triangle with base 5 and height 10?",
                    "Simplify: (3²) + (4²).",
                    "What is the perimeter of a rectangle with length 8 and width 5?",
                    "Find the value of 15% of 200."
                ],
                hard: [
                    "Integrate the function f(x) = 3x².",
                    "Solve the equation: x³ - 6x² + 11x - 6 = 0.",
                    "What is the derivative of sin(x)?",
                    "Calculate the limit: lim(x→0) (sin(x)/x).",
                    "What is the solution to the differential equation dy/dx = 2x?"
                ]
            },
            science: {
                easy: [
                    "What is the chemical symbol for water?",
                    "What planet is known as the Red Planet?",
                    "What gas do plants absorb from the atmosphere?",
                    "What is H₂O commonly known as?",
                    "What force keeps us grounded on Earth?"
                ],
                medium: [
                    "What is the powerhouse of the cell?",
                    "What is the chemical formula for table salt?",
                    "Define Newton's Second Law of Motion.",
                    "What is the process by which plants make their food?",
                    "Name the three states of matter."
                ],
                hard: [
                    "Explain the theory of relativity.",
                    "What is the Heisenberg Uncertainty Principle?",
                    "Describe the process of nuclear fusion.",
                    "What is the significance of the Pauli Exclusion Principle?",
                    "Define Schrödinger's Cat paradox."
                ]
            }
        };

        function generateWorksheet() {
            const subject = document.getElementById('subject').value;
            const numQuestions = parseInt(document.getElementById('numQuestions').value);
            const difficulty = document.getElementById('difficulty').value;
            const questionType = document.getElementById('questionType').value;

            const availableQuestions = questionBank[subject][difficulty];
            if (!availableQuestions) {
                alert('No questions available for the selected options.');
                return;
            }

            if (numQuestions > availableQuestions.length) {
                alert(`Only ${availableQuestions.length} questions available for ${subject} (${difficulty} difficulty).`);
                return;
            }

            const selectedQuestions = shuffleArray(availableQuestions).slice(0, numQuestions);
            let worksheetContent = `<h3>Generated Worksheet for ${capitalize(subject)}</h3><ol>`;

            selectedQuestions.forEach((q, index) => {
                worksheetContent += `<li>${q}</li>`;
            });
            worksheetContent += `</ol>`;

            document.getElementById('generatedWorksheet').innerHTML = worksheetContent;
        }

        // Utility function to shuffle an array
        function shuffleArray(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        // Capitalize first letter
        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // ==========================
        // Quiz Generator Functions
        // ==========================
     let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let correctAnswers = [];

async function startQuiz() {
  const numQuestions = parseInt(document.getElementById('quizNumQuestions').value);
  document.getElementById("quizArea").style.display = "block";
  document.getElementById("quizArea").innerHTML = "";
document.getElementById('quizLoad').style.display = "block";


  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`);
    const data = await response.json();

    currentQuiz = data.results;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    correctAnswers = currentQuiz.map(q => decodeHtmlEntities(q.correct_answer)); // fix: set correct answers

    document.getElementById('quizArea').innerHTML = '';
    document.getElementById('quizLoad').style.display = 'none';
    displayQuizQuestion();
  } catch (error) {
    alert('Error fetching quiz questions: ' + error.message);
  }
}

function displayQuizQuestion() {
  if (currentQuestionIndex < currentQuiz.length) {
    const questionData = currentQuiz[currentQuestionIndex];
    const quizArea = document.getElementById('quizArea');
    const question = decodeHtmlEntities(questionData.question);
    const correctAnswer = decodeHtmlEntities(questionData.correct_answer);
    const options = [...questionData.incorrect_answers.map(decodeHtmlEntities), correctAnswer];
    const shuffledOptions = shuffleArray(options);

   
   const colors = ['bg-blue', 'bg-orange', 'bg-green', 'bg-pink'];
let optionsHTML = shuffledOptions.map((opt, idx) => {
  const color = colors[idx % colors.length];
  return `
    <input type="radio" id="option${idx}" name="answer" value="${sanitize(opt)}">
    <label for="option${idx}" class="option-card ${color}">${sanitize(opt)}</label>
  `;
}).join('');

quizArea.innerHTML = `
  <div class="question-card">
    <h3 class="question-card">Question ${currentQuestionIndex + 1}</h3>
    <p class="question-card">${sanitize(question)}</p>
  </div>
  <div class="quiz-options">
    ${optionsHTML}
  </div>
  <button class="quiz-submit" onclick="submitQuizAnswer()">Submit Answer</button>
`;
  } else {
    displayQuizResult();
  }
}

function submitQuizAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert('Please select an answer before submitting.');
    return;
  }

  const userAnswer = selectedOption.value;
  const correctAnswer = correctAnswers[currentQuestionIndex];

  userAnswers.push(userAnswer);

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    
  }
    
  

  currentQuestionIndex++;
  displayQuizQuestion();
}

function displayQuizResult() {
  const quizArea = document.getElementById('quizArea');
  quizArea.innerHTML = `
    <h3 style="color: white;">Quiz Completed!</h3>
    <p style="color: white;">Your Score: ${score} out of ${currentQuiz.length}</p>
    <button onclick="reviewQuiz()">Review Answers</button>
    <button onclick="play()">Play Again</button>
    <button onclick="goBack()">Go to home</button>
  `;
}

function reviewQuiz() {
  const quizArea = document.getElementById('quizArea');
  let reviewContent = `<h3 class="quiz-question">Quiz Review</h3><ol>
      <button onclick="play()">Play Again</button>
    <button onclick="goBack()">Go to home</button>`;
    

  for (let i = 0; i < currentQuiz.length; i++) {
    const question = decodeHtmlEntities(currentQuiz[i].question);
    const userAnswer = userAnswers[i];
    const correctAnswer = correctAnswers[i];

    reviewContent += `
      <li>
        <strong>${sanitize(question)}</strong><br>
        Your Answer: ${sanitize(userAnswer)}<br>
        Correct Answer: ${sanitize(correctAnswer)}<br>
        ${userAnswer.toLowerCase() === correctAnswer.toLowerCase() ? '<span style="color:green;">Correct</span>' : '<span style="color:red;">Incorrect</span>'}
      </li>
     
    `;
  }

  reviewContent += `</ol>`;
  quizArea.innerHTML = reviewContent;
}

function decodeHtmlEntities(str) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function play() {
   document.getElementById('quizArea').style.display = "none";
   showSection('quiz-generator');
   
}

function goBack() {
    document.getElementById('quizArea').style.display = "none";
    showSection('home-section');

}


 

        

 document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home-section');
  if (home) home.style.display = "block";
  
});


     function showAuthForm() {
                const authContainer = document.getElementById('auth-container');
                authContainer.style.display = 'block'; // Show the auth container
            }