import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Enable CORS for frontend
  app.setGlobalPrefix('api'); // Base route as /api
  await app.listen(process.env.PORT || 5001);
  console.log(`🚀 Server running on port ${process.env.PORT || 5001}`);
}
bootstrap();
