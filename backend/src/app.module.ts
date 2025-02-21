import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserProfileController } from './user-profile/user-profile.controller';
@Module({
  imports: [UserProfileModule],
  controllers: [AppController, UserProfileController],
  providers: [AppService],
})
export class AppModule {}
