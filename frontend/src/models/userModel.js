import { verify } from 'crypto';
import mongoose from 'mongoose';

// Define sub-schemas for nested objects

const experienceSchema = new mongoose.Schema({
  jobId: { type: String },
  jobName: { type: String },
  companyName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String }
});

const educationSchema = new mongoose.Schema({
  eduId: { type: String },
  courseName: { type: String },
  schoolName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String }
});

const testSchema = new mongoose.Schema({
  jobId: { type: String },
  testId: { type: String },
  score: { type: Number }
});

const jobRoleSchema = new mongoose.Schema({
  jobName: { type: String }
});

// Main User schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  number: { type: String },
  displayName: { type: String },
  fullName: { type: String },
  avatar: { type: String },
  gitHub: { type: String },
  linkedIn: { type: String },
  gender: { type: String },
  language: { type: String },
  city: { type: String },
  country: { type: String },
  timeZone: { type: String },
  
  tests: [testSchema],
  jobRole: [jobRoleSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  skills: [{ type: String }]
});

// Create and export the model
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
