import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

const JobSchema = new mongoose.Schema({
  jobId: String,
  recruiterId: String,
  jobTitle: String,
  jobDescription: String,
  requiredSkills: [String],
  jobType: String,
  __v: Number,
});

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

// Handle GET requests
export async function GET(request: NextRequest) {
  try {
    const jobs = await Job.find();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { skills } = await request.json();

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Invalid skills data" },
        { status: 400 }
      );
    }

    // Find jobs that match the provided skills
    const jobs = await Job.find({
      requiredSkills: { $in: skills },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching job recommendations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch job recommendations" },
      { status: 500 }
    );
  }
}