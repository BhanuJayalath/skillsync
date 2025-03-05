import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; //bhanu
import { Job, JobSchema } from './job.schema'; //bhanu
import { JobRecommendationService } from './job-recommendation.service';
import { JobRecommendationController } from './job-recommendation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]), //bhanu
  ],
  controllers: [JobRecommendationController],
  providers: [JobRecommendationService],
  exports: [JobRecommendationService], //bhanu
})
export class JobRecommendationModule {}
