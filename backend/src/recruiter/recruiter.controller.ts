import { Controller, Get, Post } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterservice: RecruiterService) {}

  @Post('details')
  findAll() {
    return 'hello Hi';
  }
}
