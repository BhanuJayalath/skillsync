// src/app/api/basic-test/route.js
import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import TestScore from '@/models/testScore';

export async function POST(request) {
  await connect();
  try {
    const body = await request.json();
    console.log("Request body received:", body); // Debug log

    const { userId, overallScore, totalQuestions, skillScores, selectedSkills } = body;
    
    // Validate required fields
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }
    if (typeof overallScore !== 'number' || typeof totalQuestions !== 'number') {
      return NextResponse.json({ success: false, error: 'Overall score and total questions must be numbers' }, { status: 400 });
    }
    if (!Array.isArray(skillScores)) {
      return NextResponse.json({ success: false, error: 'skillScores must be an array' }, { status: 400 });
    }

    // Create the document based on your Mongoose schema
    const testScore = new TestScore({
      userId,
      overallScore,
      totalQuestions,
      skillScores,
      selectedSkills,
    });
    await testScore.save();

    return NextResponse.json({ success: true, data: testScore }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/basic-test:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
