"use client"

import { useState } from "react"
import styles from "./test.module.css"

// Update the Question interface to include correctAnswer (not optional anymore)
interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number // Now required for scoring
}

export default function MCQTest() {
  // Update the questions array to include correct answers
  const questions: Question[] = [
    {
      id: 1,
      text: "What is JSX in React?",
      options: [
        "A new programming language",
        "A syntax extension for JavaScript",
        "A type of database",
        "A built-in React function"
      ],
      correctAnswer: 1, // JSX is a syntax extension for JavaScript
    },
    {
      id: 2,
      text: "Which method is used to update the state in a functional React component?",
      options: [
        "setState()",
        "useState()",
        "updateState()",
        "modifyState()"
      ],
      correctAnswer: 1, // useState()
    },
    {
      id: 3,
      text: "What is the purpose of the useEffect hook in React?",
      options: [
        "To handle side effects in functional components",
        "To create a new component",
        "To define a new state variable",
        "To modify the JSX structure"
      ],
      correctAnswer: 0, // Handles side effects in functional components
    },
    {
      id: 4,
      text: "Which keyword is used to create a React component as a class component?",
      options: [
        "component",
        "function",
        "class",
        "extends"
      ],
      correctAnswer: 2, 
    },
    {
      id: 5,
      text: "What is the virtual DOM in React?",
      options: [
        "A lightweight copy of the real DOM",
        "A database used by React",
        "A new programming paradigm",
        "An alternative to JavaScript"
      ],
      correctAnswer: 0, // A lightweight copy of the real DOM
    },
];


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add a new state to track whether the test has started
  const [testStarted, setTestStarted] = useState(false)

  // Add a state to store the score
  const [score, setScore] = useState({ correct: 0, total: questions.length })

  // Add this function to start the test
  const startTest = () => {
    setTestStarted(true)
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Update the handleSubmit function to calculate the score
  const handleSubmit = () => {
    let correctCount = 0

    // Calculate the score
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++
      }
    })

    setScore({ correct: correctCount, total: questions.length })
    setIsSubmitted(true)

    // Here you would typically send the answers to a server
    console.log("Submitted answers:", answers)
    console.log("Score:", correctCount, "out of", questions.length)
  }

  const allQuestionsAnswered = answers.every((answer) => answer !== null)
  const progressPercentage = (answers.filter((a) => a !== null).length / questions.length) * 100

  // Modify the return statement to conditionally render welcome screen or test
  return (
    <div className={styles.container}>
      <div className={styles.testCard}>
        {!testStarted ? (
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>Welcome to the MCQ Test</h1>
            <div className={styles.welcomeContent}>
              <p>
                This test consists of {questions.length} multiple choice questions. You can navigate between questions
                using the Previous and Next buttons.
              </p>
              <p>Once you've answered all questions, a Submit button will appear allowing you to complete the test.</p>
            </div>

            <div className={styles.termsContainer}>
              <h3 className={styles.termsTitle}>Terms and Conditions</h3>
              <div className={styles.termsContent}>
                <p>By proceeding with this test, you agree to the following terms:</p>
                <ol>
                  <li>You will complete the test to the best of your ability.</li>
                  <li>Your answers will be recorded for evaluation purposes.</li>
                  <li>You will not use external resources to answer the questions.</li>
                  <li>The test must be completed in a single session.</li>
                  <li>Your results may be shared with relevant stakeholders.</li>
                </ol>
              </div>
            </div>

            <button className={`${styles.navButton} ${styles.startButton}`} onClick={startTest}>
              I Accept the Terms & Start Test
            </button>
          </div>
        ) : (
          <>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className={styles.progressText}>{Math.round(progressPercentage)}% Complete</div>
            </div>

            {!isSubmitted ? (
              <>
                <div className={styles.questionContainer}>
                  <h2 className={styles.questionNumber}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h2>
                  <h3 className={styles.questionText}>{questions[currentQuestionIndex].text}</h3>

                  <div className={styles.optionsContainer}>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        key={index}
                        className={`${styles.optionItem} ${answers[currentQuestionIndex] === index ? styles.selectedOption : ""}`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className={styles.optionCircle}>
                          {answers[currentQuestionIndex] === index && <div className={styles.optionCircleFill}></div>}
                        </div>
                        <span className={styles.optionText}>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.navigationContainer}>
                  <button
                    className={styles.navButton}
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button className={styles.navButton} onClick={goToNextQuestion}>
                      Next
                    </button>
                  ) : (
                    allQuestionsAnswered && (
                      <button className={`${styles.navButton} ${styles.submitButton}`} onClick={handleSubmit}>
                        Submit
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className={styles.resultContainer}>
                <h2 className={styles.resultTitle}>Test Completed!</h2>

                <div className={styles.scoreCard}>
                  <div className={styles.scoreCircle}>
                    <span className={styles.scoreNumber}>{score.correct}</span>
                    <span className={styles.scoreTotal}>/{score.total}</span>
                  </div>
                  <div className={styles.scoreText}>
                    <p className={styles.scorePercentage}>{Math.round((score.correct / score.total) * 100)}%</p>
                    <p className={styles.scoreGrade}>
                      {score.correct === score.total
                        ? "Perfect Score!"
                        : score.correct >= Math.floor(score.total * 0.8)
                          ? "Excellent!"
                          : score.correct >= Math.floor(score.total * 0.6)
                            ? "Good Job!"
                            : "Keep Practicing!"}
                    </p>
                  </div>
                </div>

                <p className={styles.resultText}>Thank you for completing the test. Your answers have been recorded.</p>
                <button
                  className={styles.restartButton}
                  onClick={() => {
                    setAnswers(Array(questions.length).fill(null))
                    setCurrentQuestionIndex(0)
                    setIsSubmitted(false)
                    setTestStarted(false)
                    setScore({ correct: 0, total: questions.length })
                  }}
                >
                  Take Test Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

