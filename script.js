// Quiz Data Structure
const quizData = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: [
            "London",
            "Berlin",
            "Paris",
            "Madrid"
        ],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France."
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: [
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn"
        ],
        correctAnswer: 1,
        explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface."
    },
    {
        id: 3,
        question: "What is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean"
        ],
        correctAnswer: 3,
        explanation: "The Pacific Ocean is the largest and deepest ocean basin on Earth, covering about 63 million square miles."
    },
    {
        id: 4,
        question: "Who painted the famous artwork 'The Starry Night'?",
        options: [
            "Leonardo da Vinci",
            "Pablo Picasso",
            "Vincent van Gogh",
            "Claude Monet"
        ],
        correctAnswer: 2,
        explanation: "Vincent van Gogh painted 'The Starry Night' in 1889 while he was a patient at an asylum in France."
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: [
            "Go",
            "Au",
            "Ag",
            "Gd"
        ],
        correctAnswer: 1,
        explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum' meaning gold."
    },
	{
        id: 6,
        question: "Who painted the Mona Lisa?",
        options: [
            "Vincent van Gogh",
            " Pablo Picasso",
            "Leonardo da Vinci",
            "Michelangelo"
        ],
        correctAnswer: 1,
        explanation: "The Mona Lisa painting is one of the most emblematic portraits in the history of art, where is located at the Louvre. Painted by Leonardo da Vinci in the 16th century."
    },
	{
        id: 7,
        question: "Which river flows through the city of Paris?",
        options: [
           "Thames",
            "Seine",
            "Danube",
            "Rhine"
        ],
        correctAnswer: 1,
        explanation: "The Seine River runs through Paris and is famous for its beautiful bridges and riverside scenery."
    },
	{
        id: 8,
        question: "Which country is famous for inventing Pizza?",
        options: [
            "France",
            "Italy",
            "Spain",
            "Germany"
        ],
        correctAnswer: 1,
        explanation: "Pizza originated in Naples, Italy, and is one of the most iconic Italian dishes."
    },
	{
        id: 9,
        question: "Which European city is known as the 'City of Canals'?",
        options: [
            "Venice",
            "Amsterdam",
            "Bruges",
            "Copenhagen"
        ],
        correctAnswer: 1,
        explanation: "Amsterdam, Italy, is famous for its canals, gongolas, and bridges."
    },
	{
        id: 10,
        question: "Which mountain range separeates Europe from Asia?",
        options: [
            "Alps",
            "Carpathians",
            "Pyrenees",
            "Ural Mountains"
        ],
        correctAnswer: 1,
        explanation: "Carpathians form part of the traditional boundary between the Europe and Asia."
    }
];

// Quiz Application Class
class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.isQuizStarted = false;
        this.isQuizCompleted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.showInstructions();
    }
    
    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            instructions: document.getElementById('instructions'),
            quizContainer: document.getElementById('quizContainer'),
            resultsContainer: document.getElementById('resultsContainer'),
            questionsContainer: document.getElementById('questionsContainer'),
            quizForm: document.getElementById('quizForm'),
            startBtn: document.getElementById('startBtn'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            submitBtn: document.getElementById('submitBtn'),
            restartBtn: document.getElementById('restartBtn'),
            currentQuestion: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            progressFill: document.getElementById('progressFill'),
            scoreText: document.getElementById('scoreText'),
            percentageText: document.getElementById('percentageText'),
            performanceFeedback: document.getElementById('performanceFeedback'),
            answerReview: document.getElementById('answerReview'),
            validationMessage: document.getElementById('validationMessage'),
            validationText: document.getElementById('validationText')
        };
    }
    
    // Bind event listeners
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startQuiz());
        this.elements.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.submitBtn.addEventListener('click', (e) => this.submitQuiz(e));
        this.elements.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.elements.quizForm.addEventListener('submit', (e) => this.submitQuiz(e));
        
        // Add event listeners for option selection
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name.startsWith('question')) {
                this.handleAnswerSelection(e);
            }
        });
    }
    
    // Show instructions screen
    showInstructions() {
        this.elements.instructions.classList.remove('hidden');
        this.elements.quizContainer.classList.add('hidden');
        this.elements.resultsContainer.classList.add('hidden');
        this.elements.totalQuestions.textContent = quizData.length;
    }
    
    // Start the quiz
    startQuiz() {
        this.isQuizStarted = true;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(quizData.length).fill(null);
        this.score = 0;
        
        this.elements.instructions.classList.add('hidden');
        this.elements.quizContainer.classList.remove('hidden');
        this.elements.resultsContainer.classList.add('hidden');
        
        this.renderAllQuestions();
        this.updateProgress();
        this.updateNavigation();
    }
    
    // Render all questions in the quiz
    renderAllQuestions() {
        this.elements.questionsContainer.innerHTML = '';
        
        quizData.forEach((questionData, index) => {
            const questionElement = this.createQuestionElement(questionData, index);
            this.elements.questionsContainer.appendChild(questionElement);
        });
    }
    
    // Create a single question element
    createQuestionElement(questionData, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.setAttribute('data-question', index);
        
        const questionTitle = document.createElement('h3');
        questionTitle.innerHTML = `<span class="question-number">Question ${index + 1}:</span> ${questionData.question}`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        questionData.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `q${index}_option${optionIndex}`;
            radioInput.name = `question${index}`;
            radioInput.value = optionIndex;
            
            const label = document.createElement('label');
            label.setAttribute('for', `q${index}_option${optionIndex}`);
            label.textContent = option;
            
            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(optionsDiv);
        
        return questionDiv;
    }
    
    // Handle answer selection
    handleAnswerSelection(event) {
        const questionIndex = parseInt(event.target.name.replace('question', ''));
        const selectedAnswer = parseInt(event.target.value);
        
        this.userAnswers[questionIndex] = selectedAnswer;
        
        // Add visual feedback
        const questionElement = document.querySelector(`[data-question="${questionIndex}"]`);
        const options = questionElement.querySelectorAll('.option');
        
        options.forEach((option, index) => {
            if (index === selectedAnswer) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        this.updateNavigation();
    }
    
    // Update progress bar and question counter
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / quizData.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
        this.elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
    }
    
    // Update navigation buttons
    updateNavigation() {
        const allAnswered = this.userAnswers.every(answer => answer !== null);
        
        // Show/hide navigation buttons
        this.elements.prevBtn.classList.add('hidden');
        this.elements.nextBtn.classList.add('hidden');
        
        if (allAnswered) {
            this.elements.submitBtn.classList.remove('hidden');
        } else {
            this.elements.submitBtn.classList.add('hidden');
        }
    }
    
    // Navigate to previous question
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateProgress();
            this.updateNavigation();
        }
    }
    
    // Navigate to next question
    nextQuestion() {
        if (this.currentQuestionIndex < quizData.length - 1) {
            this.currentQuestionIndex++;
            this.updateProgress();
            this.updateNavigation();
        }
    }
    
    // Submit the quiz
    submitQuiz(event) {
        event.preventDefault();
        
        // Validate that all questions are answered
        if (!this.validateAnswers()) {
            return;
        }
        
        this.calculateScore();
        this.showResults();
    }
    
    // Validate that all questions have been answered
    validateAnswers() {
        const unansweredQuestions = [];
        
        this.userAnswers.forEach((answer, index) => {
            if (answer === null) {
                unansweredQuestions.push(index + 1);
            }
        });
        
        if (unansweredQuestions.length > 0) {
            this.showValidationMessage(`Please answer question${unansweredQuestions.length > 1 ? 's' : ''}: ${unansweredQuestions.join(', ')}`);
            return false;
        }
        
        return true;
    }
    
    // Show validation message
    showValidationMessage(message) {
        this.elements.validationText.textContent = message;
        this.elements.validationMessage.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.elements.validationMessage.classList.add('hidden');
        }, 3000);
    }
    
    // Calculate the final score
    calculateScore() {
        this.score = 0;
        
        this.userAnswers.forEach((userAnswer, index) => {
            if (userAnswer === quizData[index].correctAnswer) {
                this.score++;
            }
        });
    }
    
    // Show quiz results
    showResults() {
        this.isQuizCompleted = true;
        
        this.elements.quizContainer.classList.add('hidden');
        this.elements.resultsContainer.classList.remove('hidden');
        
        // Display score
        this.elements.scoreText.textContent = `${this.score}/${quizData.length}`;
        
        const percentage = Math.round((this.score / quizData.length) * 100);
        this.elements.percentageText.textContent = `${percentage}%`;
        
        // Show performance feedback
        this.showPerformanceFeedback(percentage);
        
        // Show detailed results
        this.showDetailedResults();
    }
    
    // Show performance feedback based on score
    showPerformanceFeedback(percentage) {
        let feedback = '';
        let title = '';
        
        if (percentage >= 90) {
            title = 'Outstanding Performance!';
            feedback = 'Excellent work! You have demonstrated exceptional knowledge in this subject area. Your score shows mastery of the material.';
        } else if (percentage >= 80) {
            title = 'Great Job!';
            feedback = 'Very good performance! You have a solid understanding of the topic with just a few areas for improvement.';
        } else if (percentage >= 70) {
            title = 'Good Work!';
            feedback = 'Good job! You have a decent grasp of the material, but there\'s room for improvement in some areas.';
        } else if (percentage >= 60) {
            title = 'Fair Performance';
            feedback = 'You have basic knowledge of the subject, but consider reviewing the material to strengthen your understanding.';
        } else {
            title = 'Needs Improvement';
            feedback = 'Consider studying the material more thoroughly. Don\'t worry - practice makes perfect! Try taking the quiz again after reviewing.';
        }
        
        this.elements.performanceFeedback.innerHTML = `
            <h4>${title}</h4>
            <p>${feedback}</p>
        `;
    }
    
    // Show detailed results for each question
    showDetailedResults() {
        this.elements.answerReview.innerHTML = '';
        
        quizData.forEach((questionData, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === questionData.correctAnswer;
            
            const resultItem = document.createElement('div');
            resultItem.className = `answer-item ${isCorrect ? 'correct' : 'incorrect'}`;
            
            resultItem.innerHTML = `
                <div class="question-text">Question ${index + 1}: ${questionData.question}</div>
                <div class="answer-info">
                    <div class="user-answer">Your answer: ${questionData.options[userAnswer]}</div>
                    <div class="correct-answer">Correct answer: ${questionData.options[questionData.correctAnswer]}</div>
                    <div class="status ${isCorrect ? 'correct' : 'incorrect'}">
                        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                    ${questionData.explanation ? `<div class="explanation"><strong>Explanation:</strong> ${questionData.explanation}</div>` : ''}
                </div>
            `;
            
            this.elements.answerReview.appendChild(resultItem);
        });
    }
    
    // Restart the quiz
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.isQuizStarted = false;
        this.isQuizCompleted = false;
        
        // Clear any selected answers
        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.checked = false;
        });
        
        // Remove visual selection indicators
        const selectedOptions = document.querySelectorAll('.option.selected');
        selectedOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        this.showInstructions();
    }
}

// Initialize the quiz application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Additional utility functions

// Function to shuffle array (for future randomization features)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to format time (for future timer features)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to save quiz state to localStorage (for future persistence features)
function saveQuizState(quizApp) {
    const state = {
        currentQuestionIndex: quizApp.currentQuestionIndex,
        userAnswers: quizApp.userAnswers,
        isQuizStarted: quizApp.isQuizStarted,
        timestamp: Date.now()
    };
    localStorage.setItem('quizState', JSON.stringify(state));
}

// Function to load quiz state from localStorage (for future persistence features)
function loadQuizState() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            // Check if the saved state is not too old (e.g., 24 hours)
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            if (Date.now() - state.timestamp < maxAge) {
                return state;
            }
        } catch (error) {
            console.error('Error loading quiz state:', error);
        }
    }
    return null;
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuizApp, quizData, shuffleArray, formatTime };
}
