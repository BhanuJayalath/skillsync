import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tab from "./Tab";
import ResultTab from "./ResultTab";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
export default function RecruiterProfile() {
  return (
    <section className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.navigation}></div>
        <div id={styles.contentSection}>
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
              <div id={styles.profilesContainer}>
                <ResultTab />
              </div>
              <div id={styles.profilesContainer}>
                <ResultTab />
              </div>
              <div id={styles.profilesContainer}>
                <ResultTab />
              </div>
            </div>
          </div>
          <div id={styles.contentContainer2}>
            <div id={styles.mockExams}>
              <h1 id={styles.mockExamscontainerHeader}>Mock Exams</h1>
              <div className={styles.mockExamscontainerSection}>
                <div id={styles.mockExamscontainer}>
                  <Image
                    alt="exam-icon"
                    width={60}
                    height={60}
                    src="/exam-icon.svg"
                  />
                  <h1>Mock Exam 1</h1>
                </div>
                <div id={styles.mockExamscontainer}>
                  <Image
                    alt="exam-icon"
                    width={60}
                    height={60}
                    src="/exam-icon.svg"
                  />
                  <h1>Mock Exam 2</h1>
                </div>
                <div id={styles.mockExamscontainer}>
                  <Image
                    alt="exam-icon"
                    width={60}
                    height={60}
                    src="/exam-icon.svg"
                  />
                  <h1>Mock Exam 3</h1>
                </div>
              </div>
            </div>
            <div id={styles.jobListing}>
              <h1 id={styles.jobListingcontainerHeader}>Job Listing</h1>
              <div className={styles.jobListingcontainerSection}>
                <div id={styles.jobListingcontainer}>
                  <Image
                    alt="job-search"
                    width={60}
                    height={60}
                    src="/job-search.svg"
                  />
                  <h1>Internship 01</h1>
                </div>
                <div id={styles.jobListingcontainer}>
                  {" "}
                  <Image
                    alt="job-search"
                    width={60}
                    height={60}
                    src="/job-search.svg"
                  />
                  <h1>Internship 02</h1>
                </div>
                <div id={styles.jobListingcontainer}>
                  {" "}
                  <Image
                    alt="job-search"
                    width={60}
                    height={60}
                    src="/job-search.svg"
                  />
                  <h1>Internship 03</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <Image
          src="/logo.png"
          alt="SkillSync"
          width={120}
          height={40}
          className="logo"
        />
        <ul>
          <li>Home</li>
          <li>Message</li>
          <li>Favourites</li>
          <li>Analytics</li>
        </ul>
      </div>
    </section>
  );
}
