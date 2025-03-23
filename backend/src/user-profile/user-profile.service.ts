import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user-profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserProfileService {
  constructor(
      // Inject the User model
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // Create a new user
  async findUser(userId: string): Promise<User | null> {
    return await this.userModel.findOne({ _id: userId }).exec(); // Query by id
  }

  // Update the user
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

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Delete a user
  async deleteUser(userId: string): Promise<{ message: string }> {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException(`User with ID ${userId} not found`);
    return { message: `User with ID ${userId} deleted successfully` };
  }
}
