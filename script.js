
/**
 * Interactive Quiz Application
 * Features: Dynamic question handling, gradient styling, transition effects
 */

class QuizApp {
    constructor() {
        // Quiz configuration
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.totalQuestions = 0;
        
        // DOM elements
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.resultsScreen = document.getElementById('resultsScreen');
        this.reviewScreen = document.getElementById('reviewScreen');
        
        // Question bank - Dynamic array of quiz questions
        this.questions = [
            {
                id: 1,
                question: "What is the primary purpose of the 'viewport' meta tag in HTML?",
                options: [
                    "To set the character encoding",
                    "To control the page's dimensions and scaling on different devices",
                    "To define the page title",
                    "To link external stylesheets"
                ],
                correct: 1,
                explanation: "The viewport meta tag controls how the page is displayed on mobile devices and different screen sizes."
            },
            {
                id: 2,
                question: "Which CSS property is used to create smooth transitions between different states?",
                options: [
                    "animation",
                    "transform",
                    "transition",
                    "keyframes"
                ],
                correct: 2,
                explanation: "The 'transition' property allows you to define smooth changes between different CSS property values."
            },
            {
                id: 3,
                question: "What is the purpose of the 'addEventListener' method in JavaScript?",
                options: [
                    "To create new HTML elements",
                    "To modify CSS styles",
                    "To attach event handlers to elements",
                    "To validate form data"
                ],
                correct: 2,
                explanation: "addEventListener is used to attach event handlers to DOM elements for user interactions."
            },
            {
                id: 4,
                question: "Which CSS technique is best for creating responsive layouts?",
                options: [
                    "Fixed positioning",
                    "Table layouts",
                    "CSS Grid and Flexbox",
                    "Inline styles"
                ],
                correct: 2,
                explanation: "CSS Grid and Flexbox provide powerful, flexible tools for creating responsive layouts."
            },
            {
                id: 5,
                question: "What is the correct way to check if a variable is an array in JavaScript?",
                options: [
                    "typeof variable === 'array'",
                    "Array.isArray(variable)",
                    "variable instanceof Array",
                    "Both B and C are correct"
                ],
                correct: 3,
                explanation: "Both Array.isArray() and instanceof Array can be used to check if a variable is an array, though Array.isArray() is preferred."
            }
        ];
        
        this.totalQuestions = this.questions.length;
        this.init();
    }

    /**
     * Initialize the quiz application
     */
    init() {
        this.bindEvents();
        this.updateQuestionCount();
        this.showWelcomeScreen();
    }

    /**
     * Bind event listeners to interactive elements
     */
    bindEvents() {
        // Start quiz button
        document.getElementById('startQuiz').addEventListener('click', () => {
            this.startQuiz();
        });

        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // Results screen buttons
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartQuiz();
        });

        document.getElementById('reviewBtn').addEventListener('click', () => {
            this.showReviewScreen();
        });

        document.getElementById('backToResultsBtn').addEventListener('click', () => {
            this.showResultsScreen();
        });
    }

    /**
     * Update the question count display
     */
    updateQuestionCount() {
        const questionCountElement = document.querySelector('.question-count');
        if (questionCountElement) {
            questionCountElement.textContent = this.totalQuestions;
        }
    }

    /**
     * Show the welcome screen with animation
     */
    showWelcomeScreen() {
        this.hideAllScreens();
        setTimeout(() => {
            this.welcomeScreen.classList.add('active');
        }, 100);
    }

    /**
     * Start the quiz and show first question
     */
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        this.hideAllScreens();
        setTimeout(() => {
            this.quizScreen.classList.add('active');
            this.displayQuestion();
        }, 300);
    }

    /**
     * Display the current question with animation
     */
    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update progress
        this.updateProgress();
        
        // Add flip animation to question card
        const questionCard = document.querySelector('.question-card');
        questionCard.classList.add('flip-in');
        
        // Update question number
        document.getElementById('questionNumber').textContent = 
            String(this.currentQuestionIndex + 1).padStart(2, '0');
        
        // Update question text
        document.getElementById('questionText').textContent = question.question;
        
        // Generate answer options
        this.generateAnswerOptions(question);
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            questionCard.classList.remove('flip-in');
        }, 800);
    }

    /**
     * Generate answer options for the current question
     */
    generateAnswerOptions(question) {
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.innerHTML = `
                <input type="radio" 
                       id="answer_${index}" 
                       name="question_${question.id}" 
                       value="${index}">
                <label for="answer_${index}">${option}</label>
            `;
            
            // Add click event to the entire option div
            answerDiv.addEventListener('click', () => {
                this.selectAnswer(index, answerDiv);
            });
            
            // Check if this option was previously selected
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                answerDiv.classList.add('selected');
                answerDiv.querySelector('input').checked = true;
            }
            
            answersContainer.appendChild(answerDiv);
        });
    }

    /**
     * Handle answer selection with visual feedback
     */
    selectAnswer(selectedIndex, selectedDiv) {
        // Remove selection from all options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selection to clicked option
        selectedDiv.classList.add('selected');
        selectedDiv.querySelector('input').checked = true;
        
        // Store the answer
        this.userAnswers[this.currentQuestionIndex] = selectedIndex;
        
        // Enable next button
        document.getElementById('nextBtn').disabled = false;
        
        // Add selection animation
        selectedDiv.style.transform = 'scale(1.02)';
        setTimeout(() => {
            selectedDiv.style.transform = '';
        }, 200);
    }

    /**
     * Update the progress bar and text
     */
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.totalQuestions}`;
    }

    /**
     * Update navigation button states
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next button
        const hasAnswer = this.userAnswers[this.currentQuestionIndex] !== undefined;
        nextBtn.disabled = !hasAnswer;
        
        // Update next button text for last question
        if (this.currentQuestionIndex === this.totalQuestions - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Finish Quiz';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    /**
     * Move to the next question or finish quiz
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    /**
     * Move to the previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    /**
     * Finish the quiz and calculate results
     */
    finishQuiz() {
        this.calculateScore();
        this.hideAllScreens();
        
        setTimeout(() => {
            this.resultsScreen.classList.add('active');
            this.displayResults();
        }, 300);
    }

    /**
     * Calculate the final score
     */
    calculateScore() {
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });
    }

    /**
     * Display the results with animations
     */
    displayResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        // Update score display
        document.getElementById('scoreText').textContent = `${this.score}/${this.totalQuestions}`;
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        
        // Update results icon and message based on performance
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsMessage = document.getElementById('resultsMessage');
        
        if (percentage >= 90) {
            resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultsIcon.className = 'results-icon excellent';
            resultsTitle.textContent = 'Excellent Work!';
            resultsMessage.textContent = 'Outstanding! You have mastered this topic.';
        } else if (percentage >= 70) {
            resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
            resultsIcon.className = 'results-icon good';
            resultsTitle.textContent = 'Great Job!';
            resultsMessage.textContent = 'Well done! You have a good understanding of the material.';
        } else if (percentage >= 50) {
            resultsIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
            resultsIcon.className = 'results-icon fair';
            resultsTitle.textContent = 'Good Effort!';
            resultsMessage.textContent = 'Not bad! With a bit more study, you\'ll do even better.';
        } else {
            resultsIcon.innerHTML = '<i class="fas fa-book"></i>';
            resultsIcon.className = 'results-icon poor';
            resultsTitle.textContent = 'Keep Learning!';
            resultsMessage.textContent = 'Don\'t give up! Review the material and try again.';
        }
        
        // Generate score breakdown
        this.generateScoreBreakdown();
    }

    /**
     * Generate detailed score breakdown
     */
    generateScoreBreakdown() {
        const scoreBreakdown = document.getElementById('scoreBreakdown');
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        scoreBreakdown.innerHTML = `
            <div class="breakdown-item">
                <span class="breakdown-label">Questions Correct:</span>
                <span class="breakdown-value">${this.score}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Questions Incorrect:</span>
                <span class="breakdown-value">${this.totalQuestions - this.score}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Total Questions:</span>
                <span class="breakdown-value">${this.totalQuestions}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Accuracy:</span>
                <span class="breakdown-value">${percentage}%</span>
            </div>
        `;
    }

    /**
     * Show the review screen with detailed answers
     */
    showReviewScreen() {
        this.hideAllScreens();
        
        setTimeout(() => {
            this.reviewScreen.classList.add('active');
            this.generateReviewContent();
        }, 300);
    }

    /**
     * Generate the review content showing all questions and answers
     */
    generateReviewContent() {
        const reviewQuestions = document.getElementById('reviewQuestions');
        reviewQuestions.innerHTML = '';
        
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const correctAnswer = question.correct;
            const isCorrect = userAnswer === correctAnswer;
            
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-question';
            
            reviewDiv.innerHTML = `
                <h4>Question ${index + 1}: ${question.question}</h4>
                <div class="review-answer user-selected">
                    Your answer: ${question.options[userAnswer] || 'No answer selected'}
                </div>
                <div class="review-answer correct">
                    Correct answer: ${question.options[correctAnswer]}
                </div>
                ${!isCorrect ? `<div class="review-answer incorrect">
                    ❌ Incorrect
                </div>` : `<div class="review-answer correct">
                    ✅ Correct
                </div>`}
                <p style="margin-top: 1rem; color: #666; font-style: italic;">
                    ${question.explanation}
                </p>
            `;
            
            reviewQuestions.appendChild(reviewDiv);
        });
    }

    /**
     * Show the results screen
     */
    showResultsScreen() {
        this.hideAllScreens();
        
        setTimeout(() => {
            this.resultsScreen.classList.add('active');
        }, 300);
    }

    /**
     * Restart the quiz from the beginning
     */
    restartQuiz() {
        // Reset all quiz state
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        // Show welcome screen
        this.showWelcomeScreen();
    }

    /**
     * Hide all screens for smooth transitions
     */
    hideAllScreens() {
        this.welcomeScreen.classList.remove('active');
        this.quizScreen.classList.remove('active');
        this.resultsScreen.classList.remove('active');
        this.reviewScreen.classList.remove('active');
    }
}

/**
 * Initialize the quiz application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add initial loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Initialize the quiz application
        const quizApp = new QuizApp();
        
        // Add some console messages for developers
        console.log('🎯 Interactive Quiz Application Loaded');
        console.log('📚 Total Questions:', quizApp.totalQuestions);
        console.log('✨ Features: Gradient styling, smooth transitions, dynamic questions');
        
    }, 100);
});

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', (event) => {
    const activeScreen = document.querySelector('.welcome-screen.active, .quiz-screen.active, .results-screen.active, .review-screen.active');
    
    if (!activeScreen) return;
    
    // Number keys for answer selection (only in quiz screen)
    if (activeScreen.classList.contains('quiz-screen')) {
        const num = parseInt(event.key);
        if (num >= 1 && num <= 4) {
            const answerOptions = document.querySelectorAll('.answer-option');
            if (answerOptions[num - 1]) {
                answerOptions[num - 1].click();
            }
        }
        
        // Arrow keys for navigation
        if (event.key === 'ArrowRight' || event.key === 'Enter') {
            const nextBtn = document.getElementById('nextBtn');
            if (!nextBtn.disabled) {
                nextBtn.click();
            }
        }
        
        if (event.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('prevBtn');
            if (!prevBtn.disabled) {
                prevBtn.click();
            }
        }
    }
    
    // Enter key for starting quiz
    if (activeScreen.classList.contains('welcome-screen') && event.key === 'Enter') {
        document.getElementById('startQuiz').click();
    }
});

/**
 * Add smooth scrolling and focus management
 */
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to top when switching screens
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    smoothScrollToTop();
                }
            }
        });
    });
    
    // Observe all screen elements
    const screens = document.querySelectorAll('.welcome-screen, .quiz-screen, .results-screen, .review-screen');
    screens.forEach(screen => {
        observer.observe(screen, { attributes: true });
    });
});
