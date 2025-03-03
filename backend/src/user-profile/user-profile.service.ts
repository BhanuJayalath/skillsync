import { Injectable } from '@nestjs/common';
import { User } from './user-profile.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findOne(userId: string): Promise<User | null> {
    // Query the user by the 'id' field
    return await this.userModel.findOne({ id: userId }).exec();
  }
}
