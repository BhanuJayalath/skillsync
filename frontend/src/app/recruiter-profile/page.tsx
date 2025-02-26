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

import axios from "axios";
export default function RecruiterProfile() {
  const [loadMockTests, setLoadMockTests] = useState<
    {
      mockExamId: number;
      mockExamContent: {
        questionContent: any[];
      };
    }[]
  >([{ mockExamId: 1, mockExamContent: { questionContent: [] } }]);

  const [loadMockTestQuestions, setLoadMockTestQuestions] = useState([]);
  const [mockExamState, setMockExamState] = useState(false);
  const [mockExamContainerId, setMockExamContainerId] = useState<any>([
    Date.now(),
  ]);
  const [mockExamCount, setMockExamCount] = useState(Number);
  // const [mockExamComponent, setMockExamComponent] = useState<
  //   {
  //     mockExamId: number;
  //     mockExamContent: {
  //       questionContent: [];
  //     };
  //   }[]
  // >();
  // console.log(loadMockTestQuestions);
  // useEffect(()=>{
  //   console.log(loadMockTestQuestions);

  // },[loadMockTestQuestions])

  useEffect(() => {
    const tempArray: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_MOCK_TESTS}`)
      .then((response) => {
        response.data.map((item: any, index: number) => {
          // console.log(item);
          tempArray.push(item);
          if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
              const key: any = localStorage.key(i);
              let Item: any = localStorage.getItem(key);
              let jsonParsedItem = Item ? JSON.parse(Item) : null;
              // console.log(Item.mockExamId);
              if (item.mockExamId === jsonParsedItem.mockExamId) {
                tempArray[index] = jsonParsedItem;
                // console.log(index);
              } else if (response.data.length - 1 === index) {
                const lastElement = tempArray.find(
                  (item: any) => item.mockExamId === jsonParsedItem.mockExamId
                );
                // console.log(lastElement);
                if (!lastElement) {
                  tempArray.push(jsonParsedItem);
                }
                // console.log(index);
              }
            }
          }
          setLoadMockTests(tempArray);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function loadMockExamComponent(mockexamId: number, mockExamCounter: number) {
    loadMockTests.find((item: any) => {
      if (item.mockExamId === mockexamId) {
        setLoadMockTestQuestions(item);
      }
    });

    setMockExamState(!mockExamState);
  }
  function addMockExamContainers() {
    localStorage.clear();
    setLoadMockTests([
      ...loadMockTests,
      {
        mockExamId: Date.now(),
        mockExamContent: {
          questionContent: [],
        },
      },
    ]);
    // setMockExamContainerId([...mockExamContainerId, Date.now()]);
    // console.log(mockExamContainerId);
  }

  function removeMockExamContainer(item: number) {
    const newItems = [...mockExamContainerId];
    const index = mockExamContainerId.indexOf(item);
    if (index != -1) {
      newItems.splice(index, 1);
      setMockExamContainerId(newItems);
    }
    // console.log(item);
    if (localStorage.getItem(JSON.stringify(item))) {
      localStorage.removeItem(JSON.stringify(item));
    }
  }
  // function retrieveLocalStorage() {
  //   if (localStorage.length != 0) {
  //     var temp = [];
  //     var tempIds: number[] = [];
  //     for (let i = 0; i < localStorage.length; i++) {
  //       let key = localStorage.key(i);
  //       if (key) {
  //         const local = localStorage.getItem(key);
  //         if (local) {
  //           temp.push(JSON.parse(local));
  //         }
  //       }
  //     }
  //     temp.map((item) => {
  //       tempIds.push(item.mockExamId);
  //     });

  //     setMockExamContainerId(tempIds);
  //     // setMockExamComponent(temp);
  //   }
  // }
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
                setLoadMockTestQuestions={setLoadMockTestQuestions}
                loadMockTestQuestions={loadMockTestQuestions}
                mockExamCount={mockExamCount}
              />
            ) : (
              <>
                <div id={styles.mockExams}>
                  <div id={styles.mockExamscontainerHeader}>
                    <h1>Mock Exams</h1>
                    <button onClick={addMockExamContainers}>
                      {" "}
                      <Image
                        alt="plus-icon"
                        width={23}
                        height={23}
                        src="/recruiter/plus-icon.svg"
                      />
                    </button>
                  </div>
                  <div className={styles.mockExamscontainerSection}>
                    {loadMockTests?.map((item: any) => {
                      counter++;
                      // console.log(counter);
                      return (
                        <div
                          key={item.mockExamId}
                          id={styles.mockExamscontainer}
                        >
                          <Image
                            alt="exam-icon"
                            width={60}
                            height={60}
                            src="/recruiter/exam-icon.svg"
                          />
                          <h1>Mock Exam {counter}</h1>
                          <div id={styles.mockExamscontainerButtons}>
                            <button
                              onClick={() => {
                                loadMockExamComponent(item.mockExamId, counter);
                              }}
                            >
                              <Image
                                alt="plus-icon"
                                width={20}
                                height={20}
                                src="/recruiter/update-icon.svg"
                              />
                            </button>
                            <button
                              onClick={() => {
                                removeMockExamContainer(item);
                              }}
                            >
                              <Image
                                alt="plus-icon"
                                width={30}
                                height={30}
                                src="/recruiter/remove-icon.svg"
                              />
                            </button>
                          </div>
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
