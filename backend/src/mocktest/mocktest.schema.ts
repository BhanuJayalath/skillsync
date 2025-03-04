import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MockTestDocument = MockTest & Document;

@Schema({ collection: 'mocktest' })
export class MockTest {
  @Prop({ required: true })
  mockExamId: Number;

  @Prop({
    type: {
      questionContent: [
        {
          QuestionId: Number,
          Question: String,
          Answer1: String,
          Answer2: String,
          Answer3: String,
          Answer4: String,
        },
      ],
    },
  })
  mockExamContent: {
    questionContent: {
      QuestionId: number;
      Question: string;
      Answer1: string;
      Answer2: string;
      Answer3: string;
      Answer4: string;
    }[];
  };
}
export const MockTestSchema = SchemaFactory.createForClass(MockTest);
