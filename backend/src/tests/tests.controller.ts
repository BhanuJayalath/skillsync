import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly TestsService: TestsService) {}

  @Post()
  create(@Body() createDto: { testId: string; testContent: any }) {
    return this.TestsService.create(createDto);
  }

  @Get('all-tests/:id') //add the jobId
  async findAll(@Param('id') id: string) {
    return this.TestsService.find(id);
  }
  
  @Get(':testId')
  findOne(@Param('testId') testId: string) {
    return this.TestsService.findOne(testId);
  }
  
  @Patch(':TestId')
  update(
    @Param('TestId') TestId: string,
    @Body() updateDto: Partial<{ testId: string; testContent: any }>,
  ) {
    return this.TestsService.update(TestId, updateDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.TestsService.delete(id);
  }
  @Delete(':job/:jobId')
  deleteByJobId(@Param('jobId') jobId: string) {
    return this.TestsService.deleteByJobId(jobId);
  }
}
