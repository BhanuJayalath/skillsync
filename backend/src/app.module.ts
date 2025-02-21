import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruiterModule } from './recruiter/recruiter.module';
import { MocktestModule } from './mocktest/mocktest.module';

@Module({
  imports: [RecruiterModule, MocktestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
