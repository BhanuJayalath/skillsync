import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './admin-page.service';
import { Admin } from './admin-page.schema';

@Controller('admin-page')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<Admin[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Admin> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userData: Partial<Admin>): Promise<Admin> {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: Partial<Admin>): Promise<Admin> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
