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
  async find(id: string) {
    return await this.TestModel.find({ jobId: id });
  }

  // async findAll() {
  //   return this.TestModel.find().exec();
  // }
  async findOne(id: string) {
    return await this.TestModel.findOne({ testId: id });
  }

  async update(testId: string, data: Partial<Tests>) {
    return this.TestModel.findOneAndUpdate({ testId: testId }, data, {
      new: true,
    }).exec();
  }
  async delete(id: string) {
    return this.TestModel.findOneAndDelete({ testId: id }).exec();
  }
  async deleteByJobId(jobId: string) {
    return await this.TestModel.deleteMany({ jobId: jobId });
  }
}
