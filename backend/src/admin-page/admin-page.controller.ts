import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin-page.service';
import { Admin } from './admin-page.schema';

@Controller('admin-page')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  create(@Body() userData: Partial<Admin>): Promise<Admin> {
    return this.adminService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userData: Partial<Admin>): Promise<Admin> {
    return this.adminService.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.adminService.delete(id);
  }
}
