"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  jobId:string;
}

interface User {
  _id: string;
  selectedJob: SelectedJob;
  skills: string[];

}



const Careers = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");



  // Initialize component with user data if available
  useEffect(() => {

   
    
  }, [user]);

  // Apply filters whenever jobs, filterType, or searchTerm changes
  useEffect(() => {
    applyFilters();
  }, [jobs, filterType, searchTerm]);

  
useEffect(() => {
// Check if user prop is provided (when component is used inside UserProfile)
if (user && user._id) {
  setUserId(user._id);
  if (user.skills && user.skills.length > 0) {
    setSkills(user.skills);
    fetchJobRecommendations(user.skills);
  } else {
    setLoading(false);
  }

} else {
 
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users/me")
      if (response.data && response.data.user && response.data.user._id) {
        setUserId(response.data.user._id)
        fetchUserDetails(response.data.user._id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  fetchUserData()
  
  
 
}

  async function fetchUserDetails(userId: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getUser/${userId}`,
        { withCredentials: true }
      );

      if (response.data && response.data.skills) {
        setUser(response.data.skills);
        fetchJobRecommendations(response.data.skills);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to fetch user details");
      toast.error("Could not load your profile information");
      setLoading(false);
    }
  }
  
  async function fetchJobRecommendations(userSkills: string[]) {
    if (userSkills.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs/recommendJob`,
        { skills: userSkills },
        { headers: { "Content-Type": "application/json" } }
      );
      
      // Assuming response.data.jobs contains the job list
      const jobsWithMatchScore = response.data.jobs.map((job: Job) => {
        const matchingSkills = job.requiredSkills.filter((skill) =>
          userSkills.includes(skill.toLowerCase())
        );
        const matchScore =
          job.requiredSkills.length > 0
            ? Math.round((matchingSkills.length / job.requiredSkills.length) * 100)
            : 0;
        return { ...job, matchScore };
      });
      
      jobsWithMatchScore.sort((a: Job, b: Job) => (b.matchScore || 0) - (a.matchScore || 0));
      setJobs(jobsWithMatchScore);
    } catch (err) {
      console.error("Error fetching job recommendations:", err);
      setError("Failed to fetch job recommendations");
      toast.error("Could not load job recommendations");
    } finally {
      setLoading(false);
    }
  }
}, [userId]);

  

  const selectJob = async (job: Job) => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateUser/${userId}`,
        { selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle } },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(`Successfully selected job: ${job.jobTitle}`);
      }
    } catch (err) {
      console.error("Error updating user job:", err);
      toast.error("Failed to select job");
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on type and search term
  const applyFilters = () => {
  let result = [...jobs];

  // Filter out jobs that don't match any of the user's skills
  result = result.filter(job => 
    job.requiredSkills.some(skill => skills.includes(skill))
  );

  // Apply job type filter
  if (filterType !== "all") {
    result = result.filter(job => job.jobType.toLowerCase() === filterType.toLowerCase());
  }
  
  // Apply search term filter
  if (searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase();
    result = result.filter(job => 
      job.jobTitle.toLowerCase().includes(term) ||
      job.jobDescription.toLowerCase().includes(term) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(term))
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

  // Refresh job recommendations
  //const refreshJobs = () => {
   // fetchJobRecommendations(skills);
    //toast.success("Refreshing job recommendations");
  //};

  if (notLoggedIn) {
    return (
      <div className="not-logged-in-container">
        <h1>Job Recommendations</h1>
        <p className="not-logged-in-message">Please log in to see job recommendations.</p>
        <button onClick={() => router.push("/login")} className="login-button">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="job-recommendations">
      <div className="job-recommendations-header">
        <h1>Job Recommendations</h1>
        
        {/* User skills section */}
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
        
        {/* Search and filter controls */}
        {!loading && jobs.length > 0 && (
          <div className="job-filters" hidden>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            
            <select 
              value={filterType} 
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Job Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
            
            {/*<button onClick={refreshJobs} className="refresh-button">/*}
              {/*Refresh Jobs*/}
            {/*</button>*/}
          </div>
        )}
      </div>
      
      {loading && <p className="loading-message">Loading job recommendations...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && jobs.length === 0 && (
        <div className="no-jobs-container">
          <p>No job recommendations found based on your skills.</p>
          <p>Try adding more skills to your profile to get better recommendations.</p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <>
          <p className="results-count">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          
          <ul className="job-list">
            {filteredJobs.map((job) => (
              <li key={job.jobId} className="job-item">
                <div className="job-header">
                  <h2>{job.jobTitle}</h2>
                  {job.matchScore !== undefined && (
                    <div className={`match-score ${job.matchScore > 70 ? 'high-match' : job.matchScore > 40 ? 'medium-match' : 'low-match'}`} hidden>
                      {job.matchScore}% Match
                    </div>
                  )}
                </div>
                
                <p className="job-description">{job.jobDescription}</p>
                
                <div className="job-details">
                  <p>
                    <strong>Type:</strong> {job.jobType}
                  </p>
                  {job.company && (
                    <p>
                      <strong>Company:</strong> {job.company}
                    </p>
                  )}
                  {job.location && (
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                  )}
                </div>
                
                <div className="skills-section">
                  <strong>Required Skills:</strong>
                  <div className="skills-tags">
                    {job.requiredSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`skill-tag ${skills.includes(skill) ? 'matching-skill' : ''}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => selectJob(job)} 
                  className="select-job-button"
                  disabled={loading}
                  hidden>
                  Select This Job
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Careers;