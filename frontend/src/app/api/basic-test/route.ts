// src/app/api/basic-test/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import TestScore from "@/models/testScore";

export async function POST(request: NextRequest) {
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
    // Validate selectedSkills if provided
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

    // Convert the document to a plain object and remove extra fields from the output
    const scoreData = newTestScore.toObject();
    delete scoreData._id;
    delete scoreData.__v;
    delete scoreData.createdAt;

    return NextResponse.json({ success: true, data: scoreData }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/basic-test:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
