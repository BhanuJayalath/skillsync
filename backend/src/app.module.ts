import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserProfileController } from './user-profile/user-profile.controller';
import { JobRecommendationModule } from './job-recommendation/job-recommendation.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { TestsModule } from './tests/tests.module';
@Module({
  imports: [
    RecruiterModule,
    UserProfileModule,
    JobRecommendationModule,
    TestsModule,
  ],
  controllers: [AppController, UserProfileController],
  providers: [AppService],
})
export class AppModule {}