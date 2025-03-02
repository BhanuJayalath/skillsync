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
  const [jobTitle, setJobTitle] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [requiredSkillsValue, setRequiredSkillsValue] = useState<string>("");
  const [jobType, setJobType] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<Number>();
  const [removed, setRemoved] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const storage = {
    jobId: loadJobPostContent.jobId,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    requiredSkills: requiredSkills,
    jobType: jobType,
  };
  useEffect(() => {
    setJobTitle(loadJobPostContent[0].jobTitle);
    setJobDescription(loadJobPostContent[0].jobDescription);
    setRequiredSkills(loadJobPostContent[0].requiredSkills);
    setJobType(loadJobPostContent[0].jobType);

    // if (updateMockExamContainer == false) {
    //   setReadOnly(true);
    // }
  }, [removed]);
  // useEffect(() => {
  //   update(MockTestQuestions.QuestionId, storage);
  // }, [question, answer1, answer2, answer3, answer4, selectedAnswer]);

  function saveJobTitle(event: any) {
    setJobTitle(event.target.value);
  }

  function saveJobDescription(event: any) {
    setJobDescription(event.target.value);
  }

  function saveRequiredSkills(event: any) {
    event.preventDefault();
    console.log(requiredSkills);
    setRequiredSkills([...requiredSkills, requiredSkillsValue]);
    setRequiredSkillsValue("");
  }

  function saveJobType(event: any) {
    setJobType(event.target.value);
  }

  // function remove(questionId: number) {
  //   removeQuestion(questionId);
  //   setRemoved(!removed);
  // }

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
    localStorage.setItem(loadJobPostContent[0].jobId, JSON.stringify(storage));
  }, [storage]);

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

  function removeSkill(skillIndex: number) {
    const updatedSkills = [
      ...requiredSkills.slice(0, skillIndex),
      ...requiredSkills.slice(skillIndex + 1),
    ];
    setRequiredSkills(updatedSkills);
  }
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
                <h2>Add Job Title</h2>
                <input
                  id={styles.mockExamSectionQuestion}
                  type="text"
                  value={jobTitle}
                  onChange={saveJobTitle}
                  readOnly={readOnly}
                />
                <h2>Add Job Description</h2>
                <div id={styles.mockExamSectionAnswer}>
                  <input
                    type="text"
                    value={jobDescription}
                    onChange={saveJobDescription}
                    readOnly={readOnly}
                  />
                </div>
                <h2>Add Required Skills</h2>
                <div id={styles.mockExamSectionAnswer}>
                  <form onSubmit={saveRequiredSkills}>
                    <input
                      type="text"
                      value={requiredSkillsValue}
                      onChange={(e) => setRequiredSkillsValue(e.target.value)}
                      // readOnly={readOnly}
                    />
                    <button type="submit">Add</button>
                  </form>
                  {requiredSkills.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <label>{item}</label>
                        <button
                          onClick={() => {
                            removeSkill(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
                <h2>Add Job Type</h2>
                <div id={styles.mockExamSectionAnswer}>
                  <input
                    type="text"
                    value={jobType}
                    onChange={saveJobType}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div id={styles.emptyMockExamSection}>
          <h1>Add your Job Post Here</h1>
        </div>
      )}
    </section>
  );
}
