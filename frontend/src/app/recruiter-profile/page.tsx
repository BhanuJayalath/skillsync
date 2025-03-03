"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./MockExam";
import Tab from "./Tab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import JobListing from "./JobListing";
import JobContent from "./JobContent";

import axios from "axios";
export default function RecruiterProfile() {
  const [loadMockTests, setLoadMockTests] = useState<
    {
      mockExamId: number;
      mockExamContent: {
        questionContent: any[];
      };
    }[]
  >([]);

  const [loadMockTestQuestions, setLoadMockTestQuestions] = useState([]);
  const [loadJobPostContent, setLoadJobPostContent] = useState<
    {
      jobId: String;
      jobTitle: String;
      jobDescription: String;
      requiredSkills: [];
      jobType: [];
    }[]
  >([]);
  const [mockExamState, setMockExamState] = useState(false);
  const [jobPostState, setJobPostState] = useState(false);

  const [mockExamContainerId, setMockExamContainerId] = useState<any>([
    Date.now(),
  ]);
  const [mockExamCount, setMockExamCount] = useState(Number);
  const [jobCount, setJobCount] = useState(Number);
  const [updateMockExamContainers, setUpdateMockExamContainers] =
    useState(false);
  const [updateJobPostContent, setUpdateJobPostContent] = useState(false);
  const [removeMockExamContainers, setRemoveMockExamContainers] =
    useState(false);
  const [remove, setRemove] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    console.log(loadJobPostContent);
  }, [loadJobPostContent]);

  useEffect(() => {
    const tempArray: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_MOCK_TESTS}`)
      .then((response) => {
        setResponse(response.data);
        if (response.data.length != 0) {
          response.data.map((item: any, index: number) => {
            tempArray.push(item);
            if (localStorage.length > 0) {
              for (let i = 0; i < localStorage.length; i++) {
                const key: any = localStorage.key(i);
                let Item: any = localStorage.getItem(key);
                let jsonParsedItem = Item ? JSON.parse(Item) : null;
                if (item.mockExamId === jsonParsedItem.mockExamId) {
                  tempArray[index] = jsonParsedItem;
                } else if (response.data.length - 1 === index) {
                  const lastElement = tempArray.find(
                    (item: any) => item.mockExamId === jsonParsedItem.mockExamId
                  );
                  if (!lastElement) {
                    tempArray.push(jsonParsedItem);
                  }
                }
              }
            }
            setLoadMockTests(tempArray);
          });
        } else {
          if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
              const key: any = localStorage.key(i);
              let Item: any = localStorage.getItem(key);
              let jsonParsedItem = Item ? JSON.parse(Item) : null;
              tempArray.push(jsonParsedItem);
              setLoadMockTests(tempArray);
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [remove]);

  function loadMockExamComponent(mockexamId: number, mockExamCounter: number) {
    loadMockTests.find((item: any) => {
      if (item.mockExamId === mockexamId) {
        setLoadMockTestQuestions(item);
        setMockExamCount(mockExamCounter);
      }
    });

    setMockExamState(!mockExamState);
  }
  function addMockExamContainers() {
    setLoadMockTests([
      ...loadMockTests,
      {
        mockExamId: Date.now(),
        mockExamContent: {
          questionContent: [],
        },
      },
    ]);
  }
  function removeMockExamComponent(mockExamId: Number) {
    if (localStorage.length > 0) {
      localStorage.removeItem(mockExamId.toString());
    }
    axios
      .delete(`${process.env.NEXT_PUBLIC_SAVE_URL}/${mockExamId}`)
      .then((response) => {
        setRemove(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
            {jobPostState ? (
              <JobContent
                loadJobPostContent={loadJobPostContent}
                updateJobPostContent={updateJobPostContent}
                jobCount={jobCount}
              />
            ) : mockExamState ? (
              <MockExam
                setLoadMockTestQuestions={setLoadMockTestQuestions}
                loadMockTestQuestions={loadMockTestQuestions}
                mockExamCount={mockExamCount}
                updateMockExamContainer={updateMockExamContainers}
                response={response}
              />
            ) : (
              <>
                <div id={styles.mockExams}>
                  <div id={styles.mockExamscontainerHeader}>
                    <h1>Mock Exams</h1>
                    <button onClick={addMockExamContainers}>
                      <Image
                        alt="plus-icon"
                        width={23}
                        height={23}
                        src="/recruiter/plus-icon.svg"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setUpdateMockExamContainers(!updateMockExamContainers);
                        setRemoveMockExamContainers(false);
                      }}
                    >
                      {" "}
                      <Image
                        alt="update-icon"
                        width={20}
                        height={20}
                        src="/recruiter/update-icon.svg"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setRemoveMockExamContainers(!removeMockExamContainers);
                        setUpdateMockExamContainers(false);
                      }}
                    >
                      {" "}
                      <Image
                        alt="remove-icon"
                        width={23}
                        height={23}
                        src="/recruiter/remove-icon.svg"
                      />
                    </button>
                  </div>
                  <div className={styles.mockExamscontainerSection}>
                    {loadMockTests?.map((item: any, index: number) => {
                      return (
                        <>
                          {removeMockExamContainers ? (
                            <button
                              onClick={() => {
                                removeMockExamComponent(item.mockExamId);
                              }}
                              key={item.mockExamId}
                              id={styles.mockExamscontainer}
                            >
                              <Image
                                alt="exam-icon"
                                width={60}
                                height={60}
                                src="/recruiter/exam-icon.svg"
                              />
                              <h1>Mock Exam {index + 1}</h1>
                              <div id={styles.mockExamscontainerButtons}>
                                <Image
                                  alt="remove-icon"
                                  width={25}
                                  height={25}
                                  src="/recruiter/remove-icon.svg"
                                />
                              </div>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                loadMockExamComponent(
                                  item.mockExamId,
                                  index + 1
                                );
                              }}
                              key={item.mockExamId}
                              id={styles.mockExamscontainer}
                            >
                              <Image
                                alt="exam-icon"
                                width={60}
                                height={60}
                                src="/recruiter/exam-icon.svg"
                              />
                              <h1>Mock Exam {index + 1}</h1>
                              <div id={styles.mockExamscontainerButtons}>
                                {updateMockExamContainers ? (
                                  <Image
                                    alt="update-icon"
                                    width={25}
                                    height={25}
                                    src="/recruiter/update-icon.svg"
                                  />
                                ) : null}
                              </div>
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <JobListing
                  loadJobPostContent={loadJobPostContent}
                  setLoadJobPostContent={setLoadJobPostContent}
                  setJobPostState={setJobPostState}
                  jobPostState={jobPostState}
                  setJobCount={setJobCount}
                />
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
