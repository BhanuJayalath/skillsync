import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Connect to MongoDB
connect();

// Define the job schema if you want to structure it for querying (even though you mentioned not having a model)
const JobSchema = new mongoose.Schema({
  jobId: String,
  recruiterId: String,
  jobTitle: String,
  jobDescription: String,
  requiredSkills: [String],
  jobType: String,
  __v: Number
});

const Job = mongoose.model("Job", JobSchema);

export async function POST(request: NextRequest) {
  try {
    // Get user skills from request body
    const { skills } = await request.json();

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills are required" },
        { status: 400 }
      );
    }

    // Query the jobs collection
    const jobs = await Job.find();

    // Filter and calculate match score for each job
    const jobsWithMatchScore = jobs.map((job: any) => {
      const matchingSkills = job.requiredSkills.filter((skill: string) =>
        skills.includes(skill.toLowerCase())
      );

      // Calculate match score (percentage of matched skills)
      const matchScore =
        job.requiredSkills.length > 0
          ? Math.round((matchingSkills.length / job.requiredSkills.length) * 100)
          : 0;

      return { ...job.toObject(), matchScore };
    });

    // Sort the jobs by match score in descending order
    jobsWithMatchScore.sort((a: any, b: any) => (b.matchScore || 0) - (a.matchScore || 0));

    // Send back the sorted jobs with match scores
    return NextResponse.json({ jobs: jobsWithMatchScore }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching job recommendations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch job recommendations" },
      { status: 500 }
    );
  }
}
