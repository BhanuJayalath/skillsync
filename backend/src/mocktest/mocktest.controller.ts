import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MocktestService } from './mocktest.service';

@Controller('mock-test')
export class MocktestController {
  constructor(private readonly mockTestService: MocktestService) {}

  @Post()
  create(@Body() createDto: { mockExamId: string; mockExamContent: any }) {
    return this.mockTestService.create(createDto);
  }

  @Get('all-mock-test')
  findAll() {
    return this.mockTestService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mockTestService.findOne(id);
  }
  @Patch(':mockExamId')
  update(
    @Param('mockExamId') mockExamId: string,
    @Body() updateDto: Partial<{ mockExamId: string; mockExamContent: any }>,
  ) {
    return this.mockTestService.update(mockExamId, updateDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.mockTestService.delete(id);
  }
}
