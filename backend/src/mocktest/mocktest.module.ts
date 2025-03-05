import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MocktestService } from './mocktest.service';
import { MocktestController } from './mocktest.controller';
import { MockTest, MockTestSchema } from './mocktest.schema'; // Adjust path to your schema file
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      { name: MockTest.name, schema: MockTestSchema }, // Register the MockTest schema with Mongoose
    ]),
  ],
  controllers: [MocktestController],
  providers: [MocktestService],
})
export class MocktestModule {}