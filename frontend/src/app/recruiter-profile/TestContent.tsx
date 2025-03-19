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
  testLevel,
  testResponse,
  testState,
  setTestState,
  jobPostState,
  setJobPostState,
}: {
  loadJobPostContent: any;
  setLoadTestQuestions: any;
  loadTestQuestions: any;
  testLevel: string;
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
    setJobPostState(!jobPostState);
    setTestState(!testState);
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
      <header id={styles.TestContentHeading}>
        <button onClick={previousPage}>
          <Image
            alt="back-icon"
            width={25}
            height={25}
            src="/recruiter/back-icon.svg"
          />
        </button>
        <h1>Test {loadTestQuestions.testLevel}</h1>
        {!updateTestContent &&
        loadTestQuestions.testContent.questionContent.length > 0 ? (
          <button
            onClick={() => {
              setUpdateTestContent(true);
            }}
          >
            <Image
              alt="update-icon"
              width={20}
              height={20}
              src="/recruiter/update-icon2.svg"
            />
            Update Questions
          </button>
        ) : !updateTestContent &&
          loadTestQuestions.testContent.questionContent.length === 0 ? (
          <button
            onClick={() => {
              setUpdateTestContent(true);
            }}
          >
            <Image
              alt="tick-icon"
              width={20}
              height={20}
              src="/recruiter/tik-icon.svg"
            />
            Get Started
          </button>
        ) : updateTestContent ? (
          <>
            <button onClick={addQuestion}>
              <Image
                alt="plus-icon"
                width={20}
                height={20}
                src="/recruiter/plus-icon.svg"
              />
              Add Questions
            </button>
            {databaseExistingId ? (
              <button onClick={updatetoDatabase}>
                <Image
                  alt="save-icon"
                  width={20}
                  height={20}
                  src="/recruiter/save-icon.svg"
                />
                Save Questions
              </button>
            ) : loadTestQuestions.testContent.questionContent.length > 0 ? (
              <button onClick={save}>
                <Image
                  alt="save-icon"
                  width={20}
                  height={20}
                  src="/recruiter/save-icon.svg"
                />
                Save Questions
              </button>
            ) : null}
          </>
        ) : null}
        <h3>{loadTestQuestions.testId}</h3>
        {loadJobPostContent.jobTitle ? (
          <h3>{loadJobPostContent.jobTitle}</h3>
        ) : null}
        <h3>{loadJobPostContent.jobId}</h3>
      </header>
      <div id={styles.questionContentDisplayArea}>
        <div id={styles.questionContentArea}>
          {loadTestQuestions?.testContent?.questionContent.length > 0
            ? loadTestQuestions.testContent.questionContent.map((item: any) => {
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
            : null}
        </div>
      </div>
    </section>
  );
}
