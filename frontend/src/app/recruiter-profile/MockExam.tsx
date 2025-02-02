"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionId, setQuestionId] = useState(Number);
  const [questionItem, setQuestionItem] = useState<number[]>([]);

  useEffect(() => {
    retrieveLocalStorage();
  }, []);

  function addQuestion() {
    setQuestionId(1 + questionItem.length);
    setQuestionItem([...questionItem, questionId]);
    console.log(questionId);
  }
  function retrieveLocalStorage() {
    var temp = [];
    for (let QuestionId = 0; QuestionId < localStorage.length; QuestionId++) {
      const local = localStorage.getItem(QuestionId.toString());
      if (local) {
        temp.push(JSON.parse(local));
        setQuestionId(1 + QuestionId);
      }
    }
    setQuestionItem(temp);
  }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {questionItem.map((item: any) => (
        <MockExamContainer
          questionId={item}
          questionItem={questionItem}
          setQuestionItem={setQuestionItem}
        />
      ))}
    </section>
  );
}
