import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String] })
  requiredSkills: string[];

  @Prop({ type: [String] })
  jobType: string[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
