import JobTab from "./JobTab";
import TestTab from "./TestTab";
import ResultTab from "./ResultTab";
import styles from "../assets/styles/recruiter.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard({
  recruiterDetails,
  setUserProfile,
  setDashboardTab,
  setUserId,
}: {
  recruiterDetails: any;
  setUserProfile: any;
  setDashboardTab: any;
  setUserId: any;
}) {
  const [jobs, setJobs] = useState([]);
  const [tests, setTests] = useState([]);
  const [bestPerformed, setBestPerformed] = useState([]);
  const [onLoad, setOnLoad] = useState(true);
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_USER_DETAILS}`, {})
      .then((response) => {
        const newUsers = response.data.users.map((item: any) => item);
        setUsers(newUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const tempJobSet: any = [];
    axios
      .get(
        `${process.env.NEXT_PUBLIC_GET_JOBS_BY_RECRUITER_ID}/${recruiterDetails._id}`
      )
      .then((response) => {
        response.data.map((item: any) => {
          tempJobSet.push(item);
          if (onLoad) {
            loadTests(item.jobId);
          }
        });
        setJobs(tempJobSet);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onLoad, setOnLoad]);
  useEffect(()=>{},[users])

  function loadTests(jobId: any) {
    const tempTestsSet: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_TESTS}/${jobId}`)
      .then((response) => {
        response.data.map((item: any) => {
          tempTestsSet.push(item);
          if (onLoad) {
            performance(item.testId);
          }
        });
        setTests(tempTestsSet);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function performance(testId: string) {
    const tempMarkArray: any = [];
    console.log(users);
    users.map((item: any) => {
      if (item.tests.length > 0) {
        const test = item.tests.find((item: any) => item.testId == testId);
        // console.log(test);
        tempMarkArray.push({
          userId: item._id,
          userName: item.userName,
          avatar: item.avatar ? item.avatar : null,
          testId: test.testId,
          score: test.score,
        });
      }
    });
    const sortedMarkArray = tempMarkArray.sort(
      (a: any, b: any) => b.score - a.score
    );
    setBestPerformed(sortedMarkArray);
    setOnLoad(false);
    // console.log(sortedMarkArray);
  }

  return (
    <>
      <div id={styles.topGraded}>
        <h1>Job Post</h1>
        <div id={styles.dashboardDisplayContainer}>
          {jobs.map((item: any) => {
            return (
              <button
                key={item.jobId}
                onClick={() => {
                  loadTests(item.jobId);
                }}
                id={styles.topGradedContainer}
              >
                <JobTab jobTitle={item.jobTitle} />
              </button>
            );
          })}
        </div>
      </div>
      <div id={styles.profiles}>
        <h1>Tests</h1>
        <div id={styles.dashboardDisplayContainer}>
          {tests.map((item: any, index: number) => {
            return (
              <button
                onClick={() => {
                  performance(item.testId);
                }}
                key={item.testId}
                id={styles.profilesContainer}
              >
                <TestTab testId={item.testId} index={index + 1} />
              </button>
            );
          })}
        </div>
      </div>
      <div id={styles.results}>
        <h1>Results</h1>
        <div id={styles.dashboardDisplayContainer}>
          {bestPerformed.map((item: any, index: number) => {
            return (
              <button
                onClick={() => {
                  setUserProfile(true);
                  setDashboardTab(false);
                  setUserId(item.userId);
                }}
                key={index}
                id={styles.resultsContainer}
              >
                <ResultTab userDetails={item} />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
