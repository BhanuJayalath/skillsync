import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tests, TestDocument } from './tests.schema';
@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Tests.name) private TestModel: Model<TestDocument>,
  ) {}
  async create(data: { testId: string; testContent: any }) {
    const Test = new this.TestModel(data);
    return Test.save();
  }

  async findAll() {
    return this.TestModel.find().exec();
  }
  async findOne(testId: string) {
    return this.TestModel.findOne({ testId }).exec(); // Query by testId
  }
  
  async update(testId: string, data: Partial<Tests>) {
    return this.TestModel.findOneAndUpdate({ testId: testId }, data, {
      new: true,
    }).exec();
  }
  async delete(id: string) {
    return this.TestModel.findOneAndDelete({ testId: id }).exec();
  }
}
