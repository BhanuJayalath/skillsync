import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import TestScore from "@/models/testScore";  // Import TestScore model
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch the user from the database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userScore = await TestScore.findOne({ userId });

    let skills: string[] = [];
    if (userScore && userScore.overallScore > 4) {
      skills = (userScore.skillScores as { skill: string }[]).map((skillScore) => skillScore.skill);
    }

    return NextResponse.json(
      { user: { ...user.toObject(), skills } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
