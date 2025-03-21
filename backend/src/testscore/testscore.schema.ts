import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestScoreDocument = TestScore & Document;

@Schema({ collection: 'testscores' }) // ✅ Explicitly set collection name
export class TestScore extends Document {
  @Prop({ required: true })
  userId: string; // Ensure this is a string

  @Prop({ required: true })
  overallScore: number;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ type: [String], required: true })
  selectedSkills: string[];
}

export const TestScoreSchema = SchemaFactory.createForClass(TestScore);
