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
  // const [questionItem, setQuestionItem] = useState<
  //   {
  //     QuestionId: number;
  //     Question: string;
  //     Answer1: string;
  //     Answer2: string;
  //     Answer3: string;
  //     Answer4: string;
  //   }[]
  // >();
  const [questionItem, setQuestionItem] = useState({});
  var counter = 0;

  useEffect(() => {
    localStorage.setItem("1", JSON.stringify(loadMockTestQuestions));
    // console.log(loadMockTestQuestions);
  }, [loadMockTestQuestions]);
  // useEffect(() => {
  //   console.log("Hello");
  // }, [questionItem]);

  function addQuestion() {
    // console.log(loadMockTestQuestions);
    var temp = {
      QuestionId:
        loadMockTestQuestions.mockExamContent.questionContent[
          loadMockTestQuestions.mockExamContent.questionContent.length - 1
        ].QuestionId + 1,
      Question: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      Answer4: "",
    };
    setLoadMockTestQuestions({
      ...loadMockTestQuestions,
      mockExamContent: {
        ...loadMockTestQuestions.mockExamContent,
        questionContent: [
          ...loadMockTestQuestions.mockExamContent.questionContent,
          temp,
        ],
      },
    });
  }


  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>Mock Exam 01</header>
      <button onClick={addQuestion}>Click me</button>
      {loadMockTestQuestions.mockExamContent.questionContent.map(
        (item: any) => {
          return (
            <MockExamContainer
              key={item.QuestionId}
              MockTestQuestions={item}
              setQuestionItem={setQuestionItem}
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
