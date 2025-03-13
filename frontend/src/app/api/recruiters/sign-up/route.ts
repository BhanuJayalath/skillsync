import { connect } from "@/dbConfig/dbConfig";
import Recruiter from "@/models/recruiterModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, company } = reqBody;

    console.log(reqBody);

    // Check if recruiter already exists
    const recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new recruiter
    const newRecruiter = new Recruiter({
      username,
      email,
      password: hashedPassword,
      company,
    });

    const savedRecruiter = await newRecruiter.save();
    console.log(savedRecruiter);

    // Generate JWT token
    const token = jwt.sign({ id: savedRecruiter._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // Create response and set token cookie
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      savedRecruiter,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
