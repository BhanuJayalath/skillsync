import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy/google.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema/user.schema';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import * as dotenv from 'dotenv';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // Ensure .env file is loaded globally
    MongooseModule.forRootAsync({ // ✅ Ensures MONGO_URI is read properly
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        Logger.log('Connecting to MongoDB...'); // Log that we are connecting to MongoDB.
        const mongoUri = configService.get<string>('MONGO_URI');
        if (!mongoUri) {
          Logger.error('MONGO_URI is not defined in the environment variables');
        } else {
          Logger.log(`MONGO_URI: ${mongoUri}`); // Log the MONGO_URI
        }
        return { uri: mongoUri };
      },
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
          Logger.error('JWT_SECRET is not defined in the environment variables');
        } else {
          Logger.log(`JWT_SECRET: ${jwtSecret}`); // Log the JWT_SECRET
        }
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Registers User schema
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, JwtAuthGuard, GoogleAuthGuard],
  exports: [AuthService, JwtModule, JwtAuthGuard, GoogleAuthGuard],
})
export class AuthModule {}
