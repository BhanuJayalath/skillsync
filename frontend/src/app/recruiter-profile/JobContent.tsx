"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./QuestionContent";
import axios from "axios";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function JobContent({
  loadJobPostContent,
  updateJobPostContent,
  jobCount,
  jobPostResponse,
}: {
  loadJobPostContent: any;
  updateJobPostContent: any;
  jobCount: any;
  jobPostResponse: any;
}) {
  const [jobTitle, setJobTitle] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [requiredSkillsValue, setRequiredSkillsValue] = useState<string>("");
  const [jobType, setJobType] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<Number>();
  const [removed, setRemoved] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [databaseExistingId, setDatabaseExistingId] = useState(false);
  const storage = {
    jobId: loadJobPostContent.jobId,
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    requiredSkills: requiredSkills,
    jobType: jobType,
  };
  useEffect(() => {
    setJobTitle(loadJobPostContent.jobTitle);
    setJobDescription(loadJobPostContent.jobDescription);
    setRequiredSkills(loadJobPostContent.requiredSkills);
    setJobType(loadJobPostContent.jobType);

    if (updateJobPostContent == false) {
      setReadOnly(true);
    }
  }, [removed]);
  useEffect(() => {
    if (jobPostResponse) {
      const DatabaseExistingId = jobPostResponse.some(
        (item: any) => item.jobId === loadJobPostContent.jobId
      );
      setDatabaseExistingId(DatabaseExistingId);
    }
  }, []);

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

  var counter = 0;
  useEffect(() => {
    localStorage.setItem(loadJobPostContent.jobId, JSON.stringify(storage));
  }, [storage]);

  function updatetoDatabase() {
    axios.patch(
      `${process.env.NEXT_PUBLIC_UPDATE_JOB}/${loadJobPostContent.jobId}`,
      storage,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  function saveToDatabase() {
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_JOB}`, storage, {
      headers: { "Content-Type": "application/json" },
    });
  }

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
        <div id={styles.mockExamSectionSaveandClose}>
          {updateJobPostContent &&
            (databaseExistingId ? (
              <button onClick={updatetoDatabase}>Update</button>
            ) : (
              <button onClick={saveToDatabase}>Save</button>
            ))}
        </div>
      </header>
      {loadJobPostContent ? (
        <div id={styles.mockExamSection}>
          <div id={styles.mockExamSectionBlock}>
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
                  readOnly={readOnly}
                />
                <button disabled={readOnly} type="submit">
                  Add
                </button>
              </form>
              <div id={styles.jobPostSkill}>
                {requiredSkills.map((item: any, index: number) => {
                  return (
                    <div id={styles.jobPostSkillLabel} key={index}>
                      <label>{item}</label>
                      <button
                        disabled={readOnly}
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
      ) : (
        <div id={styles.emptyMockExamSection}>
          <h1>Add your Job Post Here</h1>
        </div>
      )}
    </section>
  );
}
