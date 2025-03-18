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
  // updateTestContent,
  // setUpdateTestContent,
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
  jobCount,
  jobPostResponse,
}: {
  loadJobPostContent: any;
  jobCount: any;
  jobPostResponse: any;
  loadTests: any;
  setLoadTests: any;
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
  const [updateJobPostContent, setUpdateJobPostContent] = useState(false);
  const [jobTitle, setJobTitle] = useState<string>();
  const [jobDescription, setJobDescription] = useState<string>();
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [requiredSkillsValue, setRequiredSkillsValue] = useState<string>("");
  const [jobType, setJobType] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<Number>();
  const [databaseExistingId, setDatabaseExistingId] = useState(false);
  const storage = {
    jobId: loadJobPostContent.jobId,
    recruiterId: loadJobPostContent.recruiterId,
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
  }, []);
  useEffect(() => {
    if (jobPostResponse) {
      const DatabaseExistingId = jobPostResponse.some(
        (item: any) => item.jobId === loadJobPostContent.jobId
      );
      setDatabaseExistingId(DatabaseExistingId);
    }
  }, [updateJobPostContent]);

  function saveJobTitle(event: any) {
    setJobTitle(event.target.value);
  }

  function saveJobDescription(event: any) {
    setJobDescription(event.target.value);
  }

  function saveRequiredSkills(event: any) {
    event.preventDefault();
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
    setJobPostState(false);
    setUpdateJobPostContent(false);
  }
  function saveToDatabase() {
    axios.post(`${process.env.NEXT_PUBLIC_SAVE_JOB}`, storage, {
      headers: { "Content-Type": "application/json" },
    });
    setJobPostState(false);
    setUpdateJobPostContent(false);
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
        <button id={styles.buttonPreviousPage} onClick={previousPage}>
          <Image
            alt="back-icon"
            width={25}
            height={25}
            src="/recruiter/back-icon.svg"
          />
        </button>
        <h1>Job Post {jobCount}</h1>
        {!updateJobPostContent && jobTitle != "" ? (
          <button
            id={styles.buttonAddJobContent}
            onClick={() => {
              setUpdateJobPostContent(!updateJobPostContent);
            }}
          >
            <Image
              alt="update-icon"
              width={20}
              height={20}
              src="/recruiter/update-icon2.svg"
            />
            Update Job Post
          </button>
        ) : !updateJobPostContent && jobTitle == "" ? (
          <button
            id={styles.buttonAddJobContent}
            onClick={() => {
              setUpdateJobPostContent(!updateJobPostContent);
            }}
          >
            <Image
              alt="add-icon"
              width={20}
              height={20}
              src="/recruiter/plus-icon.svg"
            />
            Add Job Post
          </button>
        ) : (
          <div id={styles.jobContentSectionSaveandClose}>
            {updateJobPostContent &&
              (databaseExistingId ? (
                <button onClick={updatetoDatabase}>
                  <Image
                    alt="save-icon"
                    width={20}
                    height={20}
                    src="/recruiter/save-icon.svg"
                  />
                  Save Job Info
                </button>
              ) : (
                <button onClick={saveToDatabase}>
                  <Image
                    alt="save-icon"
                    width={20}
                    height={20}
                    src="/recruiter/save-icon.svg"
                  />
                  Save Job Info
                </button>
              ))}
          </div>
        )}
        {loadJobPostContent.jobTitle ? (
          <h3>{loadJobPostContent.jobTitle}</h3>
        ) : null}
        <h3>{loadJobPostContent.jobId}</h3>
      </header>
      {loadJobPostContent && updateJobPostContent ? (
        <div id={styles.jobContentSection}>
          <div id={styles.jobContentSectionBlock}>
            <div id={styles.jobContentSectionTitle}>
              <h2>Add Job Title</h2>
              <input type="text" value={jobTitle} onChange={saveJobTitle} />
            </div>
            <div id={styles.jobContentSectionDescription}>
              <h2>Add Job Description</h2>
              <textarea
                rows={10}
                cols={50}
                value={jobDescription}
                onChange={saveJobDescription}
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
                />
                <button type="submit">
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
                        onClick={() => {
                          removeSkill(index);
                        }}
                      >
                        <Image
                          alt="delete-icon"
                          width={20}
                          height={20}
                          src="/recruiter/delete-icon.svg"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id={styles.jobContentSectionJobType}>
              <h2>Add Job Type</h2>
              <input type="text" value={jobType} onChange={saveJobType} />
            </div>
          </div>
        </div>
      ) : loadJobPostContent && !updateJobPostContent && !(jobTitle == "") ? (
        <div id={styles.jobContentSection}>
          <div id={styles.jobContentSectionBlock}>
            <div id={styles.jobContentSectionTitle}>
              <h1>{jobTitle}</h1>
            </div>
            <div id={styles.jobContentSectionDescription}>
              <h3>{jobDescription}</h3>
            </div>
            <div id={styles.jobContentSectionRequiredSkills}>
              <header>
                <h1>Required Skills</h1>
              </header>
              <div id={styles.jobPostSkill}>
                {requiredSkills.map((item: any, index: number) => {
                  return (
                    <div id={styles.jobPostSkillLabel} key={index}>
                      <label>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div id={styles.jobContentSectionJobType}>
              <h1>Type - {jobType}</h1>
            </div>
          </div>
        </div>
      ) : null}
      <TestListing
        loadTests={loadTests}
        setLoadTests={setLoadTests}
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
