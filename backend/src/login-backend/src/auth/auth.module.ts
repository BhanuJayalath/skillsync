import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { User, UserSchema } from './models/user.schema';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // ✅ Load .env variables globally
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ Register Passport authentication
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ✅ Load JWT secret key from .env
        signOptions: { expiresIn: '1h' }, // ✅ Set token expiration
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Register User model
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy, // ✅ Register Google authentication strategy
    FacebookStrategy, // ✅ Register Facebook authentication strategy
    JwtStrategy, // ✅ Register JWT authentication strategy
  ],
  exports: [
    AuthService,
    JwtModule, 
    PassportModule, // ✅ Export PassportModule for use in other modules
  ],
})
export class AuthModule {}
