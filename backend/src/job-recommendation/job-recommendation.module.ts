import { Module } from '@nestjs/common';
import { JobRecommendationService } from './job-recommendation.service';
import { JobRecommendationController } from './job-recommendation.controller';

@Module({
  controllers: [JobRecommendationController],
  providers: [JobRecommendationService],
})
export class JobRecommendationModule {}
