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
  const [userId, setUserId] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    fetchUserAuthStatus();
  }, []);

  
  async function fetchUserAuthStatus() {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/users/me`,
        { withCredentials: true }
      );
      setUserId(response.data.id);
      fetchUserSkills(response.data.id);
    } catch (err) {
      console.error("Error verifying login:", err);
      setNotLoggedIn(true);
      setLoading(false);
    }
  }

  async function fetchUserSkills(userId: string) {
    try {
      const response = await axios.get(
        `http://localhost:5001/testscores?userId=${userId}`, 
        { withCredentials: true }
      );

      if (response.data && response.data.selectedSkills) {
        const fetchedSkills = response.data.selectedSkills;
        setSkills(fetchedSkills); 
      } else {
        setSkills([]);
      }
    } catch (err) {
      console.error("Error fetching user skills:", err);
      setError("Failed to fetch user skills");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (skills.length > 0) {
      fetchJobRecommendations(skills);
    }
  }, [skills]);

  /
  async function fetchJobRecommendations(userSkills: string[]) {
    if (userSkills.length === 0) {
      console.warn("No skills found, skipping job fetch.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:5001/jobs/recommendJob`, 
        { skills: userSkills }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch job recommendations");
    } finally {
      setLoading(false);
    }
  }

  
  const selectJob = async (job: Job) => {
    if (!userId) return;

    try {
      const response = await axios.patch(
        `http://localhost:5001/users/updateUser/${userId}`,
        {
          selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert(`Successfully selected job: ${job.jobTitle}`);
      }
    } catch (err: any) {
      console.error("Error updating user job:", err);
      alert("Failed to select job");
    }
  };

  
  if (notLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="not-logged-in-container">
          <h1>Job Recommendations</h1>
          <p className="not-logged-in-message">
            Please log in to see job recommendations.
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
        {!loading && jobs.length === 0 && (
          <p>No job recommendations found based on your skills.</p>
        )}

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
