"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import QuestionContent from "./QuestionContent";
export default function TestContent({
  loadJobPostContent,
  loadTestQuestions,
  setLoadTestQuestions,
  testCount,
  testResponse,
  testState,
  setTestState,
  jobPostState,
  setJobPostState,
}: {
  loadJobPostContent: any;
  setLoadTestQuestions: any;
  loadTestQuestions: any;
  testCount: number;
  testResponse: any;
  testState: any;
  setTestState: any;
  jobPostState: any;
  setJobPostState: any;
}) {
  var counter = 0;
  const [databaseExistingId, setDatabaseExistingId] = useState(false);
  const [updateTestContent, setUpdateTestContent] = useState(false);
  useEffect(() => {
    const DatabaseExistingId = testResponse.some(
      (item: any) => item.testId === loadTestQuestions.testId
    );
    setDatabaseExistingId(DatabaseExistingId);
  });

  useEffect(() => {}, [loadTestQuestions]);

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
    setJobPostState(!jobPostState);
    setTestState(!testState);
    setUpdateTestContent(false);
  }
  function updatetoDatabase() {
    axios.patch(
      `${process.env.NEXT_PUBLIC_UPDATE_TEST}/${loadTestQuestions.testId}`,
      loadTestQuestions,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setUpdateTestContent(false);
  }
  function previousPage() {
    setJobPostState(!jobPostState);
    setTestState(!testState);
    setUpdateTestContent(false);
  }
  var questionCounter = 0;

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>
        <button onClick={previousPage}>
          <Image
            alt="back-icon"
            width={25}
            height={25}
            src="/recruiter/back-icon.svg"
          />
        </button>
        <h1>Test {testCount}</h1>
        <h3>{loadTestQuestions.testId}</h3>
        {loadJobPostContent.jobTitle ? (
          <h3>{loadJobPostContent.jobTitle}</h3>
        ) : null}
        <h3>{loadJobPostContent.jobId}</h3>
        {!updateTestContent ? (
          <button
            onClick={() => {
              setUpdateTestContent(true);
            }}
          >
            <Image
              alt="update-icon"
              width={20}
              height={20}
              src="/recruiter/update-icon.svg"
            />
          </button>
        ) : updateTestContent ? (
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
              <button onClick={updatetoDatabase}>
                <Image
                  alt="save-icon"
                  width={35}
                  height={35}
                  src="/recruiter/save-icon.svg"
                />
              </button>
            ) : (
              <button onClick={save}>
                <Image
                  alt="save-icon"
                  width={35}
                  height={35}
                  src="/recruiter/save-icon.svg"
                />
              </button>
            )}
          </>
        ) : null}
      </header>
      <div id={styles.questionContentDisplayArea}>
        <div id={styles.questionContentArea}>
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
        </div>
      </div>
    </section>
  );
}
