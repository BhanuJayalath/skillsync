import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load environment variables globally
    MongooseModule.forRoot(process.env.MONGO_URI), // ✅ Connect to MongoDB
    AuthModule, // ✅ Import Auth Module
  ],
})
export class AppModule {}
