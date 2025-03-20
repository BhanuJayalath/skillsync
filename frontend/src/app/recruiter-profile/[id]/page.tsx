"use client";
import Tab from "../JobTab";
import ResultTab from "../ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../../assets/styles/recruiter.module.css";
import JobListing from "../JobListing";
import JobContent from "../JobContent";
import TestContent from "../TestContent";
import Dashboard from "../Dashboard";
import Profile from "../CompanyProfile";
import UserProfile from "../UserProfile";

import axios from "axios";
import TestListing from "../TestListing";
import SideBar from "../SideBar";

export default function RecruiterProfile() {
  const [loadTests, setLoadTests] = useState<
    {
      testId: string;
      jobId: string;
      testLevel: string;
      testContent: {
        questionContent: any[];
      };
    }[]
  >([]);

  const [loadTestQuestions, setLoadTestQuestions] = useState([]);
  const [loadJobPostContent, setLoadJobPostContent] = useState<
    {
      jobId: String;
      recruiterId: String;
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
  const [testLevel, setTestLevel] = useState("");
  const [jobCount, setJobCount] = useState(Number);
  const [removeTestBlock, setRemoveTestBlock] = useState(false);
  const [testResponse, setTestResponse] = useState();
  const [jobPostResponse, setJobPostResponse] = useState();
  const [recruiterDetails, setRecruiterDetails] = useState();
  const [userProfile, setUserProfile] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_RECRUITER_DETAILS}`)
      .then((response) => {
        setRecruiterDetails(response.data.recruiter);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            {dashboardTab && recruiterDetails ? (
              <Dashboard
                recruiterDetails={recruiterDetails}
                setUserProfile={setUserProfile}
                setDashboardTab={setDashboardTab}
                setUserId={setUserId}
                setJobId={setJobId}
              />
            ) : userProfile && userId != "" ? (
              <UserProfile
                userId={userId}
                jobId={jobId}
                recruiterDetails={recruiterDetails}
                setUserProfile={setUserProfile}
                setDashboardTab={setDashboardTab}
              />
            ) : profileTab ? (
              <Profile recruiterDetails={recruiterDetails} />
            ) : null}
          </div>
          <div id={styles.contentContainer2}>
            {jobPostState ? (
              <JobContent
                loadTests={loadTests}
                setLoadTests={setLoadTests}
                removeTestBlock={removeTestBlock}
                setRemoveTestBlock={setRemoveTestBlock}
                testState={testState}
                setTestState={setTestState}
                setJobPostState={setJobPostState}
                jobPostState={jobPostState}
                setLoadTestQuestions={setLoadTestQuestions}
                setTestLevel={setTestLevel}
                testLevel={testLevel}
                testResponse={testResponse}
                setTestResponse={setTestResponse}
                loadJobPostContent={loadJobPostContent}
                jobPostResponse={jobPostResponse}
                jobCount={jobCount}
              />
            ) : testState ? (
              <TestContent
                loadJobPostContent={loadJobPostContent}
                setLoadTestQuestions={setLoadTestQuestions}
                jobPostState={jobPostState}
                setJobPostState={setJobPostState}
                testState={testState}
                setTestState={setTestState}
                loadTestQuestions={loadTestQuestions}
                testLevel={testLevel}
                testResponse={testResponse}
              />
            ) : recruiterDetails ? (
              <JobListing
                loadJobPostContent={loadJobPostContent}
                setLoadJobPostContent={setLoadJobPostContent}
                setJobPostState={setJobPostState}
                jobPostState={jobPostState}
                setJobCount={setJobCount}
                setJobPostResponse={setJobPostResponse}
                recruiterDetails={recruiterDetails}
              />
            ) : null}
          </div>
        </div>
      </div>
      <SideBar
        setProfileTab={setProfileTab}
        setDashboardTab={setDashboardTab}
        setUserProfile={setUserProfile}
      />
    </section>
  );
}
