import { Controller, Get, Param } from '@nestjs/common';
import { TestScoreService } from './testscore.service';

@Controller('testscore')
export class TestScoreController {
  constructor(private readonly testScoreService: TestScoreService) {}

  @Get(':userId')
  async getUserSkills(@Param('userId') userId: string) {
    console.log('Searching test score for userId:', userId);
    
    const testScore = await this.testScoreService.findTestScoreByUserId(userId);

    if (!testScore || !testScore.selectedSkills) {
      return { message: "No test data found for this user." };
    }

    return { selectedSkills: testScore.selectedSkills };
  }

  @Get(':userId/score')
  async getTestScore(@Param('userId') userId: string) {
    const testScore = await this.testScoreService.findTestScoreByUserId(userId);
    if (!testScore) {
      return { error: 'Test score not found' };
    }
    return testScore;
  }
}
