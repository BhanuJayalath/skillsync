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
  _id: string
}

interface SelectedJob {
  jobTitle: string
  jobId: string
}

interface MCQTestProps {
  user: User
  selectedJob: SelectedJob
}

const MCQTest = ({ user, selectedJob }: MCQTestProps) => {
  const userId = user._id
  // const jobId = selectedJob.jobId
  const jobId = "Job1742286622422" // hardcoded for now
  const [testId, setTestId] = useState("Test1742290753151")
  const [availableTests, setAvailableTests] = useState<{ testId: string; testLevel: string; jobId: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

        if (test.testContent && test.testContent.questionContent) {
          setQuestions(test.testContent.questionContent)
          setAnswers(Array(test.testContent.questionContent.length).fill(null))
          setScore({ correct: 0, total: test.testContent.questionContent.length })
        } else {
          console.log("Invalid test data structure:", test)
        }
      } catch (error) {
        console.error("Error fetching test data:", error)
      }
    }

    fetchTestData()
  }, [testId])

  useEffect(() => {
    const fetchAvailableTests = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:3001/tests/all-tests/${jobId}`)
        console.log("Fetched available tests response:", response) // Log the entire response
  
        if (!response.data) {
          console.error("Empty response data")
          setAvailableTests([])
        } else if (Array.isArray(response.data)) {
          const testsForJob = response.data.filter((test) => test.jobId === jobId)
          setAvailableTests(testsForJob)
  
          if (testsForJob.length > 0 && !testId) {
            setTestId(testsForJob[0].testId)
          }
        } else if (response.data && typeof response.data === 'object') {
          // Handle the case where the response is a single object
          const test = response.data
          if (test.jobId === jobId) {
            setAvailableTests([test])
            if (!testId) {
              setTestId(test.testId)
            }
          }
        } else {
          console.error("Unexpected response data format:", response.data)
        }
      } catch (error) {
        console.error("Error fetching available tests:", error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchAvailableTests()
  }, [jobId])
  

  const startTest = () => {
    setCurrentQuestionIndex(0)
    setAnswers(Array(questions.length).fill(null))
    setIsSubmitted(false)
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

    const mark = (correctCount / questions.length) * 100

    setScore({ correct: correctCount, total: questions.length })
    setIsSubmitted(true)

    console.log("Submitted answers:", answers)
    console.log("Score:", correctCount, "out of", questions.length)
    console.log("Mark:", mark)

    try {
      const response = await fetch(`${updateUserUrl}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tests: [
            {
              jobId,
              testId,
              mark,
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

            {isLoading ? (
              <div className={styles.loadingContainer}>
                <p>Loading available tests...</p>
              </div>
            ) : availableTests.length === 0 ? (
              <div className={styles.noTestsContainer}>
                <p>No tests available for this job.</p>
              </div>
            ) : (
              <>
                <div className={styles.testSelectionContainer}>
                  <h2 className={styles.selectionTitle}>Select a Test Level</h2>
                  <div className={styles.testLevelGrid}>
                    {availableTests.map((test) => (
                      <div
                        key={test.testId}
                        className={`${styles.testLevelCard} ${testId === test.testId ? styles.selectedTest : ""}`}
                        onClick={() => setTestId(test.testId)}
                      >
                        <h3>{test.testLevel}</h3>
                        <p>Test ID: {test.testId}</p>
                        {testId === test.testId && <div className={styles.selectedIndicator}>Selected</div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.welcomeContent}>
                  <p>
                    This test consists of {questions.length} multiple choice questions. You can navigate between
                    questions using the Previous and Next buttons.
                  </p>
                  <p>
                    Once you've answered all questions, a Submit button will appear allowing you to complete the test.
                  </p>
                </div>

                <button className={`${styles.navButton} ${styles.startButton}`} onClick={startTest} disabled={!testId}>
                  I Accept the Terms & Start Test
                </button>
              </>
            )}
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
                  Take Another Test
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