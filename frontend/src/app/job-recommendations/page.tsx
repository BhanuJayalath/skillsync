"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "./axios-config"
import "./JobRecommendations.css"

interface Job {
  jobId: string
  jobTitle: string
  jobDescription: string
  jobType: string
  requiredSkills: string[]
  matchScore?: number
}

export default function JobRecommendations() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userId, setUserId] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notLoggedIn, setNotLoggedIn] = useState(false)

  // Added for pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [jobsPerPage] = useState(5)

  // Added for filtering
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all")
  const [availableJobTypes, setAvailableJobTypes] = useState<string[]>([])

  /** ✅ Extract User ID from URL or Local Storage */
  useEffect(() => {
    let userIdFromUrl = searchParams.get("user_id")

    if (!userIdFromUrl) {
      userIdFromUrl = localStorage.getItem("userId") // Fallback to localStorage
    }

    console.log("Extracted User ID:", userIdFromUrl)

    if (!userIdFromUrl) {
      setNotLoggedIn(true)
      setLoading(false)
      return
    }

    setUserId(userIdFromUrl)
    validateUser(userIdFromUrl)
  }, [])

  /** ✅ Validate User Exists in `users` Collection */
  async function validateUser(userId: string) {
    try {
      const response = await api.get(`/getUser/${userId}`)

      if (response.data && response.data._id === userId) {
        fetchUserTestScore(userId)
      } else {
        setNotLoggedIn(true)
        setLoading(false)
      }
    } catch (err: any) {
      console.error("Error validating user:", err)
      // Improved error handling with specific messages
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.")
      } else if (err.response?.status === 404) {
        setError("User not found. Please create an account.")
      } else {
        setError("Failed to validate user. Please try again later.")
      }
      setNotLoggedIn(true)
      setLoading(false)
    }
  }

  /** ✅ Fetch User Test Score & Skills */
  async function fetchUserTestScore(userId: string) {
    try {
      const response = await api.get(`/testscore/${userId}`)

      if (response.data && response.data.selectedSkills) {
        const { overallScore, selectedSkills } = response.data

        console.log("User Test Score:", overallScore)
        console.log("Selected Skills from Test:", selectedSkills)

        // Check if `overallScore` is greater than 40%
        if (overallScore > 40) {
          updateUserSkills(userId, selectedSkills)
        } else {
          console.log("Test score too low, not updating user skills.")
          // Still fetch existing user skills if test score is low
          fetchExistingUserSkills(userId)
        }
      } else {
        console.log("No test score found for user.")
        fetchExistingUserSkills(userId)
      }
    } catch (err: any) {
      console.error("Error fetching user test score:", err)
      setError("Failed to fetch user test score")
      // Still try to fetch existing skills if test score fetch fails
      fetchExistingUserSkills(userId)
    }
  }

  /** ✅ Fetch Existing User Skills if Test Score is Low or Not Available */
  async function fetchExistingUserSkills(userId: string) {
    try {
      const response = await api.get(`/getUser/${userId}`)

      if (response.data && response.data.skills && response.data.skills.length > 0) {
        setSkills(response.data.skills)
        fetchJobRecommendations(response.data.skills)
      } else {
        setSkills([])
        setLoading(false)
      }
    } catch (err) {
      console.error("Error fetching existing user skills:", err)
      setError("Failed to fetch user skills")
      setLoading(false)
    }
  }

  /** ✅ Update User Skills in `users` Collection */
  async function updateUserSkills(userId: string, newSkills: string[]) {
    try {
      await api.patch(
        `/updateUser/${userId}`,
        { skills: newSkills },
        { headers: { "Content-Type": "application/json" } },
      )

      console.log("User skills updated successfully:", newSkills)
      setSkills(newSkills)
      fetchJobRecommendations(newSkills)
    } catch (err) {
      console.error("Error updating user skills:", err)
      setError("Failed to update user skills")
      setLoading(false)
    }
  }

  /** ✅ Fetch Job Recommendations when `skills` updates */
  useEffect(() => {
    if (skills.length > 0) {
      fetchJobRecommendations(skills)
    }
  }, [skills, page, jobTypeFilter]) // Added page and jobTypeFilter dependencies

  /** ✅ Fetch Job Recommendations from `jobs` Collection */
  async function fetchJobRecommendations(userSkills: string[]) {
    if (userSkills.length === 0) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Added pagination and filtering parameters
      const response = await api.post(
        `/jobs/recommendJob`,
        {
          skills: userSkills,
          page,
          limit: jobsPerPage,
          jobType: jobTypeFilter !== "all" ? jobTypeFilter : undefined,
        },
        { headers: { "Content-Type": "application/json" } },
      )

      if (response.data) {
        // Calculate match score for each job
        const jobsWithMatchScore = response.data.jobs.map((job: Job) => {
          const matchingSkills = job.requiredSkills.filter((skill) => userSkills.includes(skill))
          const matchScore =
            job.requiredSkills.length > 0 ? Math.round((matchingSkills.length / job.requiredSkills.length) * 100) : 0
          return { ...job, matchScore }
        })

        // Sort jobs by match score (highest first)
        jobsWithMatchScore.sort((a: Job, b: Job) => (b.matchScore || 0) - (a.matchScore || 0))

        setJobs(jobsWithMatchScore)
        setTotalPages(response.data.totalPages || 1)

        // Extract unique job types for filtering
        if (response.data.allJobs) {
          const types = [...new Set(response.data.allJobs.map((job: Job) => job.jobType))] as string[]
          setAvailableJobTypes(types)
        }
      } else {
        setJobs([])
        setTotalPages(1)
      }
    } catch (err: any) {
      console.error("Error fetching jobs:", err)
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to fetch job recommendations")
    } finally {
      setLoading(false)
    }
  }

  /** ✅ Select a Job and Update `selectedJob` in `users` Collection */
  const selectJob = async (job: Job) => {
    if (!userId) return

    try {
      const response = await api.patch(
        `/updateUser/${userId}`,
        { selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle } },
        { headers: { "Content-Type": "application/json" } },
      )

      if (response.status === 200) {
        alert(`Successfully selected job: ${job.jobTitle}`)
      }
    } catch (err: any) {
      console.error("Error updating user job:", err)
      alert(err.response?.data?.message || "Failed to select job")
    }
  }

  /** ✅ If User is Not Logged In */
  if (notLoggedIn) {
    return (
      <div className="not-logged-in-container">
        <h1>Job Recommendations</h1>
        <p className="not-logged-in-message">Please log in as a user to see job recommendations.</p>
        <button onClick={() => router.push("/login")} className="login-button">
          Go to Login
        </button>
      </div>
    )
  }

  /** ✅ Render the Page */
  return (
    <div className="job-recommendations">
      <h1>Job Recommendations</h1>

      {/* User Skills Section */}
      {skills.length > 0 && (
        <div className="skills-section">
          <h2>Your Skills</h2>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Type Filter */}
      {availableJobTypes.length > 0 && (
        <div className="filter-section">
          <label htmlFor="job-type-filter">Filter by Job Type: </label>
          <select
            id="job-type-filter"
            value={jobTypeFilter}
            onChange={(e) => {
              setJobTypeFilter(e.target.value)
              setPage(1) // Reset to first page when filter changes
            }}
            className="job-type-select"
          >
            <option value="all">All Job Types</option>
            {availableJobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading and Error States */}
      {loading && <p className="loading-message">Loading job recommendations...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && jobs.length === 0 && (
        <p className="no-jobs-message">
          No job recommendations found based on your skills.
          {skills.length === 0 && " Please complete a skills assessment first."}
        </p>
      )}

      {/* Job List */}
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.jobId} className="job-item">
            <div className="job-header">
              <h2>{job.jobTitle}</h2>
              {job.matchScore !== undefined && (
                <div className="match-score">
                  <span
                    className={`score-value ${job.matchScore > 70 ? "high-match" : job.matchScore > 40 ? "medium-match" : "low-match"}`}
                  >
                    {job.matchScore}% Match
                  </span>
                </div>
              )}
            </div>
            <p className="job-description">{job.jobDescription}</p>
            <p>
              <strong>Type:</strong> {job.jobType}
            </p>
            <div className="required-skills">
              <strong>Required Skills:</strong>
              <div className="skills-container">
                {job.requiredSkills?.map((skill, index) => (
                  <span key={index} className={`skill-tag ${skills.includes(skill) ? "matching-skill" : ""}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => selectJob(job)} className="select-job-button">
              Select Job
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-indicator">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

