import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  jobDescription: string; //bhanu

  @Prop({ type: [String] })
  requiredSkills: string[];

  @Prop({ required: true })
  jobType: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
