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
    QuestionId: TestQuestions.QuestionId,
    Question: question,
    Answer1: answer1,
    Answer2: answer2,
    Answer3: answer3,
    Answer4: answer4,
    correctAnswer: selectedAnswer,
  };
  useEffect(() => {
    setQuestion(TestQuestions.Question);
    setAnswer1(TestQuestions.Answer1);
    setAnswer2(TestQuestions.Answer2);
    setAnswer3(TestQuestions.Answer3);
    setAnswer4(TestQuestions.Answer4);
    setSelectedAnswer(
      TestQuestions.correctAnswer ? TestQuestions.correctAnswer : null
    );
    if (updateTestContent == false) {
      setReadOnly(true);
    }
  }, [removed]);
  useEffect(() => {
    update(TestQuestions.QuestionId, storage);
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
    <div id={styles.mockExamSection}>
      <div id={styles.mockExamSectionBlock}>
        <header>
          Question {questionCounter}
          <div id={styles.mockExamSectionSaveandClose}>
            {updateTestContent ? (
              <button
                onClick={() => {
                  remove(TestQuestions.QuestionId);
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
      </div>
    </div>
  );
}
