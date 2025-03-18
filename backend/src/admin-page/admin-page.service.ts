import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin-page.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private userModel: Model<AdminDocument>) {}

  async findAll(): Promise<Admin[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return this.userModel.findById(id).exec();
  }

  async create(userData: Partial<Admin>): Promise<Admin> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async update(id: string, userData: Partial<Admin>): Promise<Admin> {
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
