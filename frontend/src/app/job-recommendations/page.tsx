"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./JobRecommendations.css";

interface Job {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  requiredSkills: string[];
}

export default function JobRecommendations() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      setNotLoggedIn(true);
      setLoading(false);
      return;
    }

    setUserId(storedUserId);
    fetchUserSkills(storedUserId);
  }, []);

  /** ✅ Fetch User Skills from `basic-test/testScore` Collection */
  const fetchUserSkills = async (userId: string) => {
    if (!userId) {
      console.error("User ID is missing!");
      setError("Failed to fetch user skills: No user ID provided");
      return;
    }

    try {
      console.log("Fetching user skills for userId:", userId);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/basic-test/${userId}`,
        { withCredentials: true }
      );

      if (response.data && response.data.selectedSkills) {
        setSkills(response.data.selectedSkills); // ✅ Store in state
      } else {
        console.warn("No skills found for this user.");
        setSkills([]); 
      }
    } catch (err) {
      console.error("Error fetching user skills:", err);
      setError("Failed to fetch user skills");
    }
  };

  /** ✅ Fetch Job Recommendations when `skills` is updated */
  useEffect(() => {
    if (skills.length > 0) {
      fetchJobRecommendations(skills);
    }
  }, [skills]); // ✅ Only runs when `skills` changes

  /** ✅ Fetch Job Recommendations Based on User Skills */
  async function fetchJobRecommendations(userSkills: string[]) {
    if (userSkills.length === 0) {
      console.warn("No skills provided for job recommendation.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/recommendJob`,
        { skills: userSkills },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch job recommendations");
    } finally {
      setLoading(false);
    }
  }

  /** ✅ Select a Job and Update the User Profile */
  const selectJob = async (job: Job) => {
    if (!userId) return;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/updateUser/${userId}`,
        { selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle } },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200) {
        alert(`Successfully selected job: ${job.jobTitle}`);
      }
    } catch (err: any) {
      console.error("Error updating user job:", err);
      alert(err.response?.data?.message || "Failed to select job");
    }
  };

  if (notLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="not-logged-in-container">
          <h1>Job Recommendations</h1>
          <p className="not-logged-in-message">
            Please log in as a user to see job recommendations.
          </p>
          <button onClick={() => router.push("/login")} className="login-button">
            Go to Login
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="job-recommendations">
        <h1>Job Recommendations</h1>
        {loading && <p>Loading job recommendations...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && jobs.length === 0 && <p>No job recommendations found based on your skills.</p>}

        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.jobId} className="job-item">
              <h2>{job.jobTitle}</h2>
              <p>{job.jobDescription}</p>
              <p><strong>Type:</strong> {job.jobType}</p>
              <p><strong>Required Skills:</strong> {job.requiredSkills?.join(", ")}</p>
              <button onClick={() => selectJob(job)} className="select-job-button">
                Select Job
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}
