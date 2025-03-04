import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './models/user.schema/user.schema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  // User registration
  async register(email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();

    return { message: 'User registered successfully' };
  }

  // User login
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateJwtToken(user);
  }

  // Generate JWT token
  generateJwtToken(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return {
      accessToken: jwt.sign(payload, jwtSecret, {
        expiresIn: '1h',
      }),
    };
  }

  // Validate OAuth User
  async validateOAuthUser(profile: any) {
    const { id, emails } = profile;
    const email = emails?.[0]?.value;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({ googleId: id, email });
      await user.save();
    }

    return user;
  }
}
