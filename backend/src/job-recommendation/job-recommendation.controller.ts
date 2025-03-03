import { Body, Controller, Post } from '@nestjs/common';
import { JobRecommendationService } from './job-recommendation.service';

@Controller('job-recommendation')
export class JobRecommendationController {
  constructor(private readonly jobService: JobRecommendationService) {}

  @Post('getJob') //define the POST route /getUser
  async getJob(@Body() body: { skills: string; jobs: any }) {
    const skills = body.skills;
    const jobTitles = body.jobs.map((job) => job.title);
    const selectedJobs = await this.jobService.getRecommendations(
      skills,
      jobTitles,
    );
    const matchingJobs = {
      jobs: body.jobs.filter((job) => selectedJobs.includes(job.title)),
    };
    if (!matchingJobs) {
      return { error: 'jobs not found' }; //Return an error if user is not found
    }
    return matchingJobs;
  }
}
