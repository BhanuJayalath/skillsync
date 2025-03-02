"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./MockExamContainer";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function JobContent({
  loadJobPostContent,
  updateJobPostContent,
  jobCount,
}: {
  loadJobPostContent: any;
  updateJobPostContent: any;
  jobCount: any;
}) {
    const [jobTitile, setJobTitle] = useState<string>();
    const [jobDescription, setJobDescription] = useState<string>();
    const [answer2, setAnswer2] = useState<string>();
    const [answer3, setAnswer3] = useState<string>();
    const [answer4, setAnswer4] = useState<string>();
    const [selectedAnswer, setSelectedAnswer] = useState<Number>();
    const [removed, setRemoved] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const storage = {
      QuestionId: MockTestQuestions.QuestionId,
      Question: question,
      Answer1: answer1,
      Answer2: answer2,
      Answer3: answer3,
      Answer4: answer4,
      correctAnswer: selectedAnswer,
    };
    useEffect(() => {
      console.log(MockTestQuestions);
      setQuestion(MockTestQuestions.Question);
      setAnswer1(MockTestQuestions.Answer1);
      setAnswer2(MockTestQuestions.Answer2);
      setAnswer3(MockTestQuestions.Answer3);
      setAnswer4(MockTestQuestions.Answer4);
      setSelectedAnswer(
        MockTestQuestions.correctAnswer ? MockTestQuestions.correctAnswer : null
      );
      if (updateMockExamContainer == false) {
        setReadOnly(true);
      }
    }, [removed]);
    useEffect(() => {
      update(MockTestQuestions.QuestionId, storage);
    }, [question, answer1, answer2, answer3, answer4, selectedAnswer]);

    function saveQuestion(event: any) {
      setQuestion(event.target.value);
    }

    function saveAnswer1(event: any) {
      setAnswer1(event.target.value);
    }

    function saveAnswer2(event: any) {
      setAnswer2(event.target.value);
    }

    function saveAnswer3(event: any) {
      setAnswer3(event.target.value);
    }

    function saveAnswer4(event: any) {
      setAnswer4(event.target.value);
    }

    function remove(questionId: number) {
      removeQuestion(questionId);
      setRemoved(!removed);
    }

    function handleCheckBoxChange(selection: Number) {
      setSelectedAnswer(selection);
      // addCorrectAnswer(selection, MockTestQuestions.QuestionId);
    }
  var counter = 0;
  const [databaseExistingId, setDatabaseExistingId] = useState(false);
  // useEffect(() => {
  //   const DatabaseExistingId = response.some(
  //     (item: any) => item.mockExamId === loadMockTestQuestions.mockExamId
  //   );
  //   setDatabaseExistingId(DatabaseExistingId);
  // });

  useEffect(() => {
    localStorage.setItem(
      loadJobPostContent[0].jobId,
      JSON.stringify(loadJobPostContent)
    );
  }, [loadJobPostContent]);

  // function update(id: number, questionItem: any) {
  //   // console.log("trigger");
  //   const index =
  //     loadMockTestQuestions.mockExamContent.questionContent.findIndex(
  //       (item: any) => item.QuestionId == id
  //     );
  //   setLoadMockTestQuestions((prev: any) => {
  //     const updateQuestionItems = [...prev.mockExamContent.questionContent];
  //     updateQuestionItems[index] = questionItem;
  //     return {
  //       ...prev,
  //       mockExamContent: {
  //         ...prev.mockExamContent,
  //         questionContent: updateQuestionItems,
  //       },
  //     };
  //   });
  // }

  // function save() {
  //   axios.post(`${process.env.NEXT_PUBLIC_SAVE_URL}`, loadMockTestQuestions, {
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }
  // function updatetoDatabase() {
  //   console.log(loadMockTestQuestions);
  //   axios.patch(
  //     `${process.env.NEXT_PUBLIC_SAVE_URL}/${loadMockTestQuestions.mockExamId}`,
  //     loadMockTestQuestions,
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  var questionCounter = 0;

  return (
    <section className={styles.mockExam}>
      <header id={styles.mockExamHeading}>
        <h1>Job Post {jobCount}</h1>
        {/* {updateJobPostContent ? (
          <>
            <button onClick={addJobPost}>
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
        ) : null} */}
      </header>
      {loadJobPostContent.length > 0 ? (
        loadJobPostContent.map((item: any) => {
          return (
            <div id={styles.mockExamSection}>
              <div id={styles.mockExamSectionBlock}>
                <header>
                  Question {questionCounter}
                  <div id={styles.mockExamSectionSaveandClose}>
                    {/* {updateMockExamContainer ? (
                        <button
                          onClick={() => {
                            remove(MockTestQuestions.QuestionId);
                          }}
                        >
                          <Image
                            alt="remove-icon"
                            width={25}
                            height={25}
                            src="/recruiter/remove-icon.svg"
                          />
                        </button>
                      ) : null} */}
                  </div>
                </header>
                <h2>Add your question here</h2>
                {/* <input
                    id={styles.mockExamSectionQuestion}
                    type="text"
                    value={question}
                    onChange={saveQuestion}
                    readOnly={readOnly}
                  /> */}
                <h2>Add your answers here</h2>
                <div id={styles.mockExamSectionAnswer}>
                  {/* <input
                      type="checkbox"
                      value={1}
                      checked={selectedAnswer === 1}
                      onChange={() => {
                        handleCheckBoxChange(1);
                      }}
                      disabled={readOnly}
                    /> */}
                  {/* <input
                      type="text"
                      value={answer1}
                      onChange={saveAnswer1}
                      readOnly={readOnly}
                    /> */}
                </div>
                <div id={styles.mockExamSectionAnswer}>
                  {/* <input
                      type="checkbox"
                      value={2}
                      checked={selectedAnswer === 2}
                      onChange={() => {
                        handleCheckBoxChange(2);
                      }}
                      disabled={readOnly}
                    /> */}
                  {/* <input
                      type="text"
                      value={answer2}
                      onChange={saveAnswer2}
                      readOnly={readOnly}
                    /> */}
                </div>
                <div id={styles.mockExamSectionAnswer}>
                  {/* <input
                      type="checkbox"
                      value={3}
                      checked={selectedAnswer === 3}
                      onChange={() => {
                        handleCheckBoxChange(3);
                      }}
                      disabled={readOnly}
                    /> */}
                  {/* <input
                      type="text"
                      value={answer3}
                      onChange={saveAnswer3}
                      readOnly={readOnly}
                    /> */}
                </div>
                <div id={styles.mockExamSectionAnswer}>
                  {/* <input
                      type="checkbox"
                      value={4}
                      checked={selectedAnswer === 4}
                      onChange={() => {
                        handleCheckBoxChange(4);
                      }}
                      disabled={readOnly}
                    /> */}
                  {/* <input
                      type="text"
                      value={answer4}
                      onChange={saveAnswer4}
                      readOnly={readOnly}
                    /> */}
                </div>
              </div>
            </div>
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
