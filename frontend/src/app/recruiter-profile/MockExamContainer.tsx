"use client";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExamContainer({
  questionId,
  questionItem,
  questionCounter,
  setQuestionItem,
  updateLocalStorage,
}: {
  questionId: any;
  questionItem: number[];
  questionCounter: number;
  setQuestionItem: React.Dispatch<React.SetStateAction<number[]>>;
  updateLocalStorage: () => void;
}) {
  const [question, setQuestion] = useState();
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  useEffect(() => {
    if (
      question != undefined ||
      answer1 != undefined ||
      answer2 != undefined ||
      answer3 != undefined ||
      answer4 != undefined
    ) {
      localStorage.setItem(questionId, JSON.stringify(storage));
    }
  });

  const storage = {
    Question: question,
    "Answer 1": answer1,
    "Answer 2": answer2,
    "Answer 3": answer3,
    "Answer 4": answer4,
  };

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

  function save() {
    localStorage.setItem(questionId, JSON.stringify(storage));
  }
  function remove(questionId: number) {
    localStorage.removeItem(questionId.toString());
    updateLocalStorage();
  }

  return (
    <div id={styles.mockExamSection}>
      <div id={styles.mockExamSectionBlock}>
        <header>Question{questionCounter}</header>
        {/* <h1>{questionId}</h1> */}
        <h2>Add your question here</h2>
        <input
          id={styles.mockExamSectionQuestion}
          type="text"
          onChange={saveQuestion}
        />
        <h2>Add your answers here</h2>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer1} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer2} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer3} />
        </div>
        <div id={styles.mockExamSectionAnswer}>
          <input type="checkbox" />
          <input type="text" onChange={saveAnswer4} />
        </div>
        <button onClick={save}>Save</button>
        <button
          onClick={() => {
            remove(questionId);
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}
