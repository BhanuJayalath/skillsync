import { Module } from '@nestjs/common';
import { AdminPageService } from './admin-page.service';
import { AdminPageController } from './admin-page.controller';

@Module({
  providers: [AdminPageService],
  controllers: [AdminPageController]
})
export class AdminPageModule {}
