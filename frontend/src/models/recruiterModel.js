import { verify } from 'crypto';
import mongoose from 'mongoose';

// Define a sub-schema for job postings
const jobPostingSchema = new mongoose.Schema({
    jobId: { type: String },
    title: { type: String },
    description: { type: String },
    requirements: { type: String }, // You can change this to an array if you want multiple requirements
    location: { type: String },
    postedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date }
});

// Define the main Recruiter schema
const recruiterSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    company: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

    description: { type: String },
    linkedIn: { type: String },
    companyWebsite: { type: String },
    companyLogo: { type: String },
    services: { type: String },
    // Array of job postings created by the recruiter
    jobPostings: [jobPostingSchema]
});

// Create and export the model (using a cached model if it already exists)
const Recruiter = mongoose.models.Recruiter || mongoose.model('recruiter', recruiterSchema);

export default Recruiter;
