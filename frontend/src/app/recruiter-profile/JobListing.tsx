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
export default function JobListing({
  setJobPostState,
  jobPostState,
  loadJobPostContent,
  setLoadJobPostContent,
  setJobCount,
  setUpdateJobPostContent,
  updateJobPostContent,
  setJobPostResponse,
}: {
  setJobPostState: any;
  jobPostState: any;
  loadJobPostContent: any;
  setLoadJobPostContent: any;
  setJobCount: any;
  setUpdateJobPostContent: any;
  updateJobPostContent: any;
  setJobPostResponse: any;
}) {
  const [loadJobPosts, setLoadJobPosts] = useState<
    {
      jobId: String;
      jobTitle: String;
      jobDescription: String;
      requiredSkills: String[];
      jobType: string[];
    }[]
  >([]);

  const [mockExamContainerId, setMockExamContainerId] = useState<any>([
    Date.now(),
  ]);
  const [mockExamCount, setMockExamCount] = useState(Number);
  const [removeJobPostContainers, setRemoveJobPostContainers] = useState(false);
  const [remove, setRemove] = useState(false);
  const tempArray: any = [];

  useEffect(() => {
    console.log(loadJobPosts);
    axios
      .get("http://localhost:3001/job-recommendation/all-jobs")
      .then((response) => {
        if (response.data.length != 0) {
          response.data.map((item: any, index: number) => {
            tempArray.push(item);
            if (localStorage.length > 0) {
              for (let i = 0; i < localStorage.length; i++) {
                const key: any = localStorage.key(i);
                let Item: any = localStorage.getItem(key);
                let jsonParsedItem = Item ? JSON.parse(Item) : null;
                if (item.jobId === jsonParsedItem.jobId) {
                  tempArray[index] = jsonParsedItem;
                } else if (jsonParsedItem.jobId) {
                  tempArray.push(jsonParsedItem);
                }
                // else if (response.data.length - 1 === index) {
                //   const lastElement = tempArray.find(
                //     (item: any) => item.jobId === jsonParsedItem.jobId
                //   );
                //   if (!lastElement) {
                //     tempArray.push(jsonParsedItem);
                //   }
                // }
              }
            }
            setLoadJobPosts(tempArray);
            setJobPostResponse(response.data);
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
      });
  }, [remove]);

  function loadJobPostComponent(jobId: string, JobCounter: number) {
    const jobPost = loadJobPosts.find((item: any) => item.jobId === jobId);
    setLoadJobPostContent(jobPost);
    setJobCount(JobCounter);
    setJobPostState(true);
  }
  function addJobPostContainers() {
    setLoadJobPosts([
      ...loadJobPosts,
      {
        jobId: "job" + Date.now(),
        jobTitle: "",
        jobDescription: "",
        requiredSkills: [],
        jobType: [],
      },
    ]);
  }
  function removeJobPostComponent(jobId: string) {
    if (localStorage.length > 0) {
      localStorage.removeItem(jobId);
    }
    axios
      .delete(`${process.env.NEXT_PUBLIC_UPDATE_JOBS}/${jobId}`)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    setRemove(true);
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
            setUpdateJobPostContent(!updateJobPostContent);
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
            setUpdateJobPostContent(false);
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
            <button
              key={index} // Ensure key is directly on the button element
              onClick={() => {
                if (removeJobPostContainers) {
                  removeJobPostComponent(item.jobId); // Use jobId here instead of mockExamId
                } else {
                  loadJobPostComponent(item.jobId, index + 1);
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
              <h1>Job Post {index + 1}</h1>
              <div id={styles.mockExamscontainerButtons}>
                {removeJobPostContainers ? (
                  <Image
                    alt="remove-icon"
                    width={25}
                    height={25}
                    src="/recruiter/remove-icon.svg"
                  />
                ) : updateJobPostContent ? (
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
