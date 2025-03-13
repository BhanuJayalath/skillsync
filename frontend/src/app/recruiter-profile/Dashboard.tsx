import JobTab from "./JobTab";
import TestTab from "./TestTab";
import ResultTab from "./ResultTab";
import styles from "../assets/styles/recruiter.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [tests, setTests] = useState([]);
  const [bestPerformed, setBestPerformed] = useState([]);
  const [onLoad, setOnLoad] = useState(true);
  const users = [
    {
      userId: "1",
      jobId: "1",
      tests: [
        { testId: "Test1741231239210", result: 25 },
        { testId: "Test1741242062920", result: 50 },
      ],
    },
    {
      userId: "2",
      jobId: "2",
      tests: [
        { testId: "Test1741231239210", result: 90 },
        { testId: "Test1741242062920", result: 80 },
      ],
    },
    {
      userId: "3",
      jobId: "1",
      tests: [
        { testId: "Test1741231239210", result: 55 },
        { testId: "Test1741242062920", result: 70 },
      ],
    },
  ];

  useEffect(() => {
    const tempJobSet: any = [];
    axios.get(`${process.env.NEXT_PUBLIC_GET_JOBS}`).then((response) => {
      response.data.map((item: any) => {
        tempJobSet.push(item);
        if (onLoad) {
          loadTests(item.jobId);
        }
      });
      setJobs(tempJobSet);
      console.log(onLoad);
    });
  }, [onLoad,setOnLoad]);
  function loadTests(jobId: any) {
    const tempTestsSet: any = [];
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_TESTS}/${jobId}`)
      .then((response) => {
        response.data.map((item: any) => {
          tempTestsSet.push(item);
          if (onLoad) {
            performance(item.testId);
            setOnLoad(false);
          }
        });
        setTests(tempTestsSet);
      });
  }

  function performance(testId: string) {
    const tempMarkArray: any = [];
    users.map((item: any) => {
      if (item.tests) {
        const test = item.tests.find((item: any) => item.testId == testId);
        tempMarkArray.push({
          userId: item.userId,
          testId: test.testId,
          testResult: test.result,
        });
      }
    });
    const sortedMarkArray = tempMarkArray.sort(
      (a: any, b: any) => b.testResult - a.testResult
    );
    setBestPerformed(sortedMarkArray);
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
              <div key={index} id={styles.resultsContainer}>
                <ResultTab userDetails={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
