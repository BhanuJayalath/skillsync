"use client";
import { useState, useEffect } from "react";
import MockExamContainer from "./QuestionContent";
import axios from "axios";
import Image from "next/image";
import TestListing from "./TestListing";
import styles from "../assets/styles/recruiter.module.css";
export default function JobContent({
  loadTests,
  setLoadTests,
  updateTestContent,
  setUpdateTestContent,
  removeTestBlock,
  setRemoveTestBlock,
  testState,
  setTestState,
  jobPostState,
  setJobPostState,
  setLoadTestQuestions,
  setTestCount,
  testResponse,
  setTestResponse,
  loadJobPostContent,
  updateJobPostContent,
  setUpdateJobPostContent,
  jobCount,
  jobPostResponse,
}: {
  loadJobPostContent: any;
  updateJobPostContent: any;
  setUpdateJobPostContent: any;
  jobCount: any;
  jobPostResponse: any;
  loadTests: any;
  setLoadTests: any;
  updateTestContent: any;
  setUpdateTestContent: any;
  removeTestBlock: any;
  setRemoveTestBlock: any;
  testState: any;
  setTestState: any;
  jobPostState: any;
  setJobPostState: any;
  setLoadTestQuestions: any;
  setTestCount: any;
  testResponse: any;
  setTestResponse: any;
}) {
  const [jobTitle, setJobTitle] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [requiredSkillsValue, setRequiredSkillsValue] = useState<string>("");
  const [jobType, setJobType] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<Number>();
  // const [removed, setRemoved] = useState(false);
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
  }, []);
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
  useEffect(() => {}, [storage]);

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
  function previousPage() {
    setJobPostState(false);
    setUpdateJobPostContent(false);
  }

  return (
    <section className={styles.JobContent}>
      <header id={styles.JobContentHeading}>
        <button onClick={previousPage}>
          <Image
            alt="back-icon"
            width={25}
            height={25}
            src="/recruiter/back-icon.svg"
          />
        </button>
        <h1>Job Post {jobCount}</h1>
        <div id={styles.jobContentSectionSaveandClose}>
          {updateJobPostContent &&
            (databaseExistingId ? (
              <button onClick={updatetoDatabase}>
                <Image
                  alt="update-icon"
                  width={20}
                  height={20}
                  src="/recruiter/update-icon.svg"
                />
              </button>
            ) : (
              <button onClick={saveToDatabase}>
                <Image
                  alt="save-icon"
                  width={35}
                  height={35}
                  src="/recruiter/save-icon.svg"
                />
              </button>
            ))}
        </div>
      </header>
      {loadJobPostContent ? (
        <div id={styles.jobContentSection}>
          <div id={styles.jobContentSectionBlock}>
            <div id={styles.jobContentSectionTitle}>
              <h2>Add Job Title</h2>
              <input
                type="text"
                value={jobTitle}
                onChange={saveJobTitle}
                readOnly={readOnly}
              />
            </div>
            <div id={styles.jobContentSectionDescription}>
              <h2>Add Job Description</h2>
              <textarea
                rows={10}
                cols={50}
                value={jobDescription}
                onChange={saveJobDescription}
                readOnly={readOnly}
              ></textarea>
            </div>
            <div id={styles.jobContentSectionRequiredSkills}>
              <header>
                <h2>Add Required Skills</h2>
              </header>
              <form onSubmit={saveRequiredSkills}>
                <input
                  type="text"
                  value={requiredSkillsValue}
                  onChange={(e) => setRequiredSkillsValue(e.target.value)}
                  readOnly={readOnly}
                />
                <button disabled={readOnly} type="submit">
                  Add
                  <Image
                    alt="plus-icon"
                    width={20}
                    height={20}
                    src="/recruiter/plus-icon.svg"
                  />
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
                        <Image
                          alt="remove-icon"
                          width={20}
                          height={20}
                          src="/recruiter/remove-icon.svg"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id={styles.jobContentSectionJobType}>
              <h2>Add Job Type</h2>
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
      <TestListing
        loadTests={loadTests}
        setLoadTests={setLoadTests}
        updateTestContent={updateTestContent}
        setUpdateTestContent={setUpdateTestContent}
        removeTestBlock={removeTestBlock}
        setRemoveTestBlock={setRemoveTestBlock}
        testState={testState}
        setTestState={setTestState}
        setJobPostState={setJobPostState}
        jobPostState={jobPostState}
        setLoadTestQuestions={setLoadTestQuestions}
        setTestCount={setTestCount}
        testResponse={testResponse}
        setTestResponse={setTestResponse}
        loadJobPostContent={loadJobPostContent}
      />
    </section>
  );
}
