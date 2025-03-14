import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PATCH(request: NextRequest) {
  try {
    // Get the user id from the token in the cookies.
    const userId = await getDataFromToken(request);
    // Parse the request body for updated details.
    const reqBody = await request.json();

    // Update the user details (only allowing updates for username and email here)
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { username: reqBody.username, email: reqBody.email } },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
