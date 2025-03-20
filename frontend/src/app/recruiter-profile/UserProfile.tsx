// import UserProfilePage from "../userProfile/[id]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../userProfile/Progress";
import Overview from "../userProfile/Overview";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";
import UserProfileTab from "./UserProfileTab";
interface SelectedJob {
  jobTitle: string;
  jobId: string;
}

interface UserDetails {
  fullName: string;
  email: string;
  avatar: string;
  city: string;
  country: string;
  contact: string;
  language: string;
  gitHub: string;
  linkedIn: string;
  cvSummary: string;
  selectedJob: SelectedJob;
  skills: string[];
  tests: string[];
  education: string[];
  experience: string[];
}

export default function UserProfile({
  userId,
  setUserProfile,
  setDashboardTab,
  jobId,
  recruiterDetails,
}: {
  userId: string;
  setUserProfile: any;
  setDashboardTab: any;
  jobId: any;
  recruiterDetails: any;
}) {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [jobDetails, setJobDetails] = useState({
    jobId: "",
    jobTitle: "",
    jobType: "",
    companyName: "",
    companyEmail: "",
    recruiterNote: "",
    isSelected: false,
    approved: false,
  });
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
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
          gitHub: response.data.user.gitHub,
          linkedIn: response.data.user.linkedIn,
          cvSummary: response.data.user.cvSummary,
          selectedJob: response.data.user.selectedJob,
          skills: response.data.user.skills,
          tests: response.data.user.tests,
          education: response.data.user.education,
          experience: response.data.user.experience,
        };
        const progressData = {
          selectedJob: response.data.user.selectedJob,
          tests: response.data.user.tests,
        };
        setUserDetails(userData);
        if (response.data.user.notifications[0].isSelected) {
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
          companyName: recruiterDetails.company,
          companyEmail: recruiterDetails.email,
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

  function Notifications() {
    if (!checkBoxValue) {
      axios
        .patch(
          "/api/users/controller",
          { notifications: [jobDetails] },
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
          { notifications: [] },
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
        {userDetails ? (
          <section className={styles.userProfileContainer}>
            <div id={styles.userProfileHeading}>
              {userDetails.avatar ? <img src={userDetails?.avatar} /> : null}
              <h1>{userDetails.fullName}</h1>
            </div>
            <div id={styles.userProfileContent}>
              <a href={`mailto:${userDetails.email}`}>
                <Image
                  alt="email-icon"
                  width={25}
                  height={25}
                  src="/recruiter/email-icon.svg"
                />
              </a>
              <a href={userDetails.linkedIn}>
                <Image
                  alt="linkedin-icon"
                  width={25}
                  height={25}
                  src="/recruiter/linkedin-icon.svg"
                />
              </a>
              <a href={userDetails.gitHub}>
                <Image
                  alt="github-icon"
                  width={25}
                  height={25}
                  src="/recruiter/github-icon.svg"
                />
              </a>
              <a href={`tel:${userDetails.contact}`}>
                <Image
                  alt="call-icon"
                  width={28}
                  height={28}
                  src="/recruiter/call-icon.svg"
                />
              </a>
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
              <label>Set Candidate as Selected</label>
              <input
                type="checkbox"
                checked={checkBoxValue}
                onChange={Notifications}
              ></input>
            </div>
          </section>
        ) : null}
        <section id={styles.performance}>
          {userDetails ? <UserProfileTab userDetails={userDetails} /> : null}
        </section>
      </section>
    </section>
  );
}
