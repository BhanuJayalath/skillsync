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
export default function JobListing() {
  const [loadJobPosts, setLoadJobPosts] = useState<
    {
      mockExamId: number;
      mockExamContent: {
        questionContent: any[];
      };
    }[]
  >([]);

  const [loadJobPostContent, setLoadJobPostContent] = useState([]);
  const [jobPostState, setJobPostState] = useState(false);
  const [mockExamContainerId, setMockExamContainerId] = useState<any>([
    Date.now(),
  ]);
  const [mockExamCount, setMockExamCount] = useState(Number);

  const [updateJobPostContainers, setUpdateJobPostContainers] = useState(false);
  const [removeJobPostContainers, setRemoveJobPostContainers] = useState(false);
  const [remove, setRemove] = useState(false);
  const [response, setResponse] = useState();

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
            setLoadJobPosts(tempArray);
          });
        } else {
          if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
              const key: any = localStorage.key(i);
              let Item: any = localStorage.getItem(key);
              let jsonParsedItem = Item ? JSON.parse(Item) : null;
              tempArray.push(jsonParsedItem);
              setLoadJobPosts(tempArray);
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [remove]);

  function loadJobPostComponent(mockexamId: number, mockExamCounter: number) {
    loadJobPosts.find((item: any) => {
      if (item.mockExamId === mockexamId) {
        setLoadJobPostContent(item);
        setMockExamCount(mockExamCounter);
      }
    });

    setJobPostState(!jobPostState);
  }
  function addJobPostContainers() {
    setLoadJobPosts([
      ...loadJobPosts,
      {
        mockExamId: Date.now(),
        mockExamContent: {
          questionContent: [],
        },
      },
    ]);
  }
  function removeJobPostComponent(mockExamId: Number) {
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
    <div id={styles.jobListing}>
      <div id={styles.jobListingcontainerHeader}>
        <h1>Job Listing</h1>
        <button onClick={addJobPostContainers}>
          <Image
            alt="plus-icon"
            width={23}
            height={23}
            src="/recruiter/plus-icon.svg"
          />
        </button>
        <button
          onClick={() => {
            setUpdateJobPostContainers(!updateJobPostContainers);
            setRemoveJobPostContainers(false);
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
            setRemoveJobPostContainers(!removeJobPostContainers);
            setUpdateJobPostContainers(false);
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
        {loadJobPosts?.map((item: any, index: number) => {
          return (
            <>
              {removeJobPostContainers ? (
                <button
                  onClick={() => {
                    removeJobPostComponent(item.mockExamId);
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
                  <h1>Job Post {index + 1}</h1>
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
                    loadJobPostComponent(item.mockExamId, index + 1);
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
                  <h1>Job Post {index + 1}</h1>
                  <div id={styles.mockExamscontainerButtons}>
                    {updateJobPostContainers ? (
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
  );
}
