"use client";
import { useState, useEffect } from "react";
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
      (item: any) => item.testId === loadTestQuestions.testId
    );
    setDatabaseExistingId(DatabaseExistingId);
  });

  useEffect(() => {
    localStorage.setItem(
      loadTestQuestions.testId,
      JSON.stringify(loadTestQuestions)
    );
  }, [loadTestQuestions]);

  function addQuestion() {
    var temp = {
      questionId: Date.now(),
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: Number,
    };
    setLoadTestQuestions({
      ...loadTestQuestions,
      testContent: {
        ...loadTestQuestions.testContent,
        questionContent: [
          ...loadTestQuestions.testContent.questionContent,
          temp,
        ],
      },
    });
  }
  function update(id: string, questionItem: any) {
    // console.log("trigger");
    const index = loadTestQuestions.testContent.questionContent.findIndex(
      (item: any) => item.questionId == id
    );
    setLoadTestQuestions((prev: any) => {
      const updateQuestionItems = [...prev.testContent.questionContent];
      updateQuestionItems[index] = questionItem;
      return {
        ...prev,
        testContent: {
          ...prev.testContent,
          questionContent: updateQuestionItems,
        },
      };
    });
  }

  function removeQuestion(questionId: number) {
    const index = loadTestQuestions.testContent.questionContent.findIndex(
      (item: any) => item.questionId == questionId
    );

    setLoadTestQuestions((prev: any) => {
      const prevQuestionItems = [...prev.testContent.questionContent];
      if (index >= 0) {
        prevQuestionItems.splice(index, 1);
      }
      return {
        ...prev,
        testContent: {
          ...prev.testContent,
          questionContent: prevQuestionItems,
        },
      };
    });
  }
  function save() {
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_TEST}`, loadTestQuestions, {
      headers: { "Content-Type": "application/json" },
    });
  }
  function updatetoDatabase() {
    axios.patch(
      `${process.env.NEXT_PUBLIC_UPDATE_TEST}/${loadTestQuestions.testId}`,
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
        <h1>Test {testCount}</h1>
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
      {loadTestQuestions?.testContent?.questionContent.length > 0 ? (
        loadTestQuestions.testContent.questionContent.map((item: any) => {
          questionCounter++;
          return (
            <QuestionContent
              key={questionCounter}
              TestQuestions={item}
              questionCounter={questionCounter}
              update={update}
              removeQuestion={removeQuestion}
              updateTestContent={updateTestContent}
            />
          );
        })
      ) : (
        <div id={styles.emptyMockExamSection}>
          <h1>Add your Questions Here</h1>
        </div>
      )}
    </section>
  );
}
