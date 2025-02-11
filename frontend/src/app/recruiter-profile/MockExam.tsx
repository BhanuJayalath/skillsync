"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionItem, setQuestionItem] = useState([{}]);
  var counter = 0;

  useEffect(() => {
    retrieveLocalStorage();
  }, []);

  function addQuestion() {
    // setQuestionId();
    setQuestionItem([
      ...questionItem,
      {
        QuestionId: questionItem.length + 1,
        Question: String,
        Answer1: String,
        Answer2: String,
        Answer3: String,
        Answer4: String,
      },
    ]);
    // console.log(questionId);
  }
  function retrieveLocalStorage() {
    var temp = [];
    for (let i = 0; i <= localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        const local = localStorage.getItem(key);
        if (local) {
          temp.push(JSON.parse(local));
        }
      }
    }
    console.log(temp);
    setQuestionItem(temp);
  }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {questionItem.map((item: any) => {
        counter++;
        // console.log(question);
        return (
          <MockExamContainer
            key={item.QuestionId}
            questionCounter={counter}
            questionItem={item}
            updateLocalStorage={retrieveLocalStorage}
          />
        );
      })}
    </section>
  );
}
