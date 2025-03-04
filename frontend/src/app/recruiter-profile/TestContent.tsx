"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./QuestionContent";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import QuestionContent from "./QuestionContent";
export default function TestContent({
  loadTestQuestions,
  setLoadTestQuestions,
  testCount,
  updateTestContent,
  testResponse,
}: {
  setLoadTestQuestions: any;
  loadTestQuestions: any;
  testCount: number;
  updateTestContent: any;
  testResponse: any;
}) {
  var counter = 0;
  const [databaseExistingId, setDatabaseExistingId] = useState(false);
  useEffect(() => {
    const DatabaseExistingId = testResponse.some(
      (item: any) => item.mockExamId === loadTestQuestions.mockExamId
    );
    setDatabaseExistingId(DatabaseExistingId);
  });

  useEffect(() => {
    localStorage.setItem(
      loadTestQuestions.mockExamId,
      JSON.stringify(loadTestQuestions)
    );
  }, [loadTestQuestions]);

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
    setLoadTestQuestions({
      ...loadTestQuestions,
      mockExamContent: {
        ...loadTestQuestions.mockExamContent,
        questionContent: [
          ...loadTestQuestions.mockExamContent.questionContent,
          temp,
        ],
      },
    });
  }
  function update(id: number, questionItem: any) {
    // console.log("trigger");
    const index =
      loadTestQuestions.mockExamContent.questionContent.findIndex(
        (item: any) => item.QuestionId == id
      );
    setLoadTestQuestions((prev: any) => {
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
      loadTestQuestions.mockExamContent.questionContent.findIndex(
        (item: any) => item.QuestionId == questionId
      );

    setLoadTestQuestions((prev: any) => {
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
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_URL}`, loadTestQuestions, {
      headers: { "Content-Type": "application/json" },
    });
  }
  function updatetoDatabase() {
    console.log(loadTestQuestions);
    axios.patch(
      `${process.env.NEXT_PUBLIC_SAVE_URL}/${loadTestQuestions.mockExamId}`,
      loadTestQuestions,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  var questionCounter = 0;

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>
        <h1>Mock Exam {testCount}</h1>
        {updateTestContent ? (
          <>
            <button onClick={addQuestion}>
              <Image
                alt="plus-icon"
                width={25}
                height={25}
                src="/recruiter/plus-icon.svg"
              />
            </button>
            {databaseExistingId ? (
              <button onClick={updatetoDatabase}>Update</button>
            ) : (
              <button onClick={save}>Save</button>
            )}
          </>
        ) : null}
      </header>
      {loadTestQuestions?.mockExamContent?.questionContent.length > 0 ? (
        loadTestQuestions.mockExamContent.questionContent.map(
          (item: any) => {
            questionCounter++;
            return (
              <QuestionContent
                key={questionCounter}
                MockTestQuestions={item}
                questionCounter={questionCounter}
                update={update}
                removeQuestion={removeQuestion}
                updateTestContent={updateTestContent}
              />
            );
          }
        )
      ) : (
        <div id={styles.emptyMockExamSection}>
          <h1>Add your Questions Here</h1>
        </div>
      )}
    </section>
  );
}
