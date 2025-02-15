"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam() {
  const [questionItem, setQuestionItem] = useState<
    | {
        QuestionId: number;
        Question: string;
        Answer1: string;
        Answer2: string;
        Answer3: string;
        Answer4: string;
      }[]
  >();
  var counter = 0;

  useEffect(() => {
    retrieveLocalStorage();
  }, []);

  function addQuestion() {
    // setQuestionId();
    setQuestionItem([
      ...(questionItem ?? []),
      {
        QuestionId: (questionItem?.length ?? 0) + 1,
        Question: "",
        Answer1: "",
        Answer2: "",
        Answer3: "",
        Answer4: "",
      },
    ]);
  }
  function retrieveLocalStorage() {
    var temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        const local = localStorage.getItem(key);
        if (local) {
          temp.push(JSON.parse(local));
        }
      }
    }
    console.log(localStorage.key(0));
    setQuestionItem(temp);
  }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {questionItem?.map((item: any) => {
        counter++;
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
