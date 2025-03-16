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

    // Fetch User Profile and Skills
    const fetchUserProfile = async (userId: string) => {
      try {
        const userResponse = await axios.get(`http://localhost:3001/api/users/${userId}`);
        const userData = userResponse.data;

        if (!userData || !userData.skills || !Array.isArray(userData.skills)) {
          throw new Error("User skills not found");
        }

        setSkills(userData.skills);
        fetchJobRecommendations(userData.skills);
      } catch (err: any) {
        console.error("Error fetching user profile:", err.message);
        setError("Failed to fetch user profile");
        setLoading(false);
      }
    };

    // Fetch Job Recommendations
    const fetchJobRecommendations = async (skills: string[]) => {
      try {
        const response = await axios.post("http://localhost:3001/jobs/recommendJob", { skills });
        setJobs(response.data.jobs || []);
      } catch (err: any) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to fetch job recommendations");
      } finally {
        setLoading(false);
      }
    };

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

    
  }, );

  return (
    <>
      <Navbar />
      <div>
        <h1>Job Recommendations</h1>

        {loading && <p>Loading job recommendations...</p>}

        
        {notLoggedIn && (
          <div>
            <p>You are not logged in. Please log in to see job recommendations.</p>
            <button onClick={() => router.push("/login")}>Go to Login</button>
          </div>
        )}

        {error && <p>Error: {error}</p>}
        {!loading && jobs.length === 0 && !notLoggedIn && <p>No jobs found.</p>}

        {!notLoggedIn && (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                <h2>{job.jobTitle}</h2>
                <p>{job.jobDescription}</p>
                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p>
                  <strong>Required Skills:</strong> {job.requiredSkills?.join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}
