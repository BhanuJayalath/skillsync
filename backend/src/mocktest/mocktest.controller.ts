import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
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
  findOne(@Param('id') id: number) {
    return this.mockTestService.findOne(id);
  }
  @Patch(':mockExamId')
  update(
    @Param('mockExamId') mockExamId: number,
    @Body() updateDto: Partial<{ mockExamId: number; mockExamContent: any }>,
  ) {
    return this.mockTestService.update(mockExamId, updateDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.mockTestService.delete(id);
  }
}
