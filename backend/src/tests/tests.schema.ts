import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Tests & Document;

@Schema({ collection: 'tests' })
export class Tests {
  @Prop({ required: true })
  testId: String;

  @Prop({
    type: {
      questionContent: [
        {
          questionId: Number,
          question: String,
          answer1: String,
          answer2: String,
          answer3: String,
          answer4: String,
          correctAnswer: Number,
        },
      ],
    },
  })
  testContent: {
    questionContent: {
      questionId: Number;
      question: string;
      answer1: string;
      answer2: string;
      answer3: string;
      answer4: string;
      correctAnswers: [Number];
    }[];
  };
}
export const TestSchema = SchemaFactory.createForClass(Tests);
