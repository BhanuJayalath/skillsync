"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JobRecommendations() {
const [userId] = useState("67d2fc8e78ff23ae75d6755e");
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

  fetchUserProfile();
}, []);


  return (
    <>
      <Navbar />
      <div>
        <h1>Job Recommendations</h1>
      </div>
      <Footer />
    </>
  );
}
