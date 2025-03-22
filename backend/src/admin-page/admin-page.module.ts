import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin-page.service';
import { AdminController } from './admin-page.controller';
import { Admin, AdminSchema } from './admin-page.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
