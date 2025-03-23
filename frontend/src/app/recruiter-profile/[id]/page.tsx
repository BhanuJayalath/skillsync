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
import Notification from "../Notification";
import axios from "axios";
import TestListing from "../TestListing";
import SideBar from "../SideBar";
import CompanyProfile from "../CompanyProfile";

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
  const [recruiterDetails, setRecruiterDetails] = useState<any>();
  const [userProfile, setUserProfile] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    status: "",
  });
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_RECRUITER_DETAILS}`)
      .then((response) => {
        setRecruiterDetails(response.data.recruiter);
      })
      .catch((error) => {
        console.log(error);
      });
    const handleResize = () => {
      setIsVisible(window.innerWidth < 919);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        status: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <section className={styles.main}>
      {notification.show ? <Notification notification={notification} /> : null}
      <SideBar
        setProfileTab={setProfileTab}
        setDashboardTab={setDashboardTab}
        setUserProfile={setUserProfile}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={styles.contentContainer }>
        <div className={styles.navigation}>
          {isVisible && (
            <div id={styles.HamburgerIcon} style={{ display: "flex" }}>
              <Image
                src="/user/navMenu.svg"
                alt="navMenuIcon"
                width={30}
                height={30}
                onClick={toggleSidebar}
                className={`${styles.headerMenuButton} ${
                  isCollapsed ? styles.collapsed : ""
                }`}
              />
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className={`${styles.logo} ${
                  isCollapsed ? styles.collapsed : ""
                }`}
                priority
              />
            </div>
          )}
          <div id={styles.pageTitle}>
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <div className={styles.welcomeBar}>
            Welcome{" "}
            {recruiterDetails ? recruiterDetails.company : <h1>User</h1>}
          </div>
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
                setNotification={setNotification}
              />
            ) : profileTab ? (
              <CompanyProfile
                setNotification={setNotification}
                recruiterDetails={recruiterDetails}
              />
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
                setNotification={setNotification}
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
                setNotification={setNotification}
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
    </section>
  );
}
