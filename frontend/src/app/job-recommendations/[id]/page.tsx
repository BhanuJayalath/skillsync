"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Database, Briefcase, Search, Filter, Tag } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Skeleton } from "../../components/ui/skeleton"

interface Job {
  jobId: string
  jobTitle: string
  jobDescription: string
  jobType: string
  requiredSkills: string[]
  matchScore?: number
  company?: string
  location?: string
}

interface SelectedJob {
  jobTitle: string
  jobId: string
}

interface User {
  _id: string
  selectedJob?: SelectedJob
  skills: string[]
}

export default function JobRecommendations() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectingJob, setSelectingJob] = useState<string | null>(null)

  // Fetch user and their skills
  useEffect(() => {
    const fetchUserAndSkills = async () => {
      try {
        setLoading(true)
        const userResponse = await axios.get("/api/users/me", {
          withCredentials: true,
        })

        if (userResponse.data?.user) {
          const userData = userResponse.data.user
          setUser(userData)
          const userSkills = userData.skills || []
          setSkills(userSkills)
          fetchJobRecommendations(userSkills)
        } else {
          setError("User not found")
        }
      } catch (err) {
        console.error("Failed to fetch user:", err)
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError("User not found")
          } else if (err.response?.status === 401) {
            setError("Unauthorized access")
          } else {
            setError("An error occurred while fetching user information")
          }
        } else {
          setError("Failed to fetch user information")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndSkills()
  }, [])

  // Fetch job recommendations based on user skills
  const fetchJobRecommendations = async (userSkills: string[]) => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.post(
        "/api/jobs/recommendJob",
        { skills: userSkills },
        { headers: { "Content-Type": "application/json" } },
      )

      if (response.data?.jobs) {
        setJobs(response.data.jobs)
      } else {
        setError("No job recommendations found")
      }
    } catch (err) {
      console.error("Error fetching job recommendations:", err)
      setError("Failed to fetch job recommendations")
      toast.error("Could not load job recommendations")
    } finally {
      setLoading(false)
    }
  }

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters()
  }, [jobs, filterType, searchTerm])

  // Apply filters based on job type and search term
  const applyFilters = () => {
    let result = [...jobs]

    // Filter jobs based on skills
    result = result.filter((job) => job.requiredSkills.some((skill) => skills.includes(skill)))

    // Apply job type filter
    if (filterType !== "all") {
      result = result.filter((job) => job.jobType.toLowerCase() === filterType.toLowerCase())
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(term) ||
          job.jobDescription.toLowerCase().includes(term) ||
          job.requiredSkills.some((skill) => skill.toLowerCase().includes(term)),
      )
    }

    setFilteredJobs(result)
  }

  // Handle job selection
  const selectJob = async (job: Job) => {
    if (!user) {
      toast.error("User not found. Please log in again.")
      return
    }

    try {
      setSelectingJob(job.jobId)

      const payload = {
        userId: user._id,
        selectedJob: { jobId: job.jobId, jobTitle: job.jobTitle }, 
      }

      const response = await axios.patch(`/api/jobs/updateUser`, payload, {
        headers: { "Content-Type": "application/json" },
      })

      if (response.status === 200) {
        toast.success(`Successfully selected job: ${job.jobTitle}`)
        setUser((prevUser) => ({
          ...prevUser!,
          selectedJob: response.data.selectedJob,
        }))
      } else {
        toast.error(response.data.error || "Failed to select job")
      }
    } catch (err) {
      console.error("Error updating user job:", err)
      toast.error("Failed to select job")
    } finally {
      setSelectingJob(null)
    }
  }

  // Render loading skeletons
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <Database className="text-primary mr-2" size={24} />
          <h2 className="text-2xl font-bold">Recommended Jobs - SkillSync</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Render error message
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-destructive/10 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-destructive mb-2">Error</h3>
          <p className="text-destructive-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Database className="text-primary mr-2" size={24} />
          <h2 className="text-2xl font-bold">Recommended Jobs - SkillSync</h2>
        </div>

        {/* Skills display */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Your Skills:</span>
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100 text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      {jobs.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Job Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Types</SelectItem>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* No jobs message */}
      {jobs.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No jobs found in database.</p>
        </div>
      )}

      {/* Job listings */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Filter className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No jobs match your current filters.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.jobId} className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                  <CardDescription>
                    {job.company && `${job.company} • `}
                    {job.location && `${job.location} • `}
                    {job.jobType}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{job.jobDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant={skills.includes(skill) ? "default" : "outline"} className="bg-gray-100 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => selectJob(job)}
                    disabled={selectingJob === job.jobId}
                    className="bg-[rgb(96,166,236)] text-black w-full sm:w-auto"
                  >
                    {selectingJob === job.jobId ? "Selecting..." : "Select This Job"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}

