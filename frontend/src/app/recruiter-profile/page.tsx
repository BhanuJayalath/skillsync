"use client";
import Tab from "./Tab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import JobListing from "./JobListing";
import JobContent from "./JobContent";
import TestContent from "./TestContent";

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

  const [mockExamContainerId, setMockExamContainerId] = useState<any>([
    Date.now(),
  ]);

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
          <div className={styles.welcomeBar}>Welcome User</div>
          <search className={styles.searchBar}>
            <Image
              alt="menu-icon"
              width={23}
              height={23}
              src="/recruiter/menu.svg"
            />
            Search
            <Image
              alt="search-icon"
              width={23}
              height={23}
              src="/recruiter/search.svg"
            />
          </search>
          <Image
            alt="notification-icon"
            width={23}
            height={23}
            src="/recruiter/bell.svg"
          />
        </div>
        <div id={styles.contentSection}>
          <div id={styles.contentContainer1}>
            <div id={styles.topGraded}>
              <h1>Top Graded</h1>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
            </div>
            <div id={styles.profiles}>
              <h1>Profiles</h1>
              <div id={styles.profilesContainer}>
                <Tab />
              </div>
              <div id={styles.profilesContainer}>
                <Tab />
              </div>
              <div id={styles.profilesContainer}>
                <Tab />
              </div>
              <div id={styles.profilesContainer}>
                <Tab />
              </div>
              <div id={styles.profilesContainer}>
                <Tab />
              </div>
            </div>
            <div id={styles.results}>
              <h1>Results</h1>
              <div id={styles.resultsContainer}>
                <ResultTab />
              </div>
              <div id={styles.resultsContainer}>
                <ResultTab />
              </div>
              <div id={styles.resultsContainer}>
                <ResultTab />
              </div>
            </div>
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
          <li>
            <Image
              src="/recruiter/home.svg"
              alt="home-icon"
              width={23}
              height={23}
            />
            Home
          </li>
          <li>
            <Image
              src="/recruiter/message.svg"
              alt="message-icon"
              width={23}
              height={23}
            />
            Message
          </li>
          <li>
            <Image
              src="/recruiter/add-to-favourites.svg"
              alt="favourites-icon"
              width={23}
              height={23}
            />
            Favourites
          </li>
          <li>
            <Image
              src="/recruiter/analytics.svg"
              alt="analytics-icon"
              width={23}
              height={23}
            />
            Analytics
          </li>
        </ul>
      </div>
    </section>
  );
}
