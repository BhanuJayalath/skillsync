"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JobRecommendations() {
  // State management
  const [userId] = useState("67d2fc8e78ff23ae75d6755e"); // Hardcoded User ID for now
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile from backend
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3001/getUser/${userId}`);
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

    // Fetch job recommendations based on user skills
    const fetchJobRecommendations = async (skills: string[]) => {
      try {
        const jobResponse = await axios.post("http://localhost:3001/jobs/recommendJob", {
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

    fetchUserProfile();
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
