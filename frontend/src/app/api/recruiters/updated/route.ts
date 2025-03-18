import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Recruiter from "@/models/recruiterModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PATCH(request: NextRequest) {
  try {
    // Get the recruiter id from the token in the cookies.
    const recruiterId = await getDataFromToken(request);
    // Parse the request body for updated details.
    const reqBody = await request.json();

    // Update the recruiter details (allowing updates for userName, email, and company)
    const updatedRecruiter = await Recruiter.findOneAndUpdate(
      { _id: recruiterId },
      { $set: { userName: reqBody.userName, email: reqBody.email, company: reqBody.company } },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json({
      message: "Recruiter updated successfully",
      recruiter: updatedRecruiter,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
