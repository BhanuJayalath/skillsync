import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { JobRecommendationModule } from './job-recommendation/job-recommendation.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { MocktestModule } from './mocktest/mocktest.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      autoIndex: true,
      autoCreate: true,
    }),
    RecruiterModule, 
    MocktestModule,
    UserProfileModule, 
    JobRecommendationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
