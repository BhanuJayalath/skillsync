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

interface UserProfile {
  skills: string[];
}

export default function JobRecommendations() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  
  async function fetchUserProfile(userId: string) {
    setLoading(true); 
    setError(null); 

    try {
      const userResponse = await axios.get<UserProfile>(
        `http://localhost:3001/getUser/${userId}`
      );
      const userData = userResponse.data;

      if (!userData || !userData.skills || !Array.isArray(userData.skills)) {
        throw new Error("User skills not found");
      }

      setSkills(userData.skills);
    } catch (err: any) {
      console.error("Error fetching user profile:", err.message);
      setError("Failed to fetch user profile");
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchUserId() {
      try {
        const storedUserId = localStorage.getItem("userId");

        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserProfile(storedUserId); 
        } else {
          setNotLoggedIn(true);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Error fetching user ID:", err.message);
        setError("User not logged in");
        setLoading(false);
      }
    }

    fetchUserId();
  }, []);

  // Fetch Job Recommendations
  useEffect(() => {
    if (skills.length === 0) return; // Prevents API call if skills are empty

    async function fetchJobRecommendations() {
      setLoading(true); 
      setError(null); 
      try {
        const response = await axios.post<{ jobs: Job[] }>(
          "http://localhost:3001/jobs/recommendJob",
          { skills }
        );
        setJobs(response.data.jobs || []);
      } catch (err: any) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to fetch job recommendations");
      } finally {
        setLoading(false);
      }
    }

    fetchJobRecommendations();
  }, [skills]);

  const selectJob = async (job: Job) => {
    if (!userId) return;

    try {
      await axios.patch(`http://localhost:3001/updateUser/${userId}`, {
        selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle },
      });
      alert(`You have selected ${job.jobTitle}`);
    } catch (err: any) {
      console.error("Error updating user job:", err.message);
      setError("Failed to update job selection");
    }
  };

  if (notLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="not-logged-in-container">
          <h1>Job Recommendations</h1>
          <p className="not-logged-in-message">
            You are not logged in. Please log in to see job recommendations.
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
        {!loading && jobs.length === 0 && <p>No jobs found.</p>}

        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.jobId} className="job-item">
              <h2>{job.jobTitle}</h2>
              <p>{job.jobDescription}</p>
              <p>
                <strong>Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Required Skills:</strong> {job.requiredSkills?.join(", ")}
              </p>
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
