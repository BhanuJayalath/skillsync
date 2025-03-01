import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MockTest, MockTestDocument } from './mocktest.schema';
@Injectable()
export class MocktestService {
  constructor(
    @InjectModel(MockTest.name) private mockTestModel: Model<MockTestDocument>,
  ) {}
  async create(data: { mockExamId: string; mockExamContent: any }) {
    const mockTest = new this.mockTestModel(data);
    return mockTest.save();
  }

  async findAll() {
    return this.mockTestModel.find().exec();
  }
  async findOne(id: number) {
    return this.mockTestModel.findById(id).exec();
  }
  async update(mockExamId: number, data: Partial<MockTest>) {
    return this.mockTestModel
      .findOneAndUpdate({ mockExamId: mockExamId }, data, { new: true })
      .exec();
  }
  async delete(id: number) {
    return this.mockTestModel.findOneAndDelete({ mockExamId: id }).exec();
  }
}
