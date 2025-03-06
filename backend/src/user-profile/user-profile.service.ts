import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user-profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findUser(userId: string): Promise<User | null> {
    // Query the user by the 'id' field
    return await this.userModel.findOne({ _id: userId }).exec();
  }
//edit
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: userId }, updateData, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedUser)
      throw new NotFoundException(`User with ID ${userId} not found`);
    return updatedUser;
  }

  async saveTestMark(userId: string, jobId: string, testId: string, score: number): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { _id: userId },
        { $push: { tests: { jobId, testId, score } } },
        { new: true },
      )
      .exec();

    if (!updatedUser)
      throw new NotFoundException(`User with ID ${userId} not found`);
    return updatedUser;
  }
}
