import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminPageService } from './admin-page.service';
import { AdminPageController } from './admin-page.controller';
import { Admin, AdminSchema } from './admin-page.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  providers: [AdminPageService],
  controllers: [AdminPageController],
})
export class AdminPageModule {}
