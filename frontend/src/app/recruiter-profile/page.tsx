"use client";
import Tab from "./JobTab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import JobListing from "./JobListing";
import JobContent from "./JobContent";
import TestContent from "./TestContent";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

import axios from "axios";
import TestListing from "./TestListing";

export default function RecruiterProfile() {
  const [loadTests, setLoadTests] = useState<
    {
      testId: string;
      jobId: string;
      testContent: {
        questionContent: any[];
      };
    }[]
  >([]);

  const [loadTestQuestions, setLoadTestQuestions] = useState([]);
  const [loadJobPostContent, setLoadJobPostContent] = useState<
    {
      jobId: String;
      jobTitle: String;
      jobDescription: String;
      requiredSkills: [];
      jobType: [];
    }[]
  >([]);
  const [testState, setTestState] = useState(false);
  const [jobPostState, setJobPostState] = useState(false);
  const [dashboardTab, setDashboardTab] = useState(true);
  const [profileTab, setProfileTab] = useState(false);
  const [testCount, setTestCount] = useState(Number);
  const [jobCount, setJobCount] = useState(Number);
  const [updateTestContent, setUpdateTestContent] = useState(false);
  const [updateJobPostContent, setUpdateJobPostContent] = useState(false);
  const [removeTestBlock, setRemoveTestBlock] = useState(false);
  const [testResponse, setTestResponse] = useState();
  const [jobPostResponse, setJobPostResponse] = useState();

  let counter = 0;
  return (
    <section className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.navigation}>
          <div id={styles.pageTitle}>Recruiter Profile</div>
          <div className={styles.welcomeBar}>Welcome User</div>
        </div>
        <div id={styles.contentSection}>
          <div id={styles.contentContainer1}>
            {dashboardTab ? <Dashboard /> : profileTab ? <Profile /> : null}
          </div>
          <div id={styles.contentContainer2}>
            {jobPostState ? (
              <JobContent
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
                setUpdateJobPostContent={setUpdateJobPostContent}
                updateJobPostContent={updateJobPostContent}
                jobPostResponse={jobPostResponse}
                jobCount={jobCount}
              />
            ) : testState ? (
              <TestContent
                setLoadTestQuestions={setLoadTestQuestions}
                jobPostState={jobPostState}
                setJobPostState={setJobPostState}
                testState={testState}
                setTestState={setTestState}
                loadTestQuestions={loadTestQuestions}
                testCount={testCount}
                updateTestContent={updateTestContent}
                setUpdateTestContent={setUpdateTestContent}
                testResponse={testResponse}
              />
            ) : (
              <JobListing
                loadJobPostContent={loadJobPostContent}
                setLoadJobPostContent={setLoadJobPostContent}
                setUpdateJobPostContent={setUpdateJobPostContent}
                updateJobPostContent={updateJobPostContent}
                setJobPostState={setJobPostState}
                jobPostState={jobPostState}
                setJobCount={setJobCount}
                setJobPostResponse={setJobPostResponse}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <Image
          src="/logo.png"
          alt="SkillSync"
          width={120}
          height={40}
          className="logo"
        />
        <ul>
          <li
            onClick={() => {
              setDashboardTab(true);
              setProfileTab(false);
            }}
          >
            <Image
              src="/recruiter/home.svg"
              alt="home-icon"
              width={23}
              height={23}
            />
            Dashboard
          </li>
          <li
            onClick={() => {
              setProfileTab(true);
              setDashboardTab(false);
            }}
          >
            <Image
              src="/recruiter/message.svg"
              alt="message-icon"
              width={23}
              height={23}
            />
            Profile
          </li>
        </ul>
      </div>
    </section>
  );
}
