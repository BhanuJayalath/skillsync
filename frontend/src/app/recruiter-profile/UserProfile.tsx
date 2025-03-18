// import UserProfilePage from "../userProfile/[id]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../userProfile/Progress";
import Overview from "../userProfile/Overview";
import Image from "next/image";
import styles from "../assets/styles/recruiter.module.css";

interface UserDetails {
  selectedJob: {
    jobTitle: string;
    jobId: string;
  };
  tests: {
    testId: string;
    testLevel: string;
    mark: string;
    xAxis: string;
  }[];
}

export default function UserProfile({
  userId,
  setUserProfile,
  setDashboardTab,
}: {
  userId: string;
  setUserProfile: any;
  setDashboardTab: any;
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

  useEffect(() => {
    console.log(userId);
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_USER_DETAILS}`, {
        headers: {
          "user-id": userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
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
        setUserDetails(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
        <h1>{userDetails.cvSummary}</h1>
      </div>
      <div>
        <label>Set as selected</label>
        <input type="checkbox"></input>
      </div>
    </section>
  );
}
