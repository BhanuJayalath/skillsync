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
  updateTestContent,
  setUpdateTestContent,
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
  updateTestContent: any;
  setUpdateTestContent: any;
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
    <div id={styles.mockExams}>
      <div id={styles.mockExamscontainerHeader}>
        <h1>Tests</h1>
        <button onClick={addTestComponent}>
          <Image
            alt="plus-icon"
            width={23}
            height={23}
            src="/recruiter/plus-icon.svg"
          />
        </button>
        <button
          onClick={() => {
            setUpdateTestContent(!updateTestContent);
            setRemoveTestBlock(false);
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
            setRemoveTestBlock(!removeTestBlock);
            setUpdateTestContent(false);
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
              id={styles.mockExamscontainer}
            >
              <Image
                alt="exam-icon"
                width={60}
                height={60}
                src="/recruiter/exam-icon.svg"
              />
              <h1>Test {index + 1}</h1>
              <div id={styles.mockExamscontainerButtons}>
                {removeTestBlock ? (
                  <Image
                    alt="remove-icon"
                    width={25}
                    height={25}
                    src="/recruiter/remove-icon.svg"
                  />
                ) : updateTestContent ? (
                  <Image
                    alt="update-icon"
                    width={25}
                    height={25}
                    src="/recruiter/update-icon.svg"
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
