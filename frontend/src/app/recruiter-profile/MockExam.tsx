"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionId, setQuestionId] = useState(Date.now());
  const [questionItem, setQuestionItem] = useState<number[]>([1]);
  var counter = 0;
  let question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string;

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
    for (let i = 0; i <= localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        const local = localStorage.getItem(key);
        if (local) {
          let jplocal = JSON.parse(local);
          question = jplocal.Question;
          answer1 = jplocal.answer1;
          answer2 = jplocal.answer2;
          answer3 = jplocal.answer3;
          answer4 = jplocal.answer4;
        }
        temp.push(JSON.parse(key));
      }
    }
    // console.log(temp);
    setQuestionItem(temp);
  }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {questionItem.map((item: any) => {
        counter++;
        console.log(question);
        return (
          <MockExamContainer
            key={item}
            questionCounter={counter}
            questionId={item}
            questionItem={item}
            updateLocalStorage={retrieveLocalStorage}
            setQuestionItem={setQuestionItem}
            Question={question}
            Answer1={answer1}
            Answer2={answer2}
            Answer3={answer3}
            Answer4={answer4}
          />
        );
      })}
    </section>
  );
}
