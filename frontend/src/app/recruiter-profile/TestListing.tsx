"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./TestContent";
import Tab from "./JobTab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import JobListing from "./JobListing";
import JobContent from "./JobContent";

import axios from "axios";
export default function TestListing({
  loadTests,
  setLoadTests,
  removeTestBlock,
  setRemoveTestBlock,
  testState,
  setTestState,
  setJobPostState,
  jobPostState,
  setLoadTestQuestions,
  setTestLevel,
  testLevel,
  testResponse,
  setTestResponse,
  loadJobPostContent,
}: {
  loadTests: any;
  setLoadTests: any;
  removeTestBlock: any;
  setRemoveTestBlock: any;
  testState: any;
  setTestState: any;
  jobPostState: any;
  setJobPostState: any;
  setLoadTestQuestions: any;
  setTestLevel: any;
  testLevel: any;
  testResponse: any;
  setTestResponse: any;
  loadJobPostContent: any;
}) {
  const [remove, setRemove] = useState(false);
  const [addTestLevel, setAddTestLevel] = useState(false);
  useEffect(() => {}, [testLevel]);
  useEffect(() => {
    const tempArray: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_TESTS}/${loadJobPostContent.jobId}`)
      .then((response) => {
        setTestResponse(response.data);
        response.data.map((item: any) => {
          tempArray.push(item);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setLoadTests(tempArray);
  }, [remove]);
  useEffect(() => {
    if (testLevel !== "" && loadTests.length > 0) {
      if (!loadTests.some((item: any) => item.testLevel === testLevel)) {
        console.log("This triggers");
        addTestComponent();
      }
    } else if (testLevel !== "") {
      addTestComponent();
    }
  }, [testLevel]);

  function loadTestContent(testId: string) {
    loadTests.find((item: any) => {
      if (item.testId === testId) {
        setLoadTestQuestions(item);
      }
    });
    setJobPostState(!jobPostState);
    setTestState(!testState);
  }
  function addTestComponent() {
    setLoadTests([
      ...loadTests,
      {
        testId: "Test" + Date.now(),
        jobId: loadJobPostContent.jobId,
        testLevel: testLevel,
        testContent: {
          questionContent: [],
        },
      },
    ]);
  }
  function removeTestComponent(testId: string) {
    axios
      .delete(`${process.env.NEXT_PUBLIC_REMOVE_TEST}/${testId}`)
      .then((response) => {
        setRemove(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let counter = 0;
  return (
    <div id={styles.testListing}>
      <div id={styles.testListingHeader}>
        <h1>Tests</h1>
        <div id={styles.testListingHeaderButtons}>
          {addTestLevel ? (
            <div id={styles.addTestLevel}>
              <button
                onClick={() => {
                  setTestLevel("Level 1");
                }}
              >
                Level 1
                <Image
                  alt="plus-icon"
                  width={20}
                  height={20}
                  src="/recruiter/plus-icon.svg"
                />
              </button>
              <button
                onClick={() => {
                  setTestLevel("Level 2");
                }}
              >
                Level 2
                <Image
                  alt="plus-icon"
                  width={20}
                  height={20}
                  src="/recruiter/plus-icon.svg"
                />
              </button>
              <button
                onClick={() => {
                  setTestLevel("Level 3");
                }}
              >
                Level 3
                <Image
                  alt="plus-icon"
                  width={20}
                  height={20}
                  src="/recruiter/plus-icon.svg"
                />
              </button>
              {loadTests.length > 0 ? (
                <button
                  onClick={() => {
                    setRemoveTestBlock(!removeTestBlock);
                  }}
                >
                  <Image
                    alt="remove-icon"
                    width={23}
                    height={23}
                    src="/recruiter/remove-icon.svg"
                  />
                  remove Tests
                </button>
              ) : null}
            </div>
          ) : loadTests.length > 0 ? (
            <>
              <button
                onClick={() => {
                  setAddTestLevel(true);
                }}
              >
                <Image
                  alt="plus-icon"
                  width={23}
                  height={23}
                  src="/recruiter/plus-icon.svg"
                />
                Add Tests
              </button>
              <button
                onClick={() => {
                  setRemoveTestBlock(!removeTestBlock);
                }}
              >
                <Image
                  alt="remove-icon"
                  width={23}
                  height={23}
                  src="/recruiter/remove-icon.svg"
                />
                remove Tests
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setAddTestLevel(true);
              }}
            >
              <Image
                alt="plus-icon"
                width={23}
                height={23}
                src="/recruiter/plus-icon.svg"
              />
              Add Tests
            </button>
          )}
        </div>
      </div>
      <div className={styles.testListingSection}>
        {loadTests?.map((item: any, index: number) => {
          return (
            <div key={item.testId} id={styles.testListingDisplaySection}>
              <button
                onClick={() => {
                  if (removeTestBlock) {
                    removeTestComponent(item.testId);
                  } else {
                    loadTestContent(item.testId);
                  }
                }}
                id={styles.testListingcontainer}
              >
                <Image
                  alt="exam-icon"
                  width={60}
                  height={60}
                  src="/recruiter/exam-icon.svg"
                />
                <h1>{item.testLevel}</h1>
                <div id={styles.testListingButtons}>
                  {removeTestBlock ? (
                    <Image
                      alt="remove-icon"
                      width={25}
                      height={25}
                      src="/recruiter/remove-icon.svg"
                    />
                  ) : null}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
