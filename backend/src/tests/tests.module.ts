import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { Tests, TestSchema } from './tests.schema';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      { name: Tests.name, schema: TestSchema }, // Register the Test schema with Mongoose
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
