import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestScoreService } from './testscore.service';
import { TestScoreController } from './testscore.controller';
import { TestScore, TestScoreSchema } from './testscore.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TestScore.name, schema: TestScoreSchema }])
  ],
  controllers: [TestScoreController],
  providers: [TestScoreService],
  exports: [TestScoreService], // Ensure it's exported
})
export class TestScoreModule {}
