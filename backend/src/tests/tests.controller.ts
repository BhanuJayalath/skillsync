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

@Controller('test')
export class TestsController {
  constructor(private readonly TestsService: TestsService) {}

  @Post()
  create(@Body() createDto: { testId: string; testContent: any }) {
    return this.TestsService.create(createDto);
  }

  @Get('all-tests')
  findAll() {
    return this.TestsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TestsService.findOne(id);
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
}
