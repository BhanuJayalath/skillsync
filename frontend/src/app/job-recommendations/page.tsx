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
