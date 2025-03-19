"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import styles from "./test.module.css"

interface Question {
  questionId: number
  question: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  correctAnswer: number
}

interface Test {
  testId: string
  testContent: {
    questionContent: Question[]
  }
}

interface User {
  _id: string;
  selectedJob: {
    jobId: string;
  };

}
interface MCQTestProps {
  user: User;
}

const MCQTest = ({user}: MCQTestProps) => {
  const userId = user._id
  // const jobId = user.selectedJob.jobId
  const jobId = "Job1742286622422" // hardcoded for now
  const [testId, setTestId] = useState("Test1742290753151")

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const updateUserUrl = process.env.NEXT_PUBLIC_UPDATE_USER_URL

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get<Test>(`http://localhost:3001/tests/${testId}`)
        const test = response.data

        console.log("Fetched test data:", test) // Log the fetched data

        if (test.testContent && test.testContent.questionContent) {
          setQuestions(test.testContent.questionContent)
          setAnswers(Array(test.testContent.questionContent.length).fill(null))
          setScore({ correct: 0, total: test.testContent.questionContent.length })
        } else {
          console.error("Invalid test data structure:", test)
        }
      } catch (error) {
        console.error("Error fetching test data:", error)
      }
    }

    fetchTestData()
  }, [testId])

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

  const handleSubmit = async () => {
    let correctCount = 0

    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctCount++
      }
    })

    setScore({ correct: correctCount, total: questions.length })
    setIsSubmitted(true)

    console.log("Submitted answers:", answers)
    console.log("Score:", correctCount, "out of", questions.length)

    try {
      const response = await fetch(`${updateUserUrl}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tests: [
            {
              jobId,
              testId,
              marks: correctCount,
            },
          ],
        }),
      })

      if (!response.ok) {
        console.log("Failed to update user data!")
      } else {
        console.log("User general data updated!")
      }
    } catch (error) {
      console.error("Error submitting test results:", error)
    }
  }

  const allQuestionsAnswered = answers.every((answer) => answer !== null)
  const progressPercentage = (answers.filter((a) => a !== null).length / questions.length) * 100

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
                  <h3 className={styles.questionText}>{questions[currentQuestionIndex]?.question}</h3>

                  <div className={styles.optionsContainer}>
                    {questions[currentQuestionIndex] && (
                      <>
                        <div
                          className={`${styles.optionItem} ${answers[currentQuestionIndex] === 1 ? styles.selectedOption : ""}`}
                          onClick={() => handleAnswerSelect(1)}
                        >
                          <div className={styles.optionCircle}>
                            {answers[currentQuestionIndex] === 1 && <div className={styles.optionCircleFill}></div>}
                          </div>
                          <span className={styles.optionText}>{questions[currentQuestionIndex].answer1}</span>
                        </div>
                        <div
                          className={`${styles.optionItem} ${answers[currentQuestionIndex] === 2 ? styles.selectedOption : ""}`}
                          onClick={() => handleAnswerSelect(2)}
                        >
                          <div className={styles.optionCircle}>
                            {answers[currentQuestionIndex] === 2 && <div className={styles.optionCircleFill}></div>}
                          </div>
                          <span className={styles.optionText}>{questions[currentQuestionIndex].answer2}</span>
                        </div>
                        <div
                          className={`${styles.optionItem} ${answers[currentQuestionIndex] === 3 ? styles.selectedOption : ""}`}
                          onClick={() => handleAnswerSelect(3)}
                        >
                          <div className={styles.optionCircle}>
                            {answers[currentQuestionIndex] === 3 && <div className={styles.optionCircleFill}></div>}
                          </div>
                          <span className={styles.optionText}>{questions[currentQuestionIndex].answer3}</span>
                        </div>
                        <div
                          className={`${styles.optionItem} ${answers[currentQuestionIndex] === 4 ? styles.selectedOption : ""}`}
                          onClick={() => handleAnswerSelect(4)}
                        >
                          <div className={styles.optionCircle}>
                            {answers[currentQuestionIndex] === 4 && <div className={styles.optionCircleFill}></div>}
                          </div>
                          <span className={styles.optionText}>{questions[currentQuestionIndex].answer4}</span>
                        </div>
                      </>
                    )}
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

export default MCQTest