"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam({
  loadMockTestQuestions,
  setLoadMockTestQuestions,
  mockExamCount,
}: {
  setLoadMockTestQuestions: any;
  loadMockTestQuestions: any;
  mockExamCount: number;
}) {
  var counter = 0;

  useEffect(() => {
    // localStorage.setItem("1", JSON.stringify(loadMockTestQuestions));
    // console.log("This loads ", loadMockTestQuestions);
  }, [loadMockTestQuestions]);

  function addQuestion() {
    // console.log(loadMockTestQuestions);
    var temp = {
      QuestionId: Date.now(),
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

  function update(id: number, questionItem: any) {
    const index =
      loadMockTestQuestions.mockExamContent.questionContent.findIndex(
        (item: any) => item.QuestionId == id
      );
    setLoadMockTestQuestions((prev: any) => {
      const updateQuestionItems = [...prev.mockExamContent.questionContent];
      updateQuestionItems[index] = questionItem;
      return {
        ...prev,
        mockExamContent: {
          ...prev.mockExamContent,
          questionContent: updateQuestionItems,
        },
      };
    });
  }

  function removeQuestion(questionId: number) {
    const index =
      loadMockTestQuestions.mockExamContent.questionContent.findIndex(
        (item: any) => item.QuestionId == questionId
      );
    // console.log(index);
    setLoadMockTestQuestions((prev: any) => {
      const prevQuestionItems = [...prev.mockExamContent.questionContent];
      const updateQuestionItems = prevQuestionItems.splice(index, 1);
      // console.log(prevQuestionItems);
      return {
        ...prev,
        mockExamContent: {
          ...prev.mockExamContent,
          questionContent: updateQuestionItems,
        },
      };
    });
    console.log(loadMockTestQuestions);
  }
  var questionCounter = 0;

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>
        <h1>Mock Exam {mockExamCount}</h1>
        <button onClick={addQuestion}>
          <Image
            alt="plus-icon"
            width={25}
            height={25}
            src="/recruiter/plus-icon.svg"
          />
        </button>
      </header>
      {loadMockTestQuestions.mockExamContent.questionContent.map(
        (item: any) => {
          questionCounter++;
          // console.log(item);
          return (
            <MockExamContainer
              key={questionCounter}
              MockTestQuestions={item}
              questionCounter={questionCounter}
              update={update}
              removeQuestion={removeQuestion}
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
