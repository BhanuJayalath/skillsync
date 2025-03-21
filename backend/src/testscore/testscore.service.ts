import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestScore, TestScoreDocument } from './testscore.schema';

@Injectable()
export class TestScoreService {
  constructor(
    @InjectModel(TestScore.name) private readonly testScoreModel: Model<TestScoreDocument>,
  ) {}

  async findTestScoreByUserId(userId: string): Promise<TestScore | null> {
    console.log('Fetching test score for user:', userId);

    try {
      // Directly query using userId as a string
      const testScore = await this.testScoreModel.findOne({ userId }).exec();

      if (!testScore) {
        console.log("No test data found for this user.");
        return null;
      }

      console.log("Test score found:", testScore);
      return testScore;
    } catch (error) {
      console.error("Error fetching test score:", error);
      return null;
    }
  }
}
