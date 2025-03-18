"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function QuestionContent({
  TestQuestions,
  update,
  questionCounter,
  removeQuestion,
  updateTestContent,
}: {
  TestQuestions: any;
  update: any;
  questionCounter: number;
  removeQuestion: any;
  updateTestContent: any;
}) {
  const [question, setQuestion] = useState<string>();
  const [answer1, setAnswer1] = useState<string>();
  const [answer2, setAnswer2] = useState<string>();
  const [answer3, setAnswer3] = useState<string>();
  const [answer4, setAnswer4] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<Number>();
  const [removed, setRemoved] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const storage = {
    questionId: TestQuestions.questionId,
    question: question,
    answer1: answer1,
    answer2: answer2,
    answer3: answer3,
    answer4: answer4,
    correctAnswer: selectedAnswer,
  };
  useEffect(() => {
    console.log(updateTestContent, "update test content");
    setQuestion(TestQuestions.question);
    setAnswer1(TestQuestions.answer1);
    setAnswer2(TestQuestions.answer2);
    setAnswer3(TestQuestions.answer3);
    setAnswer4(TestQuestions.answer4);
    setSelectedAnswer(
      TestQuestions.correctAnswer ? TestQuestions.correctAnswer : null
    );
    if (updateTestContent == false) {
      setReadOnly(true);
    } else if (updateTestContent == true) {
      setReadOnly(false);
    }
  }, [removed, updateTestContent]);
  useEffect(() => {
    update(TestQuestions.questionId, storage);
  }, [question, answer1, answer2, answer3, answer4, selectedAnswer]);

  function saveQuestion(event: any) {
    setQuestion(event.target.value);
  }

  function saveAnswer1(event: any) {
    setAnswer1(event.target.value);
  }

  function saveAnswer2(event: any) {
    setAnswer2(event.target.value);
  }

  function saveAnswer3(event: any) {
    setAnswer3(event.target.value);
  }

  function saveAnswer4(event: any) {
    setAnswer4(event.target.value);
  }

  function remove(questionId: number) {
    removeQuestion(questionId);
    setRemoved(!removed);
  }

  function handleCheckBoxChange(selection: Number) {
    setSelectedAnswer(selection);
  }
  return (
    <div id={styles.mockExamSectionBlock}>
      <header>
        Question {questionCounter}
        <div id={styles.mockExamSectionSaveandClose}>
          {updateTestContent ? (
            <button
              onClick={() => {
                remove(TestQuestions.questionId);
              }}
            >
              <Image
                alt="remove-icon"
                width={25}
                height={25}
                src="/recruiter/remove-icon.svg"
              />
            </button>
          ) : null}
        </div>
      </header>
      {updateTestContent ? (
        <>
          <h2>Add your question here</h2>
          <input
            id={styles.mockExamSectionQuestion}
            type="text"
            value={question}
            onChange={saveQuestion}
            readOnly={readOnly}
          />
          <h2>Add your answers here</h2>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={1}
              checked={selectedAnswer === 1}
              onChange={() => {
                handleCheckBoxChange(1);
              }}
              disabled={readOnly}
            />
            <input
              type="text"
              value={answer1}
              onChange={saveAnswer1}
              readOnly={readOnly}
            />
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={2}
              checked={selectedAnswer === 2}
              onChange={() => {
                handleCheckBoxChange(2);
              }}
              disabled={readOnly}
            />
            <input
              type="text"
              value={answer2}
              onChange={saveAnswer2}
              readOnly={readOnly}
            />
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={3}
              checked={selectedAnswer === 3}
              onChange={() => {
                handleCheckBoxChange(3);
              }}
              disabled={readOnly}
            />
            <input
              type="text"
              value={answer3}
              onChange={saveAnswer3}
              readOnly={readOnly}
            />
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={4}
              checked={selectedAnswer === 4}
              onChange={() => {
                handleCheckBoxChange(4);
              }}
              disabled={readOnly}
            />
            <input
              type="text"
              value={answer4}
              onChange={saveAnswer4}
              readOnly={readOnly}
            />
          </div>
        </>
      ) : (
        <>
          <h2>{question}</h2>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={1}
              checked={selectedAnswer === 1}
              onChange={() => {
                handleCheckBoxChange(1);
              }}
              disabled={readOnly}
            />
            <h3>{answer1}</h3>
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={2}
              checked={selectedAnswer === 2}
              onChange={() => {
                handleCheckBoxChange(2);
              }}
              disabled={readOnly}
            />
            <h3>{answer2}</h3>
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={3}
              checked={selectedAnswer === 3}
              onChange={() => {
                handleCheckBoxChange(3);
              }}
              disabled={readOnly}
            />
            <h3>{answer3}</h3>
          </div>
          <div id={styles.mockExamSectionAnswer}>
            <input
              type="checkbox"
              value={4}
              checked={selectedAnswer === 4}
              onChange={() => {
                handleCheckBoxChange(4);
              }}
              disabled={readOnly}
            />
            <h3>{answer4}</h3>
          </div>
        </>
      )}
    </div>
  );
}
