"use client"

import { useState } from "react"
import styles from "./test.module.css"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer?: number // Optional for evaluation
}

export default function MCQTest() {
  // Sample questions data
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      id: 3,
      text: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    },
    {
      id: 4,
      text: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    },
    {
      id: 5,
      text: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    },
  ]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add a new state to track whether the test has started
  const [testStarted, setTestStarted] = useState(false)

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

  const handleSubmit = () => {
    setIsSubmitted(true)
    // Here you would typically send the answers to a server
    console.log("Submitted answers:", answers)
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
                <h2 className={styles.resultTitle}>Test Submitted!</h2>
                <p className={styles.resultText}>Thank you for completing the test. Your answers have been recorded.</p>
                <button
                  className={styles.restartButton}
                  onClick={() => {
                    setAnswers(Array(questions.length).fill(null))
                    setCurrentQuestionIndex(0)
                    setIsSubmitted(false)
                    setTestStarted(false)
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

