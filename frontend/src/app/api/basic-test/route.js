import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import TestScore from '@/models/testScore';

export async function POST(request) {
  await connect();
  try {
    const body = await request.json();
    const { userId, overallScore, totalQuestions, skillScores, selectedSkills } = body;
    const testScore = new TestScore({
      userId,
      overallScore,
      totalQuestions,
      skillScores,
      selectedSkills
    });
    await testScore.save();
    return NextResponse.json({ success: true, data: testScore }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
