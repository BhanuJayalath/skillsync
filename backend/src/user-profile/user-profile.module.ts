import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user-profile.schema';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  // Import the ConfigModule and MongooseModule
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Declare the controller and service
  controllers: [UserProfileController],
  // Declare the service as a provider
  providers: [UserProfileService],
  // Export the service
  exports: [UserProfileService],
})
export class UserProfileModule {}