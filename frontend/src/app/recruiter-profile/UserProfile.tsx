// import UserProfilePage from "../userProfile/[id]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../userProfile/Progress";
import Overview from "../userProfile/Overview";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";

export default function UserProfile({
  userId,
  setUserProfile,
  setDashboardTab,
  jobId,
}: {
  userId: string;
  setUserProfile: any;
  setDashboardTab: any;
  jobId: any;
}) {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    avatar: "",
    city: "",
    country: "",
    contact: "",
    language: "",
    github: "",
    linkedin: "",
    cvSummary: "",
  });
  const [jobDetails, setJobDetails] = useState({
    jobId: "",
    jobTitle: "",
    jobType: "",
    recruiterNote: "",
    isSelected: false,
    approved: false,
  });
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const [progress, setProgress] = useState({
    selectedJob: {
      jobTitle: "",
      jobId: "",
    },
    tests: [{ jobId: "", testId: "", testLevel: "", mark: "" }],
  });
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_USER_DETAILS}`, {
        headers: {
          "user-id": userId,
        },
      })
      .then((response) => {
        const userData = {
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          city: response.data.user.city,
          country: response.data.user.country,
          contact: response.data.user.contact,
          language: response.data.user.language,
          github: response.data.user.github,
          linkedin: response.data.user.linkedin,
          cvSummary: response.data.user.cvSummary,
        };
        const progressData = {
          selectedJob: response.data.user.selectedJob,
          tests: response.data.user.tests,
        };
        console.log(progressData);
        setUserDetails(userData);
        setProgress(progressData);
        if (response.data.user.message[0].isSelected) {
          setCheckBoxValue(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_GET_JOB_BY_JOB_ID}/${jobId}`)
      .then((response) => {
        const temp = {
          jobId: response.data.jobId,
          jobTitle: response.data.jobTitle,
          jobType: response.data.jobType,
          recruiterNote: "Congratulations! You've been selected for the job!",
          isSelected: true,
          approved: false,
        };
        setJobDetails(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function Messages() {
    if (!checkBoxValue) {
      axios
        .patch(
          "/api/users/controller",
          { message: [jobDetails] },
          {
            headers: { "Content-Type": "application/json", "user-id": userId },
          }
        )
        .then((response) => {
          console.log("Updated successfully:", response.data);
          setCheckBoxValue(true);
        })
        .catch((error) => {
          console.error("Error:", error.response?.data || error.message);
        });
    } else if (checkBoxValue) {
      axios
        .patch(
          "/api/users/controller",
          { message: [] },
          {
            headers: { "Content-Type": "application/json", "user-id": userId },
          }
        )
        .then((response) => {
          console.log("Updated successfully:", response.data);
          setCheckBoxValue(false);
        })
        .catch((error) => {
          console.error("Error:", error.response?.data || error.message);
        });
    }
  }

  return (
    <section className={styles.userProfile}>
      <header>
        <button
          onClick={() => {
            setUserProfile(false);
            setDashboardTab(true);
          }}
        >
          <Image
            alt="delete-icon"
            width={30}
            height={30}
            src="/recruiter/delete-icon.svg"
          />
        </button>
      </header>
      <section className={styles.userProfileSection}>
        <section className={styles.userProfileContainer}>
          <div id={styles.userProfileHeading}>
            {userDetails.avatar ? <img src={userDetails?.avatar} /> : null}
            <h1>{userDetails.fullName}</h1>
          </div>
          <div id={styles.userProfileContent}>
            <h1>{userDetails.email}</h1>
            <h1>{userDetails.github}</h1>
            <h1>{userDetails.linkedin}</h1>
            <h1>{userDetails.contact}</h1>
          </div>
          <div id={styles.userProfileContent}>
            <h1>{userDetails.city}</h1>
            <h1>{userDetails.country}</h1>
            <h1>{userDetails.language}</h1>
          </div>
          <div id={styles.userProfileContent}>
            <h1>{userDetails.cvSummary}</h1>
          </div>
          <div id={styles.userProfileContent}>
            <label>Set as selected</label>
            <input
              type="checkbox"
              checked={checkBoxValue}
              onChange={Messages}
            ></input>
          </div>
        </section>
        <section id={styles.performance}>
          {progress ? <Progress user={progress} /> : null}
        </section>
      </section>
    </section>
  );
}
