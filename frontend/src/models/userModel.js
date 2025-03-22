import { verify } from "crypto";
import mongoose from "mongoose";

// Define sub-schemas for nested objects

const courseSchema = new mongoose.Schema({
  courseId: { type: String },
  code: { type: String },
  name: { type: String },
  result: { type: String },
  mark: { type: String },
});

const experienceSchema = new mongoose.Schema({
  jobId: { type: String },
  jobName: { type: String },
  companyName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

const educationSchema = new mongoose.Schema({
  eduId: { type: String },
  courseName: { type: String },
  schoolName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
});

const testSchema = new mongoose.Schema({
  jobId: { type: String },
  testLevel: { type: String },
  mark: { type: Number },
});

const jobRoleSchema = new mongoose.Schema({
  jobTitle: { type: String },
  jobId: { type: String },
});

// Main User schema

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  contact: { type: String },
  fullName: { type: String },
  avatar: { type: String },
  gitHub: { type: String },
  linkedIn: { type: String },
  gender: { type: String },
  city: { type: String },
  country: { type: String },
  timeZone: { type: String },
  language: { type: String },
  cvSummary: { type: String },

  courses: [courseSchema],
  tests: [testSchema],
  jobRole: [jobRoleSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [{ type: String }],
  notifications: [{ type: Object }],
});

// Create and export the model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
