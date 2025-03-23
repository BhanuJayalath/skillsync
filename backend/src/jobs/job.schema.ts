import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// Define the schema for the Job model
@Schema()
export class Job extends Document {
  @Prop({ required: true })
  jobId: string; // Unique ID for the job

  @Prop({ required: true })
  recruiterId: string; // ID of the recruiter who posted the job

  @Prop({ required: true })
  jobTitle: string; // Title of the job

  @Prop({ required: true })
  jobDescription: string; // Description of the job

  @Prop({ type: [String] })
  requiredSkills: string[]; // Array of required skills

  @Prop({ required: true })
  jobType: string; // Type of the job (Full-time, Part-time, etc.)
}

export const JobSchema = SchemaFactory.createForClass(Job);
