"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JobRecommendations() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false); 

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

  useEffect(() => {
    if (!userId) return; 

    async function fetchUserProfile() {
      try {
        const userResponse = await axios.get(`http://localhost:3001/getUser/${userId}`);
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

    fetchUserProfile();
  }, [userId]);

    
    // Fetch Job Recommendations
    async function fetchJobRecommendations(skills: string[]) {
      try {
        const response = await axios.post("http://localhost:3001/jobs/recommendJob", { skills });
        setJobs(response.data.jobs || []);
      } catch (err: any) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to fetch job recommendations");
      } finally {
        setLoading(false);
      }
    }

    fetchUserId(); // Start fetching user ID on component mount
  }, []);

     // Select job and update user profile
  const selectJob = async (job: any) => {
    if (!userId) return;

    try {
      await axios.patch(`http://localhost:3001/updateUser/${userId}`, { selectedJob: job.jobId });
      alert(`You have selected ${job.jobTitle}`);
    } catch (err: any) {
      console.error("Error updating user job:", err.message);
      setError("Failed to update job selection");
    }
  };

  //  Handle not logged-in user
  if (notLoggedIn) {
    return (
      <div className="not-logged-in">
        <h2>You are not logged in</h2>
        <button onClick={() => router.push("/login")} className="login-button">
          Go to Login Page
        </button>
      </div>
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
          {jobs.map((job, index) => (
            <li key={index} className="job-item">
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