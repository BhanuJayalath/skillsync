import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    // Create response and set token cookie
    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
