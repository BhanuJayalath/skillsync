import Tab from "./Tab";
import ResultTab from "./ResultTab";
import styles from "../assets/styles/recruiter.module.css";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [testResults, setTestResults] = useState([]);

  const users = [
    {
      userId: "1",
      jobId: "1",
      tests: [
        { testId: "1", result: 25 },
        { testId: "2", result: 50 },
      ],
    },
    {
      userId: "2",
      jobId: "2",
      tests: [
        { testId: "1", result: 50 },
        { testId: "2", result: 90 },
      ],
    },
    {
      userId: "3",
      jobId: "1",
      tests: [
        { testId: "1", result: 30 },
        { testId: "2", result: 60 },
      ],
    },
  ];

  useEffect(() => {
    const jobSet: any = [];
    users.map((item: any) => {
      jobSet.push(item);
    });
    setJobs(jobSet);
    console.log(jobSet);
  }, []);

  // function performance() {}
  return (
    <div id={styles.contentContainer1}>
      <div id={styles.topGraded}>
        <h1>Job Post</h1>
        <>
          {jobs.map((item: any) => {
            return (
              <div id={styles.topGradedContainer}>
                <Tab />
              </div>
            );
          })}
        </>
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
  );
}
