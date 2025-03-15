// src/app/api/basic-test/route.js
import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import TestScore from '@/models/testScore';

export async function POST(request) {
  await connect();
  try {
    const body = await request.json();
    const { userId, score, totalQuestions, skills } = body;
    const testScore = new TestScore({ userId, score, totalQuestions, skills });
    await testScore.save();
    return NextResponse.json({ success: true, data: testScore }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
