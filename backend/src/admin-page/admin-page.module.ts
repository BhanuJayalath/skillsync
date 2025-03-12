import { Module } from '@nestjs/common';
import { AdminPageService } from './admin-page.service';

@Module({
  providers: [AdminPageService]
})
export class AdminPageModule {}
