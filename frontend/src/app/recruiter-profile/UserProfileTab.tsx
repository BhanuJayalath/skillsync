import Resume from "../userProfile/Resume";
import Progress from "../userProfile/Progress";
import styles from "../assets/styles/recruiter.module.css";
import { useEffect, useState } from "react";

export default function UserProfileTab({ userDetails }: { userDetails: any }) {
  const [resume, setResume] = useState(false);
  const [progress, setProgress] = useState(true);
  const [userProgressData, setUserProgressData] = useState({
    selectedJob: {
      jobTitle: "",
      jobId: "",
    },
    tests: [],
  });
  const [userResumeDetails, setUserResumedetails] = useState({
    fullName: "",
    email: "",
    contact: "",
    city: "",
    country: "",
    cvSummary: "",
    selectedJob: {
      jobTitle: "",
      jobId: "",
    },
    skills: [],
    education: [],
    experience: [],
  });
  useEffect(() => {
    const tempResume = {
      fullName: userDetails.fullName,
      email: userDetails.email,
      contact: userDetails.contact,
      city: userDetails.city,
      country: userDetails.country,
      cvSummary: userDetails.cvSummary,
      selectedJob: userDetails.selectedJob,
      skills: userDetails.skills,
      education: userDetails.education,
      experience: userDetails.experience,
    };
    const tempProgress = {
      selectedJob: userDetails.selectedJob,
      tests: userDetails.tests,
    };
    setUserResumedetails(tempResume);
    setUserProgressData(tempProgress);
  }, []);
  return (
    <section className={styles.UserProfileTab}>
      <header>
        <button
          onClick={() => {
            setResume(false);
            setProgress(true);
          }}
        >
          Candidate's Progress
        </button>
        <button
          onClick={() => {
            setProgress(false);
            setResume(true);
          }}
        >
          Candidate's Resume
        </button>
      </header>
      {resume && userResumeDetails ? (
        <Resume user={userResumeDetails} />
      ) : progress ? (
        <Progress user={userProgressData} />
      ) : (
        <p>Data Not Found</p>
      )}
    </section>
  );
}
