import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const { userId, selectedJob } = await request.json();

    console.log("Request payload:", { userId, selectedJob }); // Debug log

    if (!userId || !selectedJob?.jobId || !selectedJob?.jobTitle) {
      console.error("Invalid request payload"); // Debug log
      return NextResponse.json(
        { error: "Invalid request. User ID, Job ID, and Job Title are required." },
        { status: 400 }
      );
    }

    const User = mongoose.models.User || mongoose.model(
      "User",
      new mongoose.Schema({
        userName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        skills: [String],
        courses: [String],
        tests: [String],
        jobRole: [String],
        experience: [String],
        education: [String],
        selectedJob: {
          jobTitle: { type: String },
          jobId: { type: String },
        },
      })
    );

    console.log("Updating selectedJob for user:", userId); // Debug log

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { selectedJob: selectedJob } },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found"); // Debug log
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Updated user:", updatedUser); // Debug log

    return NextResponse.json(
      { message: "Job selected successfully", selectedJob: updatedUser.selectedJob },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating selected job:", error); // Debug log
    return NextResponse.json(
      { error: error.message || "Failed to update selected job" },
      { status: 500 }
    );
  }
}
