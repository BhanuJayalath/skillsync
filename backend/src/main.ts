import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for requests from Next.js
  app.enableCors({
    origin: 'http://localhost:4000',
  });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
