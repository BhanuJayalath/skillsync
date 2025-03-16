// src/app/api/basic-test/route.js
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import TestScore from "@/models/testScore";

export async function POST(request) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const body = await request.json();
    console.log("Request body received:", body);

    const { userId, overallScore, totalQuestions, skillScores, selectedSkills } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }
    if (typeof overallScore !== "number" || typeof totalQuestions !== "number") {
      return NextResponse.json(
        { success: false, error: "Overall score and total questions must be numbers" },
        { status: 400 }
      );
    }
    if (!Array.isArray(skillScores)) {
      return NextResponse.json(
        { success: false, error: "skillScores must be an array" },
        { status: 400 }
      );
    }
    // If provided, selectedSkills must be an array; otherwise, default to empty array.
    if (selectedSkills && !Array.isArray(selectedSkills)) {
      return NextResponse.json(
        { success: false, error: "selectedSkills must be an array" },
        { status: 400 }
      );
    }

    // Create and save the new TestScore document
    const newTestScore = await TestScore.create({
      userId,
      overallScore,
      totalQuestions,
      skillScores,
      selectedSkills: selectedSkills || [],
    });

    return NextResponse.json({ success: true, data: newTestScore }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/basic-test:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
