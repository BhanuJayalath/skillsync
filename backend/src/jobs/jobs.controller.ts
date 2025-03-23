import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.schema';
// Define the JobsController class
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}

  // recommend jobs based on user's skills
  @Post('recommendJob') //define the POST route /getUser
  async getJob(@Body() body: { skills: string; jobs: any }) {
    const skills = body.skills;
    //get all jobs
    const jobs = await this.jobService.getAllJobs();
    //get all job titles
    const jobTitles = jobs.map((job) => job.jobTitle);
    //get recommended jobs titles based on user's skills
    const selectedJobs = await this.jobService.getRecommendations(
      skills,
      jobTitles,
    );
    //filter all jobs based on recommended job titles
    const matchingJobs = {
      jobs: jobs.filter((job) => selectedJobs.includes(job.jobTitle)),
    };
    if (!matchingJobs) {
      return { error: 'jobs not found' }; //Return an error if user is not found
    }
    return matchingJobs;
  }
  // **CREATE a new job
  @Post('create-job')
  async createJob(
    @Body()
    jobData: {
      jobId: string;
      jobTitle: string;
      jobDescription: string;
      requiredSkills: string[];
      jobType: string;
    },
  ) {
    return this.jobService.createJob(jobData);
  }

  // **READ all jobs**
  @Get('all-jobs')
  async getAllJobs(): Promise<Job[]> {
    return this.jobService.getAllJobs();
  }

  // **READ a single job by Job ID**
  @Get(':jobId')
  async getJobById(@Param('jobId') jobId: string): Promise<Job> {
    return this.jobService.getJobById(jobId);
  }

  // **READ jobs by Recruiter ID**
  @Get('recruiter/:recruiterId')
  async getJobsByRecruiterId(
    @Param('recruiterId') recruiterId: string,
  ): Promise<Job[]> {
    return this.jobService.getJobsByRecruiterId(recruiterId);
  }

  // **UPDATE a job by ID**
  @Patch(':jobId')
  async updateJob(
    @Param('jobId') jobId: string,
    @Body() updateData: Partial<Job>,
  ): Promise<Job> {
    return this.jobService.updateJob(jobId, updateData);
  }

  // **DELETE a job by ID**
  @Delete(':jobId')
  async deleteJob(@Param('jobId') jobId: string): Promise<{ message: string }> {
    return this.jobService.deleteJob(jobId);
  }
}
