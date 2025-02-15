"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./MockExam";
import Tab from "./Tab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import MockExamContainer from "./MockExamContainer";
export default function RecruiterProfile() {
  const [mockExamState, setMockExamState] = useState(false);
  const [mockExamContainerId, setMockExamContainerId] = useState<any>([1]);
  const [mockExamComponent, setMockExamComponent] = useState<
    {
      mockExamId: number;
      mockExamContent: {
        questionContent: [];
      };
    }[]
  >();
  useEffect(() => {
    retrieveLocalStorage();
    // console.log(mockExamComponent);
  }, []);
  function loadMockExamComponent(mockexamId: number) {
    setMockExamComponent([
      // ...(mockExamComponent ?? []),
      {
        mockExamId: mockexamId,
        mockExamContent: {
          questionContent: [],
        },
      },
    ]);
    setMockExamState(!mockExamState);
  }
  function addMockExamContainers() {
    setMockExamContainerId([
      ...mockExamContainerId,
      mockExamContainerId.at(-1) + 1,
    ]);
    console.log(mockExamContainerId);
  }

  function removeMockExamContainer(item: number) {
    const newItems = [...mockExamContainerId];
    const index = mockExamContainerId.indexOf(item);
    if (index != -1) {
      newItems.splice(index, 1);
      setMockExamContainerId(newItems);
    }
  }
  function retrieveLocalStorage() {
    var temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        const local = localStorage.getItem(key);
        if (local) {
          temp.push(JSON.parse(local));
        }
      }
    }
    // console.log(localStorage.key(0));
    setMockExamComponent(temp);
  }
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
            {mockExamState ? (
              <MockExam
                setMockExamComponent={setMockExamComponent}
                mockExamComponent={mockExamComponent}
              />
            ) : (
              <>
                <div id={styles.mockExams}>
                  <h1 id={styles.mockExamscontainerHeader}>Mock Exams</h1>
                  <button onClick={addMockExamContainers}>Add</button>
                  <div className={styles.mockExamscontainerSection}>
                    {mockExamContainerId?.map((item: any) => {
                      counter++;
                      return (
                        <div
                          key={item}
                          id={styles.mockExamscontainer}
                          onClick={() => {
                            loadMockExamComponent(counter);
                          }}
                        >
                          <Image
                            alt="exam-icon"
                            width={60}
                            height={60}
                            src="/recruiter/exam-icon.svg"
                          />
                          <h1>Mock Exam {counter}</h1>
                          <button
                            onClick={() => {
                              removeMockExamContainer(item);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
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
