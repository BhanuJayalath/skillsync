"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function MockExam({
  loadMockTestQuestions,
  setLoadMockTestQuestions,
  mockExamCount,
  updateMockExamContainer,
}: {
  setLoadMockTestQuestions: any;
  loadMockTestQuestions: any;
  mockExamCount: number;
  updateMockExamContainer: any;
}) {
  var counter = 0;

  useEffect(() => {
    localStorage.setItem(loadMockTestQuestions.mockExamId, JSON.stringify(loadMockTestQuestions));
  }, [loadMockTestQuestions]);

  function addQuestion() {
    var temp = {
      QuestionId: Date.now(),
      Question: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      Answer4: "",
      correctAnswer: Number,
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
    console.log("trigger");
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

    setLoadMockTestQuestions((prev: any) => {
      const prevQuestionItems = [...prev.mockExamContent.questionContent];
      if (index >= 0) {
        prevQuestionItems.splice(index, 1);
      }
      return {
        ...prev,
        mockExamContent: {
          ...prev.mockExamContent,
          questionContent: prevQuestionItems,
        },
      };
    });
  }
  function save() {
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_URL}`, loadMockTestQuestions, {
      headers: { "Content-Type": "application/json" },
    });
  }
  var questionCounter = 0;

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>
        <h1>Mock Exam {mockExamCount}</h1>
        {updateMockExamContainer ? (
          <>
            <button onClick={addQuestion}>
              <Image
                alt="plus-icon"
                width={25}
                height={25}
                src="/recruiter/plus-icon.svg"
              />
            </button>
            <button onClick={save}>Save</button>
          </>
        ) : null}
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
              updateMockExamContainer={updateMockExamContainer}
            />
          );
        }
      )}
    </section>
  );
}
