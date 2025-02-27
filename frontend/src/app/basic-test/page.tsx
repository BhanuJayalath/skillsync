"use client"

import { useState, useEffect } from "react"

const skills = [
  "Angular",
  "AWS",
  "C#",
  "CSS3",
  "Django",
  "Docker",
  "Flask",
  "GraphQL",
  "HTML5",
  "Java",
  "JavaScript",
  "Kotlin",
  "MongoDB",
  "Node.js",
  "PHP",
  "Python",
  "React",
  "Ruby on Rails",
  "SQL",
  "TypeScript"
];

const questions = [
  // Angular Questions
  {
    id: 1,
    skill: "Angular",
    text: "Angular is best described as:",
    options: [
      "A front-end web application framework",
      "A back-end programming language",
      "A CSS preprocessor",
      "A database management system"
    ],
    correctAnswer: "A front-end web application framework"
  },
  // AWS Question
  {
    id: 2,
    skill: "AWS",
    text: "What does AWS stand for?",
    options: [
      "Amazon Web Services",
      "Advanced Web Solutions",
      "Applied Web Systems",
      "Automated Workflow Software"
    ],
    correctAnswer: "Amazon Web Services"
  },
  // C# Question
  {
    id: 3,
    skill: "C#",
    text: "Which company developed C#?",
    options: [
      "Microsoft",
      "Apple",
      "Google",
      "Oracle"
    ],
    correctAnswer: "Microsoft"
  },
  // CSS3 Question
  {
    id: 4,
    skill: "CSS3",
    text: "Which CSS3 feature is used to create smooth transitions between style changes?",
    options: [
      "transition",
      "animation",
      "transform",
      "filter"
    ],
    correctAnswer: "transition"
  },
  // Django Question
  {
    id: 5,
    skill: "Django",
    text: "Which programming language is Django built with?",
    options: [
      "Python",
      "Ruby",
      "Java",
      "PHP"
    ],
    correctAnswer: "Python"
  },
  // Docker Question
  {
    id: 6,
    skill: "Docker",
    text: "What is Docker primarily used for?",
    options: [
      "Containerization",
      "Virtualization",
      "Compiling code",
      "Managing databases"
    ],
    correctAnswer: "Containerization"
  },
  // Flask Question
  {
    id: 7,
    skill: "Flask",
    text: "Flask is known as a:",
    options: [
      "Micro web framework",
      "Full-stack web framework",
      "Front-end library",
      "Database engine"
    ],
    correctAnswer: "Micro web framework"
  },
  // GraphQL Question
  {
    id: 8,
    skill: "GraphQL",
    text: "GraphQL is best described as:",
    options: [
      "An API query language",
      "A type of database",
      "A front-end framework",
      "A CSS library"
    ],
    correctAnswer: "An API query language"
  },
  // HTML5 Question
  {
    id: 9,
    skill: "HTML5",
    text: "Which HTML5 element is used to draw graphics on the fly via scripting?",
    options: [
      "<canvas>",
      "<svg>",
      "<div>",
      "<section>"
    ],
    correctAnswer: "<canvas>"
  },
  // Java Question
  {
    id: 10,
    skill: "Java",
    text: "Which of the following is a core principle of Java?",
    options: [
      "Object-oriented programming",
      "Functional programming only",
      "Procedural scripting",
      "Assembly language programming"
    ],
    correctAnswer: "Object-oriented programming"
  },
  // JavaScript Questions
  {
    id: 11,
    skill: "JavaScript",
    text: "What is closure in JavaScript?",
    options: [
      "A function with access to its outer scope",
      "A way to close browser windows",
      "A method to end a loop",
      "A type of data structure"
    ],
    correctAnswer: "A function with access to its outer scope"
  },
  {
    id: 12,
    skill: "JavaScript",
    text: 'What is the purpose of the "use strict" directive in JavaScript?',
    options: [
      "To enable strict mode",
      "To include external libraries",
      "To optimize code performance",
      "To declare global variables"
    ],
    correctAnswer: "To enable strict mode"
  },
  // Kotlin Question
  {
    id: 13,
    skill: "Kotlin",
    text: "Kotlin is widely used as an alternative to which programming language for Android development?",
    options: [
      "Java",
      "Swift",
      "C++",
      "Python"
    ],
    correctAnswer: "Java"
  },
  // MongoDB Question
  {
    id: 14,
    skill: "MongoDB",
    text: "What type of database is MongoDB?",
    options: [
      "NoSQL",
      "SQL",
      "Graph database",
      "Relational database"
    ],
    correctAnswer: "NoSQL"
  },
  // Node.js Questions
  {
    id: 15,
    skill: "Node.js",
    text: "What is the event loop in Node.js?",
    options: [
      "A mechanism that allows Node.js to perform non-blocking I/O operations",
      "A type of data structure in Node.js",
      "A method to create loops in JavaScript",
      "A way to handle errors in Node.js"
    ],
    correctAnswer: "A mechanism that allows Node.js to perform non-blocking I/O operations"
  },
  {
    id: 16,
    skill: "Node.js",
    text: "What is the purpose of the package.json file in a Node.js project?",
    options: [
      "To manage project dependencies and scripts",
      "To store application data",
      "To configure the server",
      "To define database schemas"
    ],
    correctAnswer: "To manage project dependencies and scripts"
  },
  // PHP Question
  {
    id: 17,
    skill: "PHP",
    text: "PHP is primarily used for which of the following?",
    options: [
      "Server-side scripting",
      "Front-end styling",
      "Mobile app development",
      "Operating system development"
    ],
    correctAnswer: "Server-side scripting"
  },
  // Python Questions
  {
    id: 18,
    skill: "Python",
    text: "What is a list comprehension in Python?",
    options: [
      "A concise way to create lists",
      "A method to sort lists",
      "A way to delete list items",
      "A type of loop in Python"
    ],
    correctAnswer: "A concise way to create lists"
  },
  {
    id: 19,
    skill: "Python",
    text: "What is the difference between a tuple and a list in Python?",
    options: [
      "Tuples are immutable, lists are mutable",
      "Tuples can only contain numbers",
      "Lists are faster than tuples",
      "There is no difference"
    ],
    correctAnswer: "Tuples are immutable, lists are mutable"
  },
  // React Questions
  {
    id: 20,
    skill: "React",
    text: "What is JSX?",
    options: [
      "A syntax extension for JavaScript",
      "A new programming language",
      "A database for React",
      "A testing framework for React"
    ],
    correctAnswer: "A syntax extension for JavaScript"
  },
  {
    id: 21,
    skill: "React",
    text: "What is the purpose of the useEffect hook in React?",
    options: [
      "To perform side effects in function components",
      "To create new components",
      "To optimize rendering performance",
      "To handle user input"
    ],
    correctAnswer: "To perform side effects in function components"
  },
  // Ruby on Rails Question
  {
    id: 22,
    skill: "Ruby on Rails",
    text: "Ruby on Rails is primarily used with which programming language?",
    options: [
      "Ruby",
      "Python",
      "JavaScript",
      "PHP"
    ],
    correctAnswer: "Ruby"
  },
  // SQL Questions
  {
    id: 23,
    skill: "SQL",
    text: "What is a primary key in SQL?",
    options: [
      "A column or set of columns that uniquely identifies each row in a table",
      "The first column in a table",
      "A key used to encrypt data in the database",
      "A special type of index in SQL"
    ],
    correctAnswer: "A column or set of columns that uniquely identifies each row in a table"
  },
  {
    id: 24,
    skill: "SQL",
    text: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
    options: [
      "INNER JOIN returns matching rows, LEFT JOIN returns all rows from the left table and matching rows from the right table",
      "There is no difference",
      "INNER JOIN is faster than LEFT JOIN",
      "LEFT JOIN can only be used with two tables"
    ],
    correctAnswer:
      "INNER JOIN returns matching rows, LEFT JOIN returns all rows from the left table and matching rows from the right table"
  },
  // TypeScript Question
  {
    id: 25,
    skill: "TypeScript",
    text: "What is a key advantage of using TypeScript over JavaScript?",
    options: [
      "Static type checking",
      "Slower performance",
      "Fewer libraries available",
      "No support for classes"
    ],
    correctAnswer: "Static type checking"
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuizApp() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({})
  const [quizState, setQuizState] = useState<"selection" | "quiz" | "results">("selection")
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  useEffect(() => {
    if (quizState === "quiz") {
      const shuffled = shuffleArray(questions)
      const filteredAndShuffled = shuffled
        .filter((q) => selectedSkills.includes(q.skill))
        .map((q) => ({ ...q, options: shuffleArray(q.options) }))
      setShuffledQuestions(filteredAndShuffled)
    }
  }, [quizState, selectedSkills])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const startQuiz = () => {
    if (selectedSkills.length > 0) {
      setQuizState("quiz")
    }
  }

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && currentQuestionIndex < shuffledQuestions.length) {
      setUserAnswers((prev) => ({
        ...prev,
        [shuffledQuestions[currentQuestionIndex].id]: selectedAnswer,
      }))

      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setQuizState("results")
      }
    }
  }

  const calculateScores = () => {
    const scores: { [key: string]: { correct: number; total: number } } = {}

    shuffledQuestions.forEach((question) => {
      if (!scores[question.skill]) {
        scores[question.skill] = { correct: 0, total: 0 }
      }
      scores[question.skill].total++
      if (userAnswers[question.id] === question.correctAnswer) {
        scores[question.skill].correct++
      }
    })

    return scores
  }

  const restartQuiz = () => {
    setSelectedSkills([])
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizState("selection")
    setShuffledQuestions([])
    setSelectedAnswer(null)
  }

  const primaryColor = "rgb(96,166,236)" // #60A6EC
  const primaryBgClass = "bg-[rgb(96,166,236)]"

  if (quizState === "selection") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6" style={{ color: primaryColor }}>
            Select Your Skills
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedSkills.includes(skill)
                    ? `${primaryBgClass} text-white border-transparent`
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <button
            onClick={startQuiz}
            disabled={selectedSkills.length === 0}
            className="w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  if (quizState === "quiz" && shuffledQuestions.length > 0) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Question {currentQuestionIndex + 1}
          </h1>
          <p className="text-xl mb-6">{currentQuestion.text}</p>
          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`w-full py-2 px-4 border rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[rgb(96,166,236)] ${
                  selectedAnswer === option
                    ? `${primaryBgClass} text-white border-transparent`
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            Submit Answer
          </button>
        </div>
      </div>
    )
  }

  if (quizState === "results") {
    const scores = calculateScores()
    const totalCorrect = Object.values(scores).reduce((sum, score) => sum + score.correct, 0)
    const totalQuestions = Object.values(scores).reduce((sum, score) => sum + score.total, 0)
    const overallPercentage = Math.round((totalCorrect / totalQuestions) * 100)

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
            Quiz Results
          </h1>
          <p className="text-2xl mb-4 text-center">
            Overall Score: {totalCorrect} out of {totalQuestions} ({overallPercentage}%)
          </p>
          <div className="space-y-4">
            {Object.entries(scores).map(([skill, score]) => {
              const percentage = Math.round((score.correct / score.total) * 100)
              return (
                <div key={skill}>
                  <p className="font-semibold text-gray-700">
                    {skill}: {score.correct}/{score.total} ({percentage}%)
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${primaryBgClass}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={restartQuiz}
            className="mt-6 w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    )
  }

  return <div>Loading...</div>
}
