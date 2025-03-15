import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Recruiter from "@/models/recruiterModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

  try {
    const recruiterId = await getDataFromToken(request);
    const recruiter = await Recruiter.findOne({ _id: recruiterId }).select("-password");
    return NextResponse.json({
      message: "Recruiter found",
      recruiter: recruiter,
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
