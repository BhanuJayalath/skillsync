import Tab from "./Tab";
import ResultTab from "./ResultTab";
import styles from "../assets/styles/recruiter.module.css";
export default function Dashboard() {
  return (
    <div id={styles.contentContainer1}>
      <div id={styles.topGraded}>
        <h1>Top Graded</h1>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
        <div id={styles.topGradedContainer}>
          <Tab />
        </div>
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
