"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionId, setQuestionId] = useState(Number);
  const [questionItem, setQuestionItem] = useState<number[]>([]);

  useEffect(() => {
    // retrieveLocalStorage();
  }, []);

  function addQuestion() {
    setQuestionId(1 + questionItem.length);
    setQuestionItem([...questionItem, questionId]);
    console.log(questionId);
  }
  function remove() {
    const temp = [];
    for (let QuestionId = 0; QuestionId < localStorage.length; QuestionId++) {
      temp.push(QuestionId);
    }
    setQuestionItem(temp);
  }

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      <button onClick={remove}>Test</button>
      {questionItem.map((item: any) => (
        <MockExamContainer
          questionId={item}
          // setQuestionItem={setQuestionItem}
        />
      ))}
    </section>
  );
}
