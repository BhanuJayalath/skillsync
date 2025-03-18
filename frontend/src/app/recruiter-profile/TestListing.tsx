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
  setTestCount,
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
  setTestCount: any;
  testResponse: any;
  setTestResponse: any;
  loadJobPostContent: any;
}) {
  const [remove, setRemove] = useState(false);
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

  function loadTestContent(testId: string, testCounter: number) {
    loadTests.find((item: any) => {
      if (item.testId === testId) {
        setLoadTestQuestions(item);
        setTestCount(testCounter);
      }
    });
    setJobPostState(!jobPostState);
    setTestState(!testState);
  }
  function addTestComponent() {
    console.log(loadTests);
    setLoadTests([
      ...loadTests,
      {
        testId: "Test" + Date.now(),
        jobId: loadJobPostContent.jobId,
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
        {loadTests.length>0 ? (
          <>
            <button onClick={addTestComponent}>
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
          <button onClick={addTestComponent}>
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
      <div className={styles.testListingSection}>
        {loadTests?.map((item: any, index: number) => {
          return (
            <button
              key={item.testId} // Ensure key is directly on the button
              onClick={() => {
                if (removeTestBlock) {
                  removeTestComponent(item.testId);
                } else {
                  loadTestContent(item.testId, index + 1);
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
              <h1>Test {index + 1}</h1>
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
          );
        })}
      </div>
    </div>
  );
}
