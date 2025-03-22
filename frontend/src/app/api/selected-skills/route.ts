import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import TestScore from "@/models/testScore";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database.
    await connect();

    // Extract the user ID from the token in the request (adjust your token extraction logic as needed).
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Query the database for the latest test score record for the user.
    const testScore = await TestScore.findOne({ userId }).sort({ createdAt: -1 });
    if (!testScore) {
      return NextResponse.json(
        { success: false, error: "No test score found for user" },
        { status: 404 }
      );
    }

    // Return the selectedSkills field from the test score document.
    return NextResponse.json({
      success: true,
      data: { selectedSkills: testScore.selectedSkills },
    });
  } catch (error: any) {
    console.error("Error fetching selected skills:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
