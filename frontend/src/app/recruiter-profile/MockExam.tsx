"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam({
  loadMockTestQuestions,
  setLoadMockTestQuestions,
}: // mockExamComponent,
// setMockExamComponent,
{
  setLoadMockTestQuestions: any;
  loadMockTestQuestions: any;
  // mockExamComponent: any;
  // setMockExamComponent: any;
}) {
  const [questionItem, setQuestionItem] = useState<
    {
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
    // retrieveLocalStorage();
    console.log(loadMockTestQuestions);
  }, []);

  function addQuestion() {
    // console.log(loadMockTestQuestions);
    const temp = [];
    temp.push({
      QuestionId: 2,
      Question: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      Answer4: "",
    });
    setLoadMockTestQuestions([...loadMockTestQuestions, temp]);
    // setQuestionId();
    // setMockExamComponent([
    //   // ...mockExamComponent,
    //   {
    //     mockExamId: mockExamComponent[0].mockExamId,
    //     mockExamContent: {
    //       questionContent: [
    //         {
    //           QuestionId:
    //             mockExamComponent[0].mockExamContent.questionContent.length + 1,
    //           Question: "",
    //           Answer1: "",
    //           Answer2: "",
    //           Answer3: "",
    //           Answer4: "",
    //         },
    //       ],
    //     },
    //   },
    // ]);
  }
  // function retrieveLocalStorage() {
  //   var temp = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     let key = localStorage.key(i);
  //     if (key) {
  //       const local = localStorage.getItem(key);
  //       if (local) {
  //         temp.push(JSON.parse(local));
  //       }
  //     }
  //   }
  //   console.log(localStorage.key(0));
  //   setMockExamComponent(temp);
  // }
  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {loadMockTestQuestions.mockExamContent.questionContent.map(
        (item: any) => {
          // console.log("This is :", item);
          return (
            <MockExamContainer
              key={item.QuestionId}
              MockTestQuestions={item}
              // key={counter}
              // questionCounter={counter}
              // mockExamComponent={item}
              // updateLocalStorage={retrieveLocalStorage}
            />
          );
        }
      )}
    </section>
  );
}
