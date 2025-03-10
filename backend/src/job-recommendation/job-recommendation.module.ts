import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.schema';
import { JobRecommendationService } from './job-recommendation.service';
import { JobRecommendationController } from './job-recommendation.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobRecommendationController],
  providers: [JobRecommendationService],
  exports: [JobRecommendationService],
})
export class JobRecommendationModule {}
