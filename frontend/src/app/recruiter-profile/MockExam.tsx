"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionId, setQuestionId] = useState(Date.now());
  const [questionItem, setQuestionItem] = useState<number[]>([1]);
  var counter = 0;

  useEffect(() => {
    retrieveLocalStorage();
  }, []);

  function addQuestion() {
    // setQuestionId();
    setQuestionItem([...questionItem, questionItem.length + 1]);
    // console.log(questionId);
  }
  function retrieveLocalStorage() {
    var temp = [];
    for (let QuestionId = 1; QuestionId <= localStorage.length; QuestionId++) {
      const local = localStorage.getItem(QuestionId.toString());
      if (local) {
        temp.push(JSON.parse(local));
        // setQuestionId(1 + QuestionId);
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
        console.log(item);
        return (
          <MockExamContainer
            key={item}
            questionCounter={counter}
            questionId={item}
            questionItem={item}
            updateLocalStorage={retrieveLocalStorage}
            setQuestionItem={setQuestionItem}
          />
        );
      })}
    </section>
  );
}
