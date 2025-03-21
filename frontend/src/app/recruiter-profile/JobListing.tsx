import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MockExam from "./TestContent";
import Tab from "./JobTab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../assets/styles/recruiter.module.css";
import MockExamContainer from "./QuestionContent";

import axios from "axios";
export default function JobListing({
  setJobPostState,
  jobPostState,
  loadJobPostContent,
  setLoadJobPostContent,
  setJobCount,
  setJobPostResponse,
  recruiterDetails,
}: {
  setJobPostState: any;
  jobPostState: any;
  loadJobPostContent: any;
  setLoadJobPostContent: any;
  setJobCount: any;
  setJobPostResponse: any;
  recruiterDetails: any;
}) {
  const [loadJobPosts, setLoadJobPosts] = useState<
    {
      jobId: String;
      recruiterId: String;
      jobTitle: String;
      jobDescription: String;
      requiredSkills: String[];
      jobType: string[];
    }[]
  >([]);

  const [removeJobPostContainers, setRemoveJobPostContainers] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const tempArray: any = [];
    axios
      .get(
        `${process.env.NEXT_PUBLIC_GET_JOBS_BY_RECRUITER_ID}/${recruiterDetails._id}`
      )
      .then((response) => {
        if (response.data.length != 0) {
          setJobPostResponse(response.data);
          response.data.map((item: any) => {
            tempArray.push(item);
          });
        }
        setLoadJobPosts(tempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [remove]);

  function loadJobPostComponent(jobId: string, JobCounter: number) {
    const jobPost = loadJobPosts.find((item: any) => item.jobId === jobId);
    setLoadJobPostContent(jobPost);
    setJobCount(JobCounter);
    setJobPostState(!jobPostState);
  }
  function addJobPostContainers() {
    localStorage.clear();
    setLoadJobPosts([
      ...loadJobPosts,
      {
        jobId: "Job" + Date.now(),
        recruiterId: recruiterDetails._id,
        jobTitle: "",
        jobDescription: "",
        requiredSkills: [],
        jobType: [],
      },
    ]);
  }
  function removeJobPostComponent(jobId: string) {
    Promise.all([
      axios.delete(`${process.env.NEXT_PUBLIC_REMOVE_TEST}/job/${jobId}`),
      axios.delete(`${process.env.NEXT_PUBLIC_REMOVE_JOB}/${jobId}`),
    ])
      .then((response) => {
        setRemove(true);
      })

      .catch((error) => {
        setRemove(true);
      });
  }
  let counter = 0;
  return (
    <div id={styles.jobListing}>
      <div id={styles.jobListingcontainerHeader}>
        <h1>Job Listing</h1>
        {loadJobPosts ? (
          <div id={styles.jobListingHeaderButtonsSection}>
            <button onClick={addJobPostContainers}>
              <Image
                alt="plus-icon"
                width={20}
                height={20}
                src="/recruiter/plus-icon.svg"
              />
              Add Jobs
            </button>
            <button
              onClick={() => {
                setRemoveJobPostContainers(!removeJobPostContainers);
              }}
            >
              <Image
                alt="remove-icon"
                width={20}
                height={20}
                src="/recruiter/remove-icon.svg"
              />
              Remove Jobs
            </button>
          </div>
        ) : (
          <button onClick={addJobPostContainers}>
            <Image
              alt="plus-icon"
              width={23}
              height={23}
              src="/recruiter/plus-icon.svg"
            />
          </button>
        )}
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
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
