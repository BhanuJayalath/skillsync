"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./MockExam";
import Tab from "./Tab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState } from "react";
import styles from "../assets/styles/recruiter.module.css";
export default function RecruiterProfile() {
  const [mockExamContainer, setMockExamContainer] = useState(false);

  function loadMockExamComponent() {
    setMockExamContainer(!mockExamContainer);
  }
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
            {mockExamContainer ? (
              <MockExam />
            ) : (
              <>
                {" "}
                <div id={styles.mockExams}>
                  <h1 id={styles.mockExamscontainerHeader}>Mock Exams</h1>
                  <div className={styles.mockExamscontainerSection}>
                    <div
                      id={styles.mockExamscontainer}
                      onClick={loadMockExamComponent}
                    >
                      <Image
                        alt="exam-icon"
                        width={60}
                        height={60}
                        src="/recruiter/exam-icon.svg"
                      />
                      <h1>Mock Exam 1</h1>
                    </div>
                    <div id={styles.mockExamscontainer}>
                      <Image
                        alt="exam-icon"
                        width={60}
                        height={60}
                        src="/recruiter/exam-icon.svg"
                      />
                      <h1>Mock Exam 2</h1>
                    </div>
                    <div id={styles.mockExamscontainer}>
                      <Image
                        alt="exam-icon"
                        width={60}
                        height={60}
                        src="/recruiter/exam-icon.svg"
                      />
                      <h1>Mock Exam 3</h1>
                    </div>
                  </div>
                </div>
                <div id={styles.jobListing}>
                  <h1 id={styles.jobListingcontainerHeader}>Job Listing</h1>
                  <div className={styles.jobListingcontainerSection}>
                    <div id={styles.jobListingcontainer}>
                      <Image
                        alt="job-search"
                        width={60}
                        height={60}
                        src="/recruiter/job-search.svg"
                      />
                      <h1>Internship 01</h1>
                    </div>
                    <div id={styles.jobListingcontainer}>
                      {" "}
                      <Image
                        alt="job-search"
                        width={60}
                        height={60}
                        src="/recruiter/job-search.svg"
                      />
                      <h1>Internship 02</h1>
                    </div>
                    <div id={styles.jobListingcontainer}>
                      {" "}
                      <Image
                        alt="job-search"
                        width={60}
                        height={60}
                        src="/recruiter/job-search.svg"
                      />
                      <h1>Internship 03</h1>
                    </div>
                  </div>
                </div>
              </>
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
