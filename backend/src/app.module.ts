import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruiterModule } from './recruiter/recruiter.module';
import { MocktestModule } from './mocktest/mocktest.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RecruiterModule,
    MocktestModule,
    MongooseModule.forRoot(
      'mongodb+srv://bhanu:bhanu2003@studyy-cluster.cmoox.mongodb.net/?retryWrites=true&w=majority&appName=studyy-cluster',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
