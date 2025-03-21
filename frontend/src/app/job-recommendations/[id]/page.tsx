"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./JobRecommendations.css";

interface Job {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  requiredSkills: string[];
  matchScore?: number;
  company?: string;
  location?: string;
}

interface SelectedJob {
  jobTitle: string;
  jobId: string;
}

interface User {
  _id: string;
  selectedJob?: SelectedJob;
  skills: string[];
}

const Careers = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Fetch user and their skills
    const fetchUserAndSkills = async () => {
      try {
        setLoading(true);

        // Fetch user data
        const userResponse = await axios.get("/api/users/me", {
          withCredentials: true,
        });

        if (userResponse.data && userResponse.data.user) {
          const userData = userResponse.data.user;
          setUser(userData);

          // Extract user skills
          const userSkills = userData.skills || [];
          setSkills(userSkills);

          // Fetch job recommendations based on skills
          fetchJobRecommendations(userSkills);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);

        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("User not found");
          } else if (err.response?.status === 401) {
            setError("Unauthorized access");
          } else {
            setError("An error occurred while fetching user information");
          }
        } else {
          setError("Failed to fetch user information");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSkills();
  }, []);

  // Fetch job recommendations based on user skills
  const fetchJobRecommendations = async (userSkills: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "/api/jobs/recommendJob",
        { skills: userSkills },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
      } else {
        setError("No job recommendations found");
      }
    } catch (err) {
      console.error("Error fetching job recommendations:", err);
      setError("Failed to fetch job recommendations");
      toast.error("Could not load job recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [jobs, filterType, searchTerm]);

  // Apply filters based on job type and search term
  const applyFilters = () => {
    let result = [...jobs];

    // Filter jobs based on skills
    result = result.filter((job) =>
      job.requiredSkills.some((skill) => skills.includes(skill))
    );

    // Apply job type filter
    if (filterType !== "all") {
      result = result.filter((job) => job.jobType.toLowerCase() === filterType.toLowerCase());
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(term) ||
          job.jobDescription.toLowerCase().includes(term) ||
          job.requiredSkills.some((skill) => skill.toLowerCase().includes(term))
      );
    }

    setFilteredJobs(result);
  };

  // Handle job type filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle job selection
  const selectJob = async (job: Job) => {
    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }
  
    try {
      setLoading(true);
  
      const payload = {
        userId: user._id,
        selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle },
      };
  
      console.log("Sending request to update job:", payload); // Debug log
  
      const response = await axios.patch(
        `/api/jobs/updateUser`, // Correct endpoint
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.status === 200) {
        toast.success(`Successfully selected job: ${job.jobTitle}`);
        setUser((prevUser) => ({
          ...prevUser!,
          selectedJob: response.data.selectedJob,
        }));
      } else {
        toast.error(response.data.error || "Failed to select job");
      }
    } catch (err) {
      console.error("Error updating user job:", err);
      toast.error("Failed to select job");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="job-recommendations">
      <div className="job-recommendations-header">
        <h1>Job Recommendations</h1>

        {skills.length > 0 && (
          <div className="skills-container">
            <h3>Your Skills</h3>
            <div className="skills-tags">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="job-filters">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <select value={filterType} onChange={handleFilterChange} className="filter-select">
              <option value="all">All Job Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        )}
      </div>

      {loading && <p className="loading-message">Loading job recommendations...</p>}

      {!loading && jobs.length === 0 && (
        <div className="no-jobs-container">
          <p>No job recommendations found based on your skills.</p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <ul className="job-list">
          {filteredJobs.map((job) => (
            <li key={job.jobId} className="job-item">
              <h2>{job.jobTitle}</h2>
              <p>{job.jobDescription}</p>
              <button onClick={() => selectJob(job)}>Select</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Careers;
