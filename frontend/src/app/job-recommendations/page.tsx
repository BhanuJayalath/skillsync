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

  useEffect(() => {
    //Fetch User ID (from LocalStorage or Backend)
    async function fetchUserId() {
      try {
        const storedUserId = localStorage.getItem("userId");

        if (storedUserId) {
          setUserId(storedUserId);
          fetchUserProfile(storedUserId);
        } else {
          // Fetch user ID from the backend
          const response = await axios.get("http://localhost:3001/api/auth/current-user", {
            withCredentials: true, // If using cookies/sessions
          });

          if (response.data && response.data.userId) {
            setUserId(response.data.userId);
            localStorage.setItem("userId", response.data.userId); // Store for later use
            fetchUserProfile(response.data.userId);
          } else {
            throw new Error("User not logged in");
          }
        }
      } catch (err: any) {
        console.error("Error fetching user ID:", err.message);
        setError("User not logged in");
        router.push("/login"); // Redirect to login if user is not logged in
        setLoading(false);
      }
    }

    
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

    //  Fetch Job Recommendations
    const fetchJobRecommendations = async (skills: string[]) => {
      try {
        const jobResponse = await axios.post("http://localhost:3001/api/jobs/recommendations", {
          skills,
        });

        setJobs(jobResponse.data.jobs || []);
      } catch (err: any) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to fetch job recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Job Recommendations</h1>

        {loading && <p>Loading job recommendations...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && jobs.length === 0 && <p>No jobs found.</p>}

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
      </div>
      <Footer />
    </>
  );
}
