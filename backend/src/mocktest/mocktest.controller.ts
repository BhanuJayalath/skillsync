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

  @Get()
  findAll() {
    return this.mockTestService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: Number) {
    return this.mockTestService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: Number,
    @Body() updateDto: Partial<{ mockExamId: Number; mockExamContent: any }>,
  ) {
    return this.mockTestService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: Number) {
    return this.mockTestService.delete(id);
  }
}
