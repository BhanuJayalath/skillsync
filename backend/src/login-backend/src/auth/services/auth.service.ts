import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../models/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService, // ✅ Inject JwtService
  ) {}

  async validateOAuthUser(profile: any) {
    const { id, emails, name } = profile;
    const email = emails?.[0]?.value;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({
        facebookId: id,
        email,
        name: `${name.givenName} ${name.familyName}`,
      });
      await user.save();
    }

    return user;
  }

  // ✅ Register User
  async register(email: string, password: string): Promise<any> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();

    return { message: 'User registered successfully' };
  }

  // ✅ Login User
  async login(email: string, password: string) {
    console.log(`🔍 Checking user with email: ${email}`); // Debug Log
  
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      console.log('❌ User not found in DB'); // Debug Log
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log(`🔑 Stored Password Hash: ${user.password}`); // Debug Log
    console.log(`🔑 Entered Password: ${password}`); // Debug Log
  
    // Compare Passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`🔍 Password Match: ${isPasswordValid}`); // Debug Log
  
    if (!isPasswordValid) {
      console.log('❌ Incorrect password'); // Debug Log
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log('✅ Login successful');
    return {
      token: this.generateJwtToken(user),
      user: { id: user._id, email: user.email },
    };
  }
  

  // ✅ Generate JWT Token
  private generateJwtToken(user: UserDocument): string {
    return this.jwtService.sign({
      userId: user._id,
      email: user.email,
    });
  }
}
