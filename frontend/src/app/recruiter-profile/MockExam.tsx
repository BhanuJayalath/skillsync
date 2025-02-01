"use client";
import { useState } from "react";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [question, setQuestion] = useState<any[]>([]);

  function addQuestion() {
    setQuestion([...question, "Bhanu"]);
  }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {question.map(() => (
        <div id={styles.mockExamSection}>
          <div id={styles.mockExamSectionBlock}>
            <header>Question</header>
            <h2>Add your question here</h2>
            <input id={styles.mockExamSectionQuestion} type="text" />
            <h2>Add your answers here</h2>
            <div id={styles.mockExamSectionAnswer}>
              <input type="checkbox" />
              <input type="text" />
            </div>
            <div id={styles.mockExamSectionAnswer}>
              <input type="checkbox" />
              <input type="text" />
            </div>
            <div id={styles.mockExamSectionAnswer}>
              <input type="checkbox" />
              <input type="text" />
            </div>
            <div id={styles.mockExamSectionAnswer}>
              <input type="checkbox" />
              <input type="text" />
            </div>
            <button onClick={addQuestion}>Save</button>
          </div>
        </div>
      ))}
    </section>
  );
}
