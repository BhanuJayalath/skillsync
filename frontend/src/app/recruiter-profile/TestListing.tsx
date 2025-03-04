"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./TestContent";
import Tab from "./Tab";
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
  setLoadTestQuestions,
  setTestCount,
  remove,
  setRemove,
  testResponse,
  setTestResponse,
}: {
  loadTests: any;
  setLoadTests: any;
  updateTestContent: any;
  setUpdateTestContent: any;
  removeTestBlock: any;
  setRemoveTestBlock: any;
  testState: any;
  setTestState: any;
  setLoadTestQuestions: any;
  setTestCount: any;
  remove: any;
  setRemove: any;
  testResponse: any;
  setTestResponse: any;
}) {
  //   const [loadMockTests, setLoadMockTests] = useState<
  //     {
  //       mockExamId: string;
  //       mockExamContent: {
  //         questionContent: any[];
  //       };
  //     }[]
  //   >([]);

  //   const [loadMockTestQuestions, setLoadMockTestQuestions] = useState([]);
  //   const [loadJobPostContent, setLoadJobPostContent] = useState<
  //     {
  //       jobId: String;
  //       jobTitle: String;
  //       jobDescription: String;
  //       requiredSkills: [];
  //       jobType: [];
  //     }[]
  //   >([]);
  //   const [mockExamState, setMockExamState] = useState(false);
  //   const [jobPostState, setJobPostState] = useState(false);

  //   const [mockExamContainerId, setMockExamContainerId] = useState<any>([
  //     Date.now(),
  //   ]);
  //   const [mockExamCount, setMockExamCount] = useState(Number);
  //   const [jobCount, setJobCount] = useState(Number);
  //   const [updateMockExamContainers, setUpdateMockExamContainers] =
  //     useState(false);
  //   const [updateJobPostContent, setUpdateJobPostContent] = useState(false);
  //   const [removeMockExamContainers, setRemoveMockExamContainers] =
  //     useState(false);
  //   const [remove, setRemove] = useState(false);
  //   const [response, setResponse] = useState();
  //   const [jobPostResponse, setJobPostResponse] = useState();

  //   useEffect(() => {
  //     console.log(loadJobPostContent);
  //   }, [loadJobPostContent]);

  useEffect(() => {
    const tempArray: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_MOCK_TESTS}`)
      .then((response) => {
        setTestResponse(response.data);
        if (response.data.length != 0) {
          response.data.map((item: any, index: number) => {
            tempArray.push(item);
            if (localStorage.length > 0) {
              for (let i = 0; i < localStorage.length; i++) {
                const key: any = localStorage.key(i);
                let Item: any = localStorage.getItem(key);
                let jsonParsedItem = Item ? JSON.parse(Item) : null;
                // console.log(jsonParsedItem.mockExamId);
                if (item.mockExamId === jsonParsedItem.mockExamId) {
                  tempArray[index] = jsonParsedItem;
                } else if (jsonParsedItem.mockExamId) {
                  tempArray.push(jsonParsedItem);
                }
              }
            }
            setLoadTests(tempArray);
          });
        } else {
          if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
              const key: any = localStorage.key(i);
              let Item: any = localStorage.getItem(key);
              let jsonParsedItem = Item ? JSON.parse(Item) : null;
              tempArray.push(jsonParsedItem);
              setLoadTests(tempArray);
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [remove]);

  function loadTestContent(mockexamId: number, mockExamCounter: number) {
    loadTests.find((item: any) => {
      if (item.mockExamId === mockexamId) {
        setLoadTestQuestions(item);
        setTestCount(mockExamCounter);
      }
    });

    setTestState(!testState);
  }
  function addTestComponent() {
    setLoadTests([
      ...loadTests,
      {
        mockExamId: "exam" + Date.now(),
        mockExamContent: {
          questionContent: [],
        },
      },
    ]);
  }
  function removeTestComponent(mockExamId: Number) {
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
              key={item.mockExamId} // Ensure key is directly on the button
              onClick={() => {
                if (removeTestBlock) {
                  removeTestComponent(item.mockExamId);
                } else {
                  loadTestContent(item.mockExamId, index + 1);
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
