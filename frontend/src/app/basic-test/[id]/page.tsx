"use client"

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

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
  // Angular (IDs 1-5)
  {
    id: 1,
    skill: "Angular",
    text: "Which of the following best describes Angular?",
    options: [
      "A front-end web application framework",
      "A back-end programming language",
      "A database management system",
      "A CSS preprocessor"
    ],
    correctAnswer: "A front-end web application framework"
  },
  {
    id: 2,
    skill: "Angular",
    text: "What language is primarily used to write Angular applications?",
    options: ["JavaScript", "TypeScript", "Python", "Ruby"],
    correctAnswer: "TypeScript"
  },
  {
    id: 3,
    skill: "Angular",
    text: "Which directive in Angular is used to conditionally display elements?",
    options: ["*ngIf", "*ngFor", "*ngSwitch", "ngShow"],
    correctAnswer: "*ngIf"
  },
  {
    id: 4,
    skill: "Angular",
    text: "What is the purpose of Angular's dependency injection?",
    options: [
      "To inject CSS styles",
      "To manage component lifecycles",
      "To provide services to components",
      "To handle HTTP requests"
    ],
    correctAnswer: "To provide services to components"
  },
  {
    id: 5,
    skill: "Angular",
    text: "Angular follows which architectural approach?",
    options: [
      "Model-View-Controller",
      "Component-based architecture",
      "Service-oriented architecture",
      "Event-driven architecture"
    ],
    correctAnswer: "Component-based architecture"
  },
  // AWS (IDs 6-10)
  {
    id: 6,
    skill: "AWS",
    text: "What does AWS stand for?",
    options: [
      "Amazon Web Services",
      "Advanced Web Systems",
      "Applied Web Solutions",
      "Automated Web Services"
    ],
    correctAnswer: "Amazon Web Services"
  },
  {
    id: 7,
    skill: "AWS",
    text: "Which AWS service is primarily used for scalable object storage?",
    options: ["Amazon S3", "Amazon EC2", "Amazon RDS", "Amazon VPC"],
    correctAnswer: "Amazon S3"
  },
  {
    id: 8,
    skill: "AWS",
    text: "Which AWS service allows you to run virtual servers?",
    options: ["Amazon EC2", "AWS Lambda", "Amazon DynamoDB", "Amazon SQS"],
    correctAnswer: "Amazon EC2"
  },
  {
    id: 9,
    skill: "AWS",
    text: "Which AWS service is a fully managed NoSQL database?",
    options: ["Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora", "Amazon RDS"],
    correctAnswer: "Amazon DynamoDB"
  },
  {
    id: 10,
    skill: "AWS",
    text: "What is the main benefit of AWS Lambda?",
    options: [
      "Serverless computing",
      "Managed databases",
      "Content delivery",
      "Networking"
    ],
    correctAnswer: "Serverless computing"
  },
  // ... (remaining questions remain unchanged)
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizApp() {
  const router = useRouter();
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState({
    _id: '',
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Editable fields for profile updates.
  const [updatedDetails, setUpdatedDetails] = useState({
    username: '',
    email: '',
  });

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      setUserDetails({
        _id: res.data.user._id,
        username: res.data.user.username,
        email: res.data.user.email,
      });
      setUpdatedDetails({
        username: res.data.user.username,
        email: res.data.user.email,
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizState, setQuizState] = useState<"selection" | "quiz" | "results">("selection");
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (quizState === "quiz") {
      const shuffled = shuffleArray(questions);
      const filteredAndShuffled = shuffled
        .filter((q) => selectedSkills.includes(q.skill))
        .map((q) => ({ ...q, options: shuffleArray(q.options) }));
      setShuffledQuestions(filteredAndShuffled);
    }
  }, [quizState, selectedSkills]);

  // Save test scores when quizState becomes "results" and userDetails._id is valid.
  useEffect(() => {
    if (quizState === "results" && userDetails._id) {
      const scores = calculateScores();
      const totalCorrect = Object.values(scores).reduce(
        (sum, { correct }) => sum + correct,
        0
      );
      const totalQuestions = Object.values(scores).reduce(
        (sum, { total }) => sum + total,
        0
      );
      // Convert scores object into an array of skill scores.
      const skillScores = Object.entries(scores).map(([skill, { correct, total }]) => ({
        skill,
        correct,
        total
      }));

      const scoreData = {
        userId: userDetails._id,
        overallScore: totalCorrect,
        totalQuestions: totalQuestions,
        skillScores, // e.g., [{ skill: "Angular", correct: 2, total: 5 }, ...]
        selectedSkills,
      };

      console.log("Posting scoreData:", scoreData); // Debug log

      axios.post('/api/basic-test', scoreData)
        .then((response) => {
          console.log("Test score saved", response.data);
        })
        .catch((error) => {
          console.error("Error saving test score", error);
          toast.error(
            "Error saving test score: " +
              (error.response?.data?.error || error.message)
          );
        });
    }
  }, [quizState, selectedSkills, userDetails]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const startQuiz = () => {
    if (selectedSkills.length > 0) {
      setQuizState("quiz");
    }
  };

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && currentQuestionIndex < shuffledQuestions.length) {
      setUserAnswers((prev) => ({
        ...prev,
        [shuffledQuestions[currentQuestionIndex].id]: selectedAnswer,
      }));

      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizState("results");
      }
    }
  };

  const calculateScores = () => {
    const scores: { [key: string]: { correct: number; total: number } } = {};
    shuffledQuestions.forEach((question) => {
      if (!scores[question.skill]) {
        scores[question.skill] = { correct: 0, total: 0 };
      }
      scores[question.skill].total++;
      if (userAnswers[question.id] === question.correctAnswer) {
        scores[question.skill].correct++;
      }
    });
    return scores;
  };

  const restartQuiz = () => {
    setSelectedSkills([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizState("selection");
    setShuffledQuestions([]);
    setSelectedAnswer(null);
  };

  const primaryColor = "rgb(96,166,236)"; // #60A6EC
  const primaryBgClass = "bg-[rgb(96,166,236)]";

  if (quizState === "selection") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6" style={{ color: primaryColor }}>
            Hello there {userDetails.username}!
          </h1>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome to the Basic Skills Test. <br />
            Select the skills you want to be tested on.
          </h2>
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
    );
  }

  if (quizState === "quiz" && shuffledQuestions.length > 0) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
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
    );
  }

  if (quizState === "results") {
    const scores = calculateScores();
    const totalCorrect = Object.values(scores).reduce((sum, { correct }) => sum + correct, 0);
    const totalQuestions = Object.values(scores).reduce((sum, { total }) => sum + total, 0);
    const overallPercentage = Math.round((totalCorrect / totalQuestions) * 100);

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
              const percentage = Math.round((score.correct / score.total) * 100);
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
              );
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
    );
  }

  return <div>Loading...</div>;
}
