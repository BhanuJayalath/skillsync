import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.schema';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';

@Module({
  // Import the Job model and JobSchema
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  // Define the JobsController and JobsService as providers
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
